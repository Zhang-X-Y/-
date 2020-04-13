// pages/start/start.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },
  go: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Token = wx.getStorageSync('token')
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/yanger/user/detail',
      data: {
        token: Token
      },
      success: (res) => {
        console.log(res)
        if(res.data.code==0){
          _this.setData({
            data: res.data.data.base
          })
        }else if(res.data.code==2000){
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo=wx.getStorageSync("userInfo")
    if(!userInfo){
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})