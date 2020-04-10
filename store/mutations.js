import {
	RICH_TEXT
} from './mutation-types'

export default {
	saveHomeGridId (state, params) {  // 保存首页十宫格点击时的id
		state.homeGridId = params
	},
	[RICH_TEXT] (state, params) {
		state.richText = params;
	},
	saveDeliveryAddress (state, params) {
		state.deliveryAddress = params;
	}
}