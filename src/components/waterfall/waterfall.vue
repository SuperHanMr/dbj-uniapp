<template>
	<view class="waterfall">
		<view class="left">
			<block v-for="(item, index) in leftList" :key="item">
				<waterfall-item :item="item" @detail="toDetail" @load="onImageLoad" :showCheckIcon="showCheckIcon" ></waterfall-item>
			</block>
		</view>
		<view class="right">
			<block v-for="(item, index) in rightList" :key="item">
				<waterfall-item :item="item" @detail="toDetail" @load="onImageLoad" :showCheckIcon="showCheckIcon" ></waterfall-item>
			</block>
		</view>
	</view>
</template>

<script>
	import waterfallItem from "./waterfall-item.vue"
	export default {
		name: 'water-fall',
		props: {
			list: {
				type: Array,
				default: []
			},
			showCheckIcon:{
				type:Boolean,
				default:false
			},
		
		},
		components:{waterfallItem},
		watch: {
			list(n, o) {
				console.log('~~~~~~~~~~~~~')
				console.log(n);
				let that = this;
				let ol = o.length;
				let nl = n.length;
				if (nl > ol) {
					if (this.leftHeight > this.rightHeight) {
						that.rightList.push(that.list[ol]);
					} else {
						that.leftList.push(that.list[ol]);
					}
					this.onImageLoad();
				}
			}
		},
		// computed:{
		// 	checkList(){
		// 		let itemList = this.list.filter(item=>{
		// 			return item.isChecked == true
		// 		})
		// 		return itemList
		// 	}
		// },
		data() {
			return {
				leftList: [],
				rightList: [],
				itemIndex: 0,
				leftHeight: 0,
				rightHeight: 0,
				
				checkedList:[],
			};
		},
		created() {
			if (this.list.length) {
				this.leftList = [this.list[0]]; //第一张图片入栈
			}
		},
		
		destroyed() {
			console.log('destroy');
		},
		
		methods: {
			toDetail(data) {
				let index = this.list.findIndex(item=>item.id == data.id)
				this.list[index].isChecked = data.isChecked
				this.$emit('selectedItem',this.list)
			},
			
			
			onImageLoad(e) {
				if (!e) {
					console.log('无图片！！！！');
					return;
				}
				let imgH = (e.detail.height / e.detail.width) * 345 + 100 +
					20; //图片显示高度加上下面的文字的高度100rpx,加上margin-bottom20rpx
				let that = this;
				if (that.itemIndex === 0) {
					that.leftHeight += imgH; //第一张图片高度加到左边
					that.itemIndex++;
					that.rightList.push(that.list[that.itemIndex]); //第二张图片先入栈
				} else {
					that.itemIndex++;
					//再加高度
					if (that.leftHeight > that.rightHeight) {
						that.rightHeight += imgH;
					} else {
						that.leftHeight += imgH;
					}
					if (that.itemIndex < that.list.length) {
						//下一张图片入栈
						if (that.leftHeight > that.rightHeight) {
							that.rightList.push(that.list[that.itemIndex]);
						} else {
							that.leftList.push(that.list[that.itemIndex]);
						}
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	.waterfall {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;

		.left,
		.right {
			.waterfall-item {
				width: 345rpx;
				margin-top: 32rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				border-radius: 16rpx;

				image {
					width: 345rpx;
					display: block;
				}

				.title {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					padding: 16rpx;
				}
			}
		}
	}
</style>
