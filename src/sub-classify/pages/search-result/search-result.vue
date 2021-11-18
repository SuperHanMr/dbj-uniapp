<template>
  <view class="search-result" v-if='isShow'>
    <view class="search">
      <view class="search-init" v-if="initSearch">
        <view class="uni-searchbar" @click="clickInitSearch">
          <view class="uni-searchbar__box-icon-search">
            <view class="search-card" v-if="searchVal">
              <text>{{searchVal}}</text>
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
            <view v-else class="search-default">请搜索您要的商品</view>
          </view>
        </view>
      </view>
      <uni-search-bar @confirm="searchConfirm" clearButton="auto" cancelButton="false" focus="true" v-else>
        <uni-icons slot="searchIcon" />
      </uni-search-bar>
      <view @click="sortList">
        <sort-button class="sort-button"></sort-button>
      </view>
    </view>
    <view class="content" @scrolltolower="loadMoreList">
      <uni-swipe-action v-if="listArr.length>0">
        <uni-swipe-action-item v-for="(goodsItem,goodsIndex) in listArr" :key="goodsIndex" :right-options="options">
          <view class="goodsItem" @click="toDetails(goodsItem.product.skuId)">
            <image :src="goodsItem.product.spuImage + '?x-oss-process=image/resize,m_lfit,w_400,h_400' "
              class="goodsItemImg"></image>
            <view class="goodsInfo">
              <view class="goodsDesc">
                <view class="spu-name-box">
                  <view class="spu-name"><text class="goodsType">{{goodsItem.product.productTypeId === 1?"物品":"服务"}}</text>{{goodsItem.product.spuName}}</view>
                </view>
                <view class="tag-box">
                  <view class="middle-service" v-if="goodsItem.product.hasBadgeLevel">中级服务</view>
                  <view :class="{'price-tag': goodsItem.product.hasBadgeLevel}" v-if="goodsItem.product.hasAllowance">
                    <text>打扮家补贴{{(goodsItem.product.sku.marketPrice -goodsItem.product.skuPrice)/100}}元</text>
                  </view>
                </view>
              </view>
              <view class="goodsSpec">
                <view class="goods-money">
                  ￥
                  <text
                    class="integer-price">{{goodsItem.product.skuPrice?String(goodsItem.product.skuPrice/100).split(".")[0]: "0"}}</text>
                  <text>.{{String(goodsItem.product.skuPrice/100).split(".")[1]?String(goodsItem.product.skuPrice/100).split(".")[1]: "00"}}</text>
                  <text>/{{goodsItem.product.salesUnit.unitName?goodsItem.product.salesUnit.unitName:""}}</text>
                  <text class="del-price"
                    v-if="goodsItem.product.sku.marketPrice > goodsItem.product.skuPrice  && !goodsItem.product.process">市场价：¥{{goodsItem.product.sku.marketPrice/100}}/{{goodsItem.product.salesUnit.unitName?goodsItem.product.salesUnit.unitName:""}}</text>
                </view>
              </view>
              <view class="foot">
                <view class="goodsBrand">{{goodsItem.product.storeName}}</view>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
      <view v-if="isPageReady && !(listArr.length > 0)" class="no-goods">
        <view class="img"></view>
        <view class="text">抱歉，没有找到符合的商品 请换关键词再搜搜看吧～</view>
      </view>
    </view>
  </view>
</template>

