<template>
  <popup-bottom
		:show="show"
    @close="closeSkuBox"
  >
    <view class="sku-box">
      <view class="sku-header container">
        <image
          class="goods-img"
          :src="selectSkuInfo.imageUrl+'?x-oss-process=image/resize,m_mfit,w_96,h_96'"
        ></image>

        <view class="sku-goods-info">
          <view class="goodsDesc">
            <text class="goodsType">{{productType===1?"物品":"服务"}}</text>
            {{defaultSpu.spuName}}
          </view>
          <view class="money">
            <text class="symbol fs-26">￥</text>
            <text class="amount fs-38">{{selectSkuInfo.price/100}}/{{selectSkuInfo.unitName}}</text>
          </view>
        </view>
        <image
          class="close"
          src="../../static/ic_closed_black@2x.png"
          @click="closeSkuBox"
        ></image>
      </view>
      <scroll-view
        class="sku-list"
        scroll-y="true"
      >
        <view class="sku-item container">
          <view class="sku-name">规格</view>
          <view class="sku-content">
            <view
              class="sku-content-item"
              v-for="(sku,index) in skuNames"
              :key="sku.id"
              :style="{
									borderColor: sku.id===selectSkuInfo.id?'#333333': '#E8E8E8',
									fontWeight: sku.id===selectSkuInfo.id?'500':'normal'
								}"
              @click="selectSkuCli(sku.id,index)"
            >
						{{sku.name}}
						<image v-if="sku.id===selectSkuInfo.id" src="../../static/productAttributeSelected.svg" mode=""></image>
						</view>
          </view>
        </view>
        <view class="bottom-space"></view>
      </scroll-view>

      <view
        class="confirm-btn container"
        @click="handleConfirm"
      >确认</view>
    </view>
  </popup-bottom>
</template>

<script>
import PopupBottom from "./popup-bottom";
export default {
  components: {
    PopupBottom,
  },
  filters: {
    toFixed2: function (value) {
      if (!value) return "0.00";
      return Number(value).toFixed(2);
    },
  },
  props: {
		show: {
			type: Boolean,
			default: false
		},
    combinations: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
    productType: {
      type: Number,
      default: 1,
    },
    skuNames: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultSku: {
      type: Object,
    },
		defaultSpu: {
      type: Object,
    },
  },
  data() {
    return {
      selectSkuInfo: {},
      skuId: 0,
    };
  },
  watch: {
    // defaultSku(val) {
    //   this.initSkuData();
    // },
		show(val){
			if(val){
				this.initSkuData()
			}
		}
  },
  methods: {
    initSkuData() {
      this.selectSkuInfo = this.combinations[this.selectedIndex];
      this.skuId = this.selectSkuInfo.id;
    },
    selectSkuCli(id, index) {
      this.selectedIndex = this.combinations.findIndex(item => item.id === id);
      this.selectSkuInfo = this.combinations[this.selectedIndex];
    },
    closeSkuBox() {
      this.$emit("close");
    },
    handleConfirm() {
      if (
        this.selectedIndex === -1 ||
        (this.selectedIndex !== -1 && !this.selectSkuInfo.enabled)
      ) {
        uni.showToast({
          title: "当前规格暂不可购买",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      this.$emit("confirm", this.skuId, this.selectSkuInfo.id,this.selectSkuInfo.storeId);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
}

.flex-center-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

$font-color-light: #999999;
$page-bg-color-grey: #f5f5f5;

.fs-24 {
  font-size: 24rpx;
}

.fs-26 {
  font-size: 26rpx;
}

.fs-38 {
  font-size: 38rpx;
}

.container {
  width: 690rpx;
  margin: 0 auto;
}

.sku-box {
  min-height: 500rpx;
  background-color: white;
  padding-bottom: 92rpx;
  font-size: 28rpx;
  color: #333333;
  .sku-header {
    display: flex;
    padding: 40rpx 0 40rpx;
    .goods-img {
      width: 192rpx;
      height: 192rpx;
      border-radius: 16rpx;
      border: 1rpx solid #f4f4f4;
    }
    .close {
      width: 80rpx;
      height: 80rpx;
      display: block;
      margin-top: -30rpx;
      margin-left: 32rpx;
    }
  }
  .sku-goods-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
    .goodsDesc {
      width: 380rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #333333;
      line-height: 40rpx;
      text-overflow: ellipsis;
      .goodsType {
				display: inline-block;
				width: 60rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				margin-right: 4rpx;
				border-radius: 4rpx;
				background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
				font-size: 20rpx;
				font-weight: 600;
				color: #222222;
      }
    }
    .money {
      font-size: 28rpx;
      border: none;
      padding-bottom: 0;
      text{
      	color:#333333;
      }
    }
    .stock {
      color: $font-color-light;
    }
  }
  .sku-list {
    max-height: 600rpx;
    .bottom-space {
      height: 400rpx;
    }
  }
  .sku-item {
    padding: 8rpx 0;
    .sku-name {
      color: #333333;
      font-size: 28rpx;
      margin-bottom: 12rpx;
    }
    .sku-content {
      padding: 20rpx 0;
      flex-wrap: wrap;
      @extend .flex-center;
      .sku-content-item {
				max-width: 610rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
        padding: 16rpx 32rpx;
				margin-right: 16rpx;
				margin-bottom: 32rpx;
				border-radius: 8rpx;
        border: 2rpx solid transparent;
				position: relative;
				image{
					position: absolute;
					width:28rpx;
					height: 20rpx;
					right: -2rpx;
					bottom: -2rpx;
				}
      }
    }
    &.count {
      @extend .flex-center;
      justify-content: space-between;
      .count-box {
        @extend .flex-center;
        text,
        .count-content {
          @extend .flex-center-center;
          width: 70rpx;
          height: 70rpx;
          font-size: 32rpx;
          border: 2rpx solid $page-bg-color-grey;
        }
        .add,
        .minus {
          font-size: 44rpx;
        }
        .count-content {
          border-width: 2rpx 0;
          text-align: center;
        }
      }
    }
  }
  .confirm-btn {
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 12rpx;
    color: white;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    font-size: 32rpx;
    margin-top: 14rpx;
  }
}

[class*="disabled"] {
  color: $font-color-light;
  opacity: 0.7;
}
</style>
