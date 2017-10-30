!function($) {
	$.OPERLOG = {
		_stateViews : {
			"failed" 	: "<span class='label label-danger'>失败</span>",
			"success"	: "<span class='label label-success'>成功</span>"
		},
		/**
		 * 获取操作日志列表
		 * 
		 * @param param
		 *            查询条件
		 */
		getOperLogs : function(param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/operLogs?' + param, function(data) {
				callback(data);
			});
		},
		/**
		 * 获取指定操作日志
		 * 
		 * @param param
		 *            查询条件
		 */
		getOperLog : function(uuid, param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/operLogs/' + uuid + '?' + param, function(
					data) {
				callback(data);
			});
		},
		/**
		 * 获取操作日志模块信息
		 * 
		 * @param param
		 *            查询条件
		 */
		getModules : function(callback, errorCallback) {
			csc.rest.get('api/v5.0.0/operLogs/modules', function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);