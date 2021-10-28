<template>
  <view class="view-item">
    <view class="title" :style="{background:color}">
      {{title}}
      <text>({{data.value}}项)</text>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="item of data.arr"
        :key="item.title"
        @click="toDetail({ruleId:item.ruleId,problemId:item.problemId})"
      >
        <view class="item-left">
          <text class="item-title">{{item.ruleName||item.inspectName}}</text>
          <text class="item-body">{{item.problemDetails||''}}</text>
        </view>
        <i class="icon-ic_wodejia_genghuandengji_csn"></i>
        <!-- <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_triangle.svg" mode=""></image> -->
      </view>
      <view v-if="data.arr.lengt h===0" class="list-item no-content">暂无内容</view>
    </view>
  </view>
</template>

<script>
 export de  ult {
    pops: {
      color: '',
      tite: '',
      data: {
        type: Object
        default: () => {
         r e turn {}
          }
      }
    },
    dat() {},
    method   {
      to    ail(item) {
         console.l    item)
          uni.navigateTo({
          url: '/sub-decorate/pages/result-detail/result-detail?ruleId='+(ite      leId||'')+'&problem      +(item.problemId||'              })
        }
    }
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </script>

<style lang="scss" scoped>
.view-item {
  margin-top: 32rpx;
  background-color: #fff;
  border-radius: 8px 8px 8px 8px;

  .title {
    // width: 351px;
    padding-left: 24rpx;
    height: 80rpx;
    opacity: 1;
    line-height: 80rpx;
    border-radius: 8px 8px 0px 0px;
    font-size: 30rpx;
    font-weight: 500;
    color: #fff;

    text {
      width: 88rpx;
      text-align: center;
      font-size: 25rpx;
      display: inline-block;
    }
  }

  .list {
    padding: 0 24rpx;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 0.5px solid #efefef;
    // height: 228rpx;
    padding: 32rpx 0;
    .item-left {
      width: 600rpx;
      margin-right: 24rpx;

      .item-title {
        color: #333;
        font-size: 30rpx;
        font-weight: 500;
        display: block;
      }

      .item-body {
        margin-top: 8rpx;
        color: #999;
        font-weight: 400;
        font-size: 26rpx;
        -webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数
        display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
        -webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
        text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
        word-break: break-all;
        overflow: hidden;
      }
    }

    i {
      width: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      font-size: 16rpx;
      border: 0.5px solid #cccccc;
      border-radius: 50%;
      color: #666;
    }
  }
  .no-content {
    color: #666;
    font-size: 26rpx;
  }
  .list-item:last-child {
    border: none;
  }
}
</style>
