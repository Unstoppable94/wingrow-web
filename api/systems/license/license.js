!function ($) {
	$.LICENSE = {
		debug : false,
		fromJson : function(json){
			var data = {}
			data.id 			    = json.id;//标识	
			data.name 			    = json.name;//用户名称
			data.account 			= json.account;//账号		
			data.password 			= json.password;//密码	
			data.email 				= json.email;//电子邮箱
			data.mobilephone 		= json.mobilephone;//手机
			data.remark 			= json.remark;//描述	
			data.createTime 		= json.createTime;//创建时间	
			data.lastUpdateTime 	= json.lastUpdateTime;//最后更新时间	
			data.state		        = json.state;//状态 
			data.loginState		    = json.loginState;//登录状态 
			data.type 				= json.type;
			data.type_				= (data.type && data.type == "DOMAIN") ? "域用户" : "本地用户";
			
			if(data.state == "sysFreeze" || data.state == "loginFreeze"){
					data._state = $.USER.stateView["invalid"];
					data.stateAction = $.USER.stateActionView["doUnfreeze"];
			}else if(data.state == "ok"){
					data._state = $.USER.stateView["valid"];
					data.stateAction = $.USER.stateActionView["doFreeze"];
			}
			
			data._createTime        = pc.util.dataStrFormat(data.createTime);
			data.actionClass        = "admin" == data.account ? "unusedColor memo4button" : "usedColor";
			data.role               = json.role; //新的用户管理不用此字段
			data.loginAbledIps 		= json.loginAbledIps;//会话控制允许登录的IP
			data.loginAbledTimes 	= json.loginAbledTimes;//会话控制允许登录的时间段
			data.loginAbledIpsSwitch   = json.loginAbledIpsSwitch;//会话控制允许登录的IP开关
			data.loginAbledTimesSwitch = json.loginAbledTimesSwitch;//会话控制允许登录的时间段开关
			data.roleId				= json.roleId;
			data.roleName			= json.roleName;
			data.roleType               = json.roleType;
			return data;
		},
		
		/**
		 * 查看当前系统license
		 */
		queryLicense : function(callback){
			
				csc.rest.post('api/license/licServlet?action=query',{}, callback,null,false,{},true);
		},
/*			$.ajax({
	            url: 'api/license/licServlet?action=query',
	            type: 'POST',
	            cache: false,
	            data: {},
	            dataType: 'json',
	            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	            async: true,
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	            	//hideLoading();
	                //alert("ajax请求失败：[GET] " + "license获取" + " -" + errorThrown);
	            },
	            success: function(data, textStatus) {
	            	hideLoading();
	            	callback(data);
	            }
	        });
		},*/
		checkLic : function(callback){
			
			csc.rest.post('api/license/licServlet?action=checkLic',{}, function(data, textStatus) {
				callback(data);
			});
/*			$.ajax({
				url: 'api/license/licServlet?action=checkLic',
				type: 'POST',
				cache: false,
				data: {},
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				async: true,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					hideLoading();
					//alert("ajax请求失败：[GET] " + "license校验" + " -" + errorThrown);
				},
				success: function(data, textStatus) {
					hideLoading();
					callback(data);
				}
			});*/
		},
		
		changeLicense : function(changeData,callback){
			
			csc.rest.post('api/license/licServlet?action=change',changeData, function(data, textStatus) {
				callback(data);
			});
			
/*			$.ajax({
				url: 'api/license/licServlet?action=change',
				type: 'POST',
				cache: false,
				data: changeData,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				async: true,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					hideLoading();
				},
				success: function(data, textStatus) {
					hideLoading();
					callback(data);
				}
			});*/
		},
		
		/**
		 * 订购license
		 */
		checkApplyLicense : function(wci, callback){
			var url = "api/license/licServlet?action=checkApply";
			$.ajax({
	            url: url,
	            type: 'POST',
	            cache: false,
	            data: {
	            	custName:wci.custName,
	            	orgName:wci.orgName,
	            	email:wci.email,
	            	phone:wci.phone,
	            	version:wci.version,
	            	number:wci.number,
	            },
	            dataType: 'json',
	            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	            async: true,
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	            	hideLoading();
	              //  alert("ajax请求失败：[GET] " + "license订购" + " -" + errorThrown);
	            },
	            success: function(data, textStatus) {
	            	hideLoading();
	            	callback(data);
	            }
	        });
		},
		
		ajaxFileUpload : function (fileId,successCallback,errorCallBack){
			
			$.ajaxFileUpload
			(
				{
					url:'api/license/licServlet',
					secureuri:false,
					fileElementId: fileId,
					dataType: 'html',
					data:{},
					success: function (data, status)
					{
							data = JSON.parse(data);
							if (csc.util.isNotNull(data.exceptionMessage) || csc.util.isNotNull(data.exceptionCode)) {
								//安装失败：
								alert('安装失败!'); 
								successCallback();
							}else{
								if(data.result == 'lic_install_success'){
									//许可文件安装成功！
									alert("许可文件安装成功！",function(){
										window.location.reload();
									});
									
								}else if(data.result == 'lic_install_error'){
									//许可文件安装失败！
									if(data.errorState == 'lic_check_cpu_falue'){
										//alert("许可文件数量不足！");
										alert("许可文件数量不足！",function(){
											window.location.reload();
										});
										
									}else if(data.errorState == 'lic_check_sn_falue' || data.errorState == 'lic_check_mc_falue' || data.errorState == 'lic_check_date_falue'){
										//WLIC文件无效，请重新安装。
										alert("WLIC文件无效，请重新安装！",function(){
											//删除提示信息点击关闭后，触发刷新页面的功能，防止用户手快点击以后，页面会刷新两次的问题
											window.location.reload();
										});
									}else{
										//许可文件安装失败！
										alert("许可文件安装失败,请检查安装文件并重新安装！",function(){
											window.location.reload();
										});
									}
								}else{
									alert("许可文件安装失败,请检查安装文件并重新安装！",function(){
										window.location.reload();
									});
								}
								
							}
						
					},
					error: function (data, status, e)
					{
						console.log("111111111111");
						console.log("data");
						hideLoading();
						errorCallBack();
					}
				}
			)
			
			return false;
		},
		
	};
}(window.jQuery);
