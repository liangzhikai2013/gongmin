// index.js
// 获取应用实例
const app = getApp()
const collectionList= require('../../config').collectionList
import { timeHandle } from '../../utils/util'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    var that = this
   wx.request({
     url: collectionList,
     data:{
      user_id:app.globalData.openid
     },
     success:function(res){
       for(var i = 0;i<res.data.data.length;i++){
        res.data.data[i].creat_time = timeHandle(new Date(res.data.data[i].creat_time).getDate())
        res.data.data[i].img_list = res.data.data[i].img_list.split(',')
       }
       that.setData({
         list:res.data.data
       })
     }
   })
  },
  
})
