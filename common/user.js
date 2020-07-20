
export const isLogin = () => {
	uni.getStorage({
		key: 'token',
		success: (res) => {
			if ( res.data === "") {
				uni.navigateTo({
					url: '/pages/signIn/signIn'
				})
			}
		},
		fail: (err) => {
			uni.navigateTo({
				url: '/pages/signIn/signIn'
			})
		}
	})
}