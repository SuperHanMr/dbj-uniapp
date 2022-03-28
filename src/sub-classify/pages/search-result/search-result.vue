<template>
  <view class="search-result" v-if='isShow'>
    <view class="search">
      <view v-if="initSearch" class="uni-searchbar" @click="clickInitSearch">
        <view class="uni-searchbar__box">
          <view class="search-card" v-if="searchText">
            <text>{{searchText}}</text>
            <uni-icons color="#c0c4cc" size="15" type="clear" />
          </view>
          <view v-else class="search-default">请搜索您要的商品</view>
        </view>
      </view>
      <uni-search-bar v-else @confirm="searchConfirm" clearButton="auto" cancelButton="false" :focus="true"
        bgColor="transparent" placeholder="请搜索您要的商品" :radius="8">
        <uni-icons slot="searchIcon" />
      </uni-search-bar>
      <view @click="sortList">
        <sort-button class="sort-button"></sort-button>
      </view>
    </view>
    <view class="content">
      <scroll-view scroll-x="true" :show-scrollbar="false" class="content-scroll" v-if="tabArr.length">
        <text :class="{'activeTab': activeTabIndex === 0}" @click="clickTab(0, 0)">全部</text>
        <text v-for="(v, k) in tabArr" :key="k" :class="{'activeTab': activeTabIndex === k + 1}" @click="clickTab(k + 1, v.id)">{{v.name}}</text>
      </scroll-view>
      <goods-list></goods-list>
      <!--      <uni-swipe-action v-if="listArr.length>0">
        <uni-swipe-action-item v-for="(goodsItem,goodsIndex) in listArr" :key="goodsIndex">
          <view class="goodsItem" @click="toDetails(goodsItem.product.skuId)">
            <image :src="goodsItem.product.spuImage + '?x-oss-process=image/resize,m_lfit,w_400,h_400' "
              class="goodsItemImg"></image>
            <view class="goodsInfo">
              <view class="goodsDesc">
                <view class="spu-name-box">
                  <view class="spu-name"><text
                      class="goodsType">{{goodsItem.product.productTypeId === 1?"物品":"服务商品"}}</text>{{goodsItem.product.spuName}}
                  </view>
                </view>
                <view class="tag-box">
                  <view class="middle-service" v-if="goodsItem.product.hasBadgeLevel">中级服务</view>
                  <view class="price-tag" :class="{'price-tag-level': goodsItem.product.hasBadgeLevel}"
                    v-if="goodsItem.product.hasAllowance">
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
        </uni-swipe-action-item> -->
      <!-- </uni-swipe-action> -->
      <view v-if="isPageReady && !(listArr.length > 0)" class="no-goods">
        <view class="img"></view>
        <view class="text">抱歉，没有找到符合的商品 请换关键词再搜搜看吧～</view>
      </view>
    </view>
  </view>
</template>

