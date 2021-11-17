Page({
  data:{},
  sendmsg(){
    console.log('semnd')
    if(this.data.content==''){
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    this.triggerEvent("send",{content:this.data.content})
    this.setData({
      content: ''
    })
  },
  input:function(e){
    this.setData({
      content: e.detail.value
    })
  },
})