// packageD/pages/updateress/updateress.js
var Api = require("../../../test/test")
var _self, Token;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['是','否'],
    data: [],
    ID: '',
    // 名字
    userName: '',
    // 电话
    userMobile: '',
    // 邮编
    userDistrictId: '',
    // 所在地区
    region1: '',
    regio2: '',
    regio3: '',
    // 详细地址
    userAddress: '',
    // 默认地址
    userIsDefault: '',
    userDefault:true,
    userCityId:'',//用户城市id
    userCityName:'',//用户城市名称
    userProvinceId:'',//省 ID
    userCityId:'',//城市ID
    userDistrictId:''//县区ID
  },
    // 默认地址
    bindPickerChange: function(e) {
      _self.setData({
        userIsDefault:''
      })
      console.log(e.detail.value)
      if(e.detail.value==0){
        _self.data.userDefault=true
      }else if(e.detail.value==1){
        _self.data.userDefault=false
      }
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
  //  城市
  bindRegionChange: function (e) {
    _self.setData({
      region1: '',
      regio2: '',
      regio3: '',
    })
    console.log(e)
    this.setData({
      region: e.detail.value,
      // 城市ID
      userCityId: e.detail.code,
      // 城市名称
      userCityName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    _self = this;
    Token = wx.getStorageSync('token')
    _self.setData({
      ID: options.id
    })
    _self.detail()

  },
  // 请求某个具体的收货地址
  async detail(data) {
    var res = await Api.Detailress({
      id: _self.data.ID,
      token: Token
    })
    console.log(res.data.data.info)
    var date = res.data.data.info
    _self.setData({
      // 名字
      userName: date.linkMan,
      // 电话
      userMobile: date.mobile,
      // 邮编
      userDistrictId: date.code,
      // 所在地区名称
      region1: date.provinceStr,
      regio2: date.cityStr,
      regio3: date.areaStr,
      // 所在地区对应ID
      userProvinceId:date.provinceId,
      userCityId:date.cityId,
      userDistrictId:date.districtId,
      // 详细地址
      userAddress: date.address,
    })
    if(date.isDefault==true){
      _self.setData({
        userIsDefault: "是",
        userDefault:true
      })
    }else{
      _self.setData({
        userIsDefault: "否",
        userDefault:false
      })
    }
  },
    //用户名
    userNameInput(e){
      _self.setData({
        userName: e.detail.value
      })
      console.log( e.detail.value)
    },
    //用户手机号
    userPhoneInput(e){
      _self.setData({
        userMobile: e.detail.value
      })
      console.log( e.detail.value)
    },
    //用户编码
    userCodeInput(e){
      _self.setData({
        userDistrictId: e.detail.value
      })
      console.log( e.detail.value)
    },
    //用户详细地址
    userDetailsInput(e){
      _self.setData({
        userAddress: e.detail.value
      })
      console.log( e.detail.value)
    },
    async add(){
      console.log(_self.data.userName)//联系人
      console.log(_self.data.userMobile)//手机号码
      console.log(_self.data.userDistrictId)//邮政编码
      console.log(_self.data.userAddress)//详细地址
      console.log(_self.data.userCityId)
      console.log(_self.data.userCityName)
      // console.log(_self.data.userName)
      if(_self.data.region1==''||_self.data.regio2==''||_self.data.regio3==''){
        var res =await await Api.Updateress({
          linkMan:_self.data.userName,//联系人
          mobile:_self.data.userMobile,//手机号码
          code:_self.data.userDistrictId,//邮政编码
          isDefault:_self.data.userDefault,//是否为默认地址
          address:_self.data.userAddress,//详细地址
          provinceId:_self.data.userCityId[0],//所属省份市编码
          cityId:_self.data.userCityId[1],//所属城市编码
          districtId:_self.data.userCityId[2],//所属区县编码
          id:_self.data.ID,//修改的记录ID
          token:Token
        })
        console.log(res)
        if(res.data.code == 0){
          wx.showToast({
            title: '修改成功',
          })
          wx.navigateTo({
            url: '/packageD/pages/adminaddress/adminaddress',
          })
        }
        }else{
          var res =await await Api.Updateress({
            linkMan:_self.data.userName,//联系人
            mobile:_self.data.userMobile,//手机号码
            code:_self.data.userDistrictId,//邮政编码
            isDefault:_self.data.userDefault,//是否为默认地址
            address:_self.data.userAddress,//详细地址
            provinceId:_self.data.userProvinceId,//所属省份市编码
            cityId:_self.data.userCityId,//所属城市编码
            districtId:_self.data.userDistrictId,//所属区县编码
            id:_self.data.ID,//修改的记录ID
            token:Token
          })
          console.log(res)
          if(res.data.code == 0){
            wx.showToast({
              title: '修改成功',
            })
            wx.navigateTo({
              url: '/packageD/pages/adminaddress/adminaddress',
            })
          }
        }
    },
    cancel(){
      wx.showToast({
        title: '取消修改',
      })
      wx.navigateTo({
        url: '/packageD/pages/adminaddress/adminaddress',
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