const getWork = require('../../config').getWork
const typeList = require('../../config').typeList
const commentList = require('../../config').commentList
const operationWork= require('../../config').operationWork
import { addComment } from '../../config'
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
    action:false,
    my:false,
    // detailInfor:{},
    tagList:[],
    send:false
    
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
  getData(id){
    let that = this;
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
  send(e){
    var that = this
    console.log(e)
    wx.request({
      url: addComment,
      method: 'POST',
      data: {
        open_id:app.globalData.openid,
        work_id:that.data.id,
        comment:e.detail.content
      },
      success: function (res) {

        wx.showToast({
          title:res.data.codeMessage,
          icon: 'none',
          duration: 2000
        })
        wx.request({
          url: commentList,
          method: 'GET',
          data: {
            work_id:that.data.id,
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
      }

      })
  },
  showbottom(){
    this.setData({
      send:false,
    })
  },
  bottomClick(e){
    console.log(e)
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
    
  }
  
})