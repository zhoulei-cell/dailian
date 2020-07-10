// const baseUrl = '192.168.0.142';
//const baseUrl = '47.94.34.165';
const baseUrl = 'www.zldjsss.com';
const base='http://'+baseUrl
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: base + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].statusCode == 200) {
					resolve(res[1])
				} else if (res[1].statusCode == 500) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.message || res[1].data.msg 
					});
				} else if (res[1].statusCode == 422) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.message|| res[1].data.msg 
					});
				} else if (res[1].statusCode == 401) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
function gettoken(){
	return new Promise((resolve, reject)=>{
		uni.getStorage({
			key: 'token',
			success:(ress)=>{
				resolve(ress.data)
			},
			fail() {
				resolve('')
			}
		})
	})
}
//带Token请求
const httpTokenRequest = async (opts, data) => {
	let token =await gettoken();
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: base + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'Authorization': `Bearer ${token}`,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		} : {
			'Authorization': `Bearer ${token}`,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise((resolve, reject)=>{
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].statusCode == 200) {
					resolve(res[1])
				} else if (res[1].statusCode == 500) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.message|| res[1].data.msg 
					});
				} else if (res[1].statusCode == 422) {
					uni.showToast({
						icon: 'none',
						title: res[1].data.message|| res[1].data.msg 
					});
				} else if (res[1].statusCode == 401) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			}
		).catch(
			(response) => {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				reject(response)
			}
		)
	})
	return promise
};
const uploadimg = async(files)=>{
	let token =await gettoken();
	// 上传图片
	// 做成一个上传对象
	return new Promise((resolve,reject)=>{
		var uper = uni.uploadFile({
		    // 需要上传的地址
				url:base+'/api/upload',
				header: {
					'Authorization': `Bearer ${token}`,
				},
		    // filePath  需要上传的文件
				//filePath: imgFiles,
				files: files,
		    name: 'image[]',
		    success(res1) {
				if(res1.data.code==200)
				{
					resolve(res1)
				}else{
					resolve(res1)
					// uni.showToast({
					// 	icon: 'none',
					// 	title: res1.data
					// });
				}
		    }
		})
		// onProgressUpdate 上传对象更新的方法
		uper.onProgressUpdate(function(res){
		    // 进度条等于 上传到的进度
		    // console.log('上传进度' + res.progress)
		    // console.log('已经上传的数据长度' + res.totalBytesSent)
		    // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)
		})
	})
}
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	uploadimg
}
