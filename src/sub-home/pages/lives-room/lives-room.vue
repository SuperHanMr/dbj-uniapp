<template>
	<view class="content">
		<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />
	</view>
</template>

<script>
	import {
		getTim,
		getSafeTim,
		addListener,
		cleanListeners
	} from "@/utils/tim.js"
	import TIM from 'tim-wx-sdk'
	export default {
		data() {
			return {
				livePreview: '',
				roomId: ''
			};
		},
		onLoad(e) {
			if (e && e.livePreview) {
				this.livePreview = e.livePreview;
			}
			if (e && e.roomId) {
				this.roomId = e.roomId
			}
		},
		onShow() {
			if (uni.getStorageSync("userId")) {
				getSafeTim().then(tim => {
					console.log('?????!!!!!');
					tim.joinGroup({
						groupID: 'group' + this.roomId,
						type: TIM.TYPES.GRP_AVCHATROOM
					}).then(imResponse => {
						tim.getGroupProfile({
							groupID: 'group' + this.roomId,
							groupCustomFieldFilter: ['extensionArr']
						}).then(data => {
							if (data.code == 0) {
								// extensionArr
								let groupCustomField = data.data.group.groupCustomField
								let res = groupCustomField.filter(e => {
									return e.key == 'extensionArr'
								})
								let result = JSON.parse(res[0].value);
								console.log('XXXXXXXXX');
								console.log(result);
							}
							console.log('!!!!!!?????QQQQQ')
							console.log(data)
						});
						console.log('!!!!!!!!!!!');
						console.log(imResponse.data.status)
					})
				})
			}
		},
		methods: {
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.log('~~~~~~~~~');
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}

	.player {
		width: 100%;
		height: 100%;
	}
</style>
