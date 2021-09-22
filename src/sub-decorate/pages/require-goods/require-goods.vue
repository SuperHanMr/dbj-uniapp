<template>
  <view class="tabs">
    <!-- 		<view class="search">
			<view class="uni-searchbar" @click="searchClick">
				<view class="uni-searchbar__box-icon-search">
					<uni-icons color="#999999" size="18" type="search" />
					<text class="uni-searchbar__text-placeholder">请输入搜索内容</text>
				</view>
			</view>
		</view> -->
    <view
      class="history"
      @click="toHistory"
    >
      要货记录
    </view>
    <view class="page-body-goods">
      <scroll-view
        class="nav-left"
        scroll-y
        :scroll-top="scrollLeftTop"
        scroll-with-animation
      >
        <view class="left-title-block">
          <view
            class="nav-left-item"
            :class="{'active': index2==categoryActive, 'preNode': index2==categoryActive -1, 'nextNode': index2==categoryActive +1}"
            v-for="(menu2,index2) in leftList"
            :key="index2"
            @click="categoryClickMain(menu2,index2)"
          >
            {{menu2.categoryName}}
          </view>
        </view>
        <view :style="{height:Number(menuBottom) +Number(104)+'rpx'}">

        </view>
      </scroll-view>
      <scroll-view
        class="nav-right"
        scroll-y="true"
      >
        <view
          class="right-view"
          v-for="(menu3, index3) in goodsList"
          :key="index3"
        >
          <text class="menu3-title">{{menu3.supplierName}}</text>
          <scroll-view
            class="right-card"
            scroll-y="true"
          >
            <view
              v-for="(detail, detailK) in menu3['stockAppVOS']"
              :key="detailK"
            >
              <goods-item
                :cartList="cartList"
                :item="detail"
                @change="onChange"
              ></goods-item>
            </view>
          </scroll-view>
        </view>
      </scroll-view>
    </view>
    <view
      class="bottom-btns"
      :style="{paddingBottom:systemBottom}"
    >
      <view
        class="shop-icon"
        @click="openCart"
      >
        <view
          v-if="cartCount"
          class="num"
        >
          {{cartCount}}
        </view>
      </view>
      <view
        class="btn"
        @click="toApply"
      >
        要货
      </view>
    </view>
    <uni-popup
      ref="popup"
      type="bottom"
    >
      <view class="cart-header">
        我的要货
        <view
          @click="removeAll"
          class="remove-all"
        >
          清空全部
        </view>
      </view>
      <view class="cart-content">
        <view
          v-for="(cart, cartIndex) in cartList"
          :key="cartIndex"
        >
          <goods-item
            :cartList="cartList"
            :item="cart"
            @change="changeFromCart($event,cartIndex)"
          >
          </goods-item>
        </view>

      </view>
      <view
        class="bottom-btns-pop"
        :style="{paddingBottom:systemBottom}"
      >
        <view
          class="shop-icon"
          @click="openCart"
        >
          <view
            v-if="cartCount"
            class="num"
          >
            {{cartCount}}
          </view>
        </view>
        <view
          class="btn"
          @click="toApply"
        >
          要货
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import goodsItem from "./goods-item.vue";
import { getClassifyList } from "../../../api/classify.js";
import { categoryList, inventoryDetails } from "../../../api/decorate.js";

