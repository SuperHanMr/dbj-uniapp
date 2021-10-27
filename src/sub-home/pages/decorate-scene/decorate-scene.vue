<template>
	
  <view class="sceneContainer" :class="{'noScroll':showComments}">
    <view class="header">
      <view class="houseInfo">
        <view class="location">{{projectInfo.estateNeighbourhood}}</view>
        <view class="focus">
          <view class="browse">浏览 {{estateViewCount}}</view>
          <view class="attention">关注 {{estateFocusOnCount}}</view>
        </view>
        <view class="itself">
          <view class="type">
            <view class="typeInner">{{projectInfo.estateUnitsType}}</view>
            <view class="tag">户型</view>
          </view>
          <view class="area">
            <view class="areaInner">{{projectInfo.estateArea?projectInfo.estateArea.toFixed(2):""}}平米</view>
            <view class="tag">面积</view>
          </view>
        </view>
      </view>
      <image class="houseImg" :src="projectInfo.estateIconUrl+'?x-oss-process=image/resize,m_mfit,w_116,h_116'"></image>
    </view>
    <view class="navBar">
      <view
        class="construction"
        @click="toConstruction"
      >
        <image
          class="toConstruction"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_construction_drawings%402x.png"
        ></image>
        <view class="text">施工图纸</view>
      </view>
      <view
        class="cost"
        @click="toCost"
      >
        <image
          class="toCost"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_cost_statistics%402x.png"
        ></image>
        <view class="text">花销统计</view>
      </view>
      <view
        class="decorate"
        @click="toDecorateCalendar"
      >
        <image
          class="toDecorate"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_decorate_calendar%402x.png"
        ></image>
        <view class="text">装修日历</view>
      </view>
      <view
        class="video"
        @click="toVideoSite"
      >
        <image
          class="toVideoSite"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_video_site%402x.png"
        ></image>
        <view class="text">工地视频</view>
      </view>
    </view>
    <view class="process">
      <view class="title">装修流程</view>
      <view class="content">
        <image
          class="startWork"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/start_work%402x.png"
        ></image>
        <view class="mainWrap">
          <view class="nodeType">
            <view
							:class="{'maxWidth':item.nodeType===6||
							item.nodeType===7||item.nodeType===8}"
              v-for="(item,index) in nodeTypes"
              :key="item.nodeType"
            >{{item.nodeName}}</view>
					</view>
          <view class="progressBar">
            <view class="connectStartLine"></view>
            <view class="steps">
              <view
                class="dot"
                :class="{'done':item.nodeStatus===4||item.nodeStatus===3,
								'doing':item.nodeStatus===2,'unpaid':item.nodeStatus===1}"
                v-for="(item,index) in nodesInfo"
                :key="item.id"
              >
                <view
                  class="connectLine"
                  :class="{'line-green':index<newestNodeIndex,
									'line-gray':index>=newestNodeIndex,
									'completed':projectInfo.projectStatus===3}"
                ></view>
							</view>
            </view>
          </view>
          <view class="column">
            <view
              :class="{'active':item.nodeStatus!==1}"
              v-for="(item,index) in nodesInfo"
              :key="item.id"
            >
						</view>
          </view>
          <view class="worker">
            <view class="item"
              v-for="(item,index) in workers"
              :key="item.id"
            >
              <view
								v-if="(item.nodeStatus===2&&item.id!==-1)||item.nodeStatus===3"
								@click="toPersonalHome(item.id)"
							>
								<image
								  class="avatar"
								  :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_16,h_16'"
								></image>
								<view class="name" :class="{'minHeight':item.flag}">{{item.name}}</view>
								<view class="line" v-if="item.flag">...</view>
							</view>
							<view class="text" v-else-if="item.nodeStatus===2&&item.id===-1">
								{{item.nodeType===1||item.nodeType===4||item.nodeType===5?'待服务':'待施工'}}</view>
							<view class="text" v-else-if="item.nodeStatus===1">待购买</view>
							<view class="own" v-else-if="item.nodeStatus===4">自带施工</view>
            </view>
          </view>
        </view>
				<image
					v-if="projectInfo.projectStatus===3"
				  class="endWork"
				  src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/end_active.png"
				></image>
        <image
					v-else
          class="endWork"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/end_work%402x.png"
        ></image>
      </view>
    </view>
    <view class="dynamic" :class="{'mg':!dynamics.length}">
      <view class="top">
        <view class="title">装修动态</view>
        <view
          class="filter"
          @click="selectC"
        >
          <view class="text">筛选</view>
          <image
            class="icon"
            src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_filtrate%402x.png"
          ></image>
        </view>
      </view>
			<view class="noDynamics" v-if="!dynamics.length">
				<image class="noDynamicsImg" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/pic_empty%402x.png"></image>
				<view class="text">暂无装修动态</view>
				<view class="bottom"></view>
			</view>
			<scroll-view :scroll-y="true" class="list" v-else>
				<view
          class="item"
          v-for="(item,index) in dynamics"
          :key="item.id"
        >
          <image
            class="avatar"
            :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_37,h_37'"
						@click="toPersonalHome(item.userId)"
          ></image>
          <view class="acitonInfo">
            <view class="header">
              <view>
                <view class="workerName">{{item.userName}}</view>
                <view class="role">{{item.roleName}}</view>
              </view>
              <view class="date">{{item.normDateStr}}</view>
            </view>
            <view class="report">{{item.content}}</view>
            <view class="evidence">
              <imagePreview
                :list='item.imagesList'
                :imgWidth='192'
                :imgHeight="192"
                :lineSpace='10'
                :colSpace="11"
                :row="2"
              ></imagePreview>
            </view>
            <view class="footer">
              <view class="actionType">{{item.recordName}}</view>
              <view class="right">
                <view class="like">
                  <image
                    v-if="!item.selfLike"
                    @click="likeC(item.recordType,item.id,index,true)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_like_pre%402x.png"
                  ></image>
                  <image
                    v-else
                    @click="likeC(item.recordType,item.id,index)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_red_hand%402x.png"
                  ></image>
                  <view class="text">{{item.likeCount}}</view>
                </view>
                <view class="comment">
                  <image
                    @click="commentC(item.id)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_discuss%402x.png"
                  ></image>
                  <view class="text">{{item.commentCount}}</view>
                </view>
              </view>
            </view>
					</view>
				</view>
			</scroll-view>
			<view class="bottom" v-if="dynamics.length">
				<view class="text">暂时没有更多数据~</view>
			</view>
		</view>
    <view class="bottomBox"></view>
    <view class="footer">
      <view
        class="consult"
        @click="toInlineService"
      >
        <image
          src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/question.png"
        ></image>
        <view>咨询客服</view>
      </view>
      <view
        class="userWant"
        @click="toDecorate"
      >
        <image
          src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/decorate.png"
        ></image>
        <view>我要装修</view>
      </view>
      <view
        class="focusOn"
        @click="focusC"
				v-if="!isSelfFocusOn"
      >
        <image
          class="add"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_add_focus%402x.png"
        ></image>
        <view>关注</view>
      </view>
			<view
			  class="focusOn"
				:class="{'bgColor':isSelfFocusOn}"
			  @click="focusC"
				v-else
			>
			  <view>已关注</view>
			</view>
    </view>
		<view class="mask" v-if="showDecorateMask">
			<view class="popupDecorate" :class="{'height':hasEstate}">
				<view class="estateInfo" v-if="!hasEstate" @click="toAddEstate">
					<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_add_estate%402x.png"></image>
					<view>添加房屋信息</view>
				</view>
				<view class="service" :class="{'margin':hasEstate}">
					<view class="decorate_service" @click="toDecorateService">
						<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_decorate_service%402x.png"></image>
						<view>进行装修服务</view>
					</view>
					<view class="checkRoom_service" @click="toCheckRoomService">
						<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_checkRoom_service%402x.png"></image>
						<view>进行验房服务</view>
					</view>
				</view>
				<view class="close" @click="closeDecorateServe">
					<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_decorate_cancel%402x.png"></image>
				</view>
			</view>
		</view>
    <view
      class="mask"
      v-if="showNodeType"
    >
      <view class="popupSelects">
        <view class="selArea">
          <view
            class="cancel"
            @click="cancelC"
          >取消</view>
          <view
            class="confirm"
            @click="confirmC"
          >确定</view>
				</view>
				<picker-view @change="bindChange" class="picker-view">
				  <picker-view-column>
							<view class="item">全部</view>
				      <view
								class="item"
								v-for="(item,index) in selectNodeTypes"
								:key="item.nodeType"
							>{{item.nodeName}}</view>
				  </picker-view-column>
				</picker-view>
      </view>
    </view>
		<view
      class="mask"
      v-if="showComments"
    >
      <view class="popupComments">
        <view class="topArea">
          <view class="mainTit">评论</view>
          <image
            @click="closeComments"
            class="close"
            src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_closed_black%402x.png"
          ></image>
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
					:scroll-y="true"
          class="commentList"
          v-if="comments.length"
        >
          <view
            class="commentItem"
            v-for="(item,index) in comments"
            :key="item.commentId"
          >
            <view
              class="mainContent"
              bindlongpress="deleteComment(item.commentId,item.zeusId)"
              @click="commentItemC(item.nickname,item.commentId)"
            >
              <image
                class="avatar"
                :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_36,h_36'"
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
              bindlongpress="deleteComment(replyItem.commentId,replyItem.zeusId)"
              @click="replyItemC(replyItem.nickname,replyItem.commentId,index)"
              v-for="replyItem in item.secondComments"
              :key="replyItem.commentId"
            >
              <image
                class="avatar"
                :src="replyItem.avatar+'?x-oss-process=image/resize,m_mfit,w_20,h_20'"
              ></image>
              <view class="replyInfo">
                <view class="info">
                  <view class="userInfo">
                    <view class="userName">{{replyItem.nickname}}</view>
                    <view class="role">{{replyItem.labelName}}</view>
                  </view>
                  <view class="date">{{replyItem.time}}</view>
                </view>
                <view class="text">回复
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
                  src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_expand%402x.png"
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
                  src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_packUp%402x.png"
                ></image>
              </view>
            </view>
          </view>
					<view class="bottomText">没有更多了~</view>
				</scroll-view>
        <view
          class="bottomDelete"
          v-if="showDelete"
        >
          <view class="deleteWrap">
            <image
              class="img"
              src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_comment_delete%402x.png"
            ></image>
            <view class="delete">删除</view>
          </view>
          <view class="deleteCancel">取消</view>
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
            @focus="inputFocus"
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
import axios from "@/js_sdk/gangdiedao-uni-axios";
import {
  getDecorateProcess,
  getDecorateDynamic,
  getSelectOptions,
	setViews,
  setAttentions,
  getFocusBrowse,
  getComments,
  getReplies,
  createReply,
  removeComment,
	checkEquipmentServe
} from "../../../api/real-case.js";
import {queryEstates} from "../../../api/decorate.js";
import imagePreview from "../../../components/image-preview/image-preview.vue";
export default {
  components: {
    imagePreview,
  },
  data() {
    return {
			hasEstate: false,
      showNodeType: false,
      showComments: false,
			showDecorateMask: false,
      selectedIndex: -1,
      selectedType: 0,
      projectInfo: {},
      nodeTypes: [],
      nodesInfo: [],
      workers: [],
      dynamics: [],
      comments: [],
      selectNodeTypes: [],
      processId: 0,
      isSelfFocusOn: false,
      estateFocusOnCount: 0,
      estateViewCount: 0,
      dynamicId: 0,
      isInputFocus: false,
      showInput: false,
      showDelete: false,
      commentId: 0,
      commentIndex: 0,
      inputName: "",
      inputValue: "",
      isExpanded: false,
      isReply: false,
      houseStructure: 0,
      projectId: 0,
      userId: 0,
			dynamicPage: 1,
			dynamicPageType: 1,
			replyPage: 1,
			commentPage: 1,
			homePageEstate: {},
			buyState: false,//是否购买摄像头服务,
			hasChange: false,
			newestNodeIndex: 0,
			scn: ""
    };
  },
  onLoad(option) {
    this.projectId = option.projectId;
		uni.$on("currentHouseChange", (item) => {
		  this.homePageEstate = item
		})  
  },
	onShow() {
		this.userId = uni.getStorageSync("userId");
		this.scn = uni.getStorageSync("scn")
	},
	onPullDownRefresh(){
		uni.stopPullDownRefresh()
	},
	onReachBottom() {
		
		if(this.selectedType){
			this.dynamicPageType+=1;
			this.getDynamic(this.selectedType)
		}else{
			this.dynamicPage+=1;
			this.requestDynamic();
		}
		
	},
  mounted() {
    this.requestDecorateSteps();
    this.requestDynamic();
		this.checkBuyServe()
  },
  methods: {
		closeDecorateServe(){
			this.showDecorateMask = false
		},
		closeComments(){
			this.showComments = false
		},
		bindChange(e){
			this.selectedIndex = e.detail.value - 1
			this.hasChange = true
		},
		checkBuyServe(){
			let params = {
				projectId:  this.projectId
			}
			checkEquipmentServe(params).then(data => {
				this.buyState = data.buyState
			})
		},
    inputFocus() {
      this.isInputFocus = true;
    },
    deleteComment(commentId, zeusId) {
      if (this.userId !== zeusId) return;
      this.showDelete = true;
      removeComment(commentId).then((data) => {
        this.commentC(this.dynamicId);
      });
    },
		onView() {
		  let deviceId = 0;
		  uni.getSystemInfo({
		    success: (res) => {
		      deviceId = res.deviceId;
		    },
		  });
		  let params = {
		    routeId: 4001,
		    relationId: this.projectInfo.id,
		    authorId: this.projectInfo.estateOwnerId,
		    equipmentId: deviceId,
		    subBizType: this.houseStructure,
		  };
		  setViews(params).then((data) => {
		    if (data) {
		      this.estateViewCount += 1;
		    }
		  });
		},
    setReply(isReply) {
      this.showInput = false;
      console.log(this.inputValue, "blur");
      let params = {
        businessId: this.dynamicId, //	动态ID
        businessType: 2,
        replyId: isReply ? this.replyId : this.commentId,
        content: this.inputValue,
      };
      createReply(params).then((data) => {
        this.commentC(this.dynamicId);
      });
    },
    expandC(id, index) {
      
      let params = {
        page: this.replyPage,
        rows: 10,
        parentId: id, //评论ID
      };
      getReplies(params).then((data) => {
        if (data) {
					let {list,page,totalRows} = data
          
					if(this.replyPage!==1){
						this.comments[index].secondComments =
							this.comments[index].secondComments.concat(list || []);
					}else{
						this.comments[index].secondComments = list || [];
					}
					
					if(this.comments[index].secondComments.length >= totalRows){
						this.isExpanded = true;
					}
          this.replyPage = ++page
        }
      });
    },
    packUpC(index) {
      this.isExpanded = false;
      this.comments[index].secondComments.splice(2);
    },
    likeC(recordType, id, index, isAdd) {
      let deviceId = 0;
      uni.getSystemInfo({
        success: (res) => {
          deviceId = res.deviceId;
        },
      });
      let params = {
        routeId: 3001,
        relationId: id,
        authorId: this.projectInfo.estateId,
        equipmentId: deviceId,
        userId: this.userId,
        type: 0,
        bizType: 6,
        subBizType: recordType,
      };
      setAttentions(params).then((data) => {
        if (data) {
          console.log(data);
          this.dynamics[index].selfLike = !this.dynamics[index].selfLike;
          isAdd
            ? ++this.dynamics[index].likeCount
            : --this.dynamics[index].likeCount;
        }
      });
    },
    commentC(id) {
      this.dynamicId = id;
      this.showComments = true;
      let params = {
        page: this.commentPage,
        rows: 10,
        businessId: id, //	动态ID
        businessType: 2,
      };
      getComments(params).then((data) => {
        if (data) {
          let { page, list } = data;
					
					if(this.commentPage === 1){
						this.comments = list
					}else{
						this.comments.push(...list)
					}
					this.commentPage = ++page
				}
			});
		},
    commentItemC(name, commentId) {
      if (this.userId !== this.projectInfo.estateOwnerId) return;
      this.showInput = true;
      this.inputName = name;
      this.commentId = commentId;
    },
    replyItemC(name, replyId, commentIndex) {
      if (this.userId !== this.projectInfo.estateOwnerId) return;
      this.isReply = true;
      this.showInput = true;
      this.inputName = name;
      this.replyId = replyId;
      this.commentIndex = commentIndex;
    },
    focusC() {
      let deviceId = 0;
      uni.getSystemInfo({
        success: (res) => {
          deviceId = res.deviceId;
        },
      });
      let params = {
        routeId: 1002,
        relationId: this.projectInfo.id,
        authorId: this.projectInfo.estateOwnerId,
        equipmentId: deviceId,
        subBizType: this.houseStructure,
      };
      setAttentions(params).then((data) => {
        if (data) {
          this.isSelfFocusOn = !this.isSelfFocusOn;
					if(this.isSelfFocusOn){
						this.estateFocusOnCount += 1;
						uni.showToast({
							title:'关注成功',
							icon:'none'
						})
					}else{
						this.estateFocusOnCount -= 1;
						uni.showToast({
							title:'取消关注',
							icon:'none'
						})
					}
          
        }
      });
    },
    selectC() {
      this.showNodeType = true;
      this.requestSelectOptions();
    },
    cancelC() {
      this.showNodeType = false;
    },
    confirmC() {
      this.showNodeType = false;
			if(this.hasChange && this.selectedIndex !== -1){
				//nodeType有值
				this.selectedType = this.selectNodeTypes[this.selectedIndex].nodeType
				//重置入参page
				this.dynamicPageType = 1
				this.getDynamic(this.selectedType)
			}
			if(!this.hasChange || this.selectedIndex === -1){
				this.requestDynamic();
			}
			//重置标识位
			this.hasChange = false
    },
		toPersonalHome(userId){
			uni.navigateTo({
				url: `/sub-decorate/pages/person-page/person-page?personId=${userId}`
			})
		},
    toDecorate() {
			let params = {isNeedRelative:false}
			queryEstates(params).then(data => {
				if(data.length){
					this.hasEstate = true
				}
				this.showDecorateMask = true
			})
    },
    toInlineService() {
      this.$store.dispatch("openCustomerConversation");
    },
		toAddEstate(){
			uni.navigateTo({
			  url: "/sub-decorate/pages/add-house/add-house?type=decorate",
			});        
		},
		toDecorateService(){
			uni.navigateTo({
			  url: `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=decorate&estateId=${this.homePageEstate.id}&from=userHome`,
			});        
		},
		toCheckRoomService(){
			uni.navigateTo({
			  url: `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=checkHouse&estateId=${this.homePageEstate.id}&from=userHome`,
			});        
		},
    toDecorateCalendar() {
      uni.navigateTo({
        url: `/sub-home/pages/decorate-scene/decorate-calendar?projectId=${this.projectInfo.id}&isDecorate=0`,
      });
    },
    toVideoSite() {
			if(!this.buyState){
				uni.showToast({
					title: "暂无工地视频～",
					icon: "none",
					duration: 2000
				})
				return
			}
      uni.navigateTo({
        url: `/sub-home/pages/lives-decorate/lives-decorate?projectId=${this.projectInfo.id}`,
      });
    },
    toConstruction() {
      uni.navigateTo({
        url: `/sub-home/pages/decorate-scene/construction-drawings?projectId=${this.projectInfo.id}`,
      });
    },
    toCost() {
			if(this.scn){
				uni.navigateTo({
				  url: `/sub-decorate/pages/actuary-bill/actuary-bill?projectId=${this.projectInfo.id}`,
				});
			}else{
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
    },
    requestSelectOptions() {
      let params = {
        projectId: this.projectId,
        processId: 1,
        allNodesFlag: false,
      };
      getSelectOptions(params).then((data) => {
        if (data && data.length) {
          this.selectNodeTypes = data;
        }
      });
    },
    requestFocus() {
      let params = {
        relationId: this.projectInfo.id,
        subBizType: this.houseStructure,
      };
      getFocusBrowse(params).then((data) => {
        if (data) {
          this.estateFocusOnCount = data.estateFocusOnCount;
          this.estateViewCount = data.estateViewCount;
          this.isSelfFocusOn = data.isSelfFocusOn;
          this.onView();
        }
      });
    },
		getDynamic(nodeType){
			let params = {
				page: this.dynamicPageType,
				projectId: this.projectId,
				nodeType: nodeType,
			}
			getDecorateDynamic(params).then((data) => {
			  if (data) {
			    let { list, page, totalRows } = data;
			    this.dynamicPageType = page
					if(this.dynamicPageType!==1){
						this.dynamics = this.dynamics.concat(list || [])
					}else{
						this.dynamics = list || []
					}
			  }
			});
		},
    requestDynamic() {
      let params = {
				page: this.dynamicPage,
				projectId: this.projectId,
			};
			getDecorateDynamic(params).then((data) => {
        if (data) {
          let { list, page, totalRows } = data;
          this.dynamicPage = page
					if(this.dynamicPage!==1){
						this.dynamics = this.dynamics.concat(list || [])
					}else{
						this.dynamics = list || []
					}
        }
      });
    },
    requestDecorateSteps() {
      let params = {
        projectId: this.projectId,
      };
      getDecorateProcess(params).then((data) => {
        if (data) {
          let { projectInfo, nodes, estate } = data;
					let arr = []
					nodes.slice().reverse().forEach(item => {
						if(item.nodeType === 2 || item.nodeType === 3)return
						arr.push(item)
					})
					console.log(arr,'??')
					nodes.map((item, index) => {
						if(item.nodeType === 2 || item.nodeType === 3){
							return
						}{
							this.nodeTypes.push({
							  nodeName: item.nodeName,
								nodeType: item.nodeType
							});
						}
						if(arr.find(item => item.nodeStatus !== 1)){
							let nodeType = arr.find(item => item.nodeStatus !== 1).nodeType
							this.newestNodeIndex = this.nodeTypes.findIndex(item => item.nodeType === nodeType)
							console.log(nodeType)
						}
					  this.nodesInfo.push({
					    id: item.id,
					    nodeStatus: item.nodeStatus,
					    nextNodeId: item.nextNodeId,
					  });
					  this.workers.push({
					    id: item.serveId,
					    name: item.serveName.length<=3?item.serveName.slice(0,3):item.serveName.slice(0,2),
					    avatar: item.serveAvatar,
							nodeStatus: item.nodeStatus,
							nodeType: item.nodeType,
							flag: item.serveName.length>3
					  });
					  return item;
					});
          this.projectInfo = projectInfo;
          this.processId = nodes[0].processId;
          this.houseStructure = estate.houseStructure;
          this.requestFocus();
          
          for (let i = 0; i < this.nodesInfo.length - 1; i++) {
            this.nodesInfo[i].nextNodeStatus = this.nodesInfo[i + 1].nodeStatus;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
	
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
	.popupDecorate{
		width: 100%;
		height: 644rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
	.popupDecorate.height{
		height: 460rpx;
	}
	.popupDecorate .estateInfo{
		width: 622rpx;
		height: 112rpx;
		margin: 104rpx 54rpx 72rpx 74rpx;
		border: 2rpx solid #333333;
		border-radius: 32rpx;
		display: flex;
		align-items: center;
	}
	
	.estateInfo image{
		width: 28rpx;
		height: 28rpx;
		display: block;
		margin-left: 190rpx;
		margin-right: 24rpx;
	}
	.estateInfo view{
		width: 192rpx;
		height: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}
	.popupDecorate .service{
		width: 100%;
		height: 188rpx;
		display: flex;
		justify-content: space-around;
	}
	.popupDecorate .service.margin{
		margin-top: 104rpx;
	}
	.popupDecorate .service image{
		width: 128rpx;
		height: 128rpx;
		display: block;
		margin: 0 14rpx;
	}
	.popupDecorate .service view{
		width: 156rpx;
		height: 36rpx;
		margin-top: 24rpx;
		font-size: 26rpx;
		text-align: center;
		color: #333333;
	}
	.popupDecorate .close{
		width: 100%;
		height: 64rpx;
	}
	.popupDecorate .close image{
		width: 24rpx;
		height: 24rpx;
		display: block;
		margin-left: 364rpx;
		margin-top: 104rpx;
	}
	.popupComments {
		position: relative;
		width: 100%;
		height: 840rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
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
	}
	.commentList {
		width: 100%;
		max-height: 700rpx;
		/* height: fit-content; */
	}
	.commentList .bottomText{
		width: 144rpx;
		height: 26rpx;
		margin: 60rpx 0;
		margin-left: 303rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.commentItem {
		width: 686rpx;
		margin-left: 32rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.commentItem:last-child {
		border: none;
	}
	.commentItem:first-child .mainContent {
		margin-top: 24rpx;
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
		height: 80rpx;
		font-size: 26rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.info .userInfo {
		display: flex;
		align-items: center;
	}
	.info .userName {
		max-width: 330rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: 36rpx;
		margin-right: 8rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.info .role {
		width: 60rpx;
		height: 28rpx;
		font-size: 20rpx;
		line-height: 28rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(45deg, #f2af1a, #ffd698);
		border-radius: 6rpx;
	}
	.info .date {
		width: 146rpx;
		height: 36rpx;
		font-size: 26rpx;
		color: #999999;
		line-height: 36rpx;
	}
	.commentItem .reply {
		width: 100%;
		/* height: 150rpx; */
		height: fit-content;
		margin-top: 24rpx;
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
	.packUp {
		width: 74rpx;
		height: 36rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #00c2b8;
		display: flex;
		align-items: center;
	}
	.packUp .img {
		width: 14rpx;
		height: 8rpx;
		display: block;
		margin-left: 8rpx;
	}
	.popupSelects {
		width: 100%;
		height: 670rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		border-radius: 24rpx 24rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
	.popupSelects .selArea {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		background: #f9fafb;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
	}
	.cancel {
		width: 60rpx;
		height: 42rpx;
		margin: 40rpx 0 38rpx 48rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #999999;
	}
	.confirm {
		width: 60rpx;
		height: 42rpx;
		margin: 40rpx 48rpx 38rpx 0;
		font-size: 30rpx;
		font-weight: 500;
		text-align: center;
		color: #00c2b8;
		line-height: 42rpx;
	}
	.picker-view {
		width: 750rpx;
		height: 550rpx;
	}
	.picker-view .item{
		width: 750rpx;
		height: 110rpx;
		align-items: center;
		justify-content: center;
		line-height: 110rpx;
		font-size: 32rpx;
		color: #333;
	}
	.options {
		width: 100%;
		height: 550rpx;
		list-style: none;
	}
	.options li {
		width: 670rpx;
		height: 110rpx;
		margin: 0 40rpx;
		line-height: 110rpx;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
	}
	.options .active {
		border-top: 2rpx solid #e2e4ea;
		border-bottom: 2rpx solid #e2e4ea;
		color: #00c2b8;
	}
	.sceneContainer {
		width: 100%;
		height: 100%;
	}
	.sceneContainer.noScroll{
		overflow: hidden;
	}
	.sceneContainer > .header {
		width: 100%;
		height: 400rpx;
		background-repeat: no-repeat;
		background-image: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png");
		display: flex;
	}
	.sceneContainer > .footer {
		width: 100%;
		height: 136rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		display: flex;
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
	}
	.houseImg{
		width: 232rpx;
		height: 232rpx;
		margin: 56rpx 32rpx 48rpx 48rpx;
		border-radius: 20rpx;
		display: block;
	}
	.houseInfo {
		width: 439rpx;
		padding-top: 56rpx;
	}
	.location {
		max-width: 406rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 56rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 56rpx;
		margin-left: 32rpx;
	}
	.focus {
		margin-left: 32rpx;
		height: 34rpx;
		line-height: 34rpx;
		display: flex;
	}
	.focus view {
		width: 110rpx;
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #ffffff;
		opacity: 0.3;
	}
	.focus .browse {
		margin-right: 32rpx;
	}
	.itself {
		width: 406rpx;
		height: 96rpx;
		margin-left: 32rpx;
		margin-top: 38rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.1);
		border-radius: 16rpx;
		display: flex;
	}
	.itself .line {
		width: 2rpx;
		height: 36rpx;
		margin: 30rpx 40rpx;
		background: rgba(255, 255, 255, 0.1);
	}
	.type {
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	.type view {
		height: 34rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 34rpx;
	}
	.type .typeInner {
		width: 154rpx;
		margin-top: 14rpx;
	}
	.type .tag {
		width: 48rpx;
		opacity: 0.3;
	}
	.area {
		margin-right: 58rpx;
	}
	.area view {
		height: 34rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 34rpx;
	}
	.area .tag {
		width: 48rpx;
		opacity: 0.3;
	}
	.area .areaInner {
		width: 170rpx;
		margin-top: 14rpx;
	}

	.navBar {
		margin-top: -80rpx;
		width: 100%;
		height: 176rpx;
		background: #ffffff;
		border-radius: 40rpx;
		display: flex;
		justify-content: space-between;
	}
	.navBar > view {
		margin-top: 36rpx;
	}
	.navBar > view:first-child{
		margin-left: 76rpx;
	}
	.navBar > view:last-child{
		margin-right: 76rpx;
	}
	.navBar > view  .text {
		width: 96rpx;
		height: 34rpx;
		margin-left: -8rpx;
		margin-bottom: 30rpx;
		font-size: 24rpx;
		text-align: center;
		color: #333333;
		line-height: 34rpx;
	}
	.navBar image {
		width: 72rpx;
		height: 72rpx;
		margin: 4rpx;
		display: block;
	}
	.process {
		width: 100%;
		height: 364rpx;
		margin-top: 24rpx;
		background: #ffffff;
		border-radius: 40rpx;
	}
	.process .title {
		width: 128rpx;
		height: 44rpx;
		padding-top: 32rpx;
		padding-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.content {
		width: 100%;
		height: 250rpx;
		margin-top: 40rpx;
		margin-bottom: 32rpx;
		display: flex;
	}
	.content > image {
		width: 40rpx;
		height: 72rpx;
		display: block;
		margin-top: 20rpx;
		margin-left: 32rpx;
	}
	.content .endWork {
		margin-left: 0;
		margin-right: 32rpx;
	}
	.content .mainWrap {
		width: 606rpx;
	}
	.nodeType {
		margin: 0 10rpx 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.nodeType > view {
		width: 44rpx;
		height: 32rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 32rpx;
		
	}
	.nodeType > view.maxWidth{
		width: 66rpx;
		margin: 0 -11rpx;
	}
	.progressBar {
		display: flex;
		align-items: center;
	}
	.connectStartLine {
		width: 22rpx;
		height: 2rpx;
		background: #01c2c3;
	}
	.connectEndLine {
		width: 22rpx;
		height: 2rpx;
		background: #c2c2c2;
	}
	.steps {
		width: 562rpx;
		height: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
	}
	.done {
		background: #01c2c3;
		border: 2rpx solid #01c2c3;
	}
	.doing {
		background: #ffffff;
		border: 2rpx solid #35c4c4;
	}
	.unpaid {
		background: #ffffff;
		border: 2rpx solid #c2c2c2;
	}
	.connectLine {
		width: 62rpx;
		height: 2rpx;
		margin-top: 8rpx;
		margin-left: 16rpx;
	}
	.line-gray {
		background: #c2c2c2;
	}
	.line-green {
		background: #01c2c3;
	}
	.connectLine:last-child.completed{
		background: #01c2c3;
	}
	.column {
		height: 24rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.column > view {
		height: 24rpx;
		border-right: 2rpx dotted #c2c2c2;
	}
	.column > view.active {
		border-right: 2rpx dotted #01c2c3;
	}
	.column > view:nth-child(7),
	.column > view:nth-child(8){
		margin-right: 1rpx;
	}
	.worker {
		padding: 0 10rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.worker .item {
		width: 40rpx;
		height: 128rpx;
		background: #f5f6f6;
		border-radius: 20rpx;
	}
	.worker .item:nth-child(1),
	.worker .item:nth-child(2),
	.worker .item:nth-child(3),
	.worker .item:nth-child(4){
		margin-left: 1rpx;
	}
	.worker .item:nth-child(5),
	.worker .item:nth-child(6){
		margin-right: 1rpx;
	}
	.worker .item:nth-child(7),
	.worker .item:nth-child(8){
		margin-right: 2rpx;
	}
	.worker .item > view {
		width: 40rpx;
		height: 128rpx;
		margin: 10rpx 10rpx 14rpx;
		font-size: 20rpx;
		color: #333333;
		line-height: 24rpx;
	}
	.worker .item > view .avatar {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		display: block;
		margin: 0 0 8rpx -4rpx;
	}
	.worker .item > view .name {
		
	}
	.worker .item > view .name.minHeight {
		height: 48rpx;
		overflow: hidden;
	}
	.worker .item > view .line{
		margin-top: 2rpx;
		margin-left: 8rpx;
		transform: rotate(90deg);
	}
	.worker .item .text{
		margin: 28rpx 10rpx;
		color: #999999;
	}
	.worker .item .own{
		margin: 16rpx 10rpx;
	}
	
	.dynamic {
		width: 100%;
		height: fit-content;
		margin-top: 24rpx;
		background: #ffffff;
		border-radius: 40rpx;
	}
	.dynamic.mg{
		margin-bottom: 60rpx;
	}
	.dynamic .bottom{
		width: 100%;
		height: 126rpx;
		background: #f5f6f6;
	}
	.dynamic .bottom .text{
		width: 222rpx;
		height: 26rpx;
		background: #f5f6f6;
		margin: 0 264rpx 40rpx 264rpx;
		padding-top: 60rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.dynamic .top {
		width: 100%;
		height: 78rpx;
		display: flex;
		justify-content: space-between;
	}
	.top .title {
		width: 128rpx;
		height: 44rpx;
		margin-top: 32rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.top .filter {
		width: 104rpx;
		height: 46rpx;
		margin-top: 32rpx;
		margin-right: 32rpx;
		background: #f5f6f6;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
	}
	.top .filter .text {
		width: 48rpx;
		height: 34rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #333333;
	}
	.top .filter .icon {
		display: block;
		width: 14rpx;
		height: 8rpx;
		margin-left: 5rpx;
	}
	.noDynamics .noDynamicsImg{
		width: 750rpx;
		height: 580rpx;
		display: block;
		margin-top: 40rpx;
	}
	.noDynamics .text{
		width: 156rpx;
		height: 36rpx;
		font-size: 26rpx;
		color: #999999;
		margin: 24rpx 298rpx;
	}
	.noDynamics .bottom{
		width: 750rpx;
		height: 42rpx;
	}
	.list {
		width: 100%;
		height: fit-content;
	}
	
	.item {
		width: 100%;
		display: flex;
	}
	.item .avatar {
		width: 74rpx;
		height: 74rpx;
		border-radius: 50%;
		display: block;
		margin-top: 39rpx;
		margin-left: 31rpx;
		border: 1rpx solid #f5f6f6;
	}
	.item .acitonInfo {
		width: 598rpx;
		margin: 48rpx 32rpx 0 16rpx;
		padding-bottom: 36rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.item:last-child .acitonInfo {
		border-bottom: 0rpx;
	}
	.acitonInfo .header {
		width: 100%;
		height: 42rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.acitonInfo .report {
		width: 100%;
		word-wrap: break-word;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		/* max-height: 120rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; */
	}
	.acitonInfo .evidence {
		width: 100%;
		/* height: 394rpx; */
		height: fit-content;
		margin: 16rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.evidence .img {
		width: 192rpx;
		height: 192rpx;
		display: block;
		margin-bottom: 10rpx;
		border-radius: 12rpx;
	}
	.acitonInfo .footer {
		width: 100%;
		height: 34rpx;
		padding-top: 12rpx;
		display: flex;
		justify-content: space-between;
	}
	.acitonInfo .header > view {
		display: flex;
		align-items: center;
	}
	.acitonInfo .header .workerName {
		max-width: 330rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 42rpx;
		margin-right: 8rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 42rpx;
	}
	.acitonInfo .header .role {
		width: 82rpx;
		height: 32rpx;
		background: linear-gradient(45deg, #6d95ef, #84b9fc);
		border-radius: 6rpx;
		font-size: 22rpx;
		text-align: center;
		color: #ffffff;
		line-height: 32rpx;
	}
	.acitonInfo .header .date {
		width: 136rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .actionType {
		width: fit-content;
		/* width: 104rpx; */
		height: 32rpx;
		padding: 0 8rpx;
		background: #f5f6f6;
		border-radius: 6rpx;
		font-size: 22rpx;
		color: #333333;
		text-align: center;
		line-height: 32rpx;
	}
	.acitonInfo .footer .right {
		width: 166rpx;
		height: 34rpx;
		display: flex;
	}
	.acitonInfo .footer .right > view {
		display: flex;
		align-items: center;
	}
	.acitonInfo .footer .right .text {
		width: 30rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .right .like {
		margin-right: 32rpx;
	}
	.acitonInfo .footer .like image {
		width: 34rpx;
		height: 34rpx;
		display: block;
		margin-right: 4rpx;
	}
	.acitonInfo .footer .comment image {
		width: 34rpx;
		height: 34rpx;
		display: block;
		margin-right: 4rpx;
	}
	.sceneContainer .footer .consult {
		width: 88rpx;
		height: 76rpx;
		margin: 36rpx 40rpx 24rpx 32rpx;
	}
	.consult image,
	.userWant image {
		width: 40rpx;
		height: 40rpx;
		display: block;
		margin-left: 24rpx;
		margin-bottom: 4rpx;
	}
	.consult view,
	.userWant view {
		width: 88rpx;
		height: 32rpx;
		font-size: 22rpx;
		text-align: center;
		color: #999999;
		line-height: 32rpx;
	}
	.sceneContainer .footer .userWant {
		width: 88rpx;
		height: 76rpx;
		margin-top: 36rpx;
	}
	.sceneContainer .footer .focusOn {
		width: 422rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		background: linear-gradient(135deg, #53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin: 24rpx 32rpx 24rpx 48rpx;
	}
	.sceneContainer .footer .focusOn.bgColor{
		background: #F5F6F6;
	}
	.sceneContainer .footer .focusOn.bgColor view{
		margin-left: 163rpx;
		color: #666666;
	}
	.focusOn .add {
		width: 18rpx;
		height: 18rpx;
		display: block;
		margin-left: 166rpx;
		margin-right: 8rpx;
	}
	.focusOn view {
		width: 96rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 32rpx;
	}
	
</style>
