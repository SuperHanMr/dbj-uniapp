<template>
  <view class="search-result" v-if='isShow'>
    <view class="search">
      <view class="search-init" v-if="initSearch">
         <view class="uni-searchbar" @click="clickInitSearch">
         	<view class="uni-searchbar__box-icon-search">
         		<view class="search-card" v-if="searchText">
              <text>{{searchText}}</text>
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
         	</view>
         </view>
       </view> 
      <uni-search-bar  @confirm="searchConfirm" clearButton="auto" cancelButton="false" focus="true" v-else>
        <uni-icons slot="searchIcon"/>
      </uni-search-bar>
      <sort-button class="sort-button"></sort-button>
    </view>
    <scroll-view class="content" scroll-y="true">
     <uni-swipe-action v-if="listData.list && listData.list.length>0">
       <uni-swipe-action-item
         v-for="(goodsItem,goodsIndex) in listData.list"
         :key="goodsIndex"
         :right-options="options"
       >
        <view class="goodsItem" @click="toDetails(goodsItem.id)">
          <image :src="goodsItem.imageUrl" class="goodsItemImg"></image>
          <view class="goodsInfo">
            <view class="goodsDesc">
              <text class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
              {{goodsItem.spuName}}
            </view>
            <view class="goodsSpec">
                  <view class="goods-money">
                    ￥
                    <text class="integer-price">{{goodsItem.convertedPrice?goodsItem.convertedPrice.split(".")[0]: 0}}</text>
                    <text>.{{goodsItem.convertedPrice?goodsItem.convertedPrice.split(".")[1]: 0}}</text>
                    <text>/{{goodsItem.unitName}}</text>
                  </view>
            </view>
            
            <view class="foot">
              <view class="goodsBrand">{{goodsItem.brandName}}</view>
            </view>
          </view>
        </view>	
      </uni-swipe-action-item>
     </uni-swipe-action>  
      <view v-if="isPageReady && !(listData.list && listData.list.length > 0)" class="no-goods">
         <view class="img"></view>
         <view class="text">抱歉，没有找到符合的商品 请换关键词再搜搜看吧～</view>
       </view>
    </scroll-view>
  </view>
</template>

<script>
  import sortButton from "./sort-button.vue";
  import {getGoodsList} from "../../../api/classify.js";
  export default {
    components: {sortButton},
    props:{
      searchText: ''
    },
    data() {
      return {
        listData: {},
        initSearch: true,
        isPageReady: false,
        isShow: true
      }
    },
    onShow(){
      this.isShow = true
      //从支付页面或者房屋选择页面回到列表后，清空缓存的id
      uni.removeStorageSync('houseListChooseId')
      uni.removeStorageSync('goodId')   
    },
    onLoad(){
      this.getList()
      // 对上一个页面传值
    // var shequ = getCurrentPages();
    // var prevShequ = shequ[shequ.length - 2]; 
    // prevShequ.brand ={
    //   name:"dd"
    //  }
    },
    methods: {
      getList() {
          getGoodsList().then((data) => {
            this.listData = data
            this.isPageReady = true
            console.log(data, 111)
          })
      },
      clickInitSearch() {
        this.initSearch = false
      },
      searchConfirm(resText) {
        console.log(resText.value)
      },
      toDetails(id){
        uni.setStorageSync(
            'goodId',
            id
        );
        uni.navigateTo({
          url: "/sub-classify/pages/goods-detail/goods-detail" 
        })
      }
    }
  }
</script>
<style>
  .search-result .uni-searchbar__box{
    box-sizing: border-box !important;
    width: 550rpx !important;
    height: 62rpx !important;
    opacity: 1;
    border: 2rpx solid #333333 !important;
    border-radius: 16rpx !important;
    background-color: #FFFFFF !important;
  }
