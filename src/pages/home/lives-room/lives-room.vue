<template>
	<view class="content" :catchtouchmove="true" @click="handleLiveRoomClick">
		<cover-view class="live-room-navbar" :style="{top: tophight}">
			<cover-view class="navbar-btn" @click="toBack">
				<cover-image class="navbar-icon" src="../../../static/ic_back_white.png"></cover-image>
			</cover-view>
			<cover-view class="navbar-title">{{ title }}</cover-view>
		</cover-view>


		<view class="liveing" v-if="isLiveing">
			<cover-view class="state-bar" :style="{top: navBarHeight}">
				<cover-view v-for="(item,index) in roomInfo.interactionInfo" :key="item.id">

					<cover-view v-if="index==0||item.connectStatus=='connecting'" class="user"
						@click="toPersonal({index,item})">
						<cover-image class="img" :src="item.userAvatar">
						</cover-image>
						<cover-view class="name">
							{{item.userNickName}}
						</cover-view>

					</cover-view>
				</cover-view>
				<cover-view class="flex1">

				</cover-view>
				<cover-view class="state-bar-text">
					<cover-image class="img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_gkrs.png"
						mode="">
					</cover-image>
					<cover-view>{{getHotCount(roomInfo.hotCount) }}</cover-view>
				</cover-view>
			</cover-view>
			<live-player class="player" :src="livePreview" object-fit="contain" autoplay @statechange="statechange" @error="error" />
			<cover-view class="bottom-contain">
				<!-- 聊天 -->
				<cover-view class="scorll-chat">
					<cover-view class="chat-item-height">
						<cover-view v-for="item in dislplayMessageList" :key="item.ID">
							<cover-view v-if="item.type=='TIMTextElem' || item.type=='TIMImageElem'" class="chat-item">
								<cover-view class="author-wrapper">
									<cover-image class="avatar" :src="item.avatar">
									</cover-image>
									<cover-image class="anchor" v-if="item.from.startsWith('anchor')"
										src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/anchor.png">
									</cover-image>
									<cover-view class="name">{{item.nick}} :</cover-view>
								</cover-view>
								<cover-view v-if="item.type=='TIMTextElem'" class="text-info">{{item.payload.text}}</cover-view>
								<cover-image class="img" v-if="item.type=='TIMImageElem'"
									:src="item.payload.imageInfoArray[0].imageUrl" mode="aspectFit"
									@click="previewImg(item.payload.imageInfoArray[0].imageUrl)"> </cover-image>
							</cover-view>

							<cover-view v-if="item.type=='TIMGroupTipElem'&&item.payload.operationType==joinType"
								class="chat-item">
								<cover-view class="author-wrapper">
									<cover-view class="name">{{item.nick}} </cover-view>
									<cover-view>进入直播间</cover-view>
								</cover-view>
							</cover-view>

							<cover-view
								v-if="item.type=='TIMCustomElem'&&item.formatData&&(item.formatData.type=='group_product'||item.formatData.type=='img_message')"
								class="chat-item" @click="toGoodsDetail(item.formatData.params)">
								<cover-view class="author-wrapper">
									<cover-image class="avatar" :src="item.avatar">
									</cover-image>
									<cover-image class="anchor" v-if="item.from.startsWith('anchor')"
										src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/anchor.png">
									</cover-image>
									<cover-view class="name">{{item.nick}} :</cover-view>
								</cover-view>
								<cover-image v-if="item.formatData.type=='img_message'" class="img"
									:src="item.formatData.fileUrl" mode="aspectFit"
									@click="previewImg(item.formatData.fileUrl)"> </cover-image>
								<cover-view v-if="item.formatData.type=='group_product'" class="product">
									<cover-view class="product-name">
										{{item.formatData.params.spuName}}
									</cover-view>
									<cover-view class="product-info">
										<cover-image class="product-info-img" :src="item.formatData.params.imageUrl" mode="">
										</cover-image>
										<cover-view class="product-info-name">
											<cover-view class="title">
												{{item.formatData.params.skuName}}
											</cover-view>
											<cover-view class="price-info">
												<cover-view class="nomal">¥</cover-view>
												<cover-view class="big price-font">
													{{ foramtPrice(item.formatData.params.price)}}</cover-view>
												<cover-view class="nomal price-font">
													.{{ formatCent(item.formatData.params.price)}}</cover-view>
											</cover-view>
										</cover-view>
									</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				<!-- 底部功能栏 -->
				<cover-view class="bottom-send">
					<cover-view class="input-text" @click.stop="handleShowSendBox">
						<cover-view>说点什么...</cover-view>
						<cover-image class="iconfont"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_live_upload.png"
							@click.stop="handleChooseImage"></cover-image>
					</cover-view>
					<cover-view class="macphone" @click="showDownload=true">
						<cover-image class="icon_macphone"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives_macphone.png"
							mode="">
						</cover-image>
						<cover-view>连麦</cover-view>
					</cover-view>
					<cover-image class="bottom-icon"
						src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives_shopping_new.png"
						mode="" @click="showDownload=true">
					</cover-image>
					<cover-view class="bottom-icon with-bandage" @click="clickLike">
						<cover-image class="img"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives_agree_new.png"
							mode="">
						</cover-image>
						<cover-view class="like-count">
							{{totoalLick}}
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</view>
		<view v-else class="unlived">
			<image class="img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/un-liveing.png"
				mode="">
			</image>
			<view class="tips">
				直播暂未开始，去首页逛逛吧～

			</view>
			<view class="border">

			</view>
			<view class="btn" @click="toBack">
				去逛逛

			</view>
		</view>
		<view v-if="!isLogin&&isLiveing" class="remark">
			<view class="flex1">

			</view>
			<view class="remark-btn" @click="toLogin">
				登录以使用完整功能
			</view>

		</view>

		<cover-view v-if="downTipLoaded" v-show="showDownload" class="alert-app">
			<cover-view class="content">
				<cover-image class="bg-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives_download.png"></cover-image>
				<cover-image class="close" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_closed_black.png" @click="showDownload=false"></cover-image>
				<cover-view class="text-content">
					<cover-view class="text-title">
						请下载APP使用
					</cover-view>
					<cover-view class="text-tips text-top">
						咨询家装问题，去手机应用市场搜索
					</cover-view>
					<cover-view class="text-tips">
						【打扮家】APP与主播进行交流吧
					</cover-view>
					<cover-view class="text-btn" @click="showDownload=false">
						知道了
					</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
		<message-send-box :group-id="groupId" @add-message="handleAddMessage"></message-send-box>
	</view>
