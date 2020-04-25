import { globalUrls } from "urls.js"
const network = {
  //获取电影列表
  getmovielist: function (params) {
    params.tag = "电影";
    this.getitemlist(params);
  },
  //获取电视剧列表
  gettvlist: function (params) {
    params.tag = "电视剧";
    this.getitemlist(params);
  },
  //获取综艺列表
  getshowlist: function (params) {
    params.tag = "综艺";
    this.getitemlist(params);
  },
  //获取动漫列表
  getanimationlist: function (params) {
    params.tag = "动漫";
    this.getitemlist(params);
  },
  
  //根据类型获取列表数据
  getitemlist:function(params){
    var url = globalUrls.doubanApiUrl;
    var page_limit = params.page_limit?params.page_limit:7;
    var tag =  params.tag;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      data: {
        tag: tag,
        sort: "recommend",
        page_limit: page_limit,
        page_start: 0
      },
      success: function (res) {
        var items = res.data.subjects
        var itemslength = items.length;
        var mod =  itemslength % 3;
        if(mod === 2) {
          items.push(null);
        }
        if (params && params.success) {
          params.success(items)
        }
      }
    })

  },

  //获取节目详情数据
  getItemDetail:function(params){
    var url = globalUrls.detailApiUrl;
    var id = params.id;
    wx.request({
      url: url+id,
      header:{
        "Content-Type":"json"
      },
      data:{
        apikey:"0df993c66c0c636e29ecbb5344252a4a"
      },
      success:function(items){
        if (params && params.success) {
          params.success(items)
        }
      }
    })
  },

  //请求获取节目短评数据
  getItemComments:function(params){
    var that = this
    var url = globalUrls.commentsApiUrl;
    var id =  params.id;
    var start = params.start;
    var count = params.count;
    wx.request({
      url: url+id+"/comments",
      header:{
        "Content-Type":"json"
      },
      data:{
        apikey:"0df993c66c0c636e29ecbb5344252a4a",
        start:start,
        count:count,
      },
      success:function(res){
        if (params && params.success) {
          params.success(res);
        }
      }
    })


  },

  //搜索电影
  searchSubjects:function(params){
    var that = this;
    var q = params.q;
    var url = globalUrls.searchSubjectApiUrl;
    wx.request({
      url: url,
      header:{
        "Content-Type":"json"
      },
      data:{
        q:q,
        tag:"movie"
      },
      success:function(res){
        if(params && params.success){
          params.success(res);
        }
      }
    })
  }

}

export {
  network
}