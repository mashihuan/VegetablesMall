(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/subPages/customer-service/customer-service"],{"1b48":function(e,t,n){},"2fa6":function(e,t,n){"use strict";n.r(t);var i=n("5c2b"),r=n("73cf");for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);n("ea5e");var c=n("2877"),u=Object(c["a"])(r["default"],i["a"],i["b"],!1,null,"7f8c980e",null);t["default"]=u.exports},"5afa":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("a34a")),r=n("78dd");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,i,r,a,c){try{var u=e[a](c),s=u.value}catch(o){return void n(o)}u.done?t(s):Promise.resolve(s).then(i,r)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(i,r){var a=e.apply(t,n);function u(e){c(a,i,r,u,s,"next",e)}function s(e){c(a,i,r,u,s,"throw",e)}u(void 0)})}}var s={data:function(){return{serviceList:[{icon:"/static/images/mine/wode-kf-icon1@2x.png",text:"客服QQ",number:""},{icon:"/static/images/mine/wode-kf-icon2@2x.png",text:"客服电话",number:""},{icon:"/static/images/mine/wechat.jpg",text:"客服微信",number:""}]}},onReady:function(){this._getContactMethods()},methods:{_getContactMethods:function(){var t=u(i.default.mark(function t(){var n;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.getContactMethod)({token:e.getStorageSync("token")});case 2:n=t.sent,console.log(n),1e4==n.recode&&(this.$set(this.serviceList[0],"number",n.data.qq),this.$set(this.serviceList[1],"number",n.data.phone),this.$set(this.serviceList[2],"number",n.data.weixin));case 5:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),serviceClick:function(t,n){0==n&&plus.runtime.openURL("mqq://im/chat?chat_type=wpa&uin=".concat(t.number,"&version=1&src_type=web")),1==n&&e.makePhoneCall({phoneNumber:t.number}),2==n&&plus.runtime.openURL("weixin://")}}};t.default=s}).call(this,n("6e42")["default"])},"5c2b":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"service"},e._l(e.serviceList,function(t,i){return n("view",{key:i,staticClass:"item",attrs:{eventid:"4f97f617-0-"+i},on:{tap:function(n){e.serviceClick(t,i)}}},[n("image",{attrs:{src:t.icon}}),n("text",[e._v(e._s(t.text))]),n("text",{staticClass:"number",attrs:{selectable:!0}},[e._v(e._s(t.number))])])}))},r=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r})},"73cf":function(e,t,n){"use strict";n.r(t);var i=n("5afa"),r=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);t["default"]=r.a},cd2f:function(e,t,n){"use strict";n("4b50");var i=a(n("b0ce")),r=a(n("2fa6"));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,i.default)(r.default))},ea5e:function(e,t,n){"use strict";var i=n("1b48"),r=n.n(i);r.a}},[["cd2f","common/runtime","common/vendor"]]]);