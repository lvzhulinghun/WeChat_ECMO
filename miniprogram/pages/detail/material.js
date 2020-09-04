// pages/detail/mat.js
import { getMaterialList } from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMaterialList().then(res => {
      this.setData({
        list: res.obj
      })
    }).catch(error => {

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
  redirectDetail(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.list[index];
    wx.navigateTo({
      url: '/pages/preparestage/preIndex?machineCode='+item.machineCode+'&machineName='+item.machineName,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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