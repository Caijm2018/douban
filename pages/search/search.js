// pages/search/search.js
import { network } from "../../utils/network.js"
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
    var that = this;
    wx.getStorage({
      key:"searched",
      success:function(res){
        var data = res.data;
        that.setData({
          histories:data
        })
      }
    })

  },

  //搜索电影触发的事件
  searchInputEvent:function(event){
    var that = this;
    var value = event.detail.value;
    network.searchSubjects({
        q:value,
        success:function(res){
          that.setData({
            subjects:res.data
          })
        }
    })
  },
  
  //搜索点击跳转
  onItemTabEvent:function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var histories = that.data.histories;
    var isExist = false;
    if(histories){
      for (var i = 0; i < histories.length; i++) {
        var movie = histories[i];
        if(movie.id === id) {
          isExist = true;
          break;
        }
      }
    }
    if(!isExist) {
      if(!histories){
        histories = [];
      }
      histories.push({ id: id, title: title });
      //设置搜索缓存
      wx.setStorage({
        key: "searched",
        data: histories
      })
    }
    //跳转至详情页
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },

  //清除所有的搜索缓存
  clearSearchEvent:function(event){
    var that = this;
    wx.removeStorage({
      key:"searched",
      success:function(){
        that.setData({
          histories:null
        })
      }
    })
  }

})