// pages/form/index.js
import requestUrl from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    uncheckArr:[],
    uncheckString:[],
    checkedArr:[],
    gdsDetails:[],
    gdsLosePart:[],
    machineCode:'',
    machineName:'',
    mustWrite:'',
    orderCode:'',
  },
  forDG(childList){
    if (childList.child.length > 0) {
      for (let i = 0; i < childList.child.length; i++) {
        this.forDG(childList.child[i]);
      }
    }else{
      if(childList.selected == false){
          this.data.uncheckString.push(childList.name)
          let ss = childList.parentCode+"-"+childList.code+"-"+childList.name
          this.data.uncheckArr.push(ss)
      }else{
        this.data.checkedArr.push(childList.code)
      }
    }
  },
  submit:function(e){
      const list = this.data.dataList[0]
      this.data.uncheckArr=[]
      this.data.uncheckString=[]
      this.data.checkedArr = []
      this.forDG(list)
     
      if(this.data.checkedArr.length == 0){
        wx.showToast({
          title: '请选择物品！',
          icon: 'none',//当icon：'none'时，没有图标 只有文字
          duration: 2000
        })
        return
      }
      let uncheckString = this.data.uncheckString
      let uncheckArr = this.data.uncheckArr
      let dataList = this.data.dataList
      let machineCode = this.data.machineCode
      let mustWrite = this.data.mustWrite
      let that = this
      if(uncheckString.length > 0 ){
        wx.showModal({
          title: "未选择项",
          content: uncheckString.join("\r\n"),
          showCancel: true,
          cancelText: "取消",
          cancelColor: "#111111",
          confirmText: "确定",
          confirmColor: "#002bff",
          success: function(res) {
            if (mustWrite == "yes") {
              return
            }
            if (res.confirm) {
              requestUrl.requestUrl({//将用户信息传给后台数据库
                url: "/Ecmo/smallPro/saveEcmoMapping.htm",
                params: {
                    openId: wx.getStorageSync('openId'),
                    info:encodeURI(JSON.stringify(dataList)),
                    machineCode:machineCode,
                    unchecked:encodeURI(JSON.stringify(uncheckArr))
                }
              }).then((dataObj) => {
                let orderCode =dataObj.data.obj.orderCode
                that.data.orderCode = orderCode
                let status = dataObj.data.obj.status
                if("200" == dataObj.data.code){
                  wx.showModal({
                    title: "提交成功",
                    content: "准备码：" + orderCode,
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#111111",
                    confirmText: "确定",
                    confirmColor: "#247CF0",
                    complete: function(res) {
                        wx.reLaunch({
                          url:'/pages/index/index'
                        })
                        // if (status == "1") {
                        //     // window.location.href = ajaxUrl.timingViewUrl
                        // } else {
                        //     if (status == "0") {
                        //         // window.location.href = ajaxUrl.startViewUrl
                                
                        //     }
                        // }
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


          }else{

          }
        }
      })
    }
    else{
      let orderCode = this.data.orderCode
      let url = ''
      if(orderCode != null && orderCode != undefined && orderCode != ''){
        url = "/Ecmo/smallPro/saveEcmoMapping.htm?orderCode="+orderCode
      }else{
        url = "/Ecmo/smallPro/saveEcmoMapping.htm"
      }
      requestUrl.requestUrl({
        url: url,
        params: {
            openId: wx.getStorageSync('openId'),
            info:encodeURI(JSON.stringify(dataList)),
            machineCode:machineCode,
            unchecked:encodeURI(JSON.stringify(uncheckArr))
        }
      }).then((dataObj) => {
        if("200" == dataObj.data.code){
          //第二次
          if (mustWrite == "yes") {
            wx.showToast({
              title: 'OK!',
              icon:'success',
              duration:2000
            })
            setTimeout(this.setRedirecTo,2000)
          }else{
            //第一次
            let orderCode =dataObj.data.obj.orderCode
            wx.showModal({
              title: "提交成功",
              content: "准备码：" + orderCode,
              showCancel: true,
              cancelText: "取消",
              cancelColor: "#111111",
              confirmText: "确定",
              confirmColor: "#247CF0",
              complete: function(res) {
                  wx.reLaunch({
                    url:'/pages/startstage/timeView?orderCode='+orderCode
                  })
                  
              }
            })
          }
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
    }
  },
  setRedirecTo:function(){
    let orderCode  = this.data.orderCode
    wx.reLaunch({
      url: '../../pages/startstage/timeView?orderCode='+orderCode,
      // url:'/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.machineCode = options.machineCode
      this.data.machineName = options.machineName
      //二次检验
      if(options.gdsDetails != null){
        this.data.gdsDetails = JSON.parse(options.gdsDetails)
      }
      //缺失部分
      this.data.gdsLosePart = options.gdsLosePart
      //二次校验必须填满才可以
      this.data.mustWrite = options.mustWrite
      //二次需要订单号
      this.data.orderCode = options.orderCode
  },
  handleSelect(e) {
    let key = e.currentTarget.dataset.item.key
    let keys = key.split('-');
    let list = this.data.dataList;
    for (let k = 0; k < keys.length; k++) {
      if (list instanceof Array) {
        list = this.getItem(list, keys[k]);
      } else {
        list = this.getItem(list.child, keys[k]);
      }
    }
    this.setSeleted(list, !list.selected);
    this.setData({
      list: this.data.list
    })
  },
  setSeleted(list, value) {
    list.selected = value;
    if (list.child.length > 0) {
      for (let i = 0; i < list.child.length; i++) {
        this.setSeleted(list.child[i], value);
      }
    }
  },
 
  handleUnfold(e) {
    let key = e.currentTarget.dataset.item.key
    let keys = key.split('-');
    let list = this.data.dataList;
    for (let k = 0; k < keys.length; k ++) {
      if (list instanceof Array) {
        list = this.getItem(list, keys[k]);
      }else {
        list = this.getItem(list.child, keys[k]);
      }
    }
    list.unfold = !list.unfold;
    this.setData(
      {
        list: this.data.dataList
      }
    );

  },
  getItem(list, index) {
    return list[index];
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let gdsDetails  = this.data.gdsDetails
    if(gdsDetails.length > 0){
          let gdsLosePart = JSON.parse(this.data.gdsLosePart)
          var uncheckString = new Array();
          for(let i=0;i<gdsLosePart.length;i++){
            let info = gdsLosePart[i]
            uncheckString.push(info.substr(info.lastIndexOf("-") + 1));
          }  
          wx.showModal({
            title: "请补充一下物品",
            content: uncheckString.join("\r\n"),
            showCancel: true,
            cancelColor: "#111111",
            confirmColor: '#247CF0',
            success: function (res) {
                if (res.confirm) {
                    //保存对应json对应关系
                } else {
                    console.warn("User clicking cancel" + JSON.stringify(res));
                }
            }
          })
          this.data.dataList = gdsDetails
          this.makeKey(this.data.dataList);
          this.setData({
            list: this.data.dataList
          })
    }else{
      const url = "/Ecmo/smallPro/prepareStage_"+this.data.machineCode+"@"+wx.getStorageSync('openId')+".htm"
      requestUrl.requestUrl({
          url: url,
          params:{
            openId:wx.getStorageSync('openId'),
          }
      }).then((data) => {
          if("200" == data.data.code){
            this.data.dataList = data.data.obj
            this.makeKey(this.data.dataList);
            this.setData({
              list: this.data.dataList
            })
          }else{
            wx.showToast({
              title: '物品查询异常',
              icon: 'none',//当icon：'none'时，没有图标 只有文字
              duration: 2000
            })
          }
      }).catch((errorMsg) => {
        console.error(errorMsg)
      })

    }
   
  },
  makeKey(list, key = null) {
    key = key === null ? '' : key + '-'
    for(let i = 0; i< list.length; i++ ) {
      list[i].key = key + i;
      list[i].unfold = true;
      list[i].selected = false;
      if (list[i].child.length > 0) {
        this.makeKey(list[i].child, key + i);
      }
    }
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