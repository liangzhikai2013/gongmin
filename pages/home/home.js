const app = getApp()
const bannerList = require('../../config').bannerList
const workList = require('../../config').getWork
const operationWork = require('../../config').operationWork
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2','',''],
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    currentSwiper:0,
    bannerList:[],
    workList:[],
    isAllLoaded:false,
    loading:false
  },
  onShow() {
    console.log(this.getTabBar)
    var that = this
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
      
    }
     //获取作品列表
     wx.request({
      url: workList,
      method: 'GET',
      data:{
        my_open_id:app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          workList:res.data.data
        })
      }
    })

  },
  onLoad: function(options) {
    app.userInfoReadyCallback = res => {
      //获取作品列表
    wx.request({
      url: workList,
      method: 'GET',
      data:{
        my_open_id:app.globalData.openid
      },
      success: function (res) {
        console.log(app.globalData.userInfo)
        
        console.log(res.data)
        that.setData({
          workList:res.data.data
        })
      }
    })
    }
    var that = this
    //获取banner
    wx.request({
      url: bannerList,
      method: 'GET',
      success: function (res) {
        console.log()
        that.setData({
          bannerList:res.data.data
        })
      }
    })
  },
  refresh(e){
    console.log('refresh')
    var that = this
    wx.request({
      url: workList,
      method: 'GET',
      data:{
        my_open_id:app.globalData.openid
      },
      success: function (res) {
        that.setData({
          workList:res.data.data
        })
      }
    })
  },
  clickZan(e){
    console.log(e.currentTarget.dataset)
   var that = this
   var state = 1
    if(e.currentTarget.dataset.data.state ==1 ||e.currentTarget.dataset.data.state ==3 )
    state = 3
    wx.request({
      url: operationWork,
      method: 'post',
      data:{
        open_id:app.globalData.openid,
        work_id:e.currentTarget.dataset.data.id,
        state:state
      },
      success: function (res) {
        console.log(e.currentTarget.dataset.index)
        var workList = that.data.workList
        if(state==1){
          workList[e.currentTarget.dataset.index].state = workList[e.currentTarget.dataset.index].state|1
          workList[e.currentTarget.dataset.index].zan ++
        }
        else{
          workList[e.currentTarget.dataset.index].state = workList[e.currentTarget.dataset.index].state&2
          workList[e.currentTarget.dataset.index].zan --
        }
       
        that.setData({
          workList:workList
        })
        
      }
    })
  },
  swiperChange: function(e) {
    // console.log(1)
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  onPullDownRefresh: function() {
 
  },
  onReachBottom: function() {
 
  },
  onShareAppMessage: function() {
 
  }
})