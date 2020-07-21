
export const isLogin = () => {
	try{
		const token = uni.getStorageSync('token')
		if (token === "") {
			uni.navigateTo({
				url: '/pages/signIn/signIn'
			})
		}
	} catch(e) {
		uni.navigateTo({
			url: '/pages/signIn/signIn'
		})
	}
	
}