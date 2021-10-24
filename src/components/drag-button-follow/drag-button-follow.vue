<template>
  <view <!-- #ifndef MP-WEIXIN -->
    :style="{
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    MsTransform: `translate(${offsetX}px, ${offsetY}px)`,
    MozTransform: `translate(${offsetX}px, ${offsetY}px)`,
    WebkitTransform: `translate(${offsetX}px, ${offsetY}px)`,
    OTransform: `translate(${offsetX}px, ${offsetY}px)`,
    transition: move ? 'none' : 'transform 0.2s ease-in-out',
    MsTransition: move ? 'none' : 'transform 0.2s ease-in-out',
    MozTransition: move ? 'none' : 'transform 0.2s ease-in-out',
    WebkitTransition: move ? 'none' : 'transform 0.2s ease-in-out',
    OTransition: move ? 'none' : 'transform 0.2s ease-in-out'
    }"
    <!-- #endif -->
    @click.stop="click"
    @touchmove.stop.prevent="touchmove"
    @touchstart="touchstart"
    @touchend="touchend"
    >
    <view class="white-bg" v-if="!moveHidden&&endLeft">
          
        </view>
    <view class="white-circle" :class="{'left-style':endLeft}">
      <image src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/decorate/decorate_msg.png" class="image-icon"></image>
      <text class="tip">{{num}}</text>
    </view>
    <view class="white-bg" v-if="!moveHidden&&endRight">
          
        </view>

  </view>
</template>

<script>
  export default {
    name: 'DragButtonFollow',
    props: {
      className: {
        type: String,
        default: ''
      },
      // #ifdef MP-WEIXIN
      style: {
        type: String,
        default: ''
      },
      // #endif
      drag: {
        type: Boolean,
        default: true
      },
      follow: {
        type: String | Boolean,
        default: 'all'
      },
      followNum: {
        type: Number,
        default: 0
      },
      num:0
    },
    safeArea: {},
    data() {
      return {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        move: false,
        moveHidden:false,
        endLeft:false,
        endRight:true,
        leftStyle:{
          left:'-18px',
          right:'0',
          'box-shadow':'26rpx 0rpx 32rpx 0rpx rgba(0, 0, 0, 0.08)'
        },
        foll: {

        }
      }
    },
    mounted() {
      const systemInfo = uni.getSystemInfoSync() || {}

      this.$options.safeArea = {
        left: 0,
        top: 0,
        right: systemInfo.windowWidth,
        bottom: getApp().globalData.screenHeight
      }
      const query = this.$parent.createSelectorQuery()
      query.select(`.${this.className}`).boundingClientRect(data => {
        if (data) {
          this.width = data.width
          this.height = data.height
          this.left = data.left
          this.top = data.top
        }
      }).exec()
      if (this.follow) {
        const type = this.follow.split(",")
        let isLeft, isRight, isTop, isBottom, isAll, num
        type.forEach(_ => {
          if (_ === 'all') isAll = true
          if (_ === 'left') isLeft = true
          if (_ === 'right') isRight = true
          if (_ === 'top') isTop = true
          if (_ === 'bottom') isBottom = true
        })
        if (isAll) isLeft = isRight = isTop = isBottom = true
        num = Math.round(this.width * this.followNum / 100)
        this.foll = {
          isLeft,
          isRight,
          isTop,
          isBottom,
          num
        }
      }
    },
    methods: {
      click() {
        this.$emit('btnClick');
      },
      touchstart(e) {
        if (!this.drag) return
        this.move = true
        this.moveHidden = true
      },
      touchmove(e) {
        if (!this.drag) return
        if (!this.move) return
        const {
          left,
          right,
          top,
          bottom
        } = this.$options.safeArea
        
        
        const dot = e.changedTouches[0]
        console.log('移动时节点位置以及屏幕高度',dot.clientY,uni.getSystemInfoSync().windowHeight)
        // console.log(uni.getSystemInfoSync().windowBottom)
        if (dot.clientX < left + this.width / 2) dot.clientX = left + this.width / 2
        if (dot.clientX > right - this.width / 2) dot.clientX = right - this.width / 2
        if (dot.clientY < top + this.height / 2) dot.clientY = top + this.height / 2
        if (dot.clientY > bottom - this.height / 2) dot.clientY = bottom - this.height / 2
        this.offsetX = dot.clientX - this.left - this.width / 2
        this.offsetY = dot.clientY - this.top - this.height / 2

        // #ifdef MP-WEIXIN
        this.$emit("update:style", `
					transform: translate(${this.offsetX}px, ${this.offsetY}px);
					WebkitTransform: translate(${this.offsetX}px, ${this.offsetY}px);
					transition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
					WebkitTransition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
				`)
        // #endif
      },
      touchend(e) {
        if (!this.drag) return
        this.move = false
        if (!this.follow) return
        const dot = e.changedTouches[0]
        const {
          left,
          right,
          top,
          bottom
        } = this.$options.safeArea
        this.moveHidden = false
        if (this.foll.isLeft && this.foll.isRight) {
          console.log(dot.clientY,uni.getSystemInfoSync().windowHeight,dot,'拖拽按钮测试')
          if(dot.clientY<88){
             dot.clientY = 88+20
          }else if(dot.clientY>getApp().globalData.screenHeight){
            console.log(uni.getSystemInfoSync().windowHeight,'超出屏幕时屏幕高度',getApp().globalData.screenHeight)
             dot.clientY = getApp().globalData.screenHeight-20
          }else if(dot.clientY>780){
            console.log(uni.getSystemInfoSync().windowHeight,'按钮超出780时屏幕高度',getApp().globalData.screenHeight)
            dot.clientY = 500
          }
          this.offsetY = dot.clientY - this.top - this.height / 2
          if (dot.clientX <= (left + right) / 2) {
            this.endLeft = true
            this.endRight = false
            this.offsetX = this.foll.num - this.left
          }
          if (dot.clientX > (left + right) / 2){
            this.endRight = true
            this.endLeft = false
            this.offsetX = right - this.width - this.foll.num - this.left
          } 
        } else if (this.foll.isLeft) {
          console.log(222)
          
          this.offsetX = this.foll.num - this.left
        } else if (this.foll.isRight) {
          console.log(333)
          
          this.offsetX = right - this.width - this.foll.num - this.left
        }
        if (this.foll.isTop && this.foll.isBottom) {
          if (dot.clientY <= (top + bottom) / 2) this.offsetY = this.foll.num - this.top
          if (dot.clientY > (top + bottom) / 2) this.offsetY = bottom - this.height - this.foll.num - this.top
        } else if (this.foll.isTop) {
          console.log(444)
          this.offsetY = this.foll.num - this.top
        } else if (this.foll.isBottom) {
          console.log(555)
          this.offsetY = bottom - this.height - this.foll.num - this.top
        }
        // #ifdef MP-WEIXIN
        this.$emit("update:style", `
					transform: translate(${this.offsetX}px, ${this.offsetY}px);
					WebkitTransform: translate(${this.offsetX}px, ${this.offsetY}px);
					transition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
					WebkitTransition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
				`)
        // #endif
      },
    }
  }
