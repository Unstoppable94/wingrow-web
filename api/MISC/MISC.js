!function($) {
  var baseUrl = './webapi'
  $.MISC = {
    "maven" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/maven',
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
    },
    "jdk" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/jdk',
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
    },
    "sonar" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/sonar',
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
          url:baseUrl + '/misc/sonar',
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
      update:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/sonar',
          data:JSON.stringify(param),
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
      }
    },
    "rancher" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/rancher',
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
          url:baseUrl + '/misc/rancher',
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
      update:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/rancher',
          data:JSON.stringify(param),
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
      }
    },
    "mirror" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/mirror',
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
          url:baseUrl + '/misc/mirror',
          data:param,
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
      update:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/mirror',
          data:JSON.stringify(param),
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
      }
    },
    "registry" : {
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/registry',
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
          url:baseUrl + '/misc/registry',
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
          url:baseUrl + '/misc/registry/' + param.id,
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
          url:baseUrl + '/misc/registry/' + param.id,
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
    },
    "smtp":{
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/smtp',
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
          url:baseUrl + '/misc/smtp',
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
      update:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/smtp',
          data:JSON.stringify(param),
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
      }
    },
    "projectType":{
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/projecttype',
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
    },
    "stagesInfo":{
      query:function(param, callback, errorCallback) {
        $.ajax({
          url:baseUrl + '/misc/stagesinfo',
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
    }
  };
}(window.jQuery);