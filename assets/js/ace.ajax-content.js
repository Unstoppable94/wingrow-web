/**
 <b>Load content via Ajax </b>. For more information please refer to documentation #basics/ajax
*/

function refreshMenuActive(hash){
     var close_active = false;
     var link_element = [];
    /*-------------增加data-url-params属性，当uri带有参数，使用data-url和data-url-params能使左边菜单栏能高亮显示当前菜单--------------以下是修改的地方--start--------------*/
      var params = hash.substring(hash.indexOf("?")+1);
      var paramsList = new Array();
      if(params){
          var paramsArray = params.split("&");
          if(paramsArray && paramsArray.length > 0){
              for(var _i=0; _i<paramsArray.length; _i++){
                  paramsList.push(paramsArray[_i].substring(0,paramsArray[_i].indexOf("=")));
              }
          }
      }
      var paramsStr = paramsList.join(",");
      link_element = $.map([$('a[data-url="'+hash+'"]'),$('a[data-url-sec="'+hash+'"]'),$('a[data-url-thr="'+hash+'"]'),$('a[data-url="'+hash.substring(0,hash.indexOf("?"))+'"]'),$('a[data-url-sec="'+hash.substring(0,hash.indexOf("?"))+'"]'),$('a[data-url-thr="'+hash.substring(0,hash.indexOf("?"))+'"]'),$('a[data-url="'+hash.substring(0,hash.indexOf("?"))+'"][data-url-params*="'+paramsStr+'"]')],function(res){
        if(res.length > 0) return res;
        return [''];
      });
      //link_element = link_element[0];
      
      for(var _j=0;_j<link_element.length;_j++){
          if(link_element[_j]){
              link_element = link_element[_j];
              break;
          }
      }
      /*-------------增加data-url-params属性，当uri带有参数，使用data-url和data-url-params能使左边菜单栏能高亮显示当前菜单------------以上是修改的地方--end--------------*/
      if(link_element.length > 0 && link_element.length<2) {
        var nav = link_element.closest('.navbox');
        if(nav.length > 0) {
          nav.find('.highlight').each(function(){
            var $class = 'highlight';
            //$(this).removeClass($class);
            if( $(this).hasClass('hover') || close_active ) $class += ' open';
            
            $(this).removeClass($class);              
            if(close_active) {
              $(this).find(' > .submenu').css('display', '');
            }
          })
          
          var active_li = link_element.closest('li').addClass('highlight').parents('.nav li').addClass('active open');
          nav.closest('.sidebar[data-sidebar-scroll=true]').each(function() {
            var $this = $(this);
            $this.ace_sidebar_scroll('reset');
            if(manual_trigger) $this.ace_sidebar_scroll('scroll_to_active');//first time only
          })
        }
      }else{
          link_element = link_element[0];
      }
    
}

