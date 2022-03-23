<template>
	<view v-show="replyBoxShow" class="message-send-box-live" :style="{bottom: bottom + 'px'}"
		@click.stop="handleBoxClick">
		<cover-view class="input-top-padding"></cover-view>
		<view class="input-body">
			<cover-view class="input-left-padding"></cover-view>
			<textarea v-model="replyContent" style="height: 80rpx; background-color: #f5f5f5;" id="replyInput" :focus="replyInputFocus"
				:show-confirm-bar="false" :cursor-spacing="16" :adjust-position="false" fixed auto-height :disable-default-padding="true"
				class="reply-send-input-live" placeholder-class="reply-send-input-placeholder-live" placeholder="说点什么..."
				@focus="onFocus=true" @blur="onFocus=false" @keyboardheightchange="handleKeyboardShow" />
			<cover-view class="btn-wrapper-live" @click="sendTextMessage">
				<cover-view :class="{disabled: replyBtnDisabled,'reply-send-btn-select-live': replyContent.length>0,'reply-send-btn-live': replyContent.length==0}">发送</cover-view>
			</cover-view>
		</view>
		<cover-view class="input-bottom-padding"></cover-view>
	</view>
</template>

<script>
	import TIM from "tim-wx-sdk";
	import {
		getTim
	} from "../../../utils/tim.js";
	export default {
		name: "MessageSendBoxForLive",
		props: {
			groupId: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				replyContent: "",
				replyInputFocus: false,
				replyBoxShow: false,
				keyboardHeight: 0,
				onFocus: false,
				preKeyboardHeight: 0
			};
		},
		computed: {
			replyBtnDisabled() {
				return !this.replyContent.trim();
			},
			bottom() {
				return this.keyboardHeight || 0;
			},
		},
		mounted() {
			uni.$on("show-live-send-box", this.showReplyBox);
			this.$once("hook:beforeDestroy", () => {
				uni.$off("show-live-send-box", this.showReplyBox);
			});
			uni.$on("live-room-click", this.hideReplyBox);
			this.$once("hook:beforeDestroy", () => {
				uni.$off("live-room-click", this.hideReplyBox);
			});
		},
		methods: {
			showReplyBox(payload) {
				this.replyBoxShow = true;

				setTimeout(e => {
					this.replyInputFocus = true;
				}, 100)
			},
			hideReplyBox() {
				this.replyInputFocus = false;
				this.replyBoxShow = false;
			},
			handleBoxClick(e) {},
			handleKeyboardShow(e) {
				console.log('keyboard change:', e.detail.height, e.detail, e);
				const {
					height
				} = e.detail || {};
				this.keyboardHeight = height || 0;
				if (height > 0) {} else if (this.preKeyboardHeight > 0 && this.onFocus) {
					this.hideReplyBox();
				}
				this.preKeyboardHeight = height || 0;
			},
			sendTextMessage() {
				const message = getTim().createTextMessage({
					to: this.groupId,
					conversationType: TIM.TYPES.CONV_GROUP,
					payload: {
						text: this.replyContent
					},
				});
				this.$emit("add-message", message);
				getTim()
					.sendMessage(message)
					.then(() => {
						this.replyContent = "";
						this.hideReplyBox();
					})
					.catch((err) => {
						console.error("发送消息失败：", err);
					});
			},
		},
	};
</script>

<style>
	.message-send-box-live {
		display: block;
		padding: 0;
		position: fixed;
		z-index: 9999;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.input-top-padding,
	.input-bottom-padding {
		width: 100%;
    height: 20rpx;
    background: #fff;
	}

	.input-body {
		display: flex;
		flex-flow: row nowrap;
	}

	.input-left-padding {
		width: 32rpx;
		background: #fff;
		flex: none;
	}

	.reply-send-input-live {
		flex: 1;
		box-sizing: content-box;
		background: #f5f5f5;
		padding: 20rpx 32rpx;
		font-size: 14px;
		color: #111;
		height: 80rpx;
		min-height: 40rpx;
		max-height: 180rpx;
		caret-color: #FA4D32;
	}

	.reply-send-input-placeholder-live {
		color: #ccc;
		font-size: 14px;
	}

	.btn-wrapper-live {
		flex: none;
		width: 96rpx;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
	}

	.reply-send-btn-live {
		flex: none;
		font-size: 12px;
		padding: 0 20rpx;
		height: 22px;
		line-height: 22px;
		font-weight: 400;
		color: #999999;
		border-radius: 11px;
	}

	.reply-send-btn-select-live {
		flex: none;
		font-size: 12px;
		padding: 0 20rpx;
		height: 22px;
		line-height: 22px;
		font-weight: 500;
		color: #00C2B8;
		border-radius: 11px;
	}

	.reply-send-btn.disabled-live {
		color: #999;
		background: #fff;
	}
</style>
