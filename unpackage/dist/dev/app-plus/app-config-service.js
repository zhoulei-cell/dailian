
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/addrole/addrole","pages/opposingrole/opposingrole","pages/hall/hall","pages/login/login","pages/pay/pay","pages/paysuccess/paysuccess","pages/user/user","pages/release/release","pages/releasepk/releasepk","pages/confrontation/confrontation","pages/arena/arena","pages/arenadetial/arenadetial","pages/releaseinfo/releaseinfo","pages/orderinfo/orderinfo","pages/orderinfo2/orderinfo2","pages/orderimgsubmit/orderimgsubmit","pages/orderinfo3/orderinfo3","pages/updatereleaseinfo/updatereleaseinfo","pages/invitation/invitation","pages/orderreceiving/orderreceiving","pages/orderrelease/orderrelease","pages/coupon/coupon","pages/mwallet/mwallet","pages/placeOrder/placeOrder","pages/submitexception/submitexception","pages/consult/consult","pages/appeal/appeal","pages/appealdetial/appealdetial","pages/Recharge/Recharge","pages/withdrawal/withdrawal","pages/ordercomfirm/ordercomfirm","pages/membershipcenter/membershipcenter","pages/calendar/calendar","pages/reg/reg","pages/dxlogin/dxlogin","pages/pwd/pwd","pages/updateuserinfo/updateuserinfo","pages/authentication/authentication","pages/withdrawallist/withdrawallist","pages/capitalflow/capitalflow","pages/chat/chat","pages/battledetails/battledetails","pages/warrecord/warrecord","pages/acceptthewar/acceptthewar","pages/uploadresults/uploadresults"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#00CB82","backgroundColor":"#f4f8fb"},"tabBar":{"color":"#989898","selectedColor":"#00CB82","backgroundColor":"#ffffff","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"static/img/tabbar/index.png","selectedIconPath":"static/img/tabbar/indexchek.png"},{"pagePath":"pages/confrontation/confrontation","text":"赛事","iconPath":"static/img/tabbar/shaishi.png","selectedIconPath":"static/img/tabbar/shaishicheck.png"},{"pagePath":"pages/hall/hall","text":"派单大厅","iconPath":"static/img/tabbar/order.png","selectedIconPath":"static/img/tabbar/ordercheck.png"},{"pagePath":"pages/chat/chat","text":"热聊","iconPath":"static/img/tabbar/qunliao.png","selectedIconPath":"static/img/tabbar/qunliaocheck.png"},{"pagePath":"pages/user/user","text":"我的","iconPath":"static/img/tabbar/wode.png","selectedIconPath":"static/img/tabbar/wodecheck.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"战狼电竞俱乐部","compilerVersion":"2.7.5","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true}},{"path":"/pages/addrole/addrole","meta":{},"window":{"navigationBarTitleText":"对战角色管理","enablePullDownRefresh":true}},{"path":"/pages/opposingrole/opposingrole","meta":{},"window":{"navigationBarTitleText":"添加角色","enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSize":"30rpx","text":"添加角色","float":"right"}]}}},{"path":"/pages/hall/hall","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"派单大厅","onReachBottomDistance":50,"enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSize":"30rpx","text":"发单","float":"right"}]}}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"账号登录"}},{"path":"/pages/pay/pay","meta":{},"window":{"navigationBarTitleText":"支付订单"}},{"path":"/pages/paysuccess/paysuccess","meta":{},"window":{"navigationBarTitleText":"支付成功"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/release/release","meta":{},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/releasepk/releasepk","meta":{},"window":{"navigationBarTitleText":"发布对战"}},{"path":"/pages/confrontation/confrontation","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"赛事"}},{"path":"/pages/arena/arena","meta":{},"window":{"navigationBarTitleText":"竞技场","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/arenadetial/arenadetial","meta":{},"window":{"navigationBarTitleText":"房间"}},{"path":"/pages/releaseinfo/releaseinfo","meta":{},"window":{"navigationBarTitleText":"王者排位发单"}},{"path":"/pages/orderinfo/orderinfo","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/orderinfo2/orderinfo2","meta":{},"window":{"navigationBarTitleText":"大厅订单详情"}},{"path":"/pages/orderimgsubmit/orderimgsubmit","meta":{},"window":{"navigationBarTitleText":"订单图片上传"}},{"path":"/pages/orderinfo3/orderinfo3","meta":{},"window":{"navigationBarTitleText":"发单订单详情"}},{"path":"/pages/updatereleaseinfo/updatereleaseinfo","meta":{},"window":{"navigationBarTitleText":"修改订单"}},{"path":"/pages/invitation/invitation","meta":{},"window":{"navigationBarTitleText":"我的邀请"}},{"path":"/pages/orderreceiving/orderreceiving","meta":{},"window":{"navigationBarTitleText":"接单订单"}},{"path":"/pages/orderrelease/orderrelease","meta":{},"window":{"navigationBarTitleText":"发单订单"}},{"path":"/pages/coupon/coupon","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/mwallet/mwallet","meta":{},"window":{"navigationBarTitleText":"我的钱包"}},{"path":"/pages/placeOrder/placeOrder","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/submitexception/submitexception","meta":{},"window":{"navigationBarTitleText":"提交异常"}},{"path":"/pages/consult/consult","meta":{},"window":{"navigationBarTitleText":"协商结算"}},{"path":"/pages/appeal/appeal","meta":{},"window":{"navigationBarTitleText":"申诉"}},{"path":"/pages/appealdetial/appealdetial","meta":{},"window":{"navigationBarTitleText":"申诉详情"}},{"path":"/pages/Recharge/Recharge","meta":{},"window":{"navigationBarTitleText":"充值中心"}},{"path":"/pages/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现"}},{"path":"/pages/ordercomfirm/ordercomfirm","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/membershipcenter/membershipcenter","meta":{},"window":{"navigationBarTitleText":"会员中心"}},{"path":"/pages/calendar/calendar","meta":{},"window":{"navigationBarTitleText":"在线签到"}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/dxlogin/dxlogin","meta":{},"window":{"navigationBarTitleText":"短信登录"}},{"path":"/pages/pwd/pwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/updateuserinfo/updateuserinfo","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/authentication/authentication","meta":{},"window":{"navigationBarTitleText":"实名认证"}},{"path":"/pages/withdrawallist/withdrawallist","meta":{},"window":{"navigationBarTitleText":"提现记录"}},{"path":"/pages/capitalflow/capitalflow","meta":{},"window":{"navigationBarTitleText":"资金流水"}},{"path":"/pages/chat/chat","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"群聊"}},{"path":"/pages/battledetails/battledetails","meta":{},"window":{"navigationBarTitleText":"对战详情"}},{"path":"/pages/warrecord/warrecord","meta":{},"window":{"navigationBarTitleText":"发布对战"}},{"path":"/pages/acceptthewar/acceptthewar","meta":{},"window":{"navigationBarTitleText":"接受对战"}},{"path":"/pages/uploadresults/uploadresults","meta":{},"window":{"navigationBarTitleText":"上传赛果"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
