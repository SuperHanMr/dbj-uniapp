<template>
	<view class="box">
		<view class="touch-item" v-for="(item,index) in listData" :class="item.isTouchMove == true?'touch-move-active':''" :key='item.id' @touchstart="touchstart" @touchmove="touchmove" :data-index='index'>
			<view class="list-count">
				<text>{{item.isTouchMove }}</text>
				<view class="dle-btn centerboth" @click.stop="delThis(item,index)">
					<view class="del-icon centerboth">
						<text>删除</text>
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
				startX: 0, //开始坐标
				startY: 0,
        listData:[
            {id:1,isTouchMove:false,title:'1'},
                                {id:2,isTouchMove:false,title:'2'},
                                {id:3,isTouchMove:false,title:'3'},
                                {id:4,isTouchMove:false,title:'4'}

          ]
			};
		},
		mounted() {
			
		},
		created() {

		},
		computed: {
			
		},
		methods: {
			delThis:function(item,index){
				this.$emit('delBtn',item,index)
			},
			touchstart: function(e) {
				var that = this;
				var listData = that.listData;
				//开始触摸时 重置所有删除
				listData.forEach(function(v, i) {
					0
					if (v.isTouchMove) //只操作为true的
          console.log(123)
						v.isTouchMove = false;
				});
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
				// this.$emit('touchEv',listData);
			},
			//滑动事件处理
			touchmove: function(e) {
				var that = this;
				var listData = that.listData;
				var index = e.currentTarget.dataset.index, //当前索引
					startX = that.startX, //开始X坐标
					startY = that.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				listData.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过30度角 return
					if (Math.abs(angle) > 30) return;
					if (i == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
					}
				})
				//更新数据
				
			},
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			}
		}
	}
</script>

<style scoped>
	view,textarea,input,text,button{
	  padding: 0;
	  margin: 0;
	  box-sizing:border-box;
	  font-size: 28rpx;
	  font-family: "微软雅黑";
	}
	.uni-checkbox-input{
		border-radius: 50% !important;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background: #f5f5f5;
		overflow: hidden;
	}
	.centerboth {
		display:flex;
		display: -webkit-flex;
		align-items:center;
		-webkit-align-items:center;
		justify-content: center;
		-webkit-justify-content: center;
	}
	.clearfix:after {
	    content: "";
	    display: block;
	    visibility: hidden;
	    height: 0;
	    clear: both;
	}
	
	.clearfix {
	    zoom: 1;
	}
	image{
	  padding: 0;
	  margin: 0;
	}
	.box{
		width: 100%;
		overflow: hidden;
	}
	.list-count {
		width: 100%;
    height: 206rpx;
		position: relative;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(60px);
		transform: translateX(60px);
		margin-left: -60px;
		background: #fff;
		border-bottom: 1px solid #F5F5F5;
	}
	.list-box .count{
		font-size: 32rpx;
	}
	.dle-btn {
		position: absolute;
		right: -120rpx;
		top: 0;
		width: 120rpx;
		height: 100%;
		text-align: center;
		background: none;
		color: #3F68B2;
		font-size: 30rpx;
		z-index: 99;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(70px);
		transform: translateX(70px);
		border-radius: 10rpx;
	}
	.dle-btn .iconfont{
		font-size: 40rpx;
		
	}
	.del-icon{
		
	}
	
	.touch-move-active .list-count,
	.touch-move-active .dle-btn {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
	
	.touch-move-active .dleBtn {
		right: -120rpx;
	}
	.dle-btn image{
		width: 51rpx;
		height: 55rpx;
	}

</style>
