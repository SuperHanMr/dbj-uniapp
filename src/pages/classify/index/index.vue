<template>
    <view class="tabs">
       <view class="search">
          <view class="uni-searchbar">
          	<view :style="{borderRadius:radius+'px',backgroundColor: bgColor}" class="uni-searchbar__box" @click="searchClick">
          		<view class="uni-searchbar__box-icon-search">
          			<uni-icons color="#999999" size="18" type="search" />
          		</view>
          		<text  class="uni-searchbar__text-placeholder">请输入</text>
          	</view>
          </view>
        </view> 
        <view class="content-view">
          <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
              <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                  <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
              </view>
          </scroll-view>
          <swiper :current="tabIndex"  style="flex: 1;height: 100%" :duration="300" @change="ontabchange">
              <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
                  <index-item :options="newsitem" @click="goDetail(newsitem)"></index-item>
              </swiper-item>
          </swiper>
        </view>
    </view>
</template>
<script>
    import indexItem from './index-item.vue';

    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

    const newsData = {
        data0: {
            "datetime": "40分钟前",
            "article_type": 0,
            "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
            "source": "DCloud",
            "comment_count": 639
        },
        data1: {
            "datetime": "一天前",
            "article_type": 1,
            "title": "DCloud完成B2轮融资，uni-app震撼发布!",
            "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
            "source": "DCloud",
            "comment_count": 11395
        },
        data2: {
            "datetime": "一天前",
            "article_type": 2,
            "title": "中国技术界小奇迹：HBuilder开发者突破200万",
            "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
            "source": "DCloud",
            "comment_count": 11395
        },
        data3: {
            "article_type": 3,
            "image_list": [{
                "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
                "width": 563,
                "height": 316
            }, {
                "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
                "width": 641,
                "height": 360
            }, {
                "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
                "width": 640,
                "height": 360
            }],
            "datetime": "5分钟前",
            "title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
            "source": "DCloud",
            "comment_count": 11
        },
        data4: {
            "datetime": "2小时前",
            "article_type": 4,
            "title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
            "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
            "source": "DCloud",
            "comment_count": 69
        }
    };

    export default {
        components: {
            indexItem
        },
        data() {
            return {
                navBarHeight: 0,
                newsList: [],
                cacheTab: [],
                tabIndex: 0,
                tabBars: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '推荐',
                    id: 'tuijian'
                }, {
                    name: '体育',
                    id: 'tiyu'
                }, {
                    name: '热点',
                    id: 'redian'
                }],
                scrollInto: "",
                navigateFlag: false
            }
        },
        onLoad() {
            setTimeout(()=>{
              this.tabBars.forEach((tabBar) => {
                  this.newsList.push({
                      data: []
                  });
              });
              this.getList(0);
            },350)
        },
        methods: {
            searchClick(){
              uni.navigateTo({
              	url: "/pages/classify/search/index"
              })
            },
            getList(index) {
                let activeTab = this.newsList[index];
                let list = [];
                for (let i = 1; i <= 10; i++) {
                    let item = Object.assign({}, newsData['data' + Math.floor(Math.random() * 5)]);
                    item.id = this.newGuid();
                    list.push(item);
                }
                activeTab.data = activeTab.data.concat(list);
            },
            goDetail(e) {
                if (this.navigateFlag) {
                    return;
                }
                this.navigateFlag = true;
                uni.navigateTo({
                    url: './detail/detail?title=' + e.title
                });
                setTimeout(() => {
                    this.navigateFlag = false;
                }, 200)
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                if (this.newsList[index].data.length === 0) {
                    this.getList(index);
                }

                if (this.tabIndex === index) {
                    return;
                }

                // 缓存 tabId
                if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                    let isExist = this.cacheTab.indexOf(this.tabIndex);
                    if (isExist < 0) {
                        this.cacheTab.push(this.tabIndex);
                        //console.log("cache index:: " + this.tabIndex);
                    }
                }

                this.tabIndex = index;
                this.scrollInto = this.tabBars[index].id;

                // 释放 tabId
                if (this.cacheTab.length > MAX_CACHE_PAGE) {
                    let cacheIndex = this.cacheTab[0];
                    this.clearTabData(cacheIndex);
                    this.cacheTab.splice(0, 1);
                    //console.log("remove cache index:: " + cacheIndex);
                }
            },
            clearTabData(e) {
                this.newsList[e].data.length = 0;
                this.newsList[e].loadingText = "加载更多...";
            },
            newGuid() {
                let s4 = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
                }
                return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
            }
        }
    }
</script>

<style scoped > 
  .uni-searchbar {
  	display: flex;
  	flex-direction: row;
  	position: relative;
  	padding: $uni-spacing-col-base;
  	// background-color: $uni-bg-color;
  }
  
  .uni-searchbar__box {
  	display: flex;
  	box-sizing: border-box;
  	overflow: hidden;
  	position: relative;
  	flex: 1;
  	justify-content: center;
  	flex-direction: row;
  	align-items: center;
  	height: 70rpx;
  	padding: 5px 8px 5px 0px;
  	border-width: 0.5px;
  	border-style: solid;
  	border-color: $uni-border-color;
  }
  
  .uni-searchbar__box-icon-search {
  	flex-direction: row;
  	// width: 32px;
  	padding: 0 8px;
  	justify-content: center;
  	align-items: center;
  	color: $uni-text-color-placeholder;
  }
  
  .uni-searchbar__text-placeholder {
  	font-size: $uni-font-size-base;
  	color: $uni-text-color-placeholder;
  	margin-left: 5px;
  }
  
    .content-view{
      height:100%
    }
    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifndef APP-PLUS */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
		/* #ifdef H5 */
		width:100%;
		/* #endif */
		height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }


    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        text-align: center;
        width: 25%;
     /*   padding-left: 34rpx;
        padding-right: 34rpx; */
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
		width:100%;
    }
</style>
