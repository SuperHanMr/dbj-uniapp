<template>
	<view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity"
			:obtainCitys="obtainCitys" :isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
 formatName: 'title',
            //当前城市
            activeCity: {
                id: 1,
                title: '南京市'
            },
            //热门城市
            hotCity: [
                {
                    id: 0,
                    title: '南京市'
                },
                {
                    id: 1,
                    title: '南京市'
                }
            ],
            //显示的城市数据
            obtainCitys: [
                {
                    id: 0,
                    title: '南京'
                },
                {
                    id: 1,
                    title: '北京'
                },
                {
                    id: 2,
                    title: '天津'
                },
                {
                    id: 3,
                    title: '东京'
                }
            ]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
