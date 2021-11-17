
Page({
  data:{
    gender:['男','女'],
    index:0,
    date:'2020-09-01',
    avatar:'/images/default.png'
  },
  uploadImgFile: function() {//打开图库，选择图片
    var that = this
    this.setData({ motto: "选择图片" }),
    wx.chooseImage({
      count: 1,//限制一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;//注意是数组
        console.log(tempFilePaths)
        var cos = require("../../utils/cos")
        cos.uploadFile(tempFilePaths[0],function(url){
          console.log(url.Location)
          that.setData({
            avatar:'http://'+url.Location
          })
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})