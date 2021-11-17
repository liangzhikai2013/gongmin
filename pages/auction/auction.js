const getWork = require('../../config').getWork
const typeList = require('../../config').typeList
const commentList = require('../../config').commentList
const operationWork= require('../../config').operationWork
const auctionConfig = require('../../config').auctionConfig
const auctionList = require('../../config').auctionList
const ws = require('../../config').ws

import config, { addComment } from '../../config'
import { timeHandle } from '../../utils/util'
const app = getApp()
Page({
  data: {
    work_status:'',
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    detailImgList:['/images/default.png','/images/default.png'],
    commentList:['',''],
    auctionList:[{name:'111',price:'22'},{name:'111',price:'22'}],
    action:false,
    my:false,
    // detailInfor:{},
    tagList:[],
    send:false,
    offershow:false,
    nowprice:0,
    myprice:0,
    showmore:false,
    shortauctionList:[],
    config:{
      
    }
    
    
  },
  onShow:function (options) {
    let pages = getCurrentPages()
    var curPage = pages[pages.length - 1]; // 当前页面
    this.getData(curPage.data.id)
  },
  onLoad: function (options) {
    let that = this;
    
    // let type   = options.type;//type=1 好友的作品 type=0自己的作品
    let id   = options.id;
    that.setData({
      // my: type==1?false:true,
      id: id,
      work_status:options.status
    });
    this.getData(id)
    
  },
  reducemyprice(){
    
    this.setData({
      // my: type==1?false:true,
      myprice: this.data.myprice*1-this.data.config.price_step,
    });
   
  
  },
  addmyprice(){
    this.setData({
      // my: type==1?false:true,
      myprice: this.data.myprice*1+this.data.config.price_step,
    });
  },
  getData(id){
    console.log('id',id)
    let that = this;
    wx.request({
      url: auctionList,
      method: 'GET',
      data: {
        work_id:id
      },
      success: function (res) {
        that.setData({
          auctionList:res.data.data,
          
        })
        if(res.data.data.length>0){
          that.setData({
          nowprice:res.data.data[0].price,
          myprice:res.data.data[0].price,
        })
        }
        that.setData({
          shortauctionList:res.data.data.slice(0,1)
        })
      }
    })
    wx.request({
      url: auctionConfig,
      method: 'GET',
      data: {
        work_id:id
      },
      success: function (res) {
        that.setData({
          config:res.data.data[0],
        })
        if(that.data.nowprice==0){
          that.setData({
            config:res.data.data[0],
            nowprice:res.data.data[0].starting_price,
            myprice:res.data.data[0].starting_price
          })
        }
        console.log(res.data.data[0])
        console.log(that.config)
        that.wssInit()
      }
    })
    wx.request({
      url: commentList,
      method: 'GET',
      data: {
        work_id:id
      },
      success: function (res) {
        console.log(res.data.data.length)
        for(var i = 0;i< res.data.data.length;i++){
          console.log(new Date(res.data.data[i].time).getTime())
          res.data.data[i].time = timeHandle(new Date(res.data.data[i].time).getTime() )
          console.log(res.data.data[i].time )
        }
        that.setData({
          commentList:res.data.data
        })
      }
    })
    wx.request({
      url: getWork,
      method: 'GET',
      data: {
        search:1,
        my_open_id:app.globalData.openid,
        id:id
      },
      success: function (res) {
        if(res.data.data[0].user_id == app.globalData.openid){
          that.setData({
            my:true
          })
        }
        that.setData({
          detailImgList:res.data.data[0].img_list.split(","),
          detailInfor:res.data.data[0]
        })
        var detailInfor= res.data.data[0]
        wx.request({
          url: typeList,
          method: 'GET',
          success: function (res) {
            
            var tagList = res.data.data
            var tags=[]
            console.log(that.data.detailInfor)
            detailInfor.tag.split(",").forEach(t => {
              tagList.forEach(i => {
                if(t==i.id){
                  tags.push(i.name)
                }
              })
            });
            that.setData({
              tagList:tags
            })
            console.log(tags)
          }})
      }})
  },
  showToast(res){
    
  },
  send(e){
    
    var that = this
    wx.request({
      url: addComment,
      method: 'POST',
      data: {
        open_id:app.globalData.openid,
        work_id:that.data.id,
        comment:e.detail.content
      },
      success: function (res) {
        var res = res.data
        that.showToast(res.codeMessage)
        wx.request({
          url: commentList,
          method: 'GET',
          data: {
            work_id:that.data.id,
          },
          success: function (res) {
           
            for(var i = 0;i< res.data.data.length;i++){
              console.log(new Date(res.data.data[i].time).getTime())
              res.data.data[i].time = timeHandle(new Date(res.data.data[i].time).getTime() )
              console.log(res.data.data[i].time )
            }
            that.setData({
              commentList:res.data.data
            })
           
          }
        })
      }

      })
  },
  showbottom(){
    this.setData({
      send:false,
    })
  },
  back(){
    console.log(222)
    this.setData({
      offershow:false,
    })
    
  },
  //确认出价
  submitOffer(){
    var that = this
    if(this.data.myprice > this.data.nowprice){
      wx.sendSocketMessage({
        data:that.data.myprice
      })
      this.back()
    }
    else
    wx.showToast({
      title: '出价小于当前价格',
      icon: 'none'
    })
  },
  //点赞评论收藏
  bottomClick(e){
    console.log(e)
    //拍卖
    if(e.detail.index==3){
      wx.request({
        url: auctionConfig,
        method: 'GET',
        success: function (res) {

        }
      })
      this.setData({
        offershow:true
      })
    }
    if(e.detail.index==1){
      this.setData({
        send:true
      })
    }
    //点赞
    if(e.detail.index==0){
      var that = this
   var state = 1
   
    if(this.data.detailInfor.state ==1 ||this.data.detailInfor.state ==3 )
    state = 3
    wx.request({
      url: operationWork,
      method: 'post',
      data:{
        open_id:app.globalData.openid,
        work_id:this.data.detailInfor.id,
        state:state
      },
      success: function (res) {
        var detailInfor = that.data.detailInfor
        if(state==1){
          detailInfor.state =detailInfor.state|1
        }
        else{
          detailInfor.state = detailInfor.state&2
        }
        that.setData({
          detailInfor:detailInfor
        })
      }
    })
    }
     //收藏
     if(e.detail.index==2){
      var that = this
   var state = 2
    if(this.data.detailInfor.state ==2 ||this.data.detailInfor.state ==3 )
    state = 4
    wx.request({
      url: operationWork,
      method: 'post',
      data:{
        open_id:app.globalData.openid,
        work_id:this.data.detailInfor.id,
        state:state
      },
      success: function (res) {
        var detailInfor = that.data.detailInfor
        if(state==2){
          detailInfor.state =detailInfor.state|2
        }
        else{
          detailInfor.state = detailInfor.state&1
        }
        that.setData({
          detailInfor:detailInfor
        })
      }
    })
    }
    
  },
  //更多的出价记录
  morePrice(){
    this.setData({
      showmore:!this.data.showmore
    })
  },
  wssInit() {
    var that = this;
    //建立连接
    wx.connectSocket({
        url: ws+'?workid='+that.data.id+'&my='+app.globalData.openid+'&type=auction&hourse='+this.data.config.hourse_id//app.appData.socket
    })
    //监听WebSocket连接打开事件。
    wx.onSocketOpen(function(res) {
        console.log('WebSocket连接已打开！');
        that.setData({
            socket_open: true
        });
    });
    //监听WebSocket接受到服务器的消息事件。
    wx.onSocketMessage(function(res) {
        console.log('收到服务器内容：', res);
        // var server_msg = JSON.parse(res.data);
        // console.log(server_msg);
        if (res.data != null) {
          that.setData({
            nowprice:res.data*1,
            myprice:res.data*1,
          })
          wx.request({
            url: auctionList,
            method: 'GET',
            data: {
              work_id:that.data.id
            },
            success: function (res) {
              that.setData({
                auctionList:res.data.data,
              })
              if(res.data.data.length>0){
                that.setData({
                nowprice:res.data.data[0].price,
                myprice:res.data.data[0].price,
              })
              }
              that.setData({
                shortauctionList:res.data.data.slice(0,1)
              })
            }
          }) 
            
        }
    });
    //监听WebSocket错误。
    wx.onSocketError(function(res) {
        console.log('WebSocket连接打开失败，请检查！', res)
    });

},
  
})