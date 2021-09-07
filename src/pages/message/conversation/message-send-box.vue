<template>
  <view class="message-send-box">
    <view class="message-send-box-body">
      <view class="icon-audio"></view>
      <textarea
        v-model="messageContent"
        id="messageInput"
        :focus="inputFocus"
        auto-height
        class="message-send-input" 
        placeholder-class="message-send-input-placeholder" 
        placeholder="聊点什么吧"/>
      <view 
        class="icon-face" 
        @click="showEmojiChooser = !showEmojiChooser"
      />
      <view 
        v-if="!messageContent" 
        class="icon-plus-circle" 
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
            <image class="image" src="http://iph.href.lu/100x100" />
          </view>
          <view class="file-choose-name">
            图片
          </view>
        </view>
        <view class="file-choose-item" @click="handleFileChoose('video')">
          <view class="file-choose-image">
            <image class="image" src="http://iph.href.lu/100x100" />
          </view>
          <view class="file-choose-name">
            视频
          </view>
        </view>
        <view class="file-choose-item" @click="handleFileChoose('camera')">
          <view class="file-choose-image">
            <image class="image" src="http://iph.href.lu/100x100" />
          </view>
          <view class="file-choose-name">
            拍摄
          </view>
        </view>
        <!-- 小程序不支持选择文件 -->
        <!-- <view class="file-choose-item" @click="handleFileChoose('file')">
          <view class="file-choose-image">
            <image class="image" src="http://iph.href.lu/100x100" />
          </view>
          <view class="file-choose-name">
            文件
          </view>
        </view> -->
      </view>
      <view v-if="showEmojiChooser" class="emoji-choose-container">
        <image 
          v-for="(emoji,index) in emojiName"
          :key="emoji"
          :src="emojiMap[emoji]" 
          :alt="emoji"
          class="emoji"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import upload from "@/utils/upload.js"
  import { emojiName, emojiMap } from "@/utils/emoji-map.js"
  import { getTim } from "@/utils/tim.js"
  import { mapState } from "vuex"
  export default {
    name: "MessageSendBox",
    data() {
      return {
        messageContent: "",
        inputFocus: false,
        showFileChooser: false,
        showEmojiChooser: false,
        emojiName: emojiName,
        emojiMap: emojiMap
      }
    },
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
      }),
      toAccount() {
        if (!this.currentConversation || !this.currentConversation.conversationID) {
          return ''
        }
        return this.currentConversation.conversationID.replace(this.currentConversation.type, '');
      },
      showFooter() {
        return this.showFileChooser || this.showEmojiChooser;
      }
    },
    watch: {
      showFooter(val) {
        
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
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      this.messageInputNodesRef = query.select("#messageInput");
      
    },
    methods: {
      sendTextMessage() {
        console.log(this.toAccount, this.currentConversation.type, this.messageContent, 11111)
        const message = getTim().createTextMessage({
          to: this.toAccount,
          conversationType: this.currentConversation.type,
          payload: { text: this.messageContent },
        });
        this.$store.commit("pushCurrentMessageList", message);
        getTim().sendMessage(message).then(() => {
          this.messageContent = "";
          this.inputFocus = true;
        }).catch(() => {
          
        })
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
                console.log("choose image1:", res);
                tempFiles.forEach(self.sendImageMessage);
              }
            })
            break;
          case "video":
            uni.chooseVideo({
              sourceType: ["album"],
              success(res) {
                console.log("choose video:", res);
                const {
                  duration,
                  height,
                  width,
                  size,
                  tempFilePath,
                  thumbTempFilePath,
                } = res;
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
            break;
          case "camera":
            uni.chooseMedia({
              mediaType: ["image", "video"],
              sourceType: ["camera"],
              success(res) {
                console.log(res, 1111);
                const {
                  tempFiles
                } = res;
                tempFiles.forEach(tempFile => {
                  if (tempFile.fileType === "image") {
                    self.sendImageMessage(tempFile)
                  } else if (tempFile.fileType === "video") {
                    const {
                      duration,
                      height,
                      width,
                      size,
                      tempFilePath,
                      thumbTempFilePath,
                    } = res;
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
              fileSize: fileSize,
              fileUrl: filePath,
              width: width,
              height: height
            }
            const message = getTim().createCustomMessage({
              to: self.toAccount,
              conversationType: self.currentConversation.type,
              payload: {
                data: JSON.stringify(data),
              },
            });
            self.$store.commit("pushCurrentMessageList", message);
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
                  console.log("send Image success", res);
                });
              },
              fail: (res) => {
                console.log("upload fail", res);
              },
              progess: (res) => {
                console.log("upload progess:", res);
              }
            })
          }
        })
      },
      sendVideoMessage(tempFile) {
        let self = this;
        const {size: fileSize, path: filePath, thumbPath: thumbFilePath, duration, width, height } = tempFile;
        let fileName = filePath.split('/').pop();
        let data = {
          type: "video_message",
          fileName: fileName,
          fileSize: fileSize,
          videoDuration: Math.round(duration),
          width: width,
          height: height,
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
            // getTim().sendMessage(message).then((res) => {
            //   console.log("send Image success", res);
            // });
          },
          fail: (res) => {
            console.log("upload fail", res);
          },
          progess: (res) => {
            console.log("upload progess:", res);
          }
        })
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
            getTim().sendMessage(message).then((res) => {
              console.log("send Video success", res);
            });
          },
          fail: (res) => {
            console.log("upload fail", res);
          },
          progess: (res) => {
            console.log("upload progess:", res);
          }
        })
      },
      sendFileMessage() {
        
      }
    }
  }
</script>

<style>
  .message-send-box {
    flex: none;
    background: #fff;
  }
  .message-send-box-body {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    padding: 12rpx 8rpx;
  }
  .message-send-box-body .icon-audio,
  .message-send-box-body .icon-face,
  .message-send-box-body .icon-plus-circle {
    font-size: 22px;
    flex: none;
    margin-bottom: 16rpx;
  }
  .message-send-box-body .icon-audio {
    margin-right: 8rpx;
  }
  .message-send-box-body .icon-face,
  .message-send-box-body .icon-plus-circle {
    margin-left: 8rpx;
  }
  .message-send-input {
    padding-top: 19rpx;
    box-sizing: content-box;
    background: #f5f5f5;
    flex: 1;
    border-radius: 38rpx;
    padding: 20rpx 32rpx;
    font-size: 16px;
    color: #111;
    max-height: 180rpx;
  }
  .message-send-input-placeholder {
    color: #999;
    font-size: 16px;
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
    width: 48rpx;
    height: 48rpx;
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
    padding: 32rpx 12rpx 12rpx 32rpx;
  }
  
  .emoji-choose-container .emoji {
    width: 24px;
    height: 24px;
    flex: none;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
  }
</style>
