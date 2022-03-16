<template>
  <view style="background-color: #F6F6F6;margin-bottom: 60rpx;position: relative;">
    <!-- <view > -->
    <custom-navbar
      :opacity="scrollTop/100"
      title="找设计"
      bgcolor="#FFF"
    >
      <template v-slot:back>
        <view @click="toBack">
          <i
            class="icon-ic_cancel_white header-back"
            style="color:'black'"
          >
          </i>
        </view>
      </template>
    </custom-navbar>

    <view
      class="header-container"
      :style="{backgroundImage:`url(${bgImg2})`}"
    >
      <view class="search_container">
        <view
          class="search_style"
          @click="findOwnDesigner()"
        >
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/findDesingerSearchIcon.svg" />
          <text>我想自己找...</text>
        </view>
        <image
          class="customerServiceIcon"
          @click="contactService"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/online-server.png"
        />
      </view>
      <view class="title"> 找设计 </view>
      <view class="tab-container">
        <view
          class="tabItem"
          v-for="item1 in iconList"
          :key="item1.name"
        >
          <image :src="item1.url" />
          <view >
            {{item1.name}}
          </view>
        </view>
      </view>
    </view>
    <view class="recommendForYou-container">
      <view class="title_container">
        <view class="left">
					<view class="recommend">
						为您推荐
					</view>
					<view class="change-designerList" @click="changeDesignerList">
						<text>换一换</text>
						<image src="../../static/next_batch.png" />
					</view>
        </view>
        <view
          class="right"
          @click="gotoMoreDesigner"
        >
          <text>更多</text>
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
        </view>
      </view>

    </view>
    <!-- 推荐设计师的名片 -->
    <view class="designCard_container">
      <scroll-view
        scroll-x="true"
        style="white-space: nowrap;"
				lower-threshold="4"
        @scrolltolower.stop="gotoMoreDesigner"
				:scroll-left="scrollLeft"
      >
        <view
          class="design-card-item"
          v-for="item2 in searchDesignerList"
          :key="item2.id"
          :style="{backgroundImage:`url(${item2.artImage}?x-oss-process=image/resize,m_fill,h_800,w_600,limit_0)`,backgroundSize:'434rpx 572rpx'}"
          @click="gotoDesignerHomePage(item2.id)"
        >
          <view class="basic-info">
            <view class="header">
              <view class="name">{{item2.name}}</view>
              <view class="rank">{{item2.levelName}}设计师</view>
							<view class="ranking-container" 
								v-if="item2.ranks && item2.ranks.length>=1 && item2.ranks[0].realNumber>0"
								:style="{backgroundImage:`url(${handleLabelImg(item2.ranks[0]).bgImg})`}"
							>
								<view class="num top-font" 
									:style="{color:`#${item2.ranks[0].fontColor}`,background:handleLabelImg(item2.ranks[0]).bgcolor}"
								>
									TOP.{{item2.ranks[0].realNumber}}
								</view>
								<view class="text top-font" :style="{color:`#${item2.ranks[0].fontColor}`}">
									{{item2.ranks[0].abbreviation}}
								</view>
							</view> 
            </view>
            <view class="goodPraise" style="margin-bottom: 8rpx;">
              <view class="item">
                <text v-if="item2.praiseEfficiency">好评率{{item2.praiseEfficiency}}%</text>
                <text v-if="item2.praiseEfficiency" class="icon"></text>
                <text>{{item2.industryYears}}年设计经验</text>
              </view>
            </view>
            <view class="attr">
							<view class="attrItem" v-for="item32 in item2.styles" :key="item32">
								{{item32}}
							</view>
              <view class="attrItem" v-for=" item3 in item2.designs" :key="item3" >{{item3}}</view>
						</view>
          </view>
        </view>
        <view class="showMoreCard_container">
					<image src="../../static/moreDesignerImg.png" mode=""></image>
				</view>
      </scroll-view>
		</view>

		<!-- 元宵节新增需求 -->
		<view class="design-service-container">
			<view class="title">
				设计服务推荐
			</view>
			<view class="scroll-container">
				<scroll-view
					scroll-x="true"
					style="white-space: nowrap;"
				>
					<view class="design-service-item"
						v-for="item4 in designServiceRecList"
						:key="item4.id"
						@click="gotoProduceDetail(item4)"
					>
						<image :src="item4.imageUrl" />
						<view class="footer">
							<view class="name">
								{{item4.fullName}}
							</view>
							<view class="price">
								<text style="font-size: 20rpx;">￥</text>
								<text style="font-size: 28rpx;">{{handlePrice(item4.price/100)[0]}}</text>
								<text style="font-size: 24rpx;">.{{handlePrice(item4.price/100)[1]}}</text>
								<text style="font-size: 22rpx;">/{{item4.unit}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>


    <view
      class="perfectHouseInfo_container"
      v-if="!userId || (userId && !hasEstate)"
    >
      <image
        class="bigImage"
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/perfectHouseInfo.svg"
				@click="gotoEditHouse"
      />

      <view
        class="btn"
        @click="gotoRealCase"
      >
        <text>去看推荐案例</text>
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/gotoCase.svg" />
      </view>
    </view>


    <view
      v-if="userId && hasEstate"
      class="recommendCase title_container"
      @click="gotoRealCase"
    >
      <view class="left">
				<view class="recommend">
					推荐案例
				</view>
      </view>
      <view class="right">
        <text>更多</text>
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
      </view>
    </view>
    <view
      class="recommendCaseItem_container"
      v-if="userId && hasEstate && caseList.length"
    >
      <view
        :style="{backgroundImage:`url(${bgImg})`}"
        class="case-item"
        v-for="item4 in caseList"
        :key="item4.id"
				@click="toRealCaseDetail(item4)"
      >
        <view class="left">
          <view class="name_container">
            <view class="name">{{item4.nikeName || '--'}}   Ta家</view>
            <view class="cost">
              <text v-if="item4.similarity">{{item4.similarity}}</text>
              <text v-if="item4.similarity" class="icon"></text>

              <text v-if="item4.flag">附近{{ item4.distance/1000>1
							?`${(item4.distance/1000).toFixed(2)}km`:item4.distance>500?`${parseInt(item4.distance)}m`:'500m以内'}}</text>
              <text v-if="item4.flag" class="icon"></text>

              <text v-if="!item4.flag">{{item4.cityName|| "-"}}</text>
              <text v-if="!item4.flag" class="icon"></text>

              <text>{{item4.budget
							?Math.floor(item4.budget)<1?`预算：￥-万`:`预算：￥${Math.floor(item4.budget)}万`
							: "预算：-"}}</text>
            </view>
          </view>
          <view class="attr_container">
            <view
              class="attr_item"
							v-if="itemHandler(item4)"
              v-for="item5 in itemHandler(item4) "
              :key="item5"
            >{{item5}}</view>
						
          </view>
        </view>
        <image
          class="right"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg"
        />
      </view>
    </view>
		<view class="connectServiceContainer" v-if="showFloating" :style="{bottom: containerPaddingBottom}">
			<view class="connectServiceContent">
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/kefu.png" />
				<view class="contentInfo">
					<view class="no">不知道如何选择设计师</view>
					<view class="find">找我聊聊为您推荐</view>
				</view>
				<view class="btn" @click="immediatelyChat">
					立即沟通
				</view>
				<view class="cancel-Container" @click.stop="cancelShowFloating">
					<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/find-designer-cancel.png" mode=""></image>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
import { debounce } from "@/utils/common.js";
import {
  recommendCaseList,
  searchDesigner,
	designServiceList,
  firstsearchDesigner,
} from "../../../api/home-find-design.js";
export default {
  data() {
    return {
      scrollTop: 0,
			scrollLeft:0,
      navBarHeight: "",
      tabList: ["1", "2", "3"],
      currentTab: 0,
      subChildren: [],
      subIndex: 0,
      goodsList: [],
      //新加的
      bgImg:
        "https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/caseItemBg.svg",
      bgImg1:
        "https://ali-res-test.dabanjia.com/res/20211024/17/1635068528844_4631%24%E8%B6%85%E8%B6%8A3.jpg?x-oss-process=image/resize,m_mfit,w_686,h_686",
      bgImg2:
        "https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/findDesignbg.svg",
      bgImg3:
        "https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/moreDesignerBg.svg",
      iconList: [
				{
				  key: 1,
				  url: "../../static/pingtairenzheng.svg",
				  name: "平台认证",
				},
				{
				  key: 2,
				  url: "../../static/yanxuan.svg",
				  name: "严选设计师",
				},
				{
				  key: 3,
				  url: "../../static/baozhang.svg",
				  name: "品质设计",
				},
        {
          key: 4,
          url: "../../static/guomeiIcon.svg",
          name: "服务保障",
        },
      ],
			labelList:[
				{
					bgcolor:"linear-gradient(180deg, #EAE3D1 0%, #DED5BF 100%)",
					bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank1.png",
				},
				{
					bgcolor:"linear-gradient(180deg, #FAD7CD 0%, #E8C2B5 100%)",
					bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank2.png",
				},
				{
					bgcolor:"linear-gradient(180deg, #B9E6F3 0%, #9FD3E3 100%)",
					bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank3.png",
				},
				{
					bgcolor:"linear-gradient(180deg, #FFEBCC 0%, #FFE5B7 100%)",
					bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank999.png",
				}
			],
      searchDesignerList: [], //设计师列表
			designServiceRecList:[],//设计服务推荐
      caseList: [], //推荐列表
      userId: "", //用户id
      hasEstate: false, //是否有房屋
      estateId: "", //房屋id
      page: 0,
			totalRows:"",
      totalPage: "",
			containerPaddingBottom:"",
			intoPageNum:0,
			intoDesignerListPage:0,
			showFloating:false,
    };
  },
	

	mounted() {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.systemBottom = menuButtonInfo.bottom + "rpx";
		this.containerPaddingBottom = menuButtonInfo.bottom + 58 + "rpx";
		console.log("this.containerPaddingBottom ====",this.containerPaddingBottom )
	},

  onLoad() {
    const systemInfo = uni.getSystemInfoSync();
    this.navBarHeight = systemInfo.statusBarHeight + "px";
		if (uni.getStorageSync("recommendDesignerPage")) {
		  this.page = uni.getStorageSync("recommendDesignerPage");
		}
  
		this.page++;
		uni.setStorageSync("recommendDesignerPage", this.page);
		const hhh = uni.getStorageSync("recommendDesignerPage");



		// 处理弹框展示问题
		if (uni.getStorageSync("intoPageNum")) {
			this.intoPageNum = uni.getStorageSync("intoPageNum");
		}
		if(uni.getStorageSync("intoDesignerListPage")){
			this.intoDesignerListPage = uni.getStorageSync("intoDesignerListPage")
		}
		this.intoPageNum ++;

		this.getDesignerList();
		this.reqDesignServiceRecommendList()
  },
  onShow() {
		this.scrollLeft = 1
		this.$nextTick(()=>{
			this.scrollLeft = 0
			uni.$emit("currentHouseChange")
			this.userId = getApp().globalData.token;
			console.log("getApp().globalData===",getApp().globalData)
			this.estateId = getApp().globalData.currentHouse.id
			if (this.userId) {
			  this.hasEstate = this.estateId ? true : false
				uni.setStorageSync("intoPageNum", this.intoPageNum);
				uni.setStorageSync("intoDesignerListPage",this.intoDesignerListPage)
				if(this.intoDesignerListPage == 1){
					this.showFloating = true
				}else{
					this.showFloating =false
				}
			} else {
			  this.estateId = "";
				this.intoDesignerListPage = 0
			}
			this.getRecommendCaseList();
			console.log("this.intoDesignerListPage=====",this.intoDesignerListPage)
		})
	},

  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },

	watch:{
		searchDesignerList:{
			deep:true,
			handler(newList,oldList){
				return newList
			},
		}
	},
  methods: {
    toBack() {
      uni.navigateBack({});
    },

    gotoNext: debounce(() => {
			  uni.navigateTo({
			    url: "/sub-home/pages/find-design/search-design",
			  });
		},500),

    getRecommendCaseList() {
      let params = {
        estateId: this.estateId,
      };
      recommendCaseList(params).then((res) => {
        this.caseList = res;
      });
    },

    getDesignerList() {
      let params = {
        page: this.page,
        rows: 5,
        isRecommend: true,
        position: "",
        searchKey: "",
        topic: "",
        style: "",
        sortType: "", //排序类型 0:默认排序，1:服务次数排序 2： 好评率排序"
      };
      firstsearchDesigner(params).then((res) => {
        this.searchDesignerList = res.list;
        this.searchDesignerList = res.list.map(item=>{
					if(item.artImage.indexOf('?x-oss-process=image/resize,m_fill,h_160,w_120,limit_0') !==-1){
						item.artImage = item.artImage.split('?')[0]
					}
					return item
				})

        this.totalPage = res.totalPage;
        uni.setStorageSync("recommendDesignerTotalPage", res.totalPage);
				// // 返回的总条数不是5的倍数
				// if ((res.totalRows % 5 !== 0) && (this.page == (this.totalPage - 1))) {
				// 	this.page = 0;
				// 	uni.setStorageSync("recommendDesignerPage", this.page);
				// }
				// //返回的总条数是5的倍数
				// if((res.totalRows % 5 == 0) && (this.page ==this.totalPage)){
				// 	this.page = 0;
				// 	uni.setStorageSync("recommendDesignerPage", this.page);
				// }
				if(this.page == this.totalPage){
					this.page = 0
					uni.setStorageSync("recommendDesignerPage", this.page);
				}
      });
    },

		reqDesignServiceRecommendList(){
			designServiceList().then(res=>{
				this.designServiceRecList = res
				// console.log("designerServiceRecList===",res)
			})
		},
		//商品详情页面
		gotoProduceDetail(item){
			if(this.intoDesignerListPage){
				this.intoDesignerListPage ++
			}
			uni.navigateTo({
				url:`../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
			});
		},
		itemHandler(item) {
			// let arr = [item.styleName];
			// if (item.features && item.features.length) {
			// 	arr.push(item.features[0]);
			// }
			// if (item.customLabelList && item.customLabelList.length){
			// 	arr.unshift(item.customLabelList[0].labelName);
			// }
			// return arr;
			let arr=[];
			if(item.customLabelList && item.customLabelList.length){
				arr = item.customLabelList.map(Item=>{
					return Item.labelName
				})
			}
			if(item.styleName){
				arr.push(item.styleName)
			}
			if(item.features && item.features.length){
				arr = arr.concat(item.features)
			}
			// console.log("自定义标签arr",arr)
			return arr
		},
		// 换一批
		changeDesignerList(){
			console.log("换一批！")
			this.page++;
			console.log("this.page22==",this.page)
			uni.setStorageSync("recommendDesignerPage", this.page);
			this.getDesignerList();
		},

		cancelShowFloating(){
			this.showFloating  =false;
			this.intoDesignerListPage++;
			console.log("cancelShow!!!!!!!!!!!")
		},
		immediatelyChat(){
			this.intoDesignerListPage++;
			this.$store.dispatch("openCustomerConversation");
		},
		//自己找设计师
    findOwnDesigner() {
			if(this.intoDesignerListPage){
				this.intoDesignerListPage ++
			}
      uni.navigateTo({
        url: "/sub-home/pages/find-design/search-design",
      });
    },
    //联系客服
    contactService() {
      console.log("联系客服");
      this.$store.dispatch("openCustomerConversation");
    },
    //去完善房屋信息
    gotoEditHouse() {
			uni.navigateTo({
				url: "/sub-my/pages/my-house/my-house?fromHome=true",
			});
    },
    //更多设计师
		gotoMoreDesigner(){
			this.intoDesignerListPage ++ ;
			console.log("this.intoDesignerListPage===more",this.intoDesignerListPage)
			debounce(() => {
				uni.navigateTo({
					url: "/sub-home/pages/find-design/designer-list",
				});
			},500)()
		},

    //去设计师个人主页
    gotoDesignerHomePage(zeusId) {
      console.log("zeusId====", zeusId);
			if(this.intoDesignerListPage){
				this.intoDesignerListPage ++;
			}
      uni.navigateTo({
        url: `/sub-decorate/pages/person-page/person-page?personId=${zeusId}`,
      });
    },
    //去推荐案例
    gotoRealCase() {
			if(this.intoDesignerListPage){
				this.intoDesignerListPage++
			}
      uni.navigateTo({
        url: "/sub-home/pages/find-design/real-case/real-case",
      });
    },
		toRealCaseDetail(item) {
			uni.navigateTo({
		    url: `/pages/real-case/real-case-webview/real-case-webview?id=${item.id}`,
		  });
		},
		handlePrice(price) {
		  if (!price) return ["0", "00"];
		  let list = String(price).split(".");
		  if (list.length == 1) {
		    return [list[0], "00"];
		  } else {
		    return [list[0], list[1]];
		  }
		},
		//处理标签图片展示问题
		handleLabelImg(rankItem){
			switch(rankItem.styleCode){
				case 1:
					return this.labelList[0];
				case 2:
					return  this.labelList[1];
				case 3:
					return  this.labelList[2];
				case 9999: 
					return  this.labelList[3];
			}
		},
		
  },
};
</script>

<style lang="scss" scoped>
.top-bg {
  width: 100%;
  // height: 420rpx;
  height: 156rpx;
  // background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/find_design_bg.png");
  background-size: contain;
  position: relative;

  .pleaholder {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 32rpx;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
  }
}

.header-back {
  width: 82rpx;
  height: 82rpx;
  // background-color: #eee;
  color: #000;
  line-height: 82rpx;
  text-align: center;
}
// 新添加的
.header-container {
  padding: 188rpx 0 36rpx 40rpx;
  position: relative;
  background-size: contain;
  position: relative;
  .backgroundStyle {
    position: absolute;
    height: 440rpx;
    top: 0;
  }
  .search_container {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-right: 32rpx;
    .search_style {
      width: 574rpx;
      height: 62rpx;
      box-sizing: border-box;
      border: 2rpx solid #999999;
      border-radius: 16rpx;
      background-color: #ffffff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding-left: 24rpx;
      image {
        display: block;
        width: 25rpx;
        height: 26rpx;
        margin-right: 16rpx;
      }
      text {
        color: #cccccc;
        font-size: 26rpx;
      }
    }
    .customerServiceIcon {
      width: 76rpx;
      height: 76rpx;
    }
  }
  .title {
    padding-left: 2rpx;
    padding-top: 36rpx;
    color: #222222;
    font-size: 44rpx;
    font-weight: 500;
    letter-spacing: 1rpx;
    margin-bottom: 2rpx;
  }
  .tab-container {
    height: 36rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .tabItem {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-right: 24rpx;
      image {
        width: 32rpx;
        height: 32rpx;
				display: block;
        margin-right: 6rpx;
      }
			view{
				color: #333333;
				font-size: 26rpx;
				height: 36rpx;
				line-height: 36rpx;
			}
    }
    .tabItem:last-child {
      margin-right: 0;
    }
  }
}

.recommendForYou-container {
  background-color: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
}
.designCard_container {
  height: 698rpx;
  // padding-left: 32rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
  display: flex;
  align-items: center;
  scroll-view {
    .design-card-item {
      width: 434rpx;
      height: 698rpx;
      margin-left: 32rpx;
      background-color: pink;
      border-radius: 16rpx;
      background-color: #ffffff;
      background-repeat: no-repeat;
      background-position: top center;
      display: inline-block;
      position: relative;
      overflow: hidden;
      box-shadow: 4rpx 4rpx 10px #e5e5e5;
      .basic-info {
        position: absolute;
        bottom: 0;
        width: 434rpx;
        height: 170rpx;
        box-sizing: border-box;
        padding: 24rpx;
        background: linear-gradient(180deg, rgba(52, 85, 116, 0.35) -2.26%, rgba(52, 85, 116, 0.8) 100%);
        border-radius: 16rpx;
        backdrop-filter: blur(28rpx);
        // transform: matrix(1, 0, 0, -1, 0, 0);
        .header,
        .goodPraise {
          display: flex;
          align-items: center;
          margin-bottom: 4rpx;
          .name {
						max-width: 344rpx;
            color: #ffffff;
            font-size: 30rpx;
            display: block;
            height: 42rpx;
            line-height: 42rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
          }
          .rank {
            margin-left: 12rpx;
            height: 30rpx;
            box-sizing: border-box;
            padding: 0 8rpx;
            line-height: 26rpx;
            border: 0.5px solid rgba(255, 255, 255, 0.44);
						background: rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
            border-radius: 4rpx;
            color: #ffffff;
            font-size: 20rpx;
          }

					.item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 34rpx;
            font-size: 24rpx;
            color: #ffffff;
            opacity: 0.6;
            text {
              line-height: 34rpx;
              color: #ffffff;
            }
            .icon {
              display: block;
              height: 20rpx;
              width: 2rpx;
              background: #ffffff;
              opacity: 0.7;
              margin: 0 16rpx;
            }
          }
        }

        .attr {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
					height: 34rpx;
					overflow: hidden;
          .attrItem {
            height: 34rpx;
            line-height: 30rpx;
            box-sizing: border-box;
            border: 0.5px solid #ffffff;
            border-radius: 6rpx;
            padding: 0 12rpx;
            color: #ffffff;
            opacity: 0.6;
            font-size: 20rpx;
            margin-right: 12rpx;
          }
        }
      }
    }
    // .design-card-item:nth-last-child(1) {
    // 	margin-right: 0;
    // }
    .showMoreCard_container {
      width: 252rpx;
      height: 698rpx;
      border-radius: 32rpx 0 0 32rpx;
      overflow: hidden;
      display: inline-block;
      position: relative;
			margin-left: 32rpx;
			image{
				width: 252rpx;
				height: 698rpx;
			}
      .showMoreCard {
        width: 434rpx;
        height: 698rpx;
        background: rgba(0, 0, 0, 0.04);
        filter: blur(14px);
        background-repeat: no-repeat;
        background-position: top center;
      }
      .content {
        position: absolute;
        left: 66rpx;
        top: 320rpx;
        image {
          width: 32rpx;
          height: 18rpx;
          margin-bottom: 10rpx;
        }
        .text {
          width: 144rpx;
          height: 34rpx;
          line-height: 34rpx;
          font-size: 24rpx;
          color: #ffffff;
          font-weight: 500;
        }
      }
    }
  }
}

	.ranking-container{
		display: flex;
		align-items: center;
		flex-flow: row nowrap;
		margin-left: 8rpx;
		border-radius: 4rpx;
		background-size: 182rpx 30rpx;
		background-position: right center;
		.num{
			padding: 0 16rpx 0 10rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			font-weight: 500;
			font-size: 20rpx;
			border-radius: 4rpx 0 8rpx 4rpx;
		}
		.text{
			width: 98rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			font-weight: 500;
			font-size: 20rpx;
		}
		
	}

.perfectHouseInfo_container {
  margin: 20rpx 0 60rpx;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .bigImage {
    width: 100%;
    height: 234rpx;
  }
  .perfect_house_info {
    width: 100%;
    padding: 24rpx 0 28rpx 56rpx;
    box-sizing: border-box;
    background: #fafaff;
    border: 3rpx solid #ffffff;
    box-sizing: border-box;
    border-radius: 32rpx;
    box-shadow: 0 2rpx 22rpx rgba(0, 0, 0, 0.02);
    .title {
      width: 218rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 36rpx;
      color: #333333;
      font-weight: 500;
    }
    .sub_title {
      height: 36rpx;
      line-height: 36rpx;
      width: 292rpx;
      color: #999999;
      font-size: 26rpx;
      margin-bottom: 26rpx;
    }
    .button {
      width: 150rpx;
      height: 54rpx;
      display: flex;
      align-items: center;
      padding: 10rpx 21rpx 10rpx 24rpx;
      background: linear-gradient(117.02deg, #fa3b34 24.56%, #ff6a33 92.21%);
      border-radius: 16rpx;
      image {
        width: 24rpx;
        height: 12rpx;
        display: block;
      }
      text {
        font-size: 24rpx;
        color: #ffffff;
      }
    }
  }
  .btn {
    margin-top: 34rpx;
    width: 321rpx;
    height: 64rpx;
    padding: 0 65rpx;
    box-sizing: border-box;
    border: 0.5px solid #fa4d32;
    display: flex;
    border-radius: 12rpx;
    align-items: center;
    text {
      color: #fa4d32;
      font-size: 26rpx;
    }
    image {
      display: block;
      width: 32rpx;
      height: 32rpx;
    }
  }
}

.title_container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 32rpx 26rpx 40rpx;
  .left {
    position: relative;
		.recommend{
			height: 44rpx;
			line-height: 44rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: 500;
		}
		.change-designerList{
			position: absolute;
			top: 5rpx;
			left: 154rpx;
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			width: 98rpx;
			text{
				display: block;
				height: 34rpx;
				line-height: 34rpx;
				margin-right: 4rpx;
				font-size: 24rpx;
				color: #999999;
			}
			image{
				display: block;
				width: 20rpx;
				height: 20rpx;
			}
		}
  }
  .right {
    height: 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 14rpx 0 16rpx;
    box-sizing: border-box;
    border: 0.5px solid #adadad;
    border-radius: 16rpx;
    text {
      color: #333333;
      font-size: 22rpx;
    }
    image {
      display: block;
      width: 16rpx;
      height: 16rpx;
    }
  }
}
.recommendCaseItem_container {
  padding: 0 32rpx 32rpx;
  .case-item {
    // height: 182rpx;
    padding: 24rpx 24rpx 24rpx 32rpx;
    margin-bottom: 20rpx;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: right bottom;
    border-radius: 16rpx;
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .left {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      flex: 1;
      .name_container {
        .name {
          height: 44rpx;
          font-size: 32rpx;
          color: #333333;
          margin-bottom: 4rpx;
        }
        .cost {
          height: 30rpx;
          font-size: 22rpx;
          margin-bottom: 16rpx;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          text {
            line-height: 30rpx;
            color: #999999;
          }
          .icon {
            display: block;
            height: 20rpx;
            width: 2rpx;
            background: #999999;
            opacity: 0.7;
            margin: 0 16rpx;
          }
        }
      }
      .attr_container {
        display: flex;
        flex-flow: row wrap;
				max-height: 40rpx;
				overflow: hidden;
        align-items: center;
        .attr_item {
          // width: 128rpx;
          height: 40rpx;
          line-height: 40rpx;
					padding: 0 16rpx;
          color: #999999;
          background-color: #f6f6f6;
          text-align: center;
          border-radius: 6rpx;
          font-size: 24rpx;
          margin-right: 16rpx;
					margin-bottom: 16rpx;
        }
      }
    }
    .right {
      width: 40rpx;
      height: 40rpx;
    }
  }
}


// 元宵节新增需求

.design-service-container{

	.title{
		padding: 48rpx 40rpx 24rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: 500;
	}
	.scroll-container{
		padding: 0 0 32rpx 40rpx;
		scroll-view{
			.design-service-item{
				width: 244rpx;
				display: inline-block;
				margin-right: 24rpx;
				image{
					width: 244rpx;
					height: 244rpx;
					border-radius: 16rpx;
					margin-bottom: 12rpx;
				}
				.footer{
					.name{
						width: 244rpx;
						height: 36rpx;
						line-height: 36rpx;
						margin-bottom: 8rpx;
						color: #333333;
						font-size: 26rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis
					}
					.price{
						text{
							color: #333333;
						}
					}
				}
			}
			.design-service-item:nth-last-child(1){
				margin-right: 40rpx;
			}
		}
	}
}


.connectServiceContainer{
	position: fixed;
	width: 686rpx;
	height: 120rpx;
	box-sizing: border-box;
	padding:0 48rpx;
	border-radius: 16rpx;
	background: rgba(0, 0, 0, 0.75);
	left: 32rpx;
	.connectServiceContent{
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		image{
			width: 76rpx;
			height: 76rpx;
		}
		.contentInfo{
			margin: 26rpx 70rpx 26rpx 16rpx;
			position: relative;
			.no{
				width: 288rpx;
				height: 36rpx;
				line-height: 36rpx;
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: 500;
				margin-bottom: 4rpx;
				letter-spacing: 1rpx;
			}
			.find{
				height: 28rpx;
				line-height: 28rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				letter-spacing: 1rpx;
			}
		}
		.btn{
			width: 140rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 24rpx;
			border-radius: 8rpx;
			background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%)
		}
		.cancel-Container{
			position: absolute;
			width: 44rpx;
			height: 28rpx;
			border-radius: 0 16rpx 0 16rpx;
			background: rgba(255, 255, 255, 0.23);
			display: flex;
			align-items: center;
			justify-content: space-around;
			top: 0;
			right: 0;
			image{
				width: 15rpx;
				height: 15rpx;
			}
		}
	}
}

</style>
