
Component({
  properties: {
    m_state:{
      type:Number,
      value:''
    },
    work_id:{
      type:Number,
      value:''
    },
    work_status:{
      type:Number,
      value:''
    },
    user_id:{
      type:String,
      value:''
    }
  },
  data:{

  },
  methods:{
    comment(){
      console.log(this.properties)
      this.triggerEvent("bottomClick",{index:1})
    },
    luckDraw(){
      wx.navigateTo({
        url: '/pages/luck-draw/luck-draw',
      })
    },
    buy(){
      wx.showToast({
        title: '开发中',
        // duration: 0,
        icon: 'none',
        
      })
      // if(this.properties.work_status==4){
      //   this.triggerEvent("bottomClick",{index:3})
      // }
      // else if(this.properties.work_status==2){
      //   wx.navigateTo({
      //     url: '/pages/order-content/order',
      //   })
      // }
      // else{
      //   wx.navigateTo({
      //     url: '/pages/vchat/vchat?friend_id='+this.properties.user_id,
      //   })
      // }
      
    },
    zan(){
      this.triggerEvent("bottomClick",{index:0})
    },
    collect(){
      this.triggerEvent("bottomClick",{index:2})
    }

  }
  
})