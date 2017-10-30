!function($) {
  var baseUrl = './webapi'
  $.project = {
    create : function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/project',
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

    update : function(param,params, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/project/' + param.id ,
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
        url: baseUrl + '/project/' + param.id ,
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
        url: baseUrl + '/project',
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
        url: baseUrl + '/project/' + param.id,
        data:param,
        type:'GET',
        success:function(data){
          if(callback)
              callback(data);
        },
        error:function(data){
           console.log(data)
          if(errorCallback)
              errorCallback(data);
        }
      })
    },

    buildList : function(param,params, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/project/' +  param.id + '/build',
        data:params,
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

    triggerBuild:function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/project/' +  param.id + '/triggerbuild',
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
    buildInfo : function(param, callback, errorCallback) {
      $.ajax({
        url: baseUrl + '/project/' +  param.id + '/build/' +  param.buildNumber,
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