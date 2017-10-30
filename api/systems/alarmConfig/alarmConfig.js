!function ($) {
	$.ALARM_CONFIG = {
			
			/**
			 * 获取AlarmConfig列表
			 * @param param  查询条件
			 */
			getAlarmConfigs:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/alarmConfigs?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改AlarmConfig
			 * @param uuid AlarmConfig uuid
			 * @param param AlarmConfig修改入参
			 */
			modifyAlarmConfig:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/alarmConfigs/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			
			
			
			
	};
}(window.jQuery);
