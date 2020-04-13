// pages/my/my.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    done:"",
    // left:30+"rpx",
    arr: [{ id: 0, val: '未支付' }, { id: 1, val: '待发货' }, { id: 2, val: '待收货' }, { id: 3, val: '待评价' }, { id: 4, val: '退款/售后' }]
  },
  ding(e){
    console.log(e)
    wx.navigateTo({
      url: '../dingdan1/dingdan1?id='+e.currentTarget.dataset.index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let Token = wx.getStorageSync('token')
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/yanger/user/detail',
      data: {
        token: Token
      },
      success: (res) => {
        console.log(res.data.data.base)
        _this.setData({
          data: res.data.data.base
        })
        if (_this.data.data) {
          _this.setData({
            done: true
          })
        } else {
          _this.setData({
            done: false
          })
        }
      }
    })
  },
  dizhi(){
    wx.navigateTo({
      url: '../di/di',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  Sign() {
    console.log(111)
    wx.clearStorage()
    wx.showToast({
      title: '退出成功',
    })
    setTimeout(function() {
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }, 500)
  },
  log(){
    wx.navigateTo({
      url: '../home/home',
    })
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