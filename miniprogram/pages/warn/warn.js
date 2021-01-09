// pages/warn/index.js
import requestUrl from '../../utils/util.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      lists:[],
      tip:"",
      tag:""
  },
  getValue:function(e){
    const name = e.target.dataset.name
    if(name != undefined){
      this.data.lists.push(name)
    }
  },
  niming:function(e){
    let values = e.detail.value
    for(var i=0;i<values.length;i++){
      if("1" == values[i]){
        this.data.tip = "该患者不适合ECMO治疗"
        break
      }else if("2" == values[i]){
        this.data.tip="该患者考虑进行VA-ECMO治疗"
        this.data.tag=2;
        break
      }else if("3" == values[i]){
        this.data.tip="该患者考虑进行VV-ECMO治疗"
        this.data.tag=3
        break
      }
    }
    },
  
  formSubmit(e){
    let that = this
    // var phone = e.detail.value.phone
    // var names = e.detail.value.names
    var tip = this.data.tip
    if(tip == ""){
      wx.showToast({
        title: '请选择筛选条件',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
      return
    }
    // if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
    //   wx.showToast({
    //     title: '请正确填写手机号码！',
    //     icon: 'none',//当icon：'none'时，没有图标 只有文字
    //     duration: 2000
    //   })
    //   return ;
    // }
    // if(names == undefined ||names == ""){
    //   wx.showToast({
    //     title: '请正确输入医院名称',
    //     icon: 'none',//当icon：'none'时，没有图标 只有文字
    //     duration: 2000
    //   })
    //   return;
    // }
    var tag = this.data.tag
    var listsInfo =this.data.lists
    wx.showModal({
      title: '提示',
      content: this.data.tip,
      cancelText:'不联系',
      confirmText:'联系中心',
      success(res) {
        if (res.confirm) {
          requestUrl.requestUrl({//将用户信息传给后台数据库
                url: "/Ecmo/smallPro/warning/sendSms.htm",
                params: {
                    openId: wx.getStorageSync('openId'),
                    phone:'',
                    names:'',
                    valuesInfo:listsInfo
                }
            }).then((data) => {
              //拨打ecmo中心电话
              wx.makePhoneCall({
                phoneNumber: '13915906015',
              })
                if("200" == data.data.code){
                  wx.showModal({
                    title: '提示',
                    content: '提交成功',
                    success (res) {
                      if (res.confirm) {
                        // wx.reLaunch({
                        //   url: '/pages/index/index',
                        // })
                        if(tag == 2){
                            wx.reLaunch({
                               url: '/pages/warn/VAECMO/va',
                             })
                        }else if(tag == 3){
                          wx.reLaunch({
                            url: '/pages/warn/VVECMO/vv',
                          })
                        }
                      } else if (res.cancel) {
                      }
                    }
                  })
                  // 注意
                }else{
                  wx.showToast({
                    title: '提交失败',
                    icon: 'none',//当icon：'none'时，没有图标 只有文字
                    duration: 2000
                  })
                }
            }).catch((errorMsg) => {
              console.error(errorMsg)
            })
        } else if (res.cancel) {
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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