const app = getApp()
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2','',''],
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    currentSwiper:0
  },
  onLoad: function(options) {
    this.setData({
      advimg: this.data.advImage,
    })
  },
  onShow: function() {
 
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