(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/subPages/personalInfo/personalInfo"],{"4eac":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"personalInfo"},[n("view",{staticClass:"list"},[n("list-cell",{attrs:{cellClick:e.cellClick,title:"头像",awatar:e.awatar,isAwatar:!0,isShowArrow:!1,mpcomid:"e091a0d2-0"}}),n("list-cell",{attrs:{changeNickname:e.changeNickname,cellClick:e.cellClick,disabled:!1,value:e.nickName,title:"昵称",eventid:"e091a0d2-0",mpcomid:"e091a0d2-1"},model:{value:e.nickName,callback:function(t){e.nickName=t},expression:"nickName"}}),n("list-cell",{attrs:{cellClick:e.cellClick,title:"性别",value:e.sex,eventid:"e091a0d2-1",mpcomid:"e091a0d2-2"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}}),n("list-cell",{attrs:{cellClick:e.cellClick,title:"生日",value:e.birthday,bindDateChange:e.bindDateChange,mpcomid:"e091a0d2-3"}}),n("list-cell",{attrs:{cellClick:e.cellClick,title:"手机号",value:e.phone,mpcomid:"e091a0d2-4"}})],1)])},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},"7e51":function(e,t,n){},8256:function(e,t,n){"use strict";n.r(t);var a=n("4eac"),i=n("84d5");for(var r in i)"default"!==r&&function(e){n.d(t,e,function(){return i[e]})}(r);n("b225");var c=n("2877"),o=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"35cd1f4f",null);t["default"]=o.exports},"84d5":function(e,t,n){"use strict";n.r(t);var a=n("a9ff"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=i.a},a9ff:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("a34a")),i=c(n("7fb6")),r=n("78dd");function c(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,i,r,c){try{var o=e[r](c),s=o.value}catch(l){return void n(l)}o.done?t(s):Promise.resolve(s).then(a,i)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(a,i){var r=e.apply(t,n);function c(e){o(r,a,i,c,s,"next",e)}function s(e){o(r,a,i,c,s,"throw",e)}c(void 0)})}}function l(e){var t=new Date,n=t.getFullYear(),a=t.getMonth()+1,i=t.getDate();return"start"===e?n-=60:"end"===e&&(n+=2),a=a>9?a:"0"+a,i=i>9?i:"0"+i,"".concat(n,"-").concat(a,"-").concat(i)}var u={data:function(){return{awatar:"",nickName:"",sex:"",birthday:"",phone:"",itemList:["男","女"],isShowTimePicker:!1,date:l({format:!0})}},onLoad:function(){this._getPersonalInfo()},methods:{_getPersonalInfo:function(){var t=s(a.default.mark(function t(){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e.showLoading({title:"正在加载数据..."}),t.next=3,(0,r.getPersonalInfo)({token:e.getStorageSync("token")});case 3:n=t.sent,e.hideLoading(),"10000"==n.recode&&(this.awatar=n.data.avatar||"/static/images/mine/wode-zl-tx@2x.png",this.sex=1==n.data.sex?"男":"女",this.nickName=n.data.nickname||"待完善",this.birthday=n.data.birthday||"待完善",this.phone=n.data.mobile||"待完善");case 6:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),cellClick:function(){var t=s(a.default.mark(function t(n){var i;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:i=this,"头像"==n&&this.changeAwatar(),"性别"==n&&e.showActionSheet({itemList:i.itemList,success:function(t){console.log(t.tapIndex),i.sex=i.itemList[t.tapIndex],(0,r.changePersonalInfo)({token:e.getStorageSync("token"),sex:t.tapIndex+1}).then(function(t){1e4==t.recode&&e.showToast({title:"性别修改成功"})})}}),"手机号"==n&&e.navigateTo({url:"/pages/mine/subPages/changePhone/changePhone",animationType:"slide-in-right"});case 4:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}(),changeNickname:function(){var t=s(a.default.mark(function t(){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(""!=this.nickName){t.next=3;break}return e.showToast({title:"昵称不能为空",icon:"none"}),t.abrupt("return");case 3:return t.next=5,(0,r.changePersonalInfo)({token:e.getStorageSync("token"),nickname:this.nickName});case 5:n=t.sent,1e4==n.recode?e.showToast({title:"昵称修改成功"}):e.showToast({title:n.remsg,icon:"none"});case 7:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),changeAwatar:function(){var t=this,n=e.getStorageSync("token");e.chooseImage({success:function(a){var i=a.tempFilePaths;console.log(i),e.uploadFile({url:r.BASE_URL+"/api/common/upload",filePath:i[0],name:"file",formData:{token:n},success:function(e){console.log(e.data);var n=r.BASE_URL+JSON.parse(e.data).data.url;t.awatar=n,t.upHeadimg(n)}})}})},upHeadimg:function(){var t=s(a.default.mark(function t(n){return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.changePersonalInfo)({token:e.getStorageSync("token"),headimg:n});case 2:t.sent;case 3:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}(),bindDateChange:function(){var t=s(a.default.mark(function t(n){var i;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.changePersonalInfo)({token:e.getStorageSync("token"),birthday:n.target.value});case 2:i=t.sent,1e4==i.recode?(e.showToast({title:"生日完善成功"}),this.birthday=n.target.value):e.showToast({title:i.remsg,icon:"none"});case 4:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}()},components:{listCell:i.default}};t.default=u}).call(this,n("6e42")["default"])},ac3f:function(e,t,n){"use strict";n("4b50");var a=r(n("b0ce")),i=r(n("8256"));function r(e){return e&&e.__esModule?e:{default:e}}Page((0,a.default)(i.default))},b225:function(e,t,n){"use strict";var a=n("7e51"),i=n.n(a);i.a}},[["ac3f","common/runtime","common/vendor"]]]);