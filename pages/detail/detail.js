// pages/detail/detail.js
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
    var id = options.id;
    //获取节目详情
    network.getItemDetail({
      id:id,
      success:function(res){
        var genres = res.data.genres;
        res.data.genres = genres.join("/");
        var pubdates = res.data.pubdates.join("/");
        res.data.pubdates = pubdates;
        that.setData({
           detail:res.data
        });
      }
    }),

    //获取节目短评
    network.getItemComments({
      id:id,
      start:1,
      count:10,
      success:function(res){
        that.setData({
          comments:res.data
        })
      }
    })
  },

  onShow:function(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  }
})