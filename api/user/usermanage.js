!function($) {
  var baseUrl = './webapi'
  $.usermanage = {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/user',
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
      create:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/user',
          data:JSON.stringify(param),
          contentType: "application/json",//必须有
          type:'POST',
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
      update:function(param,params, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/user/' + param.username,
          data:JSON.stringify(params),
          contentType: "application/json",//必须有
          type:'PUT',
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
      del:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/user/' + param.username,
          type:'DELETE',
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