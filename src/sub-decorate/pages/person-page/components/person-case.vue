<template>
  <view class="person-case person-content-item" :class="{'is-first':isFirst}"  v-if="pagState.totalRows!==0">
    <view class="title">Ta的案例</view>
    <designCase v-if="pagState.totalRows" class="design-case" :isPerson='true' :leftList="leftList" :rightList="rightList" :leftHeight="leftHeight" :rightHeight="rightHeight" :isGrab='isGrab' @height="onHeight" @click="onClick" @collection="onCollection" ></designCase>
    <view class="empty" v-else>
      暂无案例
    </view>
    <view v-if="pagState.totalPage>pagState.page-1" @click="getList" class="click-text"><text>展开更多案例</text><i :class="{'icon-gerenzhuye_anlihefuwu_zhankaiic':true}"></i></view>
    
  </view>
</template>

<script>
  import designCase from './design-case/design-case.vue'
  import {
    
    getCollection
  } from '@/api/real-case.js'
  import {
    getCaseList
  } from '@/api/decorate.js'
  import '../style/common.scss'
  export default{
    components:{
      designCase
    },
    props:{
      personId:0,
      isGrab:{
        type:Boolean,
        default:false,
      },
      isFirst:{
        type:Boolean,
        default:false
      },
    },
    data(){
      return{
        leftHeight: 0,
        rightHeight: 0,
        leftList: [],
        rightList: [],
        pagState: {
        	// 是否可以加载
        	load: true,
        	// 加载中提示文字
        	loadTxt: "",
        	// 每页的请求条件
        	rows: 10,
        	// 页码
        	page: 1,
        	totalPage: 1,
        	totalRows: 0,
        	end: "",
        },
        activeIndex:0,
        activeList:0,
      }
    },
    mounted(){
      this.getList()
      uni.$on('isCollect',(data)=>{
        console.log('person++++++++++',this.activeList[this.activeIndex])
        if(data){
          this.activeList[this.activeIndex].collectionCount += 1
        }else{
          this.activeList[this.activeIndex].collectionCount -=1
        }
        this.activeList[this.activeIndex].isCollection = !this.activeList[this.activeIndex].isCollection;
      })
    },
    methods:{
      // 监听高度变化
      onHeight(height, tag) {
      	if (tag == "left") {
      		this.leftHeight += height;
      	} else {
      		this.rightHeight += height;
      	}
      },
      onJump(list, index, isDecorate) {
      	
      	// parentType 1 全景图 0  短视频  2 图文
      	const listUrl = list[index].videoUrl
        this.activeIndex = index
        this.activeList = list
        console.log(list,index)
      	uni.navigateTo({
      		url: `/pages/real-case/real-case-webview/real-case-webview?id=${list[index].id}`
      	})
      },
      // 组件点击事件
      onClick(index, tag) {
      	this.tag = tag;
        console.log(tag)
      	// 对应的数据
      	if (tag == "0") {
      		this.onJump(this.leftList, index, this.selectStatus);
      
      	} else {
      		this.onJump(this.rightList, index, this.selectStatus);
      	}
      },
      // 收藏事件
      onCollection(index, tag) {
      	
      	let list = [];
        console.log(tag)
      	if (tag == 0) {
      		list = this.leftList;
      	} else {
      		list = this.rightList;
      	}
        const item = list[index];
      	getCollection({
      		routeId: 5001, // 固定内容
      		subBizType: item.parentType, // 内容下的子项   视频 VR  图片
      		relationId: item.id, // 作品ID
      		authorId: item.zeusId, // 作者ID
      	}).then((res) => {
      		if (list[index].isCollection == false) {
      			list[index].collectionCount += 1;
      		} else {
      			list[index].collectionCount -= 1;
      		}
      		list[index].isCollection = !list[index].isCollection;
      	});
      },
      // 获取数据
      getList() {
      	const params = {
      		page: this.pagState.page,
      		rows: this.pagState.rows,
          sortType:3,
          // sortPropNameType: 5,
          zeusId:this.personId
      	}
      		getCaseList(params).then((res) => {
      			if (res && res.list) {
      				this.addList(res.list);
      				this.pagState.page = res.page+1;
      				this.pagState.totalPage = res.totalPage;
      				this.pagState.totalRows = res.totalRows;
              
              this.$emit('contentEmpty','caseEmpty',res.list.length>0?true:false)
      			}else{
              this.$emit('contentEmpty','caseEmpty',false)
            }
      		})
      },
      cleanPage(){
        this.pagState = {
          // 是否可以加载
          load: true,
          // 加载中提示文字
          loadTxt: "",
          // 每页的请求条件
          rows: 10,
          // 页码
          page: 1,
          totalPage: '',
          totalRows: '',
          end: "",
        }
      },
      addList(res) {
      	// 获取到的数据，请注意数据结构
      	if (!res || res.length < 1) {
      		this.pagState.loadTxt = "没有更多了";
      		return;
      	}
      
      	// 左右列表高度的差
      	let differ = this.leftHeight - this.rightHeight;
      	// 计算差值，用于确定优先插入那一边
      	let differVal = 0;
      
      	// 初始化左右列表的数据
      	let i = differ > 0 ? 1 : 0;
      
      	let [left, right] = [
      		[],
      		[]
      	];
      	// 获取插入的方向
      	let getDirection = (index) => {
          
      		/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
      if(differ!==0){
        if (differ >= 800 && index < 3) {
        	differVal = 1;
        	return "right";
        }
              
        /* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
        if (differ <= -800 && index < 3) {
        	differVal = -1;
        	return "left";
        }
              
        /* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
        if (differ >= 350 && index < 2) {
        	return "right";
        }
        /* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
        if (differ <= -350 && index < 2) {
        	differVal = -1;
        	return "left";
        }
      }
      		
      
      		/* 当前数据序号为偶数时，则插入到左边 */
      		if ((i + differVal) % 2 == 0) {
      			return "left";
      		} else {
      			/* 当前数据序号为奇数时，则插入到右边 */
      			return "right";
      		}
      	};
      
      	// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
      	res.forEach((item, index) => {
      		if (getDirection(index) == "left") {
      			//console.log(`差值：${differ},方向：left，序号${index}`)
      			left.push(item);
      		} else {
      			//console.log(`差值：${differ},方向：right，序号${index}`)
      			right.push(item);
      		}
      		i++;
      	});
      
      	// 将左右列表的数据插入，第一页时则覆盖
      	if (this.pagState.page == 1) {
      		this.leftList = left;
      		this.rightList = right;
      		uni.stopPullDownRefresh();
      	} else {
      		this.leftList = [...this.leftList, ...left];
      		this.rightList = [...this.rightList, ...right];
      	}
      
      	this.pagState.load = true;
      	this.pagState.loadTxt = "上拉加载更多";
      	this.pagState.page++;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .person-case{
    background-color: #fff;
  }
  .is-first{
    border-radius: 32rpx 32rpx 0 0;
  }
  .title{
    margin-bottom: 32rpx;
  }
</style>
