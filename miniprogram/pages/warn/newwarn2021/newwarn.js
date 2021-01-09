// pages/warn/index.js
import requestUrl from '../../../utils/util.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      lists:[],
      tip:"",
      tag:"",
      optionsV:[]
  },
  getValue:function(e){
    const name = e.target.dataset.name
    if(name != undefined){
      this.data.lists.push(name)
    }
  },
  niming:function(e){
    let values = e.detail.value
    this.data.optionsV = values
    for(var i=0;i<values.length;i++){
      if("1" == values[i]){
        this.data.tag=1;
        this.data.tip = "已选"
        break
      }else if("2" == values[i]){
        this.data.tag=2;
        this.data.tip = "已选"
        break
      }
    }
  },
  
  newwarnformSubmit(e){
    let that = this
    var tip = this.data.tip
    if(tip == ""){
      wx.showToast({
        title: '请选择筛选条件',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
      return
    }

    console.info("选择列表："+this.data.optionsV)
    let values = this.data.optionsV
    for(var i=0;i<values.length;i++){
      if("2" == values[i]){
        this.data.tag=2;
        break
      }
    }
       
    var tag = this.data.tag
    console.info(tag)
    if(tag == 1){
      wx.reLaunch({
         url: '/pages/warn/newwarn2021/newwarn2',
       })
    }else if(tag == 2){
      wx.showModal({
        title: '友情提示',
        content: '患者无ECMO上机指针\n谢谢',
        showCancel:false,
        success(res){
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
          // console.log('用户点击取消')
         }
        }
      })
    }
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