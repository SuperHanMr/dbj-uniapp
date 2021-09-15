<template>
  <view>
    <view class="container">
      <view   class="product-container">
        <view
					v-if="type == 'whole'"
          v-for="(item,index) in refundInfo.details" :key="index">
          <view v-for="item2 in item.details" :key="item2.id"
          >
            <order-item :dataList="item2"></order-item>
          </view>
        </view>

        <view v-if="type == 'partical'">
          <order-item :dataList="refundInfo"></order-item>
        </view>

        <view class="price-container">
          <view class="price-item">
            <view
              class="header"
              style="margin-bottom: 16rpx;"
            >
              <text style="margin-right: 8rpx;">运费</text>
              <view class="icon">?</view>
            </view>
            <text>￥{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>

          </view>

          <view class="price-item">
            <view class="header">
              <text style="margin-right: 8rpx;">搬运费</text>
              <view class="icon">?</view>
            </view>
            <text>￥{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>

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
					
         <view class="reason" v-if="!reasonName">
            <text style="color:#C7C7C7;">请选择</text>
            <image
              src="../../static/ic_arraw_down@2x.png"
              mode=""
              @click="openPopup()"
            ></image>
          </view>
					
					<view class="reason" v-else >
					  <text style="margin-right: 16rpx;" @click="openPopup()">{{reasonName}}</text>
					</view>
        </view>
				
				<view class="line" />
				
				<view class="refund-price" v-if="type == 'whole'">
					<view
					  class="edit-price"
					>
						<view class="left">
							<view class="icon">
								*
							</view>
							<text>退款金额</text>
						</view>
						<view class="right1" >
						  <text >￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0]}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}</text>
						</view>
					</view>
					<view class="tip-text">
						商品未发货，商家同意后将会全额退还。
					</view>
				</view>

     
				<view class="refund-price" v-if="type == 'partical'">
					<view	v-if="showEditInput==true"	class="edit-price">
						<view class="left">
							<view class="icon">
								*
							</view>
							<text>退款金额</text>
						</view>
						<view class="right1">
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
	
					<view v-else class="show-price">
						<view class="left">
							<view class="icon">
								*
							</view>
							<text>退款金额</text>
						</view>
						<view class="right2">
							<text style="color:#FF3347;font-size: 40rpx;">￥{{inputValue==0?"0.00":inputValue}}</text>
							<image
								src="../../static/ic_mine_edit_gray@2x.png"
								mode=""
								@click="showEditInput=true"
							></image>
						</view>
					</view>

					<view class="tip-text" >
						最多可以填写￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0]}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}，也可申请部分金额，以您与商家沟通协商的结果为准
					</view>
        </view>
     
			
			
			</view>

      <view class="remark-container">
        <view class="header">
          <text>备注说明</text>
          <text style="color: #999999;font-size: 26rpx;">{{textAreaLength}}/500</text>
        </view>
        <textarea
          v-model="query.remarks"
          placeholder="可以填写一些与客服沟通过的备注信息"
          placeholder-style="color:#AAAAAA;font-size:28rpx;padding-top:12rpx;"
          maxlength="500"
          class="remark"
          @input="onTextAreaInput"
        />
      </view>
      <view class="proposal">建议与商家沟通后再发起退款</view>


      <view
        class="sumbit-button"
        :style="{paddingBottom:systemBottom}"
      >
			<view class="buttons1" v-if="!reasonName">
				提交申请
			</view>
        <view v-else
          class="buttons"
          @click="submitApplication"
        >
          提交申请
        </view>
			</view>
		</view>

  </view>

</template>

<script>
import { getOrderDetail,refundReason,wholeOrderApplyForRefund,particalOrderApplyForRefund} from "@/api/order.js";
export default {
  data() {
    return {
      query: {
        remarks: "",
				status:"",
      },
      showEditInput: false,
      inputValue: 0,
      inputWidth: 4,
      textAreaLength: 0,
      isFocus: false,

      type: "", //partical部分退款  whole整个退款
      refundInfo: {},
			
			refundReasonList:[],//退款原因
			reasonList:[],
			
			reasonValue:"",
			reasonName:"",
			
			returnMoney:"",
			
			
			
			
      systemBottom: "",
    };
  },
  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.containerBottom = menuButtonInfo.bottom;
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
    console.log(this.systemBottom);
  },

  onLoad(e) {
    this.type = e.type;
		this.query.orderId=Number(e.id)
		this.query.status=Number(e.status);//订单状态1进行中 2已完成
    console.log("this.type=", this.type);
    if (this.type == "partical") {
      this.refundInfo = JSON.parse(
        wx.getStorageSync("particalRefundOrderInfo")
      );
			this.inputValue =  this.refundInfo.totalActualIncomeAmount
      console.log("this.refundInfo=", this.refundInfo, typeof this.refundInfo);
			
    } else {
      this.refundInfo = JSON.parse(wx.getStorageSync("wholeRefundOrderInfo"));
			this.returnMoney =  this.refundInfo.totalActualIncomeAmount
    }
		this.getRefundReasonList()
  },

  watch: {
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
    // 获取订单详情
    // orderDetail() {
    //   console.log("订单完成页面");
    //   getOrderDetail({ id: this.id }).then((e) => {
    //     this.orderInfo = e;
       
    //   });
    // },
		
		// 获取退款原因列表
		getRefundReasonList(){
			refundReason({codeKey:"refund_reason"}).then(list=>{
				this.refundReasonList = list
				this.reasonList = list.map(item=>{
					return item.itermName
				})
			})
		},
		
		
		submitApplication() {
      console.log("申请退款");
			let params={
				orderId:this.query.orderId,//订单明Id字段
				returnMoney:this.returnMoney,//申请退货钱数(分)
				reason:this.reasonName, //退款原因
				reasonId:this.reasonValue,//退款原因id
				remark:this.query.remarks, //备注
				status:this.query.status, //订单状态1进行中 2已完成
}
			wholeOrderApplyForRefund(params).then(res=>{
				if(res.code==1){
					uni.navigateTo({
						url:`../my-order/success/success?type=applyForRefund`
					})
				}
			})
    },

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
		
		// 请选择原因
    openPopup() {
			uni.showActionSheet({
				itemList: this.reasonList,
				success: (res)=>{
					this.reasonName=this.reasonList[res.tapIndex]
					this.reasonValue= this.refundReasonList.filter(item=>{
						return 	item.itermName == this.reasonList[res.tapIndex]
					})[0].itermValue
					console.log("this.reasonValue=",this.reasonValue)
				},
				fail:(res)=>{
						console.log(res.errMsg);
				}
			})
    },

    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
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
      .reason {
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
        .right2 {
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
        .right1 {
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
    position: fixed;
    bottom: 0;
    width: 686rpx;
    background-color: #ffffff;
    padding: 24rpx 34rpx;
    .buttons {
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 12rpx;
      background: linear-gradient(135deg, #53d5cc 0%, #4fc9c9 100%);
      font-size: 32rpx;
      color: #ffffff;
    }
		.buttons1 {
		  height: 88rpx;
		  line-height: 88rpx;
		  text-align: center;
		  border-radius: 12rpx;
		  background: linear-gradient(135deg, #53D5CC 0%, #4FC9C9 100%);
			opacity: 0.5;
		  font-size: 32rpx;
		  color: #ffffff;
		}
  }
}


</style>
