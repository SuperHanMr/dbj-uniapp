<template>
  <view class="fill">
    <view class="top-tab">
      <view
        v-for="(item,index) in tabList"
        :key="index"
        class="item"
        :class="{selected:index==currentIndex}"
        @click="currentIndex=index"
      >
        <view class="tab-text">
          {{item}}
        </view>
        <view class="bottom-icon" />
      </view>
    </view>
    <swiper
      class="swiper"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
    >
      <!-- <swiper-item v-for="(item,tabindex) in tabList" :key="item">
				<scroll-view class="scroll-view" scroll-y="true" refresher-background="#FFF" refresher-enabled="true"
					:refresher-triggered="triggered" @refresherrefresh="onRefresh"  @scrolltolower="onLoadMore">
					<view v-for="(item,index) in currentList" :key="index" class="swiper-item">
						{{tabindex}}!!!!!!----------{{item}}
					</view>
				</scroll-view>
			</swiper-item> -->
      <swiper-item>
        <!-- 全部的订单 -->
        <view  v-for="(item,index) in list" :key="index" class="pending-payment">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view class="order-status">
              代付款
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0/根</text>
                  </view>
                  <text>共一件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>需付款(含搬运费)</text>
              <text style="color:#FF3347;margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
          <view class="line" />
          <view class="footer">
            <view class="set-interval">
              <text>这个是代替倒计时的占位</text>
            </view>
            <view class="button">
              <button
                type="default"
                size="mini"
                class="cancel-order"
              >取消订单</button>
              <button
                type="default"
                size="mini"
                class="go-to-pay"
               @click="toDetail(item)">去付款</button>
            </view>

          </view>
        </view>

      </swiper-item>
      <swiper-item>
        <!-- 待付款 -->
        <view class="pending-payment">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view class="order-status">
              代付款
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>需付款(含搬运费)</text>
              <text style="color:#FF3347;margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
          <view class="line" />
          <view class="footer">
            <view class="set-interval">
              <text>这个是代替倒计时的占位</text>
            </view>
            <view class="button">
              <button
                type="default"
                size="mini"
                class="cancel-order"
              >取消订单</button>
              <button
                type="default"
                size="mini"
                class="go-to-pay"
              >去付款</button>
            </view>

          </view>
        </view>

        <view class="pending-payment">
          <view class="header">
            <view class="store-name">
              <text>多店铺同时下单的标题样式真复杂</text>
            </view>
            <view class="order-status">
              代付款
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <view class="product-img">
                <scroll-view
                  scroll-x
                  style="width: 100%; white-space: nowrap;"
                >
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                  <image
                    src="../../login/imgs/2021823-152722.png"
                    mode=""
                  ></image>
                </scroll-view>
              </view>
              <view class="total-price">
                <view class="product-price">
                  <text style="font-size:22rpx;">￥</text>
                  <text>111111111128.</text>
                  <text style="font-size:22rpx;">00</text>
                </view>
                <view>共1件</view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>需付款(含搬运费)</text>
              <text style="color:#FF3347;margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
          <view class="line" />
          <view class="footer">
            <view class="set-interval">
              <text>这个是代替倒计时的占位</text>
            </view>
            <view class="button">
              <button
                type="default"
                size="mini"
                class="cancel-order"
              >取消订单</button>
              <button
                type="default"
                size="mini"
                class="go-to-pay"
              >去付款</button>
            </view>

          </view>
        </view>

      </swiper-item>

      <swiper-item>
        <!-- 进行中 -->
        <view class="ongoing-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view class="order-status">
              代付款
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共一件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>需付款(含搬运费)</text>
              <text style="color:#FF3347;margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
          <view class="line" />
          <view class="confirm-receipt">
            <button
              type="default"
              size="mini"
              class="confirm"
            >确认收货</button>
          </view>
        </view>
        <view class="ongoing-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view class="order-status">
              代付款
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共一件</text>
                </view>
              </view>
            </view>
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共一件</text>
                </view>
              </view>
            </view>

          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>需付款(含搬运费)</text>
              <text style="color:#FF3347;margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
          <view class="line" />
          <view class="confirm-receipt">
            <button
              type="default"
              size="mini"
              class="confirm"
            >确认收货</button>
          </view>
        </view>
      </swiper-item>

      <swiper-item>
        <!-- 已完成 -->
        <view class="completed-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view
              class="order-status"
              style="color: #808080;"
            >
              已完成
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>实付</text>
              <text style="margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
        </view>
        <view class="completed-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view
              class="order-status"
              style="color: #808080;"
            >
              已完成
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0m/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>实付</text>
              <text style="margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>99.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
        </view>

      </swiper-item>
      <swiper-item>
        <!-- 已关闭 -->
        <view class="closed-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view
              class="order-status"
              style="color:#808080"
            >
              交易关闭
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>

          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>实付</text>
              <text style="margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>88888.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
        </view>

        <view class="closed-order">
          <view class="header">
            <view class="store-name">
              <text>不知道叫什么名字的店铺</text>
              <image
                src="../../../static/order/ic_more@2x.png"
                mode=""
              ></image>
            </view>
            <view
              class="order-status"
              style="color:#808080"
            >
              交易关闭
            </view>
          </view>
          <view class="body">
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>320.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
            <view class="product-info">
              <image
                src="../shopping-cart/img/blank_ic.png"
                mode=""
              ></image>
              <view class="basic-info">
                <view class="top">
                  <view class="icon">
                    物品
                  </view>
                  <view class="name-and-price">
                    <view class="product-name">白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈白色绿色简约尤其哈哈</view>
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text>99990.</text>
                      <text style="font-size:22rpx;">00</text>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view>
                    <text style="margin-right: 24rpx;margin-left: 4rpx;">白色</text>
                    <text>2.0/根</text>
                  </view>
                  <text>共1件</text>
                </view>
              </view>
            </view>
          </view>
          <view class="price">
            <view class="total-pay">
              <text>总价</text>
              <text style="font-size:18rpx;">￥</text>
              <text>320.</text>
              <text style="font-size:18rpx;">00</text>
              <text style="margin-left: 18rpx;">优惠</text>
              <text style="font-size:18rpx;">￥</text>
              <text>99.</text>
              <text style="font-size:18rpx;">00</text>
            </view>
            <view class="need-pay">
              <text>实付</text>
              <text style="margin-left: 8rpx;">
                <text style="font-size:18rpx;">￥</text>
                <text>88888.</text>
                <text style="font-size:18rpx;">00</text>
              </text>
            </view>
          </view>
        </view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
