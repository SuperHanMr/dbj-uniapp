<template>
	<view>
		<view class="count">
			<view 
				class="list" 
				:style="{background:timeBackground,color:timeColor}"
			>
				{{hour}}
			</view>
			<text class="separator" :style="{color:separatorColor}">:</text>
			<view 
				class="list"
				:style="{background:timeBackground,color:timeColor}"
			>
				{{minute}}
			</view>
			<text class="separator" :style="{color:separatorColor}">:</text>
			<view 
				class="list"
				:style="{background:timeBackground,color:timeColor}"
			>
				{{second}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "count-down",
		props: {
			start: {
				type: Number,
				default: 0
			},
			finish: {
				type: Number,
				default: 0
			},
			timeBackground:{
				type:String,
				default:""
			},
			timeColor:{
				type:String,
				default:"#FFFFFF"
			},
			separatorColor:{
				type:String,
				default:"#FFFFFF"
			}
		},
		data() {
			return {
				hour: '',
				minute:'',
				second:''
			}
		},
		watch:{
			hour(newVal,oldVal){
				console.log("newVal==",newVal,typeof newVal)
				console.log("oldVal==",oldVal)
				if(newVal==2){
					this.$emit("changeBgc")
				}
			}
		},
		created(){
			let start = this.start.toString()
			let finish = this.finish.toString()
			let timer = parseInt(start)-parseInt(finish)
			let hours = Math.floor(timer / 1000/ 60 / 60);
			let minutes = Math.floor(timer/ 1000 / 60) % 60;
			let seconds = Math.floor(timer/ 1000) % 60;
			this.hour = (hours < 10 ? ('0' + hours) : hours);
			this.minute = (minutes < 10 ? ('0' + minutes) : minutes);
			this.second = (seconds < 10 ? ('0' + seconds) : seconds);
			
			var interval = setInterval(() => {
				this.second = (Array(2).join(0) + parseInt(--this.second)).slice(-2)
				if (this.second == 0) {
					if (this.minute != 0) {
							this.minute = (Array(2).join(0) + parseInt(--this.minute)).slice(-2)
							this.second = 59
					} else {
						if (this.hour != 0) {
							this.hour = (Array(2).join(0) + parseInt(--this.hour)).slice(-2)
							this.minute = 59
							this.second = 59
						} else {
							clearInterval(interval)
							this.finality()
						}
					}
				}
			}, 1000)
		},
		
		methods: {
			finality(){
				this.$emit('finish');
			},
		}
	}
</script>

<style lang="scss" >
	.count {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		height: 32rpx;
		.list {
			width: 36rpx;
			height: 32rpx;
			font-weight: 500;
			line-height: 32rpx;
			text-align: center;
			border-radius: 4rpx;
			font-size: 24rpx;;
		}
		.separator{
			width: 6rpx;
			height: 32rpx;
			line-height: 32rpx;
			font-weight: 500;
			font-size: 24rpx;
			margin: 0 6rpx 0 6rpx;
		}
	}
</style>
