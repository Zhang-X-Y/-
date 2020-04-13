// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: false,
    list: []
  },
  find1: function () {
    this.setData({
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: false
    })

  },
  find2: function () {
    this.setData({
      flag2: true,
      flag1: false,
      flag3: false,
      flag4: false
    })

  },
  find3: function () {
    this.setData({
      flag3: true,
      flag1: false,
      flag2: false,
      flag4: false
    })

  },
  find4: function () {
    this.setData({
      flag4: true,
      flag1: false,
      flag2: false,
      flag3: false
    })

  },
  //搜索页的搜索
  goSearch: function (e) {
    //获取到input的value
    // console.log(e.detail.value)
    var _this = this
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/list?nameLike=' + e.detail.value,
      success: function (res) {
        if (res.data.code == 0) {
          _this.setData({
            list: res.data.data
          })
        } else if (res.data.code == 700) {
          _this.setData({
            list: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.nameLike
    })
    // 接受搜索框传过来的value值
    console.log(options.nameLike)
    let _this = this;
    
    if(options.nameLike){
      wx.request({
        url: 'https://api.it120.cc/yanger/shop/goods/list?nameLike=' + options.nameLike,
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            _this.setData({
              list: res.data.data
            })
          } else if (res.data.code == 700) {
            _this.setData({
              list:[]
            })
          }
        }
      })
    }
    if(options.id){
      wx.request({
        url: 'https://api.it120.cc/yanger/shop/goods/list?categoryId=' + options.id,
        success: function (res) {
          console.log(res)
          _this.setData({
            list: res.data.data
          })
        }
      })
    }
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