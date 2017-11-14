!function($) {
  var baseUrl = './webapi'
  $.dashboard = {
    totalstatus : function(param, callback, errorCallback) {
      $.ajax({
        url:baseUrl + '/dashboard/totalstatus',
        data:param,
        type:'GET',
        success:function(data){
          if(callback)
            callback(data);
        },
        error:function(data){
          if(errorCallback)
            errorCallback(data);
        }
      })
    },

    totalbuildstatus : function(param, callback, errorCallback) {
      $.ajax({
        url:baseUrl + '/statistics/buildStat',
        data:param,
        type:'GET',
        success:function(data){
          if(callback)
           callback(data);
        },
        error:function(data){
          if(errorCallback)
            errorCallback(data);
        }
      })
    },

    totalbuildsdetail : function(param, callback, errorCallback) {
      $.ajax({
        url:baseUrl + '/dashboard/totalbuildsdetail',
        data:param,
        type:'GET',
        success:function(data){
          if(callback)
           callback(data);
        },
        error:function(data){
          if(errorCallback)
            errorCallback(data);
        }
      })
    },

    recentruns : function(param, callback, errorCallback) {
      $.ajax({
        url:baseUrl + '/dashboard/recentruns',
        data:param,
        type:'GET',
        success:function(data){
          if(callback)
           callback(data);
        },
        error:function(data){
          if(errorCallback)
            errorCallback(data);
        }
      })
    }
  };
}(window.jQuery);