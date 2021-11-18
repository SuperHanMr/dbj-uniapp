<template>
  <view>
    <view class="container">
      <view  class="product-container">
				<view v-if="type == 'whole' && refundId " >
					<view v-for="(item1,index1) in refundInfo.details" :key="index1">
						<order-item :refundType="true" :orderType="refundType" :dataList="item1" :showIcon="true" ></order-item>
					</view>
				</view>
				<view v-if="type == 'whole' && !refundId "  v-for="(item2,index2) in refundInfo.detailAppVOS" :key="index2">
					<view>
						<order-item v-if="item2.type !== 5" :refundType="true" :orderType="refundType" :dataList="item2" :orderStatus="2" :showIcon="true" ></order-item>
						<store-calue-card-item
							v-else
							:refundType="true"
							:dataInfo="item2"
						/>
					</view>
				</view>
				<view v-if="type=='partical' && refundId ">
					<view v-for="item3 in refundInfo" :key="item3.id">
						<order-item :refundType="true" :orderType="refundType" :showIcon="true" :dataList="item3"></order-item>
					</view>
				</view>

        <view v-if="type == 'partical' && !refundId ">
						<view v-for="item4 in refundInfo.detailAppVOS" :key="item4.id">
							<order-item  :refundType="true" :orderType="refundType" :dataList="item4" :showIcon="true" ></order-item>
						</view>
				</view>

			<!-- 运费和搬运费 -->
			<view class="price-container" v-if="refundInfo.freight || refundInfo.handlingFees" >
			    <view class="price-item" v-if="refundInfo.freight">
			      <view  class="header" style="margin-bottom: 16rpx;">
			        <text style="margin-right: 8rpx;">运费</text>
							<image class="icon" src="../../../static/price_icon.svg" mode="" @click="readExpenses(1)"></image>
						</view>
						<text>
							<text style="font-size: 24rpx;">￥</text>
							<text style="font-size: 28rpx;" class="price-font">{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>
						</text>
					</view>
			    <view class="price-item" v-if="refundInfo.handlingFees">
			      <view class="header">

			        <text style="margin-right: 8rpx;">搬运费</text>
							<image class="icon" src="../../../static/price_icon.svg" @click="readExpenses(2)" mode=""></image>
						</view>
						<text>
							<text style="font-size: 24rpx;">￥</text>
							<text  style="font-size: 28rpx;" class="price-font">{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>
						</text>
					</view>
			  </view>
			</view>
			<view class="refund-container">
				<!-- 退款原因 -->
				<view class="refund-reason">
					<view class="left">
						<view class="icon">*</view>
						<text style="color: #666666;">退款原因</text>
					</view>
					<view class="reason" >
						<text style="color: #bbbbbb;"  v-if="!reasonName" @click="openPopup()">请选择</text>
						<text v-else style="margin-right: 16rpx;color: #333333;" @click="openPopup()">{{reasonName}}</text>
						<image src="../../static/ic_arraw_down.svg" mode="" @click="openPopup()"/>
					</view>
        </view>

				<view class="line" />
				<!-- 材料服务 退款金额 -->
				<view class="refund-price" v-if="refundType !==5">
					<view class="edit-price">
						<view class="left">
							<view class="icon">*</view>
							<text style="color:#666666;">退款金额</text>
						</view>
						<view class="right1" >
						  <text v-if="refundInfo.actualIncomeAmount" class="price-font">￥{{handlePrice(refundInfo.actualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.actualIncomeAmount)[1]}}</text>
						  <text v-else class="price-font">￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}</text>
						</view>
					</view>
					<view class="tip-text" v-if="refundType == 1">
						商品未发货，商家同意后将会全额退还。
					</view>
					<view class="tip-text" v-if="refundType == 2">
						服务未开始，商家同意后将会全额退还。
					</view>
				</view>
				
				<!-- 储值卡退款 -->
				<view class="refund-price" v-else> 
					<view :class="{'edit-price': showEditInput, 'show-price': !showEditInput }" >
						<view class="left" style="flex: 1;">
							<view class="icon">*</view>
							<text style="color:#666666;">退款金额</text>
						</view>
						<view style="flex:1"></view>
						<view class="right1" v-if="showEditInput">
							<view class="eidt-style">
								<text>￥</text>
								<input
									type="digit"
									v-model="inputValue"
									class="input-style"
									:focus="isFocus"
									maxlength="10"
									@focus="onKeyFocus"
									@blur="onKeyBlur"
									:style="{width:inputWidth,'maxWidth':'294rpx !important'}"
								/>
							</view>
						</view>
						<view class="right2" v-else>
							<text style="color:#FF3347;font-size: 40rpx;">￥{{inputValue==0?"0.00":inputValue}}</text>
							<image src="../../static/ic_mine_edit_gray@2x.png" mode="" @click="showEditInput=true"/>
						</view>
					</view>
					<view class="tip-text" v-if="refundInfo.cardUseIdentification" >\
						储值卡已使用过,具体退款金额已您与商家沟通协商的结果为准
					</view>
					<view class="tip-text" >
						储值卡未使用,商家同意后将会全额退还
					</view>
				</view>
			</view>

      <view class="remark-container">
        <view class="header">
          <text>备注说明</text>

        </view>
				<view class="body">
					<textarea
						v-model="query.remarks"
						placeholder="补充描述信息,有助于商家更好的处理售后问题"
						placeholder-style="color:#AAAAAA;font-size:28rpx;padding-top:12rpx;"
						maxlength="500"
						class="remark"
						@input="onTextAreaInput"
					/>
					<text class="fontNum" style="color: #999999;font-size: 26rpx;">{{textAreaLength}}/500</text>
				</view>
      </view>
      <view class="proposal">建议与商家沟通后再发起退款</view>
      <view class="sumbit-button" :style="{paddingBottom:systemBottom}">
				<view class="buttons1" v-if="!reasonName">
					提交申请
				</view>
				<view v-else class="buttons"  @click="submitApplication" >
					提交申请
				</view>
			</view>

		</view>
		<expenses-toast  ref='expensesToast' :expensesType="expensesType"></expenses-toast>
  </view>

</template>

<script>
import { getRefundInfo,refundReason,wholeOrderApplyForRefund,particalOrderApplyForRefund,getRefundInformation} from "@/api/order.js";
export default {
  data() {
    return {
      query: {
        remarks: "",
				status:"",
      },
			status:"",
      showEditInput: false,
      inputValue: 0,
      inputWidth:'',
      textAreaLength: 0,
      isFocus: false,

      type: "", //partical部分退款  whole整个退款
      refundInfo: {},

			refundReasonList:[],//退款原因
			reasonList:[],

			reasonValue:"",
			reasonName:"",

			returnMoney:"",//向后台传递的退款金额
			refundAmount:"" ,//后台返回的最大退款金额
	
			refundId:"",
			orderDetailId:"",

      systemBottom: "",

			expensesType:"",
			orderDetailsId:'',
			applyMode:'',
			freight:'',
			handlingFees:'',
			refundType:"",//1:材料 2:订单 5:储值卡
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
		if(this.type){
			this.query.orderId=Number(e.orderId)
			this.query.status=Number(e.status);//订单状态 1进行中 2已完成
			this.status = this.query.status
			this.applyMode = Number(e.applyMode)//	申请方式 1单商品 2整单退
			console.log("this.type=", this.type);
			if (this.type == "partical") {
				let params = {
					orderId:this.query.orderId,
					status:this.query.status,
					applyMode:this.applyMode,
					orderDetailsId:this.orderDetailsId
				}
				getRefundInformation(params).then(res=>{
					this.refundInfo = res
					this.refundType=this.refundInfo.type
					console.log("this.refundInfo=",this.refundInfo)
					this.refundInfo.actualIncomeAmount = this.refundInfo.maxRefundAmount
					this.returnMoney = this.refundInfo.maxRefundAmount
				})
			} else {
				let params = {
					orderId:this.query.orderId,
					status:this.query.status,
					applyMode:this.applyMode
				}
				getRefundInformation(params).then(res=>{
					this.refundInfo = res
					this.refundType=this.refundInfo.type
					console.log("this.refundInfo=",this.refundInfo)
					this.refundInfo.actualIncomeAmount = this.refundInfo.maxRefundAmount
					this.returnMoney = this.refundInfo.maxRefundAmount
					if(this.refundType ==5){
						this.inputValue = this.returnMoney
						this.refundAmount = this.refundInfo.maxRefundAmount
					}
					this.freight = this.refundInfo.freight?this.refundInfo.freight:'0'
					this.handlingFees = this.refundInfo.handlingFees?this.refundInfo.freight:'0'
				})
			}
		}else{
			this.refundId = e.refundId
			console.log("this.refundId=",this.refundId)
			this.getReapplyRefundInfo()
		}
		// 退款原因
		this.getRefundReasonList()
  },

  watch: {
    showEditInput(newVal, oldVal) {
      if (newVal) {
        this.onKeyFocus();
      }
    },
    inputValue(newVal, oldVal) {
			console.log("newVal=====",newVal,String(newVal).length)
			this.reqInputWidth(newVal)
			console.log("this.refundAmount===",this.refundAmount)
			if(newVal > this.refundAmount){
				uni.showToast({
					title:"退款金额大于储值卡余额，请修改",
					icon:'none',
					duration:1000
				})
				return Number(this.refundAmount).toFixed(2)
			}else{
				this.returnMoney =Number(newVal) 
				return newVal;
			}
    },
    textAreaLength(newVal, oldVal) {},
  },
	computed:{
		reqInputWidth(value){
			return (value)=>{
				console.log("value==",typeof value,value=='',value==0)
				if( value ==''){
					this.inputWidth= '12rpx'
				} else if(value === 0 ){
					this.inputWidth= '22rpx'
				} else if(value==='0.'){
					this.inputWidth= '44rpx'
				} else {
					console.log("width====",String(value).length* 22)
					this.inputWidth = String(value).length* 22  +'rpx'
				}
			}
		}
	},
  methods: {
    // 重新获取退款订单详情
    getReapplyRefundInfo() {
      getRefundInfo({ id: this.refundId }).then(data => {
        console.log("重新获取的订单信息=",data)
				this.type = data.applyMode==1?'partical':'whole'
				console.log("this.type=",this.type)
				this.refundType = data.type
				// this.refundType = 5
				this.query.remarks = data.remark
				this.textAreaLength = data.remark.length
				this.reasonValue = data.reasonId
				this.reasonName = data.reason
				console.log("this.refundType===",this.refundType)
				if(this.refundType == 5){
					this.inputValue  = data.maxRefundAmount
					this.refundAmount  = data.maxRefundAmount
					this.returnMoney = data.maxRefundAmount
				}else{
					this.refundAmount  =data.refundAmount
					this.returnMoney  =data.refundAmount
					this.freight = this.refundInfo.freight?this.refundInfo.freight:'0'
					this.handlingFees = this.refundInfo.handlingFees?this.refundInfo.freight:'0'
				}
				if(this.type =='partical'){
					this.refundInfo = data.detailAppVOS
					this.orderDetailId = data.detailAppVOS[0].orderDetailId
					console.log("this.refundInfo=",this.refundInfo )
				}else{
					this.refundInfo.details = data.detailAppVOS
					console.log("this.refundInfo.details = ",this.refundInfo.details)
				}
				this.refundInfo.totalActualIncomeAmount = data.maxRefundAmount
				this.query.orderId = data.orderId
				this.query.status = data.progressed
				this.refundInfo.freight = data.freight
				this.refundInfo.handlingFees = data.handlingFees
      });
    },

		// 获取退款原因列表
		getRefundReasonList(){
			refundReason({codeKey:"refund_reason"}).then(list=>{
				this.refundReasonList = list
				this.reasonList = list.map(item=>{
					return item.itermName
				})
			})
		},
		readExpenses(num) {
		  this.expensesType = num
		  this.$refs.expensesToast.showPupop()
		},

		submitApplication() {
			// 提交申请后该订单会进入到退款页面，状态显示退款中；并直接跳转到该订单退款详情页
      console.log("申请退款");
			if(this.type =='whole'){
				wholeOrderApplyForRefund({
					orderId:this.query.orderId,//订单明Id字段
					returnMoney:Number( this.returnMoney.toFixed(2).replace(".","")) ,//申请退货钱数(分)
					reason:this.reasonName, //退款原因
					reasonId:this.reasonValue,//退款原因id
					remark:this.query.remarks, //备注
					freight:this.freight,
					handlingFees:this.handlingFees,
					status:this.query.status, //订单状态1进行中 2已完成
				}).then(data=>{
					console.log("data=",data,"data.id=",data.id)
					uni.redirectTo({
						url:`../refund-list/refunding-detail/refunding-detail?orderId=${data.id}`
					})
				})
			}else{
				particalOrderApplyForRefund({
					orderDetailsId:this.orderDetailsId?this.orderDetailsId:this.orderDetailId,//订单明Id字段
					returnMoney:Number( this.returnMoney.toFixed(2).replace(".","")),//申请退货钱数(分)
					reason:this.reasonName, //退款原因
					reasonId:this.reasonValue,//退款原因id
					remark:this.query.remarks, //备注
					freight:this.freight,
					handlingFees:this.handlingFees,
					status:this.query.status, //订单状态1进行中 2已完成
				}).then(data=>{
					console.log("打印返回的数据=",data,"data.id=",data.id)
					uni.redirectTo({
						url:`../refund-list/refunding-detail/refunding-detail?orderId=${data.id}`
					})
				})
			}
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
			if(!(/^[1-9]\d*\.?\d{0,2}$|^0\.[1-9]\d$|^0\.\d[1-9]$/g.test(this.inputValue)) ){
				uni.showToast({
					title:"您输入的金额错误，请重新输入",
					icon:'none',
					duration:2000,
				})  
				this.inputValue =  Number(this.refundAmount).toFixed(2)
			}else{
				this.inputValue = Number(this.inputValue).toFixed(2);
			}
      // this.inputWidth = String(this.inputValue).length * 26 - 12
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
			if(!price)return ['0','00']
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
  background-color: #f2f3f3;
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
            // border-radius: 50%;
            line-height: 24rpx;
            text-align: center;
            // color: #999999;
            // border: 2rpx solid #999999;
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
					margin-bottom: 8rpx;
        }
      }
    }

    .line {
      height: 0.5px;
      margin-left: 56rpx;
      background: #f2f3f3;
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
							max-width: 440rpx;
              color: #ff3347;
              font-size: 38rpx;
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
    padding: 40rpx 32rpx;
    border-radius: 16rpx;
    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      font-size: 28rpx;
      color: #666666;
    }
		.body{
			position: relative;
			.remark {
				background-color: #FAFBFC;
				width: 686rpx;
				height: 388rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				padding: 24rpx 24rpx 56rpx;
				border: 0.5px solid #EEEEEE;
			}
			.fontNum{
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
  }
  .proposal {
    padding: 24rpx 32rpx;
    color: #808080;
    font-size: 24rpx;
    line-height: 34rpx;
  }

  .sumbit-button {
		z-index: 999;
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
			font-weight: bold ;
      background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
      font-size: 32rpx;
      color: #ffffff;
    }
		.buttons1 {
		  height: 88rpx;
		  line-height: 88rpx;
		  text-align: center;
			font-weight: bold ;
		  border-radius: 12rpx;
		  background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
			opacity: 0.5;
		  font-size: 32rpx;
		  color: #ffffff;
		}
  }
}


</style>
