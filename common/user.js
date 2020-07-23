
export const isLogin = () => {
	try{
		const token = uni.getStorageSync('token')
		if (token === "") {
			uni.reLaunch({
				url: "/pages/signIn/signIn"
			})
			return false
		}
		return true
	} catch(e) {
		uni.reLaunch({
			url: "/pages/signIn/signIn"
		})
		return false
	}
	
}