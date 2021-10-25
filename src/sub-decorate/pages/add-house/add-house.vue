<template>
	<view class="add-house">
		<form>
      <view class="main">
        
      
			<view class="content">
				<view class="form-item">
					<label class="item-label">业主姓名</label>
					<input class="uni-input" placeholder-class="placeholder" name="input" v-model="addData.contactName" @focus='getFocus("contactName")' @blur='changeFocus("contactName")'
						placeholder="请输入业主姓名" />
            <view class="icon-clear" v-if="addData.contactName&&focus.contactName" @touchstart="clear('contactName')">
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
          
				</view>
				<view class="form-item">
					<label class="item-label">手机号</label>
					<input class="uni-input" placeholder-class="placeholder" type="number" name="input"
						v-model="addData.contactPhone" placeholder="请输入手机号" @focus='getFocus("contactPhone")' @blur='changeFocus("contactPhone")'/>
            <view class="icon-clear" v-if="addData.contactPhone&&focus.contactPhone" @touchstart="clear('contactPhone')">
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
				</view>
				<view class="form-item">
					<label class="item-label">所在地区</label>
					<input class="uni-input" placeholder-class="placeholder" :class="{disabled:roomId&&isEdit}" :disabled="roomId&&isEdit" @click="chooseMap" disabled name="input"
						v-model="addData.area||addData.locationName" placeholder="请选择您房屋所在地区" />
					<image src="../../../static/images/ic_more_black.svg" class="shopIcon"></image>
				</view>
				<view class="form-item">
					<label class="item-label">小区</label>
					<input class="uni-input" placeholder-class="placeholder" :class="{disabled:!hasPoint||(roomId&&isEdit)}" :disabled="!hasPoint||(roomId&&isEdit)" name="input"
						v-model="addData.housingEstate" placeholder="房屋所在小区" @focus='getFocus("housingEstate")' @blur='changeFocus("housingEstate")'/>
            <view class="icon-clear" v-if="addData.housingEstate&&!isEdit&&focus.housingEstate" @touchstart="clear('housingEstate')">
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
				</view>
			</view>
			<view class="content">
				<view class="form-item">
					<label class="item-label">楼栋房号</label>
					<input class="uni-input" placeholder-class="placeholder" name="input" :disabled="roomId&&isEdit" v-model="addData.address" @focus='getFocus("address")' @blur='changeFocus("address")'
            :class="{disabled:roomId&&isEdit}" placeholder="例:16号楼5层301" />
            <view class="icon-clear" v-if="addData.address&&!isEdit&&focus.address" @touchstart="clear('address')">
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
				</view>
				<view class="form-item special">
					<label class="item-label">楼型</label>
					<choose-btn :btnList='floorList' :currentBtn='addData.houseStructure' :disabled="roomId&&isEdit" @chooseBtn='chooseFloor'>
					</choose-btn>
				</view>
				<view class="form-item">
					<label class="item-label">户型</label>
          
            <input type="text" :class="{disabled:roomId&&isEdit}" placeholder-class="placeholder" class="uni-input" disabled v-model="houseType"
            	placeholder="请选择房屋户型"  @click="openList"/>
            <image src="../../../static/images/ic_more_black.svg" class="shopIcon"></image>
          
					
				</view>
				<view class="form-item">
					<label class="item-label">房屋面积</label>
					<!-- <text class="placeholder" v-if="!addData.insideArea">请输入房屋面积</text> -->
					<view v-if="addData.insideArea" :class="{disabled:roomId&&isEdit}" class="uni-input area-text"><text
							style="visibility: hidden">{{addData.insideArea}}</text>m²</view>
              <view class="icon-clear" v-if="addData.insideArea&&!isEdit&&focus.insideArea" @touchstart="clear('insideArea')">
                <uni-icons color="#c0c4cc" size="15" type="clear" />
              </view>
					<input v-if="!visible" :maxlength="7" :class="{disabled:roomId&&isEdit}" class="uni-input house-area" :disabled="roomId&&isEdit" placeholder-class="placeholder" @focus='getFocus("insideArea")' @blur='changeFocus("insideArea")'
						placeholder="请输入房屋面积" type="digit" name="input" v-model="addData.insideArea" />
            
				</view>
				<view class="form-item special ele">
					<label class="item-label">有无电梯</label>
					<choose-btn :btnList='elevatorList' :currentBtn='addData.hasLift' :disabled="roomId&&isEdit" @chooseBtn="chooseEle">
					</choose-btn>
          <view class="floor-content">
            
          
					<input v-if="!addData.hasLift" :class="{disabled:roomId&&isEdit}" :disabled="roomId&&isEdit" placeholder-class="placeholder" class="ele-input" name="input"
						v-model="addData.floors" placeholder="请输入房屋所在楼层" />
            <view class="icon-clear-spec"  v-if="!addData.hasLift&&addData.floors" @touchstart="clear('floors')">
              <uni-icons color="#c0c4cc" size="15" type="clear" />
            </view>
            </view>
				</view>
			</view>
			<view class="content bottom-switch">
				<view class="text-left">
					<text class="text">设置为默认地址</text>
					<text class="tips">提醒：每次下单会默认使用该地址</text>
				</view>
				<switch color="#24BDBD" :checked='addData.defaultEstate' @change="switchChange"
					style="transform:scale(0.9)"></switch>
			</view>
      </view>
			<view class="submit-bottom">
				<text class="submit" @click="save">保存</text>
			</view>
		</form>
		<uni-popup ref="popup" @maskClick='pickerCancel' :mask-click="false" type="bottom">
			<view class="picker-btn">
				<text class="btn cancel-btn" @click="pickerCancel">取消</text>
				<text class="btn sure-btn" @click="pickerSure">确定</text>
			</view>
			<picker-view v-if="visible" :indicator-class='indicatorClass' :value="roomData" @change="bindChange"
				class="picker-view">
				<picker-view-column class="column">
					<view class="item" v-for="item of roomList" :key="item">{{item}}室</view>
				</picker-view-column>
				<picker-view-column class="column">
					<view class="item" v-for="item of roomList" :key="item">{{item}}厅</view>
				</picker-view-column>
				<picker-view-column class="column">
					<view class="item" v-for="item of roomList" :key="item">{{item}}厨</view>
				</picker-view-column>
				<picker-view-column class="column">
					<view class="item" v-for="item of roomList" :key="item">{{item}}卫</view>
				</picker-view-column>
			</picker-view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getAdcodeFromAreaId
	} from "../../../utils/cityData.js";
	import {
		addHouse,
		getHouse,
		editHouse,
    getHouseStep
	} from "../../../api/decorate.js";
	export default {
		data() {
			return {
				visible: false,
				addData: {
					contactName: "",
					houseStructure: 1,
					contactPhone: "",
					housingEstate: "",
					area: "",
					address: "",
					roomNum: 0,
					hallNum: 0,
					kitchenNum: 0,
					bathroomNum: 0,
					insideArea: "",
					floors: null,
					hasLift: true,
					defaultEstate: false,
				},
        focus:{},
				roomData: [0, 0, 0, 0],
				roomList: [0, 1, 2, 3, 4, 5],
				houseType: "",
				currentFloor: 0,
				floorList: [{
						label: "平层",
						id: 1,
					},
					{
						label: "错层",
						id: 2,
					},
					{
						label: "跃层",
						id: 3,
					},
					{
						label: "复式",
						id: 4,
					},
					{
						label: "别墅",
						id: 5,
					},
				],
				elevatorList: [{
						label: "有",
						id: true,
					},
					{
						label: "无",
						id: false,
					},
				],
				room: [],
				//是否已经获取点位
				hasPoint: false,
				indicatorClass: "choose-item",
				roomId: 0,
				delta: 1,
        isEdit:false,
        
			};
		},
		onLoad(e) {
			if (e && e.id) {
				this.roomId = e.id;
				uni.setNavigationBarTitle({
					title: "编辑房屋",
				});
				this.getHouse();
        this.getHouseStep()
        this.hasPoint = true;
			}
			this.delta = e.delta;
		},
		// watch:{
		//   'addData.insideArea':function(){
        
		//   }
		// },
		methods: {
			getHouse() {
				getHouse(this.roomId).then((res) => {
					let {
						id,
						contactName,
						houseStructure,
						contactPhone,
						housingEstate,
						area,
						address,
						roomNum,
						hallNum,
						kitchenNum,
						bathroomNum,
						insideArea,
						floors,
						hasLift,
						defaultEstate,
					} = res;
					this.addData = {
						contactName,
						houseStructure,
						contactPhone,
						housingEstate,
						area,
						address,
						roomNum,
						hallNum,
						kitchenNum,
						bathroomNum,
						insideArea,
						floors,
						hasLift,
						defaultEstate,
						id,
					};
					if (this.addData.floors === 0) {
						this.addData.floors = null;
					}
					this.roomData = [
						this.addData.roomNum,
						this.addData.hallNum,
						this.addData.kitchenNum,
						this.addData.bathroomNum,
					];
					this.changeRoomText();
				});
			},
      getFocus(name){
        // this.focus[name] = true
        this.$set(this.focus,name,true)
      },
      changeFocus(name){
        this.$set(this.focus,name,false)
      },
			chooseMap() {
        if(this.isEdit){
          return
        }
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						if (res.address) {
							console.log(res)
							that.hasPoint = true;
							that.addData.housingEstate = res.name;
							that.addData.latitude = res.latitude;
							that.addData.longitude = res.longitude;
							uni.request({
								//将经纬度转换成adcode，然后用adcode去获取省市区id ak需要更换为公司的ak
								url: "https://api.map.baidu.com/reverse_geocoding/v3/?ak=lrRwp5WQK6fyjnyHGbyHBgFIXXczCIWN&output=json&coordtype=gcj02ll&location=" +
									res.latitude +
									"," +
									res.longitude,
								success: (res) => {
                  console.log(res)
                  let address = res.data.result.addressComponent
									let adcode = address.adcode;
                  
                  that.addData.area = address.province === address.city ? address.province + '-' + address.district : address.province + '-' + address.city + '-' + address.district;
									that.getAreaId(adcode);
								},
							});
						}
					},
				});
			},
			async getAreaId(adcode) {
				let {
					areaId,
					cityId,
					provinceId
				} = await getAdcodeFromAreaId(adcode);
				this.addData.areaId = areaId;
				this.addData.cityId = cityId;
				this.addData.provinceId = provinceId;
			},
			openList() {
        if(this.isEdit){
          return
        }
				this.$refs.popup.open();
				this.visible = true;
			},
			bindChange: function(e) {
				this.roomData = e.detail.value;
			},
			pickerCancel() {
				this.roomData = [...this.room];
				this.$refs.popup.close();
				this.visible = false;
			},
			pickerSure() {
        if(this.roomData[0]||this.roomData[1]||this.roomData[2]||this.roomData[3]){
          this.room = [...this.roomData];
          this.addData.roomNum = +this.roomData[0];
          this.addData.hallNum = +this.roomData[1];
          this.addData.kitchenNum = +this.roomData[2];
          this.addData.bathroomNum = +this.roomData[3];
          this.changeRoomText();
        }
				
				this.$refs.popup.close();
				this.visible = false;
			},
			changeRoomText() {
				this.houseType =
					this.addData.roomNum +
					"室" +
					this.addData.hallNum +
					"厅" +
					this.addData.kitchenNum +
					"厨" +
					this.addData.bathroomNum +
					"卫";
			},
			chooseFloor(id) {
				// console.log(id)
        if(this.isEdit){
          return
        }
				this.addData.houseStructure = id;
			},
			chooseEle(id) {
        if(this.isEdit){
          return
        }
				this.addData.hasLift = id;
			},
			switchChange(e) {
				this.addData.defaultEstate = e.detail.value;
				// console.log(this.addData.defaultEstate)
			},
			save() {
				if (this.check()) {
					if (!this.roomId) {
            // this.addData.area = this.addData.area
						addHouse(this.addData).then((res) => {
							if(this.addData.defaultEstate){
								uni.$emit('defaultHouseChange');
							}
							uni.showToast({
								title: "添加成功",
								duration: 2000,
								icon: "success",
							});
							uni.navigateBack({
								delta: this.delta,
							});
						});
					} else {
						editHouse(this.addData).then((res) => {
							if(this.addData.defaultEstate){
								uni.$emit('defaultHouseChange');
							}
							uni.navigateBack({
								delta: this.delta,
							});
						});
					}
				}
			},
      getHouseStep(){
        getHouseStep(this.roomId).then(res=>{
          this.isEdit = res
        })
      },
      clear(item){
        console.log(111)
         
        this.addData[item] = ''
      },
			check() {
				let data = {
					...this.addData
				};

				if (data.contactName.length < 2 || data.contactName.length > 15) {
					uni.showToast({
						title: "姓名在2到15个字之间",
						duration: 2000,
						icon: "none",
					});
					return false;
				}
				if (!/^1[3456789]\d{9}$/.test(data.contactPhone)) {
					uni.showToast({
						title: "请输入正确的手机号",
						duration: 2000,
						icon: "none",
					});
					return false;
				}
				if (!data.hasLift && (data.floor < -10 || data.floor > 15)) {
					uni.showToast({
						title: "电梯楼层在-10到15楼之间",
						duration: 2000,
						icon: "none",
					});
					return false;
				}
				if (data.housingEstate.length < 1 || data.housingEstate.length > 25) {
					uni.showToast({
						title: "小区名称在25个字之内",
						duration: 2000,
						icon: "none",
					});
					return false;
				}
        let rule = /^(\+)?\d+(\.\d+)?$/
        if(!rule.test(data.insideArea)){
          uni.showToast({
          	title: "房屋面积需输入1-10000以内的数字",
          	duration: 2000,
          	icon: "none",
          });
          return false;
        }
				if (data.insideArea < 1 || data.insideArea > 10000) {
					uni.showToast({
						title: "房屋面积需输入1-10000以内的数字",
						duration: 2000,
						icon: "none",
					});
					return false;
				}
        if(data.roomNum||data.hallNum||data.kitchenNum||data.bathroomNum){
          
        }else{
          uni.showToast({
          	title: "请选择户型",
          	duration: 2000,
          	icon: "none",
          });
          return false;
        }

				if (data.hasLift) {
					delete data.floors;
				}
				delete data.defaultEstate;
				delete data.hasLift;
        delete data.roomNum;
        delete data.hallNum;
        delete data.kitchenNum;
        delete data.bathroomNum;
				for (let item in data) {
					console.log(data[item], item);
					if (!data[item]) {
						console.log(item + "为空");
						uni.showToast({
							title: "请输入信息",
							duration: 2000,
							icon: "error",
						});
						return false;
					}
				}
				return true;
			},
		},
	};
