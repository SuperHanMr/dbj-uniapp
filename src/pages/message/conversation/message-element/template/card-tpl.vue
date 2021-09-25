<template>
  <view class="card-template">
    <view class="card-template__body">
      <view class="card-template__side">
        <image class="icon" :src="icon" />
      </view>
      <view class="card-template__main">
        <view class="title">
          {{ title }}
        </view>
        <template v-if="tips.length">
          <view v-for="(tip,index) in tips" :key="index" class="tip">
            {{ tip }}
          </view>
        </template>
      </view>
    </view>
    <view v-if="template.body.actions && template.body.actions.length" class="card-template__footer">
      <view 
        v-for="(btn, index) in template.body.actions" 
        :key="index" 
        class="oper-btn"
      >
        {{ btn.title }}
      </view>
    </view>
  </view>
</template>

<script>
import { compileTemplateStr as compile } from "@/utils/util.js";
export default {
  name: "CardTemplate",
  props: {
    template: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data() {
      return this.message.payloadData.params || {};
    },
    icon() {
      return compile(this.template.body.iconUrl)(this.data);
    },
    title() {
      return compile(this.template.body.title)(this.data);
    },
    tips() {
      return (this.template.body.labels || []).map(({label, value}) => {
        return compile(label)(this.data) + compile(value)(this.data);
      });
    }
  }
}
</script>

<style>
.card-template {
  background: #fff;
  margin: 24rpx 56rpx;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 8px;
}
.card-template__body {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 32rpx;
  align-items: flex-start;
  box-sizing: border-box;
}
.card-template__side {
  padding-right: 24rpx;
  flex: none;
}
.card-template__side .icon {
  width: 72rpx;
  height: 72rpx;
}
.card-template__main {
  align-self: center;
  flex: 1;
}
.card-template__main .title {
  font-size: 14px;
  color: #111;
  font-weight: bold;
  line-height: 20px;
}
.card-template__main .tip {
  color: #999;
  font-size: 13px;
  margin-top: 8rpx;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-template__footer {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-top: 1px solid #f7f7f7;
}
.card-template__footer .oper-btn {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  color: #111;
}
.card-template__footer .oper-btn:last-child {
  color: #35C4C4;
}
.card-template__footer .oper-btn + .oper-btn {
  border-left: 1px solid #f7f7f7;
}

</style>
