// pages/fenlei/fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    array:[],
    id:0
  },
  add(e){
    wx.navigateTo({
      url: '../xiang/xiang?id='+e.currentTarget.dataset.id,
    })
  },
  fen:function(event){
    var _this=this;
    _this.setData({
      id: event.currentTarget.dataset.s
    })
    console.log(_this.data.id)
    // console.log(event.currentTarget.dataset.s)
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/list?categoryId=' +event.currentTarget.dataset.s,
      success: function (res) {
        console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        // res.data.data.sort(function (a, b) {
        //   return a.id - b.id;
        // });
        if (res.data.code==0){
          _this.setData({
            array: res.data.data
          })
        } else if (res.data.code == 700){
          _this.setData({
            array:[]
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 分类部分渲染
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/category/all',
      success: function (res) {
        console.log(res)
        var obj=[{id:0,name:'全部'}]
        if(res.data.code==0){
          for(var i=0;i<res.data.data.length;i++){
            obj.push(res.data.data[i])
          }
        }
        that.setData({
          list: obj
        })
      }
    })
    if(that.data.id==0){
      wx.request({
        url: 'https://api.it120.cc/yanger/shop/goods/list',
        success(res){
          if (res.data.code == 0) {
            that.setData({
              array: res.data.data
            })
          }
        }
      })
    }

    // var _this = this;
    // var j="裤装"
    // wx.request({
    //   url: 'https://api.it120.cc/yanger/shop/goods/list?tagsLike=' +j,
    //   success: function (res) {
    //     console.log(res)
    //     //因为后台接口数据id从大往小 根据id排序
    //     // res.data.data.sort(function (a, b) {
    //     //   return a.id - b.id;
    //     // });
    //     if (res.data.code == 0) {
    //       _this.setData({
    //         array: res.data.data
    //       })
    //     } else if (res.data.code == 700) {
    //       _this.setData({
    //         array: []
    //       })
    //     }
    //   }
    // })
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