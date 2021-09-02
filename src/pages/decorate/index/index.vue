<template>
	<view class="content">
		<view class="v1">
			<text>装修服务</text>
			<view @click="goToMyDecorate">></view>
		</view>
		<view class="design-picture">
			<image @click="goDesignPicture" mode="aspectFit"
				src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fclubfiles.liba.com%2F2006%2F08%2F23%2F15%2F4603714.jpg&refer=http%3A%2F%2Fclubfiles.liba.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632561406&t=2224059e9c261a09a68eaffa2d2e371d">
			</image>
		</view>
<!--    <button @click="toSend">发送消息</button>
    <text>{{mqttMessage}}</text> -->
		<decorate-notice v-if="noticeActive" @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
		<drag-button-follow :style.sync="style" @btnClick='openNotice' :follow='`left,right`'
			className="drag-button" class="drag-button">
			<view>
				<text>消息</text>
				<text style="color: red;">2</text>
			</view>
		</drag-button-follow>
		<view>
			<view class="v1"><text>量房</text> <text>量房员抢单中</text></view>
			<view>精算服务</view>
			<view>设计服务</view>
			<view @click="gonohouse">无房屋无服入口</view>
			<view @click="gonohousedecatore">无房屋无服务装修</view>
			<view @click="gonohousecheck">无房屋无服务验房</view>
		</view>

	</view>
</template>

