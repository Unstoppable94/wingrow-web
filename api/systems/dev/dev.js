!function($) {
	$.DEV = {
		/**
		 * 创建dev
		 * 
		 * @param param dev创建入参
		 */
		createDev : function(param, callback, errorCallback) {
			csc.rest.post('api/v5.0.0/devs', param, function(data) {
				callback(data);
			});
		},
		
		/**
		 * 修改Dev
		 * 
		 * @param uuid
		 *            dev uuid
		 * @param param
		 *            dev修改入参
		 */
		updateDev : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/devs/' + uuid, param,
					function(data) {
						callback(data);
					});
		},
		
		/**
		 * 删除dev
		 * 
		 * @param uuid
		 *            Role uuid
		 */
		delDev : function(uuid, callback) {
			csc.rest.del('api/v5.0.0/devs/' + uuid, function(data) {
				callback(data);
			})
		},
		
		/**
		 * 获取dev列表
		 * 
		 * @param param
		 *            查询条件
		 */
		getDevs : function(param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/devs?' + param, function(data) {
				callback(data);
			});
		},
		
		/**
		 * 获取dev
		 * 
		 * @param param
		 *            查询条件
		 */
		getDevs : function(uuid, param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/devs/' + uuid + '?' + param, function(
					data) {
				callback(data);
			});
		}
	};
}(window.jQuery);