const getUser = require('../../config').getUser
const getWork = require('../../config').getWork
const isfollow = require('../../config').isfollow
const follow = require('../../config').follow
const unfollow = require('../../config').unfollow
const app = getApp()
Page({
  data:{
    productList:['','','',''],
    orderRule:['时间最新', '点赞最多'],
    index:1,
    userInfor:{},
    isme:false
  },
  onLoad(option){
    var that = this
    var id = option.id
    console.log(id , app.globalData.openid)
    if(id == app.globalData.openid){
      this.setData({
        isme:true
      })
    }
    this.setData({
      id:id
    })
    wx.request({
      url:isfollow,
      data:{
        user_id:app.globalData.openid,
        follow:id
      },
      methed:'get',
      success:res=>{
        if(res.data.data==1){
          that.setData({
            isfollow:true
          })
        }else{
          that.setData({
            isfollow:false
          })
        }
      }

    })
    wx.request({
      url: getUser,
      data:{
        open_id:id
      },
      methed:'GET',
      success :res => {
        that.setData({
          userInfor:res.data.data[0]
        })
      }
    })
    wx.request({
      url: getWork,
      data:{
        search:1,
        user_id:id,
        online:1
      },
      methed:'GET',
      success :res => {
        that.setData({
          workList:res.data.data
        })
      }
    })
  },
  follow(){
    var that = this
     console.log(this.data.isfollow)
    wx.request({
      url: this.data.isfollow==true?unfollow:follow,
      data:{
        user_id:app.globalData.openid,
        follow:that.data.id
      },
      methed:'get',
      success:res=>{
        var userInfor = that.data.userInfor
        userInfor.fans = that.data.isfollow==true? userInfor.fans -1 :userInfor.fans +1 
        that.setData({
          isfollow:!that.data.isfollow,
          userInfor:userInfor
        })
        
      }

    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    
    this.setData({
      index: e.detail.value
    })
  },
})