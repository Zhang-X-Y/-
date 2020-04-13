//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    str:"",
    arr:[],
    list: [],
    pageNum:1,
    pagesIze:4,
    id:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img: [{
      img: "../images/qqq.png"
    }],
    array: [
    ],
    bnrUrl: [
    ],
    arr: ["../images/u=2177155819,1095680365&fm=26&gp=0.jpg", "../images/u=3383371103,163335880&fm=26&gp=0.jpg", "../images/u=2177155819,1095680365&fm=26&gp=0.jpg", "../images/u=3383371103,163335880&fm=26&gp=0.jpg"]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  search:function(){
    var that=this;
    wx.navigateTo({
      url: '../serch/serch?nameLike='+that.data.str
    })
  },
  tiao:function(){
    wx.navigateTo({
      url: '../xiang/xiang'
    })
  },
  fen:function(event){
    wx.navigateTo({
      url: '../serch/serch?id='+event.currentTarget.dataset.s
    })
    this.setData({
      id: event.currentTarget.dataset.s
    })
  },
  getSearchInput:function(e){
    this.setData({
      str: e.detail.value
    })
  }, 
   onLoad: function() {
    var that = this;
    // 商品列表数据
    wx.request({
      url: 'https://api.it120.cc/yanger//shop/goods/list?page=' +that.data.pageNum+ '&pageSize=' + that.data.pagesIze,
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.data
        })
      }
    })
    // 轮播图部分请求数据
    wx.request({
      url: 'https://api.it120.cc/yanger/banner/list',
      success: function(res) {
        console.log(res)
        that.setData({
          bnrUrl: res.data.data
        })
      }
    })

    // 分类部分渲染
    wx.request({
      url: 'https://api.it120.cc/yanger/shop/goods/category/all',
      success:function(res){
        console.log(res)
        var obj=[{id:0,name:"全部"}]
        for(var i=0;i<res.data.data.length;i++){
          obj.push(res.data.data[i])
        }
        that.setData({
          array:obj
        })
      }
    })
    // 公告部分渲染
    wx.request({
      url: 'https://api.it120.cc/yanger/notice/list',
      success:function(res){
        console.log(res)
        that.setData({
          arr:res.data.data
        })
      }
    })
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  onShow:function(){
  
  },
  onReachBottom(){
    wx.showLoading({
      title: '加载中...',
    })
    // 改变this指向
    var _that = this;
    var num = _that.data.pageNum += 1
    _that.setData({
      jiazai: '加载中...'
    })
    wx.request({
      url: 'https://api.it120.cc/yanger//shop/goods/list?page=' + num + '&pageSize=' + _that.data.pagesIze,
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          // res.data.data.sort(function (a, b) {
          //   return a.id - b.id;
          // });
          var data = _that.data.list.concat(res.data.data)
          _that.setData({
            list: data
          })
          wx.hideLoading();
          _that.setData({
            jiazai: '加载更多...'
          })
          return false;
        } else if (res.data.code == 700) {
          wx.hideLoading();
          _that.setData({
            jiazai: res.data.msg
          })
        }
      }
    })
  }
})