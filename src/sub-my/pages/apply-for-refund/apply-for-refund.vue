<template>
  <view>
    <view class="container">
      <view class="product-container">
        <order-item :paddingBottom="0"></order-item>
        <view class="deposit">
          <view class="item">
            <text>押金</text>
            <text style="color:#333333 ;">￥10.00</text>
          </view>
        </view>

        <order-item :paddingBottom="32"></order-item>

        <view class="price-container">
          <view class="price-item">
            <view
              class="header"
              style="margin-bottom: 16rpx;"
            >
              <text style="margin-right: 8rpx;">运费</text>
              <view class="icon">?</view>
            </view>
            <text>￥10.00</text>
          </view>

          <view class="price-item">
            <view class="header">
              <text style="margin-right: 8rpx;">搬运费</text>
              <view class="icon">?</view>
            </view>
            <text>￥10.00</text>
          </view>
        </view>

      </view>

      <view class="refund-container">

        <view class="refund-reason">
          <view class="left">
            <view class="icon">
              *
            </view>
            <text>退款原因</text>
          </view>
          <view class="right">
            <text style="color:#C7C7C7;">请选择</text>
            <image
              src="../static/ic_arraw_down@2x.png"
              mode=""
              @click="openPopup()"
            ></image>
          </view>
        </view>
        <view class="line" />

        <view class="refund-price">
          <view
            class="edit-price"
            v-if="showEditInput==true"
          >
            <view class="left">
              <view class="icon">
                *
              </view>
              <text>退款金额</text>
            </view>
            <view class="right">
              <!-- <text>￥1000.00</text> -->
              <view class="eidt-style">
                <text>￥</text>
                <input
                  type="number"
                  :value="inputValue"
                  class="input-style"
                  :focus="isFocus"
                  @input="onKeyInput"
                  @focus="onKeyFocus"
                  @blur="onKeyBlur"
                  :style="{width:inputWidth + 'rpx'}"
                />
              </view>
            </view>
          </view>

          <view
            class="show-price"
            v-else
          >
            <view class="left">
              <view class="icon">
                *
              </view>
              <text>退款金额</text>
            </view>
            <view class="right">
              <text style="color:#FF3347;font-size: 40rpx;">￥{{inputValue==0?"0.00":inputValue}}</text>
              <image
                src="../static/ic_mine_edit_gray@2x.png"
                mode=""
                @click="showEditInput=true"
              ></image>
            </view>
          </view>

          <view class="tip-text">
            商品未发货，商家同意后将会全额退还。
          </view>

          <!-- <view class="tip-text">
					最多可以填写x，也可申请部分金额，以您与商家沟通协商的结果为准
				</view> -->
        </view>
      </view>

      <view class="remark-container">
        <view class="header">
          <text>备注说明</text>
          <text style="color: #999999;font-size: 26rpx;">{{textAreaLength}}/200</text>
        </view>
        <textarea
          v-model="query.remarks"
          placeholder="可以填写一些与客服沟通过的备注信息"
          placeholder-style="color:#AAAAAA;font-size:28rpx;padding-top:12rpx;"
          maxlength="200"
          class="remark"
          @input="onTextAreaInput"
        />
      </view>
      <view class="proposal">建议与商家沟通后再发起退款</view>

      <view class="sumbit-button">
        <view class="buttons">
          <text>提交申请</text>
        </view>
      </view>
    </view>

    <uni-popup
      ref="popup"
      :mask-click="false"
			style="background-color: #00ED7D;"
    >
			 <view class="reason-item" v-for="item in 10" :key="item" >
				 <text>可滚动内容 {{ item }}</text>
				 <view class="reason-line"/>
			 </view>
				<button @click="close">取消</button>
		</uni-popup>
  </view>

</template>

<script>
	import {getOrderDetail} from "@/api/order.js"
