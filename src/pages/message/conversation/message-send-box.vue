<template>
  <view class="message-send-box" :class="{iphone: isIphone}">
    <view v-if="isCustomerService" class="message-send-box-header">
      <view class="oper-btn" @click="handleCallAgent">
        人工客服
      </view>
    </view>
    <view class="message-send-box-body">
      <view v-if="!isCustomerService" class="iconfont icon-a-icxiaoxidibuyuyin" @click="showRecordBtn = !showRecordBtn"></view>
      <textarea
        v-show="!showRecordBtn"
        :value="messageContent"
        id="messageInput"
        :focus="inputFocus"
        :show-confirm-bar="false"
        :cursor-spacing="16"
        auto-height
        class="message-send-input"
        placeholder-class="message-send-input-placeholder"
        placeholder="聊点什么吧"
		style="caret-color: #FA462A"
        @keyboardheightchange="handleKeyboradHeightChange"
        @input="handleInput"
        @blur="inputFocus = false"
      />
      <view
        v-show="showRecordBtn"
        id="recordBar"
        class="audio-record-btn"
        @touchstart="handleRecordStart"
        @touchmove="handleRecordMove"
        @touchend="handleRecordEnd"
      >
        {{ recordStart ? `松开${recordCancel ? '取消' : '发送'}` : '按住说话' }}
      </view>
      <view
        class="iconfont icon-a-icxiaoxidibubiaoqing"
        @click="showEmojiChooser = !showEmojiChooser"
      />
      <view
        v-if="!canSendText || showRecordBtn"
        class="iconfont icon-a-icxiaoxidibutianjia"
        @click="showFileChooser = !showFileChooser"
      />
      <view
        v-else
        class="message-send-btn"
        @click="sendTextMessage">发送</view>
    </view>
    <view v-if="showFooter" class="message-send-box-footer">
      <view v-if="showFileChooser" class="file-choose-container">
        <view class="file-choose-item" @click="handleFileChoose('image')">
          <view class="file-choose-image">
            <image class="image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_pic%402x.png" />
          </view>
          <view class="file-choose-name">
            图片
          </view>
        </view>
        <view class="file-choose-item" @click="handleFileChoose('video')">
          <view class="file-choose-image">
            <image class="image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_video%402x.png" />
          </view>
          <view class="file-choose-name">
            视频
          </view>
        </view>
        <view class="file-choose-item" @click="handleFileChoose('camera')">
          <view class="file-choose-image">
            <image class="image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_shot%402x.png" />
          </view>
          <view class="file-choose-name">
            拍摄
          </view>
        </view>
        <!-- 小程序不支持选择文件 -->
        <!-- <view class="file-choose-item" @click="handleFileChoose('file')">
          <view class="file-choose-image">
            <image class="image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_file%402x.png" />
          </view>
          <view class="file-choose-name">
            文件
          </view>
        </view> -->
      </view>
      <view v-if="showEmojiChooser" class="emoji-choose-container">
        <image
          v-for="emoji in emojiName"
          :key="emoji"
          :src="emojiMap[emoji]"
          :alt="emoji"
          class="emoji"
          @click="handleChooseEmoji(emoji)"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import TIM from 'tim-wx-sdk'
  import upload from "@/utils/upload.js"
  import { emojiName, emojiMap } from "@/utils/emoji-map.js"
  import { keywordEncode } from "@/utils/decode-text.js"
  import { getTim } from "@/utils/tim.js"
  import { mapState } from "vuex"
  import { callServiceAgent } from "@/api/message.js"

  export default {
    name: "MessageSendBox",
    data() {
      return {
        messageContent: "",
        atMessageMap: {},
        inputFocus: false,
        showFileChooser: false,
        showEmojiChooser: false,
        showRecordBtn: false,
        recordStart: false,
        recordCancel: false,
        emojiName: emojiName,
        emojiMap: emojiMap,
        isIphone: false
      }
    },
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
        CONV_TYPES: (state) => state.message.CONV_TYPES,
      }),
      toAccount() {
        if (!this.currentConversation || !this.currentConversation.conversationID) {
          return ''
        }
        return this.currentConversation.conversationID.replace(this.currentConversation.type, '');
      },
      showFooter: {
        get() {
          return this.showFileChooser || this.showEmojiChooser;
        },
        set(val) {
          if (!val) {
            this.showFileChooser = false;
            this.showEmojiChooser = false;
          }
        }
      },
      // 是否人工客服
      isCustomerService() {
        return this.currentConversation.systemType === this.CONV_TYPES.CUSTOMER;
      },
      canSendText() {
        return !!this.messageContent.trim();
      }
    },
    watch: {
      showFooter(val) {
        if (val) {
          this.showRecordBtn = false;
          uni.$emit("scroll-to-bottom");
        }
      },
      showFileChooser(val) {
        if (val) {
          this.showEmojiChooser = false;
        }
      },
      showEmojiChooser(val) {
        if (val) {
          this.showFileChooser = false;
        }
      },
      showRecordBtn(val) {
        let self = this;
        if (val) {
          uni.authorize({
            scope: 'scope.record',
            success() {
              self.recorderManager = self.creatRecorderManager();
              self.$nextTick(function(){
                self.recordBarRectTask.exec((arr) => {
                  self.recordBarBounding = arr[0];
                })
              })
            },
            fail() {
              uni.showToast({
                icon: 'error',
                title: '未授权录音权限',
                duration: 2000
              });
              self.showRecordBtn = false;
            }
          })
        } else {
          this.recorderManager = null;
        }
      }
    },
    onHide() {
      this.recordStart = false;
      if (this.recorderManager) {
        this.recordCancel = true;
        this.recorderManager.stop();
      }
    },
    mounted() {
      const showFooter = () => {
        this.showFooter = false;
      };
      const query = uni.createSelectorQuery().in(this);
      this.recordBarNodesRef = query.select("#recordBar");
      this.recordBarRectTask = this.recordBarNodesRef.boundingClientRect();

      uni.$on("message-list-click", showFooter);
      this.$once("hook:beforeDestroy", () => {
        uni.$off("message-list-click", showFooter);
      });
      uni.$on("at-user-pick", this.handleAtUser);
      uni.$on("at-user-close", this.closeAtUser);
      this.$once("hook:beforeDestroy", () => {
        uni.$off("at-user-pick", this.handleAtUser);
        uni.$on("at-user-close", this.closeAtUser);
      });
      // #ifdef MP-WEIXIN
      let info = uni.getSystemInfoSync();
      if (/ios/i.test(info.platform)) {
        this.isIphone = true;
      }
      // #endif
    },
    beforeDestroy() {
      this.recordBarRectTask = null;
      this.recordBarNodesRef = null;
    },
    methods: {
      handleInput(e) {
        let preValue = this.messageContent;
        let { detail = {} } = e;
        let { cursor, value } = detail;
        if (this.currentConversation.type === TIM.TYPES.CONV_GROUP && !this.isCustomerService) {
          let isDelete = preValue.length > value.length;
          if (isDelete) {
            // 删除空格时，判断是否是删除@消息
            if (preValue[cursor] === " ") {
              let matchKey = "";
              let isDelAt = Object.keys(this.atMessageMap).some((key) => {
                matchKey = key;
                return "@" + key === value.slice(cursor - (key.length + 1), cursor);
              });
              if (isDelAt) {
                value = value.slice(0, cursor - (matchKey.length + 1)) + value.slice(cursor);
              }
            }
          } else {
            // 是否输入@符号
            if (value[cursor - 1] === "@") {
              this.inputFocus = false;
              this.inputCursor = cursor;
              uni.navigateTo({
                url: "./at-user-list"
              })
            }
          }
        }
        this.messageContent = value;
      },
      closeAtUser() {
        this.inputCursor = 0;
        if (this.inputFocus) {
          this.inputFocus = false;
        }
        setTimeout(() => {
          this.inputFocus = true;
        }, 200);
      },
      handleAtUser(user) {
        let {nick, userID} = user;
        let text = this.messageContent;
        this.messageContent = text.slice(0, this.inputCursor) + nick + " " + text.slice(this.inputCursor);
        this.atMessageMap[nick] = {
          nick: nick,
          userID: userID
        };
        this.inputCursor = 0;
      },
      sendMessage(text) {
        this.messageContent = text;
        this.sendTextMessage()
      },
      sendTextMessage() {
        console.log(this.toAccount, this.currentConversation.type, this.messageContent, 11111);
        let text = this.messageContent.trim();
        if (!text) {
          uni.showToast({
            icon: "error",
            title: "不能发送空消息"
          })
          return;
        }
        let msgText = this.messageContent;
        let atUserList = [];
        let keyGroup = Object.keys(this.atMessageMap).map(key => keywordEncode(key)).join("|");
        msgText = msgText.replace(new RegExp("@(" + keyGroup + ") ", "g"), (m, key) => {
          let { userID } = this.atMessageMap[key];
          atUserList.push(userID === "zeus_0" ? TIM.TYPES.MSG_AT_ALL : userID);
          return "@" + key + "[" + userID + "]";
        });
        console.log(msgText, atUserList);
        let message;
        if (atUserList.length) {
          message = getTim().createTextAtMessage({
            to: this.toAccount,
            conversationType: this.currentConversation.type,
            payload: {
              text: msgText,
              atUserList: atUserList
            },
          });
        } else {
          message = getTim().createTextMessage({
            to: this.toAccount,
            conversationType: this.currentConversation.type,
            payload: { text: msgText },
          });
        }
        this.$store.commit("pushCurrentMessageList", message);
        uni.$emit("scroll-to-bottom");
        getTim().sendMessage(message).then(() => {
          this.messageContent = "";
          // this.inputFocus = true;
          uni.$emit("scroll-to-bottom");
        }).catch((err) => {
          console.error("发送消息失败：", err);
        })
      },
      sendImageMessage(tempFile) {
        let self = this;
        const {size: fileSize,path: filePath} = tempFile;
        uni.getImageInfo({
          src: filePath,
          complete(info) {
            const { width = 0, height = 0 } = info;
            console.log("file path:", filePath, "file info:", info, 111111);
            let fileName = filePath.split('/').pop();
            let data = {
              type: "img_message",
              fileName: fileName,
              fileSize: +fileSize,
              fileUrl: filePath,
              width: +width,
              height: +height
            }
            const message = getTim().createCustomMessage({
              to: self.toAccount,
              conversationType: self.currentConversation.type,
              payload: {
                data: JSON.stringify(data),
              },
            });
            self.$store.commit("pushCurrentMessageList", message);
            uni.$emit("scroll-to-bottom");
            const sendFail = () => {
              uni.showToast({
                icon: "error",
                title: "消息发送失败"
              })
              self.$store.commit("removeMessageFromCurrentList", message);
              uni.$emit("scroll-to-bottom");
            };
            upload({
              filePath: filePath,
              fileType: "image",
              success: (res) => {
                console.log("upload success", res);
                let url = res.url;
                let payload = message.payload;
                let data = payload.data;
                let extObj = JSON.parse(data);
                extObj.fileUrl = url;
                let newData = JSON.stringify(extObj);
                message.payload.data = newData;
                getTim().sendMessage(message).then((res) => {
                  uni.$emit("scroll-to-bottom");
                  console.log("send Image success", res);
                });
              },
              fail: (res) => {
                console.log("upload fail", res);
                sendFail();
              },
              progess: (res) => {
                console.log("upload progess:", res);
              }
            }).catch(sendFail);
          }
        })
      },
      sendVideoMessage(tempFile) {
        let self = this;
        console.log("send video message", tempFile);
        const {size: fileSize, path: filePath, thumbPath: thumbFilePath, duration, width, height } = tempFile;
        let fileName = filePath.split('/').pop();
        let data = {
          type: "video_message",
          fileName: fileName,
          fileSize: +fileSize,
          videoDuration: Math.round(duration),
          width: +width,
          height: +height,
          fileUrl: filePath,
          thumbnailUrl: thumbFilePath,
        }
        const message = getTim().createCustomMessage({
          to: self.toAccount,
          conversationType: self.currentConversation.type,
          payload: {
            data: JSON.stringify(data),
          },
        });
        self.$store.commit("pushCurrentMessageList", message);
        uni.$emit("scroll-to-bottom");
        let thumbReady = false;
        let videoReady = false;
        const sendFail = () => {
          uni.showToast({
            icon: "error",
            title: "消息发送失败"
          })
          self.$store.commit("removeMessageFromCurrentList", message);
          uni.$emit("scroll-to-bottom");
        }
        const sendMessage = () => {
          // 缩略图和视频都上传成功后再发消息
          if (thumbReady && videoReady) {
            getTim().sendMessage(message).then((res) => {
              uni.$emit("scroll-to-bottom");
              console.log("send Image success", res);
            });
          }
        }
        upload({
          filePath: thumbFilePath,
          fileType: "image",
          success: (res) => {
            console.log("upload success", res);
            let url = res.url;
            let payload = message.payload;
            let data = payload.data;
            let extObj = JSON.parse(data);
            extObj.thumbnailUrl = url;
            let newData = JSON.stringify(extObj);
            message.payload.data = newData;
            thumbReady = true;
            sendMessage();
          },
          fail: (res) => {
            console.log("upload fail", res);
            sendFail();
          },
          progess: (res) => {
            console.log("upload progess:", res);
          }
        }).catch(sendFail);
        upload({
          filePath: filePath,
          fileType: "video",
          success: (res) => {
            console.log("upload success", res);
            let url = res.url;
            let payload = message.payload;
            let data = payload.data;
            let extObj = JSON.parse(data);
            extObj.fileUrl = url;
            let newData = JSON.stringify(extObj);
            message.payload.data = newData;
            videoReady = true;
            sendMessage();
          },
          fail: (res) => {
            console.log("upload fail", res);
            sendFail();
          },
          progess: (res) => {
            console.log("upload progess:", res);
          }
        }).catch(sendFail)
      },
      sendAudioMessage(res) {
        // 1. 创建消息实例，接口返回的实例可以上屏
        const message = getTim().createAudioMessage({
          to: this.toAccount,
          conversationType: this.currentConversation.type,
          // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
          // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
          // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            file: res
          },
          // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
          // cloudCustomData: 'your cloud custom data'
        });
        this.$store.commit("pushCurrentMessageList", message);
        // 2. 发送消息
        let promise = getTim().sendMessage(message);
        promise.then(function(imResponse) {
          uni.$emit("scroll-to-bottom");
          console.log("send audio success", imResponse);
        }).catch(function(imError) {
          // 发送失败
          console.warn('sendMessage error:', imError);
        });
      },
      handleFileChoose(type) {
        let self = this;
        switch(type) {
          case "image":
            uni.chooseImage({
              sourceType: ["album"],
              success(res) {
                const {
                  tempFilePaths,
                  tempFiles
                } = res;
                console.log("choose image:", res);
                tempFiles.forEach(self.sendImageMessage);
              }
            })
            break;
          case "video":
            uni.chooseMedia({ //chooseVideo无缩略图
              mediaType: ["video"],
              sourceType: ["album"],
              success(res) {
                console.log("choose video:", res);
                const {
                  tempFiles = [],
                  type
                } = res;
                tempFiles.forEach(tempFile => {
                  if (type === "video" || tempFile.fileType === "video") {
                    const {
                      duration,
                      height,
                      width,
                      size,
                      tempFilePath,
                      thumbTempFilePath,
                    } = tempFile;
                    self.sendVideoMessage({
                      path: tempFilePath,
                      thumbPath: thumbTempFilePath,
                      size: size,
                      duration: duration,
                      width: width,
                      height: height
                    });
                  }
                });
              }
            });
            break;
          case "camera":
            uni.chooseMedia({
              mediaType: ["image", "video"],
              sourceType: ["camera"],
              success(res) {
                console.log("choose camera:", res);
                const {
                  tempFiles,
                  type
                } = res;
                tempFiles.forEach(tempFile => {
                  if (type === "image" || tempFile.fileType === "image") {
                    const {
                      tempFilePath,
                      size
                    } = tempFile;
                    self.sendImageMessage({
                      path: tempFilePath,
                      size: size
                    });
                  } else if (type === "video" || tempFile.fileType === "video") {
                    const {
                      duration,
                      height,
                      width,
                      size,
                      tempFilePath,
                      thumbTempFilePath,
                    } = tempFile;
                    self.sendVideoMessage({
                      path: tempFilePath,
                      thumbPath: thumbTempFilePath,
                      size: size,
                      duration: duration,
                      width: width,
                      height: height
                    });
                  }
                })
              }
            })
            break;
        }
      },
      handleChooseEmoji(emoji) {
        let self = this;
        this.$nextTick(() => {
          uni.getSelectedTextRange({
            complete(res) {
              console.log("cursor complete:", res);
              const { start, end, errMsg } = res;
              if (!/ok/i.test(errMsg)) {
                self.messageContent += emoji;
              } else {
                self.messageContent =
                  self.messageContent.slice(0, start) +
                  emoji +
                  self.messageContent.slice(end);
              }
            },
          })
        })
      },
      creatRecorderManager() {
        let self = this;
        const recorderManager = uni.getRecorderManager();
        // 1 监听录音错误事件
        recorderManager.onError(function(errMsg) {
          console.warn('recorder error:', errMsg);
          this.recordCancel = false;
          this.recordStart = false;
        });
        // 2 监听录音结束事件，录音结束后，调用 createAudioMessage 创建音频消息实例
        recorderManager.onStop(function(res) {
          console.log('recorder stop', self.recordCancel, res);
          if (!self.recordCancel) {
            self.sendAudioMessage(res);
          }
          self.recordCancel = false;
        });
        return recorderManager;
      },
      handleRecordStart() {
        const recordOptions = {
          duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
          sampleRate: 44100, // 采样率
          numberOfChannels: 1, // 录音通道数
          encodeBitRate: 192000, // 编码码率
          format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
        };
        this.recordCancel = false;
        this.recordStart = true;
        // 开始录音
        this.recorderManager.start(recordOptions);
      },
      handleRecordMove(options) {
        console.log("touch move", options, options.target.id, options.currentTarget.id);
        let mouseEvt = options.touches[0];
        let mouseX = mouseEvt.clientX;
        let mouseY = mouseEvt.clientY;
        if (this.recordBarBounding) {
          let {left, right, top, bottom} = this.recordBarBounding;
          if (
            mouseX >= left &&
            mouseX <= right &&
            mouseY >= top &&
            mouseY <= bottom) {
            this.recordCancel = false;
          } else {
            this.recordCancel = true;
          }
        } else {
          this.recordCancel = false;
        }
      },
      handleRecordEnd() {
        this.recordStart = false;
        this.recorderManager.stop();
      },
      handleKeyboradHeightChange(e) {
        const {
          height
        } = e.detail || {};
        uni.$emit("keyboard-change", height || 0);
      },
      // 找人工客服
      handleCallAgent() {
        callServiceAgent().then(res => {
          getTim().sendMessage({
            type: "AGENT_STATUS",
            payload: {
              type: res == 0 ? "custom_agant_coming" : "custom_agant_waiting",
              position: res
            }
          });
        }).catch(err => {
          let message = err.data ? err.data.message : '找人工客服出错了';
          getTim().sendMessage({
            type: "AGENT_STATUS",
            payload: {
              type: "custom_agant_close",
              message: message
            }
          });
        })
      }
    }
  }
