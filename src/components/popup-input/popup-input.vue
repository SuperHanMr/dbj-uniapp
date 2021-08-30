<template>
	<view>
		<view class="mask" :style="{opacity: showMask ? '1' : '0'}" v-if="focus" @touchmove.prevent></view>
		<view v-if="focus" class="popup-outerBox" :style="outerBoxObj">
			<view class="popup-prompt">
				{{inputValue.length}}/编辑数量
			</view>
			<input
				:type="type" 
				class="popup-input" 
				:style="inputObj" 
				placeholder="请输入"
				:adjust-position="false"
				:focus="focus"
				v-model="inputValue"
				:maxlength="maxlength"/>
			<view class="popup-titleBox">
				<view :style="cancelBtnObj" @click="cancel">
					取消
				</view>
				<view :style="confirmBtnObj" @click="confirm">
					完成
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>

/*
*
* {property} v-model [Boolean] 绑定一个布尔值变量，控制弹窗打开或关闭
* 
* {property} height [String,Number] 弹窗总高度，默认 300rpx
* {property} background [String] 弹窗背景色，默认 #fff
* {property} borderRadius [Number] 弹窗顶部圆角，默认 30rpx
* {property} inputHeight [String,Number] 输入框高度，默认 80rpx
* {property} title [String] 中部标题
* {property} maxlength [Number] 最大输入长度，默认 25
* {property} cancelSize [String,Number] 取消按钮文字大小，默认 32rpx
* {property} cancelColor [String] 取消按钮文字颜色，默认 #888 
* {property} confirmSize [String,Number] 取消按钮文字大小，默认 32rpx 
* {property} confirmColor [String] 取消按钮文字大小，默认 #007AFF 
* {property} titleSize [String,Number] 中部标题文字大小，默认 36rpx 
* {property} titleColor [String] 中部标题文字颜色，默认 #000 
* {property} titleWeight [String,Number] 中部标题文字粗细，默认 500 
* {property} type [String] 输入框的输入类型，默认 text ，可选值 ['text','number','idcard','digit']
* 
* {event} confirm {Function} 点击弹窗确认键时触发，返回 event = value
* {event} cancel {Function} 点击弹窗取消键时触发，返回 event = false
*  
*/

	export default {
		name:"nk-popup-input",
		model:{
			prop: 'isShow',
			event: 'close'
		},
		props:{
			height:{
				type:[String,Number],
				default: 300
			},
			background:{
				type: String,
				default: '#fff'
			},
			borderRadius:{
				type: Number,
				default: 30
			},
			inputHeight:{
				type: [String,Number],
				default: 80
			},
			title:{
				type: String,
				default: ''
			},
			isShow:{
				type:Boolean,
				default: false
			},
			maxlength:{
				type: Number,
				default: 25
			},
			cancelSize:{
				type: [String,Number],
				default: 32
			},
			cancelColor:{
				type: String,
				default: '#888'
			},
			confirmSize:{
				type: [String,Number],
				default: 32
			},
			confirmColor:{
				type: String,
				default: '#007AFF'
			},
			titleSize:{
				type: [String,Number],
				default: '36'
			},
			titleColor:{
				type: String,
				default: '#000'
			},
			titleWeight:{
				type: Number,
				default: 500
			},
			type: {
				type: String,
				default: 'text'
			}
		},
		watch:{
			isShow(newValue,oldValue){
				let _self = this;
				_self.focus = newValue;
				if(newValue){
					setTimeout(()=>{
						this.showMask = true;
					},100)
				}
				uni.onKeyboardHeightChange(res=>{
					if(_self.mark){
						_self.mark = false;
						_self.outerBoxObj.opacity = '1';
					} else {
						_self.mark = true;
						_self.outerBoxObj.opacity = '0';
					}
					_self.$set(_self.outerBoxObj,'bottom',res.height + 'px');
				})
			}
		},
		data() {
			return {
				outerBoxObj:{
					height: this.height + 'rpx',
					backgroundColor: this.background,
					borderRadius: this.borderRadius + 'rpx ' + this.borderRadius + 'rpx' +' 0 0'
				},
				inputObj:{
					height: this.inputHeight + 'rpx',
				},
				cancelBtnObj:{
					fontSize: this.cancelSize + 'rpx',
					color: this.cancelColor
				},
				confirmBtnObj:{
					fontSize: this.confirmSize + 'rpx',
					color: this.confirmColor
				},
				titleObj:{
					fontSize: this.titleSize + 'rpx',
					color: this.titleColor,
					fontWeight: this.titleWeight
				},
				focus: false,
				keyHeight: 0,
				inputValue: '',
				showMask: false,
				mark: true
			};
		},
		methods:{
			confirm(){
				this.showMask = false;
				setTimeout(()=>{
					this.$emit("confirm",this.inputValue);
					this.$emit('close',false)
				},300)
			},
			cancel(){
				this.showMask = false;
				setTimeout(()=>{
					this.$emit("cancel",false)
					this.$emit('close',false)
				},300)
			}
		}
	}
</script>

<style lang="scss">
.mask{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	opacity: 0;
	transition: all 0.3s;
}
.popup-outerBox{
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 1002;
	opacity: 0;
	transition: all 0.3s;
	.popup-titleBox{
		width: 100%;
		height: 80rpx;
		margin-bottom: 40rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		box-sizing: border-box;
	}
	.popup-input{
		width: calc(100% - 64rpx);
		margin: auto;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}
	.popup-prompt{
		width: calc(100% - 64rpx);
		margin: auto;
		text-align: right;
		color: #eee;
	}
}
</style>
