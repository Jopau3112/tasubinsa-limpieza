// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',
    'starter.LoginController',
    'starter.MenuPrincipalController',
    'ngCordova'
])

.run(function($ionicPlatform, $rootScope, $cordovaNetwork) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.cordova) {
            //alert("EN EL MOVIL");
            // *-------------------------------*
            // *-- FUNCIONA SOLO EN EL MÓVIL --*
            // *-------------------------------*
            // *- Comprobamos la conexion -*
            // Vemos si hay conexión o no para guardarlo en $rootScope
            $rootScope.isOnline = $cordovaNetwork.isOnline();
            // Evento para cuando vuelva la conexión
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                    $rootScope.isOnline = true;
                })
                // Evento para cuando se pierda la conexión
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                $rootScope.isOnline = false;
            });
        } else {
            // *-----------------------------------*
            // *-- FUNCIONA SOLO EN EL NAVEGADOR --*
            // *-----------------------------------*
            $rootScope.isOnline = true;
            //alert("EN EL NAVEGADOR");
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // *- Login -*
        .state('Login', {
            url: '/Login',
            cache: false,
            templateUrl: 'templates/Login.html',
            controller: 'LoginCtrl'
        })
        .state('MenuPrincipal', {
            url: '/MenuPrincipal',
            cache: false,
            templateUrl: 'templates/MenuPrincipal.html',
            controller: 'MenuPrincipalCtrl'
        })
        // .state('Incidencia', {
        //     url: '/Incidencia',
        //     cache: false,
        //     templateUrl: 'templates/Incidencia.html',
        //     controller: 'IncidenciaCtrl'
        // })

    // *- En el caso de que no se ponga ninguna direccion -*
    $urlRouterProvider.otherwise('/Login');
})