// pages/dingdan1/dingdan1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    list:[],
    arr: [{ id: 0, val: '未支付' }, { id: 1, val: '待发货' }, { id: 2, val: '待收货' }, { id: 3, val: '待评价' }, { id: 4, val: '已完成' }],
    num:0,
    list_one:{},
    done:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        num: options.id
      })
    }
  },
  del(e){
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://api.it120.cc/yanger/order/delete',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        token: wx.getStorageSync('token'),
        orderId:e.currentTarget.dataset.index
      },
      success(res){
        if(res.data.code==0){
          that.add()
        }
      }
    })
  },
  dd(e){
    console.log(e)
    var that=this;
    that.setData({
      num: e.currentTarget.dataset.id
    })
    wx.request({
      url: 'https://api.it120.cc/yanger/order/list',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        status: that.data.num,
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            list: res.data.data.orderList,
            list_one: res.data.data.goodsMap,
            done:false
          })
        }else if(res.data.code==700){
          that.setData({
            list:[],
            list_one:{},
            done:true
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
  add(){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/yanger/order/list',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        status: that.data.num,
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            list: res.data.data.orderList,
            list_one: res.data.data.goodsMap,
            done: false
          })
        } else if (res.data.code == 700) {
          that.setData({
            done: true
          })
        }
      }
    })
  },
  onShow: function () {
    this.add()
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