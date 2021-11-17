const allNoticeList= require('../../config').allNoticeList
const app = getApp()
import { timeHandle } from '../../utils/util'
Page({
  data:{
    data:''
  },
  onShow() {
    
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: allNoticeList,
      method: 'GET',
      data: {
        user_id:app.globalData.openid,
        
      },
      success: function (res) {
        
        for(var i =0;i<res.data.data.friend.length;i++){
          res.data.data.friend[i].time = timeHandle(new Date(res.data.data.friend[i].time).getTime() )
        }
        that.setData({
          data:res.data.data
        })
      }
    })
  }
})