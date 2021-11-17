const noticeList= require('../../config').noticeList
const app = getApp()
import { timeHandle } from '../../utils/util'
Page({
  data:{
    list:['','']
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: noticeList,
      method: 'GET',
      data: {
        user_id:'00',
        type:3
        
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