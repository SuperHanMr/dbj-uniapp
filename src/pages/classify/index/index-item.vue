<template>
	<view class="page-body">
		<scroll-view class="nav-left" scroll-y :scroll-top="scrollLeftTop" scroll-with-animation>
			<view class="nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''"
				v-for="(item,index) in detailData">
				{{item.name}}
			</view>
		</scroll-view>
    <scroll-view class="nav-right" scroll-y="true">
      <view class="right-view" v-for="(v, k) in detailData[categoryActive]['children']" :key="k">
        <text>{{v.name}}</text>
        <scroll-view class="right-card" scroll-y="true">
          <view class="right-detail" v-for="(v, k) in imgArr" :key="k" @click="toGoodsList">
            <image src="../../../static/arrow_b.svg" ></image>
            <text>image</text>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
	</view>
</template>

<script>
	export default {
    props: {
      detailData: {
        type: Array,
        default: []
      }
    },
		data() {
			return {
				height: 0,
				categoryActive: 0,
				scrollLeftTop: 0,
				arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],//初始值，后边计算会根据手机适配覆盖
				leftItemHeight: 51,//49行会计算出新值进行覆盖
				navLeftHeight:0,//左边scroll-view 内层nav的总高度
				diff: 0,//左边scroll-view 内层nav的总高度与视口之差
				tabBarHeight:0,//如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
        rightArr: [1,2,3,4,5,6,7],
        imgArr:[1,2,3,4,5,6,7,8,9]
			}
		},
		created(){
      setTimeout(()=>{
        console.log(this.detailData)
      }, 2000)
			//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
			// this.$nextTick(()=>{
   //      console.log(this.detailData)
			// 	// this.getHeightList();
			// })
		},
		onShow() {
      this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
      this.getHeightList();
		},
		methods: {
			getHeightList(){
				let _this = this;
				let selectorQuery=uni.createSelectorQuery().in(this);
				selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
					_this.leftItemHeight  =  rects[0].height;
					_this.navLeftHeight = _this.leftItemHeight * _this.detailData.length;
					_this.diff =  _this.navLeftHeight - _this.height;
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect){
	// 					rect.id      // 节点的ID
	// 					rect.dataset // 节点的dataset
	// 					rect.left    // 节点的左边界坐标
	// 					rect.right   // 节点的右边界坐标
	// 					rect.top     // 节点的上边界坐标
	// 					rect.bottom  // 节点的下边界坐标
	// 					rect.width   // 节点的宽度
	// 					rect.height  // 节点的高度
						top += rect.height;
						arr.push(top)
						})
						_this.arr = arr
					}).exec()
			},
			categoryClickMain(index) {
				this.categoryActive = index;
			  (this.diff>0) && (this.scrollLeftTop = Math.round((this.categoryActive * this.diff)/(this.detailData.length-1)));
      },
      toGoodsList() {
        uni.navigateTo({
          url:  "/pages/classify/goods-list/index"
        })
      }
		}
	}
</script>

<style scoped>
	.page-body {
		display: flex;
    height: calc(100% - 200rpx);
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 25%;
		background: #fafafa;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #f1f1f1;
		border-bottom: solid 1px #f1f1f1;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-left-item:last-child{
		border-bottom: none;
	}
	.active {
		color: #FF80AB;
		background: #fff;
		border-right: 0;
	}
  .nav-right{
    padding: 30rpx;
    background-color: #ccc;
    width: 75%;
  }
  .right-view{
    /* width: 100%; */
  }
  .right-card{
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    padding: 20rpx;
    width: 90%;
    height:150px;
  }
  .right-detail{
    display: inline-block;
    width: 33%;
    text-align: center;
  }
  .right-card image{
    width: 100%;
    height: 100rpx;
  }
	::-webkit-scrollbar {/*取消小程序的默认导航条样式*/
   width: 0;
   height: 0;
   color: transparent;
}
</style>
