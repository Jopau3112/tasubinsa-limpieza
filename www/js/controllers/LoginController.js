angular.module('starter.LoginController', ['ionic'])

.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPopup) {
	
	$scope.usuario = {
		nombre: "",
		password: "",
		email: ""
	};
	$scope.validacionEmail = patronValidacion;
	$scope.passwordOculto = true;
	$scope.hayErrorEmail = false;

	$scope.mostrarOcultarPassword = function() {
		if ($scope.passwordOculto) {
			document.getElementById("password").type = "text";
		} else {
			document.getElementById("password").type = "password";
		}
		$scope.passwordOculto = $scope.passwordOculto ? false : true;
	}

	$scope.realizarLogin = function() {
		//alert("LOGADO");
		var confirmPopup = $ionicPopup.confirm({
	    title: 'Login',
	      template: 'Has iniciado sesión correctamente'
	  });
	  confirmPopup.then(function(res) {
      if (res) {
        $state.go('MenuPrincipal');
      }
    });
	}

	$scope.enviarEmail = function() {
		if(!$scope.usuario.email){
			document.getElementById("errorEmail").style.visibility = 'visible';
			$scope.hayErrorEmail = true;
		}
		$scope.usuario = {};
	}

	$scope.ocultarError = function() {
		document.getElementById("errorEmail").style.visibility = 'hidden';
	}

	$ionicModal.fromTemplateUrl('modalsViews/RecordarPasswordModal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openRecordarPasswordModal = function() {
		$scope.modal.show({
			animation: 'slide-in-left'
		});
		$scope.hayErrorEmail = false;
	};
	$scope.closeRecordarPasswordModal = function() {
		$scope.modal.hide();
		$scope.usuario = {};
	};



});
