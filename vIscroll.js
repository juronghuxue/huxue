/**************************************************************
 @author liaohl
 @date: 2013-10-08
 @description 上下滑动
 @param config 配置参数
	1、isPagingType: true表示分页类型，false表示微博累加类型
	
	2、isPagingType为true时才考虑配置：
	headRowHeight: 头部的高度，只有传值并不等于0的时候才表示有头部（有时需要一行头部标题字段的说明，这个时候需要头部，一般头部可以从dom结构中提出来，但是和固定列嵌套一起用并有头部的情况无法将头部提出）
 	perRowHeight: 每条数据的高度
	rowNum:  显示的每页数据条数，这个可以根据屏幕高度和perRowHeight算出
	
	3、isPagingType为false时才考虑配置：
	visibleHeight: 显示内容区域的高度，当isPaingType为false时传
	hasPullDown: true/false 是否显示下拉提示，默认为true，显示组件顶部的下拉更新提示
	
	4、以上2种的共有配置：
	container: container元素的父元素
	wrapper: wrapper元素的父元素
	downHandle: 下拉完毕后执行的方法
	upHandle: 上拉完毕后执行的方法
   
\/***********************使用案例***********************\/
1、定义
	var VIscroll = require("vIscroll");
	var myVIscroll = null;
2、初始化
	if(!myVIscroll){
		var config = {
			"isPagingType": true,
			"headRowHeight": 30,
			"perRowHeight": 30,
			"rowNum": 10,
			"container": $("#v_container_funds_jj"),
			"wrapper": $("#v_wrapper_funds_jj"),
			"downHandle": function() {
				//下拉动作完成之后的执行
			},
			"upHandle": function() {
				//上拉动作完成之后的执行
			}
		};
		myVIscroll = new VIscroll(config); //初始化
	}

3、销毁（看情况而定是否需要销毁）
	myVIscroll.destroy();
	myVIscroll = null;
	
另外：可以根据数据的多少显示隐藏上拉的提示文字部分
$y("v_wrapper_funds_jj", "visc_pullUp_new").show();
$y("v_wrapper_funds_jj", "visc_pullUp_new").hide();
******************************************************************/
define(function (require, exports, module) {

	function VIscroll(config) {
		var This = this; //mark 防止数据少的时候粗线下拉一次立即执行上拉bug
		var wrapperObj = null;
		
		/**
		 * 把wrapperObj暴露提供出来，可以调用iScroll原生的方法，比如：wrapperObj.scrollTo(0, -40, 50, true)
		 */
		this.getWrapperObj = function() {
			return wrapperObj;
		};
		
		/**
		 * 设置相关css样式
		 */
		this.setCssHW = function() {
			var containerHeight = 0;
			if(config.isPagingType) {
				containerHeight = config.rowNum*config.perRowHeight + (config.isHasHead ? config.headRowHeight : 0);
			} else {
				containerHeight = config.visibleHeight;
			}
			config.container.css({"position": "relative","height":containerHeight+"px"});
		};

		/**
		 * 重新加载数据之后，需要刷新iscroll组件，调用以还原上下拉动的显示组件
		 * @param len 如果是分页类型，最后刷新组件时，若数据不够分页数据个数需传入当前页数据个数
		 */
		this.refresh = function(len) {
			if(config.isPagingType && len) {
				var containerHeight = (len?len:config.rowNum)*config.perRowHeight + (config.isHasHead ? config.headRowHeight : 0);
				config.container.css({"position": "relative","height":containerHeight+"px"});
			}

			//分页数据不足时的底部隐藏处理
			if(config.isPagingType == true){
				config.wrapper.find('.visc_pullUp_new').hide();
			}
			
			config.wrapper.children("div").eq(1).hide(); //滚动条处理
			wrapperObj.refresh();
			config.wrapper.children("div").eq(1).hide(); //滚动条处理
		};
		
		/**
		 * 滑动组件初始化
		 * 在初始化滑动组件前，滑动组件的DOM结构已完备，即如果dom节点是动态添加的，则在添加完成之后再初始化
		 */
		this.init = function() {
			//防止页面跳转出现bug
			if(!config.wrapper[0]) {
				console.log("请检查wrapper元素是否正确！");
				return false;
			}
			
			//先设置相关css样式
			This.setCssHW();
			
			//格式化更新提示的时间
//			config.wrapper.find('.visc_pullDown_new .visc_pullDownTime').html(new Date().format("HH:mm:ss")); 
//			config.wrapper.find('.visc_pullUp_new .visc_pullUpTime').html(new Date().format("HH:mm:ss"));
			
			//上下拉动提示语显示隐藏处理
			config.wrapper.find('.visc_pullUp_new').show();
			config.wrapper.find('.visc_pullDown_new').show();
			if(config.hasPullDown == false) {
				config.wrapper.find('.visc_pullDown_new').hide();
			}
			
			//执行上下拉动的回调处理
			function pullAction (opt) {
				if(opt == "up") {
					if(config.upHandle) { config.upHandle(); };
				} else {
					if(config.downHandle) { config.downHandle(); }
				}
			}
			
			//销毁对象，优化内存
			if(wrapperObj != null) {
				wrapperObj.destroy();
				wrapperObj = null;
			}

			var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset;
			pullDownEl = config.wrapper[0].querySelector('.visc_pullDown_new');
			pullDownOffset = pullDownEl.offsetHeight;
			pullUpEl = config.wrapper[0].querySelector('.visc_pullUp_new');
			pullUpOffset = pullUpEl.offsetHeight;

			// 修改了iscroll源码，横向比纵向多5个点，就算横向？ 改成：2倍 + 5 大约 75度以上才算横向移动
			var iScroll = require("mall/scripts/common/plugins/viscroll/iscroll");
			/**
			 * 这样写避免了第一次下拉执行回调完毕后立马执行上拉的处理bug
			 * 下面onScrollMove中的判断“!config.isPagingType && config.visibleHeight > config.wrapper.find('.visc_scroller').height()”是另外一种上述情况的bug
			 * 这个iScroll本身也有这种Bug
			 */
			setTimeout(function () {
				wrapperObj = new iScroll(config.wrapper[0], {
					hScroll: false, //是否水平滚动
					hScrollbar: false, //是否显示水平滚动条
					vScrollbar: !config.isPagingType, //是否显示垂直滚动条
					topOffset: pullDownOffset,
					lockDirection : true,
					onBeforeScrollStart:function (e) {
						var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : (e.target ? e.target.nodeName.toLowerCase() : '');
						if (nodeType != 'select' && nodeType != 'option' && nodeType != 'input' && nodeType != 'textarea') {
//							if (this.absDistY > (this.absDistX + 5)) { //上下滑动不需要处理
								e.preventDefault();
//							}
						}
					},
					onRefresh: function() {
						if (pullDownEl.className.match('visc_pullDown_new visc_loading')) {
							pullDownEl.className = 'visc_pullDown_new';
//							pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '下拉加载上一页';
//							pullDownEl.querySelector('.visc_pullDownTime').innerHTML = new Date().format("HH:mm:ss");
						} else if (pullUpEl.className.match('visc_pullUp_new visc_loading')) {
							pullUpEl.className = 'visc_pullUp_new';
//							pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '上拉加载下一页';
//							pullUpEl.querySelector('.visc_pullUpTime').innerHTML = new Date().format("HH:mm:ss");
						}
					},
					onScrollMove: function(e) {
						e.preventDefault();
						e.stopPropagation();
						if(config.isPagingType || (!config.isPagingType && config.visibleHeight > config.wrapper.find('.visc_scroller').height())) {
							if(this.distY > 50 && this.absDistY > (this.absDistX + 5 ) ) {
								pullDownEl.className = 'visc_pullDown_new visc_flip';
//								pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '释放可以更新';
								this.minScrollY = 0;
						    } else if(this.distY > 0 && this.distY < 50 && this.absDistY > (this.absDistX + 5 ) ) {
								pullDownEl.className = 'visc_pullDown_new';
//								pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '下拉加载上一页';
								this.minScrollY = -pullDownOffset;
							} else if(this.distY < -50 &&  this.absDistY > (this.absDistX + 5 ) ) {
								pullUpEl.className = 'visc_pullUp_new visc_flip';
//								pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '释放可以更新';
								this.maxScrollY = this.maxScrollY;
						    } else if(this.distY < 0 && this.distY > -50 &&  this.absDistY > (this.absDistX + 5 ) ) {
								pullUpEl.className = 'visc_pullUp_new';
//								pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '上拉加载下一页';
								this.maxScrollY = pullUpOffset;
							}
							
							//分页数据不足时的底部隐藏处理
							if(config.isPagingType == true){
//								config.wrapper.find('.visc_pullUp_new').show();
							}
						}
						else
						{
							if (this.y > 10 && !pullDownEl.className.match('visc_pullDown_new visc_flip')) {
								pullDownEl.className = 'visc_pullDown_new visc_flip';
//								pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '释放可以更新';
								this.minScrollY = 0;
							} else if (this.y < 10 && pullDownEl.className.match('visc_pullDown_new visc_flip')) {
								pullDownEl.className = 'visc_pullDown_new';
//								pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '下拉加载上一页';
								this.minScrollY = -pullDownOffset;
							} else if (this.y < (this.maxScrollY - 10) && !pullUpEl.className.match('visc_pullUp_new visc_flip')) {
								pullUpEl.className = 'visc_pullUp_new visc_flip';
//								pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '释放可以更新';
								this.maxScrollY = this.maxScrollY;
							} else if (this.y > (this.maxScrollY + 10) && pullUpEl.className.match('visc_pullUp_new visc_flip')) {
								pullUpEl.className = 'visc_pullUp_new';
//								pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '上拉加载下一页';
								this.maxScrollY = pullUpOffset;
							}
						}
						config.wrapper.children("div").eq(1).hide(); //滚动条处理
					},
					onScrollEnd: function() {
						if (pullDownEl.className.match('visc_pullDown_new visc_flip')) {
							pullDownEl.className = 'visc_pullDown_new visc_loading';
//							pullDownEl.querySelector('.visc_pullDownLabel').innerHTML = '加载数据中...';	
							pullAction("down",config.wrapper);
						} else if (pullUpEl.className.match('visc_pullUp_new visc_flip')) {
							pullUpEl.className = 'visc_pullUp_new visc_loading';
//							pullUpEl.querySelector('.visc_pullUpLabel').innerHTML = '加载数据中...';	
							pullAction("up",config.wrapper);
						}
						
//						// 解决第一次无法滑动的问题，上下滑动不需要处理
//						var self = this;
//						if (self.touchEndTimeId) {
//							clearTimeout(self.touchEndTimeId);
//						}
//						self.touchEndTimeId = setTimeout(function() {
//							self.absDistX = 0;
//							self.absDistY = 0;
//						}, 200);
						
						config.wrapper.children("div").eq(1).hide(); //滚动条处理
					}
				});
			}, 0);
		
			setTimeout(function () {config.wrapper[0].style.left = '0';}, 200);
		};
		
		/**
		 * 销毁引用，待释放内存
		 */
		this.destroy = function() {
			if(wrapperObj != null) {
				wrapperObj.destroy();
				wrapperObj = null;
			}
		};
		
		This.init();
	};
	//暴露对外的接口
	module.exports = VIscroll;
});