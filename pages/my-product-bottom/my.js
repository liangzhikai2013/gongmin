// index.js
// 获取应用实例
const app = getApp()
const workList = require('../../config').getWork
import { timeHandle } from '../../utils/util'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow() {
    
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad() {
    var that = this
    console.log('aaa')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: workList,
      method:'get',
      data:{
        search:1,
        my_open_id:app.globalData.openid,
        user_id:app.globalData.openid,
        
      },
      success:function(res){
        for(var i =0;i< res.data.data.length;i++){
          res.data.data[i].img_list=res.data.data[i].img_list.split(',')
          // timeHandle(new Date(res.data.data[i].time).getTime() )
          
          res.data.data[i].creat_time=timeHandle(new Date(res.data.data[i].creat_time).getTime() )
        }
        that.setData({
          list:res.data.data
        })
        
      }
    })
  },
  
})
