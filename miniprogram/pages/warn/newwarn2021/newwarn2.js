// pages/warn/newwarn2021/newwarn2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    tip:"",
    tag:"",
    comVal1:0.0,
    comVal2:0.0,
    comVal3:0.0,
    comVal4:0.0,
    resultVal:0
  },

  vvniming:function(e){
    let values = e.detail.value
    console.log("出现以下："+values)
    this.data.lists = values
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
  changetongqiTimes:function(e){
    let val = e.detail.value;
    this.data.lists.push(val)
    console.log("radio:"+val)
},
blur_com:function(e){
  console.info(e)
  var sid = e.target.dataset.sid
  console.info("sid"+sid)
  var val = 0
  console.info("isnan:"+isNaN(e.detail.value))
  if(!isNaN(e.detail.value) && e.detail.value != ''){
    val = parseFloat(e.detail.value) 
  }
  if(sid == "com1"){
    this.data.comVal1 = val
  }else if(sid == "com2"){
    this.data.comVal2 = val
  }else if(sid == "com3"){
    this.data.comVal3 = val
  }else if(sid == "com4"){
    this.data.comVal4 =val
  }
  //更新值
  this.setData({
    resultVal : (this.data.comVal1 + this.data.comVal2)*100+this.data.comVal3+this.data.comVal4
  })

},

//提交
newwarn2formSubmit:function(){
    let tais = this
    var resultV = tais.data.resultVal
    var options = tais.data.lists
    var breakOp = false
    console.log("提交："+tais.data.resultVal)
    console.log("选："+tais.data.lists)
    //如果选项中存在“2”，则直接弹出 谢谢
    for(var i=0;i<options.length;i++){
      if("2" == options[i]){
        breakOp = true
        break
      }
    }
    //情况 1：结果≤40或者选第6项（无上述情况）
    if((resultV > 0 && resultV <= 40) || breakOp){
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
    //情况2、大剂量血管活性药物 > 40
    //    或者选择2-5选型 即this.data.lists 存在值，则显示电话联系
    else if(resultV > 40 || options.length > 0){
        wx.showActionSheet({
          itemList: ['请联系省人医体外生命支持中心', '陈旭锋 13915906015', '张华忠 18262636797'],
          success (res) {
          console.log(res.tapIndex)
            if(res.tapIndex == 1){
                  wx.makePhoneCall({
                    phoneNumber: '13915906015',
                  })
            }else if(res.tapIndex == 2){
                  wx.makePhoneCall({
                    phoneNumber: '18262636797',
                  })
            }
          },
          fail (res) {
          console.log(res.errMsg)
          }
        })
    }else{
      wx.showToast({
        title: '请选择或者输入条件值',
        icon: 'none',//当icon：'none'时，没有图标 只有文字
        duration: 2000
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