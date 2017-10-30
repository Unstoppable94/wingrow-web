// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('zh-CN');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }])
  .config(['$breadcrumbProvider', function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      //prefixStateName: '首页',
      //template: 'bootstrap2'
      includeAbstract: true
    });
  }])
  .config(['authProvider', function(authProvider){
    authProvider.setLoginState("access.signin");
  }])
  .run(['auth', function(auth) {
    //auth.initialize();
  }])
  .config(['$authProvider', function($authProvider) {

    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend

    $authProvider.configure({
      apiUrl:                  'http://10.10.114.43:3000/api',
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/auth/sign_out',
      emailRegistrationPath:   '/auth',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  window.location.href,
      passwordResetPath:       '/auth/password',
      passwordUpdatePath:      '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath:         '/auth/sign_in',
      storage:                 'cookies',
      forceValidateToken:      false,
      validateOnPageLoad:      true,
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      omniauthWindowType:      'sameWindow',
      authProviderPaths: {
        github:   '/auth/github',
        facebook: '/auth/facebook',
        google:   '/auth/google'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      cookieOps: {
        path: "/",
        expires: 9999,
        expirationUnit: 'days',
        secure: false,
        domain: 'domain.com'
      },
      createPopup: function(url) {
        return window.open(url, '_blank', 'closebuttoncaption=Cancel');
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountUpdateResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    });
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if(to.ncyBreadcrumb && to.ncyBreadcrumb.label){
        $rootScope.$title = to.ncyBreadcrumb.label;
      }
      if (to.redirectTo) {
        if(to.redirectTo != $state.$current.name){
          evt.preventDefault();
          $state.go(to.redirectTo, params, {location: 'replace'})
        }else{
          $state.go(to.redirectTo, params)
        }
      }
    });    
  }])
  .config(['IdleProvider', 'KeepaliveProvider', function(IdleProvider, KeepaliveProvider) {
    // configure Idle settings
    IdleProvider.idle(60); // in seconds
    IdleProvider.timeout(60); // in seconds
    KeepaliveProvider.interval(60); // in seconds
  }])
  .run(['$rootScope', '$state', 'Idle', function($rootScope, $state, Idle){
    // start watching when the app runs. also starts the Keepalive service by default.
    
    $rootScope.stateWhenLocked = null;
    $rootScope.$on('IdleStart', function() {
        $rootScope.stateWhenLocked = $state.$current.name;
        if($rootScope.stateWhenLocked=="lockme"){
          $rootScope.stateWhenLocked = null;
        }
        // the user appears to have gone idle
    });
    $rootScope.$on('IdleWarn', function(e, countdown) {
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
    });
    $rootScope.$on('IdleTimeout', function() {
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
        $state.go("lockme");
    });
    $rootScope.$on('IdleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    });
    $rootScope.$on('Keepalive', function() {
        // do something to keep the user's session alive
    });

    $rootScope.unlock = function(){
      if($rootScope.stateWhenLocked){
        $state.go($rootScope.stateWhenLocked);
      }else{
        $state.go("app");
      }
      Idle.watch();      
    }

    Idle.watch();

  }])
  .config(['panelsProvider', function (panelsProvider) {

    panelsProvider
    .add({
        id: 'test01',
        position: 'left',
        size: '700px',
        templateUrl: 'tpl/blocks/panel_left.html',
        controller: 'PanelLeftCtrl'
    })
    .add({
        id: 'test02',
        position: 'right',
        size: '50%',
        templateUrl: 'tpl/blocks/panel_right.html',
        controller: 'PanelRightCtrl'
    })
    .add({
        id: 'test03',
        position: 'top',
        size: '20%',
        templateUrl: 'tpl/blocks/panel_top.html',
        controller: 'PanelTopCtrl'
    })
    .add({
        id: 'test04',
        position: 'bottom',
        size: '80%',
        templateUrl: 'tpl/blocks/panel_bottom.html',
        controller: 'PanelBottomCtrl',
        closeCallbackFunction: 'bottomClose'
    });
  }])
  .config(['apiMockProvider', function (apiMockProvider) {
    apiMockProvider.config({
      mockDataPath: '/my_mock_data_path',
      apiPath: '/my_api_path',
    });
  }]);