<script>
  import sortButton from "./sort-button.vue";
  import goodsList from "../../../components/classify-shop/shop-list.vue";
  import {
    getGoodsList
  } from "../../../api/classify.js";
  export default {
    components: {
      sortButton,
      goodsList
    },
    data() {
      return {
        originFrom: "",
        activeTabIndex: 0,
        totalPage: 0,
        tabArr: [],
        listArr: [],
        initSearch: true,
        isPageReady: false,
        isShow: true,
        pageNum: 1,
        sort: "",
        // isLoadMore: false,
        searchText: "",
        aggregation: false,
        category1Id: 0,
        category2Id: 0,
        category4Id: 0,
        brandId: 0
      }
    },
    onShow() {
      this.isShow = true
      //从支付页面或者房屋选择页面回到列表后，清空缓存的id
      uni.removeStorageSync('houseListChooseId')
      uni.removeStorageSync('goodId')
    },
    onLoad(e) {
      this.category1Id = e.category1Id
      this.category4Id = e.category4Id
      this.brandId = e.brandId
      this.searchText = e.searchText
      this.aggregation = Boolean(Number(e.aggregation))
      this.getList()
    },
    onPullDownRefresh() {
      // this.isLoadMore = false
      this.pageNum = 1
      this.getList()
    },
    onReachBottom() {
      this.loadMoreList()
    },
    onPageScroll(e) {
      if(e.scrollTop > 0) {
        uni.pageScrollTo({
        	scrollTop: 0
        });
      }
    },
    methods: {
      clickTab(index, id) {
        this.pageNum = 1
        this.activeTabIndex = index
        this.category2Id = id
        this.aggregation = !Boolean(index)
        this.getList()
      },
      getList() {
        let params = {
          searchItemType: 'product',
          aggregation: this.aggregation,
          aggregationField: 'category2Id',
          product: {
            category1Id: Number(this.category1Id), // 一级分类id
            category2Id: Number(this.category2Id), // 二级分类id
            category4Id: Number(this.category4Id), // 四级分类id
            brandId: Number(this.brandId),
            query: this.searchText, //查询的关键词
            areaId: getApp().globalData.currentHouse
              .areaId, //区域编号，会按这个区域进行搜索；      区域的取值，请参考相关需求，好像是：有当前房屋就取当前房屋所在区域，没有当前房屋就取用户选取的位置区域...（具体逻辑比这个还复杂点）,
            sort: this.sort, //搜索排序方式：      price_asc  表示按价格从低到高排序；      price_desc 表示按价格从高到低排序；,
            pageIndex: this.pageNum, //页面序号，从 1 开始，不传取 默认值第 1 页；,
            pageSize: 20, //每页数据量大小，不传取默认值 10；,          
          }
        }
        getGoodsList(params).then((data) => {
          uni.stopPullDownRefresh()
          this.isPageReady = true
          this.totalPage = data.total
          if(data.aggregationResults) {
            this.tabArr = data.aggregationResults
          }
          // if (this.isLoadMore) {
          //   this.listArr = this.listArr.concat(data.page)
          // } else {
          //   this.listArr = data.page
          // }
          uni.$emit('passShopList', {
          	page: data.page,
          	shopList: this.pageNum
          })
        })
      },
      sortList() {
        // this.isLoadMore = false
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
        if (this.pageNum < this.totalPage) {
          this.pageNum++
        } else {
          return
        }
        // this.isLoadMore = true
        this.getList()
      },
      clickInitSearch() {
        this.initSearch = false
      },
      searchConfirm(resText) {
        // this.isLoadMore = false
        this.searchText = resText.value
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
<style scoped>
  .search-result {
    display: flex;
    justify-content: center;
  }

  .search {
    position: absolute;
    top: 0;
  }

  .search /deep/ .uni-searchbar {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 550rpx;
    height: 62rpx;
    padding-left: 8px;
    opacity: 1;
    background: #f7f7f7;
    border-radius: 16rpx;
    opacity: 1;
    border: 1px solid #333333;
    background-color: #FFFFFF;
    margin-right: 8px;
  }

  .search /deep/ .uni-searchbar .uni-searchbar__box-icon-search {
    display: none;
  }

  .search /deep/ .uni-searchbar .uni-searchbar__box {
    border: none;
    padding: 0;
  }

  .search /deep/ .uni-searchbar .uni-input-placeholder {
    font-size: 14px;
    color: #A9A9A9;
  }


  .search-default {
    font-size: 14px;
    color: #A9A9A9;
  }

  .search-card {
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
    padding: 0 10rpx;
    font-size: 28rpx;
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

  .search-result {
    height: 100%;
    background-color: #FFFFFF;
  }

  .content {
    background-color: #FFFFFF;
    height: calc(100% - 110rpx);
    padding-bottom: 20rpx;
    margin-top: 110rpx;
    position: relative;
    width: 100%;
    overflow: scroll;
  }
  .content-scroll{
    height: 80rpx;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .content-scroll .activeTab{
    background-color: #222222;
    color: #ffffff;
  }
  .content-scroll text{
    text-align: center;
    width: fit-content;
    padding: 11rpx 20rpx;
    margin-left: 16rpx;
    border-radius: 10rpx;
    background-color: #F7F7F7;
    color: #999999;
    font-size: 24rpx
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

  /*商品*/
  .goodsItem {
    width: 100%;
    display: flex;
    padding-left: 24rpx;
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

  .price-tag-level {
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
    border-radius: 16rpx;
  }

  .goodsItem .goodsInfo {
    height: 240rpx;
    flex: 1;
    border-bottom: 0.01rpx solid #F2F2F2;
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
    height: 32rpx;
    padding: 2rpx 10rpx;
    margin-right: 4rpx;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #212121;
    background: linear-gradient(90deg, #BDD9E5 0%, #CDEFCE 94.34%);
    vertical-align: text-bottom;
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
    color: #333333;
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
