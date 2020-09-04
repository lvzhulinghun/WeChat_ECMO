// pages/warn/index.js
import requestUrl from '../../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      checkBoxes:[],
      radios:"",
      tip:""
  },
  vvniming:function(e){
    this.data.checkBoxes = e.detail.value
  },
    changetongqiTimes:function(e){
        this.data.radios = "机械通气时长:"+e.detail.value;
    },
    changetongqiTimes2:function(e){
      this.data.radios = "急性呼吸诊断:"+e.detail.value;
  },
  
  vvformSubmit(e){
    let that = this
    var age = e.detail.value.age
    var weight = e.detail.value.weight
    var radios = this.data.radios
    var checkBoxInfo = this.data.checkBoxes
    if(checkBoxInfo == ""){
      wx.showToast({
        title: '请选择筛选条件',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
      return
    }
    if(age >= 120){
      wx.showToast({
        title: '请正确0-120岁',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
      return;
    }
    var subInfo = checkBoxInfo +","+ radios+",年龄:"+age+",体重:"+weight;
    requestUrl.requestUrl({//将用户信息传给后台数据库
          url: "/Ecmo/smallPro/warning/subInfo.htm",
          params: {
              openId: wx.getStorageSync('openId'),
              subInfo:subInfo,
              type:2
          }
      }).then((data) => {
          if("200" == data.data.code){
            wx.showModal({
              title: '提示',
              content: '提交成功',
              success (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
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