</style>
<style scoped>
  .search-result{
    display: flex;
    justify-content: center;
  }
  .search{
    position: fixed;
    top: 0;
  }
  .search-init{
    padding: 16rpx;
  }
  .uni-searchbar {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  	width: 550rpx;
  	height: 62rpx;
    padding-left: 16rpx;
  	opacity: 1;
  	background: #f7f7f7;
  	border-radius: 16rpx;
    opacity: 1;
    border: 1px solid #333333;
    background-color: #FFFFFF;
  }
  
  .uni-searchbar__box-icon-search {
    height: 50rpx;
    overflow: hidden;
    display: flex;
    align-items: center;
  	flex-direction: row;
  	align-items: center;
  }
  .search-card{
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
  }
  .search-card uni-icons{
    margin-left: 10rpx;
  }
  .uni-searchbar__box-icon-search text{
    font-size: 28rpx;
    color: #333333;
  }
  .uni-searchbar__text-placeholder {
  	font-size: 26rpx;
    color: #A9A9A9;
  	margin-left: 10rpx;
  }
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sort-button{
    
  }
    .search-result{
      height: 100%;
      background-color: #FFFFFF;
    }   
    .content{
      background-color: #FFFFFF;
      height: calc(100% - 120rpx);
      margin-top: 115rpx;
      position: relative;
    }
    .content-item{
      height: 20%;
      display: flex;
      border-bottom: 1px solid #ccc;
    }
    .content-item image{
      width: 200rpx;
      height: 200rpx;
    }
    .content-item .content-info{
      flex:1;
      position: relative;
    }
    .content-info .info-size{
      position:absolute;
      bottom: 50rpx;
      left:0;
    }
    .content-item .info-room{
      position:absolute;
      bottom: 10rpx;
      left:0;
    }
    //商品
    .goodsItem{
    	width: 100%;
    	display: flex;
    	align-items: center;
    	padding-left: 24rpx;
    	padding-bottom: 22rpx;
      margin-top: 25rpx;
    }
    .goodsItem::after{
      content: "";
      display: inline-block;
      width: 500rpx;
      height: 2rpx;
      background-color: #f2f2f2;
      border-radius: 100px 100px 0px 0px;
      position: absolute;
      bottom: 0;
      right: 0;
      margin: auto;
    }
    .goodsItem .goodsItemImg{
    	width: 192rpx;
    	height: 192rpx;
    	display: block;
    	margin-left: 12rpx;
    	margin-right: 20rpx;
    	border-radius: 8rpx;
    }
    .goodsItem .goodsInfo{
    	height: 100%;
    }
    .goodsInfo .goodsDesc{
    	width: 420rpx;
    	height: 80rpx;
    	font-size: 28rpx;
    	color: #333333;
    	line-height: 40rpx;
    	text-overflow: ellipsis;
    }
    .goodsInfo .goodsDesc .goodsType{
    	width: 60rpx;
    	height: 30rpx;
    	padding: 2rpx 10rpx 2rpx 10rpx;
    	margin-right: 4rpx;
    	border: 2rpx solid #35c4c4;
    	border-radius: 4rpx;
    	font-size: 20rpx;
    	font-weight: 500;
    	color: #35c4c4;
    	line-height: 28rpx;
    	text-align:center;
    }
    .goodsInfo .goodsSpec{
    	width: fit-content;
    	text-overflow: ellipsis;
    	padding: 4rpx;
    	margin: 12rpx 0 12rpx 0;
    	font-size: 22rpx;
    	display: flex;
    }    
    .goods-money {
      display: flex;
      font-size: 24rpx;
      color: #ff3448;
      display: table-cell;
      vertical-align: bottom;
      font-weight: bold;
    }
    .goods-money .integer-price{
      font-size: 30rpx;
    }
    .goodsInfo .foot{
    	display: flex;
    	justify-content: space-between;
    	align-items: flex-end;
    }
    .goodsInfo .foot .goodsBrand{
    	width: fit-content;
    	height: 36rpx;
    	color: #999999;
    	font-size: 24rpx;
    	line-height: 36rpx;
    }
    .no-goods{
      width: 355rpx;
      height: 315rpx;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      text-align: center;
    }
    .no-goods .img{
      display: inline-block;
      width: 248rpx;
      height: 248rpx;
      background-image: url("../../../static/images/no-goods.png");
      background-size: cover;
    }
    .no-goods .text{
      display: inline-block;
      width: 312rpx;
      height: 80rpx;
      opacity: 1;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #999999;
      line-height: 40rpx;
    }
</style>
