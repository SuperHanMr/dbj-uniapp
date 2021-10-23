<template>
  <view class="good-toast">
    <uni-popup ref="expensesToast" type="bottom">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view v-if='expensesType === 0'>
          <view class="text">
            <p>
              您已获得 每 送1次免运费权益，该权益仅减免该店铺要货时的运费，要货时商家会根据实际要货情况扣除对应的减免权益次数
            </p>
          </view>
        </view>
        <view v-if='expensesType === 1'>
          <view class="title">运费说明</view>
          <view class="text">
            <p>
              由于装修场景的特殊性，在打扮家app购买商品时支付运费分为两种情况
            </p>
            <p>
              零售场景：
            </p>
            <p>
              在商品结算时支付店铺规定的运费（达到店铺满减规则减免当次运费）
            </p>
            <p>
              装修要货场景：
            </p>
            <p>
              运费为业主预约发货（管家、工人、业主要货）时产生的费用，购买下单后仅计算用户可获得的免费次数，不产生实际运费；
            </p>
            <p>
              用户在购买商品时，不同卖家有不同的运费收取标准，如下：
            </p>
            <p class='tag'>
              （1）同一店铺内商品，每次要货根据要货数量支付运费；
            </p>
            <p class='tag'>
              （2）同一店铺内商品，达到减免运费费用后，根据获得的减免运费次数，减免要货时的费用
            </p>
          </view>
        </view>
        <view v-if='expensesType === 2'>
          <view class="title">搬运费说明</view>
          <view class="text">
            <p>由于装修场景的特殊性，在打扮家app购买商品时支付搬运费分为两种情况</p>
            <p>零售场景：</p>
            <p>在商品结算时支付店铺规定的搬运费</p>
            <p>装修要货场景：</p>
            <p>搬运费为业主预约发货（管家要货）时产生；</p>
            <p>每次要货搬运费计算规则如下:</p>
            <p>楼梯房搬运费=商品要货数量*每层搬运费*（楼层数-1）+入户费*商品要货数量;电梯房搬运费=入户费*商品要货数量</p>
            <p>电梯房搬运费=入户费*商品要货数量</p>
          </view>
        </view>
        <view v-if='expensesType === 3'>
          <view class="title">押金说明</view>
          <view class="text">
            <h1>一分钟了解设备租赁常见问题</h1>
            <h3>关于运费</h3>
            <p>本店所有设备来回快递费均由打扮家承担，顾客寄回需要联系设备管理员，由设 备管理员安排邮寄相关事宜。</p>
            <h3>关于返还</h3>
            <p>您需要在退租日到达前操作申请，租期结束后联系设备管理员，由设备管理员安 排指定快递，3 个工作日内将设备寄回(以快递揽件信息为准)，否则将按照延 期寄还处理。</p>
            <h3>关于快递</h3>
            <p>本公司物品寄出时纸箱和缓冲材料经过细心包装，尽可能保障无损，请您保留包 装，用完后原样包装寄回。</p>
            <h3>关于续租</h3>
            <p>超出预定租期将按照商品实际租期收取费用(续租前请提前联系设备管理员确认 续租时间)，续租费用=续租租金 10 元/天 * 续租天数。从押金中扣除。</p>
            <h3>关于押金</h3>
            <p>收取归还设备确认无误后(以签收信息为准)，我们将在 3 个工作日内退还押金。</p>
            <h3>关于损坏</h3>
            <p>如设备有损坏，设备损害程度扣除相关维修费用:</p>
            <p>1 摄像头或路由器缺少安装、用电配件或外包装盒扣 50 元/个。</p>
            <p>2 摄像头损坏可维修扣 200 元/个。</p>
            <p>3 摄像头完全损坏无法维修或丢失 400 元/个。</p>
            <p>4 路由器损坏(人为原因)内置网卡还在 400 元/个。</p>
            <p>5 路由器损坏(人为原因)内置网卡同时损坏或丢失 1000 元/个。</p>
            <p>6 其他情况依照返厂维修所产生的费用进行赔付</p>
            <h3>关于退订</h3>
            <p>用户可以在发货前无条件取消订单，但为了确保产品的排期和流转效率，在发货 后不能取消订单</p>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    props: {
      expensesType: 0
    },
    data() {
      return {

      }
    },
    methods: {
      showPupop() {
        console.log("show")
        this.$refs.expensesToast.open()
      },
      close() {
        this.$refs.expensesToast.close()
      }
    }
  }
</script>

<style scoped>
  .good-toast {
    position: relative;
  }

  .close {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 14rpx;
    right: 14rpx;
    background-image: url("../../static/images/close.png");
    background-size: contain;
  }

  .toast-content {
    max-height: 1000rpx;
    overflow: scroll;
    background-color: #f5f6f7;
    border-radius: 16px 16px 0px 0px;
  }

  .title {
    height: 100rpx;
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
    text-align: center;
    line-height: 100rpx;
  }

  .text {
    padding: 0 32rpx 50rpx;
  }

  p {
    text-align: justify;
    color: #333333;
    margin-top: 24rpx;
    line-height: 1.6em;
  }
</style>
