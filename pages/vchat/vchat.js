const app = getApp()
const msgList = require('../../config').msgList
import { format } from '../../utils/util'
Page({
  data:{
    list:[]
  },
  onLoad: function (options) {
    this.setData({
      openid:app.globalData.openid
    })
    console.log('in')
    var that = this
    wx.request({
      url: msgList,
      method: 'GET',
      data: {
        user_id:app.globalData.openid,
        friend_id:options.friend_id
      },
      success: function (res) {
        console.log(res.data.data.length)
        for(var i = 0;i< res.data.data.length;i++){
          res.data.data[i].time = format(new Date(res.data.data[i].time),'MM-dd hh:mm');
          console.log(res.data.data[i].time )
        }
        that.setData({
          list : res.data.data
        })
      }
    })
  }
})