<script>
  import sortButton from "./sort-button.vue";
  import {
    getGoodsList
  } from "../../../api/classify.js";
  export default {
    components: {
      sortButton
    },
    props: {
      searchText: '',
      categoryId: 0
    },
    data() {
      return {
        originFrom: "",
        totalPage: 0,
        listArr: [],
        initSearch: true,
        isPageReady: false,
        isShow: true,
        page: 1,
        timer: null,
        sort: "",
        isLoadMore: false,
        searchVal: ""
      }
    },
    onShow() {
      this.isShow = true
      //从支付页面或者房屋选择页面回到列表后，清空缓存的id
      uni.removeStorageSync('houseListChooseId')
      uni.removeStorageSync('goodId')
    },
    onLoad(e) {
      this.originFrom = e.originFrom
      this.searchVal = this.originFrom ? "" : this.searchText
      this.getList()
      // 对上一个页面传值
      // var shequ = getCurrentPages();
      // var prevShequ = shequ[shequ.length - 2]; 
      // prevShequ.brand ={
      //   name:"dd"
      //  }
    },
    onPullDownRefresh() {
      this.isLoadMore = false
      this.page = 1
      this.getList()
    },
    onReachBottom() {
      this.loadMoreList()
    },
    methods: {
      getList() {
        let params = {
          serviceVersion: 0,
          query: this.searchVal, //查询的关键词
          categoryId: this.originFrom ? Number(this.categoryId) : "", //搜索范围，在指定的商品分类id的范围内搜索，可不传（表示不限定商品分类）,
          supplierId: 0, //搜索范围，在指定的供应商 id 的范围内搜索，可不传（表示不限定供应商）,
          storeId: 0, //搜索范围，在指定的店铺 id 的范围内搜索，可不传（表示不限定店铺）,
          areaId: getApp().globalData.currentHouse
            .areaId, //区域编号，会按这个区域进行搜索；      区域的取值，请参考相关需求，好像是：有当前房屋就取当前房屋所在区域，没有当前房屋就取用户选取的位置区域...（具体逻辑比这个还复杂点）,
          sort: this.sort, //搜索排序方式：      price_asc  表示按价格从低到高排序；      price_desc 表示按价格从高到低排序；,
          pageIndex: this.page, //页面序号，从 1 开始，不传取 默认值第 1 页；,
          pageSize: 20, //每页数据量大小，不传取默认值 10；,
          maxErrorSize: 0, //容错程度； 0 表示数据不能有问题； -1 表示数据可以有问题；大于 1 的数表示允许问题数量在多少范围内。每条数据都记录了自己在同步时的问题数量。对本参数设置一个容错程度，可以指定问题达到什么程度的数据就不搜出来了。,
          cache: false, //是否允许缓存数据      如果为 true，则返回数据可能是从缓存中读的（如果缓存被命中的话）,
          u: 0, //设备id（目前没用到，为以后作兼容处理预留的）,
          p1: "", //平台码（目前没用到，为以后作兼容处理预留的）,
          v: "" //客户端版本号（目前没用到，为以后作兼容处理预留的）
        }

        getGoodsList(params).then((data) => {
          uni.stopPullDownRefresh()
          this.isPageReady = true
          this.totalPage = data.total
          if (this.isLoadMore) {
            this.listArr = this.listArr.concat(data.page)
          } else {
            this.listArr = data.page
          }
        })
      },
      sortList() {
        this.isLoadMore = false
        if (!this.sort) {
          this.sort = "price_asc"
        } else if (this.sort === "price_asc") {
          this.sort = "price_desc"
        } else if (this.sort === "price_desc") {
          this.sort = ""
        }
        this.getList()
      },
      loadMoreList() {
        if (this.page < this.totalPage) {
          this.page++
        } else {
          return
        }
        this.isLoadMore = true
        this.getList()
      },
      clickInitSearch() {
        this.initSearch = false
      },
      searchConfirm(resText) {
        this.isLoadMore = false
        this.searchVal = resText.value
        this.getList()
      },
      toDetails(id) {
        uni.navigateTo({
          url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id
        })
      }
    }
  }
