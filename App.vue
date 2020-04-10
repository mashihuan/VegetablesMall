<script>
import { checkUpdate } from '@/api'
export default {
	data () {
		return {
			
		}
	},
	onLaunch: function() {
		this._CheckUpdate()
	},
	onShow: function() {},
	onHide: function() {},
	methods: {
		async _CheckUpdate () { // 检查更新
			// #ifndef H5
			let version = plus.runtime.version;
			let platform = uni.getSystemInfoSync().platform;
			let self = this;
			uni.showLoading({
				title: '正在检查新版本'
			})
			let result = await checkUpdate ({
				version: version
			})
			uni.hideLoading()
			if(result.recode == 10000) {
				console.log(JSON.stringify(result))
				uni.showModal({
					content: '检查到新版本，是否更新？',
					success: function (res) {
						if(res.confirm) {
							if(platform == 'android') {
								plus.runtime.openURL(result.data.androiddownloadurl);  // res.data.downloadurl
							}else {
								plus.runtime.openURL(result.data.iosdownloadurl);  // res.data.downloadurl
							}
						}
					}
				})
			}
			// #endif
		}
	}
};
</script>

<style>
/*每个页面公共css */
view,
text {
	font: normal 26upx -apple-system, Helvetica, sans-serif;
	box-sizing: border-box;
	color: #464646;
}
page {
	height: 100%;
	background: #f4f4f4;
	overflow-x: hidden;
}
image{will-change: transform}
</style>
