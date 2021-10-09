<template>
	<view v-show="replyBoxShow" class="message-send-box" :style="{bottom: bottom + 'px'}" @click.stop="handleBoxClick">
		<textarea v-model="replyContent" id="replyInput" :focus="replyInputFocus" :show-confirm-bar="false"
			:cursor-spacing="16" :adjust-position="false" fixed auto-height class="reply-send-input"
			placeholder-class="reply-send-input-placeholder" placeholder="说点什么..." @focus="onFocus=true"
			@blur="onFocus=fasle" @keyboardheightchange="handleKeyboardShow" />
		<cover-view class="btn-wrapper" @click="sendTextMessage">
			<cover-view class="reply-send-btn" :class="{disabled: replyBtnDisabled}">发送</cover-view>
		</cover-view>
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
				onFocus: false
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
				this.$nextTick(() => {
					this.replyInputFocus = true;
				});
			},
			hideReplyBox() {
				this.replyInputFocus = false;
				this.replyBoxShow = false;
			},
			handleBoxClick(e) {},
			handleKeyboardShow(e) {
				console.log('CCCCCSSSSSSAAAAAAa');
				const {
					height
				} = e.detail || {};
				this.keyboardHeight = height || 0;
				if (height > 0) {} else if (this.onFocus) {
					this.hideReplyBox();
				}
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
	.message-send-box {
		display: flex;
		flex-flow: row nowrap;
		background: #fff;
		padding: 10px 10px 10px 16px;
		align-items: flex-end;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.reply-send-input {
		flex: 1;
		box-sizing: content-box;
		background: #f5f5f5;
		flex: 1;
		border-radius: 38rpx;
		padding: 20rpx 32rpx;
		font-size: 14px;
		color: #111;
		max-height: 180rpx;
	}

	.reply-send-input-placeholder {
		color: #ccc;
		font-size: 14px;
	}

	.btn-wrapper {
		width: 96rpx;
		height: 76rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.reply-send-btn {
		flex: none;
		font-size: 12px;
		padding: 0 20rpx;
		height: 22px;
		line-height: 22px;
		background: #35c4c4;
		color: #fff;
		border-radius: 11px;
	}

	.reply-send-btn.disabled {
		color: #999;
		background: #fff;
	}
</style>