</script>
<style lang="scss" scoped>
  /* #ifdef MP-WEIXIN */
  view {
    // height: 100%;
    // width: 100%;
    // display: inherit;
    // justify-content: inherit;
    // align-items: inherit;
  }

  /* #endif */
  
  .left-style{
    left: -38rpx;
    right: 0;
    box-shadow: 14rpx 0rpx 32rpx 0rpx rgba(0, 0, 0, 0.08) !important;
  }
  .white-circle {
    width: 80rpx;
    height: 80rpx;
    opacity: 1;
    background: #fff;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    right: -38rpx;
    vertical-align: top;
    box-shadow: -14rpx 0rpx 32rpx 0rpx rgba(0, 0, 0, 0.08);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // left: 28px;
    .image-icon {
      width: 60rpx;
      height: 60rpx;
      position: absolute;
      // background-color: #fff;
      left: 50%;
      margin-left: -30rpx;
      top: 50%;
      margin-top: -30rpx;
    }
    .tip {
      position: absolute;
      width: 24rpx;
      height: 24rpx;
      opacity: 1;
      background: #ff3347;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 24rpx;
      font-size: 20rpx;
      top: 8rpx;
      right: 0;
      border: 1px solid #ffffff;

    }
  }

  .white-bg{
    display: inline-block;
    width: 58rpx;
    height: 80rpx;
    background-color: #fff;
    box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
    // .gray-bg{
    //   width: 28px;
    //   height: 40px;
    //   background-color: #999999;
    // }
  }
</style>
