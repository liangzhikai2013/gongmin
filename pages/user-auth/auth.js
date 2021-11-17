const addUser = require('../../config').addUser
const app = getApp()
Page({
  data: {
    
    cardImg: '/images/default.png',
    name: '',
    school: '',
    major: '',
    studentNum: '',
    phone: '',
    gender:1,
    grade:1,
    verification: '',
    genderList:['男','女'],
    gradeList:['大一','大二','大三','大四','研一','研二','研三','博士']
  },
  genderChange:function(e){
    this.setData({
      gender:e.detail.value
    })
  },
  gradeChange:function(e){
    this.setData({
      grade:e.detail.value
    })
  },
  auth:function(e){
    console.log(e.detail.value.name)
    var name = e.detail.value.name
    var school = e.detail.value.school
    var major = e.detail.value.major
    var studentNum = e.detail.value.studentNum
    var phone = e.detail.value.phone
    var gender = this.data.gender
    var grade = this.data.grade
    var verification = e.detail.value.verification
    if(name==''||school==''||major==''||studentNum==''
    ||phone==''||gender==''||verification==''||grade==''){
      wx.showToast({
        icon:'none',
        title: '请填写完整信息',
        duration: 3000
      })
      return
    }
    if(this.data.cardImg=='/images/default.png'){
      wx.showToast({
        icon:'none',
        title: '请上传学生证照片',
        duration: 3000
      })
      return
    }
    
    var self = this
    // wx.request({
    //   url: "https://www.icol.net.cn/api/v4/verifycode",
    //   method: 'GET',
    //   data: {
    //     phone: self.data.phone,
    //     code: self.data.verification
    //   },
    //   success: function (res) {
    //     if (res.data.data.code == 200) {
          wx.request({
            url: addUser,
            method: 'POST',
            data: {
              open_id: '',
              name: name,
              school: school,
              gender: self.data.genderList[self.data.gender],
              grade: self.data.gradeList[self.data.grade],
              major: major,
              phone: phone,
              student_num: studentNum,
              card_img:self.data.cardImg,
            },
            success: function (res) {

              // wx.redirectTo({
              //   url: '/pages/home/home'
              // });

            },
            fail: function ({
              errMsg
            }) {
              console.log('submit form fail, errMsg is:', errMsg)
            }
          })
        // } else {
        //   wx.showToast({
        //     title: '验证码错误',
        //     icon: 'success',
        //     duration: 1000,
        //     mask: true
        //   })
        // }
      // }
    // })
  },
  upload(){
    var that = this
    wx.chooseImage({
      count: 1,//限制一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;//注意是数组
        console.log(tempFilePaths)
        var cos = require("../../utils/cos")
        cos.uploadFile(tempFilePaths[0],function(url){
          console.log(url.Location)
          that.setData({
            cardImg:'http://'+url.Location
          })
        })
      }
    })
  }
})