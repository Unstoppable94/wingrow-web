!function($) {
  var baseUrl = './webapi'
  $.projectGroup = {
    create : function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/projectgroup',
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

    update : function(obj,params, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/projectgroup/' + obj.id ,
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
    
    del : function(param, callback) {
      $.ajax({
        url: baseUrl + '/projectgroup/' + param.id ,
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
    },
    
    query : function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/projectgroup',
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

    get : function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/projectgroup/' +  param.id + '/info',
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