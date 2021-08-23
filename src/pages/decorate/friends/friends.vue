<template>
	<view class="content">
		<button type="default" @click="isEditing=!isEditing">{{isEditing?'完成':'编辑'}}</button>
		<view v-for="(item,index) in list" :key="index" class="item" @click="onSelect(index)">
			<view v-if="selectList.includes(index)">
				已选中
			</view>
			<view v-else>
				未选中
				
			</view>
			<view >
				
				{{item.name}}
			</view>
		</view>
		<view v-if="isEditing" class="add-friends">
			添加亲友

		</view>
		<view v-else class="edit-friends">
			<view  class="btn" @click="addAll">
				全选
			</view>
			<view class="btn" @click="deleteFriends">
				删除
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectList:[],
				isEditing:false,
				list: [{
						name: '张三',
						type: '亲儿子',
						id:0
					},{
						name: '张三',
						type: '亲儿子',
						id:1
					},
					{
						name: '李四',
						type: '儿子',
						id:2
					},
					{
						name: '王五',
						type: '儿子',
						id:3
					},
					{
						name: '赵六',
						type: '儿子',
						id:4
					},
					{
						name: '张三',
						type: '亲儿子',
						id:5
					},
					{
						name: '李四',
						type: '儿子',
						id:6
					},
					{
						name: '王五',
						type: '儿子',
						id:7
					},
					{
						name: '赵六',
						type: '儿子',
						id:8
					},
					{
						name: '张三',
						type: '亲儿子',
						id:9
					},
					{
						name: '李四',
						type: '儿子',
						id:10
					},
					{
						name: '王五',
						type: '儿子',
						id:11
					},
				]

			};
		},
		methods:{
			addAll(){
				console.log(this.selectList.length)
				console.log(this.list.length)
				if(this.selectList.length!=this.list.length){
				this.selectList=[]
					this.list.forEach(e=>{
						this.selectList.push(e.id)
						
					})
				}else{
					
						this.selectList=[]
				}
				
			},
			deleteFriends(){
				
			},
			onSelect(index){
				let selectIndex = this.selectList.indexOf(index)
				if(selectIndex>-1){
					this.selectList.splice(selectIndex,1)
					
				}else{
					this.selectList.push(index)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100rpx;
		margin: 0 24rpx;
		border-bottom: 1rpx solid #fefefe;

	}

	.add-friends {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: yellow;
	}
	.edit-friends{
		
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: yellow;
		.btn{
			width: 60rpx;
			height: 60rpx;
			height: 60rpx;
			text-align: center;
			background-color: #555555;
			margin-left: 200rpx;
		}
	}
</style>
