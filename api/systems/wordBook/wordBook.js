!function($) {
	$.WORDBOOK = {

		/**
		 * 修改word
		 * 
		 * @param uuid
		 *            word uuid
		 * @param param
		 *            word修改入参
		 */
		updateWord : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/wordBooks/' + uuid, param,
					function(data) {
						callback(data)
					});
		},

		/**
		 * 获取word
		 * 
		 * @param param
		 *            查询条件
		 */
		getWord : function(uuid, param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/wordBooks/' + uuid + '?' + param, function(
					data) {
				callback(data);
			});
		}
	};
}(window.jQuery);