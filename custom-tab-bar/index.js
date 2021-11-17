const app = getApp()
const updateUserInfor = require('../config').updateUserInfor
var getUserProfile = require('../utils/util').getUserProfile
Component({
  data: {
    allow:false,
    selected: '',
    color: "#53606f",
    selectedColor: "#2e2e31",
    show:false,
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/images/tabbar/unaction/academic.png",
      selectedIconPath: "/images/tabbar/action/academic.png",
      text: "教学楼"
    }, {
      pagePath: "/pages/partner/partner",
      iconPath: "/images/tabbar/unaction/partner.png",
      selectedIconPath: "/images/tabbar/action/partner.png",
      text: "合伙人"
    }, {
      pagePath: "",
      iconPath: "/images/tabbar/catchfish.png",
      selectedIconPath: "/images/tabbar/catchfish.png",
      text: "摸个鱼"
    }, {
      pagePath: "/pages/notice/notice",
      iconPath: "/images/tabbar/unaction/office.png",
      selectedIconPath: "/images/tabbar/action/office.png",
      text: "教务处"
    }, {
      pagePath: "/pages/my/my",
      iconPath: "/images/tabbar/unaction/card.png",
      selectedIconPath: "/images/tabbar/action/card.png",
      text: "校园卡"
    }]
  },

  attached() {
    
    
  },
  methods: {
    bindGetUserInfo(e){
      console.log(this.data.allow)
      if(e.detail.userInfo==undefined) return
      console.log(e.detail)
      app.globalData.userInfo = e.detail.userInfo
     
      this.setData({
        allow: app.globalData.userInfo.nickName!='微信用户',
      })
   
     console.log(this.data.allow,app.globalData.userInfo.nickName)
      wx.request({
        url: updateUserInfor,
        method: 'POST',
        data: {
          name:e.detail.userInfo.nickName,
          gender: e.detail.userInfo.gender==1?'男':'女',
          avatar:e.detail.userInfo.avatarUrl,
           open_id: app.globalData.openid,
        },
        
      })
    },
    gooriginal(){
       wx.navigateTo({
        url:"/pages/release-view/release?edit=0&type=1"
    })
    this.setData({
      show:false
    })
    },
    gosecond(){
      wx.navigateTo({
        url:"/pages/release-view/release?edit=0&type=2"
   })
   this.setData({
    show:false
  })
   },
    closeshow(){
      this.setData({
        show: false
      })
    },
    show(){
      this.setData({
        show: true
      })
    },
    switchTab(e) {
      console.log(this.data.selected)
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data.text)
      
      
      if(data.text=='摸个鱼'){
        if (!wx.getStorageSync('storage_info')) {
          getUserProfile()
          return
        }
        this.setData({
          show: true
        })
      }
      else{
       
        wx.switchTab({url})
        // this.setData({
        //   selected: data.index
        // })
        console.log(data)
        
      }
      console.log(this.data.selected)
    }
  }
})