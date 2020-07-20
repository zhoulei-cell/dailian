
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/addrole/addrole","pages/opposingrole/opposingrole","pages/hall/hall","pages/pay/pay","pages/paysuccess/paysuccess","pages/user/user","pages/release/release","pages/releasepk/releasepk","pages/confrontation/confrontation","pages/arena/arena","pages/arenadetial/arenadetial","pages/orderinfo/orderinfo","pages/orderinfo2/orderinfo2","pages/orderimgsubmit/orderimgsubmit","pages/orderinfo3/orderinfo3","pages/invitation/invitation","pages/orderreceiving/orderreceiving","pages/orderrelease/orderrelease","pages/coupon/coupon","pages/mwallet/mwallet","pages/placeOrder/placeOrder","pages/submitexception/submitexception","pages/consult/consult","pages/appeal/appeal","pages/appealdetial/appealdetial","pages/appealpk/appealpk","pages/appealpkdetail/appealpkdetail","pages/Recharge/Recharge","pages/withdrawal/withdrawal","pages/ordercomfirm/ordercomfirm","pages/membershipcenter/membershipcenter","pages/calendar/calendar","pages/updateuserinfo/updateuserinfo","pages/authentication/authentication","pages/withdrawallist/withdrawallist","pages/capitalflow/capitalflow","pages/chat/chat","pages/battledetails/battledetails","pages/warrecord/warrecord","pages/acceptthewar/acceptthewar","pages/uploadresults/uploadresults","pages/bankcart/bankcart","pages/chatlist/chatlist","pages/paymentguide/paymentguide","pages/contactus/contactus","pages/helpcenter/helpcenter","pages/vipcenter/vipcenter","pages/rule/rule","pages/releaseorder/releaseorder","pages/updateorderinfo/updateorderinfo","pages/promotioncenter/promotioncenter","pages/promotioncount/promotioncount","pages/editpwd/editpwd","pages/signIn/signIn","pages/signUp/signUp","pages/findpwd/findpwd"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#00CB82","backgroundColor":"#f4f8fb"},"tabBar":{"color":"#989898","selectedColor":"#00CB82","backgroundColor":"#ffffff","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"static/img/tabbar/index.png","selectedIconPath":"static/img/tabbar/indexchek.png"},{"pagePath":"pages/confrontation/confrontation","text":"赛事","iconPath":"static/img/tabbar/shaishi.png","selectedIconPath":"static/img/tabbar/shaishicheck.png"},{"pagePath":"pages/hall/hall","text":"接单大厅","iconPath":"static/img/tabbar/order.png","selectedIconPath":"static/img/tabbar/ordercheck.png"},{"pagePath":"pages/chatlist/chatlist","text":"热聊","iconPath":"static/img/tabbar/qunliao.png","selectedIconPath":"static/img/tabbar/qunliaocheck.png"},{"pagePath":"pages/user/user","text":"我的","iconPath":"static/img/tabbar/wode.png","selectedIconPath":"static/img/tabbar/wodecheck.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"战狼电竞","compilerVersion":"2.7.14","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true,"onReachBottomDistance":50,"scrollIndicator":"none"}},{"path":"/pages/addrole/addrole","meta":{},"window":{"navigationBarTitleText":"对战角色管理","enablePullDownRefresh":true}},{"path":"/pages/opposingrole/opposingrole","meta":{},"window":{"navigationBarTitleText":"添加","enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSize":"30rpx","text":"添加","float":"right"}]}}},{"path":"/pages/hall/hall","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"接单大厅","onReachBottomDistance":50,"enablePullDownRefresh":true,"scrollIndicator":"none"}},{"path":"/pages/pay/pay","meta":{},"window":{"navigationBarTitleText":"支付订单"}},{"path":"/pages/paysuccess/paysuccess","meta":{},"window":{"navigationBarTitleText":"支付成功"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/release/release","meta":{},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/releasepk/releasepk","meta":{},"window":{"navigationBarTitleText":"发布对战"}},{"path":"/pages/confrontation/confrontation","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"赛事"}},{"path":"/pages/arena/arena","meta":{},"window":{"navigationBarTitleText":"竞技场","enablePullDownRefresh":true,"onReachBottomDistance":50,"titleNView":{"buttons":[{"fontSize":"30rpx","text":"规则","float":"right"}]},"scrollIndicator":"none"}},{"path":"/pages/arenadetial/arenadetial","meta":{},"window":{"navigationBarTitleText":"房间"}},{"path":"/pages/orderinfo/orderinfo","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/orderinfo2/orderinfo2","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/orderimgsubmit/orderimgsubmit","meta":{},"window":{"navigationBarTitleText":"订单图片上传"}},{"path":"/pages/orderinfo3/orderinfo3","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/invitation/invitation","meta":{},"window":{"navigationBarTitleText":"我的邀请"}},{"path":"/pages/orderreceiving/orderreceiving","meta":{},"window":{"navigationBarTitleText":"接单列表","scrollIndicator":"none"}},{"path":"/pages/orderrelease/orderrelease","meta":{},"window":{"navigationBarTitleText":"发单列表","scrollIndicator":"none"}},{"path":"/pages/coupon/coupon","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/mwallet/mwallet","meta":{},"window":{"navigationBarTitleText":"我的钱包"}},{"path":"/pages/placeOrder/placeOrder","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/submitexception/submitexception","meta":{},"window":{"navigationBarTitleText":"提交异常"}},{"path":"/pages/consult/consult","meta":{},"window":{"navigationBarTitleText":"协商结算"}},{"path":"/pages/appeal/appeal","meta":{},"window":{"navigationBarTitleText":"申诉"}},{"path":"/pages/appealdetial/appealdetial","meta":{},"window":{"navigationBarTitleText":"申诉详情","titleNView":{"buttons":[{"fontSize":"30rpx","text":"刷新","float":"right"}]},"scrollIndicator":"none"}},{"path":"/pages/appealpk/appealpk","meta":{},"window":{"navigationBarTitleText":"对战申诉"}},{"path":"/pages/appealpkdetail/appealpkdetail","meta":{},"window":{"navigationBarTitleText":"申诉详情","titleNView":{"buttons":[{"fontSize":"30rpx","text":"刷新","float":"right"}]},"scrollIndicator":"none"}},{"path":"/pages/Recharge/Recharge","meta":{},"window":{"navigationBarTitleText":"充值中心"}},{"path":"/pages/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现","titleNView":{"buttons":[{"text":"记录","fontSize":"24rpx"}]}}},{"path":"/pages/ordercomfirm/ordercomfirm","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/membershipcenter/membershipcenter","meta":{},"window":{"navigationBarTitleText":"会员中心"}},{"path":"/pages/calendar/calendar","meta":{},"window":{"navigationBarTitleText":"在线签到"}},{"path":"/pages/updateuserinfo/updateuserinfo","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/authentication/authentication","meta":{},"window":{"navigationBarTitleText":"实名认证"}},{"path":"/pages/withdrawallist/withdrawallist","meta":{},"window":{"navigationBarTitleText":"提现记录"}},{"path":"/pages/capitalflow/capitalflow","meta":{},"window":{"navigationBarTitleText":"资金流水"}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationBarTitleText":"聊天大厅","scrollIndicator":"none"}},{"path":"/pages/battledetails/battledetails","meta":{},"window":{"navigationBarTitleText":"对战详情","scrollIndicator":"none"}},{"path":"/pages/warrecord/warrecord","meta":{},"window":{"navigationBarTitleText":"发布对战","enablePullDownRefresh":true}},{"path":"/pages/acceptthewar/acceptthewar","meta":{},"window":{"navigationBarTitleText":"接受对战","enablePullDownRefresh":true}},{"path":"/pages/uploadresults/uploadresults","meta":{},"window":{"navigationBarTitleText":"上传赛果"}},{"path":"/pages/bankcart/bankcart","meta":{},"window":{"navigationBarTitleText":"银行卡管理"}},{"path":"/pages/chatlist/chatlist","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"聊天列表","navigationStyle":"custom"}},{"path":"/pages/paymentguide/paymentguide","meta":{},"window":{"navigationBarTitleText":"支付教程","scrollIndicator":"none"}},{"path":"/pages/contactus/contactus","meta":{},"window":{"navigationBarTitleText":"联系我们"}},{"path":"/pages/helpcenter/helpcenter","meta":{},"window":{"navigationBarTitleText":"帮助中心"}},{"path":"/pages/vipcenter/vipcenter","meta":{},"window":{"navigationBarTitleText":"会员中心"}},{"path":"/pages/rule/rule","meta":{},"window":{"navigationBarTitleText":"规则详情","scrollIndicator":"none"}},{"path":"/pages/releaseorder/releaseorder","meta":{},"window":{"navigationBarTitleText":"发布订单","scrollIndicator":"none"}},{"path":"/pages/updateorderinfo/updateorderinfo","meta":{},"window":{"navigationBarTitleText":"修改订单","scrollIndicator":"none"}},{"path":"/pages/promotioncenter/promotioncenter","meta":{},"window":{"navigationBarTitleText":"推广中心","titleNView":{"buttons":[{"text":"去提现","fontSize":"24rpx"}]}}},{"path":"/pages/promotioncount/promotioncount","meta":{},"window":{"navigationBarTitleText":"推广人统计"}},{"path":"/pages/editpwd/editpwd","meta":{},"window":{"navigationBarTitleText":"修改订单密码"}},{"path":"/pages/signIn/signIn","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/signUp/signUp","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/findpwd/findpwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
