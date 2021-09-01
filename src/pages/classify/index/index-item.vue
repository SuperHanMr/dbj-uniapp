<template>
	<view class="page-body">
		<scroll-view class="nav-left" scroll-y :scroll-top="scrollLeftTop" scroll-with-animation>
      <view  class="left-title-block">
        <view class="nav-left-item" @click="categoryClickMain(index2)"
        :class="{'active': index2==categoryActive, 'preNode': index2==categoryActive -1, 'nextNode': index2==categoryActive +1}"
          v-for="(menu2,index2) in detailData" :key="index2" >
        	{{menu2.name}}
        </view>
        <!-- <view class="nav-left-item" :class="categoryActive === detailDatas.length - 1?'nextNode':''"></view> -->
      </view>
		</scroll-view>
    <scroll-view class="nav-right" scroll-y="true">
      <view class="right-view" v-for="(menu3, index3) in detailData[categoryActive]['children']" :key="index3">
        <text class="menu3-title">{{menu3.name}}</text>
        <scroll-view class="right-card" scroll-y="true">
        <view class="right-detail" v-for="(detail, detailK) in menu3['children']" :key="detailK" @click="toGoodsList(detail.name)">
          <image :src="detail.imageUrl" ></image>
          <text>{{detail.name}}</text>
        </view>
<!--          // 用于测试
          <view class="right-detail" v-for="(details, detailsK) in imgArr" :key="detailsK" @click="toGoodsList">
             <image src="https://ali-image-test.dabanjia.com/image/20210830/17/1630316979986_9651%24srchttp___imglf4.nosdn0.126.net_img_dVhwQXpJYitzZ3AwRUV1SDFIZGJncWx2OXU1T1kvNWNqN3lqcUwwSlVPeXpVUFlFcEZIeGdnPT0.jpgreferhttp___imglf4.nosdn0.126.jpg" >
             </image>
             <text>test</text>
           </view> -->
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
      },
      tabIndex: 0
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
				tabBarHeight: 170,
        rightArr: [1,2,3,4,5,6,7],
        imgArr:[1,2,3,4,5,6,7,8,9]
			}
		},
		created(){
      console.log(this.detailData)
		},
		onShow() {
      console.log('show')
      this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
      this.getHeightList();
		},
    onload() {
      console.log('load-show')
    },
		methods: {
			getHeightList(){
        console.log(111)
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
        const query = uni.createSelectorQuery().in(this);
        console.log(query.selectAll('#tabs')[0])
        query.selectAll('#tabs').node(data => {
          // console.log(data[0].classList)
          // console.log(data)
          // console.log("得到布局位置信息" + JSON.stringify(data));
          // console.log("节点离页面顶部的距离为" + data.top);
        }).exec();
				this.categoryActive = index;
			  (this.diff>0) && (this.scrollLeftTop = Math.round((this.categoryActive * this.diff)/(this.detailData.length-1)));
      },
      toGoodsList(name) {
        uni.navigateTo({
          url: "/pages/classify/search-result/search-result?searchText=" + name
        })
      }
		},
    watch:{
      tabIndex(v) {
        this.categoryActive = 0
      }
    }
	}
</script>

<style scoped>
	.page-body {
		display: flex;
    height: calc(100% - 150rpx);
		background: #fff;
		overflow: hidden;
    font-size: 28rpx;
    color: #666666;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 25%;
		background: #FFFFFF;
	}
  .left-title-block{
    background-color: #F7F7F7;
  }
  .nav-left .preNode{
    border-radius: 0px 0px 8px 0px;
  }
  .nav-left .nextNode{
    border-radius: 0px 8px 0px 0px;
  }
	.nav-left-item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
    background-color: #FFFFFF;
	}
	.active {
		color: #111111;
		background: #F7F7F7;
	}
  .nav-right{
    padding: 30rpx 35rpx;
    background-color: #F7F7F7;
    width: 75%;
  }
  .menu3-title{
    font-size: 30rpx;
    color: #111111;
  }
  .right-card{
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    margin-top: 24rpx;
    width: 510rpx;
  }
  .right-detail{
    display: inline-block;
    /* height: 172rpx; */
    width: 124rpx;
    text-align: center;
    margin: 30rpx 0 30rpx 37rpx;
  }
  .right-card image{
    width: 124rpx;
    height: 124rpx;
  }
  .rigth-other-bar{
    background-color: #FFFFFF;
  }
	::-webkit-scrollbar {/*取消小程序的默认导航条样式*/
   width: 0;
   height: 0;
   color: transparent;
}
</style>
