// pages/xinZengAddress/xinZengAddress.js
var address = require("../Module/city(1).js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userName: "",
    telNumber: "",
    address: '',
    list: [],
    region: ["省", "市", "县"],
    customItem: '请选择地区',
    code: [],
    edit: false,
    userId: '',
    areaStr:"",
    provinceStr:"",
    cityStr:"",
    ismo:false
  },
  //选择地区
  bindRegionChange: function(e) {
    console.log(e)
    this.setData({
      region: e.detail.value,
      code: e.detail.code
    })
  },
  //点击保存
  baoCun(e) {
    let that = this;
    var userName = this.data.userName;
    var mobile = this.data.telNumber;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'succes',
        duration: 1000,
        mask: true
      })

      return false
    } else if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
      })

      return false
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var nn = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      wx.request({
        url: 'https://api.it120.cc/yanger/user/shipping-address/add',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          address: that.data.address,
          linkMan: userName,
          mobile: mobile,
          provinceId: that.data.code[0],
          cityId: that.data.code[1],
          districtId: that.data.code[2],
          token: wx.getStorageSync('token')
        },
        success(res) {
          console.log(res);
          // 路由返回上一级
          if (res.data.code == 0) {
            wx.navigateBack({});
          }
        }
      })
    }
  },
  //详细地址
  address(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //输入手机号
  number(e) {
    this.setData({
      telNumber: e.detail.value
    })
  },
  //输入姓名
  name(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var id = options.id;
    if (id) {
      wx.request({
        url: 'https://api.it120.cc/yanger/user/shipping-address/detail/v2',
        data: {
          id: id,
          token: wx.getStorageSync('token')
        },
        success(res) {
          console.log(res);
          if (res.data.code == 0) {
            that.data.region=[];
            that.data.code=[]
            that.data.region.push(res.data.data.info.provinceStr)
            that.data.region.push(res.data.data.info.cityStr)
            that.data.region.push(res.data.data.info.areaStr)
            that.data.code.push(res.data.data.info.provinceId)
            that.data.code.push(res.data.data.info.cityId)
            that.data.code.push(res.data.data.info.districtId)
            that.setData({
              userName: res.data.data.info.linkMan,
              telNumber: res.data.data.info.mobile,
              address: res.data.data.info.address,
              // provinceStr: res.data.data.info.provinceStr,
              // cityStr: res.data.data.info.cityStr,
              // areaStr: res.data.data.info.areaStr,
              region:that.data.region,
              code:that.data.code,
              edit: true,
              userId: res.data.data.info.id,
              ismo: res.data.data.info.isDefault
            })
          }
        }
      })
    }
    
  },
  // 修改事件
  updata(){
    var that=this
    wx.request({
      url: 'https://api.it120.cc/yanger/user/shipping-address/update',
      method:"post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        address:that.data.address,
        id:that.data.userId,
        linkMan:that.data.userName,
        mobile: that.data.telNumber,
        provinceId: that.data.code[0],
        cityId: that.data.code[1],
        districtId: that.data.code[2],
        token:wx.getStorageSync('token'),
        isDefault:that.data.ismo
      },
      success(res){
        if(res.data.code==0){
          wx.showToast({
            title: '修改成功',
            icon: "success",
            duration: 1200
          })
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 1200)
        }
      }
    })
  },
  // 删除收货地址
  del(){
    var that=this;
    wx.request({
      url: 'https://api.it120.cc/yanger/user/shipping-address/delete',
      method:"post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        id:that.data.userId,
        token:wx.getStorageSync('token')
      },
      success(res){
        if(res.data.code==0){
          wx.showToast({
            title: '删除成功',
            icon:"success",
            duration: 1200
          })
          setTimeout(function(){
            wx.navigateBack({
            })
          },1200)
        }
      }
    })
  },
//  设置为默认收货地址
  mo(){
    var that = this;
    that.setData({
      ismo:true
    })
    
    wx.showToast({
      title: '设置默认地址成功',
      icon: "none",
      duration: 1200
    })
    // wx.request({
    //   url: 'https://api.it120.cc/yanger/user/shipping-address/update',
    //   method: "post",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   data:{
    //     id: that.data.userId,
    //     token: wx.getStorageSync('token'),
    //     isDefault:that.data.ismo
    //   },
    //   success(res){
    //     if(res.data.code==0){
    //       wx.showToast({
    //         title: '设置默认地址成功',
    //         icon: "none",
    //         duration: 1200
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad();
    // this.bindRegionChange()
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