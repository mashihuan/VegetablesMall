import ajax from './ajax'

const BASE_URL = 'http://112.124.201.81';
export {
	BASE_URL
} 

// 获取验证码
export const getSms = (params) => ajax(BASE_URL + '/api/sms/send', params)
// 注册
export const register = (params) => ajax(BASE_URL + '/app/xuser/register', params)
// 忘记密码
export const forgetPassword = (params) => ajax(BASE_URL + '/app/xuser/forgetpwd', params)
// 登录
export const login = (params) => ajax(BASE_URL + '/app/xuser/login', params)
// 获取首页轮播图
export const getCarousel = (params) => ajax(BASE_URL + '/app/index/xcarousel', params)
// 获取首页十宫格
export const getGrid = (params) => ajax(BASE_URL + '/app/index/getIndexCategory', params)
// 获取首页板块 
export const getSection = (params) => ajax(BASE_URL + '/app/index/getPlate', params)
// 获取菜品详情
export const getMealDetail = (params) => ajax(BASE_URL + '/app/xgoods/goodsDetails', params)
// 商品加入购物车
export const addGoodsToCar = (params) => ajax(BASE_URL + '/app/shopping/singleAddShopping', params)
// 可领取优惠券列表
export const getAllCoupon = (params) => ajax(BASE_URL + '/app/discount/canGetDiscounts', params)
// 用户领取优惠券
export const userGetCoupon = (params) => ajax(BASE_URL + '/app/Discount/receiveCoupon', params)


// 获取分类左侧列表
export const getClassifyLeft = (params) => ajax(BASE_URL + '/app/xgoodscategory/liftCategory')
// 获取分类右侧列表
export const getClassifyRight = (params) => ajax(BASE_URL + '/app/xgoodscategory/rightGoods', params)
// 菜品搜索
export const getSearchFood = (params) => ajax(BASE_URL + '/app/xgoods/goodSearch', params)
// 修改字体颜色
export const changeFontColor = (params) => ajax(BASE_URL + '/app/Xgoodscategory/getColor', params)


// 获取季节菜谱
export const getSeasonMenu = (params) => ajax(BASE_URL + '/app/xrecipe/seasonalRecipe', params)
// 获取菜谱分类列表
export const getMenuClassify = (params) => ajax(BASE_URL + '/app/xrecipe/xrecipeCategory', params)
// 获取菜谱列表
export const getMenuList = (params) => ajax(BASE_URL + '/app/xrecipe/xrecipeList', params)
// 获取菜谱详情
export const getMenuDetail = (params) => ajax(BASE_URL + '/app/xrecipe/recipeDetails', params)
// 菜谱分享
export const shareMenu = (params) => ajax(BASE_URL + '/app/Xrecipe/share', params)


// 获取购物车信息
export const getShopCarInfo = (params) => ajax(BASE_URL + '/app/shopping/shopping', params)
// 购物车数量变化
export const changeShopCarNumber = (params) => ajax(BASE_URL + '/app/shopping/changeNum', params)
// 购物车菜品删除
export const deleteShopCarGoods = (params) => ajax(BASE_URL + '/app/shopping/deleteGoods', params)
// 根据积分和优惠券计算实际价格
export const dealRealPrice = (params) => ajax(BASE_URL + '/app/close/countMoney', params)
// 将商品加入购物车->结算页面
export const goToPay = (params) => ajax(BASE_URL + '/app/close/close', params)
// 生成订单
export const createOrder = (params) => ajax(BASE_URL + '/app/close/createOrder', params)
// 获取我的订单
export const getOrderList = (params) => ajax(BASE_URL + '/app/xorder/getXorder', params)
// 立即支付
export const immediatePayment = (params) => ajax(BASE_URL + '/app/xorder/payment', params)
// 取消订单
export const cancelOrder = (params) => ajax(BASE_URL + '/app/xorder/cancelOrder', params)
// 确认收货
export const confirmReceipt = (params) => ajax(BASE_URL + '/app/xorder/confirmOrder', params)
// 评价页面
export const evluatePages = (params) => ajax(BASE_URL + '/app/xgoodsevaluate/evaluateOrder', params)
// 评价
export const orderEvaluate = (params) => ajax(BASE_URL + '/app/xgoodsevaluate/doevaluateOrder', params)
// 获取售后列表
export const getAfterSale = (params) => ajax(BASE_URL + '/app/xorder/getXorder', params)
// 售后申请页面
export const afterSalePage = (params) => ajax(BASE_URL + '/app/Xorderreturn/orderReturn', params)
// 售后申请列表
export const getAfterSaleRecord = (params) => ajax(BASE_URL + '/app/Xorderreturn/application', params)
// 提交售后申请
export const submitAfterSale = (params) => ajax(BASE_URL + '/app/xorderreturn/orApplication', params)
// 再次购买
export const buyAgain = (params) => ajax(BASE_URL + '/app/xorder/buyAgain', params)



