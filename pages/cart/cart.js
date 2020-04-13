// pages/shop/shop.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list_gui: [],
    isLength: false,
    num: null,
    start:"",
    ind:"",
    number:0
  },
  cc(e){
    console.log(e.currentTarget.dataset.index)
    this.data.list[e.currentTarget.dataset.index].active = !this.data.list[e.currentTarget.dataset.index].active
    this.setData({
      list:this.data.list
    })
  },
  dingdan(){
    wx.navigateTo({
      url: '../dingdan/dingdan',
    })

    var that=this;
    var arr=[]
    that.data.list.forEach((item,index)=>{
      if(item.active){
          arr.push(item)
      }
    })
    wx.setStorageSync('cart', arr)
  },
  touchS(e){
    this.setData({
      start: e.touches[0].clientX
    })
    this.setData({
      ind: e.currentTarget.dataset.index
    })
  },
  touchM(e){
    // 获取移动之后的x;
    var move=this.data.start-e.touches[0].clientX;
    console.log(move)
    if(move>0&&move<150){
      // 给当前滑动的元素添加一个left属性
      this.data.list[this.data.ind].left=-move+'rpx'      
    }else if(move>=150){
      this.data.list[this.data.ind].left=-150+'rpx'
    }

    if(move<0){
      this.data.list[this.data.ind].left = 0 + 'rpx'
    }
    this.setData({
      list:this.data.list
    })
  },
  touchE(e){
    console.log(e)
    var end = e.changedTouches[0].clientX;
    if(this.data.start-end>=70){
      this.data.list[this.data.ind].left = -150 + 'rpx'
    } else if (this.data.start - end < 70){
      this.data.list[this.data.ind].left = 0 + 'rpx'   
    }
    this.setData({
      list: this.data.list
    })
  },
  //点击减
  jian(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var key = e.currentTarget.dataset.key;
    var num = that.data.list[index].number;
    if (num > 1) {
      num--;
    }
    // that.setData({
    //   num: num
    // })
    that.sl(key, num);
  },
  //点击+
  jia(e) {
    console.log(e);
    // var num=e.currentTarget.dataset.num;
    var index = e.currentTarget.dataset.index;
    var key = e.currentTarget.dataset.key;
    var num = that.data.list[index].number;
    num++;
    // that.setData({
    //   num:num
    // })
    that.sl(key, num);
  },
  sl(a, b) {
    wx.request({
      url: 'https://api.it120.cc/yanger/shopping-cart/modifyNumber',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        key: a,
        number: b,
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        that.list();//再次渲染到页面中
      }
    })
  },
  //点击删除按钮，删除当前数据
  del(e) {
    console.log(e);
    var index = e.currentTarget.dataset.key;
    wx.request({
      url: 'https://api.it120.cc/yanger/shopping-cart/remove',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        key: [index],
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        that.list();
      }
    })
  },
  //点击跳转到首页
  index(e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  list() {
    wx.request({
      url: 'https://api.it120.cc/yanger/shopping-cart/info',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          res.data.data.items.forEach((item,index)=>{
            item.active=false
          })
          console.log(res.data.data.items)
          that.setData({
            list: res.data.data.items,
            list_gui: res.data.data.items.sku,
            isLength: true,
            num: res.data.data.items
          })
          var number=0;
          that.data.num.forEach((item)=>{
            console.log(item)
            number+=item.number*item.price
          })
          that.setData({
            number:number
          })
        } else if (res.data.code == 700) {
          that.setData({
            list: [],//当删除最后一天数据，让list数组为空，就没有数据渲染了
            isLength: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // that = this;
    that.list();
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