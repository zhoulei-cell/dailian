import http from './http.js'
export const updata = () => { //app更新
	// #ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		console.log(widgetInfo)
	})
	// #endif
}