</script>

<style lang="scss">
	.add-house {
		padding-top: 16rpx;
    .main{
      padding-bottom: 220rpx;
    }
		view .special {
			height: 180rpx;
			// line-height: 200rpx;
			padding-top: 30rpx;

			label {
				display: block !important;
				// margin-top: 40rpx;
				height: 68rpx;
				line-height: 68rpx;
			}

			label.item-label:before {
				// display: none;
			}
		}
    .disabled{
      color: #999999 !important;
      // button{
      //   color: #999999 !important;
      // }
    }
		view .ele {
			height: auto;

			.ele-input {
        display: inline-block;
				margin-bottom: 38rpx;
				border: 1px solid #ebebeb;
				// width: 80%;
				height: 84rpx;
				line-height: 84rpx;
				padding: 0 16rpx;
				font-size: 28rpx;
				color: #ccc;
        box-sizing: border-box;
        width: 100%;
        border-radius: 12rpx;
			}
		}

		.form-item {
			height: 116rpx;
			margin: 0 32rpx;
			border-bottom: 0.5px solid #f2f2f2;
			position: relative;
			line-height: 116rpx;
      .floor-content{
        position: relative;
        display: flex;
        align-items: center;
      }
      .icon-clear{
        display: inline-block;
        width: 50rpx;
        height: 50rpx;
        text-align: center;
        line-height: 50rpx;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -25rpx;
        z-index: 10;
      }
      .icon-clear-spec{
        display: inline-block;
        height: 84rpx;
        line-height: 84rpx;
        width: 50rpx;
        margin-top: 0rpx;
        position: absolute;
        text-align: center;
        right: 112rpx;
        z-index: 10;
        top: 0;
      }
			.item-label {
				color: #666;
				font-size: 28rpx;
				font-weight: 400;
				display: inline-block;
				width: 130rpx;
				margin: 0 46rpx 0 0;
				text-align: left;
				vertical-align: top;
        
			}

			label.item-label:before {
				content: "*";
				font-size: 26rpx;
				width: 14rpx;
				color: red;
        margin-right: 4rpx;
			}
		}

		.content {
			background-color: #fff;
			margin-bottom: 16rpx;
		}

		.picker-view {
			background-color: #fff;
		}

		.uni-input {
			display: inline-block;
			height: 116rpx;
			line-height: 116rpx;
			vertical-align: top;
			color: #111;
			font-size: 28rpx;
			width: 70%;
		}

		.placeholder {
			color: #bbbbbb;
			font-size: 28rpx;
		}

		.picker-view {
			width: 750rpx;
			height: 600rpx;
			margin-top: 20rpx;
		}

		.column {
			position: flex;
			align-items: center;
		}

		.item {
			// height: 50px;
			line-height: 34px;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		.choose-item {
			position: relative;
			width: 110rpx;
			margin: 0 40rpx;
			border: none !important;
			border-radius: 20rpx;
			background-color: #eee;
			z-index: -1111;
		}

		.choose-item::after {
			border: none;
		}

		.choose-item::before {
			border: none;
		}

		.picker-btn {
			position: relative;
			background-color: #f7f7f7;
			top: 20rpx;
			width: 100%;
			// background-color: #fff;
			// opacity: 1;
			height: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 20rpx 20rpx 0 0;
			height: 100rpx;
			line-height: 100rpx;

			.btn {
				margin: 0 50rpx;
				color: #999;
			}

			.sure-btn {
				color: #24bdbd;
			}
		}

		.bottom-switch {
			height: 152rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
      // margin-bottom: 220rpx;
			.text {
				font-size: 26rpx;
				color: #111;
			}

			.tips {
				display: block;
				font-size: 22rpx;
				color: #999;
			}
		}

		.submit-bottom {
      position: fixed;
      bottom: 0;
			margin-top: 78rpx;
			width: 100%;
			height: 136rpx;
			display: flex;
			justify-content: center;
			// text-align: center;
			align-items: center;
			background-color: #fff;

			.submit {
				display: block;
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				// opacity: 1;
				background: linear-gradient(135deg, #53d5cc, #4fc9c9);
				border-radius: 12rpx;
			}
		}

		.area-text {
			// width: 200rpx;

			position: absolute;
			left: 172rpx;
			z-index: 5;

			text {
				display: inline-block;
				max-width: 300rpx;
			}
		}

		.house-area {
			// visibility: hidden;
			// opacity: 0;
			position: absolute;
			left: 172rpx;
			z-index: 5;
		}

		.shopIcon {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 0;
			top: 42rpx;
		}
	}
</style>
