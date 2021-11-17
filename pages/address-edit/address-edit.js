const app = getApp()
const addAddress = require('../../config').addAddress
const updateAddress = require('../../config').updateAddress
const addressByID= require('../../config').addressByID
Page({
  data: {
    checked:false,
    edit:0//0添加1编辑
  },
  onLoad:function(options){
    var that = this
    var edit=options.id==undefined?'0':'1'
    this.setData({
      edit:edit
    })
    if(options.id!=undefined){
      wx.request({
        url: addressByID,
        data:{
          id:options.id
        },
        success:function(res){
          that.setData({
            name:res.data.data[0].name,
            phone:res.data.data[0].phone,
            location:res.data.data[0].location,
            address:res.data.data[0].address,
            id:res.data.data[0].id,
          })
        }
      })
    }
  },
  addressChange(e){
    this.setData({
      address: e.detail.value
    })
  },
  phoneChange(e){
    this.setData({
      phone: e.detail.value
    })
  },
  nameChange(e){
    this.setData({
      name: e.detail.value
    })
  },
  locationChange(e){
    this.setData({
      location: e.detail.value
    })
  },
  submit(){
    var url
    var data ={
      name:this.data.name,
      phone:this.data.phone,
      location:this.data.location,
      address:this.data.address,
    }
    if(this.data.edit==0) {
      url = addAddress
      data.user_id = app.globalData.openid
    }
    else {
      url = updateAddress
      data.id = this.data.id
    }
    wx.request({
      url: url,
      data:data,
      method:'post',
      success:function(res){
        wx.navigateBack({
          delta: 1
        })
      }
    })

  }
})