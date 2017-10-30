if(!window.console){
    window.console = {};
}
if(!window.console.log){
    window.console.log = function(msg){};
}
window.retainWindowTitleForIE9 = function(){
	setTimeout(function(){
		top.document.title = "CSC云服务中心"
	}, 50)
}
//跨域设置
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9.") 
{ 
	$.ajaxSetup({
		cache:false
	})
}else{
	$.ajaxSetup({
		cache:false,
		xhrFields: {withCredentials: true},
		crossDomain: true
	})
}

function updateHashWhenModal(url){
	if(url.indexOf("?")>-1){
	  var args=new Object();         

      var query = url.split("?")[1];
      var pairs=query.split("&");//在逗号处断开 
      for(var i=0;i<pairs.length;i++) 
      { 
        var pos=pairs[i].indexOf('=');//查找name=value 
        if(pos==-1) continue;//如果没有找到就跳过 
        var argname=pairs[i].substring(0,pos);//提取name 
        var value=pairs[i].substring(pos+1);//提取value 
        args[argname]=unescape(value);//存为属性 
      }
      window.modal_args = args;
	}else{
	  window.modal_args = [];
	}
}

//弹出窗
function showModal(url,callBack){
	var modal = $("#ajax_modal_0");
	
	updateHashWhenModal(url);
	
	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModal(){
	$("#ajax_modal_0").modal('hide');
};
function showModalSec(url,callBack){
	var modal = $("#ajax_modal_1");
	
	updateHashWhenModal(url);

	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModalSec(){
	$("#ajax_modal_1").modal('hide');
};
function showModalThir(url,callBack){
	var modal = $("#ajax_modal_2");
	
	updateHashWhenModal(url);
	
	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModalThir(){
	$("#ajax_modal_2").modal('hide');
};

if ($(".modal-draggable").length > 0) {
	$(".modal-draggable").on("shown.bs.modal",function(){
		$(this).find('.modal-dialog').draggable({ handle:'.modal-header',containment :'parent'});
	})
};
if ($(".modal").length > 0) {
	$(".modal").on("hidden.bs.modal",function(){
		$(this).html("");
	})
};


function systemMessage(){
	this.alert = function(msg,callback){
		var id_prefix = new Date().getTime();
		// 同时显示多个alert消息窗口
		// 欧航
		var msgId = id_prefix+'_systemMessageAlertModal';
		
		$("body").append('<div class="modal fade" id="'+msgId+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
  							'<div class="modal-dialog modal-sm" role="document"> ' +
							    '<div class="modal-content">' +
							      '<div class="modal-header">' +
							        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							        '<h4 class="modal-title" id="myModalLabel">系统信息</h4>' +
							      '</div>' +
							      '<div class="modal-body">' +
							        msg +
							      '</div>' +
							      '<div class="modal-footer">' +
							        '<button type="button" class="btn btn-info" data-dismiss="modal">确定</button>' +
							      '</div>' +
							    '</div>' +
							'</div>' +
						'</div>');
		var modal = $("#"+msgId);
		modal.modal('show');
		modal.on("shown.bs.modal",function(){
			modal.find('.modal-dialog').draggable({ handle:'.modal-header',containment :'parent'});
		})
		modal.on("hidden.bs.modal",function(){
			modal.remove();
			if(callback){
				callback();
			}
		})
	};
	this.confirm = function(msg,callBack,callBack2){
		$("body").append('<div class="modal fade" id="systemMessageConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
  							'<div class="modal-dialog modal-sm" role="document">' +
							    '<div class="modal-content">' +
							      '<div class="modal-header">' +
							        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							        '<h4 class="modal-title" id="myModalLabel">系统信息</h4>' +
							      '</div>' +
							      '<div class="modal-body">' +
							        msg +
							      '</div>' +
							      '<div class="modal-footer">' +
							      	'<button type="button" class="btn btn-info" id="systemMessageModalOk" data-dismiss="modal">确定</button>' +
							      	'<button type="button" class="btn btn-default" id="systemMessageModalCancle" data-dismiss="modal">取消</button>' +
							      '</div>' +
							    '</div>' +
							'</div>' +
						'</div>');
		var modal = $("#systemMessageConfirmModal");
		modal.modal('show');
		modal.on("shown.bs.modal",function(){
			modal.find('.modal-dialog').draggable({ handle:'.modal-header',containment :'parent'});
		})
		modal.on("hidden.bs.modal",function(){
			modal.remove();
		})
		$("#systemMessageModalOk",modal).on("click",function(){
			if(callBack){
				setTimeout(function(){
					callBack();
				},1000);
			}	
		});
		$("#systemMessageModalCancle",modal).on("click",function(){
			if(callBack2){
				setTimeout(function(){
					callBack2();
				},1000);
			}	
		});
	};
};
window._alert = window.alert;
window._confirm = window.confirm;
var systemMsg = new systemMessage();
window.alert = systemMsg.alert;
window.confirm = systemMsg.confirm;


//无刷新页面修改url后面的参数,params是一个js对象
function changeUrlWithParam(params){
	if(!params) return;
	var newUrl = window.location.href.substring(0,thisUrl.lastIndexOf("?"));
	var paramsStr = [];
	for(para in params){
		paramsStr.push(para + "=" + params[para]);
	}
	window.history.replaceState(null,null,newUrl + "?" + paramsStr.join("&"));
}

/*通过iframe和form的post请求，下载文件*/
/* http://stackoverflow.com/questions/4545311/download-a-file-by-jquery-ajax */
function ajax_download(url, data) {
    var $iframe,
        iframe_doc,
        iframe_html;

    if (($iframe = $('#download_iframe')).length === 0) {
        $iframe = $("<iframe id='download_iframe'" +
                    " style='display: none' src='about:blank'></iframe>"
                   ).appendTo("body");
    }

    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }

    iframe_html = "<html><head></head><body><form method='POST' action='" +
                  url +"'>" 

    Object.keys(data).forEach(function(key){
        iframe_html += "<input type='hidden' name='"+key+"' value='"+data[key]+"'>";

    });

        iframe_html +="</form></body></html>";

    iframe_doc.open();
    iframe_doc.write(iframe_html);
    $(iframe_doc).find('form').submit();
}

function iframe_download(url) {
    var $iframe;

    if (($iframe = $('#download_iframe')).length === 0) {
        $iframe = $("<iframe id='download_iframe'" +
                    " style='display: none' src='"+url+"'></iframe>"
                   ).appendTo("body");
    }else{
    	$iframe.attr("src", url);
    }

}

$(function(){
	//var specialKeycode = new RegExp("[\\^`%&\\*=\\[\\]\\{\\}\\|;\\',<>\\\\\\?\"！￥【】：；“’？》《]+");
	$(document).on("keyup", "input:not('.nolengthlimit')", function(event){
		var text = event.target.value;				
		var newText = '';
		for(var i=0;i<text.length&&i<32;i++){
			//if(!specialKeycode.test(text.charAt(i))){
				newText = newText + text.charAt(i);
		    //}
		}
		if(text!=newText){
			event.target.value = newText;
			ko.utils.triggerEvent(event.target, "change");
		}
	})
	$(document).on("keyup", "textarea", function(event){
		var text = event.target.value;				
		var newText = '';
		for(var i=0;i<text.length&&i<255;i++){
			//if(!specialKeycode.test(text.charAt(i))){
				newText = newText + text.charAt(i);
		    //}
		}
		if(text!=newText){
			event.target.value = newText;
			ko.utils.triggerEvent(event.target, "change");
		}
	})
})

//读取cookie
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

/*var environment = "development";

if(environment == "production"){
	$.ajaxSetup({
		headers:{
			"authorization":getCookie("authorization")
		},
		error:function(){
	        window.location.href = "/login.html"
		},
		success:function(data){
			if(data && data.exception && data.exception == "请先修改密码！")
	      	 	showModal('pages/user/change_password.html')
		},
		complete: function(httpObj, textStatus){
		    
	    },    
	    statusCode: {
	      401:function() { window.location.href = "/login.html" },
	      200:function(data){
	      	 if(data && data.exception && data.exception == "请先修改密码！")
	      	 	showModal('pages/user/change_password.html')
	      }
	    }
	});
}else if(environment == "development"){*/
	$.ajaxSetup({
		headers:{
			"authorization":getCookie("authorization")
		},
		error:function(){
	       // window.location.href = "/login.html"
		},
		success:function(data){
			/*if(data.exception == "请先修改密码！")
				window.location.href = "/login.html"*/
			//console.log(data)
			//showModal('pages/user/change_password.html')
		},
		complete: function(httpObj, textStatus){
		    //console.log(httpObj)
		    /*console.log(textStatus)*/
	    },    
	    statusCode: {
	      401:function() { window.location.href = "/login.html" },
	      200:function(data){
	      	 if(data && data.exception && data.exception == "请先修改密码！")
	      	 	//showModal('pages/user/change_password.html')
	      	 	window.location.href = '/#pages/user/change_password'
	      }
	    }
	});
/*}*/

//全屏显示
$.fn.showByFullScreen = function(){
	var el = $(this);
	el.addClass("fullscreen-width");
	var docElm = el[0];
	if (docElm.requestFullscreen) {   
	    docElm.requestFullscreen();   
	} 
	else if (docElm.mozRequestFullScreen) {   
	    docElm.mozRequestFullScreen();   
	} 
	else if (docElm.webkitRequestFullScreen) {   
	    docElm.webkitRequestFullScreen();   
	} 
	else if (elem.msRequestFullscreen) { 
	   elem.msRequestFullscreen(); 
	} 

	$(document).bind("keydown.fullscreen",function(e){
		var oEvent=e||event;
        if(oEvent.keyCode==27)
        {
            exitedFullScreen();
        }
	});
}

function exitedFullScreen(e){
	$(".fullscreen-width").removeClass("fullscreen-width"); 
	$(document).unbind("keydown.fullscreen");       
}
function exitFullScreen(){
	
	if (document.exitFullscreen) {   
	   document.exitFullscreen();   
	}   
	else if (document.mozCancelFullScreen) {   
	   document.mozCancelFullScreen();   
	}   
	else if (document.webkitCancelFullScreen) {   
	   document.webkitCancelFullScreen();   
	} 
	else if (document.msExitFullscreen) { 
	     document.msExitFullscreen(); 
	}
	exitedFullScreen();
}