</template>

<script>
	import {
		getTim,
		getSafeTim,
		addListener,
		removeListener,
	} from "@/utils/tim.js";
	import upload from "../../../utils/upload.js";
	import TIM from "tim-wx-sdk";
	import MessageSendBox from "./message-send-box.vue";
	import {
		publicRoom,
		insertAndGetLikeNum
	} from "../../../api/home.js";
	import urlParse from "url-parse";
	export default {
		components: {
			MessageSendBox,
		},
		data() {
			return {
				livePreview: "",
				roomId: "",
				navBarHeight: "",
				tophight: "",
				list: [],
				count: 0,
				isLogin: false,
				imReady: false,
				title: "",
				isLiveing: true,
				downTipLoaded: false,
				showDownload: false,
				roomInfo: {},
				joinType: null,
				timer: null,
				userLikeTotal: 0,
				likeCount: 0,
				fromShare: false
			};
		},
		computed: {
			groupId() {
				return "group" + this.roomId;
			},
			totoalLick() {
				return (this.userLikeTotal || 0) + this.likeCount;
			},
			// 要显示的消息列表，最多15条
			dislplayMessageList() {
				return this.list.slice(-15);
			}
		},
		watch: {
			showDownload(val) {
				if (val) {
					this.downTipLoaded = true;
				}
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.title,
				path: `/pages/home/lives-room/lives-room?roomId=${this.roomId}`
			}
		},
		onLoad(e) {
			uni.showShareMenu();
			if (e && e.roomId) {
				this.roomId = e.roomId;
			}
			if (e.q) {
				//如果是通过二维码分享进来的兼容
				const qrCodeUrl = decodeURIComponent(e.q);
				const urlResult = urlParse(qrCodeUrl, true);
				this.fromShare = true;
				const query = urlResult.query;
				if (query.roomId) {
					this.roomId = query.roomId;
				}
			}
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},

		onShow() {
			this.getRoomInfo();
			this.timer = setInterval(this.getRoomInfo, 2000);
			this.joinType = TIM.TYPES.GRP_TIP_MBR_JOIN;
			const token = getApp().globalData.token;
			if (token) {
				this.isLogin = true;
				if (!this.imReady) {
					addListener("MESSAGE_RECEIVED", this.messageRecived, 'live-room-message-received');
					getSafeTim().then((tim) => {
						tim
							.joinGroup({
								groupID: "group" + this.roomId,
								type: TIM.TYPES.GRP_AVCHATROOM,
							})
							.then((imResponse) => {
								tim
									.getGroupProfile({
										groupID: "group" + this.roomId,
										groupCustomFieldFilter: ["extensionArr"],
									})
									.then((data) => {
										if (data.code == 0) {
											this.imReady = true;
											// extensionArr
											let groupCustomField = data.data.group.groupCustomField;
											let res = groupCustomField.filter((e) => {
												return e.key == "extensionArr";
											});
											let result = JSON.parse(res[0].value);
										}
									});
							});
					});
				}
			}
		},
		onHide() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			removeListener("MESSAGE_RECEIVED", "live-room-message-received");
		},
		methods: {
			getHotCount(count) {
				if (!count) {
					return 0;
				} else {
					if (count < 10000) {
						return count;
					} else {
						return Number(count / 10000).toFixed(2) + "w";
					}
				}
			},
			foramtPrice(item) {
				let price = String(item || "0");
				return price.slice(0, price.length - 2) || "0";
			},
			formatCent(item) {
				let price = String(item || "0");
				return price.slice(price.length - 2, price.length);
			},
			toPersonal({
				index,
				item
			}) {
				if (index == 0) {
					uni.navigateTo({
						url: "../../../sub-decorate/pages/person-page/person-page?personId=" +
							item.userId,
					});
				}
			},
			clickLike() {
				if (this.showDownload || !this.isLogin || !this.isLiveing) {
					return;
				}
				this.likeCount++;
			},
			toGoodsDetail(item) {
				uni.navigateTo({
					url: `../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.skuId}`,
				});
			},
			previewImg(url) {
				uni.previewImage({
					urls: [url],
					current: 0,
				});
			},
			getRoomInfo() {
				publicRoom(this.roomId)
					.then((e) => {
						if (!this.isLiveing) {
							this.isLiveing = false;
						}
						if (e.status == 0) {
							this.isLiveing = false;
							return;
						} else {
							this.isLiveing = true;
						}
						if (!this.livePreview) {
							this.livePreview = e.liveUrl;
						}
						if (!this.title) {
							this.title = e.title;
						}
						this.roomInfo = e;
						insertAndGetLikeNum({
							roomId: this.roomId,
							likeNum: this.likeCount,
							mediaType: 1,
						}).then((e) => {
							this.userLikeTotal = e.liveLikeTotal;
							this.likeCount = 0;
						});
					})
					.catch((e) => {
						this.isLiveing = false;
					});
			},
			messageRecived(event) {
				let messageList = event.data || [];
				let systemMessageList = messageList.filter(
					(msg) => msg.to === "group" + this.roomId
				);
				if (systemMessageList.length) {
					systemMessageList.forEach((e) => {
						if (e.type == "TIMCustomElem" && e.payload && e.payload.data) {
							e.formatData = JSON.parse(e.payload.data);
						}
					});
					this.list = this.list.concat(systemMessageList);
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "../../../pages/login/login",
				});
			},
			toBack() {
				uni.$emit("refrishHouse");
				uni.switchTab({
					url: '/pages/home/index/index'
				});
			},
			statechange(e) {
				console.log('live player state:', e);
			},
			error(e) {},
			handleShowSendBox() {
				if (this.showDownload || !this.isLogin || !this.isLiveing) {
					return;
				}
				uni.$emit("show-live-send-box");
			},
			handleLiveRoomClick() {
				uni.$emit("live-room-click");
			},
			handleAddMessage(message) {
				if (
					message.type == "TIMCustomElem" &&
					message.payload &&
					message.payload.data
				) {
					message.formatData = JSON.parse(message.payload.data);
				}
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
						tempFiles.forEach(self.sendImageMessage);
					},
				});
			},
			sendImageMessage(tempFile) {
				let self = this;
				const {
					size: fileSize,
					path: filePath
				} = tempFile;
				uni.getImageInfo({
					src: filePath,
					complete(info) {
						const {
							width = 0, height = 0
						} = info;
						let fileName = filePath.split("/").pop();
						let data = {
							type: "img_message",
							fileName: fileName,
							fileSize: fileSize,
							fileUrl: filePath,
							width: width,
							height: height,
						};
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
								getTim()
									.sendMessage(message)
									.then((res) => {
										console.log("send Image success", res);
									});
							},
							fail: (res) => {
								console.log("upload fail", res);
							},
							progess: (res) => {
								console.log("upload progess:", res);
							},
						});
					},
				});
			},
		},
	};
