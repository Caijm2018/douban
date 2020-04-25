import { network } from "../../utils/network.js"
// pages/list/list.js
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
      var tag = options.tag;
      wx.showLoading({
        title: '正在加载中...',
      });
      //获取电影列表数据
      if(tag === "电影"){
        network.getmovielist({
          success: function (items) {
            that.setData({
              items: items
            });
            wx.hideLoading();
          },
          page_limit:50
        });
        //获取电视剧列表数据
      }else if(tag === "电视剧"){
        network.gettvlist({
          success:function(items){
            that.setData({
              items:items
            });
            wx.hideLoading();
          },
          page_limit:50
        })
        //获取综艺列表数据
      }else if(tag === "综艺"){
        network.getshowlist({
          success:function(items){
            that.setData({
              items:items
            });
            wx.hideLoading();
          },
          page_limit:50
        })
        //获取动漫列表数据
      }else{
        network.getanimationlist({
          success:function(items){
            that.setData({
              items:items
            }); 
            wx.hideLoading();
          },
          page_limit:50
        })
      }
      wx.setNavigationBarTitle({
        title: tag,
      });
  },

})