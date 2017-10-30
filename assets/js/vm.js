!function($) {
	$.VM = {
		debug : false,
		fromJson : function(json) {
			var v = json;
			v.coresPerSocket = json.coresPerSocket;
			v.controlDomain = json.controlDomain == "true" || json.controlDomain == true; //是否为domain 0控制主机虚拟机true/false
			v.isHide = json.isHide;
			v.cpuReserve = json.cpuReserve ? json.cpuReserve : "0";
			v.pvArgs = json.pvArgs;//虚拟机的引导参数，目前仅有半虚支持
			v.applianceName = json.applianceName;//所属vApp名称
			v.startOrder = json.startOrder;// 启动顺序
			v.delayInterval = json.delayInterval;// 延时间隔
			v.vmId = json.vmId;// 虚拟机ID
			v.cpu = json.cpu;// 虚拟机cpu大小
			v.ownerHostId = json.ownerHostId;// 虚拟机所在物理主机ID
			v.ownerHostName = json.ownerHostName;// 虚拟机所在物理主机的名字
			v.ownerHostState = json.ownerHostState;// 虚拟机所在物理主机的状态
			v.hostName = json.hostName;// 虚拟机主机名
			v.maxCpu = json.maxCpu;// 最大cpu值
			v.maxMem = pc.util.mbToGb(json.maxMem);// 最大内存值
			v.maxVcpu = json.maxVcpu;// 最大vcpu值
			v.memory = pc.util.mbToGb(json.memory);// 虚拟机的内存值
			v.delayTime = json.delayTime;//即将删除虚拟机的删除时间点
			if(pc.util.isNotNull(json.memoryActual)){
				v.memoryActual = pc.util.mbToGb(json.memoryActual);
			}else{
				v.memoryActual = pc.util.mbToGb(json.memory);
			}
			v.minCpu = json.minCpu;// 最小cpu
			v.minMem = pc.util.mbToGb(json.minMem);// 最小内存
			v.minVcpu = json.minVcpu;// 最小vcpu
			v.name = json.name;// 虚拟机名字
			v.osType = json.osType;// 虚拟机的操作系统类型
			v.osVersion = json.osVersion;// 虚拟机的操作系统版本
			v.poolId = json.poolId;// 所在资源池的ID
			v.poolName = json.poolName;// 所在资源池的名字
			if(pc.util.isNull(json.poolName)){
				v.poolName = "";
			}
			v.state = json.state;// 虚拟机的状态
			v.powerState = json.state;// 虚拟机的电源状态，由于后面state字段会与operationState合并，直接分开，页面又有太多地方用了state进行判断，所以增加个powerState字段用于保存最原始的state
			v.pstate = json.state;//虚拟机的主要状态
			v.operationState = json.operationState;// 虚拟机的操作状态
			v.vcpu = json.vcpu;// 虚拟机vcpu的值
			v.orginalId = json.originalId;// 对应到各个平台底层的唯一标识
			v.originalName = json.originalName;// 对应到各个平台底层的名字
			v.ip = json.ip == "null" ? "" : json.ip;// 虚拟机的IP
			v.createTime = json.createTime;// 虚拟机创建时间
			v.updateData = json.updateData;// 虚拟机最后更改时间
			v.runTime = json.runTime;// 虚拟机运行时长
			v.platform = json.platform;// 所在平台
			v.hypervisor = json.hypervisor;// 虚拟化类型
			v.cpuHotResize = json.cpuHotResize;// 虚拟机支持cpu热插拔的级别
			v.memHotResize = json.memHotResize;// 虚拟机支持内存热插拔的级别
			v.volumesUri = json.volumesUri;// 虚拟机下的存储卷连接
			v.nicUri = json.nicUri;// 虚拟机下的网卡连接
			v.hostUri = json.hostUri;// 虚拟机所属物理主机连接
			v.uri = json.uri;// 单个虚拟机信息查询连接
            v.storage = pc.util.isNotNull(json.storage) ? json.storage : "0";
            v._storage = /^([1-9]+[0-9]*|[0]{1})$/.test(v.storage)  ? v.storage : pc.util.strToFloat(v.storage).toFixed(2);
			v.description = json.description;
			v.endTime = json.endTime;
			v.hostId = json.hostId;
			v.imageId = json.imageId;
			v.password = json.password;
			v.reourcePoolId = json.reourcePoolId;
			v.shortHostname = json.shortHostname;
			v.startTime = json.startTime;
			v.storagesUri = json.storagesUri;
			v.relocationUri = json.relocationUri;
			v.logUri = json.logUri;
			v.startDate = json.startDate;
			v.endDate = json.endDate;
			v.workloadId = json.workloadId;
			v.pcis = json.pcis;
			v.taskUri = json.taskUri;
			v.isInstallTools_ = $.VM._isInstallTools[json.isInstallTools];
			v.isInstallTools = json.isInstallTools;
			v.devicePath = json.devicePath;//虚拟磁盘保存路径
			v.appliance = json.appliance;//vapp uuid
			v.templateId = pc.util.isNotNull(json.templateId) ? json.templateId : "";//虚拟机若是经过wce且时模板部署则获取模板id
			v.memoryType = json.memoryType;//虚拟机内存配置类型
			v._memoryType = $.VM._memoryType[json.memoryType];//虚拟机内存配置类型转义
			v.memoryPriority = json.memoryPriority;//虚拟机专享内存优先级
			v.isDynamicMemWce = v.controlDomain ? "true" : json.isDynamicMem;//wce返回虚拟机的内存是否可以开机调整
			v.isDynamicCpu = v.controlDomain ? "true" : json.isDynamicCpu;//wce返回虚拟机的cpu是否可以开机调整
			v.hvmBootParam = json.hvmBootParam;
			v.startOrder 		= json.startOrder;
			v.autoPoweron 	= json.autoPoweron == "true" ? true : false;
			v.startDelay 		= json.startDelay;
			v.linkedClone = json.linkedClone;
			v.blockAttachDevs = json.blockAttachDevs;
			v.vgpuList = json.vgpuList; //虚拟显卡列表
			v.secState = json.secState; //安全状态
			v.secState_ = $.VM._secStateViews[v.secState];
			
			v._hvmBootParam = internationalizationObj.rm_modal_vm_show_hvmBootParam_pv; //半虚
			if(json.hvmBootParam){
			    v._hvmBootParam = internationalizationObj.rm_modal_vm_show_hvmBootParam_fv; //全虚
			}
			if(v.operationState != null && v.operationState != "" && !$.VM._operationStateNoAssign[v.operationState]){
				v.state = v.operationState;
			}
			if(v.isDynamicMemWce == true || v.isDynamicMemWce == "true"){
				v._isDynamicMemWce = internationalizationObj.rm_modal_vm_fromJson_true; //是
			}else{
				v._isDynamicMemWce = internationalizationObj.rm_modal_vm_fromJson_false; //否
			}
			if(v.isDynamicCpu == true || v.isDynamicCpu == "true"){
				v._isDynamicCpu = internationalizationObj.rm_modal_vm_fromJson_true; //是
			}else{
				v._isDynamicCpu = internationalizationObj.rm_modal_vm_fromJson_false; //否
			}
			if(v.linkedClone == true || v.linkedClone == "true"){
				v._linkedClone = internationalizationObj.rm_modal_vm_fromJson_true; //是
			}else{
				v._linkedClone = internationalizationObj.rm_modal_vm_fromJson_false; //否
			}
			// 转义部分
			v.state_ = $.VM._stateViews[v.state];

			if(json.customization != null){
				var isDynamicMem = "true";
				 if(v.minMem == v.maxMem){
					 isDynamicMem = "false";
				 }
				 v.isDynamicMem = isDynamicMem;
				 v.isDynamicMem_ = $.VM._sharedViews[isDynamicMem];
				 v.minStaticMem = pc.util.mbToGb(json.customization.minStaticMem);
				 v.maxStaticMem = pc.util.mbToGb(json.customization.maxStaticMem);
				 v.cpuCap = json.customization.cpuCap;
				 v.cpuWeight = json.customization.cpuWeight;
				 v.cpuMark = json.customization.cpuMark;
			}
			$("#memory_type_key_id2").attr("style","display:none");
            $("#memory_type_key_id3").attr("style","display:none");
            $("#memory_type_key_id4").attr("style","display:none");
            
			 if(v.memoryType == "shared"){
				  v._memory_type_key_1 = internationalizationObj.rm_modal_vm_fromJson_shared; //规格内存：
				  v._memory_type_val_1 = v.memory+" GB";
			  }else if(v.memoryType == "reservation"){
				  v._memory_type_key_1 = internationalizationObj.rm_modal_vm_fromJson_reservation; //规格内存：
				  v._memory_type_val_1 = v.memory+" GB";
				  v._memory_type_key_2 = internationalizationObj.rm_modal_vm_fromJson_reserMemory; //预留内存：
				  v._memory_type_val_2 = v.minMem+" GB";
				  $(".memory_type_key_2").each(function(){
				      $(this).attr("style","");
				  });
			  }else if(v.memoryType == "privilege"){
				  v._memory_type_key_1 = internationalizationObj.rm_modal_vm_fromJson_privilege; //专享内存：
				  v._memory_type_val_1 = v.memory+" GB";
			  }else if(v.memoryType == "custom"){
				  /*v._memory_type_key_1 = "规格内存(浮动值)：";
				  v._memory_type_val_1 = v.memoryActual+" GB";
				  v._memory_type_key_2 = "最大浮动值：";
				  v._memory_type_val_2 = v.maxMem+" GB";*/
				  v._memory_type_key_1 = internationalizationObj.rm_modal_vm_fromJson_staticMin; //静态最小值：
				  v._memory_type_val_1 = v.minStaticMem+" GB";
				  v._memory_type_key_2 = internationalizationObj.rm_modal_vm_fromJson_dynamicMin; //动态最小值：
				  v._memory_type_val_2 = v.minMem+" GB";
				  v._memory_type_key_3 = internationalizationObj.rm_modal_vm_fromJson_dynamicMax; //动态最大值：
				  v._memory_type_val_3 = v.maxMem+" GB";
				  v._memory_type_key_4 = internationalizationObj.rm_modal_vm_fromJson_staticMax; //静态最大值：
				  v._memory_type_val_4 = v.maxStaticMem+" GB";
				  $("#memory_type_key_id2").attr("style","");
				  $("#memory_type_key_id3").attr("style","");
				  $("#memory_type_key_id4").attr("style","");
				  
				  $("#memory_type_key_id2,#memory_type_key_id3,#memory_type_key_id4").each(function(){
                      $(this).attr("style","");
                  });
				  
			  }
			
			//内存优先级中文展示
			if(v.memoryPriority){
				v._memoryPriority = $.VM._memoryPriorityView[v.memoryPriority];
			}
			//CPU权重中文展示
			if(v.cpuWeight){
				v._cpuWeight = $.VM._cpuWeightView[v.cpuWeight+""];
			}
			return v;
		},
		fromJsonList : function(json) {
			var datas = json.vms || json.workloads || json.resultList || json.files;
			var list = new Array();
			if (datas) {
				for ( var s = 0 ; s<datas.length; s++) {
					list.push(new $.VM.fromJson(datas[s]));
				}
			}
			return list;
		},
		//转换虚拟机安全信息
		fromSecJson : function(json) {
			var v = json;
			v.secState_ = $.VM._secStateViews[json.state];
			return v;
		},
		_stateViews : {
			"OK" : internationalizationObj.rm_modal_vm_stateViews_ok, //运行中
			"STOPPED" : internationalizationObj.rm_modal_vm_stateViews_stopped, //已关机
			"STOPPING" : internationalizationObj.rm_modal_vm_stateViews_stopping, //正在关机
			"STARTING" : internationalizationObj.rm_modal_vm_stateViews_starting, //正在开机
			"DELETING" : internationalizationObj.rm_modal_vm_stateViews_deleting, //正在删除
			"RESTARTING" : internationalizationObj.rm_modal_vm_stateViews_restarting, //正在重启
			"EXECUTING" : internationalizationObj.rm_modal_vm_stateViews_executing, //正在部署
			"UNKNOWN" : internationalizationObj.rm_modal_vm_stateViews_unknown, //未知
			"SUSPENDED" : internationalizationObj.rm_modal_vm_stateViews_suspended, //挂起
			"RESIZING":internationalizationObj.rm_modal_vm_stateViews_resizing, //调整中
			"SUSPENDING":internationalizationObj.rm_modal_vm_stateViews_suspending, //挂起中
			"RESUMEING":internationalizationObj.rm_modal_vm_stateViews_resumeing, //恢复中
			"CONVERTING":internationalizationObj.rm_modal_vm_stateViews_converting, //转换中
            "RELOCATING":internationalizationObj.rm_modal_vm_stateViews_relocating, //迁移中
            "BACKUPING":internationalizationObj.rm_modal_vm_stateViews_backuping, //备份中
            "RESTORING":internationalizationObj.rm_modal_vm_stateViews_reverting, //还原中
            "SNAPSHOT_ADDING":internationalizationObj.rm_modal_vm_stateViews_snapshot_adding,//创建快照中
            "SNAPSHOT_DELING":internationalizationObj.rm_modal_vm_stateViews_snapshot_deling,//删除快照中
            "SNAPSHOT_RECOVERING":internationalizationObj.rm_modal_vm_stateViews_snapshot_recovering,//快照还原中
            "RENAMEING" : internationalizationObj.rm_modal_vm_stateviews_renameing,//修改名称中
            "EXPORTING" : internationalizationObj.rm_modal_vm_stateViews_exporting,//导出中
            "UN_MOUNTING_ISO":internationalizationObj.rm_modal_vm_stateViews_umounting_iso,//弹出iso中
            "MOUNTING_ISO":internationalizationObj.rm_modal_vm_stateViews_mounting_iso,//挂载iso中
            "CLONING":internationalizationObj.rm_modal_vm_stateViews_cloning,//正在克隆
            "SAVE_AS_TEMPLATE":internationalizationObj.rm_modal_vm_stateViews_saveas, //"另存为模板中"
            "DELAYING":"即将删除",
            "REMOVEING":"移除中",
            "MOUNTING_BLOCK": "正在挂载裸盘",
            "UMOUNTING_BLOCK": "正在卸载裸盘",
            "VGPU_CONFIGING":	"正在配置虚拟显卡"
		},
		_operationStateNoAssign:{//操作状态不赋值给state的列表  注意：修改是要与TreeService.java的operationStateNoAssign 保持一致
			"OK":"OK",
			"RENAMEING":"RENAMEING",
			"UN_MOUNTING_ISO":"UN_MOUNTING_ISO",
			"MOUNTING_ISO":"MOUNTING_ISO"
		},
		_sharedViews : {
			"true" : internationalizationObj.rm_modal_vm_fromJson_true, //是
			"false" : internationalizationObj.rm_modal_vm_fromJson_false //否
		},
		_memoryType : {
			"shared" : internationalizationObj.rm_modal_vm_memoryType_shared, //共享
			"privilege" : internationalizationObj.rm_modal_vm_memoryType_privilege, //专享
			"reservation" : internationalizationObj.rm_modal_vm_memoryType_reservation, //预留
			"custom" : internationalizationObj.rm_modal_vm_memoryType_custom //自定义调整
		},
		_isInstallTools : {
			"true" : internationalizationObj.rm_modal_vm_isInstallTools_true, //已安装
			"false" : internationalizationObj.rm_modal_vm_isInstallTools_false //未安装
		},
		_volumesViews : {
			"true" : internationalizationObj.rm_modal_vm_volumesViews_true, //已使用
			"false" : internationalizationObj.rm_modal_vm_volumesViews_false //未使用
		},
		_netStateView : {
			/*修改为和netWork.js._stateView一致*/
		    /*"IN_USED" : internationalizationObj.rm_modal_vm_netStateView_inUsed, //已使用
			"CONNECTED" : internationalizationObj.rm_modal_vm_netStateView_connected, //连接
			"FREE" : internationalizationObj.rm_modal_vm_netStateView_free //空闲*/			
		    //已连接
            "CONNECTED" : internationalizationObj.rm_modal_network_stateView_1_info,
            //可用
            "FREE"      : internationalizationObj.rm_modal_network_stateView_2_info,
            //在用
            "IN_USED"   : internationalizationObj.rm_modal_network_stateView_3_info,
            /** 2015年2月6日15:42:02 志东说要网卡状态改成已使用与未使用，虚拟机开机时显示已使用、关机时显示未使用 **/
            "USED"      : "已使用",
            "UNUSED"    : "未使用",
            "DELETING"    : "删除中",
            "VM_PCI_REMOVING": "删除中",
            "VM_PCI_ADDING":	"直通中"
		},
		_netTypeView : {
			"EXTERNAL" : internationalizationObj.rm_modal_vm_netTypeView_external, //外部网络
			"BOND_SLAVE" : internationalizationObj.rm_modal_vm_netTypeView_bondSlave, //聚合网络
			"INTERNAL" : internationalizationObj.rm_modal_vm_netTypeView_internal, //内部网络
			"Eth" : "物理网卡"
		},
		//内存优先级
		//2015年4月18日16:21:47 lisy
		//‘0’和‘2’是废弃编号 我们这里进行转换是为了兼容旧数据显示
		_memoryPriorityView : {
			"0" : "低",
			"1" : "低",
			"2" : "中",
			"3" : "中",
			"5" : "高"
		},
		//CPU权重
		_cpuWeightView : {
			"128" : "最低（128）",
			"256" : "低（256）",
			"384" : "标准（384）",
			"512" : "高（512）",
			"640" : "最高（640）"
		},
		_secStateViews:{
			"0":"未实时防护",
			"1":"实时防护",
			"2":"未受保护",
			"3":"未连接"
		},
		_vgpuTypeViews:{
			"passthrough":"在整个GPU中直通",
			"GRID K180Q":"GRID K180Q vGPU(每个GPU1个,2560x1600,4个显示器)",
			"GRID K160Q":"GRID K160Q vGPU(每个GPU2个,2560x1600,4个显示器)",
			"GRID K140Q":"GRID K140Q vGPU(每个GPU4个,2560x1600,2个显示器)",
			"GRID K120Q":"GRID K120Q vGPU(每个GPU8个,2560x1600,2个显示器)",
			"GRID K100":"GRID K100 vGPU(每个GPU8个,1920x1200,2个显示器)"
		},
		
		/**
		 * 配置虚拟机关机告警开关
		 */
		shutdwonalarmSwitch:function(dataCenterId,vmId,putBody,callback){
			var info = "开启";
			if(putBody.shutdwonalarmSwitch == "off"){
				info = "关闭";
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.shutdwonalarmSwitch", vmId, JSON.stringify(putBody), function(data, textStatus) {
				showError(info+"虚拟机关机告警失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 带条件获取虚拟机列表
		 */
		getVmList : function(dataCenterId,param,callback){
			pc.rest.get(dataCenterId,"pc.vm.list","",param,
					function(data, textStatus){
				showError("获取虚拟机列表失败", data); 
			},
			function(data, textStatus){
				callback(data,data.recordTotal);
			});
		},
		/**
		 * 查看虚拟机详细信息
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface get:wce/api/vms/{workloadId}
		 */
		getVmInfo : function(dataCenterId, workloadId, callback,errorCallback, isSync) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getVmInfo.json", function(data) {
					callback($.VM.fromJson(data));
				});
				return;
			}
			var isSync = isSync == undefined ? true : isSync;
			pc.rest.get(dataCenterId, "pc.winserver.vm.vminfo", workloadId, "", function(
					data, textStatus) {
			    if(errorCallback){
			        errorCallback(data);
			    }
			}, function(data, textStatus) {
				callback($.VM.fromJson(data));
			}, isSync);
		},
		/**
		 * 查看虚拟机安全信息
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface get:wce/api/vms/{vmId}/secInfo
		 */
		getVmSecInfo : function(dcId, vmId, callback) {
			pc.rest.get(dcId, "pc.winserver.vm.getSecInfo", vmId, "", 
					function(data, textStatus) {
						showError("获取虚拟机安全信息失败！", data);
					}, function(data, textStatus) {
						callback($.VM.fromSecJson(data));
					});
		},
		/**
		 * 虚拟机开机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{workloadId} data:{"state":"OK"}
		 */
		powerOn : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "OK";
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoPowerOn", workloadId, JSON
					.stringify(data), function(data, textStatus) {
					if(data && data.exceptionCode && data.exceptionCode =="WCEVM061"){
						$.HOST.getHostListByVm(dataCenterId, workloadId,
							function(hostList, callbackParam){
								if(hostList && hostList.hosts){
									hostList = hostList.hosts;
									for (var i = 0; i < hostList.length; i++) {
										if(hostList[i].isFit != false && hostList[i].isFit != 'false'){
											showStartWithHost(dataCenterId, workloadId);
											return;
										}
									};
								}
								showError(internationalizationObj.rm_modal_vm_powerOn_error, callbackParam); //虚拟机开机失败
							},function(hostData, textStatus, callbackParam){
									showError(internationalizationObj.rm_modal_vm_powerOn_error, callbackParam); //虚拟机开机失败
							}, data);

							function showStartWithHost(dataCenterId, workloadId){
								confirm("物理主机资源不足，无法启动该虚拟机。是否需要在其他物理主机上启动？", 
									function(yes){
										if(yes){
											showModal('pages/vm/startWithHost.jsp?dcId='+dataCenterId+'&vmId='+workloadId);
										}
									}
								);
							}
					}else{
						showError(internationalizationObj.rm_modal_vm_powerOn_error, data); //虚拟机开机失败
					}
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 从其它物理机启动虚拟机
		 * */
		startVmWithHost : function(dataCenterId,workloadId,hostId,callback){
			var obj = {};
			obj.hostId = hostId;
			pc.rest.post(dataCenterId,"pc.winserver.vm.startWithHost",workloadId,JSON.stringify(obj),
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_startVmWithHost_error, data); //从其它物理机启动虚拟机失败
					},
					function(data, textStatus){
						callback(data);
					});
		},
		/**
		 * 虚拟机关机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{workloadId} data:{"state":"STOPPED"}
		 */
		powerOff : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "STOPPED";
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoPowerOff", workloadId, JSON
					.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_powerOff_error, data); //虚拟机关机失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机重启
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{workloadId} data:{"state":"RESTART"}
		 */
		powerRestart : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "RESTART";
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoReStart", workloadId, JSON
					.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_powerRestart_error, data); //虚拟机重启失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 虚拟机强制重启
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{id:\\d+}/forceControl  data:{item:"forceReboot"}
		 */
		forcePowerRestart : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "FORCERESTART";
			pc.rest.put(dataCenterId, "pc.winserver.vm.forceControlRestart", workloadId, JSON
					.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_forcePowerRestart_error, data); //虚拟机重启失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 虚拟机强制关机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{id:\\d+}/forceControl  data:{item:"forceShutdown"}
		 */
		forceShutdown : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "FORCESTOPPED";
			pc.rest.put(dataCenterId, "pc.winserver.vm.forceControlShutdown", workloadId, JSON.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_forceShutdown_error, data); //虚拟机重启失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机挂起
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{workloadId} data:{"state":"SUSPENDED"}
		 */
		suspend : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "SUSPENDED";
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoSuspended", workloadId, JSON
					.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_suspend_error, data); //虚拟机挂起失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机恢复
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface put: wce/api/vms/{workloadId} data:{"state":"RESUMED"}
		 */
		resume : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var data = {};
			data.state = "RESUMED";
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoResumed", workloadId, JSON
					.stringify(data), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_resume_error, data); //虚拟机恢复失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 删除虚拟机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param isDelStorage 是否同时删除存储
		 * @param isDelSnap 是否同时删除快照
		 * @param isDelDisk 是否同时删除磁盘
		 * @interface DELETE:wce/api/workloads/{workloadId}
		 * https://ip:port/wce/api/vms/{vmId}?isDeleteStorage=true&isDelSnap=true &isClearData=true
		 */
		delVm : function(dataCenterId, workloadId,callback,isDelStorage,isDelSnap,isClearData) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				callback(true);
				return;
			}
			var param = "";
			if(isDelStorage){
				param = "isDeleteStorage=true";
			}else{
				param = "isDeleteStorage=false";
			}
			
			if(isDelSnap){
				param += "&isDelSnap=true";
			}else{
				param += "&isDelSnap=false";
			}
			
			if(isClearData){
				param += "&isClearData=true";
			}else{
				param += "&isClearData=false";
			}
			
		   pc.rest.delWithBody(dataCenterId, "pc.winserver.vm.vminfoDel",workloadId,param, function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_delVm_error, data); //删除虚拟机失败
			}, function(data, textStatus) {
				//释放ip
				/*var ip ={};
				ip.workloadId = workloadId;
				ip.dataCenterId = dataCenterId;
				ip.hypervisor = "winserver";
				var params = "workloadId="+workloadId+"&";
				params+="dataCenterId="+dataCenterId+"&";
				params+="hypervisor="+"winserver";
				$.IP.getIpsByParams(params,function(ipData){
					if(ipData.length>0){
						$.IP.releaseIPByWorkloadId(JSON.stringify(ip),function(){
						})
					}
				});*/
				callback(data);
			});
		},
		/**
		 * 推迟删除虚拟机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param isDelStorage 是否同时删除存储
		 * @param isDelSnap 是否同时删除快照
		 * @param isDelDisk 是否同时删除磁盘
		 * @param delayTime 推迟时间（小时）
		 * @param exactTime 推迟时间点（YYYY-MM-DD HH-MM-SS）
		 * @interface DELETE:wce/api/workloads/{workloadId}
		 * https://ip:port/wce/api/vms/{vmId}?isDeleteStorage=true&isDelSnap=true &isClearData=true&delayTime=1&exactTime=2105-11-3 12:33:00
		 */
		delayDelVm : function(dataCenterId, workloadId,callback,isDelStorage,isDelSnap,isClearData,delayTime,exactTime) {
			var param = "";
			if(isDelStorage){
				param = "isDeleteStorage=true";
			}else{
				param = "isDeleteStorage=false";
			}
			
			if(isDelSnap){
				param += "&isDelSnap=true";
			}else{
				param += "&isDelSnap=false";
			}
			
			if(isClearData){
				param += "&isClearData=true";
			}else{
				param += "&isClearData=false";
			}
			
			if(delayTime != null){
				param += "&delayTime="+delayTime;
			}
			
			if(exactTime != null){
				param += "&exactTime="+encodeURIComponent(exactTime);
			}
		   pc.rest.delWithBody(dataCenterId, "pc.vm.vminfoDelayDel",workloadId,param, function(
					data, textStatus) {
				showError("推迟删除虚拟机失败", data); 
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 查看虚拟机cpu信息
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface get:wce/api/vms/{workloadId}
		 */
		getVmCpuInfo : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getVmInfo.json", function(data) {
					callback(data);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.vminfo", workloadId, "", function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getVmCpuInfo_error, data); //虚拟机信息获取失败
			}, function(data, textStatus) {
				// TODO 等具体结构出来后还需处理
				callback(data);
			});
		},
		/**
		 * 查看虚拟机描述
		 * 
		 * @param dataCenterId
		 * @param vmId
		 * @interface get:wce/api/vms/{vmId}/renark
		 */
		getVmRemarkInfo : function(dataCenterId, vmId , callback) {
			pc.rest.get(dataCenterId, "pc.winserver.vm.getRemark", vmId, "", function(data, textStatus) {
				//showError(internationalizationObj.rm_modal_vm_getVmCpuInfo_error, data); //虚拟机信息获取失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 设置虚拟机描述
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface get:wce/api/vms/{workloadId}/renark
		 */
		setVmRemarkInfo : function(dataCenterId, workloadId ,dataObj,  callback) {
			pc.rest.put(dataCenterId, "pc.winserver.vm.setRemark", workloadId, JSON.stringify(dataObj), function(data, textStatus) {
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 *查询虚拟机恢复记录列表
		 * 
		 * @param dataCenterId
		 * @param vmId
		 * @interface get:wce/api/vms/{vmId}/restore/details
		 */
		restoreDetailList : function(dataCenterId, vmId, param,callback) {
			pc.rest.get(dataCenterId, "pc.winserver.vm.restoreList", vmId, param, function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_restoreDetailList_error, data); //虚拟机恢复记录列表获取失败
			}, function(data, textStatus) {
				callback(data,data.recordTotal);
			});
		},

		/**
		 * 查看虚拟机可绑定的cpu列表
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getBindCpuList : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 查看虚拟机mem信息
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface get:wce/api/vms/{workloadId}
		 */
		getVmMemInfo : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getVmInfo.json", function(data) {
					callback(data);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.vminfo", workloadId, "", function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getVmMemInfo_error, data); //虚拟机信息获取失败
			}, function(data, textStatus) {
				// TODO 待完善
				callback(data);
			});
		},

		/**
		 * 调整虚拟机cpu
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param dataObj
		 *            TODO 待完善
		 * @interface PUT :wce/api/vms/{workloadId}
		 * 
		 */
		resizeCpu : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId"+dataCenterId+"workloadId"+workloadId);
				alert(JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoResizeCpu", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_resizeCpu_error, data); //调整虚拟机cpu出错
				 $("#edit_cpu_btn").removeAttr("disabled");
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 调整虚拟机mem
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param dataObj
		 *            TODO 待完善
		 * @interface PUT :wce/api/vms/{workloadId}
		 * 
		 */
		resizeMem : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				alert(JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.vminfoResizeMem", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_resizeMem_error, data); //调整虚拟机内存出错
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机磁盘列表查询
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface GET:wce/api/workloads/{workloadId}/volumes
		 * 
		 */
		getVolumeList : function(dataCenterId, workloadId, callback, callbackParam) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getVolumes.json", function(data) {
					callback(data);
				});
				return;
			}
			//默认以虚拟磁盘名称排序
			var params = "orderBy=name:asc";
			pc.rest.get(dataCenterId, "pc.winserver.vm.getVolumes", workloadId, params,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVolumeList_error, data); //虚拟机磁盘列表查询失败
					}, function(data, textStatus, callbackParam) {
						callback($.VM_VOLUMN.fromJsonList(data),callbackParam);
					}, true, callbackParam);
		},
		getVolumeListWithParam : function(dataCenterId, workloadId,param,callback) {
			//默认以虚拟磁盘名称排序
			param += "&orderBy=name:asc";
			pc.rest.get(dataCenterId, "pc.winserver.vm.getVolumes", workloadId, param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVolumeList_error, data); //虚拟机磁盘列表查询失败
					}, function(data, textStatus) {
						callback($.VM_VOLUMN.fromJsonList(data),data.recordTotal);
					});
		},
		/**
		 * 虚拟机磁盘列表查询(根据类型)
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface GET:wce/api/workloads/{workloadId}/volumes
		 * 
		 */
		getVolumeListByType : function(dataCenterId, workloadId, param,callback) {
			pc.rest.get(dataCenterId, "pc.winserver.vm.getVolumes", workloadId, param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVolumeListByType_error, data); //虚拟机磁盘列表查询失败
					}, function(data, textStatus) {
						callback($.VM_VOLUMN.fromJsonList(data),data.recordTotal);
					});
		},

		/**
		 * 虚拟机添加存储卷
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param dataObj :{
		 *            "name":"disk1", "storagePoolId":132456, "size":10
		 *            "shared":true }
		 * @interface POST:wce/api/workloads/{workloadId}/volumes
		 */
		addVolume : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.addVolume", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_addVolume_error, data); //虚拟机添加存储卷出错
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机挂载存储卷
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param dataObj:{
		 *            "workloadId":123456 }
		 * @interface POST:wce/api/volumes/{volumeId}
		 */
		mountVolume : function(dataCenterId, volumeId, dataObj, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.mountVolume", volumeId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_mountVolume_error, data); //虚拟机挂载存储卷出错
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机卸载存储卷
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param dataObj:{
		 *            "volumeId":123456 }
		 * @interface PUT:wce/workloads/{workloadId}/volumes
		 */
		unmountVolume : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.removeVolume", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_unmountVolume_error, data); //虚拟机卸载存储卷出错
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 删除虚拟机存储卷
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface DELETE :wce/workloads/{workloadId}/volumes/{volumeId}
		 */
		delVolume : function(dataCenterId, workloadId, volumeId, callback) {

		},

		/**
		 * 调整虚拟机存储卷
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		resizeVolume : function(dataCenterId, workloadId, volumeId, callback) {

		},

		/**
		 * 查询虚拟机光驱
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface GET:wce/api/workloads/{workloadId}/cds
		 */
		getCDROM : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getCds.json", function(data) {
					callback(data);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.getCds", workloadId, "", function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getCDROM_error, data); //查询虚拟机光驱失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机光驱加载数据
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface PUT : wce/api/workloads/{workloadId}/cds/{cdId}
		 */
		loadCDROM : function(dataCenterId, workloadId, cdId, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			var data = {};
			data.state = "insert";
			pc.rest.put(dataCenterId, "pc.winserver.vm.loadCd", workloadId + "," + cdId,
					JSON.stringify(data), function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_loadCDROM_error, data); //光驱加载数据失败
					}, function(data, textStatus) {
						callback(data);
					});
		},

		/**
		 * 虚拟机光驱弹出
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		openCDROM : function(dataCenterId, workloadId, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			var data = {};
			data.state = "eject";
			pc.rest.put(dataCenterId, "pc.winserver.vm.loadCd", workloadId + "," + cdId,
					JSON.stringify(data), function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_openCDROM_error, data); //光驱弹出失败
					}, function(data, textStatus) {
						callback(data);
					});
		},

		/**
		 * 查询虚拟机网络适配器列表
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface GET:wce/api/workloads/{workloadId}/nics
		 */
		getNicList : function(dataCenterId, workloadId, param, callback) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getNics.json", function(data) {
					callback(data);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.getNics", workloadId, param, function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getNicList_error, data); //查询虚拟机网络适配器列表失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 添加虚拟机网络适配器
		 * 
		 * @param dataCenterId
		 * @dataObj{ "networkId":"3", //网络ID "name":"wangyytest" //网卡名字
		 *           "macAddr":"dd:ew:4f:2d" //mac地址 }
		 * @param workloadId
		 * @interface POST:wce/api/workloads/{workloadId}/nics
		 */
		addNic : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId:"+dataCenterId+"workloadId:"+workloadId);
				alert(JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.addNic", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_addNic_error, data); //添加虚拟机网络适配器
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 修改虚拟机网络适配器
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @dataObj 
		 * @interface PUT: wce/api/workloads/{workloadId}/nics/{nicId} 
		 */
		modifyNic : function(dataCenterId, workloadId,nicId,dataObj,callback) {
			if (this.debug && pc.debug) {
				alert(JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.modifyNic", workloadId+","+nicId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_modifyNic_error, data); //修改虚拟机网络适配器出错
				$("#vmnic_edit_btn").attr("disabled",false);
			}, function(data, textStatus) {
				callback(data);
			});
		},

		editIpAddress : function(dcId, vmId, putBody, callback){
			pc.rest.put(dcId, "pc.winserver.vm.editIpAddress", vmId, JSON
					.stringify(putBody), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_modifyNic_error, data); //修改虚拟机网络适配器出错
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 删除虚拟机网络适配器
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface DELETE:wce/api/workloads/{workloadId}/nics/{nicId}
		 */
		delNic : function(dataCenterId, workloadId, nicId, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId:"+dataCenterId+"workloadId:"+workloadId+"nicId"+nicId);
				callback(true);
				return;
			}
			pc.rest.del(dataCenterId, "pc.winserver.vm.delNic",
					workloadId + "," + nicId, "", function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_delNic_error, data); //删除虚拟机网络适配器失败
					}, function(data, textStatus) {
						callback(data);
					});
		},

		/**
		 * 获取虚拟机快照列表
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getSnapshots : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 获取虚拟机快照详情
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getSnapshotDetail : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 创建虚拟机快照
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		createSnapshot : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 还原虚拟机快照
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		restoreSnapshot : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 删除虚拟机快照
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		delSnapshot : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 虚拟机cpu利用率
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getCpuUseRatio : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 虚拟机mem利用率
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getMemUseRatio : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 虚拟机disk IO
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getDiskIO : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 虚拟机net IO
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getNetIO : function(dataCenterId, workloadId, callback) {

		},

		/**
		 * 校验虚拟机名称是否重复
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		checkVmName : function(dataCenterId, name, callback) {
			if (this.debug && pc.debug) {
					callback(name==internationalizationObj.rm_modal_vm_checkVmName_vmName); //虚拟机名称
				return;
			}
			var param = {
				"vmNames":name
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.hasSameName","",param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_checkVmName_error, data); //校验虚拟机名称失败
					}, function(data, textStatus) {

						var isExist = false;
						if(data && data[0]){
							isExist =  data[0].isExist;
						}
						callback(isExist);
					});
		},
		/**
		 * 批量校验虚拟机名称是否重复
		 * 
		 * @param dataCenterId
		 * @interface 
		 */
		checkVmNameBatch : function(dataCenterId, name, callback) {
			var param = {
				"vmNames":name
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.hasSameName","",param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_checkVmNameBatch_error, data); //批量校验虚拟机名称失败
					}, function(data, textStatus) {
						callback(data);
					});
		},

		/**
		 * 虚拟机可迁移目标
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @param migrateType 类型：vm、vmAndStorage
		 * @interface GET:wce/api/workloads/{workloadId}/relocation
		 */
		canMoveTarget : function(dataCenterId, workloadId,migrateType, callback) {
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.relocation.json", function(data) {
					callback(data);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.migrateTargets", workloadId, "migrateType="+migrateType,
					function(data, textStatus) {
						hideLoading();
						showError(internationalizationObj.rm_modal_vm_canMoveTarget_error, data); //虚拟机可迁移目标获取失败
					}, function(data, textStatus) {
						callback(data);
					});
		},

		/**
		 * 虚拟机迁移
		 * 
		 * @param dataCenterId
		 * @dataObj { "targetId":123456 //*要迁移到那台物理主机上 }
		 * @param workloadId
		 * @interface PUT:wce/api/workloads/{workloadId}/relocation
		 */
		relocateVm : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.put(dataCenterId, "pc.winserver.vm.migrate", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_relocateVm_error, data); //虚拟机迁移出错
				if(typeof(deployFail_storage) == "function"){
					deployFail_storage();
				}
				if(typeof(deployFail_vm) == "function"){
					deployFail_vm();
				}
				if(typeof(deployFail_vm_storage) == "function"){
					deployFail_vm_storage();
				}
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 虚拟机转换成模板
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface PUT : wce/api/templates/convertVM/{vmId:\\d+}
		 * @DATAOBJ { "templateName":"xxx", //新生成模板名称,非空 "repositoryId":xxx
		 *          //新模板归属模板库不能为空，非空 }
		 * 
		 */
		transitionTemplate : function(dataCenterId, workloadId, dataObj,
				callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.convert", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_transitionTemplate_error, data); //虚拟机转换成模板失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 克隆虚拟机
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @dataObj { "newVmName"："test" //*新克隆出来的虚拟机的名字 "storagePoolId":123456
		 *          //说明：快速复制就不需要这个值，完全复制需要这个值 }
		 * @interface POST : wce/api/vms/{workloadId}/clone
		 */
		copyVm : function(dataCenterId, workloadId,dataObj, callback) {
			if (this.debug && pc.debug) {
				alert("dataCenterId:"+dataCenterId+"workloadId:" +workloadId);
				alert("Data:"+JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.clone", workloadId,JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_copyVm_error, data); //克隆虚拟机出错
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 *虚拟机复制可用存储列表
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface GET : wce/api/vms/{vmId}/clone/targetStorages
		 */
		copyVmAvailStorge :function(dataCenterId, workloadId,hostId, callback){
			if (this.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.copyTargetStorages.json", function(data) {
					callback(data.storages);
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.copyTargetStorages", workloadId, "hostId="+hostId,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_copyVmAvailStorge_error, data); //虚拟机复制可用存储列表获取失败
					}, function(data, textStatus) {
						callback(data.storages);
					});
		},

		/**
		 * 虚拟机另存为模板
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 *            dataObj { "templateName":"xxx", //新生成模板名称,非空
		 *            "repositoryId":xxx //新模板归属模板库，非空 }
		 * @interface PUT ：wce/api/templates/cloneVM/{vmId}
		 */
		savaAsTemplate : function(dataCenterId, workloadId, dataObj, callback) {
			if (this.debug && pc.debug) {
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.saveAsTemplate", workloadId, JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_savaAsTemplate_error, data); //虚拟机另存为模板失败
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 获取操作系统列表
		 * 
		 * @param dataCenterId
		 * @param workloadId
		 * @interface 未知
		 */
		getOSlist : function(dataCenterId, callback) {

		},

		/**
		 * 部署虚拟机
		 * 
		 * @param dataCenterId
		 * @param dataObj {
		 *            "templateId": 2180, //*镜像ID "targetId": "73806",
		 *            //*目标主机的ID,或者目标资源池的ID "targetType": "host",
		 *            //*目标类型,主机或者资源池,这里根据平台不同选择也不同 "name": "WCM_TEST_032",
		 *            //*虚拟机名称 "state": "EXECUTING", //*状态,EXECUTING即立即执行部署
		 *            "description": "miaoshu", //虚拟机描述 "minCpu": 0.1,
		 *            //CPU最小处理单元 "cpu":0.2, //*CPU大小 "maxCpu": 1.0, //CPU最大处理单元
		 *            "minVcpu":1 //最小vcpu "vcpu":1, //*vcpu大小 "maxVcpu":1
		 *            //最大vcpu "minMem": 128, //最小内存MB "memory":512, //*内存大小MB
		 *            "maxMem": 1024, //最大内存MB "disk":5, //*存储大小 "ip":
		 *            "192.168.2.152", //*IP "hostName": "test2", //*主机名
		 *            "password":"padmin", //虚拟机密码,某些平台现在还不支持密码的设置
		 *            "storagePoolId":123456, //*存储池ID "vnetConfig":{
		 *            //*网络参数设置,根据不同平台,设置不同 "dns1": "192.168.2.156", //主DNS
		 *            "gateway": "192.168.2.1", //网关 "netmask":
		 *            "255.255.255.0",//掩码 "dnsDomain": "gzhdi.com", //域名
		 *            "dns2": "192.168.2.156", //辅助DNS "mac":"eF:DD:DS:4D",
		 *            //mac地址 "vnetworkId": "134562" //*Vlan的Id },
		 *            "customization": { //各个虚拟化平台的差异参数都放在这里面传递
		 *            "productkey":"5Z49H-AM00H-481H8-DA1X2-AGR12",
		 *            //Vmware平台参数： 可选,产品密钥,windows系统 "timezone":"",
		 *            //Vmware平台参数： 可选,时区,不填默认为北京时区,windows系统 "workgroup":
		 *            "WORKGROUP", //Vmware平台参数：可选,工作组,不填默认为WORKGROUP,windows系统
		 *            "cpuWeight":1234, //XCP平台,cpu权重 "cpuMark":"2,3,4"
		 *            //XCP平台,设置cpu和物理主机核的绑定,这里的数据量要和vcpu数量相等 } }
		 * @interface POST:wce/api/vms
		 */
		deploy : function(dataCenterId, dataObj,deployFail, callback) {
			if (this.debug && pc.debug) {
				alert(JSON.stringify(dataObj));
				callback(true);
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.deploy", "", JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_deploy_error, data); //部署虚拟机出错
				deployFail();
			}, function(data, textStatus) {
				callback(data);
			});
		},
		
		/*
		 * 批量部署虚拟机
		 */
		deployBatch : function(dataCenterId, dataObj,deployFail, callback) {
			pc.rest.post(dataCenterId, "pc.winserver.vm.deployBatch", "", JSON
					.stringify(dataObj), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_deployBatch_error, data); //批量部署虚拟机出错
				deployFail();
			}, function(data, textStatus) {
				callback(data);
			});
		},
		
		/**
		 * 根据主机id查看虚拟机列表
		 * @param hostId
		 *  @param workloadId
		 * @interface get:wce/api/vms
		 */
        getVmListByHostId : function(dataCenterId, hostId,callback){
        	if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback($.VM.fromJsonList(data));
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.getList","" ,"ownerHostId="+hostId,
					function(data, textStatus) { 
						showError(internationalizationObj.rm_modal_vm_getVmListByHostId_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback($.VM.fromJsonList(data));
					});
        },
        /**
		 * 根据主机id查看虚拟机列表
		 * @param hostId
		 * @param workloadId 
		 * @param pageParam name=wu&orderBy=memory:asc&search=192.168&state=OK,STOPPED 
		 * @interface get:wce/api/vms
		 */
        getVmListByHostIdWithParam : function(dataCenterId, hostId,pageParam,callback){
        	if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback($.VM.fromJsonList(data));
				});
				return;
			}
			var param ="";
			if(typeof pageParam == "string"){
				param = "ownerHostId="+hostId+"&"+pageParam;
			}else{
				param = pageParam;
				param.ownerHostId = hostId;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.getList","" ,param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVmListByHostIdWithParam_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback($.VM.fromJsonList(data),data.recordTotal);
					});
        },
        /**
		 * 根据池id查看虚拟机列表
		 * @param poolId
		 * @param workloadId
		 * @param pageParam name=wu&orderBy=memory:asc&search=192.168&state=OK,STOPPED 
		 * @interface get:wce/api/vms
		 */
      getVmListByPoolIdWithParam : function(dataCenterId, poolId,param,callback){
      	if ($.VM.debug && pc.debug) {
			$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
				callback($.VM.fromJsonList(data));
			});
			return;
			}
			param.poolId = poolId;
			pc.rest.get(dataCenterId, "pc.winserver.vm.getList","" ,param,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVmListByPoolIdWithParam_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback($.VM.fromJsonList(data),data.recordTotal);
					});
        },
        /**
		 * 根据池id查看虚拟机列表
		 * @param dataCenterId
		 *  @param poolId
		 * @interface get:wce/api/vms
		 */
        getVmListByPoolId : function(dataCenterId, poolId,callback){
        	if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback($.VM.fromJsonList(data));
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.winserver.vm.getList","" ,{"poolId":poolId},
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVmListByPoolId_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback($.VM.fromJsonList(data));
					});
        },
		
		/**
		 * 查看虚拟机列表
		 * 
		 * @param dataCenterId
		 * @interface get:wce/api/vms
		 */
		getVms : function(dataCenterId, callback) {
			if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback(data.vms);
				});
				return;
			}

			pc.rest.get(dataCenterId, "pc.winserver.vm.getList", "", "",
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVms_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback(data);
					});
		},
		
	    /**
	     * 计算运行时间（入参为毫秒）
	     * time 为间隔时间
	     */
	    dateDiff : function(time){
	    	if(!pc.util.isNotNull(time)) return "";
	    	try{
	    		var diff = (time/1000).toFixed(0);
	    		var _s = 24 * 60 * 60;
	    		var _h = 60 * 60;
	    		
	    		var day = parseInt(diff/_s);
	    		var h = parseInt(diff%_s/_h);
	    		var m = parseInt(diff%_s%_h/60);
	    		var s = diff%_s%_h%60;
	    		if(isNaN(day)||isNaN(h)||isNaN(m)||isNaN(s)){
	    			return "";
	    		}
	    		//day+"天"+ h+"小时"+m+"分钟"+s+"秒";
	    		return day+internationalizationObj.rm_modal_vm_dateDiff_day+ h+internationalizationObj.rm_modal_vm_dateDiff_hours+m+internationalizationObj.rm_modal_vm_dateDiff_min+s+internationalizationObj.rm_modal_vm_dateDiff_sec;    
	    		
	    	}catch(e){
	    		return "";
	    	}
	    },
	    /**
	     * 虚拟机控制台
	     */
	    vmConsole: function(dcId, vmId,orginalId,ownerHostId,poolId) {
			$.VM.getVmInfo(dcId, vmId, function(data){
				_loadVmConsole(data);
			})
			
			function _loadVmConsole(data){
				var poolId = data.poolId;
				var ownerHostId = data.ownerHostId;
				var orginalId = data.orginalId;
				var vmName = data.name;
				var controlDomain  = (data.controlDomain == "true" || data.controlDomain == true)
				if(pc.util.isNotNull(poolId)){
					$.HOST.getListByPool(dcId,poolId,function(data){
						var ownerHostVo;
						var masterHostVo;
						for(i in data){
							var hostVO = data[i];
							if(ownerHostId == hostVO.hostId){
								ownerHostVo = hostVO;
							}
							
							if(hostVO.hostType == "Master"){
								masterHostVo = hostVO;
							}
						}
					   _openConsole(orginalId,masterHostVo.ip,masterHostVo.userName,masterHostVo.password,vmName,masterHostVo.originalId,ownerHostVo.ip,controlDomain);
					});
				}else{
					$.HOST.getHost(dcId,ownerHostId,function(data){
						if(data != null){
							var hostVO  = data;
							_openConsole(orginalId,hostVO.ip,hostVO.userName,hostVO.password,vmName,hostVO.originalId,hostVO.ip,controlDomain);
						}
					 });
				}
			}
			
			
			/**
			 * 打开控制台
			 * @param uuid
			 * @param hostIp
			 * @param user
			 * @param pwd
			 */
			function _openConsole(uuid,hostIp,user,pwd,vmName,originalId,ownerHostIp,controlDomain){
			    //var hostIp = "10.0.0.26";
		       // var user = "root";
		       // var pwd = "test123";
		        //var uuid = orginalId//"36a89515-e6d7-89f8-0464-f05866163052";
				
				$.ajax({
		            url: '/pc/consoleServlet',
		            type: 'post',
		            cache: false,
		            data: {
		            	originalId:originalId,
		            	hostIp:hostIp,//master 
		            	ownerHostIp:ownerHostIp,//所属物理主机的
		            	user:user,
		            	pwd:pwd,
		            	uuid:uuid,
		            	useHtml5:$.VM.useHtml5Console()
		            },
		            dataType: 'json',
		            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		            async: true,
		            error: function(XMLHttpRequest, textStatus, errorThrown) {
		            },
		            success: function(data, textStatus) {
		            	if(!pc.util.isNotNull(data.location)){
		            		alert(internationalizationObj.rm_modal_vm_openConsole_alert); //正在初始化控制台，请稍后再试！
		            		return;
		            	}
		            	var opaqueRef= data.opaqueRef;
		            	var location = data.location;
		            	var port = data.port;
		            	var cif= data.cif;
		            	var uuid = data.uuid;
		            	var hostIp = data.hostIp;
		            	var ownerHostIp = data.ownerHostIp;
		            	var scuuid = data.scuuid;
		            	var url ="";
		            	if(data.useHtml5){
		            		$.SYSSETTING.querySysSettings("key=noVnc", function(settingData,totalNum){
		            			if(totalNum>0 && settingData ){
		            				 var novncURI = settingData[0].value;
		            				 if(novncURI == "" ||  novncURI == null){
		            						alert("请先在【系统管理】下的【系统配置】中配置WinServer控制台代理！");
		            				 }else{
		            					 var url =  "https://"+novncURI+"/vnc_auto.html?path="+encodeURIComponent("websockify/?token="+hostIp+":80")+"&opaqueRef="+encodeURIComponent(opaqueRef) 
					             			+"&name="+encodeURIComponent(vmName)+"&hostIp="+encodeURIComponent(hostIp)+"&uuid="+encodeURIComponent(uuid);
				            			 vmConsoleWindow = window.open(url,"winservervm"+vmId);
		            				 }
		            			}else{
		            				alert("请先在【系统管理】下的【系统配置】中配置WinServer控制台代理！");
		            			}
		            		}, false)
		            	    return;
		            	}else if(data.isDefinition == "true" || data.isDefinition == true){//是否支持高清
		            		 url = encodeURI("pages/vm/vmHighConsole.jsp?port="+encodeURIComponent(port)+"&name="+encodeURIComponent(vmName));
		            	}else if(data.isSupportLocDev){
		            		 url =  encodeURI("pages/vm/vmConsoleSupLoc.jsp?opaqueRef="+encodeURIComponent(opaqueRef) 
				            			+"&name="+encodeURIComponent(vmName)+"&hostIp="+encodeURIComponent(hostIp)+"&uuid="+encodeURIComponent(uuid));
		            	}else{
		            		 url =  encodeURI("pages/vm/vmConsole.jsp?opaqueRef="+encodeURIComponent(opaqueRef)+"&location="+encodeURIComponent(location)
				            			+"&name="+encodeURIComponent(vmName)+"&cif="+encodeURIComponent(cif)+"&uuid="+encodeURIComponent(uuid)
				            			+"&ownerHostIp="+encodeURIComponent(ownerHostIp)+"&scuuid="+encodeURIComponent(scuuid)+"&isdom0="+encodeURIComponent(controlDomain));
		            	}
		            	vmConsoleWindow = window.open(url,"winservervm"+vmId);
		            }
		        });
			}
		},
		useHtml5Console:function(){
			var useHtml5 = false;
			try {
				var browserInfo = pc.util.getBrowserInfo();
				if(browserInfo &&  (browserInfo+"").indexOf("chrome") != -1){//chrome 浏览器版本大于43时不支持applet，所以采用html5实现控制台
					var verinfo = (browserInfo+"").replace(/[^0-9.]/ig,""); 
					var mVersion = verinfo.split(".")[0];
					if(mVersion > 42){//chrome 42版本后不支持applet 
						useHtml5 = true;
					}
				}
			} catch (e) {
			}
			return useHtml5;
		},
		getVmStateView : function(dataCenterId, workloadId, params, callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.getStateView", workloadId, params, 
				function(data){
					showError(internationalizationObj.rm_modal_vm_getVmStateView_error, data); //获取虚拟机可用率数据失败
				},function(data){
				    if(data && data.result && data.result.length > 1){
				        var m = new Map();
				        m.put(data.result[0].start, data.result[0].start);
				        for(var i=1;i<data.result.length;i++){
				            if(m.get(data.result[i].start) == data.result[i].start){
				                data.result.splice(i,1);
				                i--;
				            }
				            else {
				                m.put(data.result[i].start, data.result[i].start);
				            }
				        }
				    }
					callback(data);
				}
			);
		},
		
		
		/**
		*    因为只检查了WINSERVER平台，所以本方法已被废除，请调用plartform.js中的同名方法
		*/
		checkMacExist : function(dataCenterId, postBody, callback,errorCallBack) {
			if (this.debug && pc.debug) {
				return;
			}
			pc.rest.post(dataCenterId, "pc.winserver.vm.checkMac", "", JSON
					.stringify(postBody), function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_checkMacExist_error, data); //校验MAC地址失败
				errorCallBack();
			}, function(data, textStatus) {
				callback(data);
			}, false);
		},
		checkVmHa : function(dataCenterId,vmId,poolId,callback){
			var postBody = new Object();
			postBody.resourcePoolId = ""+poolId;
			pc.rest.post(dataCenterId, "pc.winserver.vm.checkVmHa", vmId, JSON
					.stringify(postBody), function(
					data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_checkVmHa_error, data); //获取虚拟机重启方式失败
			}, function(data, textStatus) {
				callback(data.restartType);
			});
		},
		gatherBackupFile : function(dataCenterId,param,callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.gatherBackupFile", "",param,function(){},function(data,textStatus){
				callback(data);
			});
		},
		
		importVm : function(dataCenterId,uploadId, body, callback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.postImportVm", uploadId, JSON.stringify(body), 
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_importVm_error, data); //导入虚拟机失败
					}, 
					function(data, textStatus) {
						callback(data);
					}
			);
		},
		newImportVm : function(dataCenterId, body, callback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.postImportVm", "", JSON.stringify(body), 
					function(data, textStatus) {
						showError("导入虚拟机失败", data);
					}, 
					function(data, textStatus) {
						callback(data);
					},true,false
			);
		},
		exportVm : function(dataCenterId,vmId,param, callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.getExportVm", vmId, param, 
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_exportVm_error, data); //导出虚拟机失败
					}, 
					function(data, textStatus) {
						callback(data);
					}
			);
		},
		/*
		downloadVm : function(dataCenterId,vmId, callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.getDownloadVm", vmId, "", 
					function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_downloadVm_error, data); //下载虚拟机失败
			}, 
			function(data, textStatus) {
				callback(data);
			}
			);
		},*/
		getTmpSize : function (dcId,callback){
			pc.rest.get(dcId,"pc.winserver.vm.getTmpSize","","",function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getTmpSize_error, data); //获取临时目录大小失败
			}, 
			function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 虚拟机在线迁移可迁移的服务器
		 * **/
		getOnLineMigrateServer : function(dataCenterId,vmId,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.onLineMigrateServer",vmId,"",
					function(data, textStatus){
						hideLoading();
						showError(internationalizationObj.rm_modal_vm_getOnLineMigrateServer_error, data); //获取虚拟机可迁移的服务器失败
					},
					function(data, textStatus){
						callback(data.targets);
					}
			);
		},
		/**
		 * 虚拟机在线迁移
		 * */
		onLineMigrateVm : function(dataCenterId,vmId,params,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.onLineMigrateVm",vmId,params,
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_onLineMigrateVm_error, data); //虚拟机在线迁移失败
					},
					function(data, textStatus){						
						callback(data.taskId);
					}
			);
		},
		/**
		 * 判断虚拟机的磁盘是否在共享存储池上  不再使用
		 * 
		getVmIsStorageShare : function(dataCenterId,vmId,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.onLineMigrateVmStorageShare",vmId,"",
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_getVmIsStorageShare_error, data); //判断虚拟机的磁盘是否在共享存储池上失败
					},
					function(data, textStatus){
						callback(data.targets);
					}
			);
		},*/
		 /**
		 * 根据vAppID查看虚拟机列表
		 * @param dataCenterId
		 *  @param vAppId
		 * @interface get:wce/api/vms
		 */
        getVmListByVAppId : function(dataCenterId, vAppId,callback){
        	if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback($.VM.fromJsonList(data));
				});
				return;
			}
			pc.rest.get(dataCenterId, "pc.vApp.getVmInVApp",vAppId ,"",
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVmListByVAppId_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback($.VM.fromJsonList(data));
					});
        },
        discoverVm:function(dataCenterId,vmId,callback){
        	pc.rest.get(dataCenterId,"pc.winserver.vm.discovervm",vmId,"",
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_discoverVm_error, data); //收集虚拟机失败
					},
					function(data, textStatus){
						callback(data);
					}
			,true, "", false);
        },
        getVmVcpuBindData:function(dataCenterId,vmId,callback){
        	pc.rest.get(dataCenterId,"pc.winserver.vm.getVcpuBind",vmId,"",
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_getVmVcpuBindData_error, data); //获取虚拟机VCPU绑定数据失败
					},
					function(data, textStatus){
						callback(data);
					}
			);
        	
        },
        setVmVcpuBindData:function(dataCenterId,vmId,param,callback){
        	pc.rest.post(dataCenterId,"pc.winserver.vm.setVcpuBind",vmId,JSON.stringify(param),
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_setVmVcpuBindData_error, data); //设置虚拟机VCPU绑定失败
					},
					function(data, textStatus){
						callback(data);
					});
        },
        /**
		 * 虚拟机在线迁移可迁移的服务器
		 * **/
		getCopyServer : function(dataCenterId,vmId,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.copyTargetServer",vmId,"",
					function(data, textStatus){
						hideLoading();
						showError(internationalizationObj.rm_modal_vm_getCopyServer_error, data); //获取虚拟机可复制的服务器失败
					},
					function(data, textStatus){
						callback(data.target);
					}
			);
		},
        /**
		 * 获取存储池关联的虚拟机列表
		 * **/
		getVmListByStorage : function(dataCenterId,storageId,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.getVmListByStorage",storageId,"",
					function(data, textStatus){
						hideLoading();
						showError(internationalizationObj.rm_modal_vm_getVmListByStorage_error, data); //获取存储池关联的虚拟机列表失败
					},
					function(data, textStatus){
						callback(data.vms);
					}
			);
		},
		/**
		 * 根据条件获取虚拟机列表
		 */
		getVmsByParams : function(dataCenterId, params, callback) {
			if ($.VM.debug && pc.debug) {
				$.getJSON("/rmJs/mock/vm.getList.json", function(data) {
					callback(data.vms);
				});
				return;
			}

			pc.rest.get(dataCenterId, "pc.winserver.vm.getList", "", params,
					function(data, textStatus) {
						showError(internationalizationObj.rm_modal_vm_getVmsByParams_error, data); //虚拟机信息获取失败
					}, function(data, textStatus) {
						callback(data, data.recordTotal);
					});
		},
        /**
		 * 虚拟机备份
		 * **/
		backupVm : function(dataCenterId,vmId,param,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.backupVm",vmId,JSON.stringify(param),
					function(data, textStatus){
						hideLoading();
						$("#btn_run_backup").removeAttr("disabled");
						showError(internationalizationObj.rm_modal_vm_backupVm_error, data); //虚拟机执行备份失败
					},
					function(data, textStatus){
						$("#btn_run_backup").removeAttr("disabled");
						callback(data.taskId);
					}
			);
		},
        /**
		 * 还原虚拟机
		 * **/
		restoreVm : function(dataCenterId,fileId,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.restoreVm",fileId,"",
					function(data, textStatus){
						hideLoading();
						showError(internationalizationObj.rm_modal_vm_restoreVm_error, data); //还原虚拟机失败
					},
					function(data, textStatus){
						callback(data.taskId);
					}
			);
		},
		
		 /**
		 * 创建虚拟机备份计划
		 * **/
		backupVmPlan : function(dataCenterId,vmId,param,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.createBackupVmPlan",vmId,JSON.stringify(param),
					function(data, textStatus){
						hideLoading();
						$("#btn_new_backuppllan").removeAttr("disabled");
						showError(internationalizationObj.rm_modal_vm_backupVmPlan_error, data); //创建虚拟机备份计划失败
					},
					function(data, textStatus){
						callback(data);
					}
			);
		},
		 /**
		 * 立刻执行虚拟机备份
		 * **/
		backupVm : function(dataCenterId,vmId,param,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.backupVm",vmId,JSON.stringify(param),
					function(data, textStatus){
						hideLoading();
						$("#btn_run_backup").removeAttr("disabled");
						showError(internationalizationObj.rm_modal_vm_backupVm_error, data); //虚拟机执行备份失败
					},
					function(data, textStatus){
						callback(data);
					}
			);
		},
		/**
		 * 获取虚拟机备份计划列表
		 * **/
		backupVmPlanList : function(dataCenterId,param,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.getBackupVmPlanList","",param,
					function(data, textStatus){
				hideLoading();
				showError(internationalizationObj.rm_modal_vm_backupVmPlanList_error, data); //获取虚拟机备份计划列表失败
			},
			function(data, textStatus){
				callback(data,data.recordTotal);
			}
			);
		},
		/**
		 * 获取虚拟机备份列表
		 * **/
		backupVmsList : function(dataCenterId,params,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.getBackupVmsList","",params,
					function(data, textStatus){
				hideLoading();
				showError(internationalizationObj.rm_modal_vm_backupVmsList_error, data); //获取虚拟机备份列表失败
			},
			function(data, textStatus){
				callback(data);
			}
			);
		},
		/**
		 * 获取虚拟机备份文件列表
		 * **/
		backupFilesList : function(dataCenterId,param,callback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.findBackupFile","",param,
					function(data, textStatus){
				hideLoading();
				showError(internationalizationObj.rm_modal_vm_backupFilesList_error, data); //获取虚拟机备份文件列表失败
			},
			function(data, textStatus){
				callback(data,data.recordTotal);
			}
			);
		},
		/**
		 * 删除虚拟机备份计划
		 * **/
		backupVmPlanDelete : function(dataCenterId,jobId,callback){
			pc.rest.del(dataCenterId,"pc.winserver.vm.backupVmPlanDelete",jobId,"",
					function(data, textStatus){
				hideLoading();
				showError(internationalizationObj.rm_modal_vm_backupVmPlanDelete_error, data); //删除虚拟机备份计划失败
			},
			function(data, textStatus){
				callback(data);
			}
			);
		},
		/**
		 * 修改虚拟机备份计划
		 * **/
		backupVmPlanModefy : function(dataCenterId,jobId,param,callback){
			pc.rest.put(dataCenterId,"pc.winserver.vm.backupVmPlanUpdate",jobId,JSON.stringify(param),
					function(data, textStatus){
						hideLoading();
						$("#btn_new_backuppllan").removeAttr("disabled");
						showError(internationalizationObj.rm_modal_vm_backupVmPlanModefy_error, data); //修改虚拟机备份计划失败
					},
					function(data, textStatus){
						callback(data);
					}
			);
		},
		/**
		 * 删除虚拟机备份文件
		 * **/
		backupVmFileDelete : function(dataCenterId,fileId,callback){
			pc.rest.del(dataCenterId,"pc.winserver.vm.backupVmFileDelete",fileId,"",
					function(data, textStatus){
				hideLoading();
				showError(internationalizationObj.rm_modal_vm_backupVmFileDelete_error, data); //删除虚拟机备份文件失败
			},
			function(data, textStatus){
				callback(data);
			}
			);
		},
		/**
		 * 查询不在组下的虚拟机
		 */
		getVmNotInGro : function(dataCenterId,resourcePoolId,params,callback){
			pc.rest.get(dataCenterId, "pc.winserver.fireWall.getChoosableVM", resourcePoolId, params, function(data,textStatus){
				showError(internationalizationObj.rm_modal_vm_getVmNotInGro_error,data+":"+textStatus); //查询不在组下的虚拟机失败！
			}, function(data){
				callback($.VM.fromJsonList(data),data.recordTotal);
			});
		},
		/**
		 * 同步导出vhd
		 */
		exposeVhd : function(dataCenterId,vmId,params,callback){
			pc.rest.post(dataCenterId,"pc.winserver.vm.exposeVhd",vmId,JSON.stringify(params),
					function(data, textStatus){
						showError(internationalizationObj.rm_modal_vm_exposeVhd_error, data); //导出vhd失败
					},
					function(data, textStatus){
						callback(data);
					},false);
		},
		/**
		 * 同步关闭传输虚拟机 
		 
		closeTransfer : function(dataCenterId,vmId,params,callback){
			pc.rest.del(dataCenterId, "pc.winserver.vm.closeTransfer",vmId,JSON.stringify(params), function(
					data, textStatus) { 
				showError(internationalizationObj.rm_modal_vm_closeTransfer_error, data); //删除传输虚拟机失败
			}, function(data, textStatus) {
				callback(data);
			},false);
		},*/
		
		/**
		 * 修改虚拟机名称
		 * putBody：{"state":"RENAME", "name":"test" //新的虚拟机名字 }
		 */
		updateVmName : function(dataCenterId,vmId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.vmRename", vmId, JSON
					.stringify(putBody), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_updateVmName_error, data); //虚拟机重命名失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		getVmBIOS : function(dataCenterId,vmId,callback){
			/*if (true) {
				$.getJSON("/rmJs/mock/vmBIOS.json", function(data) {
					callback(data);
				});
				return;
			}*/
			pc.rest.get(dataCenterId, "pc.winserver.vm.getVmBIOS", vmId, "", function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_getVmBIOS_error, data); //获取虚拟机BIOS失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		updateVmBIOS : function(dataCenterId,vmId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.editVmBIOS", vmId, JSON
					.stringify(putBody), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_updateVmBIOS_error, data); //修改虚拟机BIOS失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		
		/**
		 * 查询批量部署虚拟机最大个数
		 */
		getDeployVmBatchMaxNum : function(callback){
		    pc.rest.get(0,"pc.api.sys.getWincenterConfigValue","deploy_vm_batch_max_num","",
	                function(data, textStatus){},
	                function(data, textStatus){
	                        callback(data);
	                }
	            );
		},
		/**
		 * 获取重置虚拟机密码功能的开关
		 */
		getVmChangePasswordSwitch : function(callback){
		    pc.rest.get(0,"pc.api.sys.getWincenterConfigValue","vm_change_password_switch","",
	                function(data, textStatus){},
	                function(data, textStatus){
	                        callback(data);
	                }
	            );
		},
		/**
		 * 获取虚拟机导入导出OVF功能的开关
		 */
		getVmOvfSwitch : function(callback){
		    pc.rest.get(0,"pc.api.sys.getWincenterConfigValue","winserver_vm_ovf_switch","",
	                function(data, textStatus){},
	                function(data, textStatus){
	                        callback(data);
	                }
	            );
		},
		/**
		 * 获取DVD
		 */
		getCds : function(dataCenterId,vmId,errorCallback,successCallback){
			pc.rest.get(dataCenterId,"pc.winserver.vm.getVmCds",vmId,"",function(data){
				errorCallback(data);
			},function(data){
				successCallback(data);
			});
		},
		vmAutoPoweron : function(dataCenterId,postBody,callback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.vmAutoPoweron", "", JSON
					.stringify(postBody), function(data, textStatus) {
				showError(internationalizationObj.rm_modal_vm_vmAutoPoweron_error, data); //设置虚拟机随主机启动失败
			}, function(data, textStatus) {
				callback(data);
			});
		},
		vmMagrateCheckRule : function(dataCenterId,vmId, hostId, callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.vmMagrateCheckRule", vmId+","+hostId, "", function(data, textStatus) {
				//showError(internationalizationObj.rm_modal_vm_updateVmBIOS_error, data); //修改虚拟机BIOS失败
			}, function(data, textStatus) {
				callback(data);
			},false);
		},
		
		/**
		 * 恢复即将删除的虚拟机
		 */
		recoverFromDelayDel : function(dataCenterId,vmId,callback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.recoverFromDelayDel", vmId, "", function(data, textStatus) {
				showError("恢复即将删除的虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 移除虚拟机
		 */
		remove : function(dataCenterId,vmId,callback){
			pc.rest.del(dataCenterId, "pc.winserver.vm.remove", vmId, "", function(data, textStatus) {
				showError("移除虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 恢复移除的虚拟机
		 */
		recover : function(dataCenterId,vmId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.recover", vmId, JSON.stringify(putBody), function(data, textStatus) {
				showError("恢复移除的虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 批量删除虚拟机
		 */
		batchDelete : function(dataCenterId,postBody,callback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.batchDelete", "", JSON.stringify(postBody), function(data, textStatus) {
				showError("批量删除虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 批量移除虚拟机
		 */
		batchRemove : function(dataCenterId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.batchRemove", "",  JSON.stringify(putBody), function(data, textStatus) {
				showError("批量移除虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 批量恢复虚拟机
		 */
		batchRecover : function(dataCenterId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.batchRecover", "", JSON.stringify(putBody), function(data, textStatus) {
				showError("批量恢复虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 获取已移除虚拟机列表
		 */
		removeList : function(dataCenterId,param,callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.removeList", "", param, function(data, textStatus) {
				showError("获取已移除虚拟机列表失败", data);
			}, function(data, textStatus) {
				callback($.VM.fromJsonList(data),data.recordTotal);
			});
		},
		/**
		 * 获取已移除虚拟机列表(带权限)
		 */
		removeListPost : function(dataCenterId,param,callback){
			pc.rest.postWithQueryParam(dataCenterId, "pc.winserver.vm.getRemovedVmWithRole", "",param, "", function(data, textStatus) {
				showError("获取已移除虚拟机列表失败", data);
			}, function(data, textStatus) {
				callback($.VM.fromJsonList(data),data.recordTotal);
			});
		},
		
		/**
		 * 从虚拟盘还原已移除的虚拟机
		 */
		recoverRemovedVmByVolumn : function(dataCenterId,volumnId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.recoverByVolumn", volumnId, JSON.stringify(putBody), function(data, textStatus) {
				showError("从虚拟盘还原已移除虚拟机失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		/**
		 * 还原虚拟机可以配置相关信息入口
		 */
		restoreConfigVM:function(dataCenterId,resourcePoolId,hostId){
			 var uri = "pages/vm/restoreConfigVM.jsp?dcId="+dataCenterId;
			 if(pc.util.isNotNull(resourcePoolId)){
				 uri+="&resourcePoolId="+resourcePoolId;
			 }else if(pc.util.isNotNull(hostId)){
				 uri+="&hostId="+hostId;
			 }
			 showWizard(encodeURI(uri));
		},
		/**
		 * 还原虚拟机
		 */
		restoreByXva:function(dataCenterId,param,callback, errorCallback){
			pc.rest.post(dataCenterId, "pc.winserver.vm.restoreByXva", "", JSON.stringify(param), function(data, textStatus) {
				showError("还原虚拟机失败", data);
				if(errorCallback){
					errorCallback();
				}
			}, function(data, textStatus) {
				callback(data);
			});
		},
		setVmStartOptions : function(dcId, vmId, startParam, callback, errorCallback){
			pc.rest.put(dcId, "pc.winserver.vm.setVmStartOptions", vmId, JSON.stringify(startParam), function(data, textStatus){
				if(errorCallback){
					errorCallback(data, textStatus);
				}
			}, function(data){
				callback(data);
			});
		},
		/**
		 * 配置虚拟机高可用的自定义参数
		 */
		configHa:function(dataCenterId,putBody,callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.configHa", "", JSON.stringify(putBody), function(data, textStatus) {
				showError("配置虚拟机高可用参数失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},

		/**
		 * 修改CPU预留值时，需要先获取CPU的预留信息
		 * 如果虚拟机有4个VCPU，物理机有2个CPU，那么最大值就是200-已被预留的 
		 * 如果虚拟机有4个VCPU，物理机有5个CPU，那么最大值就是400-已被预留的
		 * @param  {[type]}   dcId     [description]
		 * @param  {[type]}   vmId     [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [{"min":10, "max": "1000"}]
		 */
		getCpuReserveLimit : function(dcId, vmId, callback){
			pc.rest.get(dcId, "pc.winserver.vm.getCpuReserveLimit", vmId, "", function(data, textStatus) {
				showError("获取虚拟机CPU预留限制失败", data);
			}, function(data, textStatus) {
				callback(data);
			}, false);//当前设定为同步方法
		},
		/**
		 * 获取可以创建VGPU的物理显卡列表
		 */
		getAvailPgpuList : function(dcId, vmId, callback){
			pc.rest.get(dcId, "pc.winserver.vm.getAvailPgpuList", vmId, "", function(data, textStatus) {
				showError("获取物理显卡列表失败", data);
			}, function(data, textStatus) {
				callback(data);
			}, false);//当前设定为同步方法
		},
		/**
		 * 获取可以创建VGPU的GPU组列表
		 */
		getAvailGpuGroupList : function(dcId, vmId, callback){
			pc.rest.get(dcId, "pc.winserver.vm.getAvailGpuGroupList", vmId, "", function(data, textStatus) {
				showError("获取GPU组列表失败", data);
			}, function(data, textStatus) {
				callback(data);
			}, true);
		},
		/**
		 * 配置虚拟机的虚拟显卡
		 */
		configVgpu:function(dataCenterId, vmId, putBody, callback){
			pc.rest.put(dataCenterId, "pc.winserver.vm.configVgpu", vmId, JSON.stringify(putBody), function(data, textStatus) {
				showError("配置虚拟显卡失败", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		checkUdev:function(dataCenterId, vmId, callback){
			pc.rest.get(dataCenterId, "pc.winserver.vm.checkUdev", vmId, "", function(data, textStatus) {
				showError("检查外接设备异常", data);
			}, function(data, textStatus) {
				callback(data);
			});
		},
		

		/**
		 * 检查虚拟机是否可以进行克隆操作，以下情况时，不能进行克隆
		 * 1、有直通设备
		 * 2、链接克隆的虚拟机
		 * 3.挂载了共享存储（其实如果挂载的共享存储对应的所有虚拟机都处于关机状态，还是可以正常克隆的，否则会报DI_IN_USE错误）
		 * 4.挂载了USB设备（不报错，但是会把USB盘也克隆成一块盘出来）
		 * 开机状态下，除了以上两种情况，还有以下情况也会报错：
		 * 1.挂载了ISO设备
		 * @param  {[type]} dcId [description]
		 * @param  {[type]} vmId [description]
		 * @param  {[callback]} callback [callback({isCopyAble:true, memoId:xxxx})]
		 * @return {[Object]}    [description]
		 */
		copyVmCheck: function(dcId, vmId, callback, hostState) {
			if (hostState && hostState != 'OK') {
					var cbp = {
						isCopyAble: false,
						memoId: 'vm_show_copyVm'
					};
					callback(cbp);
					return;
				}

			$.VM.getVmInfo(dcId, vmId, function(vm) {
				if (vm.state != 'OK' && vm.state != 'STOPPED') {
					var cbp = {
						isCopyAble: false,
						memoId: 'vm_show_copyVm'
					};
					callback(cbp);
					return;
				}
				if (pc.util.isNotNull(vm.pcis) || pc.util.isNotNull(vm.blockAttachDevs)) { //check point 1
		           var cbp = {
		              isCopyAble: false,
		              memoId: 'vm_summary_task4_directdevice'
		           };
		           callback(cbp);
		          return;
				}else if (pc.util.isNotNull(vm.vgpuList)) { //check point 2
			       var cbp = {
		              isCopyAble: false,
		              memoId: 'vm_summary_task4_configVgpu'
		           };
		           callback(cbp);
		          return;
				}
		        //2、链接克隆的虚拟机
		        else if (vm.linkedClone) {
		          var cbp = {
		            isCopyAble: false,
		            memoId: 'vm_summary_task4_linkClone'
		          };
		          callback(cbp);
		          return;
		        }
		        $.VM.getVolumeList(dcId, vmId, function(volumeList, vm) {
		        	var hasSharedVolumes = false;
		          var hasUsbDev = false;
		          if (volumeList) {
		          	for (var i = 0; i < volumeList.length; i++) {
		              if (volumeList[i].shared == "true" || volumeList[i].shared == true) {
		                hasSharedVolumes = true;
		                break;
		              }
		              if (volumeList[i].storageType == "udev") {
		                hasUsbDev = true;
		                break;
		              }
		            }
		            //3.挂载了共享存储
		            if (hasSharedVolumes) {
		              var cbp = {
		                isCopyAble: false,
		                memoId: 'vm_show_copyVm_has_shared_volume'	//虚拟机挂载了共享存储，不能执行此操作
		              };
		              callback(cbp);
		              return;
		            }
		            //4.挂载了USB设备
		            else if (hasUsbDev) {
		              var cbp = {
		                isCopyAble: false,
		                memoId: 'vm_show_copyVm_has_usb_device'
		              };
		              callback(cbp);
		              return;
		            }
		          }
		
		          if (vm.state == 'OK') {
		            $.VM_ISO.getVmIso(dcId, vmId, function(isos) {
		            	if (isos && isos.length > 0) {
		            		var cbp = {
		                  isCopyAble: false,
		                  memoId: 'vm_show_copyVm_has_iso'
		                };
		                callback(cbp);
		                return;
		            	}
		            	else{
		            		callback({ isCopyAble: true });
		            	}
		            });
		          } else{
		        		callback({ isCopyAble: true });
		        	}
		        }, vm);
			});
		},

		


		
		vmListOper : {//虚拟机列表操作界面
			"start" : "start",
			"restart" : "restart",
			"stop" : "stop",
			"resume" : "resume",
			"suspend" : "suspend",
			"del" : "del",
			"remove" : "remove"//移除
		},
		//获取虚拟机列表不可操作菜单
		getVmListPreventOper : function(callback, vm, dcId, ownerHost, otherParamObj){
			var preventOper = [];
			var vmListOper = $.VM.vmListOper;
			//如果虚拟机已直通，则不允许挂起、恢复、删除、移除操作
			if(pc.util.isNotNull(vm.pcis) || pc.util.isNotNull(vm.blockAttachDevs) || pc.util.isNotNull(vm.vgpuList)){
				var memoStr = "";
				if(pc.util.isNotNull(vm.pcis) || pc.util.isNotNull(vm.blockAttachDevs)){
					memoStr = "vm_summary_task4_directdevice";//虚拟机存在关联的直通设备，不能执行此操作
				}else{
					memoStr = "vm_summary_task4_configVgpu"; //虚拟机已配置VGPU，不能执行此操作
				}
				
				if(vm.state == "SUSPENDED"){
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:memoStr}});
					preventOper.push({"oper":vmListOper.suspend, "options":{memoId:memoStr,display:"none"}});
				}else{
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:memoStr,display:"none"}});
					preventOper.push({"oper":vmListOper.suspend, "options":{memoId:memoStr}});
				}				
				preventOper.push({"oper":vmListOper.del, "options":{memoId:memoStr}});
				preventOper.push({"oper":vmListOper.remove, "options":{memoId:memoStr}});
			}
			
			if(vm.ownerHostState != "OK"){//pvm_vmlist_gray_power : 主机进入维护模式或虚拟机进行中状态不可操作
				preventOper.push({"oper":vmListOper.start, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.restart, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.stop, "options":{memoId:"pvm_vmlist_gray_power",display:"none"}});
				preventOper.push({"oper":vmListOper.resume, "options":{memoId:"pvm_vmlist_gray_power",display:"none"}});
				preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.del, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.remove, "options":{memoId:"pvm_vmlist_gray_power"}});
				callback(preventOper);
				return;
			}

			if(vm.state == "OK"){
				preventOper.push({"oper":vmListOper.start, "options":{memoId:"xcp_vmlist_gray_started",display:"none"}});
				
				if(vm.controlDomain == "true" || vm.controlDomain == true){
					preventOper.push({"oper":vmListOper.stop, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0",display:"none"}});
					preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
					preventOper.push({"oper":vmListOper.del, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
					preventOper.push({"oper":vmListOper.remove, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
				}else{
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:"xcp_vmlist_gray_started", display:"none"}});
					preventOper.push({"oper":vmListOper.del, "options":{memoId:"xcp_vmlist_gray_started"}});
					preventOper.push({"oper":vmListOper.remove, "options":{memoId:"xcp_vmlist_gray_started"}});
				}
			}
			else if(vm.state == "STOPPED"){
				preventOper.push({"oper":vmListOper.restart, "options":{memoId:"xcp_vmlist_gray_stopped"}});
				preventOper.push({"oper":vmListOper.stop, "options":{memoId:"xcp_vmlist_gray_stopped",display:"none"}});
				if(pc.util.isNotNull(vm.pcis) || pc.util.isNotNull(vm.blockAttachDevs)) {		
					preventOper.push({"oper":vmListOper.del, "options":{memoId:"vm_summary_task4_directdevice"}});
					preventOper.push({"oper":vmListOper.remove, "options":{memoId:"vm_summary_task4_directdevice"}});
				}else if(pc.util.isNotNull(vm.vgpuList)) {		
					preventOper.push({"oper":vmListOper.del, "options":{memoId:"vm_summary_task4_configVgpu"}});
					preventOper.push({"oper":vmListOper.remove, "options":{memoId:"vm_summary_task4_configVgpu"}});
				}
				if(vm.controlDomain == "true" || vm.controlDomain == true){
					preventOper.push({"oper":vmListOper.del, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
					preventOper.push({"oper":vmListOper.remove, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0",display:"none"}});
					preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"pvm_vmlist_gray_power_vm_dom0"}});
				}else{
					preventOper.push({"oper":vmListOper.resume, "options":{memoId:"xcp_vmlist_gray_stopped", display:"none"}});
					preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"xcp_vmlist_gray_stopped"}});

					//WINSERVER-791挂了共享存储的虚拟机不让删除
					$.VM.getVolumeList(dcId, vm.vmId, function(volumnList){

						if(volumnList && volumnList.length){
							for(var i=0;i<volumnList.length;i++){
								if(volumnList[i].shared == "true" || volumnList[i].shared == true){
									preventOper.push({"oper":vmListOper.del, "options":{memoId:"xcp_vmlist_gray_delete_shared_volume"}});
									break;
								}
							}
						}
						callback(preventOper);
					});
					return;
				}
			}else if(vm.state == "SUSPENDED"){
				preventOper.push({"oper":vmListOper.start, "options":{memoId:"xcp_vmlist_gray_suspended",display:"none"}});
				preventOper.push({"oper":vmListOper.restart, "options":{memoId:"xcp_vmlist_gray_suspended"}});
				preventOper.push({"oper":vmListOper.stop, "options":{memoId:"xcp_vmlist_gray_suspended"}});
				//preventOper.push({"oper":vmListOper.resume, "options":{memoId:"xcp_vmlist_gray_suspended"}});
				preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"xcp_vmlist_gray_suspended",display:"none"}});
				preventOper.push({"oper":vmListOper.del, "options":{memoId:"xcp_vmlist_gray_suspended"}});
				preventOper.push({"oper":vmListOper.remove, "options":{memoId:"xcp_vmlist_gray_suspended"}});
			}else{
				preventOper.push({"oper":vmListOper.start, "options":{memoId:"pvm_vmlist_gray_power",display:"none"}});
				preventOper.push({"oper":vmListOper.restart, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.stop, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.resume, "options":{memoId:"pvm_vmlist_gray_power",display:"none"}});
				preventOper.push({"oper":vmListOper.suspend, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.del, "options":{memoId:"pvm_vmlist_gray_power"}});
				preventOper.push({"oper":vmListOper.remove, "options":{memoId:"pvm_vmlist_gray_power"}});
			}
			callback(preventOper);
		}
		

		/**************************虚拟机页面控制 end***************************************/
	};
}(window.jQuery);

