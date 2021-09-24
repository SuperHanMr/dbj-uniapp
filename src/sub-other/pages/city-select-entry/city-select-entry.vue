<template>
	<view class="city-select-entry">
		<view class="head">
			<view class="no-confirm">
				取消
			</view>
			<view class="info">
				请选择服务城市
			</view>
			<view class="confirm" @click="onConfirm">
				确定
			</view>
		</view>
		<CityList @click='onClick'/>
	</view>
</template>

<script>
	import CityList from '../merchant-entry/components/city-select.vue'
	import { mapState, mapGetters } from "vuex";
	export default {
		data() {
			return {
				cityList: []
			}
		},
		components:{
			CityList
		},
		computed: {
			...mapState({
			  cityListArr: (state) => state.merchantEntry.cityList,
			}),
		},
		mounted() {
			this.cityList = this.cityListArr;
		},
		methods: {
			onClick(param) {
				this.cityList = param.select;
				console.log(param, '>>>>>>>>item select')
			},
			onConfirm(){
				console.log(this.cityList, '>>>>>>>>>>>>>>>>city-select-entry>>>>>>>>')
				this.$store.dispatch('setCityList', {cityList: this.cityList})
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.city-select-entry{
	.head{
		background: #F9FAFB;
		border-radius: 0px 0px 4px 4px;
		display: flex;
		padding: 32rpx;
		justify-content: space-between;
		align-items: center;
		.no-confirm{
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #989898;
		}
		.info{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #111111;
		}
		.confirm{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #34C4C4;
		}
	}
}
</style>
