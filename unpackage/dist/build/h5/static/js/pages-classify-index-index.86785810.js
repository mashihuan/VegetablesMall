(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-classify-index-index"],{"32bd":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"page-body"},[i("v-uni-scroll-view",{staticClass:"nav-left",style:"height:"+t.height+"px",attrs:{"scroll-y":""}},t._l(t.categoryList,function(e,n){return i("v-uni-view",{key:n,staticClass:"nav-left-item",class:n==t.categoryActive?"active":"",on:{click:function(i){i=t.$handleEvent(i),t.categoryClickMain(e,n)}}},[t._v(t._s(e.name))])}),1),i("v-uni-scroll-view",{staticClass:"nav-right",style:"height:"+t.height+"px",attrs:{"scroll-y":"","scroll-top":t.scrollTop,"scroll-with-animation":""},on:{scroll:function(e){e=t.$handleEvent(e),t.scroll(e)}}},t._l(t.subCategoryList,function(e,n){return i("v-uni-view",{key:n,staticClass:"nav-right-item",attrs:{id:0===n?"first":""}},[i("v-uni-image",{attrs:{"lazy-load":"true",src:e.img}}),i("v-uni-view",{staticClass:"item-content"},[i("v-uni-view",{staticClass:"item-name"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"item-desc"},[t._v(t._s(e.desc))]),i("v-uni-view",{staticClass:"item-bottom"},[i("v-uni-text",[t._v(t._s("￥"+e.price))]),i("v-uni-image",{attrs:{src:"/static/images/classify/fenlei-icon-jia@2x.png"}})],1)],1)],1)}),1)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"3fe5":function(t,e,i){"use strict";var n=i("cefe"),a=i.n(n);a.a},"621d":function(t,e,i){"use strict";i.r(e);var n=i("32bd"),a=i("a568");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);i("3fe5");var c=i("2877"),r=Object(c["a"])(a["default"],n["a"],n["b"],!1,null,"44c56742",null);e["default"]=r.exports},"65ad":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page-body[data-v-44c56742]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.nav[data-v-44c56742]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%}.nav-left[data-v-44c56742]{width:24%}.nav-left .nav-left-item[data-v-44c56742]{height:%?100?%;font-size:%?26?%;color:#464646;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.nav-right[data-v-44c56742]{width:76%;background:#fff}.nav-right .nav-right-item[data-v-44c56742]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;height:%?250?%;padding:%?30?% %?30?% %?25?%;border:%?1?% solid #f4f4f4}.nav-right .nav-right-item uni-image[data-v-44c56742]{width:%?160?%;height:%?160?%;margin-right:%?30?%}.nav-right .nav-right-item .item-content[data-v-44c56742]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.nav-right .nav-right-item .item-content .item-name[data-v-44c56742]{font-size:%?30?%;line-height:1.33;color:#464646}.nav-right .nav-right-item .item-content .item-desc[data-v-44c56742]{font-size:%?20?%;line-height:1.33;margin-top:%?12?%;color:#595959}.nav-right .nav-right-item .item-content .item-bottom[data-v-44c56742]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-top:%?50?%;color:#d40300}.nav-right .nav-right-item .item-content .item-bottom uni-text[data-v-44c56742]{color:#d40300}.nav-right .nav-right-item .item-content .item-bottom uni-image[data-v-44c56742]{width:%?34?%;height:%?34?%}.active[data-v-44c56742]{color:#68ca59!important;background:#fff}',""])},"6be4":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{categoryList:[],subCategoryList:[],height:0,categoryActive:0,scrollTop:0,scrollHeight:0,name:"七月_"}},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t,e){this.categoryActive=e,this.subCategoryList=t.subCategoryList,this.scrollTop=-this.scrollHeight*e},getCategory:function(){this.categoryList=[{name:"为你优选",subCategoryList:[{img:"/static/images/classify/fenlei-pic1@2x.png",name:"山东水晶富士80苹果1000g±50g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"},{img:"/static/images/classify/fenlei-pic2@2x.png",name:"龙眼500g±50g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"},{img:"/static/images/classify/fenlei-pic3@2x.png",name:"红颜草莓205g±10g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"}]},{name:"米面粮油",subCategoryList:[{img:"/static/images/classify/fenlei-pic1@2x.png",name:"山东水晶富士80苹果1000g±50g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"},{img:"/static/images/classify/fenlei-pic2@2x.png",name:"龙眼500g±50g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"}]},{name:"安心蔬菜",subCategoryList:[{img:"/static/images/classify/fenlei-pic1@2x.png",name:"山东水晶富士80苹果1000g±50g/份",desc:"脸皮薄心眼小，不削皮就能吃",price:"8.8"}]},{name:"健康水果"},{name:"海鲜水产"},{name:"乳品烘焙"},{name:"火锅食材"},{name:"营养早餐"},{name:"特价专区"}],this.subCategoryList=this.categoryList[0].subCategoryList}},onLoad:function(){this.getCategory(),this.height=uni.getSystemInfoSync().windowHeight}};e.default=n},a568:function(t,e,i){"use strict";i.r(e);var n=i("6be4"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},cefe:function(t,e,i){var n=i("65ad");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("4f08b769",n,!0,{sourceMap:!1,shadowMode:!1})}}]);