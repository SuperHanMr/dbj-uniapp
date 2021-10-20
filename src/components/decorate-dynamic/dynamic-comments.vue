<template>
  <view class="decorate-dynamic" catchtouchmove="true">
    <view
      class="mask"
      v-if="showComments"
    >
      <view class="popupComments" :class="{'is-ower':showInput}">
        <view class="topArea">
          <view class="mainTit">评论</view>
<!--          <image
            @click="close"
            class="close"
            src="../../static/ic_closed_black@2x.png"
          ></image> -->
          <i class="icon-ic_zhuangxiuxianchang_danchuangquxiao_csn close" @click="close"></i>
        </view>
        <view
          class="noComment"
          v-if="!comments.length"
        >
          <image
            class="noCommentImg"
            src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/pic_empty%402x.png"
          ></image>
          <view class="noCommentText">暂无评论~</view>
        </view>
        <scroll-view
          class="commentList"
          v-if="comments.length"
          :scroll-y="true"
          @scrolltolower="bindscrolltolower"
        >
          <view
            class="commentItem"
            v-for="(item,index) in comments"
            :key="item.commentId"
          >
            <view
              class="mainContent"
              @longpress="deleteComment(item.commentId,item.zeusId)"
              @click="commentItemC(item.nickname,item.commentId,index)"
            >
              <image
                class="avatar"
                :src="item.avatar"
              ></image>
              <view class="commentInfo">
                <view class="info">
                  <view class="userInfo">
                    <view class="userName">{{item.nickname}}</view>
                    <view class="role">{{item.labelName}}</view>
                  </view>
                  <view class="date">{{item.time}}</view>
                </view>
                <view class="text">{{item.content}}</view>
              </view>
            </view>
            <view
              class="reply"
              @longpress="deleteComment(replyItem.commentId,replyItem.zeusId)"
              @click="replyItemC(replyItem.nickname,replyItem.commentId,index)"
              v-for="replyItem in item.secondComments"
              :key="replyItem.commentId"
            >
              <image
                class="avatar"
                :src="replyItem.avatar"
              ></image>
              <view class="replyInfo">
                <view class="info">
                  <view class="userInfo">
                    <view class="userName">{{replyItem.nickname}}</view>
                    <view class="role">{{replyItem.labelName}}</view>
                  </view>
                  <view class="date">{{replyItem.time}}</view>
                </view>
                <view class="text">
                  <text>回复</text>
                  <text class="name">{{replyItem.toNickname}}</text>
                  {{replyItem.content}}
                  
                </view>
              </view>
            </view>
            <view
              class="replyFooter"
              v-if="item.secondCount>=1"
            >
              <view
                class="expand"
                v-if="!isExpanded"
                @click="expandC(item.commentId,index)"
              >
                <view class="text">展开{{item.secondCount}}条回复</view>
                <image
                  class="img"
                  src="../../static/ic_expand@2x.png"
                ></image>
              </view>
              <view
                class="packUp"
                v-if="isExpanded"
                @click="packUpC(index)"
              >
                <view class="test">收起</view>
                <image
                  class="img"
                  src="../../static/ic_packUp@2x.png"
                ></image>
              </view>
            </view>
          </view>
        </scroll-view>
        <view
          class="bottomDelete"
          v-if="showDelete"
        >
          <view class="deleteWrap">
            <image
              class="img"
              src="../../static/ic_comment_delete@2x.png"
            ></image>
            <view class="delete" @click="sureDelete">删除</view>
          </view>
          <view class="deleteCancel" @click="showDelete=false;showInput=true">取消</view>
        </view>
        <view
          class="bottomInputBox"
          v-if="showInput"
        ></view>
        <view
          class="bottomInput"
          v-if="showInput"
        >
          <input
            v-model="inputValue"
            :cursor-spacing="10"
            :placeholder="isInputFocus?`回复@${inputName}`:'说点什么吧'"
            :class="{'focusInput':isInputFocus}"
            :focus="isOpen"
            class="easyInput"
          />
          <view
            class="send"
            :class="{'themeColor':isInputFocus}"
            @click="setReply"
          >发送</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getComments,
    getReplies,
    createReply,
    removeComment,
  } from "@/api/real-case.js";
  export default{
    props:{
      userId:0,
      houseOwnerId:0,
      dynamicId:0,
      activeIndex:0,
    },
    data(){
      return{
        showComments:false,
        showInput: false,
        showDelete: false,
        commentId: 0,
        commentIndex: 0,
        inputName: "",
        inputValue: "",
        isExpanded: false,
        isReply: false,
        replyPage:0,
        comments:[],
        ownId:0,
        page:1,
        totalPage:0,
        isInputFocus:false,
        isOpen:false,
        totalRows:0,
      }
    },
    mounted(){
      
      this.ownId = getApp().globalData.userInfo.id 
      // this.ownId = 6459
    },
    computed:{
      // inputText(){
      //   console.log(this.isInputFocus?`回复@${inputName}`:'说点什么吧')
      //   return this.
      // }
    },
    watch:{
      showComments(){
        if(this.showComments=== true){
          this.getComment()
        }
      },
      houseOwnerId:{
        handler:function(){
          if(this.houseOwnerId===this.ownId){
            this.showInput = true
          }
        },
        // immediate:true
        
      }
    },
    methods:{
      close(){
        this.showComments=false;
        this.inputValue = ''
        this.comments = []
        this.$emit('change',this.totalRows,this.activeIndex)
        // this.
      },
      inputFocus() {
        this.isInputFocus = true;
      },
      bindscrolltolower(){
        if(this.page<this.totalPage){
          this.page++
          this.getComment()
        }
      },
      getComment(){
        let params = {
          page: this.page,
          rows: 10,
          businessId: this.dynamicId, //	动态ID
          businessType: 2,
        };
        getComments(params).then((data) => {
          if (data) {
            console.log(data);
            let { page, rows, totalPage, totalRows, list } = data;
            this.page = page
            this.totalPage = totalPage
            this.totalRows = totalRows
            this.comments = this.comments.concat(list);
          }
        });
      },
      deleteComment(commentId, zeusId) {
        // if (this.ownId !== zeusId) return;
        this.showDelete = true;
        this.showInput = false
        this.commentId = commentId
        
      },
      sureDelete(){
        removeComment(this.commentId).then((data) => {
          this.commentC(this.dynamicId);
        });
      },
      commentItemC(name, commentId,commentIndex) {
        console.log(111)
        console.log(this.ownId,this.houseOwnerId)
        if (this.ownId !== this.houseOwnerId) return;
        this.$nextTick(function(){
          this.isInputFocus = true
        })
        
        this.showInput = true;
        this.isOpen = true
        this.inputName = name;
        this.isReply = false;
        this.commentId = commentId;
        this.commentIndex = commentIndex;
        console.log(this.isInputFocus)
      },
      replyItemC(name, replyId, commentIndex) {
        console.log(222)
        if (this.ownId !== this.houseOwnerId) return;
        this.isInputFocus = true
        this.isReply = true;
        this.showInput = true;
        this.isOpen = true
        this.inputName = name;
        this.replyId = replyId;
        this.commentIndex = commentIndex;
        
      },
      packUpC(index) {
        this.isExpanded = false;
        this.comments[index].secondComments.splice(2);
      },
      expandC(id, index) {
        console.log(id)
        let params = {
          page: this.replyPage,
          rows: 10,
          parentId: id, //评论ID
        };
        getReplies(params).then((data) => {
          if (data) {
      			let {list,page,totalRows} = data
            console.log(this.comments,index,this.comments[index])
      			if(this.replyPage!==1){
      				this.comments[index].secondComments =
      					this.comments[index].secondComments.concat(list || []);
      			}else{
      				this.comments[index].secondComments = list || [];
      			}
      			if(this.isReply){
              if(this.comments[index].secondComments.length >= totalRows){
              	uni.showToast({
              		title:'没有更多数据了',icon:"none",
              	});
              	this.isExpanded = true;
              }
              
              this.replyPage = page++
            }
      			
          }
        });
      },
      setReply(isReply) {
        // this.showInput = false;
        console.log(isReply);
        let params = {
          businessId: this.dynamicId, //	动态ID
          businessType: 2,
          replyId: this.isReply ? this.replyId : this.commentId,
          content: this.inputValue,
        };
        createReply(params).then((data) => {
          if(this.isInputFocus){
            console.log(this.replyId,this.commentId)
            this.expandC(this.commentId,this.commentIndex)
          }else{
            this.commentC(this.dynamicId,);
          }
          this.inputValue = ''
          this.totalRows++
        });
      },
      commentC(id) {
        this.dynamicId = id;
        this.showComments = true;
        this.inputValue = ''
        this.isOpen = false
        uni.hideKeyboard()
        this.isInputFocus = false
        this.page=1
        let params = {
          page: this.page,
          rows: 10,
          businessId: id, //	动态ID
          businessType: 2,
        };
        getComments(params).then((data) => {
          if (data) {
            console.log(data);
            let { page, rows, totalPage, totalRows, list,end,start } = data;
            this.page = page
            this.totalPage = totalPage
            this.comments = list
            
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bottomDelete {
  	width: 100%;
  	height: fit-content;
  	background: #f4f4f4;
  	position: fixed;
  	left: 0;
  	bottom: 0;
  }
  .bottomDelete .deleteWrap {
  	width: 750rpx;
  	height: 112rpx;
  	background-color: #fff;
  	display: flex;
  	align-items: center;
  }
  .deleteWrap .img {
  	width: 26rpx;
  	height: 30rpx;
  	display: block;
  	margin-left: 40rpx;
  	margin-right: 24rpx;
  }
  .deleteWrap .delete {
  	width: 64rpx;
  	font-size: 32rpx;
  	color: #333333;
  }
  .bottomDelete .deleteCancel {
  	width: 750rpx;
  	height: 128rpx;
  	background-color: #fff;
  	margin-top: 16rpx;
  	padding-bottom: 30rpx;
  	font-size: 32rpx;
  	color: #333333;
  	text-align: center;
  	line-height: 128rpx;
  }
  .bottomBox {
  	width: 100%;
  	height: 136rpx;
  	padding-bottom: 40rpx;
  }
  .bottomInput {
  	width: 100%;
  	height: 120rpx;
  	padding-bottom: 40rpx;
  	background: #ffffff;
  	position: fixed;
  	left: 0rpx;
  	bottom: 0rpx;
  	display: flex;
  }
  .focusInput {
  	caret-color: #00c2b8;
  }
  
  .bottomInput .easyInput {
  	width: 586rpx;
  	height: 80rpx;
  	margin: 20rpx 32rpx;
  	margin-right: 0;
  	padding-left: 24rpx;
  	color: #999999;
  	font-size: 28rpx;
  	background: #f5f6f6;
  	border-radius: 12rpx;
  }
  .bottomInput .send {
  	width: 52rpx;
  	height: 26rpx;
  	margin: 47rpx 32rpx 47rpx 24rpx;
  	font-size: 26rpx;
  	font-weight: 500;
  	color: #999999;
  }
  .bottomInput .themeColor {
  	color: #00c2b8;
  }
  .mask {
  	width: 100%;
  	height: 100%;
  	background: rgba(0, 0, 0, 0.3);
  	position: fixed;
  	left: 0;
  	top: 0;
  	right: 0;
  	bottom: 0;
  	z-index: 998;
  }
  .popupComments {
  	position: relative;
  	width: 100%;
  	height: 840rpx;
  	overflow: auto;
  	padding-bottom: 40rpx;
  	background: #ffffff;
  	border-radius: 32rpx 32rpx 0rpx 0rpx;
  	position: fixed;
  	left: 0;
  	bottom: 0;
  	z-index: 999;
  }
  view .is-ower{
    padding-bottom: 160rpx;
  }
  .bottomInputBox {
  	width: 100%;
  	height: 120rpx;
  	padding-bottom: 40rpx;
  	position: fixed;
  	left: 0rpx;
  	bottom: 0rpx;
  }
  .popupComments .noComment {
  	width: 100%;
  	height: 542rpx;
  }
  .popupComments .noCommentText {
  	width: 118rpx;
  	height: 36rpx;
  	margin: 24rpx 316rpx;
  	font-size: 26rpx;
  	color: #999999;
  }
  .popupComments .noCommentImg {
  	width: 750rpx;
  	height: 492rpx;
  	display: block;
  }
  .popupComments .topArea {
  	height: 120rpx;
  	border-radius: 32rpx 32rpx 0rpx 0rpx;
  	display: flex;
  	align-items: center;
  }
  .topArea .mainTit {
  	width: 64rpx;
  	height: 44rpx;
  	margin-left: 344rpx;
  	margin-right: 258rpx;
  	font-size: 32rpx;
  	font-weight: 600;
  	color: #333333;
  }
  .topArea .close {
  	width: 64rpx;
  	height: 64rpx;
  	display: block;
  	margin-right: 20rpx;
    text-align: center;
    line-height: 64rpx;
    // background-color: #eee;
  }
  .commentList {
  	width: 100%;
  	height: 700rpx;
    
  	/* height: fit-content; */
  	// overflow: auto;
  }
  .commentItem:first-child .mainContent {
  	margin-top: 24rpx;
  }
  .commentItem {
  	width: 686rpx;
  	margin-left: 32rpx;
  	border-bottom: 2rpx solid #efefef;
  }
  .commentItem .mainContent {
  	width: 100%;
  	height: 132rpx;
  	margin-top: 32rpx;
  	display: flex;
  }
  .commentItem .mainContent .avatar {
  	width: 72rpx;
  	height: 72rpx;
  	border-radius: 50%;
  	margin-right: 16rpx;
  	display: block;
  }
  .commentItem .mainContent .commentInfo {
  	width: 598rpx;
  	height: 36rpx;
  }
  .commentInfo .info {
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	margin-top: 8rpx;
  	margin-bottom: 8rpx;
  }
  .commentInfo .text {
  	width: 598rpx;
  	// height: 80rpx;
  	font-size: 26rpx;
  	color: #333333;
  	line-height: 40rpx;
  }
  .info .userInfo {
  	display: flex;
  	align-items: center;
  }
  .info .userName {
  	width: fit-content;
  	// max-width: 122rpx;
  	height: 36rpx;
  	margin-right: 8rpx;
  	text-overflow: ellipsis;
  	font-size: 26rpx;
  	color: #999999;
  }
  .info .role {
  	width: 56rpx;
  	height: 28rpx;
  	font-size: 20rpx;
  	line-height: 28rpx;
  	text-align: center;
  	color: #fff;
  	background: linear-gradient(45deg, #f2af1a, #ffd698);
  	border-radius: 6rpx;
  }
  .info .date {
  	// width: 146rpx;
  	height: 36rpx;
  	font-size: 26rpx;
  	color: #999999;
  	line-height: 36rpx;
  	/* margin-left: 336rpx; */
  }
  .commentItem .reply {
  	width: 100%;
  	/* height: 150rpx; */
  	height: fit-content;
  	margin-bottom: 24rpx;
  	margin-left: 80rpx;
  	display: flex;
  }
  .commentItem .reply .avatar {
  	width: 40rpx;
  	height: 40rpx;
  	border-radius: 50%;
  	margin-right: 16rpx;
  	display: block;
  }
  .commentItem .reply .replyInfo {
  	width: 550rpx;
  	/* height: 120rpx; */
  	height: fit-content;
  }
  .replyInfo .info {
  	width: 550rpx;
  	height: 36rpx;
  	display: flex;
    justify-content: space-between;
  	align-items: center;
  	margin-top: 2rpx;
  	margin-top: 8rpx;
  }
  .replyInfo .info .date {
  	// margin-left: 288rpx;
  }
  .replyInfo .info .role {
  	background: linear-gradient(45deg, #6d95ef, #84b9fc);
  }
  .replyInfo .text {
  	width: 550rpx;
  	/* height: 120rpx; */
  	height: fit-content;
  	font-size: 26rpx;
  	color: #333333;
  	line-height: 40rpx;
    text{
      display: inline-block;
      word-break: break-all;
      margin-right: 6rpx;
    }
  }
  .replyInfo .text .name {
  	color: #999999;
  }
  .replyFooter {
  	width: 164rpx;
  	height: 32rpx;
  	margin-top: 16rpx;
  	margin-bottom: 32rpx;
  	margin-left: 136rpx;
  }
  .expand {
  	width: 190rpx;
  	/* width: fit-content; */
  	height: 36rpx;
  	font-size: 26rpx;
  	font-weight: 500;
  	color: #00c2b8;
  	display: flex;
  	align-items: center;
  }
  .expand .text {
  	width: 168rpx;
  	/* width: fit-content; */
  	height: 36rpx;
  	font-size: 26rpx;
  	font-weight: 500;
  	color: #00c2b8;
  }
  .expand .img {
  	width: 14rpx;
  	height: 8rpx;
  	display: block;
  	margin-left: 8rpx;
  }
</style>
