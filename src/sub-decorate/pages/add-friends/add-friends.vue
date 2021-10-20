<template>
  <view
    class="content"
    :style="{backgroundImage:`url(https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/add-friends-bg.png)`,backgroundSize: '100% 100%'}"
  >
    <view class="header">
      <view class="text">
        添加亲友团 <br>
        一起打扮我们的家吧
      </view>
    </view>
    <view class="form-content">
      <input
        class="input"
        type="number"
        v-model="phone"
				:style="{color:phone?'#333333':'#cca459'}"
        placeholder="输入亲友手机号"
      />
      <view
        v-if="phoneError"
        class="phone-tips"
      >
        请输入正确手机号
      </view>
      <view
        v-if="resError"
        class="phone-tips"
      >
        抱歉，您的亲友尚未注册打扮家，请先联系您的亲友注册后再添加
      </view>
      <picker
        @change="bindPickerChange"
        :value="index"
        :range="array"
      >
        <view
          class="input btn"
          @click="chooseFriends"
        >
          <view class="holder">
            <text v-if="!type">请选择亲友关系</text>
            <text
              style="color:#333333 ;"
              v-else
            >{{type}}</text>
          </view>
          <image
            class="img-down"
            src="../../../static/frinds-down.png"
            mode=""
          ></image>
        </view>
      </picker>
      <view class="btn-list">
        <view
          class="cancel btns border "
          @click="goBack"
        >
          取消
        </view>
				<view style="width: 33rpx;height: 10rpx;">
					
				</view>
        <view
          class="add btns "
          @click="addFriend"
        >
          确认添加
        </view>
      </view>
    </view>
    <view class="tips">
      * 添加亲友前，请先让您的亲友注册打扮家APP
    </view>
  </view>
</template>


<script>
import { addFriends } from "../../../api/decorate.js";
export default {
  data() {
    return {
      phone: "",
      array: [
        "老公",
        "老婆",
        "儿子",
        "女儿",
        "父亲",
        "母亲",
        "岳父",
        "岳母",
        "公公",
        "婆婆",
        "其他",
      ],
      index: 0,
      type: "",
      phoneError: false,
      roomId: "",
      resError: false,
    };
  },
  watch: {
    phone(e) {
      if (e && e.length >= 11) {
        let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(e)) {
          this.phoneError = true;
        } else {
          this.phoneError = false;
        }
      } else {
        this.phoneError = false;
      }
    },
  },
  onLoad(e) {
    if (e && e.roomId) {
      this.roomId = e.roomId;
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({});
    },
    async addFriend() {
      let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        this.phoneError = true;
        return;
      }
      if (!this.type) {
        uni.showToast({
          title: "请选择亲友关系",
          icon: "none",
        });
        return;
      }

      addFriends({
        phone: this.phone,
        relationType: Number(this.index) + 1,
        estateId: this.roomId,
				customerId:getApp().globalData.userInfo.id
      })
        .then((e) => {
          uni.navigateBack({});
        })
        .catch((e) => {
          if (e && e.data && e.data.code == 3000) {
            this.resError = true;
          }
        });
    },
    bindPickerChange(e) {
      this.index = e.target.value;
      this.type = this.array[this.index];
    },
  },
};
</script>

<style scoped lang="scss">
page {
  background: #f9fafa;
}
.border{
	border: 1px solid #e5e5e5;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  .img-down {
    width: 24rpx;
    height: 24rpx;
  }

  .header {
    width: 100%;
    height: 349rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      color: #456666;
      font-size: 56rpx;
      font-weight: 500;
      text-align: center;
    }
  }

  .form-content {
    width: 634rpx;
    // height: 538rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .phone-tips {
      margin-top: 12rpx;
      width: 557rpx;
      color: #cca459;
      font-size: 22rpx;
      text-align: start;
    }

    .input {
      width: 493rpx;
      border: 1rpx solid #f0f0f0;
      border-radius: 12rpx;
      height: 97rpx;
      border-radius: 12rpx;
      background: #f9fafa;
      margin-top: 60rpx;
      font-size: 28rpx;
      color: #999999;
      font-weight: 400;
      padding: 0 32rpx;
    }

    .btn {
      margin-top: 50rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .holder {
      color: #999999;
      font-weight: 400;
      font-size: 28rpx;
    }

    .selected {
      color: #333333;
      font-weight: 400;
      font-size: 28rpx;
    }

    .btn-list {
      display: flex;
      flex-direction: row;
      height: 90rpx;
      justify-content: center;
      align-items: center;
			width: 100%;
      margin-top: 100rpx;
      margin-bottom: 40rpx;

      .btns {
        width: 262rpx;
        height: 88rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12rpx;
        font-size: 28rpx;
      }

      .cancel {
        background: #ffffff;
        color: #999999;
      }

      .add {
        background: linear-gradient(135deg, #36d9cd, #28c6c6);
        color: #ffffff;
				border: none;
      }
    }
  }

  .tips {
    color: #35c4c4;
    font-weight: 400;
    font-size: 26rpx;
    margin-top: 24rpx;
  }
}
</style>
