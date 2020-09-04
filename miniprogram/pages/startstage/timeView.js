// pages/startstage/timeView.js
import requestUrl from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode:'',
    stageList:[],
  },
  redirecUrl:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  btnCancel:function(e){
      let code = this.data.orderCode
      requestUrl.requestUrl({
        url: "/Ecmo/smallPro/start/cancelOrder.htm",
        params: {
            openId: wx.getStorageSync('openId'),
            code:code
        }
      }).then((data) => {
          if("200" == data.data.code){
            let mess = data.data.message
            wx.showToast({
              title: mess,
              icon: 'success',//当icon：'none'时，没有图标 只有文字
              duration: 2000
            })
            setTimeout(this.redirecUrl,2000)
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
  setDATA:function(stageList){
    
  },
  btnBack:function(e){
      let stageList = this.data.stageList
      let that = this
      let waitDelStage = 0;
      let orderCode = ""
      let index=0
      for(let i =1;i<stageList.length;i++){
         let nowTime = stageList[i].nowTime
         if(nowTime != null && nowTime != ""){
           waitDelStage = stageList[i].startStage
           orderCode = stageList[i].orderCode
           index = i
         }
      }
      if(waitDelStage != 0){
        wx.showModal({
          title: "提示",
          content: "确定重新计时？",
          showCancel: true,
          cancelColor: "#111111",
          confirmColor: '#002bff',
          success: function (res) {
              stageList[index].nowTime=""
              that.setData({
                stageList:stageList
              })
              if (res.confirm) {
                requestUrl.requestUrl({
                  url: "/Ecmo/smallPro/start/backOrder.htm",
                  params: {
                    startStage: waitDelStage,
                    openId: wx.getStorageSync('openId'),
                    code:orderCode
                  }
                  }).then((data) => {
                      if("200" == data.data.code){
                        wx.showToast({
                          title: "OK!",
                          icon: 'success',//当icon：'none'时，没有图标 只有文字
                          duration: 1000
                        })
                        
                      }else{
                        wx.showToast({
                          title: 'Fail!',
                          icon: 'none',//当icon：'none'时，没有图标 只有文字
                          duration: 2000
                        })
                      }
                  }).catch((errorMsg) => {
                    console.error(errorMsg)
                  })
              } else {
                  console.warn("User clicking cancel" + JSON.stringify(res));
              }
          }
        })
        
      }

      
  },
  btnClick:function(e){
      let stage = e.currentTarget.dataset.startstage
      let orderCode = e.currentTarget.dataset.code
      requestUrl.requestUrl({
        url: "/Ecmo/smallPro/start/timeViewStageSub.htm",
        params: {
          startStage: stage,
          openId: wx.getStorageSync('openId'),
          code:orderCode,
        }
    }).then((data) => {
        let stageList = this.data.stageList
        if("200" == data.data.code){
          stageList[stage-1].nowTime= data.data.obj
          this.setData({
            stageList:stageList
          })
        }else{
          let message = data.data.message
          wx.showToast({
            title: message,
            icon: 'none',//当icon：'none'时，没有图标 只有文字
            duration: 1000
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
      this.data.orderCode = options.orderCode
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let orderCode = this.data.orderCode
      requestUrl.requestUrl({//将用户信息传给后台数据库
        url: "/Ecmo/smallPro/start/timingView.htm",
        params: {
            openId: wx.getStorageSync('openId'),
            orderCode:orderCode,
        }
    }).then((data) => {
        if("200" == data.data.code){
          let stageList = data.data.obj
          this.data.stageList = stageList
          this.setData({
            stageList: stageList
          })
        }else{
          wx.showToast({
            title: '出现异常',
            icon: 'none',//当icon：'none'时，没有图标 只有文字
            duration: 2000
          })
        }
    }).catch((errorMsg) => {
      console.error(errorMsg)
    })
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