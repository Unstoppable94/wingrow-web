!function($) {
	/*
	 * Ftp服务器
	 */
	$.FTP_CONF = {
			
		checkFtpFormat : function(object){
			var ipReg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
	      	var port =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])/;//端口号正则表达式，0-65535
			if(object.serverAddr == ""||!ipReg.test(object.serverAddr)){			//判断ip地址格式是否正确
	        	alert("请输入正确的服务器地址！");
	        }else if(object.portNum == ""||!port.test(object.portNum)){		//判断端口号格式是否正确
	        	alert("请输入正确的端口号！");
	        }else if(object.softWareAddr == ""){
	        	alert("请输入软件库地址！");
	        }else if(object.scriptAddr == ""){
	        	alert("请输入脚本库地址！");
	        }else if(object.userName == ""||object.userPwd == ""){
	        	alert("请输入用户名或密码！");
	        }else{
	        	return true;
	        }
			return false;
		},

		/**
		 * 判断是否连接成功
		 * 
		 * @param putbody
		 * @param callback
		 */
		checkFtpIsConnect : function(putBody, callback) {
			csc.rest.put("api/v5.0.0/severconfsftp", putBody, function(data) {
				callback(data);
			});
			//console.log("----------------" + putBody)
		}
	}
}(window.jQuery);