</script>
<style>
  .search-result .uni-searchbar__box {
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
  .search-result {
    display: flex;
    justify-content: center;
  }

  .search {
    position: fixed;
    top: 0;
  }

  .search-init {
    padding: 16rpx;
  }

  .uni-searchbar {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 550rpx;
    height: 62rpx;
    padding-left: 6rpx;
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
    border-radius: 10rpx;
  }

  .search-default {
    font-size: 26rpx;
    color: #A9A9A9;
    margin-left: 10rpx;
  }

  .search-card {
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
    padding: 0 10rpx;
  }

  .search-card uni-icons {
    margin-left: 10rpx;
  }

  .uni-searchbar__box-icon-search text {
    font-size: 28rpx;
    color: #333333;
  }

  .uni-searchbar__text-placeholder {
    font-size: 26rpx;
    color: #A9A9A9;
    margin-left: 10rpx;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sort-button {}

  .search-result {
    height: 100%;
    background-color: #FFFFFF;
  }

  .content {
    background-color: #FFFFFF;
    height: calc(100% - 120rpx);
    padding-bottom: 20rpx;
    margin-top: 115rpx;
    position: relative;
    width: 100%;
    overflow: scroll;
  }

  .content-item {
    height: 20%;
    display: flex;
    border-bottom: 1px solid #ccc;
  }

  .content-item image {
    width: 200rpx;
    height: 200rpx;
  }

  .content-item .content-info {
    flex: 1;
    position: relative;
  }

  .content-info .info-size {
    position: absolute;
    bottom: 50rpx;
    left: 0;
  }

  .content-item .info-room {
    position: absolute;
    bottom: 10rpx;
    left: 0;
  }

  //商品
  .goodsItem {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 24rpx;
    padding-bottom: 22rpx;
    margin-top: 25rpx;
  }

  .goodsItem::after {
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

  .tag-box {
    width: 100%;
    margin-bottom: 26rpx;
    display: flex;
    margin-top: 8rpx;
  }

  .middle-service {
    font-size: 20rpx;
    color: #c5a58d;
    display: inline-block;
    padding: 0 10rpx;
    border: 1px solid #c5a58d;
    border-radius: 8rpx;
    line-height: 36rpx;
  }

   .price-tag {
    margin-left: 8rpx;
  }

  .price-tag text {
    float: left;
    font-size: 20rpx;
    color: #ff3347;
    padding: 0 10rpx;
    border: 1px solid #ff3347;
    border-radius: 8rpx;
    line-height: 36rpx;
  }

  .goodsItem .goodsItemImg {
    width: 220rpx;
    height: 220rpx;
    display: block;
    margin-left: 12rpx;
    margin-right: 20rpx;
    border-radius: 8rpx;
  }

  .goodsItem .goodsInfo {
    height: 220rpx;
  }

  .goodsInfo .goodsDesc {
    width: 420rpx;
    height: 120rpx;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    /*   text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical; */
    padding-bottom: 10rpx;
  }

  .spu-name-box {
    max-height: 80rpx;
    display: flex;
  }

  .spu-name {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
  }

  .goodsInfo .goodsDesc .goodsType {
    min-width: 45rpx;
    height: 30rpx;
    padding: 2rpx 10rpx 2rpx 10rpx;
    margin-right: 4rpx;
    border: 2rpx solid #35c4c4;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #35c4c4;
    line-height: 28rpx;
    text-align: center;
    vertical-align: middle;
    margin-top: 4rpx;
  }

  .goodsInfo .goodsSpec {
    width: fit-content;
    text-overflow: ellipsis;
    padding: 4rpx;
    margin-top: 2rpx;
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

  .goods-money .integer-price {
    font-size: 30rpx;
  }

  .goods-money .level {
    width: 80rpx;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #c5a58d;
    line-height: 28rpx;
    border: 2rpx solid #c5a58d;
    margin-left: 16rpx;
  }

  .del-price {
    margin-left: 12rpx;
    text-decoration: line-through;
    color: #bcbcbc;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Medium;
  }

  .goodsInfo .foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .goodsInfo .foot .goodsBrand {
    width: fit-content;
    height: 36rpx;
    color: #999999;
    font-size: 24rpx;
    line-height: 36rpx;
  }

  .no-goods {
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

  .no-goods .img {
    display: inline-block;
    width: 248rpx;
    height: 248rpx;
    background-image: url("../../../static/images/no-goods.png");
    background-size: cover;
  }

  .no-goods .text {
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
