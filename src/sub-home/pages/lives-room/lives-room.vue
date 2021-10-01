<template>
	<view class="content" @click="handleLiveRoomClick">
		<custom-navbar opacity="1" title="as??ASDSA" titleColor="#FFFFFF" bgcolor="#3b3c48">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: white;">
					</i>
				</view>
			</template>
		</custom-navbar>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}">
		</view>
		<!-- 占位 -->
		<view style="height: 10rpx;">
		</view>
		<view class="state-bar">
			<view class="">

			</view>
			<view class="">
				3.23w
			</view>
		</view>
		<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />

		<view class="bottom-contain">

			<!-- 聊天 -->
			<scroll-view id="scrollview" :scroll-top="scrollTop" class="scorll-chat" scroll-y="true"
				:scroll-into-view="bottomId">
				<view class="chat-item-height">


					<view class="chat-item" v-for="(item,index) in list" :key="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<!-- 底部功能栏 -->
			<view class="bottom-send">
				<view class="input-text" @click.stop="handleShowSendBox">
					说点什么...
          <view class="iconfont icon-face" @click.stop="handleChooseImage"></view>
				</view>
				<view class="macphone" @click="clickMacphone">
					<image class="icon_macphone"
						src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_macphone.png" mode="">
					</image>
					连麦
				</view>
				<image class="bottom-icon"
					src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_shopping.png" mode=""></image>

				<image class="bottom-icon"
					src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_agree.png" mode=""></image>

			</view>
			<!-- 底部占位 -->
			<view class="bottom-placeholder">

			</view>

		</view>
    <message-send-box
      :group-id="groupId"
      @add-message="handleAddMessage"
    ></message-send-box>
	</view>
</template>

<script>
	import {
		getTim,
		getSafeTim,
		addListener,
		cleanListeners
	} from "@/utils/tim.js"
  import upload from '../../../utils/upload.js'
	import TIM from 'tim-wx-sdk'
  import MessageSendBox from './message-send-box.vue'
	export default {
    components: {
      MessageSendBox
    },
		data() {
			return {
				livePreview: '',
				roomId: '',
				navBarHeight: "",
				tophight: "",
				list: [1, 2, 3],
				scrollTop: 0,
				count:0

			};
		},
    computed: {
      groupId() {
        return 'group' + this.roomId;
      }
    },
		onLoad(e) {
			if (e && e.livePreview) {
				this.livePreview = e.livePreview;
			}
			if (e && e.roomId) {
				this.roomId = e.roomId
			}
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// this.backTop = menuButtonInfo.top + 'px';
			// this.backHeight = menuButtonInfo.height + 'px';
			console.log("**********", this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			if (uni.getStorageSync("userId")) {
				addListener("MESSAGE_RECEIVED", (event) => {
					let messageList = event.data || [];
					let systemMessageList = messageList.filter(msg => msg.conversationID === context.state.sysConv
						.conversationID);
					if (systemMessageList.length) {

					}
				});
				getSafeTim().then(tim => {
					tim.joinGroup({
						groupID: 'group' + this.roomId,
						type: TIM.TYPES.GRP_AVCHATROOM
					}).then(imResponse => {
						tim.getGroupProfile({
							groupID: 'group' + this.roomId,
							groupCustomFieldFilter: ['extensionArr']
						}).then(data => {
							if (data.code == 0) {
								// extensionArr
								let groupCustomField = data.data.group.groupCustomField
								let res = groupCustomField.filter(e => {
									return e.key == 'extensionArr'
								})
								let result = JSON.parse(res[0].value);
								console.log('XXXXXXXXX');
								console.log(result);
							}
						});
					})
				})
			}
		},
		methods: {
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.chat-item-height').boundingClientRect();
				// query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					if(res[0]&&res[0][0].height){
						this.scrollTop=res[0][0].height
					}
				})
			},
			clickMacphone() {
				this.list = this.list.concat([this.count++]);
				this.scrollToBottom();
			},
			toBack() {
				uni.navigateBack({

				})
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.log('~~~~~~~~~');
				console.log(e);
			},
      handleShowSendBox() {
        uni.$emit("show-live-send-box");
      },
      handleLiveRoomClick() {
        uni.$emit("live-room-click");
      },
      handleAddMessage(message) {
        console.log('add sadfsadfsd', message);
        this.list.push(message);
      },
      handleChooseImage() {
        const self = this;
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
              to: self.groupId,
              conversationType: TIM.TYPES.CONV_GROUP,
              payload: {
                data: JSON.stringify(data),
              },
            });
            self.handleAddMessage(message);
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
		}
	}
</script>

<style lang="scss">
	.bottom-contain {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		// background-color: white;

		.bottom-placeholder {
			height: 68rpx;
		}

		.bottom-send {
			height: 96rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;

			.input-text {
				margin-left: 24rpx;
				width: 346rpx;
				height: 72rpx;
				opacity: 0.24;
				background: #fff;
				border-radius: 28rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        
        .iconfont {
          font-size: 18px;
        }
			}

			.bottom-icon {
				width: 84rpx;
				height: 72rpx;
				margin-left: 16rpx;
			}

			.macphone {
				width: 140rpx;
				height: 72rpx;
				background: rgba($color: #000000, $alpha: 0.24);
				border-radius: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				color: #ffffff;
				margin-left: 16rpx;

				.icon_macphone {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.scorll-chat {
			max-height: 452rpx;

			.chat-item {
				margin-left: 24rpx;
				max-width: 544rpx;
				background: rgba(0, 0, 0, 0.30);
				border-radius: 14rpx;
				color: #FFF;
			}
		}
	}

	.state-bar {
		height: 112rpx;
		margin: 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.player {
		flex: 1;
		width: 100vw;
	}
</style>
