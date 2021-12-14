<template>
  <view class="form-template">
    <view class="form-template__header">
      {{ title }}
    </view>
    <view class="form-template__body">
      <view class="form-template__tip">
        {{ tip }}
      </view>
      <view class="form-container">
        <view v-for="(item,index) in formItems" class="form-item">
          <view :key="index" class="form-item__label">
            {{ item.label }}
          </view>
          <view class="form-item__content">
            {{ item.content }}
          </view>
        </view>
      </view>
    </view>
    <view v-if="actions && actions.length" class="form-template__footer">
      <view v-for="(btn, index) in actions" :key="index" class="oper-btn" @click="handleClick(btn)">
        {{ btn.title }}
      </view>
    </view>
  </view>
</template>


<script>
  import {
    compileTemplateStr as compile
  } from "@/utils/util.js";
  import {
    evaluateDetail
  } from "@/api/order.js"
  export default {
    name: "FormTemplate",
    props: {
      template: {
        type: Object,
        required: true,
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
      title() {
        return compile(this.template.body.title)(this.data);
      },
      tip() {
        return compile(this.template.body.subTitle)(this.data);
      },
      formItems() {
        return (this.template.body.labels || []).map(item => {
          return {
            label: item.label,
            content: compile(item.value)(this.data)
          }
        })
      },
      actions() {
        return this.template.body.actions || [];
      }
    },
    methods: {
      handleClick(btn) {
        if (btn.type === "native") { // 需要本地手动处理按钮动作
          if (btn.targetRouter === "evalute") { // 去评价的消息
            let params = btn.params;
            let serviceId = compile(params.serviceId)(this.data);
            let serviceType = compile(params.serviceType)(this.data);
            let serverName = compile(params.serverName)(this.data);
            let serverRoleName = compile(params.serverRoleName)(this.data);
            let serverAvatar = compile(params.serverAvatar)(this.data);
            evaluateDetail({
              id: serviceId
            }).then(data => {
              if (data.commentStatus === 1) { //已评价
                uni.navigateTo({
                  url: `/sub-my/pages/evaluate/evaluate-detail/evaluate-detail?id=${serviceId}`
                })
              } else {
                uni.navigateTo({
                  url: `/sub-my/pages/evaluate/immediate-evaluate/immediate-evaluate?id=${serviceId}&type=${serviceType}&serverName=${serverName}&serverRoleName=${serverRoleName}&serverAvatar=${serverAvatar}`,
                })
              }
            }).catch(e => {
              uni.navigateTo({
                url: `/sub-my/pages/evaluate/immediate-evaluate/immediate-evaluate?id=${serviceId}&type=${serviceType}&serverName=${serverName}&serverRoleName=${serverRoleName}&serverAvatar=${serverAvatar}`,
              })
            });
          } else if (btn.targetRouter === "toDoListDecorate") {
            let params = btn.params;
            let projectId = +compile(params.projectId)(this.data);
            getApp().globalData.msgProjectId = projectId;
            uni.switchTab({
              url: `/pages/decorate/index/index`
            })
          }
        } else if (btn.type === "native_uri") { // 跳转页面处理
          let url = compile(btn.targetRouter)(this.data);
          uni.navigateTo({
            url: url
          });
        }
      }
    }
  }
</script>
<style>
  .form-template {
    background: #fff;
    margin: 24rpx 56rpx;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 8px;
  }

  .form-template__header {
    font-size: 14px;
    font-weight: bold;
    padding: 32rpx;
    border-bottom: 1px solid #f7f7f7;
  }

  .form-template__body {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
  }

  .form-template__tip {
    color: #333;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24rpx;
  }

  .form-item {
    font-size: 12px;
    line-height: 18px;
    color: #333;
    margin-bottom: 24rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .form-item:last-child {
    margin-bottom: 0;
  }

  .form-item__label {
    flex: none;
    color: #666;
  }

  .form-item__content {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form-template__footer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    border-top: 1px solid #f7f7f7;
  }

  .form-template__footer .oper-btn {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    color: #35C4C4;
  }

  .form-template__footer .oper-btn+.oper-btn {
    border-left: 1px solid #f7f7f7;
  }
</style>
