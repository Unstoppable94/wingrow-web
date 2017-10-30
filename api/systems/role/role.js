!function($) {
	$.ROLE = {
		/**
		 * 创建Role
		 * 
		 * @param param
		 *            Role创建入参
		 */
		createRole : function(param, callback, errorCallback) {
			csc.rest.post('api/v5.0.0/roles', param, function(data) {
				callback(data);
			});
		},
		/**
		 * 修改Role
		 * 
		 * @param uuid
		 *            Role uuid
		 * @param param
		 *            Role修改入参
		 */
		updateRole : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/roles/' + uuid + "/update", param,
					function(data) {
						callback(data)
					});
		},
		/**
		 * 删除Role
		 * 
		 * @param uuid
		 *            Role uuid
		 */
		delRole : function(uuid, callback) {
			csc.rest.del('api/v5.0.0/roles/' + uuid, function(data) {
				callback(data)
			})
		},
		/**
		 * 获取Role列表
		 * 
		 * @param param
		 *            查询条件
		 */
		getRoles : function(param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/roles?' + param, function(data) {
				callback(data);
			});
		},
		/**
		 * 获取Role
		 * 
		 * @param param
		 *            查询条件
		 */
		getRole : function(uuid, param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/roles/' + uuid + '?' + param, function(
					data) {
				callback(data);
			});
		},
		/**
		 * 获取但前的Role
		 * 
		 * @param param
		 *            查询条件
		 */
		getCurrentRole : function(callback, errorCallback) {
			csc.rest.get('api/v5.0.0/roles/current/role', function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);