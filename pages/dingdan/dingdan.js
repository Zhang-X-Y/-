// pages/queRenDingDan/queRenDingDan.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: "kuaidi",
        value: "快递",
        checked: "true"
      },
      {
        name: "daodiaoziqu",
        value: "到店自取"
      }
    ],
    list: [],
    text: '',
    text_one: '',
    shu: '',
    show: false,
    address: "",
    userName: '',
    telNumber: "",
    address_show: false,
    arr: [],
    cid: '',
    id: "",
    num: "",
    sku: "",
    list_address: {},
    number:""
  },
  // 提交订单
  app(){
    var that=this;
    var str = ''; var obj = {}; var arr = []; var arr1=[]
    that.data.list.forEach((item,index)=>{
      item.sku.forEach(val=>{
        str += val.optionId + ":" + val.optionValueId + ','
      })
      console.log(str)
      obj={
        goodsId:item.goodsId,
        number: item.number,
        propertyChildIds: str,
        logisticsType: 0 
      }
      arr.push(obj)
      str=""
    })
    wx.request({
      url: 'https://api.it120.cc/yanger/order/create',
      method:"post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        goodsJsonStr:JSON.stringify(arr),
        address:that.data.list_address.address,
        provinceId: that.data.list_address.provinceId,
        cityId: that.data.list_address.cityId,
        districtId:that.data.list_address.districtId,
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
         if(res.data.code==0){
           that.data.list.forEach(item=>{
             wx.request({
               url: 'https://api.it120.cc/yanger/shopping-cart/remove',
               method: 'POST',
               header: {
                 "content-type": "application/x-www-form-urlencoded"
               },
               data: {
                 key: item.key,
                 token: wx.getStorageSync('token')
               },
               success(res) {
                 console.log(res)
               }
             })
           })
          console.log(arr1)
            wx.navigateTo({
              url: '../dingdan1/dingdan1',
            })
         }
      }
    })
  },
  //点击添加收货地址
  add: function(e) {
    wx.navigateTo({
      url: "../di/di",
    })
  },
  shouHuo() {
    wx.navigateTo({
      url: '../di/di',
    })
  },
  //radio点击事件
  // radioChange: function (e) {
  //   this.setData({
  //     radioShow: !this.data.radioShow
  //   })
  //   console.log('radio发生change事件，携带value值为：', e.detail.value)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that = this;
    // console.log(options.number)
    if (options.id) {
      that.setData({
        id: options.id,
        num: options.number,
        sku: options.sku
      })
      console.log(this.data.sku)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    wx.request({
      url: 'https://api.it120.cc/yanger/user/shipping-address/default/v2',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            list_address: res.data.data.info,
            address_show: true
          })
        }
      }
    })


    var ress = wx.getStorageSync('cart')
    this.setData({
      list: ress
    })
    var n=0
    this.data.list.forEach(item=>{
        n+=item.price*item.number      
    })
    this.setData({
      number:n
    })
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