const noticeList= require('../../config').noticeList
const app = getApp()
import { timeHandle } from '../../utils/util'
Page({
  data:{
    list:['','']
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      type:options.type
    })
    wx.request({
      url: noticeList,
      method: 'GET',
      data: {
        user_id:app.globalData.openid,
        type:options.type
        
      },
      success: function (res) {
        
        for(var i =0;i<res.data.data.length;i++){
          res.data.data[i].time = timeHandle(new Date(res.data.data[i].time).getTime() )
        }
        that.setData({
          data:res.data.data
        })
      }
    })
  }
})