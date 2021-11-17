const typeList = require('../../config').typeList
const addWork = require('../../config').addWork
const updateWork = require('../../config').updateWork
const getWork = require('../../config').getWork
const app = getApp()
Page({
  data:{
    jurisdiction:['所有人','所有人'],
    index: 0,
    count:0,
    title:'',
    description:'',
    imglist:[],
    tag:'',//原创1 二次2 其他类型为数据库类型id
    type:0,
    edit:1,
    id:'',
    startdate:'',
    enddate:'',
    winners:0,
    pricestep:0,
    bond:0,
    startprice:0,
    freightflage:0,
    freight:0,
    price:0

  },
  onLoad(options){
    var that = this
    //type:1修改 2原创添加 3原二次创作添加
    
    this.setData({
      id:options.id
    })
    if(options.edit!=undefined){
       this.setData({
        edit:0,
        tag: options.type
      })
    }
    /**
     * 加载作品类型列表
     */
    wx.request({
      url: typeList,
      method: 'GET',
      data: {
      },
      success: function (res) {
        console.log(res.data.data)
        res.data.data.splice(0,2)
        that.setData({
          jurisdiction: res.data.data
        })
      },
      fail: function ({
        errMsg
      }) {
        console.log('submit form fail, errMsg is:', errMsg)
      }
    })

    /**
     * 加载作品信息
     */
   
    if(options.id!=undefined){
      console.log(options.id!=undefined)
    // if(true){
      wx.request({
        url: getWork,
        method: 'GET',
        data: {
          search:1,
          id:options.id,
          // id:10,
          my_open_id:app.globalData.openid
        },
        success: function (res) {
          that.data.jurisdiction.filter(function(element,index,self){
            console.log(element.id , res.data.data[0].tag.split(",")[1]*1)
            if(element.id == res.data.data[0].tag.split(",")[1]*1){
             that.setData({
              index:index,
              tag:res.data.data[0].tag.split(",")[0]*1
             })
              return index
            }
             
          })
          
          res.data.data[0].tag
          that.setData({
            description:res.data.data[0].description,
            title:res.data.data[0].title,
            type:res.data.data[0].type,
            imglist:res.data.data[0].img_list.split(","),
            count:res.data.data[0].count,
           
          })
        }})
    }
   
    
    
  },
  typeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // var tag = this.data.tag
    // tag = tag+','+jurisdiction[e.detail.value].name
    this.setData({
      index: e.detail.value
    })
  },
  countChange:function(e){
    this.setData({
      count: e.detail.value
    })
  },
  descriptionInput:function(e){
    this.setData({
      description: e.detail.value
    })
  },
  titleChange:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  startpriceChange:function(e){
    this.setData({
      startprice: e.detail.value
    })
  },
  priceChange:function(e){
    
    this.setData({
      price: e.detail.value
    })
    console.log(this.data.price)
  },
  bondChange:function(e){
    this.setData({
      bond: e.detail.value
    })
  },
  pricestepChange:function(e){
    this.setData({
      pricestep: e.detail.value
    })
  },
  freightChange:function(e){
    this.setData({
      freight: e.detail.value
    })
  },
  winnersChange:function(e){
    this.setData({
      winners: e.detail.value
    })
  },
  freightflageChange:function(e){
    console.log('in',e)
    this.setData({
      freightflage: this.data.freightflage==1?0:1
    })
  },
  
  addImg(){
    var that = this
    wx.chooseImage({
      count: 1,//限制一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;//注意是数组
        var cos = require("../../utils/cos")
        cos.uploadFile(tempFilePaths[0],function(url){
          var t = that.data.imglist;
          t.push('http://'+url.Location)
          that.setData({
            imglist:t
          })
          console.log(t)
        })
      }
    })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      type:e.detail.value
    })
  },
  deleImg:function(e){
    
    var imgList = this.data.imglist
    imgList.splice(e.currentTarget.dataset.index,1);
    console.log((imgList))
    this.setData({
      imglist:imgList
    })
    console.log((e.currentTarget.dataset.index))
    imgList.splice(e.currentTarget.dataset.index,1);
  },
  submit(){
    var url 
    var that = this
    var tag = this.data.tag + ','+this.data.jurisdiction[this.data.index].id
    console.log(this.data.jurisdiction[this.data.index])
    var data = {
      title:that.data.title,
      user_id:app.globalData.openid,
      type:that.data.type,
      count:that.data.count,
      tag:tag,
      img_list:that.data.imglist.join(),
      description:that.data.description,
      start_time:that.data.startdate==''?null:that.data.startdate,
      end_time:that.data.enddate==''?null:that.data.enddate,
      winners:that.data.winners,
      price_step:that.data.pricestep,
      bond:that.data.bond,
      start_price:that.data.startprice,
      freight_flage:that.data.freightflage,
      freight:that.data.freight,
      price:that.data.price
  }
    if(this.data.edit==0){
      url=addWork
    }else{
      url=updateWork
      data.id= this.data.id
    } 
   
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          jurisdiction:res.data.data
        })
        wx.navigateBack({
          delta: 1
        })

      },
      fail: function ({
        errMsg
      }) {
        console.log('submit form fail, errMsg is:', errMsg)
      }
    })
  },
  bindstartDateChange(e){
    this.setData({
      startdate: e.detail.value
    })
  },
  bindendDateChange(e){
    this.setData({
      enddate: e.detail.value
    })
  }
})