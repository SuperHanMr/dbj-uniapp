<template>
	<view class="img-list">
		<view class="list-box1" v-if="imgList.length <= 1">
			<image :src="imgList[0]" mode=""></image>
		</view>
		<view class="list-box2" v-if="imgList.length > 1">
			<view class="top">
				<view class="left">
					<image :src="imgList[0]" mode=""></image>
				</view>
				<view class="right">
					<image :src="item" mode="" v-for="item in list2" :key='item'></image>
				</view>
			</view>
			<view class="bottom">
				<image :src="item" mode="" v-for="item in list3" :key='item'></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			imgList: {
				type: Array,
				default: []
			}
		},
		mounted() {
			console.log(this.$props.imgList, '>>>>>>>>')
			const list = this.$props.imgList;
			list.forEach((item, index) => {
				if (index === 0) {
					this.list1.push(item);
				} else if (index >0 && index <=2) {
					this.list2.push(item);
				} else if (index > 2 && index <= 5){
					this.list3.push(item);
				}
			})
		},
		data(){
			return {
				list1: [],
				list2: [],
				list3: [],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-list{
		width: 100%;
		height: 100%;
		.list-box1{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 0px 0px 16rpx 16rpx;
			}
		}
		.list-box2{
			width: 100%;
			height: 100%;
			.top{
				height: 364rpx;
				width: 100%;
				display: flex;
				.left{
					width: 456rpx;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
						border-radius: 16px;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					image{
						flex: 1;
						border-radius: 16px;
					}
				}
			}
			.bottom{
				height: 180rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				image{
					flex: 1;
					border-radius: 16px;
				}
			}
		}
	}
</style>