import { orderList } from "../../../api/order.js";
export default {
  data() {
    return {
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        11,
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      list1: [
        "sad",
        "ddw",
        "sdfsda",
        "sdfas",
        "gfds",
        "zxcv",
        "bgf",
        "uytre",
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      list2: [
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      tabList: ["全部", "待发货", "进行中", "已完成", "已关闭"],
      triggered: false, //控制刷新显示字段
      currentIndex: 0,
    };
  },
  computed: {
    currentList() {
      if (this.currentIndex == 0) {
        return this.list;
      } else if (this.currentIndex == 1) {
        return this.list1;
      } else if (this.currentIndex == 2) {
        return this.list2;
      } else {
        return this.list1;
      }
    },
  },
  onLoad() {
    orderList().then((e) => {
      console.log(e);
			this.list=e
    });
  },

  methods: {
		toDetail(item){
			console.log(item);
			uni.navigateTo({
				url:'order-in-progress/order-in-progress?orderNo='+item.id
			})
		},
    swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
    },
    onLoadMore() {
      console.log("onLoadMore!!!!!!!!!!!!!!");
    },
    onRefresh(e) {
      console.log("刷新!!!!!");
      this.triggered = true;
      setTimeout(() => {
        console.log("????!!!!");
        this.triggered = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.fill {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 4rpx;
  background-color: #fff;
}

.item {
  width: 100%;
  height: 96rpx;

  .tab-text {
    width: 150rpx;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
  }
}

.top-tab {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 96rpx;
  font-size: 30rpx;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    flex-direction: column;
    color: #999;
    position: relative;
  }

  .selected {
    color: black;
    font-weight: 1000;

    .bottom-icon {
      position: absolute;
      width: 32rpx;
      height: 4rpx;
      background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
      border-radius: 200rpx 200rpx 0px 0px;
      bottom: 10rpx;
      left: 60rpx;
    }
  }
}

.header {
  height: 96rpx;
  margin-top: 16rpx;
  padding: 28rpx 32rpx;
  box-sizing: border-box;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .store-name {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    text {
      font-weight: 1000;
      max-width: 476rpx;
      font-size: 28rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    image {
      width: 34rpx;
      height: 34rpx;
      object-fit: cover;
    }
  }

  .order-status {
    color: #fc8b19;
    font-size: 24rpx;
    // font-weight: 800;
    line-height: 100%;
  }
}

.body {
  background-color: #ffffff;
  padding: 0 32rpx 32rpx;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;

  .product-info {
    margin-top: 32rpx;
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
    align-items: center;

    image {
      width: 136rpx;
      height: 136rpx;
      background-color: pink;
      margin-right: 16rpx;
    }

    .basic-info {
      flex: 1;

      .top {
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        align-items: center;
        max-height: 64rpx;
        margin-bottom: 16rpx;

        .icon {
          width: 60rpx;
          height: 30rpx;
          margin-right: 8rpx;
          line-height: 30rpx;
          border-radius: 4rpx;
          border: 2rpx solid #35c4c4;
          color: #35c4c4;
          font-size: 20rpx;
          text-align: center;
        }

        .name-and-price {
          display: flex;
          flex: 1;
          flex-flow: row nowrap;

          .product-name {
            max-height: 64rpx;
            line-height: 32rpx;
            font-size: 26rpx;
            margin-right: 24rpx;
            color: #333;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .product-price {
            height: 32rpx;
            font-size: 32rpx;
          }
        }
      }

      .bottom {
        display: flex;
        height: 26rpx;
        color: #999;
        font-size: 22rpx;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
    }

    .product-img {
      flex: 1;
      overflow: hidden;

      scroll-view {
        image {
          width: 136rpx;
          height: 136rpx;
          border-radius: 8rpx;
          border: 2rpx solid #f4f4f4;
          box-sizing: border-box;
          background-color: pink;
          margin-right: 24rpx;
        }

        image:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }

    .total-price {
      display: flex;

      flex-flow: column nowrap;
      align-items: flex-end;
      color: #999;
      font-size: 22rpx;
      margin-left: 24rpx;

      .product-price {
        height: 32rpx;
        font-size: 32rpx;
        margin-bottom: 8rpx;
      }
    }
  }
}

.price {
  height: 64rpx;
  padding: 0 32rpx;
  font-size: 22rpx;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: #ffffff;

  .total-pay {
    color: #999;
  }

  .need-pay {
    color: #333;
  }
}

.line {
  width: 100%;
  height: 1rpx;
  background-color: #f2f2f2;
}

.footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  background-color: #ffffff;

  .set-interval {
  }

  .button {
    .cancel-order {
      width: 140rpx;
      height: 56rpx;
      font-size: 24rpx;
      line-height: 56rpx;
      text-align: center;
      margin-left: 24rpx;
      border-radius: 32rpx;
      padding: 0;
    }

    .go-to-pay {
      width: 140rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      font-size: 24rpx;
      padding: 0;
      margin-left: 24rpx;
      background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
      border-radius: 32rpx;
      color: #ffffff;
    }
  }
}

.confirm-receipt {
  text-align: right;
  padding: 32rpx;
  background-color: #ffffff;

  .confirm {
    width: 140rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    font-size: 24rpx;
    padding: 0;
    margin-left: 24rpx;
    background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
    border-radius: 32rpx;
    color: #ffffff;
  }
}

.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: red;

  .swiper-item {
    .pending-payment,
    .ongoing-order,
    .completed-order,
    .closed-order {
      width: 100%;
      margin-top: 16rpx;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}

// .scroll-view {
// 	flex: 1;
// 	height: 100%;
// 	background-color: green;
// }

button::after {
  border: none;
}
</style>
