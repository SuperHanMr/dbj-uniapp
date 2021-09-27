<template>
	<view>
		<uni-popup
		  ref="popup"
		  type="dialog"
		>
		  <uni-popup-dialog
		    mode="base"
		    :title="title"
		    :before-close="true"
		    @close="close"
		    @confirm="confirm"
		  />
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		name:"popup-dialog",
		props:{
			title:{
				type:String
			
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			confirm(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" >

</style>
