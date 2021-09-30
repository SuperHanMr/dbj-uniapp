<template>
	<web-view :src="url" @message='message'></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(props) {
			const token = uni.getStorageSync("scn")
			this.url = this.ENV.VUE_APP_BASE_H5 + `/app-pages/case-detail/case-detail.html?id=${props.id}&token=${token}`
      // console.log(var(--status-bar-height))
		},
		mounted() {
			// uni.$on('isCollect',(data)=>{
   //      console.log(111)
   //      console.log(data)
   //      this.getChange(data)
   //    })
		},
		methods: {
			// getChange(e){
   //      console.log(111)
   //    },
      message(event){
            console.log('接收到消息',event)
            console.log('接收到消息',event.detail)
            uni.$emit('isCollect',event.detail.data[event.detail.data.length])
        }
		}
	}
</script>

<style>

</style>
