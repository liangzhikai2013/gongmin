const offline= require('../../config').offline
Component({
  properties: {
    work_id:{
      type:Number,
      value:''
    }
  },
  data:{

  },
  methods:{
    offshelf(){
      var that = this
      wx.showModal({
        title: '确认下架',
        content: '确认下架该商品',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: offline,
              method: 'GET',
              data: {
                id:that.properties.work_id,
              },
              success: function (res) {
                wx.showToast({
                  title: '下架成功',
                  icon: 'success',
                  duration: 2000
                })
                
              }})
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    editinfor(){
    
      wx.navigateTo({
        url: '/pages/release-view/release?type=1&id='+this.properties.work_id,
      })
    }
  }
  
})