</script>

<style lang="scss">
	.live-room-navbar {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		min-height: 88rpx;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 16px;
		.navbar-btn {
			width: 40rpx;
			height: 40rpx;
			margin-left: 24rpx;
			display: flex;
			align-content: center;
			justify-content: center;
			.navbar-icon {
				display: inline-block;
				width: 16px;
				height: 16px;
			}
		}
		.navbar-title {
			color: #fff;
			flex: 1;
			height: 40rpx;
			line-height: 40rpx;
			margin-right: 64rpx;
			text-align: center;
		}
	}

	.product {
		margin-top: 18rpx;
		width: 448rpx;
		background: #ffffff;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 16rpx;

		.product-name {
			font-size: 22rpx;
			margin: 2rpx 2rpx 0 2rpx;
			color: #13bbbb;
			padding: 4rpx 0 12rpx 16rpx;
			background: linear-gradient(180deg, rgba(28, 191, 202, 0.16) 0%, rgba(25, 199, 212, 0) 100%);
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
		}

		.product-info {

			padding: 0 16rpx 16rpx 16rpx;
			display: flex;

			.product-info-img {
				width: 96rpx;
				height: 96rpx;
				border-radius: 8rpx;
				border: 1rpx solid #f5f5f5;
				flex-shrink: 0;
			}

			.product-info-name {
				width: 100%;
				color: black;
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					width: 100%;
					line-height: 30rpx;
					height: 30rpx;
					color: #111111;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.price-info {
					line-height: 30rpx;
					height: 30rpx;
					color: #f92a2a;
					display: flex;
					flex-flow: row nowrap;
					align-items: flex-end;

					.nomal {
						font-size: 22rpx;
						line-height: 22rpx;
					}

					.big {
						font-size: 32rpx;
						line-height: 32rpx;
						padding-left: 4rpx;
					}
				}
			}
		}
	}

	.alert-app {
		position: fixed;
		z-index: 1999;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);

		.content {
			width: 640rpx;
			height: 716rpx;
			background-color: #fff;
			border-radius: 24rpx;
			overflow: hidden;
			position: relative;
			.close {
				position: absolute;
				z-index: 1;
				width: 64rpx;
				height: 64rpx;
				right: 24rpx;
				top: 24rpx;
			}
			.bg-img {
				width: 640rpx;
				height: 350rpx;
			}
			.text-content {
				background-color: #fff;
				width: 640rpx;
				height: 366rpx;
				border-bottom-right-radius: 24rpx;
				border-bottom-left-radius: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
					margin-top: 40rpx;
				}

				.text-tips {
					font-size: 28rpx;
					color: #999999;
					line-height: 42rpx;
				}

				.text-top {
					margin-top: 8rpx;
				}

				.text-btn {
					padding: 30rpx 90rpx;
					border: 1px solid #FA3C35;
					border-radius: 12rpx;
					text-align: center;
					font-size: 28rpx;
					font-weight: 500;
					color: #FA4D32;
					margin-top: 48rpx;
				}
			}
		}
	}

	.unlived {
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			margin-top: 116rpx;
			width: 200rpx;
			height: 112rpx;
		}

		.tips {
			margin-top: 36rpx;
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 44rpx;
		}

		.border {
			margin-top: 80rpx;
			width: 670rpx;
			height: 2rpx;
			background: rgba(255, 255, 255, 0.13);
		}

		.btn {
			margin-top: 80rpx;
			width: 550rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			border: 1rpx solid #ffffff;
			border-radius: 16rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
	}

	.remark {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		opacity: 0.94;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.49), #000000);
		justify-content: center;
		align-items: center;

		.flex1 {
			flex: 1;
		}

		.remark-btn {
			width: 396rpx;
			height: 88rpx;
			margin-bottom: 280rpx;
			line-height: 88rpx;
			text-align: center;
			background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
			color: white;
			font-size: 28rpx;
			border-radius: 16rpx;
		}
	}

	.bottom-contain {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 400;

		.bottom-placeholder {
			height: 68rpx;
		}

		.bottom-send {
			height: 96rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 20rpx;
			padding-top: 20rpx;

			.input-text {
				margin-left: 24rpx;
				width: 302rpx;
				height: 72rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 12px;
				color: #fff;

				.iconfont {
					width: 32rpx;
					height: 30rpx;
					padding: 20rpx;
				}
			}

			.bottom-icon {
				width: 84rpx;
				height: 72rpx;
				margin-left: 16rpx;
				position: relative;

				.img {
					width: 84rpx;
					height: 72rpx;
				}

				&.with-bandage {
					margin-top: -14rpx;
					padding-top: 14rpx;
					.like-count {
						position: absolute;
						right: 0;
						top: 0;
						width: 44rpx;
						height: 28rpx;
						font-size: 22rpx;
						font-weight: 500;
						color: #ffffff;
						text-align: center;
						line-height: 28rpx;
						background: rgba(88, 90, 93, 0.35);
						border-radius: 10rpx 10rpx 10rpx 4rpx;
						backdrop-filter: blur(2rpx);
					}
				}
			}

			.macphone {
				width: 124rpx;
				height: 72rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #ffffff;
				margin-left: 16rpx;
				padding: 2rpx 8rpx;

				.icon_macphone {
					width: 50rpx;
					height: 50rpx;
					margin-right: 8rpx;
				}
			}
		}

		.scorll-chat {
			position: relative;
			height: 440rpx;

			.chat-item-height {
				position: absolute;
				bottom: 0;
			}
			.text-center {
				text-align: center;
				color: white;
			}

			.chat-item {
				margin-top: 12rpx;
				margin-left: 24rpx;
				max-width: 544rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 14rpx;
				color: #fff;
				padding: 0 16rpx;
				line-height: 44rpx;
				color: #fff;
				font-size: 28rpx;
				padding: 12rpx 24rpx;
				white-space: normal;
				word-break: break-all;
				display: inline-block;
				opacity: 0.7;

				.img {
					display: inline-block;
					width: 128rpx;
					height: 128rpx;
				}

				.author-wrapper {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
				}

				.anchor {
					width: 52rpx;
					height: 28rpx;
					display: inline-block;
					vertical-align: middle;
					margin-right: 8rpx;
				}

				.avatar {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					margin-right: 12rpx;
					display: inline-block;
					vertical-align: middle;
				}

				.name {
					color: rgba(255, 255, 255, 0.5);
					line-height: 44rpx;
					margin-right: 12rpx;
				}

				.text-info {
					font-size: 28rpx;
					font-weight: 400;
					color: #ffffff;
					line-height: 44rpx;
					white-space: normal;
				}
			}
		}
	}

	.state-bar {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 112rpx;
		display: flex;
		align-items: center;
		padding-bottom: 24rpx;

		.user {
			margin-left: 28rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.img {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}

			.name {
				margin-top: 10rpx;
				width: 100rpx;
				height: 28rpx;
				font-size: 20rpx;
				color: #ffffff;
				line-height: 28rpx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.flex1 {
			flex: 1;
		}

		.state-bar-text {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #ffffff;
			line-height: 24rpx;
			margin-right: 24rpx;

			.img {
				margin-right: 8rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
	}

	.content {
		width: 100vw;
		height: 100vh;
		// background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/live_bg.png");
		// background-size: 100% 100%;
		// background-repeat: no-repeat;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	.player {
		height: 100%;
		width: 100vw;
	}

	.liveing {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
