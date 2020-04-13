// pages/login/login.js
var api = require("../api/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    encryptedData: "",
    iv: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  dgu(e) {
    // 获取用户的资料
    console.log(e.detail);
    this.setData({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    wx.setStorageSync("userInfo", e.detail.userInfo)
    this.login()
  },
  login() {
    var that = this;
    wx.login({
      success(res) {
        console.log(res)
        // 调用封装好的接口
        api.login({
          code: res.code
        }).then((ret) => {
          console.log(ret)
          if (ret.data.code == 10000) {
            that.setLogin();
          } else if (ret.data.data.uid) {
            wx.setStorageSync("token", ret.data.data.token)
            wx.setStorageSync("openid", ret.data.data.openid)
            wx.setStorageSync("uid", ret.data.data.uid)
            wx.redirectTo({
              url: '../home/home'
            })
          }
        })
        // wx.request({
        //   url: 'https://api.it120.cc/yanger/user/wxapp/login',
        //   data:{code:res.code}, 
        //   success(ret){
        //     console.log(ret) 
        //     if(ret.data.code==10000){
        //       that.setLogin();
        //     }else if(ret.data.data.uid){
        //       wx.setStorageSync("token",ret.data.data.token)
        //       wx.setStorageSync("openid", ret.data.data.openid)
        //       wx.setStorageSync("uid",ret.data.data.uid)
        //       wx.redirectTo({
        //         url: '../home/home'
        //       })
        //     }
        //   }
        // })
      }
    })
  },
  // 注册接口
  setLogin() {
    var that = this;
    wx.login({
      success(res) {
        console.log(that.data.iv)
        wx.request({
          url: 'https://api.it120.cc/yanger/user/wxapp/register/complex',
          data: {
            encryptedData: that.data.encryptedData,
            code: res.code,
            iv: that.data.iv
          },
          success(ret) {
            that.login();
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})