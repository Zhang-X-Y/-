// pages/shouHuoAddress/shouHuoAddress.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userName: '',
    telNumber: '',
    address: '',
    list: [],//数据
    isMo: false//默认状态
  },
  update(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/dizhi/dizhi?id='+
        e.currentTarget.dataset.id,
    })
  },
  //点击新增收货地址，跳转编辑地址页面
  xinZengAddress(e) {
    wx.navigateTo({
      url: '../dizhi/dizhi',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // mo(){//获取默认地址
  //   wx.request({
  //     url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/default/v2',
  //     method: 'GET',
  //     data: {
  //       token: wx.getStorageSync('token')
  //     },
  //     success(res) {
  //       console.log(res);
  //       if (res.data.code == 0) {
  //         res.data.data.info.aa=true;
  //         that.setData({
  //           list: res.data.data,
  //           isMo: res.data.data.info.aa
  //         })
  //       }
  //     }
  //   })
  // },
  so() { 
    wx.request({
      url: 'https://api.it120.cc/yanger/user/shipping-address/list',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          //默认地址有点问题
          // for (var i = 0; i < res.data.data.length;i++){
          //   res.data.data[i].aa=false;
          //   var aa=res.data.data[0].aa=true;
          // }
          that.setData({
            list: res.data.data
          })
        }else if(res.data.code==700){
          that.setData({
            list:[]
          })
        }
      }
    })
  },
  onLoad: function (options) {
    that = this;
    that.so();
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
    that=this
    that.so();
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