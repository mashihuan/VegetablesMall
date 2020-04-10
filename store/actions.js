import {
	getRichText
} from '@/api'

import {
	RICH_TEXT
} from './mutation-types'

export default {
	// 获取后台编辑富文本 25为邀请有礼、26为设置关于、27为积分规则
	async reqGetRichText ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据....'
		})
		const result = await getRichText (params);
		uni.hideLoading()
		commit(RICH_TEXT, result.data.content)
	}
}