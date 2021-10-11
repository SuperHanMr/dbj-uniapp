import TIM from 'tim-wx-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
import timEnhance from './tim-enhance.js'

var _tim = null;
var _EVENT_NAMES = [
  "SDK_READY",
  "SDK_NOT_READY",
  "KICKED_OUT",
  "ERROR",
  "MESSAGE_RECEIVED",
  "CONVERSATION_LIST_UPDATED",
  "GROUP_LIST_UPDATED",
  "BLACKLIST_UPDATED",
  "NET_STATE_CHANGE",
  "MESSAGE_READ_BY_PEER"
]
var _EVNET_HANDLERS = {};
var _listenerIdMap = {};
var _sdkReady = false;

function createTim(sdkAppId) {
  if (_tim) {
    return _tim;
  }
  // 初始化 SDK 实例
  const tim = TIM.create({
    SDKAppID: sdkAppId
  })

  // 无日志级别
  tim.setLogLevel(4)

  // 注册 cos
  tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
  
  _registerEvents(tim);
  _tim = tim;
  
  //增强tim，引入业务逻辑
  timEnhance(tim);
  return tim;
}

function isSDKReady() {
  return _sdkReady;
}

function _onSdkReady() {
  _sdkReady = true;
}

function _onSdkNotReady() {
  _sdkReady = false;
}

function _onSdkError(e) {
  const data = e.data;
  // 2999:接口调用时机不合理，等待 SDK 处于 ready 状态后再调用（监听 TIM.EVENT.SDK_READY 事件）
  // 错误码链接：https://web.sdk.qcloud.com/im/doc/zh-cn//module-ERROR_CODE.html
  if (data && data.code === 2999) {
    _sdkReady = false;
  }
}

function _registerEvents(tim) {
  _EVENT_NAMES.forEach(function(eName) {
    _EVNET_HANDLERS[eName] = [];
  });
  
  _EVENT_NAMES.forEach(function(eName) {
    tim.on(TIM.EVENT[eName], function(event) {
      console.log("[TIM EVENT]", eName, event);
      var handlers = _EVNET_HANDLERS[eName];
      handlers.forEach(function(handle) {
        handle(event);
      })
    })
  });
  tim.on(TIM.EVENT.SDK_READY, _onSdkReady);
  tim.on(TIM.EVENT.SDK_NOT_READY, _onSdkNotReady);
  tim.on(TIM.EVENT.ERROR, _onSdkError);
}

function getTim() {
  if (!_tim) {
    console.error("tim has not created.");
  }
  return _tim;
}

/**
 * 确保tim是sdk加载完成后获取到的
 */
function getSafeTim() {
  return new Promise(function(resvole, reject) {
    if (_sdkReady) {
      resvole(_tim);
    } else {
      function _ready() {
        _sdkReady = true;
        _tim.off(TIM.EVENT.SDK_READY, _ready);
        resvole(_tim);
      }
      _tim.on(TIM.EVENT.SDK_READY, _ready);
    }
  });
}

function login(userId, userSig) {
   return _tim.login({
     userID: userId,
     userSig: userSig
   })
}

function logout() {
  return _tim.logout();
}

/**
 * 添加IM的监听函数
 * @param {String} eventName
 *  监听的事件名称
 * @param {Function} fn
 *  监听函数，事件触发时该函数被执行
 * @param {String} listenerId
 *  监听函数id，可选，相同id的监听函数，只有最后添加的生效，之前添加的会被移除
 */
function addListener(eventName, fn, listenerId) {
  var handlers = _EVNET_HANDLERS[eventName];
  if (!handlers) {
    console.error("tim not support event ", eventName);
    return;
  }
  if (listenerId) {
    removeListener(eventName, listenerId);
    _listenerIdMap[listenerId] = fn;
  }
  handlers.push(fn);
}
/**
 * 移除IM的监听函数
 * @param {String} eventName
 *  监听的事件名称
 * @param {Function|String} fn
 *  监听函数或者监听函数id
 */
function removeListener(eventName, fn) {
  var handlers = _EVNET_HANDLERS[eventName];
  if (!handlers) {
    console.error("tim not support event ", eventName);
    return;
  }
  // 如果是字符串的，传进来的是listenerId
  if (typeof fn === "string") {
    let listenerId = fn;
    fn = _listenerIdMap[listenerId];
    delete _listenerIdMap[listenerId];
  }
  let idx = handlers.indexOf(fn);
  if (idx >= 0) {
    handlers.splice(idx, 1);
  }
}
function removeAllListeners(eventName) {
  var handlers = _EVNET_HANDLERS[eventName];
  if (!handlers) {
    console.error("tim not support event ", eventName);
    return;
  }
  _EVNET_HANDLERS[eventName] = [];
}
function cleanListeners() {
  _EVENT_NAMES.forEach(function(eName) {
    _EVNET_HANDLERS[eName].splice(0, _EVNET_HANDLERS[eName].length);
  });
  _listenerIdMap = {};
}

export {
  isSDKReady,
  createTim,
  getTim,
  getSafeTim,
  login,
  logout,
  addListener,
  removeListener,
  removeAllListeners,
  cleanListeners
};
