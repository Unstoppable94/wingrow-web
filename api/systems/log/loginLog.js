!function($) {
	$.LOGINLOG = {
		/**
		 * 获取登录日志列表
		 * 
		 * @param param
		 *            查询条件
		 */
		getLoginLogs : function(param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/loginLogs?' + param, function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);
