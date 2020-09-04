// pages/auth.js
import requestUrl from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  startSubmit:function(e){
    const randomCode = e.detail.value.randomCode
    if(randomCode == null || randomCode == ''){
      wx.showToast({
        title: '请输入物品准备码',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 800
      })
      return
    }
    var that = this;
    requestUrl.requestUrl({//将用户信息传给后台数据库
      url: "/Ecmo/smallPro/start/viewGoodsDetailsMapping.htm",
      params: {
          openId: wx.getStorageSync('openId'),
          orderCode:randomCode
      }
  }).then((data) => {
      if("200" == data.data.code){
        let orderCode = data.data.obj
        //跳转到timingView
        wx.navigateTo({
          url:'/pages/startstage/timeView?orderCode='+orderCode
        })

      }else if("201" == data.data.code){
          //跳转到二次检查物品
          let gdsDetails = data.data.obj.goodDetail.gdsDetails
          let gdsLosePart = data.data.obj.goodDetail.gdsLosePart
          let mustWrite = data.data.obj.mustWrite
          let orderCode = data.data.obj.orderCode
          let machineCode = data.data.obj.goodDetail.machineCode
          wx.navigateTo({
            url:'/pages/preparestage/preIndex?gdsDetails='+gdsDetails+"&gdsLosePart="+gdsLosePart+"&mustWrite="+mustWrite+"&orderCode="+orderCode+"&machineCode="+machineCode
          })
      }
      else{
        const errorMsg = data.data.message
        wx.showToast({
          title: errorMsg,
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