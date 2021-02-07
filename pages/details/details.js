Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    detailImgList:['/images/default.png','/images/default.png'],
    commentList:['',''],
    action:false,
    my:true
  },
  onLoad: function (options) {
    let that = this;
    let type   = options.type;//type=1 好友的作品 type=0自己的作品
    console.log(type);
    that.setData({
      my: type==1?false:true
    });
  }
  
})