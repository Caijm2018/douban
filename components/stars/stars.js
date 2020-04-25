// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      rate:{
        type:Number,
        value:0,
        observer(newVal,oldVal,changedPath){
          this.updateRate();
        }
      },
      starsize:{
        type:Number,
        value:20
      },
      fontsize:{
        type: Number,
        value:20
      },
      fontcolor:{
        type:String,
        value:"#ccc"
      },
      isText:{
        type:Boolean,
        value:true
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateRate:function(){
      var that = this;
      var rate = that.properties.rate;
      var intRate = parseInt(rate);
      var light = parseInt(intRate / 2);
      var half = parseInt(intRate % 2);
      var gray = 5 - light - half
      var ligths = [];
      var halfs = [];
      var grays = [];
      //高亮星星渲染数组数据
      for (var index = 1; index <= light; index++) {
        ligths.push(index);
      }
      //半高亮星星渲染数组数据
      for (var index = 1; index <= half; index++) {
        halfs.push(index);
      }
      //灰色星星渲染数组数据
      for (var index = 1; index <= gray; index++) {
        grays.push(index);
      }
      //console.log(rate);
      var rateText = rate && rate > 0 ? rate.toFixed(1) : "未评分";
      that.setData({
        lights: ligths,
        halfs: halfs,
        grays: grays,
        rateText: rateText,
      });
    }
  },
  
  lifetimes:{
      attached:function(){
        this.updateRate();
      }
  }


})
