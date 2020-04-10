<template>
	<view>
		<view class="addAddress">
			<form>
				<label>联系人：<input v-model="name" type="text" placeholder="请输入您的姓名"></label>
				<view class="sex">
					<label @tap="seletcSex" id="male"><view :class="{active: male}"></view>先生</label>
					<label @tap="seletcSex" id="female"><view :class="{active: female}"></view>女士</label>
				</view>
				<label>手机号：<input type="text" v-model="phone" placeholder="请输入您的手机号"></label>
				<label>地区：
					<input disabled type="text" 
					 class="address" 
					 placeholder="请选择您的地址"
					 v-model="area"
					 @tap="showMulLinkageThreePicker"
					>
					 <image src="/static/images/order/dingdan-qrdd-icon-next@2x.png"></image>
				 </label>
				<label>详细地址：<input type="text" v-model="detailArea" placeholder="请输入您的详细地址"></label>
				<label class="default"><view>设为默认地址</view> <switch color="#63c753" :checked="switchChecked" @change="switchChange" /></label>
			</form>
		</view>
		<click-button text="保存" :buttonClick="buttonClick"></click-button>
		<!-- 城市列表弹窗 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		  @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import clickButton from '@/components/click-button'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js'
	import { addAddress, getAddressDetail, modificationAddress } from '@/api'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				male: true,
				female: false,
				themeColor: '#63c753',
				cityPickerValueDefault: [0, 0, 0],
				area: '',
				detailArea: '',
				switchChecked: true,
				addressId: '',   // 地址状态  默认新增  false为编辑
			};
		},
		onLoad (options) {
			this.addressId = options.id;
			if(this.addressId) {
				this._setNavigationBarText();   // 为编辑地址时修改导航栏字体
				this._getAddressDetail(options.id)
			}
		},
		methods: {
			async buttonClick () {
				if(this.male) {
					this.sexFlag = 1
				}else {
					this.sexFlag = 2
				}
				if(this.switchChecked) {
					this.switchFlag = 1
				}else {
					this.switchFlag = 0
				}
				if(this.addressId) {
					this.id = this.addressId;
				}else {
					this.id = ''
				}
				let obj = {
					token: uni.getStorageSync('token'),
					name: this.name,
					mobile: this.phone,
					gender: this.sexFlag,
					status: this.switchFlag,
					address_ssq: this.area,
					address_content: this.detailArea,
					id: this.id
				};
				if(this.addressId) {  // 编辑保存
					let result = await modificationAddress (obj)
					this.saveSuccess(result)
				}else {              // 新增
					let result = await addAddress (obj)
					this.saveSuccess(result)
				}
			},
			saveSuccess (result) {  // 保存成功之后执行的操作
				if(result.recode == 10000) {
					uni.showToast({
						title: '保存成功',
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
			async _getAddressDetail (id) {   // 获取地址详情
				let result = await getAddressDetail ({
					token: uni.getStorageSync('token'),
					address_id: id
				})
				if(result.recode == 10000) {
					this.name = result.data.name;
					this.phone = result.data.mobile;
					this.male = result.data.gender == 1 ? true : false;
					this.female = !this.male;
					this.area = result.data.address_ssq;
					this.detailArea = result.data.address_content;
					this.switchChecked = result.data.status == 1 ? true : false;
				}
			},
			seletcSex (e) {
				if(e.target.id == "male") {
					this.male = true;
					this.female = false;
				}
				if(e.target.id == "female") {
					this.male = false;
					this.female = true;
				}
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				console.log(this.$refs.mpvueCityPicker);
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm (e) {
				this.area = e.label;
			},
			switchChange (e) {
				this.switchChecked = e.detail.value;
			},
			_setNavigationBarText () {
				uni.setNavigationBarTitle({
						title: '编辑收获地址'
				});
			}
		},
		components: {
			clickButton,
			mpvueCityPicker
		}
	}
</script>

<style scoped lang="scss">
.addAddress {
	margin-bottom: 80upx;
	label,  view {
		background: #fff;
		margin-bottom: 1upx;
	}
	label {
		display: flex;
		align-items: center;
		padding: 30upx;
		margin-bottom: 1upx;
		box-sizing: border-box;
		input {
			flex: 1;
			padding-left: 30upx;
		}
		.address {
			text-align: right;
			padding-right: 20upx;
		}
		image {
			width: 18upx;
			height: 26upx;
		}
	}
	.sex {
		display: flex;
		padding-left: 150upx;
		width: 100%;
		view {
			display: flex;
			align-items: center;
			width: 40upx;
			height: 40upx;
			margin-right: 20upx;
			background: url('~@/static/images/order/dingdan-qrdd-icon-wxz@2x.png');
			background-size: 100% 100%;
		}
		view.active {
			background: url('~@/static/images/order/dingdan-qrdd-icon-xz@2x.png');
			background-size: 100% 100%;
		}
	}
	.default {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
	}
}
</style>
