var window=window||{};window.webpackJsonp=require("../../bundle.js"),module.exports=(window.webpackJsonp=window.webpackJsonp||[]).push([["components/index0123273a/index"],{"./src/components/loginCall/index.js?packageName=main&resourcePath=%2FUsers%2Ffwind%2Fgome%2Fgitlab%2Fgome-mini%2Fpackages%2Flogin%2Fsrc%2Fcomponents%2FloginCall%2Findex.mpx":function(t,e,s){"use strict";var i=s("./src/utils/apis.js"),a=s("./src/utils/index.js"),n=s("./src/constants.js");Component({btnDisabled:!1,properties:{loginData:{type:null,value:{}}},data:{imgUrl:"",imgWidth:0,imgHeight:0,height:"",cancelName:"短信验证码登录",loginList:{},canIUseGetUserProfile:!1,appId:"",code:"",themeStyle:n.a},attached:function(){const{appId:t,ctx:e,imgHeight:s,imgUrl:i,imgWidth:n,sharerUnionId:o,sharerUserId:r,platForm:c,themeConfig:d}=this.data.loginData,{windowHeight:g}=a.e;let l=!1;if(wx.getUserProfile&&(l=!0),this.btnDisabled=!1,this.setData({height:g+"px",appId:t,ctx:e,imgUrl:i,imgWidth:n,imgHeight:s,sharerUnionId:o,sharerUserId:r,canIUseGetUserProfile:l,platForm:c}),d){const{backgroundColor:t,fontColor:e}=d;let s="";t&&(s+=`--background-color:${t};`),e&&(s+=`--font-color:${e};`),this.setData({themeStyle:s})}this.wxLogin(1,(()=>{this.setBtnStatus(!0)})),Object(a.c)("windowHeight",g+"px")},pageLifetimes:{show(){this.wxLogin(1,(()=>{this.setBtnStatus(!0)}))}},methods:{setBtnStatus(t=!0){(this.btnDisabled||!1)!==!t&&(this.btnDisabled=!t)},wxLogin(t=1,e){const s=this,{platForm:i}=this.data;wx["swan"===i?"getLoginCode":"login"]({success(t){s.setData({code:t.code}),e&&e()},fail(t){e&&e()}})},onGetAuthorize(t){let e=this;this.btnDisabled||(this.setBtnStatus(!1),my.getAuthCode({scopes:"auth_base",success:t=>{t.authCode&&(e.data.code=t.authCode,my.getOpenUserInfo({fail:t=>{},success:t=>{const s=JSON.parse(t.response).response,{nickName:i,avatar:a}=s;e.data.loginList={userInfo:{nickName:i,avatarUrl:a}},e.weAppLogin()}}))}}))},getTtUserInfo(t){const e=this;this.btnDisabled||(this.setBtnStatus(!1),tt.authorize({scope:"scope.userInfo",success(){tt.getUserInfo({withCredentials:!0,success(t){const{iv:s,rawData:i,userInfo:a,encryptedData:n,signature:o}=t;e.data.loginList={iv:s,rawData:i,userInfo:a,signature:o,encryptedData:n},e.weAppLogin()},fail(t){}})},fail(){Object(a.a)(e,"scope.userInfo","请先设置允许“真快乐商城”使用您的用户信息",(t=>{e.wxLogin(1)}),(()=>{e.wxLogin(1)}))},complete(){e.setBtnStatus(!0)}}))},getUserProfile(t){let e=this;this.btnDisabled||(this.setBtnStatus(!1),wx.getUserProfile({desc:"用于完善会员资料",success:t=>{e.setBtnStatus(!1);const{iv:s,rawData:i,userInfo:a,signature:n,encryptedData:o}=t,{nickName:r,avatarUrl:c}=a;e.data.loginList={iv:s,rawData:i,userInfo:a,signature:n,encryptedData:o},e.weAppLogin(),e.data.loginList={userInfo:{wxNickName:r,wxAvatarUrl:c}}},complete(){e.setBtnStatus(!0)}}))},getUserInfo(t){if(this.btnDisabled)return;this.setBtnStatus(!1);const{iv:e,rawData:s,userInfo:i,signature:a,encryptedData:n,errMsg:o}=t.detail;this.data.loginList={iv:e,rawData:s,userInfo:i,signature:a,encryptedData:n},o.includes("getUserInfo:ok")?this.weAppLogin():wx.showToast({title:"请授权允许获取昵称和头像后重试！",icon:"none",duration:2e3})},weAppLogin(){const t=this,{appId:e,loginList:s,code:a,sharerUserId:n,sharerUnionId:o,ctx:r}=this.data,{rawData:c,signature:d,encryptedData:g,iv:l,userInfo:h,avatar:u}=s,p={appId:e,rawData:c,signature:d,encryptedData:g,iv:l,code:a,puserId:n,puniqueId:o||"",nickName:h.nickName||s.nickName,avatar:h.avatarUrl||u};wx.showLoading({title:"加载中..."}),i.a.appletLogin(p,r,{success(e){const{data:i,statusCode:a}=e,{code:n,message:o}=i;t.data.code="",wx.hideLoading(),t.triggerEvent("success",{loginList:s,statusCode:a,data:i}),200!=n&&105!=n&&106!=n&&6001!=n&&(wx.showToast({title:o,icon:"none"}),t.wxLogin(1))},fail(){wx.hideLoading(),wx.showToast({title:"登录请求失败, 请检查您的网络后重试",icon:"none",mask:!0})},complete(){t.setBtnStatus(!0)}})},toLoginQuick(){const t=getCurrentPages(),e=t[t.length-1].options;this.triggerEvent("navigator",{loginType:"loginQuick",referrer:e?e.referrer:void 0})}}})},"./src/components/loginCall/index.mpx?packageName=main":function(t,e,s){"use strict";s.r(e),function(t){t.currentModuleId="m571dff7b",t.currentCtor=Component,t.currentCtorType="component",t.currentSrcMode="wx",t.currentInject={moduleId:"m571dff7b",render:function(){this._c("height",this.height),this._c("themeStyle",this.themeStyle),this._c("mpxShow",this.mpxShow)||this._c("mpxShow",this.mpxShow),this._c("imgUrl",this.imgUrl),this._c("imgWidth",this.imgWidth),this._c("imgHeight",this.imgHeight),this._c("canIUseGetUserProfile",this.canIUseGetUserProfile),this._c("backgroundColor",this.backgroundColor)&&this._c("backgroundColor",this.backgroundColor),this._r()}};s("./src/components/loginCall/index.js?packageName=main&resourcePath=%2FUsers%2Ffwind%2Fgome%2Fgitlab%2Fgome-mini%2Fpackages%2Flogin%2Fsrc%2Fcomponents%2FloginCall%2Findex.mpx");t.currentModuleId}.call(this,s("../../node_modules/webpack/buildin/global.js"))}},[["./src/components/loginCall/index.mpx?packageName=main","bundle"]]]);