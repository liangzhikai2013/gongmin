// var host = "https://127.0.0.1:3000"
var host = "www.icol.net.cn/gongming/weapp"
//var host = "kklphzib.qcloud.la/weapp"
//var cloudhost = "localhost:8001"
// var cloudhost = "http://192.168.0.100:3000/gongming/api"
var cloudhost = "https://www.icol.net.cn/gongming/api"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 登录地址，用于建立会话
  updateUserInfor: `${cloudhost}/user/update`,
  addUser:`${cloudhost}/user/add`,
  getUser:`${cloudhost}/user/find`,
  follow:`${cloudhost}/user/follow`,
  unfollow:`${cloudhost}/user/unfollow`,
  isfollow:`${cloudhost}/user/isfollow`,
  //作品类型列表
  typeList:`${cloudhost}/work/typelist`,
  addWork:`${cloudhost}/work/add`,
  updateWork:`${cloudhost}/work/update`,
  getWork:`${cloudhost}/work/get`,
  operationWork:`${cloudhost}/work/operationWork`,
  offline:`${cloudhost}/work/offlineWork`,
  //作品评论s
  commentList:`${cloudhost}/comment/commentlist`,
  addComment:`${cloudhost}/comment/addcomment`,
  //消息中心
  allNoticeList:`${cloudhost}/notice/allNoticeList`,
  noticeList:`${cloudhost}/notice/noticeList`,
  msgList:`${cloudhost}/notice/msgList`,
  //拍卖
  auctionConfig:`${cloudhost}/auction/auctionConfig`,
  auctionList:`${cloudhost}/auction/auctionList`,
  //地址管理
  addressList:`${cloudhost}/address/addressList`,
  defaultAddress:`${cloudhost}/address/defaultAddress`,
  setDefaultAddress:`${cloudhost}/address/setDefaultAddress`,
  addAddress:`${cloudhost}/address/addAddress`,
  deleAddress:`${cloudhost}/address/deleAddress`,
  updateAddress:`${cloudhost}/address/updateAddress`,
  addressByID:`${cloudhost}/address/addressByID`,
  //收藏列表
  collectionList:`${cloudhost}/work/collectionList`,
  //bannerList
  bannerList:`${cloudhost}/banner/get`,
  pay: `${cloudhost}/api/pay`,
  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,
  // 用code换取openId
  openIdUrl: `https://${host}/openid`,
  ws:'ws://www.icol.net.cn:8010'
};


module.exports = config