<script>
	import {
		queryEstates
	} from "../../../api/decorate.js";

	export default {
    onLoad() {
      // // console.log(connect)
      // //注意小程序切换到后台时可能会断开连接，需要重连
      // var mqtt = require('mqtt/dist/mqtt.js')
      // const url = 'wxs://post-cn-tl32ajx3u0l.mqtt.aliyuncs.com';
      // // console.log(url)
      // const client = mqtt.connect(url, {
      // 	// 8位16进制的随机值组成clientId
      //   keepalive: 0,
      // 	clientId: this.clientId,
      //   username:this.username,
      //   password:this.password,
      //   connectTimeout: 5000,
      // });

      // this.client = client
      // client.on('connect', function(connack){
      //   console.log('连接中')
      // 	const { cmd, returnCode } = connack;
      //   console.log( cmd, returnCode)
      // 	// 返回的命令为connack值，且 returnCode为0，则表示连接被接受，成功
      // 	if (cmd === 'connack' && returnCode === 0) {
      // 		// @todo 连接成功
      // 		console.log('连接成功');
      //     client.subscribe('dabanjia/testTopic',{qos: 1}, function(err) {
      //       console.log(err)
      //       if (!err) {
      //         console.log(111)
      //         // client.publish('dabanjia/testTopic', 'hello mqtt')
      //       }
      //     })
      // 	} else {
      // 		// @todo 连接失败
      //     console.log('失败')
      // 		return;
      // 	}

      // 	// 以下各监听事件的绑定，必须在连接成功后才可以做

      // 	// 监听消息事件
      // 	client.on('message', (topic, message, error) => {
      //     console.log('message',message)
      //     let encodedString = String.fromCharCode.apply(null, new Uint8Array(message));
      //     console.log('内容'+encodedString)
      // 		if (!error) {
      // 			// @todo 成功接收到消息
      //       console.log('成功')
      // 			console.log(topic, message.toString());
      // 		} else {
      //       console.log('失败')
      // 			console.error(error);
      // 		}
      // 	});

      // 	// 监听关闭事件
      // 	client.on('close', () => {
      // 		console.log('连接已关闭');
      // 	});

      // 	// 订阅话题，可以订1个或多个
      // 	// @topic String | Array
      // 	// client.subscribe('dabanjia/testTopic');

      // 	// 发布消息，话题必须有且只能一个
      // // 	client.publish('testtopic', 'hello', (error) => {
      // // 		if (!error) {
      // // 			// @todo 发布成功

      // // 		} else {
      // // 			// @todo 发布失败

      // // 		}
      // // 	});
      // });
      //   client.on('reconnect', (error) => {
      //    console.log('正在重连:', error)
      //   })

      //   client.on('error', (error) => {
      //    console.log('连接失败:', error)
      //   })
      //   // 断开
      //   client.on('end', () => {
      //     console.log('end')
      //   });
      //   // 掉线
      //   client.on('offline', (msg) => {
      //     console.log('offline',msg)
      //   });
    },
		mounted() {

    },
		onShow() {
			if (this.houses && this.houses.length < 1) {
				this.getHouses();
			}
		},
		data() {
			return {
				style: "",
				noticeActive: false,
				houses: getApp().globalData.houses,
        accessKeyId:'LTAI5tKwuhb948v9oakqnbTf',
        instanceId:'post-cn-tl32ajx3u0l',
        groupId:'GID_dabanjia',
        deviceId:`mqttjs_${Math.random().toString(16).substr(2, 8)}`,
        token:'',
        client:{}
			};
		},
    computed:{
      username(){
        return`Token|${this.accessKeyId}|${this.instanceId}`
      },
      //token和设备id关联，需要后端接口提供
      password(){
        return `R|LzMT+XLFl5s/YWJ/MlDz4t/Lq5HC1iGU1P28HAMaxYzmBSHQsWXgdISJ1ZJ+2cxaamjCkkdmS/XOGd160KYNICpRDnjsfBujbJGYgJWUr5piesdvDY0i8S48f1y+kDSyD1qZq3RLscnvooOIjF1CZUnSLi/oIC4juK1MZ8qVI7uIdBoQzt4TbiQgoJWL8b3AQUS1QPxDA2oGf+JBKuN0DyYW6d7mIYhAqXTpVbQw5nNCvKP80Xo0WQLnbM+hoyCSPOmGbPwAsaS1bd9VJjqDoJlCt6GFmJgm2JFY7PJwf/7OOSmUYIYFs5o/PuPpoTMF+hcVXMs+0yDukIMTOzG9m1KmYYo48q4Eb41jz5zvCIjTrIiblxfX1Q==|W|LzMT+XLFl5s/YWJ/MlDz4t/Lq5HC1iGU1P28HAMaxYzmBSHQsWXgdISJ1ZJ+2cxaamjCkkdmS/XOGd160KYNICpRDnjsfBujbJGYgJWUr5piesdvDY0i8S48f1y+kDSyD1qZq3RLscnvooOIjF1CZUnSLi/oIC4juK1MZ8qVI7uIdBoQzt4TbiQgoJWL8b3AQUS1QPxDA2oGf+JBKuN0DyYW6d7mIYhAqXTpVbQw5nNCvKP80Xo0WQLnbM+hoyCSPOmGbPwAsaS1bd9VJjqDoJlCt6GFmJgm2JFY7PJwf/7OOSmUYIYFs5o/PuPpoTMF+hcVXMs+0yDukIMTOzG9m1KmYYo48q4Eb41jz5zvCIjTrIiblxfX1Q==`
      },
      clientId(){
        return `${this.groupId}@@@1234`
      }
    },
		methods: {
			gonohousedecatore() {
				uni.navigateTo({
					url: "/pages/decorate/no-house-decorate/no-house-decorate"
				})
			},
			gonohousecheck() {
				uni.navigateTo({
					url: "/pages/decorate/no-house-checkhouse/no-house-checkhouse"
				})
			},
			gonohouse() {
				uni.navigateTo({
					url: "/pages/decorate/no-house/no-house"
				})
			},
      toSend(){
        console.log('发送消息')
        this.client.publish('dabanjia/testTopic', 'hello zzz')
      },
			closeNotice() {
				this.noticeActive = false;
        uni.showTabBar()
			},
      openNotice(){
        this.noticeActive = true
        uni.hideTabBar()
      },
			goToAddHouseInfo() {
				uni.navigateTo({
					url: "/pages/decorate/add-house/add-house",
				});
			},
			goDesignPicture() {
				uni.navigateTo({
					url: "/pages/decorate/design-picture/design-picture",
				});
			},
			goToMyDecorate() {
				uni.navigateTo({
					url: "/pages/decorate/my-decorate/my-decorate",
				});
			},
			getHouses() {
				queryEstates({
					isNeedRelative: true,
				}).then((data) => {
					//    if (data.length < 1) {
					//      uni.navigateTo({
					//        url: "/pages/decorate/no-house/no-house",
					//      });
					//    } else {
					//      getApp().globalData.houses = data;
					// uni.navigateTo({
					//   url: "/pages/decorate/have-house-no-service/have-house-no-service",
					// });
					//    }
					getApp().globalData.houses = data;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.v1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
		border: 2rpx solid green;
	}

	.drag-button {
		background: #ffffff;
		border: 0.5px solid #eeeeee;
		box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
		width: 100rpx;
		height: 100rpx;
		font-size: 24rpx;
		color: #000000;
		position: absolute;
		right: 0rpx;
		bottom: 188rpx;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.design-picture {
		border: 2rpx solid green;

		image {
			width: 250rpx;
			height: 250rpx;
		}
	}
</style>