// 获取个人信息
export const getPersonalInfo = (params) => ajax(BASE_URL + '/app/xuser/getUser', params)
// 上传头像
export const uploadAwatar = (params) => ajax(BASE_URL + '/api/common/upload', params)
// 修改个人信息
export const changePersonalInfo = (params) => ajax(BASE_URL + '/app/xuser/doupdateinfo', params)
// 修改手机号-验证旧手机
export const changePhoneOld = (params) => ajax(BASE_URL + '/app/xuser/checkmobileold', params)
// 修改手机号-验证新手机
export const changePhonNew = (params) => ajax(BASE_URL + '/app/xuser/checkmobilenew', params)
// 获取消息列表
export const getMessageList = (params) => ajax(BASE_URL + '/app/message/message', params)
// 改变消息阅读状态
export const readMessage = (params) => ajax(BASE_URL + '/app/message/readMessage', params)
// 获取消息详情
export const getMessageDetail = (params) => ajax(BASE_URL + '/app/message/detail', params)
// 消息删除
export const deleteMessage = (params) => ajax(BASE_URL + '/app/message/delete', params)
// 签到
export const signIn = (params) => ajax(BASE_URL + '/addons/leesign/index/sign', params)
// 获取优惠券列表
export const getCoupon = (params) => ajax(BASE_URL + '/app/xuser/getUserdiscount', params)
// 获取会员卡
export const getMemberSet = (params) => ajax(BASE_URL + '/app/xuser/membership', params)
// 获取设置关于、邀请有礼、积分规则富文本
export const getRichText = (params) => ajax(BASE_URL + '/app/index/getxbulletin', params)
// 获取用户收获地址列表
export const getAddressList = (params) => ajax(BASE_URL + '/app/xaddress/getAddress', params)
// 添加收获地址
export const addAddress = (params) => ajax(BASE_URL + '/app/xaddress/addressadds', params)
// 根据id获取收获地址详情
export const getAddressDetail = (params) => ajax(BASE_URL + '/app/xaddress/xaddress', params)
// 修改收获地址
export const modificationAddress = (params) => ajax(BASE_URL + '/app/xaddress/addressupdate', params)
// 删除收获地址
export const deleteAddress = (params) => ajax(BASE_URL + '/app/xaddress/addressdelete', params)
// 获取客服联系方式
export const getContactMethod = (params) => ajax(BASE_URL + '/app/index/getxconfig', params)
// 用户意见反馈
export const userFeedback = (params) => ajax(BASE_URL + '/app/xuser/getFeedback', params)
// 检查更新
export const checkUpdate = (params) => ajax(BASE_URL + '/app/index/renewal', params)
// 购买会员
export const buyMember = (params) => ajax(BASE_URL + '/app/xuser/viphandle', params)
// 充值
export const recharge = (params) => ajax(BASE_URL + '/app/xuser/recharge', params)
// 立即支付
export const payNow = (params) => ajax(BASE_URL + '/app/xorder/payment', params)

// 第三方登录
export const thirdPartyLogin = (params) => ajax(BASE_URL + '/app/xuser/third', params)
// 绑定手机号
export const bindPhone = (params) => ajax(BASE_URL + '/app/xuser/binding', params)

// 删除售后记录
export const delAftersaleRecord = (params) => ajax(BASE_URL + '/app/Xorderreturn/delete', params)