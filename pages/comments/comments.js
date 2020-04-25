// pages/comments/comments.js
import { network } from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  onLoad:function(options){
    var that = this;
    this.setData(options);

     //获取详情页节目短评
    this.getComments(1);

  },

  data: {
    start:1,
    count:10
  },

  onItemTabEvent:function(event){
    wx.navigateBack({});
  },

  //获取节目短评
  getComments: function (start) {
    var that = this;
    var id = that.data.id;
    var count = that.data.count;
    if(start > that.data.start){
      that.setData({
        nextLoading:true
      })
    }else{
      that.setData({
        preLoading:true
      })
    }
    network.getItemComments({
      id: id,
      start: start,
      count: count,
      success: function (res) {
        that.setData({
          start:start,
          comments: res.data,
          nextLoading:false,
          preLoading:false
        }),
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },

  //短评翻页，上一页
  onPrePageEvent: function (event){
      var oldStart = this.data.start;
      var count = this.data.count;
      if (oldStart - count > 0) {
        var start = oldStart - count;
        this.getComments(start);
      }
  },

  //短评翻页，下一页
  onNextPageEvent: function (event){
      var start = this.data.start + this.data.count;
      this.getComments(start);
  }


})