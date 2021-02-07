Component({
  data: {
    selected: 0,
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
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data.text)
      console.log(this.data.selected)
      
      if(data.text=='摸个鱼'){
        this.setData({
          show: true
        })
      }
      else{
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
     
    }
  }
})