(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/arenadetial/arenadetial"],{"223b":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"3dcb":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return i.e("components/uni-steps/uni-steps").then(i.bind(null,"83e8"))},n={components:{uniSteps:a},data:function(){return{active:1,list1:[{title:"双方确认"},{title:"开始游戏"},{title:"审核结果"},{title:"赢得奖金"}],multiArray:[["亚洲","欧洲"],["中国","日本"],["北京","上海","广州"]],multiIndex:[0,0,0]}},methods:{change:function(){this.active<this.list1.length-1?this.active+=1:this.active=0},bindMultiPickerColumnChange:function(e){switch(console.log(t("修改的列为："+e.detail.column+"，值为："+e.detail.value," at pages\\arenadetial\\arenadetial.vue:94")),this.multiIndex[e.detail.column]=e.detail.value,e.detail.column){case 0:switch(this.multiIndex[0]){case 0:this.multiArray[1]=["中国","日本"],this.multiArray[2]=["北京","上海","广州"];break;case 1:this.multiArray[1]=["英国","法国"],this.multiArray[2]=["伦敦","曼彻斯特"];break}this.multiIndex.splice(1,1,0),this.multiIndex.splice(2,1,0);break;case 1:switch(this.multiIndex[0]){case 0:switch(this.multiIndex[1]){case 0:this.multiArray[2]=["北京","上海","广州"];break;case 1:this.multiArray[2]=["东京","北海道"];break}break;case 1:switch(this.multiIndex[1]){case 0:this.multiArray[2]=["伦敦","曼彻斯特"];break;case 1:this.multiArray[2]=["巴黎","马赛"];break}break}this.multiIndex.splice(2,1,0);break}this.$forceUpdate()}}};e.default=n}).call(this,i("0de9")["default"])},"78f4":function(t,e,i){},b08c:function(t,e,i){"use strict";(function(t){i("760d"),i("921b");a(i("66fd"));var e=a(i("fee8"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},ba5b:function(t,e,i){"use strict";i.r(e);var a=i("3dcb"),n=i.n(a);for(var u in a)"default"!==u&&function(t){i.d(e,t,function(){return a[t]})}(u);e["default"]=n.a},f81b:function(t,e,i){"use strict";var a=i("78f4"),n=i.n(a);n.a},fee8:function(t,e,i){"use strict";i.r(e);var a=i("223b"),n=i("ba5b");for(var u in n)"default"!==u&&function(t){i.d(e,t,function(){return n[t]})}(u);i("f81b");var l=i("2877"),r=Object(l["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports}},[["b08c","common/runtime","common/vendor"]]]);