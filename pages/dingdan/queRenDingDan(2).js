// pages/queRenDingDan/queRenDingDan.js
var that;
var http=require('../../../com/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:"kuaidi",value:"快递",checked:"true"},
      {name:"daodiaoziqu",value:"到店自取"}
    ],
    list:{},
    text:'',
    text_one:'',
    shu:'',
    show:false,
    radioShow:false,//点击快递还是到店取货
    address:"",
    userName:'',
    telNumber:"",
    address_show:false,//是否有默认收货地址
    arr:[],
    cid:'',
    list_address:{},
    shu:''
  },
  async sub(){//点击提交订单，创建订单
    var num = []; var str='';var obj={}
    this.data.list.forEach(v=>{
    
      v.sku.forEach(item=>{
        str += item.optionId + ":" + item.optionValueId+','
      })
      obj={
        goodsId: that.data.cid,
         number: that.data.shu, 
         propertyChildIds: str,
          logisticsType: 0 
      }
      num.push(obj);
      str="";
    })
    // console.log(str)
    var ding=await http.ding({
      goodsJsonStr: JSON.stringify(num),
      token:wx.getStorageSync('token')
    });
    console.log(ding);
    if(ding.data.code==0){
      wx.navigateTo({
        url: '/backpageA/pages/dingDan/dingDan',
      })
    }
  },
  //点击收货地址，跳转到编辑地址界面
  shouHuo(e){
    wx.navigateTo({
      url: '/backpageD/pages/shouHuoAddress/shouHuoAddress',
    })
  },
  //点击添加收货地址
  add:function(e){
    wx.navigateTo({
      url: "/backpageD/pages/xinZengAddress/xinZengAddress",
    })
  },
  //点击首页跳转
  index: function (e) {
    wx.switchTab({//跳转到某个页面
      url: '/pages/index/index',
    })
  },
  //点击分类跳转
  fen: function (e) {
    wx.switchTab({
      url: '/pages/fen/fen',
    })
  },
  //点击购物车跳转
  shop: function (e) {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  //点击我的跳转
  my: function (e) {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //点击导航，显示或隐藏
  show: function (e) {
    this.setData({
      show: !this.data.show
    })
  },
  //radio点击事件
  radioChange: function (e) {
    this.setData({
      radioShow: !this.data.radioShow
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log('onload')
    that=this;
    // var shu=options.shu;
    // var a=JSON.parse(options.a);
    // var id=options.id;
    // console.log(id);
    // console.log(a);
    //获取本地的商品数据
    // var list=await http.detail({
    //   id:id,
    //   token:wx.getStorageSync('token')
    // });
    // console.log(list);
    // if(list.data.code==0){
    //   that.setData({
    //     list:list.data.data.basicInfo,
    //     arr:a,
    //     liat_one: list.data.data.properties,
    //     cid:id,
    //     shu:shu
    //   })
    // }
  },
   //获取默认地址接口
  mo_address(){
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/default/v2',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            list_address: res.data.data,
            address_show: true
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
 onShow() {
   this.mo_address();//调用默认地址接口
   this.shop_sub();//获取本地数据

  },
  //获取本地要购买的订单
  shop_sub(){
    var shoping=wx.getStorageSync('sj');
    shoping.forEach(v=>{
      that.data.shu = v.number;
      that.data.cid = v.goodsId;
    })
    that.setData({
      list:shoping
    })
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