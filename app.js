// app.js
const openIdUrl = require('./config').openIdUrl
const addUser = require('./config').addUser
const updateUserInfor = require('./config').updateUserInfor

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: openIdUrl,
          data: {
            code: res.code
          },
          success: function(res) {
            console.log('拉取openid成功', res.data)
            self.globalData.openid = res.data.data.openid
            // self.globalData.hasLogin = true
            wx.request({
              url: addUser,
              method: 'POST',
              data: {
                open_id: res.data.data.openid,
              }
            })
            wx.getSetting({
              success: res => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      self.globalData.userInfo = res.userInfo
                      console.log(res)
                      wx.request({
                        url: updateUserInfor,
                        method: 'POST',
                        data: {
                         
                          name:res.userInfo.nickName,
                          gender: res.userInfo.gender==1?'男':'女',
                          avatar:res.userInfo.avatarUrl,
                          open_id: self.globalData.openid,
                        }
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (self.userInfoReadyCallback) {
                        self.userInfoReadyCallback(res)
                      }
                    }
                  })
                }
              }
            })
            
          },
          fail: function(res) {
            console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
           
          }
        })
      }
    })
    wx.loadFontFace({
      family: 'PingFang SC',
      source: 'url("/font/PingFang.ttc")',
      success: console.log
    })
    // 获取用户信息
    // wx.getUserInfo({
    //   success: res => {
    //     this.globalData.userInfo = res.userInfo
    //   }
    // })
   
  },
  
  globalData: {
    userInfo: null,
    hasAuth: false,
    openid: null,
    language: "zh_CN"
  },
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
         
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  // 登录
})