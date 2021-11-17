const app = getApp()
const addressList = require('../../config').addressList
const setDefaultAddress = require('../../config').setDefaultAddress
const deleAddress = require('../../config').deleAddress
Page({
  data: {
    checked:false
  },
  onShow(){
    var that = this
    wx.request({
      url: addressList,
      data:{
        user_id:app.globalData.openid
      },
      success: function (res) {
        that.setData({
          list:res.data.data
        })
      }
    })
  },
  onLoad(){
    var that = this
    wx.request({
      url: addressList,
      data:{
        user_id:app.globalData.openid
      },
      success: function (res) {
        that.setData({
          list:res.data.data
        })
      }
     
    })
  },
  radioChange(e){
    var data = this.data.list
    for(var i =0;i<data.length;i++){
      if(e.currentTarget.dataset.index == i){
        data[i].default=1
      }else{
        data[i].default=0
      }
    }
    this.setData({
      list:data
    })
    wx.request({
      url: setDefaultAddress,
      data:{
        id:e.currentTarget.dataset.id,
        user_id:app.globalData.openid,
      },
    })
  },
  dele(e){
    var that=this
    wx.request({
      url: deleAddress,
      data:{
        id:e.currentTarget.dataset.id
      },
      success:function(rews){
        wx.request({
          url: addressList,
          data:{
            user_id:app.globalData.openid
          },
          success: function (res) {
            that.setData({
              list:res.data.data
            })
          }
         
        })
      }
    })
  }
  
})