(function($ , undefined) {
  var ajax_loaded_scripts = {}

  function AceAjax(contentArea, options) {

    var $contentArea = $(contentArea);
    var self = this;
    
     var content_url = options.content_url || false
     var default_url = options.default_url || false;
    var loading_icon = options.loading_icon || 'fa-spinner fa-2x orange';
    var loading_text = options.loading_text || '';
    var update_breadcrumbs = options.update_breadcrumbs || options.update_breadcrumbs === undefined;
    var update_title = options.update_title || options.update_breadcrumbs === undefined;
    var update_active = options.update_active || options.update_breadcrumbs === undefined;
    var close_active = options.close_active || false;
    var max_load_wait = options.max_load_wait || false;
    
    var working = false;
    

    this.loadUrl = function(hash) {
      var url = false;
      hash = hash.replace(/^(\#\!)?\#/, '');
      if(typeof content_url === 'function') url = content_url(hash);
      if(typeof url === 'string') this.getUrl(url, hash, false);
    }
    this.getUrl = function(url, hash, manual_trigger) {
      if(working) {
    	  //if(hash!="pages/welcome/index"){
    		  //return;
    	  //}
      }
    
      var event
      $contentArea.trigger(event = $.Event('ajaxloadstart'), {url: url, hash: hash})
      if (event.isDefaultPrevented()) return;
      
      //self.startLoading();
      showLoading();

      $.ajax({
        'url': url
      })
      .error(function(req, status, ex) {
    	alertError(req, status, ex);
        $contentArea.trigger('ajaxloaderror', {url: url, hash: hash});

        //self.stopLoading(true);
        hideLoading();
        
        window.location.hash = default_url;//匹配不到文件时跳回首页
      })
      .done(function(result) {
        $contentArea.trigger('ajaxloaddone', {url: url, hash: hash});
        
        var link_element = null, link_text = '';
        if(typeof update_active === 'function') {
          link_element = update_active.call(null, hash, url);
        }
        else if(update_active === true) {
            refreshMenuActive(hash);
        }

        /////////
        if(typeof update_breadcrumbs === 'function') {
          link_text = update_breadcrumbs.call(null, hash, url, link_element);
        }
        else if(update_breadcrumbs === true && link_element != null && link_element.length > 0) {
          link_text = updateBreadcrumbs(link_element,hash);
        }
        /////////

        //convert "title" and "link" tags to "div" tags for later processing
        result = String(result)
          .replace(/<(title|link)([\s\>])/gi,'<div class="hidden ajax-append-$1"$2')
          .replace(/<\/(title|link)\>/gi,'</div>')
      
        $contentArea.empty().html("<div id='page-content'>"+result+"</div");
        $contentArea.css('opacity', 0.6);

        //remove previous stylesheets inserted via ajax
        setTimeout(function() {
          $('head').find('link.ace-ajax-stylesheet').remove();

          var main_selectors = ['link.ace-main-stylesheet', 'link#main-ace-style', 'link[href*="/ace.min.css"]', 'link[href*="/ace.css"]']
          var ace_style = [];
          for(var m = 0; m < main_selectors.length; m++) {
            ace_style = $('head').find(main_selectors[m]).first();
            if(ace_style.length > 0) break;
          }
          
          $contentArea.find('.ajax-append-link').each(function(e) {
            var $link = $(this);
            if ( $link.attr('href') ) {
              var new_link = jQuery('<link />', {type : 'text/css', rel: 'stylesheet', 'class': 'ace-ajax-stylesheet'})
              if( ace_style.length > 0 ) new_link.insertBefore(ace_style);
              else new_link.appendTo('head');
              new_link.attr('href', $link.attr('href'));//we set "href" after insertion, for IE to work
            }
            $link.remove();
          })
        }, 10);

        //////////////////////

        if(typeof update_title === 'function') {
          update_title.call(null, hash, url, link_text);
        }
        else if(update_title === true) {
          updateTitle(link_text);
        }
        

        if( !manual_trigger ) {
          $('html,body').animate({scrollTop: 0}, 250);
        }

        //////////////////////
        $contentArea.trigger('ajaxloadcomplete', {url: url, hash: hash});
        //////////////////////
        
        //self.stopLoading(true);
        hideLoading();
      })
    }
    
    
    ///////////////////////
    var loadTimer = null;
    this.startLoading = function() {
      if(working) return;
      working = true;
      
      $contentArea
      //.css('opacity', 0.25)
      .prevAll('.ajax-loading-overlay').remove();
      $('<div class="ajax-loading-overlay"><i class="ajax-loading-icon fa fa-spin '+loading_icon+'"></i> '+loading_text+'</div>').appendTo($('body'));
      
      if(max_load_wait !== false) 
       loadTimer = setTimeout(function() {
        loadTimer = null;
        if(!working) return;
        
        var event
        $contentArea.trigger(event = $.Event('ajaxloadlong'))
        if (event.isDefaultPrevented()) return;
        
        self.stopLoading(true);
       }, max_load_wait * 1000);
    }
    
    this.stopLoading = function(stopNow) {
      if(stopNow === true) {
        working = false;
        $contentArea
        .css('opacity', 1)
        //.prevAll('.ajax-loading-overlay').remove();
        $('.ajax-loading-overlay').remove();
        if(loadTimer != null) {
          clearTimeout(loadTimer);
          loadTimer = null;
        }
      }
      else {
        $contentArea.css('opacity', 0.75)
        $contentArea.one('ajaxscriptsloaded', function() {
          self.stopLoading(true);
        })
      }
    }
    ///////////////////////
    
    window.startLoading = this.startLoading;
    window.stopLoading = this.stopLoading;
    
    function updateBreadcrumbs(link_element,hash) {
      var link_text = '';
     
      //update breadcrumbs
      var breadcrumbs = $('.breadcrumb');
      if(breadcrumbs.length > 0 && breadcrumbs.is(':visible')) {
        //console.log(link_element.attr("data-url")+"  "+hash)
        breadcrumbs.find('> li:not(:first-child)').remove();

        var i = 0;    
        link_element.parents('.nav li').each(function() {
          var link = $(this).find('> a');
          
          var link_clone = link.clone();
          link_clone.find('i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label').remove();
          var text = link_clone.text();
          link_clone.remove();
          
          var href = link.attr('href');

          if(i == 0) {
            var li = $('<li class="active"></li>').appendTo(breadcrumbs);
            li.text(text);
            link_text = text;
          }
          else {
            var li = $('<li><a /></li>').insertAfter(breadcrumbs.find('> li:first-child'));
            li.find('a').attr('href', href).text(text);
          }
          i++;
        })
      }
      
      return link_text;
     }
     
     function updateTitle(link_text) {
      var $title = $contentArea.find('.ajax-append-title');
      if($title.length > 0) {
        document.title = $title.text();
        $title.remove();
      }
      else if(link_text.length > 0) {
        var extra = $.trim(String(document.title).replace(/^(.*)[\-]/, ''));//for example like " - Ace Admin"
        if(extra) extra = ' - ' + extra;
        link_text = $.trim(link_text) + extra;
      }
     }
     

     this.loadScripts = function(scripts, callback) {
      $.ajaxPrefilter('script', function(opts) {opts.cache = true});
      setTimeout(function() {
        //let's keep a list of loaded scripts so that we don't load them more than once!
        
        function finishLoading() {
        	if(window.timers){
        		for(var key in window.timers){
        			clearInterval(window.timers[key]);
        		}
        	}
        	window.timers = [];
        	
          if(typeof callback === 'function') {
            var args=new Object();         

            var hash = window.location.hash.replace(/^\s+/g,"").replace(/\s+$/g,"");
            if(hash.indexOf("?")>-1){
              var query = hash.split("?")[1];
              var pairs=query.split("&");//在逗号处断开 
              for(var i=0;i<pairs.length;i++) 
              { 
                var pos=pairs[i].indexOf('=');//查找name=value 
                if(pos==-1) continue;//如果没有找到就跳过 
                var argname=pairs[i].substring(0,pos);//提取name 
                var value=pairs[i].substring(pos+1);//提取value 
                args[argname]=unescape(value);//存为属性 
              }
            }
            if(window.modal_args){
            	for(var key in window.modal_args){
            		if(!args[key]){
            			args[key] = window.modal_args[key];
            		}
            	}
            }
            callback(args, window.modal_args);
          }
          $('.btn-group[data-toggle="buttons"] > .btn').button();
          
          $contentArea.trigger('ajaxscriptsloaded');

          $("[ui-jq]").each(function(){
            var self = $(this);
            var options = eval('[' + self.attr('ui-options') + ']');

            if ($.isPlainObject(options[0])) {
              options[0] = $.extend({}, options[0]);
            }

            uiLoad.load(jp_config[self.attr('ui-jq')]).then( function(){          
              self[self.attr('ui-jq')].apply(self, options);
            });
          });
        }
        
        //var deferreds = [];
        var deferred_count = 0;//deferreds count
        var resolved = 0;
        for(var i = 0; i < scripts.length; i++) if(scripts[i]) {
          (function() {
            var script_name = "js-"+scripts[i].replace(/[^\w\d\-]/g, '-').replace(/\-\-/g, '-');
            if( ajax_loaded_scripts[script_name] !== true ) deferred_count++;
          })()
        }
        

        function nextScript(index) {
          index += 1;
          if(index < scripts.length) loadScript(index);
          else {
            finishLoading();
          }
        }
        
        function loadScript(index) {
          index = index || 0;
          if(!scripts[index]) {//could be null sometimes
            return nextScript(index);
          }
        
          var script_name = "js-"+scripts[index].replace(/[^\w\d\-]/g, '-').replace(/\-\-/g, '-');
          //only load scripts that are not loaded yet!
          if( ajax_loaded_scripts[script_name] !== true ) {
            $.getScript(scripts[index])
            .done(function() {
              ajax_loaded_scripts[script_name] = true;
            })
            //.fail(function() {
            //})
            .complete(function() {
              resolved++;
              if(resolved >= deferred_count && working) {
                finishLoading();
              }
              else {
                nextScript(index);
              }
            })
          }
          else {//script previoisly loaded
            nextScript(index);
          }
        }
        
        
        if (deferred_count > 0) {
          loadScript();
        }
        else {
          finishLoading();
        }

      }, 10)
    }

    
    /////////////////
    $(window)
    .off('hashchange.ace_ajax')
    .on('hashchange.ace_ajax', function(e, manual_trigger) {
      var hash = $.trim(window.location.hash);
      if(!hash || hash.length == 0) return;
      
      self.loadUrl(hash);
    //  checkLicense && checkLicense();
    }).trigger('hashchange.ace_ajax', [true]);
    
    var hash = $.trim(window.location.hash);
    if(!hash && default_url) window.location.hash = default_url;

  }//AceAjax



  $.fn.aceAjax = $.fn.ace_ajax = function (option, value, value2) {
    var method_call;

    var $set = this.each(function () {
      var $this = $(this);
      var data = $this.data('ace_ajax');
      var options = typeof option === 'object' && option;

      if (!data) $this.data('ace_ajax', (data = new AceAjax(this, options)));
      if (typeof option === 'string' && typeof data[option] === 'function') {
        if(value2 != undefined) method_call = data[option](value, value2);
        else method_call = data[option](value);
      }
    });

    return (method_call === undefined) ? $set : method_call;
  }

})(window.jQuery);

