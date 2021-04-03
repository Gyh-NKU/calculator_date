// pages/between.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datefrom:'',
    answer:'',
    month1:[31,28,31,30,31,30,31,31,30,31,30,31],
    month2:[31,29,31,30,31,30,31,31,30,31,30,31],
    days:0,
    items:[ {value: '1', name: '加法',checked: true} , {value: '-1', name: '减法',checked:false},],
    op:1
  },
  bindDateChangefrom: function(e) {
    this.setData({
      datefrom: e.detail.value
    })
  },
  //判断是否为闰年
  ifleapyear:function(year){
    if(( (year%4)===0&&(year%100!=0))||(year%400===0))return true;
    else{
      return false;
    }
  },
  expinput(e){
    //console.log(e.detail.value);
    this.data.days=e.detail.value;
  },
  //获取运算符
  radioChange:function(e){
    this.data.op=parseInt(e.detail.value,10);
   //console.log(this.data.op);
  },
  //计算结果
  getans:function(){
    //获取年月日并将其转化成整数
    let that=this;
    let op=that.data.op,
    days=that.data.days;
    let from=this.data.datefrom;
    let fromyear=parseInt(from[0]+from[1]+from[2]+from[3],10);
    let frommonth=parseInt(from[5]+from[6],10);
    let fromdate=parseInt(from[8]+from[9],10);
    //数天并计算结果
    console.log(op)
    if(op===1)
    while(days--){
      let leap=that.ifleapyear(fromyear)
      fromdate++;
      //console.log(fromdate+' '+frommonth+' '+fromyear);
      if(fromdate===(leap?that.data.month2[frommonth-1]:that.data.month1[frommonth-1])+1){
        fromdate=1;
        frommonth++;
      }
      if(frommonth===13){
        fromyear++;
        frommonth=1;
      }  
    }
    if(op===-1)
    while(days--){
      
      let leap=that.ifleapyear(fromyear)
      fromdate--;
      //console.log(fromdate+' '+frommonth+' '+fromyear);
      if(fromdate===0){
        fromdate=(leap?that.data.month2[frommonth-1]:that.data.month1[frommonth-1]);
        frommonth--;
      }
      if(frommonth===0){
        fromyear--;
        frommonth=12;
      }
      
    }
    that.setData({
      answer:fromyear+'-'+frommonth+'-'+fromdate,
    })
  },
  //将默认值设置为今天
  
  inittime:function(){
    var that=this;
    let date=new Date().getDate();
    if(date < 10)date='0'+date;
    let month=new Date().getMonth()+1;
    console.log(month);
    if(month < 10)month='0'+month;
    that.setData({
      
       datefrom:new Date().getFullYear()+'-'+month+'-'+date,
       dateto:new Date().getFullYear()+'-'+month+'-'+date,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.inittime();    
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