export default {
  components: {
    goodsItem,
  },
  data() {
    return {
      projectId: "",
      cartList: [],
      navBarHeight: 0,
      dataList: [],
      newsList: [1, 2, 3, 4],
      cacheTab: [],
      tabIndex: 0,
      scrollInto: "",
      leftList: [],
      categoryActive: 0,
      goodsList: [],
      systemBottom: 0,
      menuBottom: 0,
      lastId: "",
    };
  },
  onShow() {},
  computed: {
    cartCount() {
      let count = 0;
      this.cartList.map((e) => {
        count += e.count;
      });
      return count;
    },
  },
  watch: {
    cartList: {
      handler(now, pre) {},
      deep: true,
    },
  },
  onLoad(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.menuBottom = menuButtonInfo.bottom;
    if (e && e.projectId) {
      this.projectId = e.projectId;
    }
    this.getLeftList();
  },
  methods: {
    toHistory() {
      uni.navigateTo({
        url: "../require-history/require-history",
      });
    },
    getLeftList() {
      categoryList({
        projectId: this.projectId,
        workType: 0,
      }).then((e) => {
        this.leftList = e;
        if (this.leftList.length) {
          this.currentCategoryId = this.leftList[0].categoryId;
        }
        this.getRightItems();
      });
    },
    getRightItems() {
      let params = {};
      if (this.lastId) {
        params.lastId = this.lastId;
      }
      params.workType = 0;
      params.rows = 1000;
      params.projectId = this.projectId;
      params.categoryId = this.currentCategoryId;
      inventoryDetails(params).then((e) => {
        this.goodsList = e;
      });
    },
    toApply() {
      uni.navigateTo({
        url: "/sub-decorate/pages/require-goods-apply/require-goods-apply",
      });
    },
    openCart() {
      if (!this.cartCount) {
        return;
      }
      this.$refs.popup.open();
    },
    removeAll() {
      this.cartList.splice(0, this.cartList.length);
      // this.goodsList[0].children[0].count = 0;
      // let goodsList = this.goodsList;
      // this.goodsList = [];
      // this.goodsList = goodsList;
      this.$refs.popup.close();
    },
    categoryClickMain(item, index) {
      this.currentCategoryId = item.categoryId;
      this.categoryActive = index;
      this.getRightItems();
    },
    changeFromCart(item, index) {
      console.log(item);
      // this.cartList[index] = item;
      this.$set(this.cartList, index, item);
    },
    onChange(item) {
      let haveItem = false;
      this.cartList.forEach((e) => {
        if (e.id == item.id) {
          haveItem = true;
          e.num = item.num;
        }
      });
      if (!haveItem) {
        this.cartList.push(item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  height: 80rpx;
  line-height: 80rpx;
  margin: 0 32rpx;
  text-align: end;
  opacity: 1;
  background: #ffffff;
  color: #333333;
  font-size: 28rpx;
}

.cart-header {
  width: 100%;
  height: 104rpx;
  line-height: 104rpx;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  color: #111111;

  .remove-all {
    position: absolute;
    top: 0;
    right: 32rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #999999;
  }
}

.cart-content {
  max-height: 792rpx;
  overflow: auto;
  background-color: #ffffff;
}

.bottom-btns {
  border-top: 1rpx #f2f2f2 solid;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 104rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 0;

  .shop-icon {
    width: 76rpx;
    height: 76rpx;
    position: relative;
    background-color: yellow;
    margin-left: 32rpx;

    .num {
      position: absolute;
      top: 0;
      right: 0;
      width: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 22rpx;
      color: #fff;
      text-align: center;
      opacity: 1;
      background: #ff3347;
      border: 1rpx solid #ffffff;
      border-radius: 50%;
    }
  }

  .btn {
    width: 248rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    color: #fff;
    background: linear-gradient(135deg, #36d9cd, #28c6c6);
    border-radius: 12rpx;
    margin-right: 32rpx;
  }
}

.bottom-btns-pop {
  border-top: 1rpx #f2f2f2 solid;

  background-color: #fff;
  height: 104rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .shop-icon {
    width: 76rpx;
    height: 76rpx;
    position: relative;
    background-color: yellow;
    margin-left: 32rpx;

    .num {
      position: absolute;
      top: 0;
      right: 0;
      width: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 22rpx;
      color: #fff;
      text-align: center;
      opacity: 1;
      background: #ff3347;
      border: 1rpx solid #ffffff;
      border-radius: 50%;
    }
  }

  .btn {
    width: 248rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    color: #fff;
    background: linear-gradient(135deg, #36d9cd, #28c6c6);
    border-radius: 12rpx;
    margin-right: 32rpx;
  }
}

.page-body-goods {
  display: flex;
  height: calc(100% - 90rpx);
  background: red;
  font-size: 28rpx;
  overflow: hidden;
  color: #666666;
  overflow: hidden;
}

.search {
  position: relative;
  height: 90rpx;
}

.uni-searchbar {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 686rpx;
  height: 62rpx;
  opacity: 1;
  background: #f7f7f7;
  border-radius: 16rpx;
}

.uni-searchbar__box-icon-search {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 16rpx;
  align-items: center;
}

.uni-searchbar__text-placeholder {
  font-size: 26rpx;
  color: #a9a9a9;
  margin-left: 10rpx;
}

.content-view {
  height: 100%;
}

.tabs {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
  height: 100vh;
}

.scroll-h {
  width: 100%;
  height: 80rpx;
  text-align: center;
  white-space: nowrap;
}

.uni-tab-item-short2 {
  display: inline-block;
  text-align: center;
  width: calc(50% - 64rpx);
}

.uni-tab-item-short3 {
  display: inline-block;
  flex-wrap: nowrap;
  text-align: center;
  width: calc(33.3% - 42.7rpx);
}

.uni-tab-item-short4 {
  display: inline-block;
  flex-wrap: nowrap;
  text-align: center;
  width: calc(25% - 32rpx);
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  text-align: center;
  width: 18%;
}

.uni-tab-item-title {
  color: #555;
  font-size: 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-family: PingFangSC;
  color: #999999;
}

.uni-tab-item-title-active {
  position: relative;
  color: #111111;
}

.uni-tab-item-title-active::after {
  content: "";
  display: inline-block;
  width: 50%;
  height: 4rpx;
  background-color: #00ed7d;
  border-radius: 100px 100px 0px 0px;
  position: absolute;
  bottom: -6rpx;
  left: 0;
  right: 0;
  margin: auto;
}

.swiper-item {
  flex: 1;
  flex-direction: row;
}

.scroll-v {
  flex: 1;
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
  width: 750rpx;
  width: 100%;
}

.nav {
  display: flex;
  width: 100%;
}

.nav-left {
  width: 200rpx;
  height: 100%;
  background: #f7f7f7;
}

.left-title-block {
  background-color: #f7f7f7;
}

.nav-left .preNode {
  border-radius: 0px 0px 8px 0px;
}

.nav-left .nextNode {
  border-radius: 0px 8px 0px 0px;
}

.nav-left-item {
  height: 100rpx;
  display: flex;
  width: 200rpx;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
}

.active {
  color: #111111;
  background: #ffffff;
}

.nav-right {
  padding: 0 35rpx;
  background-color: #ffffff;
}

.right-view {
  margin-top: 30rpx;
}

.menu3-title {
  font-size: 30rpx;
  color: #111111;
}

::-webkit-scrollbar {
  /*取消小程序的默认导航条样式*/
  width: 0;
  height: 0;
  color: transparent;
}
</style>
