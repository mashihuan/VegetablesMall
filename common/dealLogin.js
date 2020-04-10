export function dealLogin () {
	var token = uni.getStorageSync('token');
	if(!token) {
		uni.redirectTo({
			url: '/pages/login/login/login',
			animationType: 'slide-in-right'
		})
	}
}