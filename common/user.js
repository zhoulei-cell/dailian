
export const isLogin = () => {
	uni.getStorage({
		key: 'token',
		success: (res) => {
		},
		fail: (err) => {
			uni.navigateTo({
				url: '/pages/signIn/signIn'
			})
		}
	})
}