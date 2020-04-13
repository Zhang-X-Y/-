
function api(url,methods,data){
  return new Promise(function(resolve,reject){
    wx.request({
      url: 'https://api.it120.cc/yanger' + url,
      method: methods,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,
      success(res) {
        resolve(res)
      }
    })
  })
}
// 注册接口
function login(data){
  return api("/user/wxapp/login","get",data)
}

module.exports.login = login;
