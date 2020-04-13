// pages/xiangQin/xiangQin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    flg: false,
    flg_one: false,
    flg_two: false,
    flg_three: false,
    flg_four: false,
    show: false,
    name: "",
    hai: false,
    done: false,
    arr: [],
    arr1: [],
    size1: "",
    size: "",
    num: 1,
    price:"",
    done1:false
  },
  mai(){
    this.setData({
      done1:true
    })
  },
  goumai(){
    var that = this;
    if (this.data.arr && this.data.arr1) {
      if (that.data.size && that.data.size1) {
        var option = [{
          'optionId': that.data.arr.id,
          'optionValueId': that.data.size
        }, {
          'optionId': that.data.arr1.id,
          'optionValueId': that.data.size1
        }]
      } else {
        wx.showToast({
          title: '请将规格填写完整',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    if (this.data.arr && !this.data.arr1) {
      if (that.data.size) {
        var option = [{
          'optionId': that.data.arr.id,
          'optionValueId': that.data.size
        }]
      } else {
        wx.showToast({
          title: '请将规格填写完整',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    wx.navigateTo({
      url: '../dingdan/dingdan?id=' + that.data.list.id + '&number=' + that.data.num + '&sku=' + JSON.stringify(option)
    })
  },
  add: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    var userInfo=wx.getStorageInfoSync("userInfo")
    if (this.data.arr && this.data.arr1) {
      if (that.data.size && that.data.size1) {
        var option = [{
          'optionId': that.data.arr.id,
          'optionValueId': that.data.size
        }, {
          'optionId': that.data.arr1.id,
          'optionValueId': that.data.size1
        }]
      } else {
        wx.showToast({
          title: '请将规格填写完整',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    if (this.data.arr && !this.data.arr1) {
      if (that.data.size) {
        var option = [{
          'optionId': that.data.arr.id,
          'optionValueId': that.data.size
        }]
      } else {
        wx.showToast({
          title: '请将规格填写完整',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    wx.request({
      url: 'https://api.it120.cc/yanger/shopping-cart/add',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        goodsId: that.data.list.id,
        number: that.data.num,
        sku: JSON.stringify(option),
        token: token
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            size: "",
            size1: "",
            num: 1,
            done:false
          })
        }else if(res.data.code==2000){
          wx.showToast({
            title: '请重新登录',
            icon:"none"
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../login/login',
            })
          },1200)
        }
      }
    })
  },
  jia: function() {
    var that = this
    if (this.data.num >= this.data.list.stores) {
      wx.showToast({
        title: '已超过最大库存',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    this.setData({
      num: this.data.num + 1
    })
  },
  jian: function() {
    if (this.data.num <= 1) {
      wx.showToast({
        title: '最少数量为1',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    this.setData({
      num: this.data.num - 1
    })
  },
  // 选择规格
  choice: function() {
    this.setData({
      done: true
    })
  },
  //点击关闭海报
  hai_bi: function(e) {
    this.setData({
      hai: false
    })
  },
  //点击生成海报
  hai: function(e) {
    this.setData({
      hai: !this.data.hai
    })
  },
  //点击首页跳转
  index: function(e) {
    wx.switchTab({ //跳转到某个页面
      url: '/pages/index/index',
    })
  },
  fen: function(e) {
    this.setData({
      size: e.currentTarget.dataset.s
    })
    var that = this;
    this.setData({
      size1: e.currentTarget.dataset.s
    });
    if (this.data.arr && this.data.arr1) {
      var str = that.data.arr.id + ":" + that.data.size + "," + that.data.arr1.id + ":" + that.data.size1;
    }
    if (this.data.arr && !this.data.arr1) {
      var str = that.data.arr.id + ":" + that.data.size
    }
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/price',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        goodsId: that.data.list.id,
        propertyChildIds: str,
        token: token
      },
      success(res) {
        if(res.data.code==0){
          that.setData({
            price:res.data.data.price
          })
        }
      }
    })
  },
  fen1: function(e) {
    var that = this;
    this.setData({
      size1: e.currentTarget.dataset.s
    });
    if (this.data.arr && this.data.arr1) {
      var str = that.data.arr.id + ":" + that.data.size + "," + that.data.arr1.id + ":" + that.data.size1;
    }
    if (this.data.arr && !this.data.arr1) {
      var str = that.data.arr.id + ":" + that.data.size
    }
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/price',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        goodsId: that.data.list.id,
        propertyChildIds: str,
        token: token
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            price: res.data.data.price
          })
        }
      }
    })
  },
  //点击购物车跳转
  shop: function(e) {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  //点击我的跳转
  my: function(e) {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //点击导航，显示或隐藏
  show: function(e) {
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取点击商品传递过来的id的值
    let id = options.id;
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/detail?id=' + id,
      success: function(res) {
        console.log(res);
        that.setData({
          list: res.data.data.basicInfo,
          price: res.data.data.basicInfo.minPrice,
          arr: res.data.data.properties[0],
          arr1: res.data.data.properties[1]
        })
      }
    });
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
    return {
      title: '天使童装',
      path: '/page/xiangQin/xiangQin?name=' + this.data.name,
      desc: this.data.name,
      success: function(res) {
        console.log(res.shareTickets)
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
          },
          complete: function(res) {
            console.log(res)
          }
        })
      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  hidd() {
    this.setData({
      done: false
    })
    this.setData({
      done1: false
    })
  }
})