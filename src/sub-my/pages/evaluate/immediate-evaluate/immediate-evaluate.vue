<template>
  <view>
    <view class="container">
      <view class="body">
        <view class="header">
          <view class="left">
            <image
              src="../../../login/imgs/Lark20210823-152715.png"
              mode=""
            ></image>
            <text>王大力</text>
            <view class="icon">
              大管家
            </view>
          </view>
          <view class="right">
            <view class="checked" />
            <text>匿名评价</text>
          </view>
        </view>

        <view class="line" />

        <view class="main-body">
          <view class="rate-header">
            <text class="text">评分</text>
            <uni-rate
              v-model="query.stars"
              margin="5"
              @change="onChange"
            />
          </view>

          <view class="edit-evaluate">
            <textarea
              v-model="query.remarks"
              placeholder="快来评价一下服务者吧～"
              placeholder-style="color:#AAAAAA;font-size:14px;"
              maxlength="500"
              class="remark"
              @input="onTextAreaInput"
            />
            <view class="word-limit">
              {{textAreaLength}}/500
            </view>
          </view>

          <view class="imageInfo">
            <view
              class="image-container"
              v-for="(item,index) in 9"
              :key="index"
            >
              <image
                class="image1"
                src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_interaction@2x.png"
                mode=""
              ></image>
              <image
                class="image2"
                src="../../../../sub-pagesA/static/image_delete@2x.png"
                mode=""
              ></image>
            </view>
            <view class="add-image">
              +
            </view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      query: {
        remarks: "",
        stars: "",
      },
      textAreaLength: 0,
    };
  },
  watch: {
    textAreaLength(newVal, oldVal) {},
  },
  methods: {
    changeTitle() {
      uni.setNavigationBarTitle({
        title: "新的标题",
      });
    },
    onChange(e) {
      console.log("rate发生改变:" + JSON.stringify(e));
    },
    onTextAreaInput(event) {
      this.textAreaLength = event.target.value.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding-top: 16rpx;
  overflow-y: auto;
  .body {
    background-color: #ffffff;

    .header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      .left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        line-height: 80rpx;
        image {
          width: 80rpx;
          height: 80rpx;
          object-fit: cover;
          background-color: pink;
          margin-right: 8rpx;
        }
        .icon {
          width: 82rpx;
          height: 32rpx;
          line-height: 32rpx;
          background: linear-gradient(100deg, #7bbff2 0%, #60a8e8 100%);
          border-radius: 6rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          margin-left: 12rpx;
        }
      }
      .right {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: #333333;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .checked {
          width: 32px;
          height: 32rpx;
          background: #ffffff;
          border: 2rpx solid #e5e5e5;
          border-radius: 50%;
          margin-right: 16rpx;
        }
      }
    }

    .line {
      height: 1rpx;
      background-color: #f2f2f2;
    }

    .main-body {
      .rate-header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 40rpx 32rpx;
        .text {
          margin: 0 28rpx 0 16rpx;
          font-weight: 600;
          color: #333333;
          font-size: 28rpx;
        }
      }

      .edit-evaluate {
        background-color: #ffffff;
        // min-height: 472rpx;
        padding: 0 32rpx 40rpx 32rpx;
        position: relative;
        .remark {
          background: #fafafa;
          height: 360rpx;
          border: 2rpx solid #e8e8e8;
          border-radius: 16rpx;
          padding: 16rpx 32rpx;
        }
        .word-limit {
          position: absolute;
          right: 32rpx;
          bottom: 40rpx;
          color: #999999;
          font-size: 26rpx;
          overflow-y: auto;
        }
      }
    }
    .imageInfo {
      padding: 0 28rpx 36rpx 32rpx;
      display: flex;
      flex-flow: row wrap;
      .image-container {
        position: relative;
        .image1 {
          width: 144rpx;
          height: 144rpx;
          object-fit: cover;
          border-radius: 12rpx;
          margin-right: 32rpx;
          margin-bottom: 24rpx;
        }
        .image2 {
          position: absolute;
          width: 36rpx;
          height: 36rpx;
          object-fit: cover;
          top: -18rpx;
          right: 18rpx;
          background-color: skyblue;
        }
      }
      .image-container:nth-child(4n) .image1 {
        margin-right: 18rpx;
      }

      .add-image {
        width: 144rpx;
        height: 144rpx;
        line-height: 144rpx;
        border-radius: 12rpx;
        text-align: center;
        font-size: 60rpx;
        font-weight: 600;
        margin-right: 32rpx;
        margin-bottom: 24rpx;
        background: #f7f7f7;
      }
    }
  }
}
</style>
