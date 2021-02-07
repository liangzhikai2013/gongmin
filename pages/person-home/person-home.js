Page({
  data:{
    productList:['','','',''],
    orderRule:['时间最新', '点赞最多'],
    index:1
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})