</script>

<style>
  .message-send-box {
    flex: none;
    background: #fff;
  }

  .message-send-box-header {
    padding: 24rpx 20rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .message-send-box-header .oper-btn {
    padding: 14rpx 32rpx;
    font-size: 12px;
    background: #f5f5f5;
    border-radius: 30rpx;
  }
  .message-send-box-body {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    padding: 12rpx 8rpx;
  }
  .message-send-box-body .iconfont {
    font-size: 36px;
    flex: none;
  }
  .message-send-box-body > .iconfont + .message-send-input,
  .message-send-box-body > .message-send-input + .iconfont,
  .message-send-box-body > .iconfont + .iconfont {
    margin-left: 4px;
  }
  .message-send-input,
  .audio-record-btn {
    box-sizing: content-box;
    background: #f5f5f5;
    flex: 1;
    border-radius: 38rpx;
    padding: 9px 16px;
    font-size: 16px;
    line-height: 20px;
    color: #111;
    max-height: 180rpx;
  }
  .message-send-input-placeholder {
    color: #999;
    font-size: 16px;
  }
  .message-send-box.iphone {
    padding-bottom: 34px;
  }
  .message-send-box.iphone .message-send-input {
    padding: 1px 16px;
  }

  .audio-record-btn {
    text-align: center;
    height: 38px;
    box-sizing: border-box;
    line-height: 38px;
    padding: 0rpx 32rpx;
  }
  .message-send-btn {
    font-size: 12px;
    padding: 0 20rpx;
    margin-left: 8rpx;
    margin-bottom: 16rpx;
    height: 22px;
    line-height: 22px;
    background: #35C4C4;
    color: #fff;
    border-radius: 11px;
  }
  .file-choose-container {
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
  }
  .file-choose-item {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  .file-choose-image {
    width: 116rpx;
    height: 116rpx;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24rpx;
  }
  .file-choose-image .image {
    width: 64rpx;
    height: 64rpx;
  }
  .file-choose-name {
    color: #999;
    font-size: 12px;
    margin-top: 16rpx;
    line-height: 32rpx;
  }

  .emoji-choose-container {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    padding: 22rpx;
  }

  .emoji-choose-container .emoji {
    width: 24px;
    height: 24px;
    flex: none;
    box-sizing: content-box;
    padding: 10rpx;
  }

</style>
