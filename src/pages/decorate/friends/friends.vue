<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in list" :key="index" :right-options="options"
				@click="bindClick($event,item)"  :disabled="item.type==0">
				<view class="item">

					<view class="img">
						<image class="img" :src="item.relativeAvatar" mode=""></image>
						<view class="isme" v-if="item.isMe">
							我
						</view>
						<image v-if="item.type==0" class="home_owner" src="../../../static/home_owner.png" mode="">
						</image>
					</view>
					<view class="info">
						<view class="name">
							{{item.relativeNickName}}
						</view>
						<view class="sub">
							{{item.typeName}}
						</view>

					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view class="add-friends" :style="{paddingBottom:systemBottom}">
			<view v-if="isMyHouse" class="add-btn" @click="toAddFriends">
				添加亲友
			</view>
			<view v-else class="exit-house" @click="exitHouse">
				退出亲友团
			</view>
		</view>
	</view>
</template>

<script>
	import {
		friendListByEstateId,
		deleteFriends
	} from "../../../api/decorate.js"
	export default {
		data() {
			return {
				roomId: '',
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#FF3347",
					},
				}, ],
				selectList: [],
				isMyHouse: false,
				list: [],
				systemBottom: ''
			};
		},
		onLoad(e) {
			if (e && e.id) {
				this.roomId = e.id;
			}
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + 'rpx';
		},
		onShow() {
			this.getFriendsList();
		},
		methods: {
			exitHouse() {
				let vm = this;
				let item = this.list.find(e=>{
				return e.isMe;
				})
				uni.showModal({
					title: '是否确定退出亲友团？',
					content: '退出后将无法看到亲友的房屋',
					success: function(res) {
						vm.deleteFriend(item.id);
					}
				});
			},
			bindClick(e, item) {
				let vm = this;
				uni.showModal({
					title: '是否确定删除亲友？',
					content: '删除亲友后，亲友将无法再看到您的房屋',
					success: function(res) {
						vm.deleteFriend(item.id);
					}
				});
			},
			async deleteFriend(id) {
				let deleteType = this.isMyHouse ? 1 : 2
				let res = await deleteFriends({
					relativeId: id,
					estateId: this.roomId,
					deleteType
				});
				console.log(res);
				this.getFriendsList();
			},
			async getFriendsList() {
				this.list = await friendListByEstateId({
					estateId: this.roomId
				});
				this.list.forEach(e => {
					if (e.isMe && e.type == 0) {
						this.isMyHouse = true;
					}
				})

			},
			toAddFriends() {
				uni.navigateTo({
					url: "../add-friends/add-friends?roomId=" + this.roomId,
				});
			},
			addAll() {
				console.log(this.selectList.length);
				console.log(this.list.length);
				if (this.selectList.length != this.list.length) {
					this.selectList = [];
					this.list.forEach((e) => {
						this.selectList.push(e.id);
					});
				} else {
					this.selectList = [];
				}
			},
			onSelect(index) {
				let selectIndex = this.selectList.indexOf(index);
				if (selectIndex > -1) {
					this.selectList.splice(selectIndex, 1);
				} else {
					this.selectList.push(index);
				}
			},
		},
	};
</script>

<style lang="scss">
	page {
		background: #fefefe;
	}

	.item {
		display: flex;
		flex-direction: row;
		width: 90%;
		height: 140rpx;
		border-bottom: 1rpx solid #fcfcfc;
		background: #FFF;
		padding: 0 32rpx;
		align-items: center;

		.img {
			width: 96rpx;
			height: 96rpx;
			border: 1rpx solid #f2f2f2;
			border-radius: 16rpx;
			position: relative;

			.isme {
				position: absolute;
				left: 0;
				top: 0;
				width: 46rpx;
				height: 28rpx;
				line-height: 28rpx;
				background: linear-gradient(139deg, #6e6e6e 8%, #393939 81%);
				border-radius: 16rpx 0rpx 16rpx 0rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				text-align: center;

			}

			.home_owner {
				position: absolute;
				bottom: -16rpx;
				right: -16rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}

		.info {
			height: 96rpx;
			display: flex;
			flex-direction: column;
			margin-left: 24rpx;
			justify-content: center;

			.name {
				font-size: 28rpx;
				color: #333333;
			}

			.sub {
				color: #999999;
				font-size: 22rpx;
				margin-top: 8rpx;
			}

		}
	}

	.add-friends {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 88rpx;
		// 
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.add-btn {
			height: 88rpx;
			background: linear-gradient(135deg, #53d5cc, #4fc9c9);
			border-radius: 12rpx;
			width: 686rpx;
			line-height: 88rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 32rpx;
		}

		.exit-house {
			color: #999999;
			font-size: 26rpx;
		}
	}

	.edit-friends {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: yellow;

		.btn {
			width: 60rpx;
			height: 60rpx;
			height: 60rpx;
			text-align: center;
			background-color: #555555;
			margin-left: 200rpx;
		}
	}
</style>
