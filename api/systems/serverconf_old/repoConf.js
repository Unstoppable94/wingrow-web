!function($) {
	/*
	 * 集算报表平台
	 */
	$.REPO_CONF = {
			
			
	    /**
		 * 验证输入框格式是否符合要求
		 * 包括：输入框不为空、ip地址符合ip格式要求
		 */
		checkFormat : function(object){
			var url = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\d{0,5}/;
			if(object.urlAddr==""||!url.test(object.urlAddr)){
	        	alert("请输入正确的url地址！");
	        }else if(object.userName==""||object.userPwd==""){
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
	checkCollRepoIsConnect : function(putBody, callback) {
			csc.rest.put("api/v5.0.0/severconfsrepo", putBody, function(data) {
				callback(data);
			});
		}
	}
}(window.jQuery);