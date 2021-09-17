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

function _onSdkReady() {
  _sdkReady = true;
}

function _onSdkNotReady() {
  _sdkReady = false;
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

function addListener(eventName, fn) {
  var handlers = _EVNET_HANDLERS[eventName];
  if (!handlers) {
    console.error("tim not support event ", eventName);
    return;
  }
  handlers.push(fn);
}
function removeListener(eventName, fn) {
  var handlers = _EVNET_HANDLERS[eventName];
  if (!handlers) {
    console.error("tim not support event ", eventName);
    return;
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
}

export {
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
