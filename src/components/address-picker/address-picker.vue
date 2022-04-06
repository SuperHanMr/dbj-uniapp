<template>
  <view class="">
    <view v-if='houseId'>
      <view class="header-address" @click="checkAddress">
        <span class="locationIcon"></span>
        <!-- <image src="../../static/images/ic_location@2x.png" class="locationIcon"></image> -->
        <view class="address">
          <view class="way">
            <text class="default" v-if="addressInfo.defaultEstate">默认</text>
            <text class="txt">{{addressInfo.housingEstate}}</text>
          </view>
          <view class="community">{{addressInfo.area + addressInfo.housingEstate + addressInfo.address}}</view>
          <view class="userInfo">
            <text class="userName">{{addressInfo.contactName}}</text>
            <text class="userPhone">{{addressInfo.contactPhone}}</text>
          </view> 
        </view>
        <image class="switchSite" src="../../static/ic_back.png"></image>
      </view>
      <view class="header-operator" v-for="(item, index) in addUser" :key="index" v-if="addUser.length">
        <view v-if="item.addingJobName" class="add-box">
          <span class="locationIcon"></span>
          <!-- <image src="../../static/images/addUser.png" class="locationIcon"></image> -->
          <view class="address">
            <view class="community">{{item.addingJobName}}:{{item.addingUserName}}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="header-operator" @click="checkAddress">
        <image src="../../static/images/ic_location@2x.png" class="locationIcon"></image>
        <view class="address check-address">
          <view class="community">请选择地址</view>
        </view>
        <image class="switchSite" src="../../static/ic_back.png"></image>
      </view>

    </view>
    <image class="addressLine" src="../../static/images/address_line@2x.png"></image>
  </view>
</template>

<script>
  import {
    getAddressInfo,
    getProductID
  } from '../../api/classify.js'
  export default {
    name: "address-picker",
    props: {
      originFrom: {
        dafult: ''
      },
      houseId: {
        default: 0
      },
      productType: {
        default: 1
      },
      addUser: {
        default: [{
          addingJobName: '',
          addingUserName: '',
          addingUserId: ''
        }]
      }
    },
    data() {
      return {
        addressInfo: {},
        estateId: 0
      };
    },
    mounted() {
      // if (this.originFrom === "orderToast") {
      //   getAddressInfo(this.houseId).then((data) => {
      //     this.addressInfo = data
      //     let params = {
      //       estateId: this.houseId
      //     }
      //     getProductID(params).then((data) => {
      //       this.addressInfo.projectId = data
      //       this.$emit('emitInfo', this.addressInfo)
      //     })
      //   })
      // }
    },
    methods: {
      checkAddress() {
        if (this.productType === 2) {
          this.$emit("typeServe2")
          return
        }
        this.$emit("closeToast")
        uni.navigateTo({
          url: "/sub-my/pages/my-house/my-house?isEdit=0&id=" +
            Number(this.houseId),
        });
      }
    },
    watch: {
      houseId: {
        handler(v) {
          // if (uni.getStorageSync("houseIdChange")) {
          //   return
          // }
          // uni.setStorageSync("houseIdChange", "changed")
          // this.timer = setTimeout(() => {
          //   uni.removeStorageSync("houseIdChange")
          // }, 300)
          if (v) {
            getAddressInfo(v).then((data) => {
              this.addressInfo = data
              let params = {
                estateId: v
              }
              getProductID(params).then((data) => {
                this.addressInfo.projectId = data
                this.$emit('emitInfo', this.addressInfo)
              })
            })
          }
          setTimeout(() => {
            console.log(this.addUser)
          }, 5000)
        },
        immediate: true
      }

    }
  }
</script>

<style scoped>
  .header-address {
    display: flex;
    width: 100%;
    background: #ffffff;
  }

  .locationIcon {
    width: 30rpx;
    height: 48rpx;
    display: block;
    margin-top: 32rpx;
  }

  .switchSite {
    width: 48rpx;
    height: 48rpx;
    display: block;
    margin: 40rpx 32rpx 0 0;
  }

  .address {
    padding: 30rpx 0;
  }

  .address .way {
    width: 604rpx;
    height: 42rpx;
    color: #999999;
    line-height: 42rpx;
  }

  .address .way .default {
    width: 60rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    padding: 2rpx 10rpx;
    margin-right: 8rpx;
    background: linear-gradient(133.85deg, #696B6B 3.06%, #575C5C 100.1%);
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #ffffff;
    vertical-align: middle;
  }

  .address .way .txt {
    width: fit-content;
    height: 42rpx;
    font-size: 26rpx;
    color: #999999;
    line-height: 42rpx;
  }

  .address .community {
    /* height: 42rpx; */
    width: 600rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #111111;
    line-height: 42rpx;
    margin: 8rpx 0;
  }

  .address .userInfo {
    height: 40rpx;
    font-size: 24rpx;
    color: #999999;
    line-height: 40rpx;
  }

  .address .userInfo .userName {
    margin-right: 10rpx;
  }

  .addressLine {
    width: 100%;
    height: 6rpx;
    background: #fff;
    margin-bottom: 16rpx;
    display: block;
  }
  .header-operator {
    display: flex;
    width: 100%;
    background: #ffffff;
  }
  .add-box{
    display: flex;
  }
  .header-operator .address {
    flex: 1;
    border-top: 1rpx solid #f2f2f2;
  }

  .header-operator .check-address {
    border-top: 0;
  }
</style>