export default {
  data() {
    return {
      query: {
        remarks: "",
      },
      showEditInput: false,
      inputValue: 0,
      inputWidth: 4,
      textAreaLength: 0,
      isFocus: false,
    };
  },
  watch: {
		// 获取订单详情
		orderDetail(){
			console.log("订单完成页面")
			getOrderDetail({id:this.id}).then(e=>{
				this.orderInfo = e
				console.log("获取详情数据data=",this.orderInfo)
			})
		},
		
		
    showEditInput(newVal, oldVal) {
      if (newVal) {
        this.onKeyFocus();
      }
    },
    inputValue(newVal, oldVal) {
      return newVal;
    },
    textAreaLength(newVal, oldVal) {},
  },
  methods: {
    onKeyInput(event) {
      this.inputValue = event.target.value;
      this.inputWidth = event.target.value.length * 24;
    },
    onKeyFocus() {
      this.isFocus = true;
      if (!this.inputValue) {
        this.inputValue = "";
      }
    },
    onKeyBlur() {
      // 缺少输入退款金额值的判断及弹框提示数据
      this.showEditInput = false;
      this.inputValue = Number(this.inputValue).toFixed(2);
      // console.log("this.inputValue=",this.inputValue,Number(this.inputValue).toFixed(2))
    },

    onTextAreaInput(event) {
      this.textAreaLength = event.target.value.length;
    },
    openPopup() {
      this.$refs.popup.open("bottom");
			console.log("下拉箭头")
    },
    close() {
      this.$refs.popup.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f2f2f2;
  padding-bottom: 400rpx;
  .product-container {
    margin-top: 16rpx;
    padding: 32rpx;
    background: #ffffff;
    border-radius: 24rpx;
    .deposit {
      display: flex;
      justify-content: flex-end;
      margin: 24rpx 0 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 22rpx;
      .item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        width: 302rpx;
        color: #999999;
      }
    }

    .price-container {
      .price-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        color: #808080;
        font-size: 24rpx;
        .header {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          .icon {
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            line-height: 24rpx;
            text-align: center;
            color: #999999;
            border: 2rpx solid #999999;
          }
        }
      }
    }
  }

  .refund-container {
    margin-top: 16rpx;
    width: 100%;
    background-color: #ffffff;
    border-radius: 16rpx;
    .refund-reason {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      border-radius: 32rpx 32rpx 0 0;
      padding: 24rpx 16rpx 40rpx 32rpx;
      height: 120rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      .left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .icon {
          color: #ff3b30;
          width: 24rpx;
          height: 28rpx;
        }
      }
      .right {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #666666;
        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-left: 16rpx;
        }
      }
    }

    .line {
      height: 2rpx;
      margin-left: 56rpx;
      background: #f4f4f4;
    }

    .refund-price {
      background-color: #ffffff;
      border-radius: 0 0 24rpx 24rpx;

      .show-price {
        padding: 28rpx 16rpx 6rpx 32rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 28rpx;
          .icon {
            color: #ff3b30;
            width: 24rpx;
            height: 28rpx;
          }
        }
        .right {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #666666;
          image {
            width: 64rpx;
            height: 64rpx;
            object-fit: cover;
            margin-left: 16rpx;
          }
        }
      }

      .edit-price {
        padding: 40rpx 32rpx 16rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 28rpx;
          .icon {
            color: #ff3b30;
            width: 24rpx;
            height: 28rpx;
          }
        }
        .right {
          color: #ff3347;
          font-size: 40rpx;
          line-height: 40rpx;
          .eidt-style {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #ff3347;
            .input-style {
              // background-color: #f3f3f3;
              color: #ff3347;
              font-size: 20px;
              margin-right: 80rpx;
            }
          }
        }
      }

      .tip-text {
        padding: 0 32rpx 40rpx 56rpx;
        color: #aaaaaa;
        font-size: 24rpx;
        line-height: 38rpx;
        border-radius: 0 0 24rpx 24rpx;
      }
    }
  }

  .remark-container {
    margin-top: 16rpx;
    background-color: #ffffff;
    height: 472rpx;
    padding: 40rpx 32rpx;
    border-radius: 16rpx;
    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;
      font-size: 28rpx;
      color: #666666;
    }
    .remark {
      // background-color: pink;
      width: 686rpx;
      height: 420rpx;
    }
  }
  .proposal {
    padding: 24rpx 32rpx;
    color: #808080;
    font-size: 24rpx;
    line-height: 34rpx;
  }

  .sumbit-button {
    height: 136rpx;
    padding: 24rpx 34rpx;
    background-color: #fefefe;
    box-sizing: border-box;
    .buttons {
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 12rpx;
      background: linear-gradient(135deg, #53d5cc 0%, #4fc9c9 100%);
      font-size: 32rpx;
      color: #ffffff;
    }
  }
}

.reason-item{
	display: flex;
	flex-flow: column nowrap; 
	align-items: center;
	text{
		width: 750rpx;
		height: 24rpx;
		line-height: 24rpx;
		background: #FFFFFF;
		padding: 40rpx 0;
		text-align: center;
	}
	.reason-line{
		width: 750rpx;
		height:1rpx;
		background-color: #999999;
	}
}
.reason-item:nth-child(1){
	border-radius:24rpx 24rpx 0 0  ;
}
</style>
