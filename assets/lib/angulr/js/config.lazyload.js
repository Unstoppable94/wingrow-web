// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   '../../lib/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   '../../lib/bower-jquery-sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   '../../lib/flot/jquery.flot.js',
                          '../../lib/flot/jquery.flot.pie.js', 
                          '../../lib/flot/jquery.flot.resize.js',
                          '../../lib/flot.tooltip/js/jquery.flot.tooltip.js',
                          '../../lib/flot.orderbars/js/jquery.flot.orderBars.js',
                          '../../lib/flot-spline/js/jquery.flot.spline.js'],
      moment:         [   '../../lib/moment/moment.js'],
      screenfull:     [   '../../lib/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   '../../lib/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   '../../lib/html5sortable/jquery.sortable.js'],
      nestable:       [   '../../lib/nestable/jquery.nestable.js',
                          '../../lib/nestable/jquery.nestable.css'],
      filestyle:      [   '../../lib/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   '../../lib/bootstrap-slider/bootstrap-slider.js',
                          '../../lib/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   '../../lib/chosen/chosen.jquery.js',
                          '../../lib/bootstrap-chosen/bootstrap-chosen.css'],
      TouchSpin:      [   '../../lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          '../../lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   '../../lib/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          '../../lib/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   '../../lib/datatables/media/js/jquery.dataTables.min.js',
                          '../../lib/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../../lib/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   '../../lib/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          '../../lib/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../../lib/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../../lib/bower-jvectormap/jquery-jvectormap-1.2.2.css'],
      footable:       [   '../../lib/footable/compiled/footable.min.js',
                          '../../lib/footable/compiled/footable.core.bootstrap.css'],
      fullcalendar:   [   '../../lib/moment/moment.js',
                          '../../lib/fullcalendar/dist/fullcalendar.min.js',
                          '../../lib/fullcalendar/dist/lang/zh-cn.js',
                          '../../lib/fullcalendar/dist/fullcalendar.min.css',
                          '../../lib/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   '../../lib/moment/moment.js',
                          '../../lib/bootstrap-daterangepicker/daterangepicker.js',
                          '../../lib/bootstrap-daterangepicker/daterangepicker.css'],
      tagsinput:      [   '../../lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          '../../lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'malhar.dashboard',
          files: [
              '../../lib/lodash/dist/lodash.min.js',
              '../../lib/jquery-ui/jquery-ui.min.js',
              '../../lib/angular-ui-sortable/sortable.min.js',
              '../../lib/d3/d3.js',
              '../../lib/nvd3/nv.d3.js',
              '../../lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
              '../../lib/malhar-angular-dashboard/dist/malhar-angular-dashboard.css',
              '../../lib/malhar-angular-dashboard/dist/malhar-angular-dashboard.js',
              '../../lib/malhar-angular-widgets/dist/malhar-angular-widgets.js',
              '../../lib/malhar-angular-table/dist/mlhr-table.js',
              '../../lib/pines-notify/pnotify.core.js',
              '../../lib/angular-pines-notify/src/pnotify.js',
              '../../lib/visibilityjs/lib/visibility.core.js'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              '../../lib/angular-ui-grid/ui-grid.min.js',
              '../../lib/angular-ui-grid/ui-grid.min.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              '../../lib/angular-ui-select/dist/select.min.js',
              '../../lib/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            '../../lib/angular-file-upload/dist/angular-file-upload.min.js'
          ]
      },
      {
          name:'plupload',
          files: [
            '../../lib/plupload/js/plupload.full.min.js',
            '../../lib/angular-plupload/dist/angular-plupload.min.js'
          ]
      },
      {
          name:'ui.calendar',
          files: ['../../lib/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              '../../lib/ng-img-crop/compile/minified/ng-img-crop.js',
              '../../lib/ng-img-crop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              '../../lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              '../../lib/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              '../../lib/angularjs-toaster/toaster.js',
              '../../lib/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              '../../lib/angular-slider/build/angular-slider.min.js',
              '../../lib/angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              '../../lib/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.themes.default',
          files: [
              '../../lib/videogular-themes-default/videogular.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              '../../lib/videogular-controls/vg-controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              '../../lib/videogular-buffering/vg-buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              '../../lib/videogular-overlay-play/vg-overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              '../../lib/videogular-poster/vg-poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              '../../lib/videogular-ima-ads/vg-ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              '../../lib/angular-xeditable/dist/js/xeditable.min.js',
              '../../lib/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              '../../lib/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'object-table',
          files: [
              '../../lib/angular-object-table/build/object-table-style.css',
              '../../lib/angular-object-table/build/object-table.js',
          ]
      },
      {
          name: 'dynamic-form',
          files: [
              '../../lib/angularjs-dynamic-form/src/angulardynamicform.js'
          ]
      },
      {
          name: 'iframe-resizer',
          files: [
              '../../lib/iframe-resizer/js/iframeResizer.min.js',
              '../../lib/ng-iframe-resizer/dist/iframe-resizer.min.js'
          ]
      },      
      {
          name: 'angular-skycons',
          files: [
              '../../lib/angular-skycons/angular-skycons.js'
          ]
      },
      {
          name: 'echarts',
          files: [
              '../../lib/echarts/build/dist/echarts-all.js',
              '../../lib/angular-echarts/dist/angular-echarts.js'
          ]
      },
      {
          name: 'ckeditor',
          files: [
              '../../lib/ckeditor/ckeditor.js',
              '../../lib/angular-ckeditor/angular-ckeditor.js'
          ]
      },
      {
          name: 'ueditor',
          files: [
              '../../lib/angular-bdeditor/dist/ueditor.config.js',
              '../../lib/angular-bdeditor/dist/ueditor.all.min.js',
              '../../lib/angular-bdeditor/dist/angular-ueditor.js'
          ]
      },
      {
        name: 'ztree',
        files: [
            '../../lib/zTree/css/metroStyle/metroStyle.css',
            '../../lib/zTree/js/jquery.ztree.all.min.js',
            '../../lib/zTree/ng-ztree.js'
        ]
      },
      {
        name: 'handsontable',
        files: [
            '../../lib/handsontable/dist/handsontable.css',
            '../../lib/pikaday/pikaday.js',
            '../../lib/moment/moment.js',
            '../../lib/zeroclipboard/dist/ZeroClipboard.js',
            '../../lib/handsontable/dist/handsontable.full.min.js'
        ]
      },
      {
        name: 'ng-handsontable',
        files: [
            '../../lib/ngHandsontable/dist/ngHandsontable.js'
        ]
      },
      {
        name: 'wizard',
        files: [
            '../../lib/angular-wizard/dist/angular-wizard.css',
            '../../lib/angular-wizard/dist/angular-wizard.js',
        ]
      },
      {
        name: 'multi-step-form',
        files: [
            '../../lib/angular-multi-step-form/dist/browser/angular-multi-step-form.js'
        ]
      },
      {
        name: 'ag-grid',
        files: [
            '../../lib/ag-grid/dist/styles/ag-grid.css',
            '../../lib/ag-grid/dist/ag-grid.js'
        ]
      },
      {
        name: 'datatables',
        files: [
            '../../lib/datatables/media/js/jquery.dataTables.min.js',
            '../../lib/angular-datatables/dist/css/angular-datatables.css',
            '../../lib/angular-datatables/dist/angular-datatables.js'
        ]
      },
      {
        name: 'dragdrop',
        files: [
            '../../lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'
        ]
      },
      {
        name: 'raphael-map',
        files: [
            '../../lib/raphael/raphael.js',
            '../../lib/angular-raphael-chinamap/dist/angular-raphael-chinamap.js'
        ]
      },
      {
        name: 'qr',
        files: [
            '../../lib/angular-qr/lib/qrcode.js',
            '../../lib/angular-qr/src/angular-qr.js'
        ]
      },
      {
        name: 'fullscreen',
        files: [
            '../../lib/angular-fullscreen/src/angular-fullscreen.js'
        ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
