<template>
	<message-bubble
		:message="message"
		class="servecard-wrapper"
		no-padding
	>
		<view class="servecard-template">
			<view class="servecard-template__body">
				<view class="servecard-template__side">
					<image
						class="avatar"
						:src="avatar"
						mode="aspectFill"
					/>
				</view>
				<view class="servecard-template__main">
					<view class="title">
						{{ data.name || data.nickName }}
					</view>
					<view class="role">
						<text>{{ data.jobName }}</text>
					</view>
				</view>
			</view>
			<view>
				<button
					class="servecard-button"
					@click="openC2CConversation"
				><text>立即沟通</text></button>
			</view>
			<view class="servecard-tip">
				<text>名片</text>
			</view>
		</view>
	</message-bubble>

</template>

<script>
import MessageBubble from "./message-bubble";
export default {
	name: "ServeCardTemplate",
	components: {
		MessageBubble,
	},
	props: {
		message: {
			type: Object,
			required: true,
		},
	},
	computed: {
		data() {
			return this.message.payloadData.params || {};
		},
		avatar() {
			return this.data.avatar;
		},
	},
	methods: {
		openC2CConversation() {
			this.$store.dispatch("openC2CConversation", {
				id: this.data.zeusId,
				name: this.data.name,
			});
		},
	},
};
</script>

<style scoped lang="scss">
.servecard-template {
	width: 496rpx;
	border-radius: 16rpx;
	box-sizing: border-box;
	background: #ffffff;
	border: 1rpx solid rgba(250, 77, 50, 0.4);
	display: flex;
	flex-direction: column;
	padding: 32rpx 0rpx 0;
	overflow: hidden;
}
.servecard-template__body {
	display: flex;
	flex-direction: row;
	padding: 0 32rpx;
}
.servecard-template__side {
	height: 72rpx;
	width: 72rpx;
}
.servecard-template__side .avatar {
	height: 72rpx;
	width: 72rpx;
	object-fit: cover;
	border-radius: 8rpx;
}

.servecard-template__main {
	flex: 1;
	height: 72rpx;
	padding-left: 18rpx;
}
.servecard-template__main .title {
	height: 36rpx;
	font-size: 28rpx;
	line-height: 36rpx;
	color: #111111;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.servecard-template__main .role {
	margin-top: 6rpx;
	height: 32rpx;
	font-size: 24rpx;
	line-height: 32rpx;
	color: #999999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.servecard-button {
	margin: 0 32rpx;
	height: 64rpx;
	line-height: 62rpx;
	border: 1rpx solid #cccccc;
	box-sizing: border-box;
	border-radius: 8rpx;
	color: #333333;
	font-size: 24rpx;
	background: #fff;
	margin-top: 28rpx;
}
.servecard-tip {
	height: 48rpx;
	line-height: 48rpx;
	font-size: 20rpx;
	color: #999999;
	margin-top: 28rpx;
	background: #fafafa;
	padding: 0 32rpx;
}
</style>
