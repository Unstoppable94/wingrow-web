JTopo = {
	version: "0.4.8",
	zIndex_Container: 1,
	zIndex_Link: 2,
	zIndex_Node: 3,
	SceneMode: {
		normal: "normal",
		drag: "drag",
		edit: "edit",
		select: "select"
	},
	MouseCursor: {
		normal: "default",
		pointer: "pointer",
		top_left: "nw-resize",
		top_center: "n-resize",
		top_right: "ne-resize",
		middle_left: "e-resize",
		middle_right: "e-resize",
		bottom_left: "ne-resize",
		bottom_center: "n-resize",
		bottom_right: "nw-resize",
		move: "move",
		open_hand: "url(./img/cur/openhand.cur) 8 8, default",
		closed_hand: "url(./img/cur/closedhand.cur) 8 8, default"
	},
	createStageFromJson: function(jsonStr, canvas) {
		eval("var jsonObj = " + jsonStr);
		var stage = new JTopo.Stage(canvas);
		for (var key in jsonObj) {
			if("childs" != key){
				stage[key] = jsonObj[key];
			}
		}
		var scenes = jsonObj.childs;
		scenes.forEach(function(one_scene) {
			var scene = new JTopo.Scene(stage);
			for (var key in one_scene) {
				if("childs" != key){
					scene[key] = one_scene[key];
				}
				if("background" == key){
					scene.background = one_scene[key];
				}
			}
			var childs = one_scene.childs;
			childs.forEach(function(child) {
				var node = null,
					elementType = child.elementType;
				if("node" == elementType){
					node = new JTopo.Node;
				}else if("CircleNode" == elementType){
					node = new JTopo.CircleNode;
				}
				for (var key in child) {
					node[key] = child[key];
				}
				scene.add(node);
			})
		});
		return stage;
	}
};
!function(JTopo){
	var Element = function() {}
	Element.prototype.initialize = function() {
		this.elementType = "element";
		this.serializedProperties = ["elementType"];
		this.propertiesStack = [];
		this._id = "" + (new Date).getTime()+Math.ceil(Math.random()*1000);
	};
	Element.prototype.distroy = function() {};
	Element.prototype.removeHandler = function() {};
	Element.prototype.attr = function(key, value) {
		if (null != key && null != value) {
			this[key] = value;
		}
		else if (null != key) {
			return this[key];
		}
		return this;
	};
	Element.prototype.save = function() {
		var self = this,
			properties = {};
		this.serializedProperties.forEach(function(key) {
			properties[key] = self[key]
		});
		this.propertiesStack.push(properties);
	};
	Element.prototype.restore = function() {
		if (null != this.propertiesStack && 0 != this.propertiesStack.length) {
			var self = this,
				properties = this.propertiesStack.pop();
			this.serializedProperties.forEach(function(key) {
				self[key] = properties[key]
			});
		}
	};
	Element.prototype.toJson = function() {
		var self = this,
			json = "{",
			length = this.serializedProperties.length;
		this.serializedProperties.forEach(function(key, index) {
			var value = self[key];
			if(key=="image" && "object" != typeof value ){
				value="";
			}
			if("string" == typeof value){
				value = '"' + value + '"';
			}
			//如果为object类型的情况下
			if("object" == typeof value && value!=null){
				var point_str = "";
				if(value.length){
	                point_str += '"';
	                for(var i=0; i<value.length; i++){
	                    point_str +=value[i];
	                     if(i<value.length-1){
	                            point_str += ",";
	                        }
	                }
	                point_str += '"';
	            }else if(value.elementType=="node"){
	                point_str = value._id;
	            }else if(value.src !="undefined"){
	                point_str='"'+value.src+'"';  
	            }else {
	                point_str = '""';
	            };
	            value = point_str;
	        }
		
			json += '"' + key + '":' + value;
			if(length > index + 1){
				json += ",";
			}
		});
		return json += "}";
	};

	JTopo.Element = Element;
}(JTopo);	
!function(JTopo){

	var DisplayElement = function () {
		this.initialize = function() {
			DisplayElement.prototype.initialize.apply(this, arguments);
			this.elementType = "displayElement";
			/**
				x坐标值
			**/
			this.x = 0;
			/**
				y坐标值
			**/
			this.y = 0;
			this.width = 32;
			this.height = 32;
			/**
				设置节点是否可见
			**/
			this.visible = !0;
			/**
				透明度, 取值范围[0-1]
			**/
			this.alpha = 1;
			/**
				设置节点旋转的角度（弧度）
			**/
			this.rotate = 0;
			/**
				水平缩放
			**/
			this.scaleX = 1;
			/**
				垂直缩放
			**/
			this.scaleY = 1;
			/**
				连线的颜色
			**/
			this.strokeColor = "22,124,255";
			this.borderColor = "22,124,255";
			/**
				设置节点的填充颜色
			**/
			this.fillColor = "22,124,255";
			/**
				是否显示阴影, 例如:node.shadow = "true"
			**/
			this.shadow = !1;
			this.shadowBlur = 5;
			this.shadowColor = "rgba(0,0,0,0.5)";
			this.shadowOffsetX = 3;
			this.shadowOffsetY = 6;
			this.transformAble = !1;
			this.category=0;
			/**
				zIndex，大的覆盖小的,范围 [10-999]，10以下保留占用。
			**/
			this.zIndex = 0;
			/**
				关联拓扑图字段
			 **/
			this.relevance="";
            this.relevancetype=0;
			this.serializedProperties = this.serializedProperties.concat(
				"_id,image,relevance,relevancetype,x,y,width,height,visible,alpha,rotate,scaleX,scaleY,strokeColor,fillColor,shadow,shadowColor,shadowOffsetX,shadowOffsetY,transformAble,zIndex,category".split(",")
			);
		};
		this.initialize();
		this.paint = function(graphics) {
			graphics.beginPath();
			graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
			graphics.rect(-this.width / 2, -this.height / 2, this.width, this.height);
			graphics.fill();
			graphics.stroke();
			graphics.closePath();
		};
		this.getLocation = function() {
			return {
				x: this.x,
				y: this.y
			}
		};
		/**
			设置节点在场景中的位置坐标(左上角）
		**/
		this.setLocation = function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		};
		this.getCenterLocation = function() {
			return {
				x: this.x + this.width / 2,
				y: this.y + this.height / 2
			}
		};
		/**
			设置节点在场景中的位置坐标(中心位置)
		**/
		this.setCenterLocation = function(centerX, centerY) {
			this.x = centerX - this.width / 2;
			this.y = centerY - this.height / 2;
			return this;
		};
		this.getCenterX = function() {
			return this.x + this.width / 2
		};
		this.setCenterX = function(centerX) {
			this.x = centerX - this.width / 2
		};
		this.getCenterY = function() {
			return this.y + this.height / 2
		};
		this.setCenterY = function(centerY) {
			this.y = centerY - this.height / 2
		};		
		/**
			获取节点的宽和高
		**/
		this.getSize = function() {
			return {
				width: this.width,
				height: this.heith
			}
		};
		/**
			设置节点的宽和高
		**/
		this.setSize = function(width, height) {
			this.width = width;
			this.height = height;
			return this;
		};
		/**
			获取节点的坐标、宽、高
		**/
		this.getBound = function() {
			return {
				left: this.x,
				top: this.y,
				right: this.x + this.width,
				bottom: this.y + this.height,
				width: this.width,
				height: this.height
			}
		};
		/**
			设置节点的坐标、宽、高
		**/
		this.setBound = function(x, y, width, height) {
			this.setLocation(x, y);
			this.setSize(width, height);
			return this;
		};
		this.getDisplayBound = function() {
			return {
				left: this.x,
				top: this.y,
				right: this.x + this.width * this.scaleX,
				bottom: this.y + this.height * this.scaleY
			}
		};
		this.getDisplaySize = function() {
			return {
				width: this.width * this.scaleX,
				height: this.height * this.scaleY
			}
		};
		this.getPosition = function(position) {
			var result;
			var bound = this.getBound();
			"Top_Left" == position ? result = {
				x: bound.left,
				y: bound.top
			} : "Top_Center" == position ? result = {
				x: this.getCenterX(),
				y: bound.top
			} : "Top_Right" == position ? result = {
				x: bound.right,
				y: bound.top
			} : "Middle_Left" == position ? result = {
				x: bound.left,
				y: this.getCenterY()
			} : "Middle_Center" == position ? result = {
				x: this.getCenterX(),
				y: this.getCenterY()
			} : "Middle_Right" == position ? result = {
				x: bound.right,
				y: this.getCenterY()
			} : "Bottom_Left" == position ? result = {
				x: bound.left,
				y: bound.bottom
			} : "Bottom_Center" == position ? result = {
				x: this.getCenterX(),
				y: bound.bottom
			} : "Bottom_Right" == position && (result = {
				x: bound.right,
				y: bound.bottom
			});
			return result;
		}
	}
	DisplayElement.prototype = new JTopo.Element;

	var InteractiveElement = function () {
		this.initialize = function() {
			InteractiveElement.prototype.initialize.apply(this, arguments);
			this.elementType = "interactiveElement";
			/**
				设置节点是否可以拖动
			**/
			this.dragable = !1;
			/**
				是否被选中
			**/
			this.selected = !1;
			/**
				选中时，是否显示表示选中状态的矩形，默认为：true，显示
			**/
			this.showSelected = !0;
			this.selectedLocation = null;
			this.isMouseOver = !1;
			this.serializedProperties = this.serializedProperties.concat(
				"dragable,selected,showSelected,isMouseOver".split(",")
			);
		};
		this.initialize();
		this.paintRoundRect = function(graphics, x, y, width, height, round) {
			if("undefined" == typeof round){
				round = 5;
			}
			graphics.beginPath();
			graphics.moveTo(x + round, y);
			graphics.lineTo(x + width - round, y);
			graphics.quadraticCurveTo(x + width, y, x + width, y + round);
			graphics.lineTo(x + width, y + height - round);
			graphics.quadraticCurveTo(x + width, y + height, x + width - round, y + height);
			graphics.lineTo(x + round, y + height);
			graphics.quadraticCurveTo(x, y + height, x, y + height - round);
			graphics.lineTo(x, y + round);
			graphics.quadraticCurveTo(x, y, x + round, y);
			graphics.closePath()
		};
		this.paintSelected = function(graphics) {
			if(0 != this.showSelected){
				graphics.save();
				graphics.beginPath();
				graphics.strokeStyle = "rgba(168,202,255, 0.9)";
				graphics.fillStyle = "rgba(168,202,236,0.7)";
				graphics.rect(-this.width / 2 - 3, -this.height / 2 - 3, this.width + 6, this.height + 6);
				graphics.fill();
				graphics.stroke();
				graphics.closePath();
				graphics.restore();
			}
		};
		this.paintMouseover = function(graphics) {
			return this.paintSelected(graphics);
		};
		this.isInBound = function(x, y) {
			return x > this.x && x < this.x + this.width * Math.abs(this.scaleX) 
				&& y > this.y && y < this.y + this.height * Math.abs(this.scaleY);
		};
		this.selectedHandler = function() {
			this.selected = !0;
			this.selectedLocation = {
				x: this.x,
				y: this.y
			}
		};
		this.unselectedHandler = function() {
			this.selected = !1;
			this.selectedLocation = null;
		};
		/**
			监听鼠标双击事件（鼠标按下并松开）
		**/
		this.dbclickHandler = function(event) {
			this.dispatchEvent("dbclick", event)
		};
		/**
			监听鼠标单击事件（鼠标按下并松开）
		**/
		this.clickHandler = function(event) {
			this.dispatchEvent("click", event)
		};
		/**
			监听鼠标按下事件
		**/
		this.mousedownHander = function(event) {
			this.dispatchEvent("mousedown", event)
		};
		/**
			监听鼠标松开事件
		**/
		this.mouseupHandler = function(event) {
			this.dispatchEvent("mouseup", event)
		};
		/**
			监听鼠标进入Canvas事件
		**/
		this.mouseoverHandler = function(event) {
			this.isMouseOver = !0;
			this.dispatchEvent("mouseover", event)
		};
		/**
			监听鼠标移动事件
		**/
		this.mousemoveHandler = function(event) {
			this.dispatchEvent("mousemove", event)
		};
		/**
			监听鼠标离开Canvas事件
		**/
		this.mouseoutHandler = function(event) {
			this.isMouseOver = !1;
			this.dispatchEvent("mouseout", event)
		};
		/**
			监听鼠标拖拽事
		**/
		this.mousedragHandler = function(event) {
			var x = this.selectedLocation.x + event.dx;
			var y = this.selectedLocation.y + event.dy;
			this.setLocation(x, y);
			this.dispatchEvent("mousedrag", event);
		};
		/**
			监听事件
			例如：stage.addEventListener("mousedown", function(event){});
		**/
		this.addEventListener = function(eventName, listener) {
			var self = this;
			var callback = function(event) {
				listener.call(self, event)
			};
			if(!this.messageBus){
				this.messageBus = new JTopo.util.MessageBus;
			}
			this.messageBus.subscribe(eventName, callback);
			return this;
		};
		this.dispatchEvent = function(eventName, event) {
			if(this.messageBus){
				this.messageBus.publish(eventName, event);
				return this;
			}else{
				return null;
			}
		};
		/**
			移除监听事件和addEventListener相对应
		**/
		this.removeEventListener = function(eventName) {
			this.messageBus.unsubscribe(eventName)
		};
		/**
			移除所有监听事件
		**/
		this.removeAllEventListener = function() {
			this.messageBus = new JTopo.util.MessageBus
		};
		var eventNames = "click,dbclick,mousedown,mouseup,mouseover,mouseout,mousemove,mousedrag,touchstart,touchmove,touchend".split(","),
			self = this;
		eventNames.forEach(function(eventName) {
			self[eventName] = function(listener) {
				if(null != listener){
					this.addEventListener(eventName, listener);
				}else{
					this.dispatchEvent(eventName);
				}
			}
		})
	}
	InteractiveElement.prototype = new DisplayElement;

	JTopo.InteractiveElement = InteractiveElement;
	
}(JTopo);
!(function(JTopo){
	requestAnimationFrame = window.requestAnimationFrame 
						 || window.mozRequestAnimationFrame 
						 || window.webkitRequestAnimationFrame 
						 || window.msRequestAnimationFrame 
						 || window.oRequestAnimationFrame 
						 || function(animation) {
								setTimeout(animation, 1e3 / 24)
							};
	delArrayElByIndexInJtopo = function(array,index){
		if ("number" != typeof index) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === index) {
					return array.slice(0, i).concat(array.slice(i + 1, array.length));
				}
			}
			return array;
		}
		if(0 > index){
			return array;
		}else{
			return array.slice(0, index).concat(array.slice(index + 1, array.length));
		}
	}					
	/*Array.prototype.del = function(index) {
		if ("number" != typeof index) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === index) {
					return this.slice(0, i).concat(this.slice(i + 1, this.length));
				}
			}
			return this;
		}
		if(0 > index){
			return this;
		}else{
			return this.slice(0, index).concat(this.slice(index + 1, this.length));
		}
	};*/
	if(![].indexOf){
		Array.prototype.indexOf = function(obj) {
			for (var i = 0; i < this.length; i++){
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}
	if(!window.console){
		window.console = {
			log: function() {},
			info: function() {},
			debug: function() {},
			warn: function() {},
			error: function() {}
		};
	}
	JTopo.alarmImageCache = {};
	var util = {
		inRange: function(a, b, c) {
			var d = Math.abs(b - c),
				e = Math.abs(b - a),
				f = Math.abs(c - a),
				g = Math.abs(d - (e + f));
			return 1e-6 > g ? !0 : !1
		},
		isPointInLineSeg: function(a, b, c) {
			return util.inRange(a, c.x1, c.x2) 
				&& util.inRange(b, c.y1, c.y2);
		},
		changeColor: function(graphics, image, color1, color2, color3) {
			var width = JTopo.canvas.width = image.width,
				height = JTopo.canvas.height = image.height;
			graphics.clearRect(0, 0, JTopo.canvas.width, JTopo.canvas.height);
			graphics.drawImage(image, 0, 0);
			var imageData = graphics.getImageData(0, 0, image.width, image.height);
			var data = imageData.data;
			for (var i = 0; width > i; i++) {
				for (var j = 0; height > j; j++) {
					var index = 4 * (i + j * width);
					if(0 != data[index + 3]){
						if(null != color1){
							data[index + 0] += color1;
						}
						if(null != color2){
							data[index + 1] += color2;
						}
						if(null != color3){
							data[index + 2] += color3;
						}
					}
				}
			}
			graphics.putImageData(imageData, 0, 0, 0, 0, image.width, image.height);
			var dataUrl = JTopo.canvas.toDataURL();
			JTopo.alarmImageCache[image.src] = dataUrl;
			return dataUrl;
		},
		getProperties: function(obj, properties) {
			var json = "";
			for (var i = 0; i < properties.length; i++) {
				if(i > 0){
					json += ",";
				}
				var value = obj[properties[i]];
				if("string" == typeof value){
					value = '"' + value + '"';
				}else{
					if(void 0 == value){
						value = null;
					}
				}
				json += properties[i] + ":" + value;
			}
			return json
		},
		//////////////////////////////////////
		rotatePoint: function(x1, y1, x2, y2, origin_radius) {
			var dx = x2 - x1,
				dy = y2 - y1,
				distance = Math.sqrt(dx * dx + dy * dy),
				radius = Math.atan2(dy, dx) + origin_radius;
			return {
				x: x1 + Math.cos(radius) * distance,
				y: y1 + Math.sin(radius) * distance
			}
		},
		rotatePoints: function(center, points, origin_radius) {
			var result = [];
			for (var i = 0; i < points.length; i++) {
				result.push(util.rotatePoint(center.x, center.y, points[i].x, points[i].y, origin_radius));
			}
			return result;
		},
		getDistance: function(x1, y1, x2, y2) {
			var dx, dy;
			if(null == x2 && null == y2){
				dx = y1.x - x1.x;
				dy = y1.y - x1.y;
			}else{
				dx = x2 - x1;
				dy = y2 - y1;
			}
			return Math.sqrt(dx * dx + dy * dy);
		},
		getEventPosition: function(event) {
			return util.mouseCoords(event)
		},
		mouseCoords: function(event) {
			event = util.cloneEvent(event);
			if(!event.pageX){
				event.pageX = event.clientX + document.body.scrollLeft - document.body.clientLeft;
				event.pageY = event.clientY + document.body.scrollTop - document.body.clientTop;
			}
			return event;
		},
		MessageBus: function() {
			var self = this;
			this.name = name;
			this.messageMap = {};
			this.messageCount = 0;
			this.subscribe = function(key, value) {
				var message = self.messageMap[key];
				if(null == message){
					self.messageMap[key] = [];
				}
				self.messageMap[key].push(value);
				self.messageCount++;
			};
			this.unsubscribe = function(key) {
				var message = self.messageMap[key];
				if(null != message){
					self.messageMap[key] = null;
					delete self.messageMap[key];
					self.messageCount--;
				}
			};
			this.publish = function(key, event, delay) {
				var message = self.messageMap[key];
				if (null != message) {
					for (var i = 0; i < message.length; i++) {
						if(delay){
							!function(message, event) {
								setTimeout(function() {
									message(event)
								}, 10)
							}(message[i], event);
						}else{
							message[i](event);
						}
					}
				}
			}
		},
		isFirefox: navigator.userAgent.indexOf("Firefox") > 0,
		isIE: !(!window.attachEvent || -1 !== navigator.userAgent.indexOf("Opera")),
		isChrome: null != navigator.userAgent.toLowerCase().match(/chrome/),
		clone: function(origin) {
			var obj = {};
			for (var key in origin) {
				obj[key] = origin[key];
			}
			return obj;
		},
		isPointInRect: function(point, rect) {
			return point.x > rect.x && point.x < rect.x + rect.width 
				&& point.y > rect.y && point.y < rect.y + rect.height;
		},
		isPointInLine: function(point1, start, end) {
			var distance 			= util.getDistance(start, end),
				distanceWidthStart 	= util.getDistance(start, point1),
				distanceWidthEnd 	= util.getDistance(end, point1);
			return Math.abs((distanceWidthStart + distanceWidthEnd) - distance) <= .5;
		},
		removeFromArray: function(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] === obj) {
					//arr = arr.del(i);
					arr = delArrayElByIndexInJtopo(arr,i);
					break
				}
			}
			return arr;
		},
		cloneEvent: function(origin) {
			var event = {};
			for (var key in origin) {
				if("returnValue" != key && "keyLocation" != key){
					event[key] = origin[key];
				}
			}
			return event
		},
		randomColor: function() {
			return Math.floor(255 * Math.random()) + "," 
				 + Math.floor(255 * Math.random()) + "," 
				 + Math.floor(255 * Math.random());
		},
		isIntsect: function() {},
		toJson: function(stage) {
			var scene_properties = "backgroundColor,visible,mode,rotate,alpha,scaleX,scaleY,shadow,translateX,translateY,areaSelect,paintAll".split(","),
				element_properties = "text,elementType,x,y,width,height,visible,alpha,rotate,scaleX,scaleY,fillColor,shadow,transformAble,zIndex,dragable,selected,showSelected,font,fontColor,textPosition,textOffsetX,textOffsetY".split(","),
				json = "{";
			json += "frames:" + stage.frames;
			json += ", scenes:[";
			for (var i = 0; i < stage.childs.length; i++) {
				var scene = stage.childs[i];
				json += "{";
				json += util.getProperties(scene, scene_properties);
				json += ", elements:[";
				for (var j = 0; j < scene.childs.length; j++) {
					var element = scene.childs[j];
					if(j > 0){
						json += ",";
					}
					json += "{";
					json += util.getProperties(element, element_properties);
					json += "}";
				}
				json += "]}";
			}
			json += "]";
			json += "}";
			return json;
		},
		loadStageFromJson: function(json, canvas) {
			var obj = eval(json),
				stage = new JTopo.Stage(canvas);
			for (var k in stageObj) {
				if ("scenes" != k) {
					stage[k] = obj[k];
				} else {
					for (var scenes = obj.scenes, i = 0; i < scenes.length; i++) {
						var sceneObj = scenes[i],
							scene = new JTopo.Scene(stage);
						for (var p in sceneObj) {
							if ("elements" != p) {
								scene[p] = sceneObj[p];
							} else {
								var nodeMap = {};
								var elements = sceneObj.elements;
								for (var m = 0; m < elements.length; m++) {
									var elementObj = elements[m],
										type = elementObj.elementType,
										element;
									if("Node" == type){
										element = new JTopo.Node;
									}
									for (var mk in elementObj) {
										element[mk] = elementObj[mk];
									}
									nodeMap[element.text] = element;
									scene.add(element);
								}
							}
						}
					}
				}
			}
			return stage;
		},
		getElementsBound: function(elements) {
			var bound = {
				left: Number.MAX_VALUE,
				right: Number.MIN_VALUE,
				top: Number.MAX_VALUE,
				bottom: Number.MIN_VALUE
			};
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if(!(element instanceof JTopo.Link)){
					if(bound.left > element.x){
						bound.left = element.x;
						bound.leftNode = element;
					}
					if(bound.right < element.x + element.width){
						bound.right = element.x + element.width;
						bound.rightNode = element;
					}
					if(bound.top > element.y){
						bound.top = element.y;
						bound.topNode = element;
					}
					if(bound.bottom < element.y + element.height){
						bound.bottom = element.y + element.height;
						bound.bottomNode = element;
					}
				}
			}
			bound.width = bound.right - bound.left;
			bound.height = bound.bottom - bound.top;
			return bound;
		},
		genImageAlarm: function(img, color) {
			if(null == color){
				color = 255;
			}
			try {
				if (JTopo.alarmImageCache[img.src]) {
					return JTopo.alarmImageCache[img.src];
				}
				var image = new Image;
				image.src = util.changeColor(JTopo.graphics, img, color);
				JTopo.alarmImageCache[img.src] = image;
				return image;
			} catch (error) {
				//
			}
			return null;
		},
		getOffsetPosition: function(parent) {
			if (!parent) {
				return {
					left: 0,
					top: 0
				};
			}
			var top = 0,
				left = 0;
			if ("getBoundingClientRect" in document.documentElement) {
				var bound = parent.getBoundingClientRect(),
				ownerDocument = parent.ownerDocument,
				body = ownerDocument.body,
				documentElement = ownerDocument.documentElement,
				clientTop = parent.clientTop || body.clientTop || 0,
				clientLeft = parent.clientLeft || body.clientLeft || 0,
				top = bound.top + (self.pageYOffset || documentElement && documentElement.scrollTop || body.scrollTop) - clientTop,
				left = bound.left + (self.pageXOffset || documentElement && documentElement.scrollLeft || body.scrollLeft) - clientLeft;
			} else {
				do {
					top += parent.offsetTop || 0;
					left += parent.offsetLeft || 0;
					parent = parent.offsetParent; 
				} while (parent);
			}
			if (typeof window.G_vmlCanvasManager!="undefined") { 
				var doc = $(document);
				left -= doc.scrollLeft();
				top -= doc.scrollTop();
			}
			return {
				left: left,
				top: top
			}
		},
		lineF: function(x1, y1, x2, y2) {
			function func(x) {
				return x * k + b;
			}
			var k = (y2 - y1) / (x2 - x1),
				b = y1 - x1 * k;
			func.k = k;
			func.b = b;
			func.x1 = x1;
			func.x2 = x2;
			func.y1 = y1;
			func.y2 = y2;
			return func;
		},
		intersection: function(line1f, line2f) {
			var x, y;
			if(line1f.k == line2f.k){
				return null;
			}else{
				if(1 / 0 == line1f.k || line1f.k == -1 / 0){
					x = line1f.x1;
					y = line2f(line1f.x1);
				}else if(1 / 0 == line2f.k || line2f.k == -1 / 0){
					x = line2f.x1;
					y = line1f(line2f.x1);
				}else{
					x = (line2f.line2f - line1f.line2f) / (line1f.k - line2f.k);
					y = line1f(x);
				}

				if(0 == util.isPointInLineSeg(x, y, line1f)){
					return null;
				}else if(0 == util.isPointInLineSeg(x, y, line2f)){
					return null;
				}else{
					return {
						x: x,
						y: y
					};
				}
			}
		},
		intersectionLineBound: function(linef, bound) {
			var linef_left = util.lineF(bound.left, bound.top, bound.left, bound.bottom),
				point = util.intersection(linef, linef_left);
			if(null == point){
				var linef_top  = util.lineF(bound.left, bound.top, bound.right, bound.top);
				point = util.intersection(linef, linef_top);
			}
			if(null == point){
				var linef_right = util.lineF(bound.right, bound.top, bound.right, bound.bottom);
				point = util.intersection(linef, linef_right);
			}
			if(null == point){
				var linef_bottom = util.lineF(bound.left, bound.bottom, bound.right, bound.bottom);
				point = util.intersection(linef, linef_bottom);
			}
			return point;
		}
	};
	window.$for = function(start, end, func, time) {
		function recursive(index) {
			if(index != end){
				func(end);
				setTimeout(function() {
					recursive(++index)
				}, time);
			}
		}
		if (!(start > end)) {
			recursive(0);
		}
	};
	window.$foreach = function(arr, func, time) {
		function recursive(index) {
			if(index != arr.length){
				func(arr[index]);
				setTimeout(function() {
					recursive(++index)
				}, time);
			}
		}
		if (0 != arr.length) {
			var index = 0;
			recursive(index)
		}
	};

	JTopo.util = util;
	
})(JTopo);
!function(JTopo){
	var EagleEye = function (stage) {
		return {
			hgap: 16,
			visible: !1,
			exportCanvas: document.createElement("canvas"),
			getImage: function(width, height) {
				if (typeof window.G_vmlCanvasManager!="undefined") { 
	        		this.exportCanvas=window.G_vmlCanvasManager.initElement(this.exportCanvas);
	        	}
				var bound = stage.getBound(),
					scaleWidth = 1,
					scaleHeight = 1;
				this.exportCanvas.width = stage.canvas.width;
				this.exportCanvas.height = stage.canvas.height;
				if(null != width && null != height){
					this.exportCanvas.width = width;
					this.exportCanvas.height = height;
					scaleWidth = width / bound.width;
					scaleHeight = height / bound.height;
				}else{
					if(bound.width > stage.canvas.width){
						this.exportCanvas.width = bound.width;
					}
					if(bound.height > stage.canvas.height){
						this.exportCanvas.height = bound.height;
					}
				}
				var graphics = this.exportCanvas.getContext("2d");
				if(stage.childs.length > 0){
					graphics.save();
					graphics.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height);
					stage.childs.forEach(function(scene) {
						if(1 == scene.visible){
							scene.save();
							scene.translateX = 0;
							scene.translateY = 0;
							scene.scaleX = 1;
							scene.scaleY = 1;
							graphics.scale(scaleWidth, scaleHeight);
							if(bound.left < 0){
								scene.translateX = Math.abs(bound.left);
							}
							if(bound.top < 0){
								scene.translateY = Math.abs(bound.top);
							}
							scene.paintAll = !0;
							scene.repaint(graphics);
							scene.paintAll = !1;
							scene.restore();
						}
					});
					graphics.restore();
				}
				return this.exportCanvas.toDataURL("image/png");
			},
			canvas: document.createElement("canvas"),
			update: function() {
				this.eagleImageDatas = this.getData(stage)
			},
			setSize: function(width, height) {
				this.width = this.canvas.width = width;
				this.height = this.canvas.height = height;
			},
			getData: function(width, height) {
				function getTranslate(scene) {
					var width = scene.stage.canvas.width,
						height = scene.stage.canvas.height,
						d = width / scene.scaleX / 2,
						e = height / scene.scaleY / 2;
					return {
						translateX: scene.translateX + d - d * scene.scaleX,
						translateY: scene.translateY + e - e * scene.scaleY
					}
				}
				if(null != width && null != height){
					this.setSize(width, height);
				}else{
					this.setSize(200, 160);
				}
				if (typeof window.G_vmlCanvasManager!="undefined") { 
	        		this.canvas=window.G_vmlCanvasManager.initElement(this.canvas);
	        	}
				var graphics = this.canvas.getContext("2d");
				if (stage.childs.length > 0) {
					graphics.save();
					graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
					stage.childs.forEach(function(scene) {
						if(1 == scene.visible){
							scene.save();
							scene.centerAndZoom(null, null, graphics);
							scene.repaint(graphics);
							scene.restore();
						}
					});
					var transalte = getTranslate(stage.childs[0]),
						x = transalte.translateX * (this.canvas.width / stage.canvas.width) * stage.childs[0].scaleX,
						y = transalte.translateY * (this.canvas.height / stage.canvas.height) * stage.childs[0].scaleY,
						bound = stage.getBound(),
						scaleX = stage.canvas.width / stage.childs[0].scaleX / bound.width,
						scaleY = stage.canvas.height / stage.childs[0].scaleY / bound.height;
					scaleX > 1 && (scaleX = 1);
					scaleY > 1 && (scaleX = 1);
					x *= scaleX;
					y *= scaleY;
					if(bound.left < 0){
						x -= Math.abs(bound.left) * (this.width / bound.width);
					}
					if(bound.top < 0){
						y -= Math.abs(bound.top) * (this.height / bound.height);
					}
					graphics.save();
					graphics.lineWidth = 1;
					graphics.strokeStyle = "rgba(255,0,0,1)";
					graphics.strokeRect(-x, -y, graphics.canvas.width * scaleX, graphics.canvas.height * scaleY);
					graphics.restore();
					var imageData = null;
					try {
						imageData = graphics.getImageData(0, 0, graphics.canvas.width, graphics.canvas.height)
					} catch (error) {
						//
					}
					return imageData
				}
				return null
			},
			paint: function() {
				if (null != this.eagleImageDatas) {
					var graphics = stage.graphics;
					graphics.save();
					graphics.fillStyle = "rgba(211,211,211,0.3)";
					graphics.fillRect(
						stage.canvas.width - this.canvas.width - 2 * this.hgap, 
						stage.canvas.height - this.canvas.height - 1, 
						stage.canvas.width - this.canvas.width, 
						this.canvas.height + 1
					);
					graphics.fill();
					graphics.save();
					graphics.lineWidth = 1;
					graphics.strokeStyle = "rgba(0,0,0,1)";
					graphics.rect(
						stage.canvas.width - this.canvas.width - 2 * this.hgap, 
						stage.canvas.height - this.canvas.height - 1, 
						stage.canvas.width - this.canvas.width, 
						this.canvas.height + 1);
					graphics.stroke();
					graphics.restore();
					graphics.putImageData(this.eagleImageDatas, stage.canvas.width - this.canvas.width - this.hgap, stage.canvas.height - this.canvas.height);
					graphics.restore()
				} else {
					this.eagleImageDatas = this.getData(stage);
				}
			},
			eventHandler: function(eventName, event, stage) {
				if (event.x > stage.canvas.width  - this.canvas.width 
				 && event.y > stage.canvas.height - this.canvas.height) {
				 	if("mousedown" == eventName){
				 		this.lastTranslateX = stage.childs[0].translateX;
				 		this.lastTranslateY = stage.childs[0].translateY;
				 	}
					if ("mousedrag" == eventName && stage.childs.length > 0) {
						var bound = stage.getBound();
						var i = this.canvas.width / stage.childs[0].scaleX / bound.width;
						var j = this.canvas.height / stage.childs[0].scaleY / bound.height;
						stage.childs[0].translateX = this.lastTranslateX - event.dx / i;
						stage.childs[0].translateY = this.lastTranslateY - event.dy / j
					}
				} else{

				}
			}
		}
	}

	JTopo.EagleEye = EagleEye;
}(JTopo);
!function(JTopo){

	var Stage = function (canvas) {
		function adjustEventPosition(evt) {
			var event = JTopo.util.getEventPosition(evt),
				offsetPosition = JTopo.util.getOffsetPosition(self.canvas);
			event.offsetLeft = event.pageX - offsetPosition.left;
			event.offsetTop = event.pageY - offsetPosition.top;
			event.x = event.offsetLeft;
			event.y = event.offsetTop;
			event.target = null;
			return event;
		}

		/**
			监听鼠标进入Canvas事件
		**/
		function onmouseover(evt) {
			evt = evt || window.event;
			document.onselectstart = function() {
				return !1
			};
			this.mouseOver = !0;
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("mouseover", event);
			self.dispatchEvent("mouseover", event);
		}

		/**
			监听鼠标离开Canvas事件
		**/
		function onmouseout(evt) {
			evt = evt || window.event;
			interval = setTimeout(function() {
				enable_contextmenu = !0
			}, 500);
			document.onselectstart = function() {
				return !0
			};
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("mouseout", event);
			self.dispatchEvent("mouseout", event);
			if(0 == self.animate){
				self.needRepaint = !1;
			}else{
				self.needRepaint = !0;
			}
		}

		/**
			监听鼠标按下事件
		**/
		function onmousedown(evt) {
			evt = evt || window.event;
			var event = adjustEventPosition(evt);
			self.mouseDown = !0;
			self.mouseDownX = event.x;
			self.mouseDownY = event.y;
			self.dispatchEventToScenes("mousedown", event);
			self.dispatchEvent("mousedown", event);
		}

		/**
			监听鼠标松开事件
		**/
		function onmouseup(evt) {
			evt = evt || window.event;
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("mouseup", event);
			self.dispatchEvent("mouseup", event);
			self.mouseDown = !1;
			if(0 == self.animate){
				self.needRepaint = !1;
			}else{
				self.needRepaint = !0;
			}
		}

		/**
			监听鼠标移动事件
		**/
		function onmousemove(evt) {
			evt = evt || window.event;
			if(interval){
				window.clearTimeout(interval);
				interval = null;
			}
			enable_contextmenu = !1;
			var event = adjustEventPosition(evt);
			if(self.mouseDown){
				if(0 == event.button || evt.button == 1){
					event.dx = event.x - self.mouseDownX;
					event.dy = event.y - self.mouseDownY;
					self.dispatchEventToScenes("mousedrag", event);
					self.dispatchEvent("mousedrag", event);
					if(1 == self.eagleEye.visible){
						self.eagleEye.update();
					}
				}
			}else{
				self.dispatchEventToScenes("mousemove", event);
				self.dispatchEvent("mousemove", event);
			}
		}

		/**
			监听鼠标单击事件（鼠标按下并松开）
		**/
		function onclick(evt) {
			evt = evt || window.event;
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("click", event);
			self.dispatchEvent("click", event)
		}

		/**
			监听鼠标双击事件（鼠标按下并松开）
		**/
		function ondblclick(evt) {
			evt = evt || window.event;
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("dbclick", event);
			self.dispatchEvent("dbclick", event)
		}

		/**
			监听鼠标滚轮事件
		**/
		function onmousewheel(evt) {
			evt = evt || window.event;
			var event = adjustEventPosition(evt);
			self.dispatchEventToScenes("mousewheel", event);
			self.dispatchEvent("mousewheel", event);
			if(null != self.wheelZoom){
				if(evt.preventDefault){
					evt.preventDefault();
					evt.stopPropagation();
				}else{
					evt = evt || window.event;
					evt.returnValue = !1;
				}
				if(1 == self.eagleEye.visible){
					self.eagleEye.update();
				}
			}
		}

		var self = this;
		/**
			构造函数
		**/
		this.initialize = function(canvas) {
			if (typeof window.G_vmlCanvasManager!="undefined") { 
        		canvas=window.G_vmlCanvasManager.initElement(canvas);
        	}

			/**
				initCanvas
			**/
			if(JTopo.util.isIE || !window.addEventListener){
				canvas.onmouseout = onmouseout;
				canvas.onmouseover = onmouseover;
				canvas.onmousedown = onmousedown;
				canvas.onmouseup = onmouseup;
				canvas.onmousemove = onmousemove;
				canvas.onclick = onclick;
				canvas.ondblclick = ondblclick;
				canvas.onmousewheel = onmousewheel;
				canvas.touchstart = onmousedown;
				canvas.touchmove = onmousemove;
				canvas.touchend = onmouseup;
			}else{
				canvas.addEventListener("mouseout", onmouseout);
				canvas.addEventListener("mouseover", onmouseover);
				canvas.addEventListener("mousedown", onmousedown);
				canvas.addEventListener("mouseup", onmouseup);
				canvas.addEventListener("mousemove", onmousemove);
				canvas.addEventListener("click", onclick);
				canvas.addEventListener("dblclick", ondblclick);
				if(JTopo.util.isFirefox){
					canvas.addEventListener("DOMMouseScroll", onmousewheel);
				}else{
					canvas.addEventListener("mousewheel", onmousewheel);
				}
			}
			if(window.addEventListener){
				window.addEventListener("keydown", function(event) {
					self.dispatchEventToScenes("keydown", JTopo.util.cloneEvent(event));
					var keyCode = event.keyCode;
					if(37 == keyCode || 38 == keyCode || 39 == keyCode || 40 == keyCode){
						if(event.preventDefault){
							event.preventDefault();
							event.stopPropagation();
						}else{
							event = event || window.event;
							event.returnValue = !1;
						}
					}
				}, !0);
				window.addEventListener("keyup", function(event) {
					self.dispatchEventToScenes("keyup", JTopo.util.cloneEvent(event));
					var keyCode = event.keyCode;
					if(37 == keyCode || 38 == keyCode || 39 == keyCode || 40 == keyCode){
						if(event.preventDefault){
							event.preventDefault();
							event.stopPropagation();
						}else{
							event = event || window.event;
							event.returnValue = !1;
						}
					}
				}, !0);
			}
			/**
				对应的Canvas对象
			**/
			this.canvas = canvas;
			this.graphics = canvas.getContext("2d");
			/**
				舞台宽度(Canvas的宽度）
			**/
			this.width = this.canvas.width;
			/**
				舞台高度(Canvas的高度)
			**/
			this.height = this.canvas.height;
			/**
				场景对象列表
			**/
			this.childs = [];
			/**
				设置当前舞台播放的帧数/秒
				默认为:24
				frames可以为0，表示：不自动绘制，由用户手工调用Stage对象的paint()方法来触发。
				如果小于0意味着：只有键盘、鼠标有动作时才会重绘，例如：stage.frames = -24。
			**/
			this.frames = 24;

			this.messageBus = new JTopo.util.MessageBus;
			/**
				鹰眼对象
				显示鹰眼：stage.eagleEye.visible = true
				隐藏鹰眼：stage.eagleEye.visible = false
			**/
			this.eagleEye = JTopo.EagleEye(this);
			/**
				鼠标滚轮缩放操作比例，默认为null，不显示鹰眼
				启用鼠标滚轮缩放：stage.wheelZoom = 0.85; //缩放比例为0.85
				禁用用鼠标滚轮缩放: stage.wheelZoom = null;
			**/
			this.wheelZoom = null;
			this.mouseDownX = 0;
			this.mouseDownY = 0;
			this.mouseDown = !1;
			this.mouseOver = !1;
			this.needRepaint = !0;
			this.serializedProperties = ["frames", "wheelZoom"]
		};
		if(null != canvas){
			this.initialize(canvas);
		}
		this.setWidth = function(value) {
             this.canvas.width = value;
             this.width = value;
        };
        this.setHeight = function(value) {
            this.canvas.height = value;
            this.height = value;
        };
		/**
			光标设置
		**/
		this.setCursor = function(value) {
			this.canvas.style.cursor = value;
		};
		/**
			光标获取
		**/
		this.getCursor = function() {
			return this.canvas.style.cursor;
		};
		/**
			舞台模式，不同模式下有不同的表现:
			设置舞台模式，例如：stage.mode = "drag";
			normal[默认]：可以点击选中单个节点（按住Ctrl可以选中多个），点中空白处可以拖拽整个画面
			drag: 该模式下不可以选择节点，只能拖拽整个画面
			select: 可以框选多个节点、可以点击单个节点
			edit: 在默认基础上增加了：选中节点时可以通过6个控制点来调整节点的宽、高
		**/
		this.setMode = function(value) {
			this.childs.forEach(function(scene) {
				scene.mode = value
			})
		};

		/**
			鼠标右键菜单
		**/
		var enable_contextmenu = !0,
			interval = null;
		document.oncontextmenu = function() {
			return enable_contextmenu
		};
		this.dispatchEventToScenes = function(eventName, position) {
			if(0 != this.frames){
				this.needRepaint = !0;
			}
			if (1 == this.eagleEye.visible && -1 != eventName.indexOf("mouse")) {
				if (position.x > this.width - this.eagleEye.width 
				 && position.y > this.height - this.eagleEye.height) {
					return void this.eagleEye.eventHandler(eventName, position, this)
				}
			}
			this.childs.forEach(function(scene) {
				if (1 == scene.visible) {
					var handler = scene[eventName + "Handler"];
					if (null == handler) {
						throw new Error("Function not found:" + eventName + "Handler");
					}
					handler.call(scene, position)
				}
			})
		};
		/**
			将一个Scene场景加入到舞台中（只有加入舞台才可以显示出现）
		**/
		this.add = function(scene) {
			for (var i = 0; i < this.childs.length; i++){
				if (this.childs[i] === scene) {
					return;
				}
			}
			scene.addTo(this);
			this.childs.push(scene);
		};
		/**
			将一个Scene场景从舞台中移除（不再显示）
		**/
		this.remove = function(scene) {
			if (null == scene) {
				throw new Error("Stage.remove出错: 参数为null!");
			}
			for (var i = 0; i < this.childs.length; i++){
				if (this.childs[i] === scene) {
					scene.stage = null;
					//this.childs = this.childs.del(i);
					this.childs = delArrayElByIndexInJtopo(this.childs,i);
					return this;
				}
			}
			return this;
		};
		/**
			将所有Scene场景从舞台中移除
		**/
		this.clear = function() {
			this.childs = [];
		};
		/**
			监听事件
			例如：stage.addEventListener("mousedown", function(event){});
		**/
		this.addEventListener = function(eventName, listener) {
			var self = this,
				callback = function(params) {
					listener.call(self, params)
				};
			this.messageBus.subscribe(eventName, callback);
			return this;
		};
		/**
			移除监听事件
			和addEventListener相对应
		**/
		this.removeEventListener = function(eventName) {
			this.messageBus.unsubscribe(eventName)
		};
		/**
			移除所有监听事件
		**/
		this.removeAllEventListener = function() {
			this.messageBus = new JTopo.util.MessageBus
		};
		this.dispatchEvent = function(eventName, event) {
			this.messageBus.publish(eventName, event);
			return this;
		};

		/**
			精简事件定义的写法：
			click(eventHandler) 监听鼠标单击事件（鼠标按下并松开）
			等价于：stage.addEventListener("click", eventHandler);
		**/
		var eventNames = "click,dbclick,mousedown,mouseup,mouseover,mouseout,mousemove,mousedrag,mousewheel,touchstart,touchmove,touchend,keydown,keyup".split(","),
			self = this;
		eventNames.forEach(function(eventName) {
			self[eventName] = function(listener) {
				if(null != listener){
					this.addEventListener(eventName, listener);
				}else{
					this.dispatchEvent(eventName);
				}
			}
		});
		/**
			导出成PNG图片（在新打开的浏览器Tab页中）
		**/
		this.saveImageInfo = function(width, height) {
			var href = this.eagleEye.getImage(width, height),
				newwindow = window.open("about:blank");
			newwindow.document.write("<img src='" + href + "' alt='from canvas'/>");
			return this
		};
		/**
			导出成PNG图片（直接弹出另存为对话框或者用下载软件下载）
		**/
		this.saveAsLocalImage = function(width, height) {
			var href = this.eagleEye.getImage(width, height);
			href.replace("image/png", "image/octet-stream");
			window.location.href = href;
			return this;
		};
		/**
			执行一次绘制, 如果frames设置为0，可以手工调用此方法来通知jtopo进行一次重绘。
		**/
		this.paint = function() {
			if(null != this.canvas){
				this.graphics.save();
				this.graphics.clearRect(0, 0, this.width, this.height);
				this.childs.forEach(function(scene) {
					if(1 == scene.visible){
						scene.repaint(self.graphics);
					}
				});
				if(1 == this.eagleEye.visible){
					this.eagleEye.paint(this);
				}
				this.graphics.restore();
			}
		};
		this.repaint = function() {
			if(0 != this.frames){
				if(!(this.frames < 0 && 0 == this.needRepaint)){
					this.paint();
					if(this.frames < 0){
						this.needRepaint = !1;
					}
				}
			}
		};
		/**
			缩放，scale取值范围[0-1]，实际上本操作是调用了舞台中所有Scene对象的zoom函数。
		**/
		this.zoom = function(scale) {
			this.childs.forEach(function(scene) {
				if(0 != scene.visible){
					scene.zoom(scale);
				}
			})
		};
		/**
			放大，scale取值范围[0-1], 调用zoom实现
		**/
		this.zoomOut = function(scale) {
			this.childs.forEach(function(scene) {
				if(0 != scene.visible){
					scene.zoomOut(scale);
				}
			})
		};
		/**
			缩小，scale取值范围[0-1], 调用zoom实现。
		**/
		this.zoomIn = function(scale) {
			this.childs.forEach(function(scene) {
				if(0 != scene.visible){
					scene.zoomIn(scale);
				}
			})
		};
		/**
			缩放并居中显示所有元素
		**/
		this.centerAndZoom = function() {
			this.childs.forEach(function(scene) {
				if(0 != scene.visible){
					scene.centerAndZoom();
				}
			})
		};
		/**
			设置当前舞台的中心坐标（舞台平移）
		**/
		this.setCenter = function(centerX, centerY) {
			var self = this;
			this.childs.forEach(function(scene) {
				var translateX = centerX - self.canvas.width / 2,
					translateY = centerY - self.canvas.height / 2;
				scene.translateX = -translateX;
				scene.translateY = -translateY;
			})
		};
		/**
			得到舞台中所有元素位置确定的边界大小（left、top、right、bottom）
		**/
		this.getBound = function() {
			var bound = {
				left: Number.MAX_VALUE,
				right: Number.MIN_VALUE,
				top: Number.MAX_VALUE,
				bottom: Number.MIN_VALUE
			};
			this.childs.forEach(function(scene) {
				var elementsBound = scene.getElementsBound();
				if(elementsBound.left < bound.left){
					bound.left = elementsBound.left;
					bound.leftNode = elementsBound.leftNode;
				}
				if(elementsBound.top < bound.top){
					bound.top = elementsBound.top;
					bound.topNode = elementsBound.topNode;
				}
				if(elementsBound.right > bound.right){
					bound.right = elementsBound.right;
					bound.rightNode = elementsBound.rightNode;
				}
				if(elementsBound.bottom > bound.bottom){
					bound.bottom = elementsBound.bottom;
					bound.bottomNode = elementsBound.bottomNode;
				}
			});
			bound.width = bound.right - bound.left;
			bound.height = bound.bottom - bound.top;
			return bound;
		};
		/**
			把当前对象的属性序列化成json数据
		**/
		this.toJson = function() {
			var self = this,
				json = '{"version":"' + JTopo.version + '",';
			this.serializedProperties.forEach(function(key) {
				var value = self[key];
				if("string" == typeof value){
					value = '"' + value + '"';
				}
				json += '"' + key + '":' + value + ",";
			});
			json += '"childs":[';
			this.childs.forEach(function(scene) {
				json += scene.toJson()
			});
			json += "]";
			json += "}"
			return json;
		};
		/**
			事件大循环
		**/
		!function() {
			if(0 == self.frames){
				setTimeout(arguments.callee, 100);
			}else if(self.frames < 0){
				self.repaint();
				setTimeout(arguments.callee, 1e3 / -self.frames);
			}else{
				self.repaint();
				setTimeout(arguments.callee, 1e3 / self.frames);
			}
		}();
		setTimeout(function() {
			self.mousewheel(function(event) {
				var wheelDelta;
				if(null == event.wheelDelta){
					wheelDelta = event.detail;
				}else{
					wheelDelta = event.wheelDelta;
				}
				if(null != this.wheelZoom){
					if(wheelDelta > 0){
						this.zoomIn(this.wheelZoom);
					}else{
						this.zoomOut(this.wheelZoom);
					}
				}
			});
			self.paint();
		}, 300);
		// setTimeout(function() {
		// 	self.paint()
		// }, 1e3);
		// setTimeout(function() {
		// 	self.paint()
		// }, 3e3);
	}

	JTopo.Stage = Stage;

}(JTopo);
!function(JTopo){
	
	JTopo.backgroundCache = {};

	var Scene = function (stage) {
		function Operation(x, y, width, height) {
			return function(graphics) {
				graphics.beginPath();
				graphics.strokeStyle = "rgba(0,0,236,0.5)";
				graphics.fillStyle = "rgba(0,0,236,0.1)";
				graphics.rect(x, y, width, height);
				graphics.fill();
				graphics.stroke();
				graphics.closePath();
			}
		}
		var self = this;
		this.initialize = function() {
			Scene.prototype.initialize.apply(this, arguments);
			this.messageBus = new JTopo.util.MessageBus;
			this.elementType = "scene";
			this.childs = [];
			this.zIndexMap = {};
			this.zIndexArray = [];
			/**
				背景颜色，设置的时候请注意alpha属性
			**/
			this.backgroundColor = "255,255,255";
			/**
				得到设置场景是否可见，默认为：true
			**/
			this.visible = !0;
			/**
				场景的透明度，默认为0，即：完全透明。所以有时候即使设置了背景颜色却不起作用）
			**/
			this.alpha = 0;
			this.scaleX = 1;
			this.scaleY = 1;
			/**
				舞台模式，不同模式下有不同的表现:
				设置舞台模式，例如：stage.mode = "drag";
				normal[默认]：可以点击选中单个节点（按住Ctrl可以选中多个），点中空白处可以拖拽整个画面
				drag: 该模式下不可以选择节点，只能拖拽整个画面
				select: 可以框选多个节点、可以点击单个节点
				edit: 在默认基础上增加了：选中节点时可以通过6个控制点来调整节点的宽、高
			**/
			this.mode = JTopo.SceneMode.normal;
			this.translate = !0;
			/**
				场景偏移量（水平方向），随鼠标拖拽变化
			**/
			this.translateX = 0;
			/**
				场景偏移量（垂直方向），随鼠标拖拽变化
			**/
			this.translateY = 0;
			this.lastTranslateX = 0;
			this.lastTranslateY = 0;
			this.mouseDown = !1;
			this.mouseDownX = null;
			this.mouseDownY = null;
			this.mouseDownEvent = null;
			/**
				在select模式中，是否显示选择矩形框
			**/
			this.areaSelect = !0;
			this.operations = [];
			/**
				当前场景中被选中的元素对象
			**/
			this.selectedElements = [];
			this.paintAll = !1;
			this.serializedProperties = this.serializedProperties.concat(
				"background,backgroundColor,mode,paintAll,areaSelect,translate,translateX,translateY,lastTranslateX,lastTranslateY,alpha,visible,scaleX,scaleY".split(",")
			);
		};
		this.initialize();

		this.background = null;
		/**
			设置场景的背景图片, 与backgroundColor冲突，一旦设置了该属性，backgroundColor属性将失效
			例如：scene.background = "./img/bg.png";
		**/
		this.setBackground = function(value) {
			if ("string" == typeof value) {
				var bg = JTopo.backgroundCache[value];
				if(null == bg){
					bg = new Image;
					
					bg.onload = function() {
						JTopo.backgroundCache[value] = bg
					};
					bg.src = value;
				}
				this.background = bg
			} else {
				this.background = value
			}
		};

		this.setMode = function(value) {
			this.mode = value;
		};

		this.addTo = function(stage) {
			if(this.stage !== stage && null != stage){
				this.stage = stage;
			}
		};
		if(null != stage){
			stage.add(this);
			this.addTo(stage);
		}
		/**
			显示
		**/
		this.show = function() {
			this.visible = !0
		}; 
		/**
			隐藏
		**/
		this.hide = function() {
			this.visible = !1
		}; 
		this.paint = function(graphics) {
			if (0 != this.visible && null != this.stage) {
				graphics.save();
				//paintBackgroud
				if(null != this.background){
					graphics.drawImage(this.background, 0, 0, graphics.canvas.width, graphics.canvas.height);
				}else{
					graphics.beginPath();
					graphics.fillStyle = "rgba(" + this.backgroundColor + "," + this.alpha + ")";
					graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
					graphics.closePath();
				}

				graphics.restore();
				graphics.save();
				graphics.scale(this.scaleX, this.scaleY);
				if (1 == this.translate) {
					var offset = this.getOffsetTranslate(graphics);
					graphics.translate(offset.translateX, offset.translateY)
				}
				this.paintChilds(graphics);
				graphics.restore();
				graphics.save();
				this.paintOperations(graphics, this.operations);
				graphics.restore();
			}
		}; 
		this.repaint = function(graphics) {
			if(0 != this.visible){
				this.paint(graphics);
			}
		}; 
		/**
			获取场景中可见并绘制出来的元素（超过Canvas边界）
		**/
		this.getDisplayedElements = function() {
			var elements = [];
			for (var i = 0; i < this.zIndexArray.length; i++) {
				var index = this.zIndexArray[i];
				var map = this.zIndexMap[index];
				for (var j = 0; j < map.length; j++) {
					var element = map[j];
					if(this.isVisiable(element)){
						elements.push(element);
					}
				}
			}
			return elements;
		}; 
		/**
			获取场景中可见并绘制出来的Node对象（超过Canvas边界）
		**/
		this.getDisplayedNodes = function() {
			var nodes = [];
			for (var i = 0; i < this.childs.length; i++) {
				var node = this.childs[i];
				if(node instanceof a.Node && this.isVisiable(node)){
					nodes.push(node);
				}
			}
			return nodes;
		}; 
		this.paintChilds = function(graphics) {
			for (var i = 0; i < this.zIndexArray.length; i++){
				var index = this.zIndexArray[i];
				var map = this.zIndexMap[index];
				for (var j = 0; j < map.length; j++) {
					var element = map[j];
					if (1 == this.paintAll || this.isVisiable(element)) {
						graphics.save();
						if (1 == element.transformAble) {
							var center = element.getCenterLocation();
							//console.log("center.x:"+center.x)
							graphics.translate(center.x, center.y);
							if(element.rotate){
								graphics.rotate(element.rotate);
							}
							
							if(element.scaleX && element.scaleY){
								graphics.scale(element.scaleX, element.scaleY);
							}else if(element.scaleX){
								graphics.scale(element.scaleX, 1);
							}else if(element.scaleY){
								graphics.scale(1, element.scaleY);
							}
						}
						if(1 == element.shadow){
							graphics.shadowBlur = element.shadowBlur;
							graphics.shadowColor = element.shadowColor;
							graphics.shadowOffsetX = element.shadowOffsetX;
							graphics.shadowOffsetY = element.shadowOffsetY;
						}
						if(element instanceof JTopo.InteractiveElement){
							if(element.selected && 1 == element.showSelected){
								element.paintSelected(graphics);
							}
							if(1 == element.isMouseOver){
								element.paintMouseover(graphics);
							}
						}
						element.paint(graphics);
						graphics.restore();
					}
				}
			}
		}; 
		this.getOffsetTranslate = function(graphics) {
			var width = this.stage.canvas.width,
				height = this.stage.canvas.height;
			if(null != graphics && "move" != graphics){
				width = graphics.canvas.width;
				height = graphics.canvas.height;
			}
			var d = width / this.scaleX / 2,
				e = height / this.scaleY / 2;

			return {
				translateX: this.translateX + (d - d * this.scaleX),
				translateY: this.translateY + (e - e * this.scaleY)
			};
		}; 
		this.isVisiable = function(element) {
			if (1 != element.visible) {
				return !1;
			}
			if (element instanceof JTopo.Link) {
				return !0;
			}
			var translate = this.getOffsetTranslate();
			var x = element.x + translate.translateX;
			var y = element.y + translate.translateY;
			x *= this.scaleX;
			y *= this.scaleY;

			if(x > this.stage.canvas.width 
			|| y > this.stage.canvas.height 
			|| 0 > x + element.width * this.scaleX 
			|| 0 > y + element.height * this.scaleY){
				return !1;
			}else{
				return !0;
			}
		}; 
		this.paintOperations = function(graphics, operations) {
			for (var i = 0; i < operations.length; i++) {
				operations[i](graphics)
			}
		}; 
		/**
			查找场景中的对象，例如: findElements(function(e){ return e.x > 100; });
		**/
		this.findElements = function(selector) {
			var elements = [];
			for (var i = 0; i < this.childs.length; i++) {
				if(1 == selector(this.childs[i])){
					elements.push(this.childs[i]);
				}
			}
			return elements;
		}; 
		this.getElementsByClass = function(className) {
			return this.findElements(function(element) {
				return element instanceof className
			})
		}; 
		this.addOperation = function(operation) {
			this.operations.push(operation);
			return this;
		}; 
		this.clearOperations = function() {
			this.operations = [];
			return this;
		}; 
		this.getElementByXY = function(x, y) {
			for (var i = this.zIndexArray.length - 1; i >= 0; i--) {
				var index = this.zIndexArray[i];
				var map = this.zIndexMap[index];
				for (var j = map.length - 1; j >= 0; j--) {
					var element = map[j];
					if (element instanceof JTopo.InteractiveElement 
					 && this.isVisiable(element) 
					 && element.isInBound(x, y)
					) {
						return element;
					}
				}
			}
			return null;
		}; 
		/**
			添加对象到当前场景中来, 例如：scene.add(new JTopo.Node()); scene.add(new JTopo.Link(nodeA, nodeZ))
		**/
		this.add = function(child) {
			this.childs.push(child);
			if(null == this.zIndexMap[child.zIndex]){
				this.zIndexMap[child.zIndex] = [];
				this.zIndexArray.push(child.zIndex);
				this.zIndexArray.sort(function(a, b) {
					return a - b
				});
			}
			this.zIndexMap["" + child.zIndex].push(child);
		}; 
		/**
			移除场景中的某个元素, 例如：scene.remove(myNode);
		**/
		this.remove = function(obj) {
			this.childs = JTopo.util.removeFromArray(this.childs, obj);
			var zIndex = this.zIndexMap[obj.zIndex];
			if(zIndex){
				this.zIndexMap[obj.zIndex] = JTopo.util.removeFromArray(zIndex, obj);
			}
			obj.removeHandler(this);
		}; 
		/**
			移除场景中的所有元素
		**/
		this.clear = function() {
			var self = this;
			this.childs.forEach(function(child) {
				child.removeHandler(self)
			});
			this.childs = [];
			this.operations = [];
			this.zIndexArray = [];
			this.zIndexMap = {};
		}; 
		this.addToSelected = function(element) {
			this.selectedElements.push(element)
		}; 
		this.cancleAllSelected = function(element) {
			for (var i = 0; i < this.selectedElements.length; i++) {
				this.selectedElements[i].unselectedHandler(element);
			}
			this.selectedElements = []
		}; 
		this.notInSelectedNodes = function(element) {
			for (var i = 0; i < this.selectedElements.length; i++){
				if (element === this.selectedElements[i]) {
					return !1;
				}
			}
			return !0
		}; 
		this.removeFromSelected = function(element) {
			for (var i = 0; i < this.selectedElements.length; i++) {
				if(element === this.selectedElements[i]){
					//this.selectedElements = this.selectedElements.del(i);
					this.selectedElements = delArrayElByIndexInJtopo(this.selectedElements,i);
				}
			}
		}; 
		this.toSceneEvent = function(evt) {
			var event = JTopo.util.clone(evt);
			event.x /= this.scaleX;
			event.y /= this.scaleY;
			if (1 == this.translate) {
				var offset = this.getOffsetTranslate();
				event.x -= offset.translateX;
				event.y -= offset.translateY
			}
			if(null != event.dx){
				event.dx /= this.scaleX;
				event.dy /= this.scaleY;
			}
			if(null != this.currentElement){
				event.target = this.currentElement;
			}
			event.scene = this;
			return event;
		}; 
		this.selectElement = function(event) {
			var element = this.getElementByXY(event.x, event.y);
			if (null != element) {
				event.target = element;
				element.mousedownHander(event);
				element.selectedHandler(event);
				if (this.notInSelectedNodes(element)) {
					if(!event.ctrlKey){
						this.cancleAllSelected();
					}
					this.addToSelected(element);
				} else {
					if(1 == event.ctrlKey){
						element.unselectedHandler();
						this.removeFromSelected(element);
					}
					for (var i = 0; i < this.selectedElements.length; i++) {
						var selectedElement = this.selectedElements[i];
						selectedElement.selectedHandler(event);
					}
				}
			}else {
				if(!event.ctrlKey){
					this.cancleAllSelected();
				}
			}
			this.currentElement = element;
		}; 
		/**
			监听鼠标按下事件
		**/
		this.mousedownHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			this.mouseDown = !0;
			this.mouseDownX = event.x;
			this.mouseDownY = event.y;
			this.mouseDownEvent = event;
			if (this.mode == JTopo.SceneMode.normal) {
				this.selectElement(event);
				if((null == this.currentElement || this.currentElement instanceof JTopo.Link) && 1 == this.translate){
					this.lastTranslateX = this.translateX;
					this.lastTranslateY = this.translateY;
				}
			}else {
				if (this.mode == JTopo.SceneMode.drag && 1 == this.translate) {
					this.lastTranslateX = this.translateX;
					return void(this.lastTranslateY = this.translateY);
				}
				if(this.mode == JTopo.SceneMode.select){
					this.selectElement(event);
				}else if(this.mode == JTopo.SceneMode.edit){
					this.selectElement(event);
					if((null == this.currentElement || this.currentElement instanceof JTopo.Link) && 1 == this.translate){
						this.lastTranslateX = this.translateX;
						this.lastTranslateY = this.translateY;
					}
				}
			}
			this.dispatchEvent("mousedown", event)
		}; 
		/**
			监听鼠标松开事件
		**/
		this.mouseupHandler = function(evt) {
			// if(this.stage.getCursor() != JTopo.MouseCursor.normal){
			// 	this.stage.setCursor(JTopo.MouseCursor.normal);
			// }
			this.clearOperations();
			var event = this.toSceneEvent(evt);
			if(null != this.currentElement){
				event.target = this.currentElement;
				this.currentElement.mouseupHandler(event);
			}
			this.dispatchEvent("mouseup", event);
			this.mouseDown = !1;
		}; 
		this.dragElements = function(evt) {
			if (null != this.currentElement && 1 == this.currentElement.dragable)
				for (var i = 0; i < this.selectedElements.length; i++) {
					var target = this.selectedElements[i];
					if (0 != target.dragable) {
						var event = JTopo.util.clone(evt);
						event.target = target;
						target.mousedragHandler(event);
					}
				}
		}; 
		/**
			监听鼠标拖拽事件
		**/
		this.mousedragHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			if(this.mode == JTopo.SceneMode.normal){
				if(null == this.currentElement || this.currentElement instanceof JTopo.Link){
					if(1 == this.translate){
						//this.stage.setCursor(JTopo.MouseCursor.closed_hand);
						this.translateX = this.lastTranslateX + event.dx;
						this.translateY = this.lastTranslateY + event.dy;
					}
				}else{
					this.dragElements(event);
				}
			}else if(this.mode == JTopo.SceneMode.drag){
				if(1 == this.translate){
					//this.stage.setCursor(JTopo.MouseCursor.closed_hand);
					this.translateX = this.lastTranslateX + event.dx;
					this.translateY = this.lastTranslateY + event.dy;
				}
			}else if(this.mode == JTopo.SceneMode.select){
				if(null != this.currentElement){
					if(1 == this.currentElement.dragable){
						this.dragElements(event);
					}
				}else{
					if(1 == this.areaSelect){
						this.areaSelectHandle(event);
					}
				}
			}else if(this.mode == JTopo.SceneMode.edit){
				if(null == this.currentElement || this.currentElement instanceof JTopo.Link){
					if(1 == this.translate){
						//this.stage.setCursor(JTopo.MouseCursor.closed_hand);
						this.translateX = this.lastTranslateX + event.dx;
						this.translateY = this.lastTranslateY + event.dy;
					}
				}else{
					this.dragElements(event);
				}
			}
			this.dispatchEvent("mousedrag", event);
		}; 
		this.areaSelectHandle = function(event) {
			var x = event.offsetLeft >= this.mouseDownEvent.offsetLeft ? this.mouseDownEvent.offsetLeft : event.offsetLeft,
				y = event.offsetTop >= this.mouseDownEvent.offsetTop ? this.mouseDownEvent.offsetTop : event.offsetTop,
				width = Math.abs(event.dx) * this.scaleX,
				height = Math.abs(event.dy) * this.scaleY,
				operation = new Operation(x, y, width, height);
			this.clearOperations().addOperation(operation);
			x = event.x >= this.mouseDownEvent.x ? this.mouseDownEvent.x : event.x;
			y = event.y >= this.mouseDownEvent.y ? this.mouseDownEvent.y : event.y;
			width = Math.abs(event.dx);
			height = Math.abs(event.dy);
			for (var i = 0; i < this.childs.length; i++) {
				var child = this.childs[i];
				if(child.x > x && child.x + child.width < x + width 
				&& child.y > y && child.y + child.height < y + height 
				&& this.notInSelectedNodes(child)){
					child.selectedHandler(event);
					this.addToSelected(child);
				}
			}
		}; 
		/**
			监听鼠标移动事件
		**/
		this.mousemoveHandler = function(evt) {

			this.mousecoord = {
				x: evt.x,
				y: evt.y
			};
			var event = this.toSceneEvent(evt);
			if (this.mode == JTopo.SceneMode.drag) {
				return void(this.stage.setCursor(JTopo.MouseCursor.move));
			}
			if(this.mode == JTopo.SceneMode.normal){
				this.stage.setCursor(JTopo.MouseCursor.normal);
			}else if(this.mode == JTopo.SceneMode.select){
				this.stage.setCursor(JTopo.MouseCursor.normal);
			}else if(this.mode == JTopo.SceneMode.edit){
				this.stage.setCursor(JTopo.MouseCursor.pointer);
			}
			var element = this.getElementByXY(event.x, event.y);
			if(null != element){
				if(this.mouseOverelement && this.mouseOverelement !== element){
					event.target = element;
					this.mouseOverelement.mouseoutHandler(event);
				}
				this.mouseOverelement = element;
				if(0 == element.isMouseOver){
					event.target = element;
					element.mouseoverHandler(event);
					this.dispatchEvent("mouseover", event);
				}else{
					event.target = element;
					element.mousemoveHandler(event);
					this.dispatchEvent("mousemove", event);
				}
			}else if(this.mouseOverelement){
				event.target = element;
				this.mouseOverelement.mouseoutHandler(event);
				this.mouseOverelement = null;
				this.dispatchEvent("mouseout", event);
			}else{
				event.target = null;
				this.dispatchEvent("mousemove", event);
			}
		}; 
		/**
			监听鼠标进入Canvas事件
		**/
		this.mouseoverHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			this.dispatchEvent("mouseover", event)
		}; 
		/**
			监听鼠标离开Canvas事件
		**/
		this.mouseoutHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			this.dispatchEvent("mouseout", event)
		}; 
		/**
			监听鼠标单击事件（鼠标按下并松开）
		**/
		this.clickHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			if(this.currentElement){
				event.target = this.currentElement;
				this.currentElement.clickHandler(event);
			}
			this.dispatchEvent("click", event)
		}; 
		/**
			监听鼠标双击事件（鼠标按下并松开）
		**/
		this.dbclickHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			if(this.currentElement){
				event.target = this.currentElement;
				this.currentElement.dbclickHandler(event);
			}else{
				this.cancleAllSelected();
			}
			this.dispatchEvent("dbclick", event)
		}; 
		/**
			监听鼠标滚轮事件
		**/
		this.mousewheelHandler = function(evt) {
			var event = this.toSceneEvent(evt);
			this.dispatchEvent("mousewheel", event)
		}; 
		this.touchstart = this.mousedownHander;
		this.touchmove = this.mousedragHandler;
		this.touchend = this.mouseupHander;
		this.keydownHandler = function(evt) {
			this.dispatchEvent("keydown", evt)
		}; 
		this.keyupHandler = function(evt) {
			this.dispatchEvent("keyup", evt)
		}; 
		/**
			监听事件
			例如：stage.addEventListener("mousedown", function(event){});
		**/
		this.addEventListener = function(eventName, listener) {
			var self = this;
			this.messageBus.subscribe(eventName, function(params) {
				listener.call(self, params)
			});
			return this;
		}; 
		/**
			移除监听事件和addEventListener相对应
		**/
		this.removeEventListener = function(eventName) {
			this.messageBus.unsubscribe(eventName)
		}; 
		/**
			移除所有监听事件
		**/
		this.removeAllEventListener = function() {
			this.messageBus = new JTopo.util.MessageBus
		}; 
		this.dispatchEvent = function(eventName, event) {
			this.messageBus.publish(eventName, event);
			return this;
		};
		var eventNames = "click,dbclick,mousedown,mouseup,mouseover,mouseout,mousemove,mousedrag,mousewheel,touchstart,touchmove,touchend,keydown,keyup".split(","),
			self = this;
		eventNames.forEach(function(key) {
			self[key] = function(listener) {
				if(null != listener){
					self.addEventListener(key, listener);
				}else{
					self.dispatchEvent(key);
				}
			}
		});
		this.zoom = function(scaleX, scaleY) {
			if(null != scaleX && 0 != scaleX){
				this.scaleX = scaleX;
			}
			if(null != scaleY && 0 != scaleY){
				this.scaleY = scaleY;
			}
		}; 
		this.zoomOut = function(scale) {
			if(0 != scale){
				if(null == scale){
					scale = .8;
				}
				this.scaleX /= scale;
				this.scaleY /= scale;
			}
		}; 
		this.zoomIn = function(scale) {
			if(0 != scale){
				if(null == scale){
					scale = .8;
				}
				this.scaleX *= scale;
				this.scaleY *= scale;
			}
		}; 
		this.getBound = function() {
			return {
				left: 0,
				top: 0,
				right: this.stage.canvas.width,
				bottom: this.stage.canvas.height,
				width: this.stage.canvas.width,
				height: this.stage.canvas.height
			}
		}; 
		this.getElementsBound = function() {
			return JTopo.util.getElementsBound(this.childs)
		}; 
		this.translateToCenter = function(graphics) {
			var bound = this.getElementsBound();
			if(graphics){
				translateX = graphics.canvas.width / 2 - (bound.left + bound.right) / 2;
				translateY = graphics.canvas.height / 2 - (bound.top + bound.bottom) / 2;
			}else{
				translateX = this.stage.canvas.width / 2 - (bound.left + bound.right) / 2,
				translateY = this.stage.canvas.height / 2 - (bound.top + bound.bottom) / 2
			}
			this.translateX = translateX;
			this.translateY = translateY;
		}; 
		this.setCenter = function(cx, cy) {
			var translateX = cx - this.stage.canvas.width / 2,
				translateY = cy - this.stage.canvas.height / 2;
			this.translateX = -translateX;
			this.translateY = -translateY;
		}; 
		this.centerAndZoom = function(sx, sy, graphics) {
			this.translateToCenter(graphics);
			if (null == sx || null == sy) {
				var bound = this.getElementsBound(),
					width = bound.right - bound.left,
					height = bound.bottom - bound.top,
					scaleX = this.stage.canvas.width / width,
					scaleY = this.stage.canvas.height / height;
				if(graphics){
					scaleX = graphics.canvas.width / width;
					scaleY = graphics.canvas.height / height;
				}
				var scale = Math.min(scaleX, scaleY);
				if (scale > 1) {
					return;
				}
				this.zoom(scale, scale);
			}
			this.zoom(sx, sy);
		}; 
		this.getCenterLocation = function() {
			return {
				x: this.stage.canvas.width / 2,
				y: this.stage.canvas.height / 2
			}
		}; 
		this.doLayout = function(layout) {
			if(layout){
				layout(this, this.childs);
			}
		}; 
		this.toJson = function() {
			var self = this,
				json = "{";
			this.serializedProperties.forEach(function(key) {
				var value = self[key];
				if("background" == key){
					value = self.background.src;
				}
				if("string" == typeof value){
					value = '"' + value + '"';
				}
				json += '"' + key + '":' + value + ","
			});
			json += '"childs":[';
			var length = this.childs.length;
			this.childs.forEach(function(child, index) {
				json += child.toJson();
				if(length > index + 1){
					json += ",";
				}
			});
			json += "]";
			json += "}";
			return json;
		};
		return this
	}
	Scene.prototype = new JTopo.Element;

	JTopo.Scene = Scene;

}(JTopo);
!function(JTopo){
	JTopo.Stage.prototype.find = JTopo.Scene.prototype.find = function(selector) {

		function filterByRegularExpress(eles, regularExpress) {
			var result = [];
			if (0 == eles.length) {
				return result;
			}
			var matches = regularExpress.match(/^\s*(\w+)\s*$/);
			if (null != matches) {
				var elements = eles.filter(function(element) {
					return element.elementType == matches[1]
				});
				if(null != elements && elements.length > 0){
					result = result.concat(elements);
				}
			} else {
				var isDigit = !1;
				matches = regularExpress.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*['"](\S+)['"]\s*\]\s*/);
				if(null == matches || matches.length < 5){
					matches = regularExpress.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*(\d+(\.\d+)?)\s*\]\s*/);
					isDigit = !0;
				}
				if (null != matches && matches.length >= 5) {
					elements = eles.filter(function(element) {
						if (element.elementType != matches[1]) {
							return !1;
						}
						var value = element[matches[2]];
						if(1 == isDigit){
							value = parseInt(value);
						}

						if("=" == matches[3]){
							return value == matches[4];
						}else if(">" == matches[3]){
							return value > matches[4];
						}else if("<" == matches[3]){
							return matches[4] > value;
						}else if("<=" == matches[3]){
							return matches[4] >= value;
						}else if(">=" == matches[3]){
							return value >= matches[4];
						}else if("!=" == matches[3]){
							return value != matches[4];
						}else{
							return !1;
						}
					});
					if(null != elements && elements.length > 0){
						result = result.concat(elements);
					}
				}
			}
			return result
		}

		function makeup(elements) {
			elements.find = function(params) {
				return selector.call(this, params)
			};
			var eventNames = "click,mousedown,mouseup,mouseover,mouseout,mousedrag,keydown,keyup".split(",");
			eventNames.forEach(function(eventName) {
				elements[eventName] = function(elements) {
					for (var i = 0; i < this.length; i++) {
						this[i][eventName](elements);
					}
					return this
				}
			});

			if (elements.length > 0) {
				var element = elements[0];
				for (var key in element) {
					var func = element[key];
					if("function" == typeof func){
						!function(func) {
							elements[key] = function() {
								var result = [];
								for (var i = 0; i < elements.length; i++) {
									result.push(func.apply(elements[i], arguments));
								}
								return result;
							}
						}(func);
					}
				}
			}
			elements.attr = function(keys, value) {
				if (null != keys && null != value) {
					for (var i = 0; i < this.length; i++) {
						this[i][keys] = value;
					}
				} else {
					if (null != keys && "string" == typeof keys) {
						var attrs = [];
						for (var i = 0; i < this.length; i++) {
							attrs.push(this[i][keys]);
						}
						return attrs;
					}
					if (null != keys) {
						for (var i = 0; i < this.length; i++){
							for (var key in keys) {
								this[i][key] = keys[key];
							}
						}
					}
				}
				return this;
			};
			return elements;
		}

		var childs = [],
			all = [];
		if(this instanceof JTopo.Stage){
			childs = this.childs;
			all = all.concat(childs);
		}else if(this instanceof JTopo.Scene){
			childs = [this];
		}else{
			all = this;
		}
		childs.forEach(function(child) {
			all = all.concat(child.childs)
		});
		var result = null;
		if("function" == typeof selector){
			result = all.filter(selector);
		}else{
			result = filterByRegularExpress(all, selector);
		}
		result = makeup(result)
		return result;
	}

}(JTopo);
!function(JTopo){
	
	var EditableElement = function () {
		this.initialize = function() {
			EditableElement.prototype.initialize.apply(this, arguments);
			/**
				是否可被编辑
			**/
			this.editAble = !1;
			this.selectedPoint = null;
		};
		this.getCtrlPosition = function(ctrl) {
			var position = this.getPosition(ctrl);
			return {
				left: position.x - 5,
				top: position.y - 5,
				right: position.x + 5,
				bottom: position.y + 5
			}
		};
		this.selectedHandler = function(event) {
			EditableElement.prototype.selectedHandler.apply(this, arguments);
			this.selectedSize = {
				width: this.width,
				height: this.height
			};
			if(event.scene.mode == JTopo.SceneMode.edit){
				this.editAble = !0;
			}
		};
		this.unselectedHandler = function() {
			EditableElement.prototype.unselectedHandler.apply(this, arguments);
			this.selectedSize = null;
			this.editAble = !1;
		};
		
		this.paintCtrl = function(graphics) {
			if (0 != this.editAble) {
				graphics.save();
				var positions = ["Top_Left", "Top_Center", "Top_Right", "Middle_Left", "Middle_Right", "Bottom_Left", "Bottom_Center", "Bottom_Right"];
				for (var i = 0; i < positions.length; i++) {
					var position = this.getCtrlPosition(positions[i]);
					position.left -= this.getCenterX();
					position.right -= this.getCenterX();
					position.top -= this.getCenterY();
					position.bottom -= this.getCenterY();
					var width = position.right - position.left,
						height = position.bottom - position.top;
					graphics.beginPath();
					graphics.strokeStyle = "rgba(0,0,0,0.8)";
					graphics.rect(position.left, position.top, width, height);
					graphics.stroke();
					graphics.closePath();
					graphics.beginPath();
					graphics.strokeStyle = "rgba(255,255,255,0.3)";
					graphics.rect(position.left + 1, position.top + 1, width - 2, height - 2);
					graphics.stroke();
					graphics.closePath();
				}
				graphics.restore()
			}
		};
		this.isInBound = function(x, y) {
			this.selectedPoint = null;
			if (1 == this.editAble) {
				var positions = ["Top_Left", "Top_Center", "Top_Right", "Middle_Left", "Middle_Right", "Bottom_Left", "Bottom_Center", "Bottom_Right"];
				for (var i = 0; i < positions.length; i++) {
					var position = this.getCtrlPosition(positions[i]);
					if (x > position.left && x < position.right && y > position.top && y < position.bottom) {
						this.selectedPoint = positions[i];
						return !0;
					}
				}
			}
			return EditableElement.prototype.isInBound.apply(this, arguments)
		};
		this.mousedragHandler = function(event) {
			if (null == this.selectedPoint) {
				var x = this.selectedLocation.x + event.dx,
					y = this.selectedLocation.y + event.dy;
				this.setLocation(x, y);
				this.dispatchEvent("mousedrag", event);
			} else {
				if ("Top_Left" == this.selectedPoint) {
					var width = this.selectedSize.width - event.dx,
						height = this.selectedSize.height - event.dy,
						x = this.selectedLocation.x + event.dx,
						y = this.selectedLocation.y + event.dy;
					if(x < this.x + this.width){
						this.x = x;
						this.width = width;
					}
					if(y < this.y + this.height){
						this.y = y;
						this.height = height;
					}
				} else if ("Top_Center" == this.selectedPoint) {
					var height = this.selectedSize.height - event.dy,
						y = this.selectedLocation.y + event.dy;
					if(y < this.y + this.height){
						this.y = y;
						this.height = height;
					}
				} else if ("Top_Right" == this.selectedPoint) {
					var width = this.selectedSize.width + event.dx,
						y = this.selectedLocation.y + event.dy;
					if(y < this.y + this.height){
						this.y = y;
						this.height = this.selectedSize.height - event.dy;
					}
					if(width > 1){
						this.width = width;
					}
				} else if ("Middle_Left" == this.selectedPoint) {
					var width = this.selectedSize.width - event.dx,
						x = this.selectedLocation.x + event.dx;
					if(x < this.x + this.width){
						this.x = x;
					}
					if(width > 1){
						this.width = width;
					}
				} else if ("Middle_Right" == this.selectedPoint) {
					var width = this.selectedSize.width + event.dx;
					if(width > 1){
						this.width = width;
					}
				} else if ("Bottom_Left" == this.selectedPoint) {
					var width = this.selectedSize.width - event.dx,
						x = this.selectedLocation.x + event.dx;
					if(width > 1){
						this.x = x;
						this.width = width;
					}
					var height = this.selectedSize.height + event.dy;
					if(height > 1){
						this.height = height;
					}
				} else if ("Bottom_Center" == this.selectedPoint) {
					var height = this.selectedSize.height + event.dy;
					if(height > 1){
						this.height = height;
					}
				} else if ("Bottom_Right" == this.selectedPoint) {
					var width = this.selectedSize.width + event.dx;
					if(width > 1){
						this.width = width;
					}
					var height = this.selectedSize.height + event.dy;
					if(height > 1){
						this.height = height;
					}
				}
				this.dispatchEvent("resize", event)
			}
		}
	}
	EditableElement.prototype = new JTopo.InteractiveElement;

	JTopo.imageCache = {};
	var AbstractNode = function (text) {
		this.initialize = function(text) {
			AbstractNode.prototype.initialize.apply(this, arguments);
			this.elementType = "node";
			this.zIndex = JTopo.zIndex_Node;
			/**
				设置节点的名字（显示文本）
			**/
			this.text = text;
			/**
				节点字体，例如：node.font = "12px Consolas"
			**/
			this.font = "12px Consolas";
			/**
				字体颜色，例如：node.fontColor = "255,255,0"
			**/
			this.fontColor = "255,255,255";
			this.borderWidth = 0;
			this.borderColor = "255,255,255";
			this.borderRadius = null;
			this.dragable = !0;
			/**
				节点文本位置，例如：node.textPosition = "Bottom_Center"
			**/
			this.textPosition = "Bottom_Center";
			this.textOffsetX = 0;
			this.textOffsetY = 0;
			this.transformAble = !0;
			this.inLinks = null;
			this.outLinks = null;
			this.serializedProperties = this.serializedProperties.concat(
				"text,font,fontColor,textPosition,textOffsetX,textOffsetY,borderRadius".split(",")
			);
		};
		this.initialize(text);
		this.paint = function(graphics) {
			if (this.image) {
				var globalAlpha = graphics.globalAlpha;
				graphics.globalAlpha = this.alpha;
				if(null != this.image.alarm && null != this.alarm){
					console.log(this.width);
					graphics.drawImage(
						this.image.alarm, 
						-this.width / 2.0, 
						-this.height / 2.0, 
						this.width, 
						this.height
					);
				}else{
					graphics.drawImage(
						this.image, 
						-this.width / 2.0, 
						-this.height / 2.0, 
						this.width, 
						this.height
					);
				}
				graphics.globalAlpha = globalAlpha;
			} else {
				graphics.beginPath();
				graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
				if(null == this.borderRadius || 0 == this.borderRadius){
					graphics.rect(
						-this.width / 2, 
						-this.height / 2, 
						this.width, 
						this.height
					);
				}else{
					this.paintRoundRect(
						graphics,
						-this.width / 2, 
						-this.height / 2, 
						this.width, 
						this.height, 
						this.borderRadius
					);
				}
				graphics.fill();
				graphics.closePath();
			}
			this.paintText(graphics);
			this.paintBorder(graphics);
			this.paintCtrl(graphics);
			this.paintAlarmText(graphics);
		};
		this.paintAlarmText = function(graphics) {
			if (null != this.alarm && "" != this.alarm) {
				var alarmColor = this.alarmColor || "255,0,0";
				var alarmAlpha = this.alarmAlpha || .5;
				graphics.beginPath();
				graphics.font = this.alarmFont || "10px 微软雅黑";
				var textWidth = graphics.measureText(this.alarm).width + 6;
				var unitWidth = graphics.measureText("田").width + 6;
				var centerX = -this.width / 2+4 ;//- textWidth / 2;更改告警位置
				var centerY = -this.height / 2 - unitWidth - 8;
				graphics.strokeStyle = "rgba(" + alarmColor + ", " + alarmAlpha + ")";
				graphics.fillStyle = "rgba(" + alarmColor + ", " + alarmAlpha + ")";
				graphics.lineCap = "round";
				graphics.lineWidth = 1;
				graphics.moveTo(centerX, centerY);
				graphics.lineTo(centerX + textWidth, centerY);
				graphics.lineTo(centerX + textWidth, centerY + unitWidth);
				graphics.lineTo(centerX + textWidth / 2 + 6, centerY + unitWidth);
				graphics.lineTo(centerX + textWidth / 2, centerY + unitWidth + 8);
				graphics.lineTo(centerX + textWidth / 2 - 6, centerY + unitWidth);
				graphics.lineTo(centerX, centerY + unitWidth);
				graphics.lineTo(centerX, centerY);
				graphics.fill();
				graphics.stroke();
				graphics.closePath();
				graphics.beginPath();
				graphics.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				graphics.fillText(this.alarm, centerX + 2, centerY + unitWidth - 4);
				graphics.closePath();
			}
		};
		this.paintText = function(graphics) {
			if (null != this.text && "" != this.text) {
				graphics.beginPath();
				graphics.font = this.font;
				var textWidth = graphics.measureText(this.text).width;
				var unitWidth = graphics.measureText("田").width;
				graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				var textPosition = this.getTextPostion(this.textPosition, textWidth, unitWidth);
				graphics.fillText(this.text, textPosition.x, textPosition.y);
				graphics.closePath();
			}
		};
		this.paintBorder = function(graphics) {
			if (0 != this.borderWidth) {
				graphics.beginPath();
				graphics.lineWidth = this.borderWidth;
				graphics.strokeStyle = "rgba(" + this.borderColor + "," + this.alpha + ")";
				if(null == this.borderRadius || 0 == this.borderRadius){
					graphics.rect(
						-this.width / 2 - this.borderWidth / 2, 
						-this.height / 2 - this.borderWidth / 2, 
						this.width + this.borderWidth, 
						this.height + this.borderWidth
					);
				}else{
					this.paintRoundRect(
						graphics,
						-this.width / 2 - this.borderWidth / 2, 
						-this.height / 2 - this.borderWidth / 2, 
						this.width + this.borderWidth, 
						this.height + this.borderWidth, 
						this.borderRadius
					);
				}
				graphics.stroke();
				graphics.closePath();
			}
		};
		this.getTextPostion = function(position, textWidth, unitWidth) {
			var result = null;
			if(null == position || "Bottom_Center" == position){
				result = {
					x: -this.width / 2 + (this.width - textWidth) / 2,
					y: this.height / 2 + unitWidth
				};
			}else if("Top_Center" == position){
				result = {
					x: -this.width / 2 + (this.width - textWidth) / 2,
					y: -this.height / 2 - unitWidth / 2
				};
			}else if("Top_Right" == position){
				result = {
					x: this.width / 2,
					y: -this.height / 2 - unitWidth / 2
				};
			}else if("Top_Left" == position){
				result = {
					x: -this.width / 2 - textWidth,
					y: -this.height / 2 - unitWidth / 2
				};
			}else if("Bottom_Right" == position){
				result = {
					x: this.width / 2,
					y: this.height / 2 + unitWidth
				};
			}else if("Bottom_Left" == position){
				result = {
					x: -this.width / 2 - textWidth,
					y: this.height / 2 + unitWidth
				};
			}else if("Middle_Center" == position){
				result = {
					x: -this.width / 2 + (this.width - textWidth) / 2,
					y: unitWidth / 2
				};
			}else if("Middle_Right" == position){
				result = {
					x: this.width / 2,
					y: unitWidth / 2
				};
			}else if("Middle_Left" == position){
				result = {
					x: -this.width / 2 - textWidth,
					y: unitWidth / 2
				};
			}
			if(null != this.textOffsetX){
				result.x += this.textOffsetX;
			}
			if(null != this.textOffsetY){
				result.y += this.textOffsetY;
			}
			return result;
		};
		/**
			设置节点图片
		**/
		this.setImage = function(src, isAutoSize) {
			if (null == src) {
				throw new Error("Node.setImage(): 参数Image对象为空!");
			}
			var self = this;
			
			if ("string" == typeof src) {
				var image = JTopo.imageCache[src];
				if(null == image){
					image = new Image;
					image.onload = function() {
						JTopo.imageCache[src] = image;
						if(1 == isAutoSize){
							self.setSize(image.width, image.height);
						}
						var alarm = JTopo.util.genImageAlarm(image);
						if(alarm){
							image.alarm = alarm;
						}
						self.image = image
					};
					image.src = src;
				}else{
					if(isAutoSize){
						this.setSize(image.width, image.height);
					}
					this.image = image;
				}
			} else {
				this.image = src;
			
				if(1 == isAutoSize){
					this.setSize(src.width, src.height);
				}
			}
		};
		this.removeHandler = function(scene) {
			var self = this;
			if(this.outLinks){
				this.outLinks.forEach(function(link) {
					if(link.nodeA === self){
						scene.remove(link);
					}
				});
				this.outLinks = null;
			}
			if(this.inLinks){
				this.inLinks.forEach(function(link) {
					if(link.nodeZ === self){
						scene.remove(link);
					}
				});
				this.inLinks = null;
			}
		}
	}
	AbstractNode.prototype = new EditableElement;

	var Node = function () {
		Node.prototype.initialize.apply(this, arguments)
	}
	Node.prototype = new AbstractNode;

	JTopo.Node = Node;

}(JTopo);
!function(JTopo){
	var TextNode = function (text) {
		this.initialize();
		this.text = text;
		this.elementType = "TextNode";
		this.paint = function(graphics) {
			graphics.beginPath();
			graphics.font = this.font;
			this.width = graphics.measureText(this.text).width;
			this.height = graphics.measureText("田").width;
			graphics.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
			graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
			graphics.fillText(this.text, -this.width / 2, this.height / 2);
			graphics.closePath();
			this.paintBorder(graphics);
			this.paintCtrl(graphics);
			this.paintAlarmText(graphics)
		}
	}
	TextNode.prototype = new JTopo.Node;

	JTopo.TextNode = TextNode;
}(JTopo);
!function(JTopo){
	var LinkNode = function (text, href, target) {
		this.initialize();
		this.text = text;
		this.href = href;
		this.target = target;
		this.elementType = "LinkNode";
		this.isVisited = !1;
		this.visitedColor = null;
		this.paint = function(graphics) {
			graphics.beginPath();
			graphics.font = this.font;
			this.width = graphics.measureText(this.text).width;
			this.height = graphics.measureText("田").width;
			if(this.isVisited && null != this.visitedColor){
				graphics.strokeStyle 	= "rgba(" + this.visitedColor + ", " + this.alpha + ")";
				graphics.fillStyle 		= "rgba(" + this.visitedColor + ", " + this.alpha + ")";
			}else{
				graphics.strokeStyle 	= "rgba(" + this.fontColor + ", " + this.alpha + ")";
				graphics.fillStyle 		= "rgba(" + this.fontColor + ", " + this.alpha + ")";
			}
			graphics.fillText(this.text, -this.width / 2, this.height / 2);
			if(this.isMouseOver){
				graphics.moveTo(-this.width / 2, this.height);
				graphics.lineTo(this.width / 2, this.height);
				graphics.stroke();
			}
			graphics.closePath();
			this.paintBorder(graphics);
			this.paintCtrl(graphics);
			this.paintAlarmText(graphics);
		};
		this.mousemove(function() {
			var canvases = document.getElementsByTagName("canvas");
			if (canvases && canvases.length > 0) {
				for (var i = 0; i < canvases.length; i++) {
					canvases[i].style.cursor = "pointer";
				}
			}
		});
		this.mouseout(function() {
			var canvases = document.getElementsByTagName("canvas");
			if (canvases && canvases.length > 0) {
				for (var i = 0; i < canvases.length; i++) {
					canvases[i].style.cursor = "default"
				}
			}
		});
		this.click(function() {
			if("_blank" == this.target){
				window.open(this.href);
			}else{
				location = this.href;
			}
			this.isVisited = !0;
		});
	}
	LinkNode.prototype = new JTopo.TextNode;

	JTopo.LinkNode = LinkNode;

}(JTopo);
!function(JTopo){
	var CircleNode = function (text) {
		this.initialize(arguments);
		this._radius = 20;
		this.beginDegree = 0;
		this.endDegree = 2 * Math.PI;
		this.text = text;
		this.setRadius = function(value) {
			this.radius = value;
			this.width = 2 * value;
			this.height = 2 * value;
		};
		this.setWidth = function(value) {
			this.radius = value / 2;
			this.width = value
		};
		this.setHeight = function(value) {
			this.radius = value / 2;
			this.height = value
		};
		this.paint = function(graphics) {
			graphics.save();
			graphics.beginPath();
			graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
			graphics.arc(0, 0, this.radius, this.beginDegree, this.endDegree, !0);
			graphics.fill();
			graphics.closePath();
			graphics.restore();
			this.paintText(graphics);
			this.paintBorder(graphics);
			this.paintCtrl(graphics);
			this.paintAlarmText(graphics);
		};
		this.paintSelected = function(graphics) {
			graphics.save();
			graphics.beginPath();
			graphics.strokeStyle = "rgba(168,202,255, 0.9)";
			graphics.fillStyle = "rgba(168,202,236,0.7)";
			graphics.arc(0, 0, this.radius + 3, this.beginDegree, this.endDegree, !0);
			graphics.fill();
			graphics.stroke();
			graphics.closePath();
			graphics.restore();
		}
	}
	CircleNode.prototype = new JTopo.Node;

	JTopo.CircleNode = CircleNode;

}(JTopo);
!function(JTopo){
	var AnimateNode1 = function (frameImages, timer, isAutoSize) {
		this.initialize();
		this.frameImages = frameImages || [];
		this.frameIndex = 0;
		this.isStop = !0;
		this.repeatPlay = !1;
		var self = this;
		this.nextFrame = function() {
			if (!this.isStop && null != this.frameImages.length) {
				this.frameIndex++;
				if (this.frameIndex >= this.frameImages.length) {
					if (!this.repeatPlay) {
						return;
					}
					this.frameIndex = 0
				}
				this.setImage(this.frameImages[this.frameIndex], isAutoSize);
				setTimeout(function() {
					self.nextFrame()
				}, (timer || 1e3) / frameImages.length);
			}
		}
	}

	var AnimateNode2 = function (image, rows, cols, timer, rowStep) {
		this.initialize();
		var self = this;
		this.setImage(image);
		this.frameIndex = 0;
		this.isPause = !0;
		this.repeatPlay = !1;
		
		this.paint = function(graphics) {
			if (this.image) {
				graphics.save();
				graphics.beginPath();
				graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
				graphics.drawImage(
					this.image, 
					Math.floor(this.frameIndex % cols) * this.width, 
					(Math.floor(this.frameIndex / cols) + (rowStep || 0)) * this.height, 
					this.width, 
					this.height, 
					-this.width / 2, 
					-this.height / 2, 
					this.width, 
					this.height
				);
				graphics.fill();
				graphics.closePath();
				graphics.restore();
				this.paintText(graphics);
				this.paintBorder(graphics);
				this.paintCtrl(graphics);
				this.paintAlarmText(graphics);
			}
		};
		this.nextFrame = function() {
			if (!this.isStop) {
				this.frameIndex++;
				if (this.frameIndex >= rows * cols) {
					if (!this.repeatPlay) {
						return;
					}
					this.frameIndex = 0
				}
				setTimeout(function() {
					if(!self.isStop){
						self.nextFrame();
					}
				}, (timer || 1e3) / (rows * cols))
			}
		}
	}
	AnimateNode1.prototype = new JTopo.Node;
	AnimateNode2.prototype = new JTopo.Node;

	var AnimateNode = function () {
		var node = null;
		if(arguments.length <= 3){
			node = new AnimateNode1(arguments[0], arguments[1], arguments[2]);
		}else{
			node = new AnimateNode2(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
		}
		node.stop = function() {
			node.isStop = !0
		};
		node.play = function() {
			node.isStop = !1;
			node.frameIndex = 0;
			node.nextFrame();
		};
		return node;
	}
	AnimateNode.prototype = new JTopo.Node;

	JTopo.AnimateNode = AnimateNode;
	
}(JTopo);
!function(JTopo){

	JTopo.BarChartNode = function () {
		var node = new JTopo.Node;
		node.showSelected = !1;
		node.width = 250;
		node.height = 180;
		node.colors = ["#3666B0", "#2CA8E0", "#77D1F6"];
		node.datas = [.3, .3, .4];
		node.titles = ["A", "node", "C"];
		node.paint = function(graphics) {
			var dataWidth = (this.width - 3) / this.datas.length;
			graphics.save();
			graphics.beginPath();
			graphics.fillStyle = "#FFFFFF";
			graphics.strokeStyle = "#FFFFFF";
			graphics.moveTo(-this.width / 2 - 1, -this.height / 2);
			graphics.lineTo(-this.width / 2 - 1, this.height / 2 + 3);
			graphics.lineTo(this.width / 2 + 3 + 1, this.height / 2 + 3);
			graphics.stroke();
			graphics.closePath();
			graphics.restore();
			for (var i = 0; i < this.datas.length; i++) {
				graphics.save();
				graphics.beginPath();
				graphics.fillStyle = node.colors[i];
				var data = this.datas[i],
					x = i * (dataWidth + 3) - this.width / 2,
					y = this.height - data - this.height / 2;
				graphics.fillRect(x, y, dataWidth, data);
				var text = "" + parseInt(data),
					textWidth = graphics.measureText(text).width,
					unitWidth = graphics.measureText("田").width;
				graphics.fillStyle = "#FFFFFF";
				graphics.fillText(text, x + (dataWidth - textWidth) / 2, y - unitWidth);
				graphics.fillText(this.titles[i], x + (dataWidth - textWidth) / 2, this.height / 2 + unitWidth);
				graphics.fill();
				graphics.closePath();
				graphics.restore();
			}
		};
		return node;
	}
	JTopo.PieChartNode = function () {
		var node = new JTopo.CircleNode;
		node.radius = 150;
		node.colors = ["#3666B0", "#2CA8E0", "#77D1F6"];
		node.datas = [.3, .3, .4];
		node.titles = ["A", "node", "C"];
		node.paint = function(graphics) {
			node.width = 2 * node.radius;
			node.height = 2 * node.radius;
			var sum = 0;
			for (var i = 0; i < this.datas.length; i++) {
				var percent = this.datas[i] * Math.PI * 2;
				graphics.save();
				graphics.beginPath();
				graphics.fillStyle = node.colors[i];
				graphics.moveTo(0, 0);
				graphics.arc(0, 0, this.radius, sum, sum + percent, !1);
				graphics.fill();
				graphics.closePath();
				graphics.restore();
				graphics.beginPath();
				graphics.font = this.font;
				var text = this.titles[i] + ": " + (100 * this.datas[i]).toFixed(2) + "%",
					textWidth = graphics.measureText(text).width,
					angle = (sum + sum + percent) / 2,
					x1 = this.radius * Math.cos(angle),
					x2 = this.radius * Math.sin(angle);
				if(angle > Math.PI / 2 && angle <= Math.PI){
					x1 -= textWidth;
				}else if(angle > Math.PI && angle < 2 * Math.PI * 3 / 4){
					x1 -= textWidth;
				}
				graphics.fillStyle = "#FFFFFF";
				graphics.fillText(text, x1, x2);
				graphics.moveTo(this.radius * Math.cos(angle), this.radius * Math.sin(angle));
				if(angle > Math.PI / 2 && angle < 2 * Math.PI * 3 / 4){
					x1 -= textWidth;
				}
				graphics.fill();
				graphics.stroke();
				graphics.closePath();
				sum += percent;
			}
		};
		return node;
	}
	
}(JTopo);
!function(JTopo){
	var Link = function (nodeA, nodeZ, text) {
		this.initialize = function(nodeA, nodeZ, text) {
			Link.prototype.initialize.apply(this, arguments);
			this.elementType = "link";
			this.zIndex = JTopo.zIndex_Link;
			if (0 != arguments.length) {
				/**
					连线的名字（文本）
				**/
				this.text = text;
				/**
					起始节点对象
				**/
				this.nodeA = nodeA;
				/**
					终止节点对象
				**/
				this.nodeZ = nodeZ;
				this.nodeA && null == this.nodeA.outLinks && (this.nodeA.outLinks = []);
				this.nodeA && null == this.nodeA.inLinks && (this.nodeA.inLinks = []);
				this.nodeZ && null == this.nodeZ.inLinks && (this.nodeZ.inLinks = []);
				this.nodeZ && null == this.nodeZ.outLinks && (this.nodeZ.outLinks = []);
				null != this.nodeA && this.nodeA.outLinks.push(this);
				null != this.nodeZ && this.nodeZ.inLinks.push(this);
				this.caculateIndex();
				this.font = "12px Consolas";
				this.fontColor = "255,255,255";
				/**
					线条的宽度（像素）
				**/
				this.lineWidth = 2;
				this.lineJoin = "miter";
				this.transformAble = !1;
				this.bundleOffset = 20;
				this.bundleGap = 12;
				this.textOffsetX = 0;
				this.textOffsetY = 0;
				this.arrowsRadius = null;
				this.arrowsOffset = 0;
				this.dashedPattern = null;
				this.path = [];
				this.serializedProperties = this.serializedProperties.concat(
					"text,font,fontColor,lineWidth,lineJoin,nodeA,nodeZ,arrowsRadius,dashedPattern".split(",")
				);
			}
		};
		

		this.caculateIndex = function() {
			function e(a, b) {
				function cb(a, b) {
					var c = [];
					if (null == a || null == b) {
						return c;
					}
					if (a && b && a.outLinks && b.inLinks) {
						for (var d = 0; d < a.outLinks.length; d++) {
							var e = a.outLinks[d];
							for (var f = 0; f < b.inLinks.length; f++) {
								var g = b.inLinks[f];
								if(e === g){
									c.push(g);
								}
							}
						}
					}
					return c;
				}		
				function c(a, c) {
					var d = cb(a, c),
						e = cb(c, a),
						f = d.concat(e);
					return f;
				}
				return c(a, b).length;
			}

			var a = e(this.nodeA, this.nodeZ);
			if(a > 0){
				this.nodeIndex = a - 1;
			}
		};
		this.initialize(nodeA, nodeZ, text);

		this.removeHandler = function() {
			function d(a) {
				function cb(a, b) {
					var c = [];
					if (null == a || null == b) {
						return c;
					}
					if (a && b && a.outLinks && b.inLinks){
						for (var d = 0; d < a.outLinks.length; d++){
							var e = a.outLinks[d];
							for (var f = 0; f < b.inLinks.length; f++) {
								var g = b.inLinks[f];
								if(e === g){
									c.push(g);
								}
							}
						}
					}
					return c
				}		
				function c(a, c) {
					var d = cb(a, c),
						e = cb(c, a),
						f = d.concat(e);
					return f
				}

				var b = c(a.nodeA, a.nodeZ);
				b = b.filter(function(b) {
					return a !== b
				})
				return b;
			}

			var a = this;
			if(this.nodeA && this.nodeA.outLinks){
				this.nodeA.outLinks = this.nodeA.outLinks.filter(function(b) {
					return b !== a
				});
			}
			if(this.nodeZ && this.nodeZ.inLinks){
				this.nodeZ.inLinks = this.nodeZ.inLinks.filter(function(b) {
					return b !== a
				});
			}
			var b = d(this);
			b.forEach(function(a, b) {
				a.nodeIndex = b
			})
		};
		this.getStartPosition = function() {
			return {
				x: this.nodeA.getCenterX(),
				y: this.nodeA.getCenterY()
			};
		};
		this.getEndPosition = function() {
			var position;
			if(null != this.arrowsRadius){
				position = JTopo.util.intersectionLineBound(
						JTopo.util.lineF(this.nodeZ.getCenterX(), this.nodeZ.getCenterY(), this.nodeA.getCenterX(), this.nodeA.getCenterY()), 
						this.nodeZ.getBound()
					);
			}
			if(null == position){
				position = {
					x: this.nodeZ.getCenterX(),
					y: this.nodeZ.getCenterY()
				};
			}
			return position;
		};
		this.getPath = function() {
			function e(a, b) {
				function cb(a, b) {
					var c = [];
					if (null == a || null == b) {
						return c;
					}
					if (a && b && a.outLinks && b.inLinks){
						for (var i = 0; i < a.outLinks.length; i++) {
							var outLink = a.outLinks[i];
							for (var j = 0; j < b.inLinks.length; j++) {
								var inLink = b.inLinks[j];
								if(outLink === inLink){
									c.push(inLink);
								}
							}
						}
					}
					return c;
				}		
				function c(a, c) {
					var d = cb(a, c),
						e = cb(c, a),
						f = d.concat(e);
					return f;
				}
				return c(a, b).length;
			}

			var path = [],
				start = this.getStartPosition(),
				end = this.getEndPosition();
			if (this.nodeA === this.nodeZ) {
				return [start, end];
			}
			var d = e(this.nodeA, this.nodeZ);
			if (1 == d) {
				return [start, end];
			}
			var f = Math.atan2(end.y - start.y, end.x - start.x),
				g = {
					x: start.x + this.bundleOffset * Math.cos(f),
					y: start.y + this.bundleOffset * Math.sin(f)
				},
				h = {
					x: end.x + this.bundleOffset * Math.cos(f - Math.PI),
					y: end.y + this.bundleOffset * Math.sin(f - Math.PI)
				},
				i = f - Math.PI / 2,
				j = f - Math.PI / 2,
				k = d * this.bundleGap / 2 - this.bundleGap / 2,
				l = this.bundleGap * this.nodeIndex,
				m = {
					x: g.x + l * Math.cos(i),
					y: g.y + l * Math.sin(i)
				},
				n = {
					x: h.x + l * Math.cos(j),
					y: h.y + l * Math.sin(j)
				};
			m = {
				x: m.x + k * Math.cos(i - Math.PI),
				y: m.y + k * Math.sin(i - Math.PI)
			};
			n = {
				x: n.x + k * Math.cos(j - Math.PI),
				y: n.y + k * Math.sin(j - Math.PI)
			};
			path.push({
				x: start.x,
				y: start.y
			});
			path.push({
				x: m.x,
				y: m.y
			});
			path.push({
				x: n.x,
				y: n.y
			});
			path.push({
				x: end.x,
				y: end.y
			});
			return path;
		};
		this.dashedLineTo = function(graphics, x1, y1, x2, y2, unit) {
			if("undefined" == typeof unit){
				unit = 5;
			}
			var dx = x2 - x1,
				dy = y2 - y1,
				distance = Math.floor(Math.sqrt(dx * dx + dy * dy)),
				count = 0 >= unit ? distance : distance / unit,
				height = dy / distance * unit,
				width = dx / distance * unit;
			graphics.beginPath();
			for (var i = 0; count > i; i++) {
				if(i % 2){
					graphics.lineTo(x1 + i * width, y1 + i * height);
				}else{
					graphics.moveTo(x1 + i * width, y1 + i * height);
				}
			}
			graphics.stroke()
		};
		this.paintPath = function(graphics, b) {
			if (this.nodeA === this.nodeZ) {
				return void this.paintLoop(graphics);
			}
			graphics.beginPath();
			graphics.moveTo(b[0].x, b[0].y);
			for (var c = 1; c < b.length; c++) {
				if(null == this.dashedPattern){
					graphics.lineTo(b[c].x, b[c].y);
				}else{
					this.dashedLineTo(graphics, b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, this.dashedPattern);
				}
			}
			graphics.stroke();
			graphics.closePath();
			if (null != this.arrowsRadius) {
				var d = b[b.length - 2],
					e = b[b.length - 1];
				this.paintArrow(graphics, d, e);
			}
		};
		this.paintLoop = function(graphics) {
			graphics.beginPath(); {
				var b = this.bundleGap * (this.nodeIndex + 1) / 2;
				Math.PI + Math.PI / 2
			}
			graphics.arc(this.nodeA.x, this.nodeA.y, b, Math.PI / 2, 2 * Math.PI);
			graphics.stroke();
			graphics.closePath();
		};
		this.paintArrow = function(graphics, c, d) {
			var e = this.arrowsOffset,
				f = this.arrowsRadius / 2,
				g = c,
				h = d,
				i = Math.atan2(h.y - g.y, h.x - g.x),
				j = JTopo.util.getDistance(g, h) - this.arrowsRadius,
				k = g.x + (j + e) * Math.cos(i),
				l = g.y + (j + e) * Math.sin(i),
				m = h.x + e * Math.cos(i),
				n = h.y + e * Math.sin(i);
			i -= Math.PI / 2;
			var o = {
					x: k + f * Math.cos(i),
					y: l + f * Math.sin(i)
				},
				p = {
					x: k + f * Math.cos(i - Math.PI),
					y: l + f * Math.sin(i - Math.PI)
				};
			graphics.beginPath();
			graphics.fillStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
			graphics.moveTo(o.x, o.y);
			graphics.lineTo(m, n);
			graphics.lineTo(p.x, p.y);
			graphics.stroke();
			graphics.closePath();
		};
		this.paint = function(graphics) {
			if (null != this.nodeA && null != !this.nodeZ) {
				var path = this.getPath(this.nodeIndex);
				this.path = path;
				graphics.strokeStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
				graphics.lineWidth = this.lineWidth;
				this.paintPath(graphics, path);
				if(path && path.length > 0){
					this.paintText(graphics, path);
				}
			}
		};
		var i = -(Math.PI / 2 + Math.PI / 4);
		this.paintText = function(graphics, path) {
			var start = path[0],
				end = path[path.length - 1];
			if(4 == path.length){
				start = path[1];
				end = path[2];
			}
			if (this.text && this.text.length > 0) {
				var x = (end.x + start.x) / 2 + this.textOffsetX,
					y = (end.y + start.y) / 2 + this.textOffsetY;
				graphics.save();
				graphics.beginPath();
				graphics.font = this.font;
				var textWidth = graphics.measureText(this.text).width,
					unitWidth = graphics.measureText("田").width;
				graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				if (this.nodeA === this.nodeZ) {
					var gap = this.bundleGap * (this.nodeIndex + 1) / 2,
						x = this.nodeA.x + gap * Math.cos(i),
						y = this.nodeA.y + gap * Math.sin(i);
					graphics.fillText(this.text, x, y)
				} else {
					graphics.fillText(this.text, x - textWidth / 2, y - unitWidth / 2);
				}
				graphics.stroke();
				graphics.closePath();
				graphics.restore();
			}
		};
		this.paintSelected = function(graphics) {
			graphics.shadowBlur = 0;
			graphics.shadowColor = "rgba(0,0,0,1)", graphics.shadowOffsetX = 1;
			graphics.shadowOffsetY = 0;
		};
		this.isInBound = function(x, y) {
			if (this.nodeA === this.nodeZ) {
				var d = this.bundleGap * (this.nodeIndex + 1) / 2,
					e = JTopo.util.getDistance(this.nodeA, {
						x: x,
						y: y
					}) - d;
				return Math.abs(e) <= 3;
			}
			var result = !1;
			for (var i = 1; i < this.path.length; i++) {
				var start = this.path[i - 1],
					end = this.path[i];
				if (1 == JTopo.util.isPointInLine({
						x: x,
						y: y
					}, start, end)) {
					result = !0;
					break
				}
			}
			return result;
		}
	}

	Link.prototype = new JTopo.InteractiveElement;

	JTopo.Link = Link;

}(JTopo);
!function(JTopo){
	var FoldLink = function (nodeA, nodeZ, text) {
		this.initialize = function() {
			FoldLink.prototype.initialize.apply(this, arguments);
			this.direction = "horizontal";
		};
		this.initialize(nodeA, nodeZ, text);
		this.getStartPosition = function() {
			var position = {
				x: this.nodeA.getCenterX(),
				y: this.nodeA.getCenterY()
			};
			if("horizontal" == this.direction){
				if(this.nodeZ.getCenterX() > position.x){
					position.x += this.nodeA.width / 2;
				}else{
					position.x -= this.nodeA.width / 2;
				}
			}else{
				if(this.nodeZ.getCenterY() > position.y){
					position.y += this.nodeA.height / 2;
				}else{
					position.y -= this.nodeA.height / 2;
				}
			}
			return position;
		};
		this.getEndPosition = function() {
			var position = {
				x: this.nodeZ.getCenterX(),
				y: this.nodeZ.getCenterY()
			};
			if("horizontal" == this.direction){
				if(this.nodeA.getCenterY() < position.y){
					position.y -= this.nodeZ.height / 2;
				}else{
					position.y += this.nodeZ.height / 2;
				}
			}else{
				if(this.nodeA.getCenterX() < position.x){
					position.x = this.nodeZ.x;
				}else{
					position.x = this.nodeZ.x + this.nodeZ.width;
				}
			}
			return position;
		};
		this.getPath = function(a) {
			function getLinksCount(nodeA, nodeZ) {
				function getLinksFromAToB(nodeA, nodeB) {
					var links = [];
					if (null == nodeA || null == nodeB) {
						return links;
					}
					if (nodeA && nodeB && nodeA.outLinks && nodeB.inLinks) {
						for (var i = 0; i < nodeA.outLinks.length; i++) {
							var outLink = nodeA.outLinks[i];
							for (var j = 0; j < nodeB.inLinks.length; j++) {
								var inLink = nodeB.inLinks[j];
								if(outLink === inLink){
									links.push(inLink);
								}
							}
						}
					}
					return links
				}		
				function getLinksBetweenAAndZ(nodeA, nodeZ) {
					var linksFromAToZ = getLinksFromAToB(nodeA, nodeZ);
					var linksFromZToA = getLinksFromAToB(nodeZ, nodeA);
					return linksFromAToZ.concat(linksFromZToA)
				}
				return getLinksBetweenAAndZ(nodeA, nodeZ).length
			}

			var path = [],
				start = this.getStartPosition(),
				end = this.getEndPosition();
			if (this.nodeA === this.nodeZ) {
				return [start, end];
			}
			var x, y, count = getLinksCount(this.nodeA, this.nodeZ);
			var gap = this.bundleGap * a - (count - 1) * this.bundleGap / 2;
			if("horizontal" == this.direction){
				x = end.x + gap;
				y = start.y - gap;
				path.push({
					x: start.x,
					y: y
				});
				path.push({
					x: x,
					y: y
				});
				path.push({
					x: x,
					y: end.y
				});
			}else{
				x = start.x + gap;
				y = end.y - gap;
				path.push({
					x: x,
					y: start.y
				});
				path.push({
					x: x,
					y: y
				});
				path.push({
					x: end.x,
					y: y
				});
			}
			return path;
		};
		this.paintText = function(graphics, path) {
			if (this.text && this.text.length > 0) {
				graphics.save();
				graphics.beginPath();
				graphics.font = this.font;
				var textWidth = graphics.measureText(this.text).width;
				var unitWidth = graphics.measureText("田").width;
				graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				graphics.fillText(this.text, (path[1].x + this.textOffsetX) - textWidth / 2, (path[1].y + this.textOffsetY) - unitWidth / 2);
				graphics.stroke();
				graphics.closePath();
				graphics.restore();
			}
		}
	}

	FoldLink.prototype = new JTopo.Link;

	JTopo.FoldLink = FoldLink;

}(JTopo);	
!function(JTopo){

	var FlexionalLink = function (a, b, c) {
		this.initialize = function() {
			FlexionalLink.prototype.initialize.apply(this, arguments);
			this.direction = "vertical";
			this.offsetGap = 44;
		};
		this.initialize(a, b, c);
		this.getStartPosition = function() {
			var a = {
				x: this.nodeA.getCenterX(),
				y: this.nodeA.getCenterY()
			};
			if("horizontal" == this.direction){
				if(this.nodeZ.getCenterX() < a.x){
					a.x = this.nodeA.x;
				}else{
					a.x = this.nodeA.x + this.nodeA.width;
				}
			}else{
				if(this.nodeZ.getCenterY() < a.y){
					a.y = this.nodeA.y;
				}else{
					a.y = this.nodeA.y + this.nodeA.height;
				}
			}
			return a;
		};
		this.getEndPosition = function() {
			var position = {
				x: this.nodeZ.getCenterX(),
				y: this.nodeZ.getCenterY()
			};
			if("horizontal" == this.direction){
				if(this.nodeA.getCenterX() < position.x){
					position.x = this.nodeZ.x;
				}else{
					position.x = this.nodeZ.x + this.nodeZ.width;
				}
			}else{
				if(this.nodeA.getCenterY() < position.y){
					position.y = this.nodeZ.y;
				}else{
					position.y = this.nodeZ.y + this.nodeZ.height;
				}
			}
			return position;
		};
		this.getPath = function(a) {
			function e(a, b) {
				function cb(a, b) {
					var c = [];
					if (null == a || null == b) return c;
					if (a && b && a.outLinks && b.inLinks)
						for (var d = 0; d < a.outLinks.length; d++)
							for (var e = a.outLinks[d], f = 0; f < b.inLinks.length; f++) {
								var g = b.inLinks[f];
								e === g && c.push(g)
							}
					return c
				}		
				function c(a, c) {
					var d = cb(a, c),
						e = cb(c, a),
						f = d.concat(e);
					return f
				}
				return c(a, b).length
			}

			var b = this.getStartPosition();
			var c = this.getEndPosition();
			if (this.nodeA === this.nodeZ) {
				return [b, c];
			}
			var path = [],
				f = e(this.nodeA, this.nodeZ),
				g = (f - 1) * this.bundleGap,
				h = this.bundleGap * a - g / 2,
				i = this.offsetGap;
			if("horizontal" == this.direction){
				if(this.nodeA.getCenterX() > this.nodeZ.getCenterX()){
					i = -i;
				}
				path.push({
					x: b.x,
					y: b.y + h
				});
				path.push({
					x: b.x + i,
					y: b.y + h
				});
				path.push({
					x: c.x - i,
					y: c.y + h
				});
				path.push({
					x: c.x,
					y: c.y + h
				});
			}else{
				if(this.nodeA.getCenterY() > this.nodeZ.getCenterY()){
					i = -i;
				}
				path.push({
					x: b.x + h,
					y: b.y
				});
				path.push({
					x: b.x + h,
					y: b.y + i
				});
				path.push({
					x: c.x + h,
					y: c.y - i
				});
				path.push({
					x: c.x + h,
					y: c.y
				});
			}
			return path;
		}
	}
	FlexionalLink.prototype = new JTopo.Link;

	JTopo.FlexionalLink = FlexionalLink;

}(JTopo);
!function(JTopo){
	
	var CurveLink = function (a, b, c) {
		this.initialize = function() {
			CurveLink.prototype.initialize.apply(this, arguments)
		};
		this.initialize(a, b, c);
		this.paintPath = function(graphics, points) {
			if (this.nodeA === this.nodeZ) {
				return void this.paintLoop(graphics);
			}
			graphics.beginPath();
			graphics.moveTo(points[0].x, points[0].y);
			for (var c = 1; c < points.length; c++) {
				var p1 = points[c - 1],
					p2 = points[c],
					cx = (p1.x + p2.x) / 2,
					cy = (p1.y + p2.y) / 2;
				cy += (p2.y - p1.y) / 2;
				graphics.strokeStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
				graphics.lineWidth = this.lineWidth;
				graphics.moveTo(p1.x, p1.y);
				graphics.quadraticCurveTo(cx, cy, p2.x, p2.y);
				graphics.stroke();
			}
			graphics.stroke();
			graphics.closePath();
			if (null != this.arrowsRadius) {
				var h = points[points.length - 2],
					i = points[points.length - 1];
				this.paintArrow(graphics, h, i)
			}
		}
	}
	CurveLink.prototype = new JTopo.Link;

	JTopo.CurveLink = CurveLink;

}(JTopo);
!function(JTopo){
	var Container = function (text) {
		this.initialize = function(text) {
			Container.prototype.initialize.apply(this, arguments);
			this.elementType = "container";
			this.zIndex = JTopo.zIndex_Container;
			/**
				容器宽度
			**/
			this.width = 100;
			/**
				容器高度
			**/
			this.height = 100;
			this.childs = [];
			/**
				透明度
			**/
			this.alpha = .5;
			/**
				是否可以拖动
			**/
			this.dragable = !0;
			this.childDragble = !0;
			this.visible = !0;
			this.fillColor = "10,100,80";
			this.borderWidth = 0;
			this.borderColor = "255,255,255";
			this.borderRadius = null;
			this.font = "12px Consolas";
			this.fontColor = "255,255,255";
			/**
				名称（文本）, 不会显示
			**/
			this.text = text;
			this.textPosition = "Bottom_Center";
			this.textOffsetX = 0;
			this.textOffsetY = 0;
			this.layout = new JTopo.Layout.AutoBoundLayout;
		};
		this.initialize(text);
		this.add = function(child) {
			this.childs.push(child);
			child.dragable = this.childDragble;
		};
		this.remove = function(child) {
			for (var i = 0; i < this.childs.length; i++)
				if (this.childs[i] === child) {
					child.parentContainer = null;
					//this.childs = this.childs.del(i);
					this.childs = delArrayElByIndexInJtopo(this.childs,i);
					child.lastParentContainer = this;
					break;
				}
		};
		this.removeAll = function() {
			this.childs = []
		};
		this.setLocation = function(x, y) {
			var dx = x - this.x,
				dy = y - this.y;
			this.x = x;
			this.y = y;
			for (var i = 0; i < this.childs.length; i++) {
				var child = this.childs[i];
				child.setLocation(child.x + dx, child.y + dy);
			}
		};
		this.doLayout = function(layout) {
			if(layout){
				layout(this, this.childs);
			}
		};
		this.paint = function(graphics) {
			if(this.visible){
				if(this.layout){
					this.layout(this, this.childs);
				}
				graphics.beginPath();
				graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
				if(null == this.borderRadius || 0 == this.borderRadius){
					graphics.rect(
						this.x, 
						this.y, 
						this.width, 
						this.height
					);
				}else{
					this.paintRoundRect(
						graphics,
						this.x, 
						this.y, 
						this.width, 
						this.height, 
						this.borderRadius
					);
				}
				graphics.fill();
				graphics.closePath();
				this.paintText(graphics);
				this.paintBorder(graphics);
			}
		};
		this.paintBorder = function(graphics) {
			if (0 != this.borderWidth) {
				graphics.beginPath();
				graphics.lineWidth = this.borderWidth;
				graphics.strokeStyle = "rgba(" + this.borderColor + "," + this.alpha + ")";
				if(null == this.borderRadius || 0 == this.borderRadius){
					graphics.rect(
						this.x - this.borderWidth / 2, 
						this.y - this.borderWidth / 2, 
						this.width + this.borderWidth, 
						this.height + this.borderWidth
					);
				}else{
					this.paintRoundRect(
						graphics,
						this.x - this.borderWidth / 2, 
						this.y - this.borderWidth / 2, 
						this.width + this.borderWidth, 
						this.height + this.borderWidth, 
						this.borderRadius
					);
				}
				graphics.stroke();
				graphics.closePath();
			}
		};
		this.paintText = function(graphics) {
			if (null != this.text && "" != this.text) {
				graphics.beginPath();
				graphics.font = this.font;
				var textWidth = graphics.measureText(this.text).width;
				var unitWidth = graphics.measureText("田").width;
				graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
				var textPosition = this.getTextPostion(this.textPosition, textWidth, unitWidth);
				graphics.fillText(this.text, textPosition.x, textPosition.y);
				graphics.closePath();
			}
		};
		this.getTextPostion = function(position, textWidth, unitWidth) {
			var result = null;
			if(null == position || "Bottom_Center" == position){
				result = {
					x: this.x + this.width / 2 - textWidth / 2,
					y: this.y + this.height + unitWidth
				};
			}else if("Top_Center" == position){
				result = {
					x: this.x + this.width / 2 - textWidth / 2,
					y: this.y - unitWidth / 2
				};
			}else if("Top_Right" == position){
				result = {
					x: this.x + this.width - textWidth,
					y: this.y - unitWidth / 2
				};
			}else if("Top_Left" == position){
				result = {
					x: this.x,
					y: this.y - unitWidth / 2
				};
			}else if("Bottom_Right" == position){
				result = {
					x: this.x + this.width - textWidth,
					y: this.y + this.height + unitWidth
				};
			}else if("Bottom_Left" == position){
				result = {
					x: this.x,
					y: this.y + this.height + unitWidth
				};
			}else if("Middle_Center" == position){
				result = {
					x: this.x + this.width / 2 - textWidth / 2,
					y: this.y + this.height / 2 + unitWidth / 2
				};
			}else if("Middle_Right" == position){
				result = {
					x: this.x + this.width - textWidth,
					y: this.y + this.height / 2 + unitWidth / 2
				};
			}else if("Middle_Left" == position){
				result = {
					x: this.x,
					y: this.y + this.height / 2 + unitWidth / 2
				};
			}
			if(null != this.textOffsetX){
				result.x += this.textOffsetX;
			}
			if(null != this.textOffsetY){
				result.y += this.textOffsetY;
			}
			return result;
		};
		this.paintMouseover = function() {};
		this.paintSelected = function(graphics) {
			graphics.shadowBlur = 10;
			graphics.shadowColor = "rgba(0,0,0,1)";
			graphics.shadowOffsetX = 0;
			graphics.shadowOffsetY = 0;
		}
	}
	Container.prototype = new JTopo.InteractiveElement;

	JTopo.Container = Container;

}(JTopo);
!function(JTopo){
	JTopo.Layout = {
		layoutNode: function (scene, node, recursive) {
			var childs = JTopo.Layout.getNodeChilds(scene.childs, node);
			if (0 == childs.length) {
				return null;
			}
			JTopo.Layout.adjustPosition(node, childs);
			if (1 == recursive) {
				for (var i = 0; i < childs.length; i++) {
					JTopo.Layout.layoutNode(scene, childs[i], recursive);
				}
			}
			return null
		},
		getNodeChilds: function (childs, node) {
			var result = [];
			for (var i = 0; i < childs.length; i++) {
				if(childs[i] instanceof JTopo.Link && childs[i].nodeA === node){
					result.push(childs[i].nodeZ);
				}
			}
			return result
		},
		adjustPosition: function (node, childs) {

			function adjust_grid(x, y, rows, cols, horizontal, vertical) {
				var positions = [];
				for (var i = 0; rows > i; i++) {
					for (var j = 0; cols > j; j++) {
						positions.push({
							x: x + j * horizontal,
							y: y + i * vertical
						});
					}
				}
				return positions;
			}

			function adjust_circle(x, y, length, radius, beginAngle, endAngle) {
				var begin = beginAngle ? beginAngle : 0,
					end = endAngle ? endAngle : 2 * Math.PI,
					unit = (end - begin) / length,
					positions = [];
				begin += unit / 2;
				for (var i = begin; end >= i; i += unit) {
					positions.push({
						x: x + Math.cos(i) * radius,
						y: y + Math.sin(i) * radius
					})
				}
				return positions
			}

			function adjust_tree(x, y, length, width, height, dir) {
				var direction = dir || "bottom",
					positions = [];
				if ("bottom" == direction){
					for (var i = x - length / 2 * width + width / 2, j = 0; length >= j; j++) {
						positions.push({
							x: i + j * width,
							y: y + height
						});
					}
				}else if ("top" == direction){
					for (var i = x - length / 2 * width + width / 2, j = 0; length >= j; j++) {
						positions.push({
							x: i + j * width,
							y: y - height
						});
					}
				}else if ("right" == direction){
					for (var i = y - length / 2 * width + width / 2, j = 0; length >= j; j++) {
						positions.push({
							x: x + height,
							y: i + j * width
						});
					}
				}else if ("left" == direction){
					for (var i = y - length / 2 * width + width / 2, j = 0; length >= j; j++) {
						positions.push({
							x: x - height,
							y: i + j * width
						});
					}
				}
				return positions;
			}

			if (node.layout) {
				var layout = node.layout,
					type = layout.type,
					positions = null;
				if ("circle" == type) {
					var radius = layout.radius || Math.max(node.width, node.height);
					positions = adjust_circle(node.getCenterX(), node.getCenterY(), childs.length, radius, node.layout.beginAngle, node.layout.endAngle);
				} else if ("tree" == type) {
					var width = layout.width || 50,
						height = layout.height || 50,
						direction = layout.direction;
					positions = adjust_tree(node.getCenterX(), node.getCenterY(), childs.length, width, height, direction);
				} else {
					if ("grid" != type) {
						return;
					}
					positions = adjust_grid(node.x, node.y, layout.rows, layout.cols, layout.horizontal || 0, layout.vertical || 0);
				}
				for (var i = 0; i < childs.length; i++) {
					childs[i].setCenterLocation(positions[i].x, positions[i].y);
				}
			}
		},
		springLayout: function (b, c) {
			function d(a, b) {
				var c = a.x - b.x,
					d = a.y - b.y;
				i += c * f;
				j += d * f;
				i *= g;
				j *= g;
				j += h;
				b.x += i;
				b.y += j;
			}

			function e() {
				if (!(++k > 150)) {
					for (var a = 0; a < l.length; a++) {
						if(l[a] != b){
							d(b, l[a], l);
						}
					}
					setTimeout(e, 1e3 / 24);
				}
			}
			var f = .01,
				g = .95,
				h = -5,
				i = 0,
				j = 0,
				k = 0,
				l = c.getElementsByClass(JTopo.Node);
			e();
		},
		
		getRootNodes: function (b) {
			var c = [],
				d = b.filter(function(b) {
					if(b instanceof JTopo.Link){
						return !0;
					}else{
						c.push(b);
						return !1;
					}
				});
			b = c.filter(function(a) {
				for (var b = 0; b < d.length; b++){
					if (d[b].nodeZ === a) {
						return !1;
					}
				}
				return !0
			});
			b = b.filter(function(a) {
				for (var b = 0; b < d.length; b++){
					if (d[b].nodeA === a) {
						return !0;
					}
				}
				return !1
			})
			return b;
		},
		circleLayoutNodes: function (c, d) {

			function getNodesCenter(a) {
				var b = 0,
					c = 0;
				a.forEach(function(a) {
					b += a.getCenterX();
					c += a.getCenterY()
				});
				var d = {
					x: b / a.length,
					y: c / a.length
				};
				return d
			};
			
			if(null == d){
				d = {};
			}

			
			var e = d.cx,
				f = d.cy,
				g = d.minRadius,
				h = d.nodeDiameter,
				i = d.hScale || 1,
				j = d.vScale || 1;
			d.beginAngle || 0, d.endAngle || 2 * Math.PI

			if (null == e || null == f) {
				var k = getNodesCenter(c);
				e = k.x;
				f = k.y;
			}
			var l = 0,
				m = [],
				n = [];
			c.forEach(function(a) {
				if(null == d.nodeDiameter){
					if(a.diameter){
						h = a.diameter;
					}
					if(a.radius){
						h = 2 * a.radius;
					}else{
						h = Math.sqrt(2 * a.width * a.height);
					}
					n.push(h);
				}else{
					n.push(h);
				}
				l += h;
			});
			c.forEach(function(a, b) {
				var c = n[b] / l;
				m.push(Math.PI * c);
			});
			var o = (c.length, m[0] + m[1]),
				p = n[0] / 2 + n[1] / 2,
				q = p / 2 / Math.sin(o / 2);
			if(null != g && g > q){
				q = g;
			}
			var r = q * i,
				s = q * j,
				t = d.animate;
			if (t) {
				var u = t.time || 1e3,
					v = 0;
				c.forEach(function(b, c) {
					if(0 == c){
						v += m[c];
					}else{
						v += m[c - 1] + m[c];
					}
					var d = e + Math.cos(v) * r,
						g = f + Math.sin(v) * s;
					JTopo.Animate.stepByStep(b, {
						x: d - b.width / 2,
						y: g - b.height / 2
					}, u).start()
				})
			} else {
				var v = 0;
				c.forEach(function(a, b) {
					if(0 == b){
						v += m[b];
					}else{
						v += m[b - 1] + m[b];
					}
					var c = e + Math.cos(v) * r,
						d = f + Math.sin(v) * s;
					a.setCenterX(c);
					a.setCenterY(d);
				})
			}
			return {
				cx: e,
				cy: f,
				radius: r,
				radiusA: r,
				radiusB: s
			}
		}
	}

	JTopo.Layout.GridLayout = function (a, b) {
		return function(c) {
			var d = c.childs;
			if (d.length > 0){
				var e = c.getBound();
				var f = d[0];
				var g = (e.width - f.width) / b;
				var h = (e.height - f.height) / a;
				var i = (d.length, 0);
				for (var j = 0; a > j; j++){
					for (var k = 0; b > k; k++) {
						var l = d[i++],
							m = e.left + g / 2 + k * g,
							n = e.top + h / 2 + j * h;
						if (l.setLocation(m, n), i >= d.length) {
							return
						}
					}
				}
			}
		}
	}

	JTopo.Layout.FlowLayout = function (a, b) {
		if(null == a){
			a = 0;
		}
		if(null == b){
			b = 0;
		}
		return function(c) {
			var d = c.childs;
			if (!(d.length <= 0)){
				var e = c.getBound();
				var f = e.left;
				var g = e.top;
				for (var h = 0; h < d.length; h++) {
					var i = d[h];
					if(f + i.width >= e.right){
						f = e.left;
						g += b + i.height;
					}
					i.setLocation(f, g);
					f += a + i.width;
				}
			}
		}
	}

	JTopo.Layout.AutoBoundLayout = function () {
		return function(a, b) {
			if (b.length > 0) {
				var c = 1e7;
				var d = -1e7;
				var e = 1e7;
				var f = -1e7;
				var g = d - c;
				var h = f - e;
				for (var i = 0; i < b.length; i++) {
					var j = b[i];
					j.x <= c && (c = j.x);
					j.x >= d && (d = j.x);
					j.y <= e && (e = j.y);
					j.y >= f && (f = j.y);
					g = d - c + j.width;
					h = f - e + j.height
				}
				a.x = c, a.y = e, a.width = g, a.height = h
			}
		}
	}

	JTopo.Layout.CircleLayout = function (b) {
		return function(c) {
			function d(a, c, e) {
				var f = JTopo.Layout.getNodeChilds(a, c);
				if (0 != f.length) {
					if(null == e){
						e = b;
					}
					var g = 2 * Math.PI / f.length;
					f.forEach(function(b, f) {
						var h = c.x + e * Math.cos(g * f),
							i = c.y + e * Math.sin(g * f);
						b.setLocation(h, i);
						var j = e / 2;
						d(a, b, j);
					})
				}
			}
			var e = JTopo.Layout.getRootNodes(c.childs);
			if (e.length > 0) {
				d(c.childs, e[0]);
				var f = JTopo.util.getElementsBound(c.childs),
					g = c.getCenterLocation(),
					h = g.x - (f.left + f.right) / 2,
					i = g.y - (f.top + f.bottom) / 2;
				c.childs.forEach(function(b) {
					if(b instanceof JTopo.Node){
						b.x += h;
						b.y += i;
					}
				})
			}
		}
	}

	JTopo.Layout.TreeLayout = function (b, c, d) {
		function h(a) {
			var b = 0,
				c = 0;
			a.forEach(function(a) {
				b += a.width;
				c += a.height;
			});
			return {
				width: b / a.length,
				height: c / a.length
			}
		}

		function i(a, b, c, d) {
			b.x += c;
			b.y += d;
			var e = JTopo.Layout.getNodeChilds(a, b);
			for (var f = 0; f < e.length; f++) {
				i(a, e[f], c, d);
			}
		}

		function j(a, b) {
			function c(b, e) {
				var f = JTopo.Layout.getNodeChilds(a, b);
				if(null == d[e]){
					d[e] = {};
					d[e].nodes = [];
					d[e].childs = [];
				}
				d[e].nodes.push(b);
				d[e].childs.push(f);
				for (var g = 0; g < f.length; g++) {
					c(f[g], e + 1);
					f[g].parent = b;
				}
			}
			var d = [];
			c(b, 0);
			return d;
		}

		return function(e) {
			function getTreeDeep(a, b) {
				function c(a, b, e) {
					var f = JTopo.Layout.getNodeChilds(a, b);
					if(e > d){
						d = e;
					}
					for (var g = 0; g < f.length; g++) {
						c(a, f[g], e + 1)
					}
				}
				var d = 0;
				c(a, b, 0);
				return d;
			}

			function f(f, g) {
				var h = getTreeDeep(f, g);
				var k = j(f, g);
				var l = k["" + h].nodes;
				for (var m = 0; m < l.length; m++) {
					var n = l[m],
						o = (m + 1) * (c + 10),
						p = h * d;
					if("down" == b){
						if("up" == b){
							p = -p;
						}else if("left" == b){
							o = -h * d;
							p = (m + 1) * (c + 10);
						}else if("right" == b){
							o = h * d;
							p = (m + 1) * (c + 10);
						}
					}
					n.setLocation(o, p);
				}
				for (var q = h - 1; q >= 0; q--) {
					for (var r = k["" + q].nodes, s = k["" + q].childs, m = 0; m < r.length; m++) {
						var t = r[m],
							u = s[m];
						if("down" == b){
							t.y = q * d;
						}else if("up" == b){
							t.y = -q * d;
						}else if("left" == b){
							t.x = -q * d;
						}else if("right" == b){
							t.x = q * d;
						}

						if(u.length > 0){
							if("down" == b || "up" == b){
								t.x = (u[0].x + u[u.length - 1].x) / 2 
							}else if("left" == b || "right" == b){
								t.y = (u[0].y + u[u.length - 1].y) / 2;
							}
						}else if(m > 0){
							if("down" == b || "up" == b){
								t.x = r[m - 1].x + r[m - 1].width + c;
							}else if("left" == b || "right" == b){
								t.y = r[m - 1].y + r[m - 1].height + c;
							}
						}
						if (m > 0){
							if ("down" == b || "up" == b) {
								if (t.x < r[m - 1].x + r[m - 1].width){
									var v = r[m - 1].x + r[m - 1].width + c;
									var w = Math.abs(v - t.x);
									for (var x = m; x < r.length; x++) {
										i(e.childs, r[x], w, 0)
									}
								}
							} else {
								if (("left" == b || "right" == b) && t.y < r[m - 1].y + r[m - 1].height){
									var y = r[m - 1].y + r[m - 1].height + c;
									var z = Math.abs(y - t.y);
									for (var x = m; x < r.length; x++) {
										i(e.childs, r[x], 0, z)
									}
								}
							}
						}
					}
				}
			}
			var g = null;
			if(null == c){
				g = h(e.childs);
				c = g.width;
				if("left" == b || "right" == b){
					c = g.width + 10;
				}
			}
			if(null == d){
				if(null == g){
					g = h(e.childs);
				}
				d = 2 * g.height;
			}
			if(null == b){
				b = "down";
			}
			var k = JTopo.Layout.getRootNodes(e.childs);
			if (k.length > 0) {
				f(e.childs, k[0]);
				var l = JTopo.util.getElementsBound(e.childs),
					m = e.getCenterLocation(),
					n = m.x - (l.left + l.right) / 2,
					o = m.y - (l.top + l.bottom) / 2;
				e.childs.forEach(function(b) {
					if(b instanceof JTopo.Node){
						b.x += n;
						b.y += o;
					}
				})
			}
		}
	}

}(JTopo);
!function(JTopo){
	JTopo.Gravity = function (b, interval) {
		var timer, messageBus = null;
		return {
			stop: function() {
				if(timer){
					window.clearInterval(timer);
					if(messageBus){
						messageBus.publish("stop");
					}
					return this;
				}else{
					return this;
				}
			},
			start: function() {
				var self = this;
				timer = setInterval(function() {
					b.call(self);
				}, interval);
				return this;
			},
			onStop: function(event) {
				if(null == messageBus){
					messageBus = new JTopo.util.MessageBus;
				}
				messageBus.subscribe("stop", event);
				return this;
			}
		}
	}

	JTopo.Animate = {};
	JTopo.Animate.isStop = !1;
	/**
		通用动画效果功能，可以把一个元素对象的某些属性在指定的时间内变化到指定值
	**/
	JTopo.Animate.stepByStep = 	function (a, c, d, e, f) {
		var g = 1e3 / 24,
			h = {};
		for (var i in c) {
			var j = c[i],
				k = j - a[i];
			h[i] = {
				oldValue: a[i],
				targetValue: j,
				step: k / d * g,
				isDone: function(b) {
					return  this.step > 0 && a[b] >= this.targetValue 
						 || this.step < 0 && a[b] <= this.targetValue;
				}
			}
		}
		return new JTopo.Gravity(function() {
			var b = !0;
			for (var d in c) {
				if(!h[d].isDone(d)){
					a[d] += h[d].step;
					b = !1;
				}
			}
			if (b) {
				if (!e) {
					return this.stop();
				}
				for (var d in c)
					if (f) {
						var g = h[d].targetValue;
						h[d].targetValue = h[d].oldValue;
						h[d].oldValue = g;
						h[d].step = -h[d].step;
					} else {
						a[d] = h[d].oldValue
					}
			}
			return this;
		}, g);
	}

	JTopo.Animate.rotate = function (a, b) {
		function c() {
			return e = setInterval(function() {
				return JTopo.Animate.isStop ? void f.stop() : (a.rotate += g || .2, void(a.rotate > 2 * Math.PI && (a.rotate = 0)))
			}, 100), f
		}

		function d() {
			window.clearInterval(e);
			if(f.onStop){
				f.onStop(a);
			}
			return f;
		}
		var e = (b.context, null),
			f = {},
			g = b.v;
		f.run = c;
		f.stop = d;
		f.onStop = function(a) {
			f.onStop = a;
			return f;
		}
		return f;
	}

	JTopo.Animate.scale = function (a, b) {
		function c() {
			j = setInterval(function() {
				a.scaleX += f;
				a.scaleY += f;
				if(a.scaleX >= e){
					d();
				}
			}, 100);
			return i;
		}

		function d() {
			if(i.onStop){
				i.onStop(a);
			}
			a.scaleX = g;
			a.scaleY = h;
			window.clearInterval(j)
		}
		var e = (b.position, b.context, b.scale || 1),
			f = .06,
			g = a.scaleX,
			h = a.scaleY,
			i = {},
			j = null;
		i.onStop = function(a) {
			return i.onStop = a, i
		};
		i.run = c;
		i.stop = d;
		return i;
	}

	JTopo.Animate.move = function (a, b) {
		function c() {
			h = setInterval(function() {
				if (JTopo.Animate.isStop) {
					return void g.stop();
				}
				var b = e.x - a.x,
					c = e.y - a.y,
					h = b * f,
					i = c * f;
				a.x += h;
				a.y += i;
				if(.01 > h && .1 > i){
					d();
				}
			}, 100);
			return g;
		}

		function d() {
			window.clearInterval(h)
		}
		var e = b.position,
			f = (b.context, b.easing || .2),
			g = {},
			h = null;
		g.onStop = function(a) {
			g.onStop = a;
			return g;
		};
		g.run = c;
		g.stop = d;
		return g;
	};

	JTopo.Animate.cycle = function (b, c) {
		function d() {
			n = setInterval(function() {
				if (JTopo.Animate.isStop) {
					return void m.stop();
				}
				var a = f.y + h + Math.sin(k) * j;
				b.setLocation(b.x, a);
				k += l;
			}, 100);
			return m;
		}

		function e() {
			window.clearInterval(n)
		}
		var f = c.p1,
			g = c.p2,
			h = (c.context, f.x + (g.x - f.x) / 2),
			i = f.y + (g.y - f.y) / 2,
			j = JTopo.util.getDistance(f, g) / 2,
			k = Math.atan2(i, h),
			l = c.speed || .2,
			m = {},
			n = null;
		m.run = d;
		m.stop = e;
		return m;
	};
	JTopo.Animate.repeatThrow = function (a, b) {
		function c(a) {
			a.visible = !0;
			a.rotate = Math.random();
			var b = g.stage.canvas.width / 2;
			a.x = b + Math.random() * (b - 100) - Math.random() * (b - 100);
			a.y = g.stage.canvas.height;
			a.vx = 5 * Math.random() - 5 * Math.random();
			a.vy = -25;
		}

		function d() {
			c(a);
			h = setInterval(function() {
				return JTopo.Animate.isStop ? void i.stop() : (a.vy += f, a.x += a.vx, a.y += a.vy, void((a.x < 0 || a.x > g.stage.canvas.width || a.y > g.stage.canvas.height) && (i.onStop && i.onStop(a), c(a))))
			}, 50);
			return i;
		}

		function e() {
			window.clearInterval(h);
		}
		var f = .8,
			g = b.context,
			h = null,
			i = {};
		i.onStop = function(a) {
			i.onStop = a;
			return i;
		};
		i.run = d;
		i.stop = e;
		return i;
	}

	JTopo.Animate.dividedTwoPiece = function (b, c) {
		function d(c, d, e, f, g) {
			var node = new JTopo.Node;
			node.setImage(b.image);
			node.setSize(b.width, b.height);
			node.setLocation(c, d);
			node.showSelected = !1;
			node.dragable = !1;
			node.paint = function(a) {
				a.save();
				a.arc(0, 0, e, f, g);
				a.clip();
				a.beginPath();
				if(null != this.image){
					a.drawImage(this.image, -this.width / 2, -this.height / 2);
				}else{
					a.fillStyle = "rgba(" + this.style.fillStyle + "," + this.alpha + ")";
					a.rect(-this.width / 2, -this.height / 2, this.width / 2, this.height / 2);
					a.fill();
				}
				a.closePath();
				a.restore();
			};
			return node;
		}

		function e(c, e) {
			var f = c,
				g = c + Math.PI,
				h = d(b.x, b.y, b.width, f, g),
				j = d(b.x - 2 + 4 * Math.random(), b.y, b.width, f + Math.PI, f);
			b.visible = !1;
			e.add(h);
			e.add(j);
			JTopo.Animate.gravity(h, {
				context: e,
				dx: .3
			}).run().onStop(function() {
				e.remove(h);
				e.remove(j);
				i.stop();
			});
			JTopo.Animate.gravity(j, {
				context: e,
				dx: -.2
			}).run();
		}

		function f() {
			e(c.angle, h);
			return i;
		}

		function g() {
			if(i.onStop){
				i.onStop(b);
			}
			return i;
		}
		var h = c.context,
			i = (b.style, {});
		i.onStop = function(a) {
			i.onStop = a;
			return i;
		};
		i.run = f;
		i.stop = g;
		return i;
	}

	/**
		给指定元素增加重力效果
	**/
	JTopo.Animate.gravity = function (node, b) {
		var h = {};
		h.timer = null;
		h.run = function() {
			var d = b.dx || 0,
				i = b.dy || 2;
			h.timer = setInterval(function() {
				if(JTopo.Animate.isStop){
					return void h.stop();
				}else{
					i += (b.gravity || .1);
					if(node.y + node.height < b.context.stage.canvas.height){
						return void node.setLocation(node.x + d, node.y + i);
					}else{
						i = 0;
						return void h.stop();
					}
				}
			}, 20);
			return h;
		};
		h.stop = function() {
			window.clearInterval(h.timer);
			if(h.onStop){
				h.onStop(node);
			}
			return h;
		};
		h.onStop = function(callback) {
			h.onStop = callback;
			return h;
		};
		return h;
	}

	JTopo.Animate.startAll = function () {
		JTopo.Animate.isStop = !1
	}

	JTopo.Animate.stopAll = function () {
		JTopo.Animate.isStop = !0
	};
	
}(JTopo);
!function(JTopo){
	JTopo.Effect = {};
	JTopo.Effect.spring = function (a) {
		if(null == a){
			a = {};
		}
		a.spring = a.spring || .1;
		a.friction = a.friction || .8;
		a.grivity = a.grivity || 0;
		a.wind = a.wind || 0;
		a.minLength = a.minLength || 0;

		return {
			items: [],
			timer: null,
			isPause: !1,
			addNode: function(node, target) {
				this.items.push({
					node: node,
					target: target,
					vx: 0,
					vy: 0
				});
				return this;
			},
			play: function(interval) {
				this.stop();
				if(null == interval){
					interval = 1e3 / 24;
				}
				var self = this;
				this.timer = setInterval(function() {
					self.nextFrame()
				}, interval)
			},
			stop: function() {
				if(null != this.timer){
					window.clearInterval(this.timer);
				}
			},
			nextFrame: function() {
				for (var i = 0; i < this.items.length; i++) {
					var item = this.items[i],
						node = item.node,
						target = item.target,
						vx = item.vx,
						vy = item.vy,
						dx = target.x - node.x,
						dy = target.y - node.y,
						angle = Math.atan2(dy, dx);
					if (0 != a.minLength) {
						vx += (target.x - Math.cos(angle) * a.minLength - node.x) * a.spring;
						vy += (target.y - Math.sin(angle) * a.minLength - node.y) * a.spring
					} else {
						vx += dx * a.spring;
						vy += dy * a.spring;
					}
					vx *= a.friction;
					vy *= a.friction;
					vy += a.grivity;
					node.x += vx;
					node.y += vy;
					item.vx = vx;
					item.vy = vy;
				}
			}
		}
	}

	JTopo.Effect.gravity = function (a, c) {
		c = c || {};
		c.gravity = c.gravity || .1,
		c.dx = c.dx || 0,
		c.dy = c.dy || 5;

		return new JTopo.Gravity(function() {
			if(c.stop && c.stop()){
				c.dy = .5;
				this.stop();
			}else{
				c.dy += c.gravity;
				a.setLocation(a.x + c.dx, a.y + c.dy);
			}
		}, (c.interval|| 30));
	}

}(JTopo);
Logo = {};
Logo.shift = function (a, b, c) {
	return function(d) {
		for (var e = 0; b > e; e++) {
			a();
			if(c){
				d.turn(c);
			}
			d.move(3);
		}
	}
}
Logo.spin = function (a, b) {
	var c = 2 * Math.PI;
	return function(d) {
		for (var e = 0; b > e; e++) {
			a();
			d.turn(c / b);
		}
	}
}
Logo.polygon = function (a) {
	var b = 2 * Math.PI;
	return function(c) {
		for (var d = 0; a > d; d++) {
			c.forward(1);
			c.turn(b / a);
		}
	}
}
Logo.spiral = function (a, b, c, d) {
	return function(e) {
		for (var f = 0; b > f; f++) {
			a();
			e.forward(1);
			e.turn(c);
			e.resize(d);
		}
	}
}
Logo.star = function (a) {
	var b = 4 * Math.PI;
	return function(c) {
		for (var d = 0; a > d; d++) {
			c.forward(1);
			c.turn(b / a);
		}
	}
}
Logo.scale = function f(a, b, c) {
	return function(d) {
		for (var e = 0; b > e; e++) {
			a();
			d.resize(c);
		}
	}
}
Logo.b = function (a, b) {
	this.x = a;
	this.y = b
}
Logo.Tortoise = function(a) {
	this.p = new Logo.b(0, 0);
	this.w = new Logo.b(1, 0);
	this.paint = a;
}
Logo.Tortoise.prototype.forward = function(a) {
	var b = this.p,
		c = this.w;
	b.x = b.x + a * c.x;
	b.y = b.y + a * c.y;
	if(this.paint){
		this.paint(b.x, b.y);
	}
	return this;
};
Logo.Tortoise.prototype.move = function(a) {
	var b = this.p,
		c = this.w;
	b.x = b.x + a * c.x;
	b.y = b.y + a * c.y;
	return this;
};
Logo.Tortoise.prototype.moveTo = function(a, b) {
	this.p.x = a;
	this.p.y = b;
	return this;
};
Logo.Tortoise.prototype.turn = function(a) {
	var b = (this.p, this.w),
		c = Math.cos(a) * b.x - Math.sin(a) * b.y,
		d = Math.sin(a) * b.x + Math.cos(a) * b.y;
	b.x = c;
	b.y = d;
	return this;
};
Logo.Tortoise.prototype.resize = function(a) {
	var b = this.w;
	b.x = b.x * a;
	b.y = b.y * a;
	return this;
};
Logo.Tortoise.prototype.save = function() {
	if(null == this._stack){
		this._stack = [];
	}
	this._stack.push([this.p, this.w]);
	return this;
};
Logo.Tortoise.prototype.restore = function() {
	if (null != this._stack && this._stack.length > 0) {
		var a = this._stack.pop();
		this.p = a[0];
		this.w = a[1]
	}
	return this;
};