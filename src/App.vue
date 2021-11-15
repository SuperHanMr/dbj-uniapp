<script>
	import {
		oauthGomeInfo
	} from "api/login.js";
  import {
    getMsgNumByHouse
  } from "api/decorate.js"
	import {
		createTim
	} from "utils/tim.js";
	export default {
		globalData: {
			userInfo: {},
			token: "",
			city: "",
			houses: [],
			tim: null,
			currentEstate: {},
			currentProject: {},
			naviData: null,
			decorateMsg: {},
			currentHouse: {},
			switchFlag: "home",
			currentRoute: "/pages/home/index/index",
			previewimageStatus: false,
			screenHeight: 0,
      msg_projectId: null,
		},

		onLaunch: function() {
      
			const userId = uni.getStorageSync("userId");
      
			if (!userId) {} else {
				let token = uni.getStorageSync("scn");
				this.globalData.token = token;
				oauthGomeInfo({
					hideToast: true,
					ignoreLogin: true,
					clientType: "3",
				}).then((data) => {
					getApp().globalData.userInfo = data;
					uni.setStorageSync("userId", data.id);
					getApp().tim = createTim(data.appId);
					this.$store.dispatch("loginIM", {
						userId: data.tid,
						userSig: data.userSign,
					});
				}).catch(e => {
					getApp().globalData.token = "";
					uni.clearStorageSync("scn");
					uni.clearStorageSync("userId")
				});
			}
      uni.$on('system-messages', ()=>{
        console.log(1111)
        this.watchMsg()
      })
      uni.$on('currentHouseChange', ()=>{
        console.log(222)
        this.watchMsg()
      })
		},
		onShow: function() {
      
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
    methods:{
      watchMsg(){
        console.log('监听房屋消息','??????????????',this.globalData.currentHouse)
        if(!this.globalData.token){
          return
        }
        setTimeout(()=>{
          getMsgNumByHouse(this.globalData.currentHouse?this.globalData.currentHouse.id:this.globalData.currentEstate.id).then(res=>{
            if(res.count===0){
              uni.removeTabBarBadge({
                index:2
              })
            }else{
              let num = res.count+''
              uni.setTabBarBadge({
                    index: 2,
                    text: num, 
              })
            }
          }).catch(err=>{
            uni.removeTabBarBadge({
              index:2
            })
          })
        },100)
        
        
      }
    },
	};
</script>

<style>
	/* 字体图标 */
	@import "./static/css/iconfont.css";

	[class^="icon-"],
	[class*=" icon-"] {
		/* use !important to prevent issues with browser extensions that change fonts */
		font-family: "iconfont" !important;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;

		/* Better Font Rendering =========== */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	page {
		height: 100%;
		background-color: #f5f6f6;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	@font-face {
		font-family: PriceFont;
		src:
			url('https://ali-res.dabanjia.com/static/font/price-font/price-font.woff2'),
			url('https://ali-res.dabanjia.com/static/font/price-font/price-font.woff');
	}

	.price-font {
		font-family: PriceFont;
	}

	/*每个页面公共css */
</style>
