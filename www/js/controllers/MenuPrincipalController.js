angular.module('starter.MenuPrincipalController', ['ionic'])

.controller('MenuPrincipalCtrl', function($scope, $rootScope, $state, $ionicModal) {

    $scope.tipoGestion = "INCIDENCIAS";
    // $scope.templateIncidencias = "../../templates/Incidencias.html";

    $scope.data = {
        descripcion: "",
        tipoIncidencia: "",
        tipoElemento: "",
        ubicacion: {
            calle: "",
            barrio: "",
            distrito: "",
            numero: 1,
            numeroMinimo: 1,
            numeroMaximo: 20,
            show: false
        }
    }
    $scope.tiposDeElementos = [{
            id: 1,
            nombre: "Limpieza vertical"
        },
        {
            id: 2,
            nombre: "Papelera"
        },
        {
            id: 3,
            nombre: "Contenendor canino"
        },
        {
            id: 4,
            nombre: "Rejilla"
        }

    ];
    $scope.limpiezaVertical = false;
    // *-------------------*
    // *- Eventos Botones -*
    // *-------------------*
    $scope.volverAtras = function(incidencia) {
        $ionicHistory.goBack();
    }
    $scope.incidenciaTab = "active";
    $scope.mostrarIncidencias = true;
    $scope.mostrarPestania = function(pestaniaMostrar) {
        if (pestaniaMostrar == 'informacion') {
            $scope.mostrarInformacion = true;
            $scope.mostrarLabores = false;
            $scope.mostrarRuta = false;
            $scope.mostrarRecursos = false;
            $scope.mostrarIncidencias = false;
            $scope.informacionTab = "active";
            $scope.laborTab = "";
            $scope.rutaTab = "";
            $scope.recursoTab = "";
            $scope.incidenciaTab = "";
            $scope.tipoGestion = "INFORMACION";
        }
        if (pestaniaMostrar == 'labores') {
            $scope.mostrarInformacion = false;
            $scope.mostrarLabores = true;
            $scope.mostrarRuta = false;
            $scope.mostrarRecursos = false;
            $scope.mostrarIncidencias = false;
            $scope.informacionTab = "";
            $scope.laborTab = "active";
            $scope.rutaTab = "";
            $scope.recursoTab = "";
            $scope.incidenciaTab = "";
            $scope.tipoGestion = "LABORES";
        }
        if (pestaniaMostrar == 'ruta') {
            $scope.mostrarInformacion = false;
            $scope.mostrarLabores = false;
            $scope.mostrarRuta = true;
            $scope.mostrarRecursos = false;
            $scope.mostrarIncidencias = false;
            $scope.informacionTab = "";
            $scope.laborTab = "";
            $scope.rutaTab = "active";
            $scope.recursoTab = "";
            $scope.incidenciaTab = "";
            $scope.tipoGestion = "RUTA";
        }
        if (pestaniaMostrar == 'recursos') {
            $scope.mostrarInformacion = false;
            $scope.mostrarLabores = false;
            $scope.mostrarRuta = false;
            $scope.mostrarRecursos = true;
            $scope.mostrarIncidencias = false;
            $scope.informacionTab = "";
            $scope.laborTab = "";
            $scope.rutaTab = "";
            $scope.recursoTab = "active";
            $scope.incidenciaTab = "";
            $scope.tipoGestion = "RECURSOS";
        }
        if (pestaniaMostrar == 'incidencias') {
            $scope.mostrarInformacion = false;
            $scope.mostrarLabores = false;
            $scope.mostrarRuta = false;
            $scope.mostrarRecursos = false;
            $scope.mostrarIncidencias = true;
            $scope.informacionTab = "";
            $scope.laborTab = "";
            $scope.rutaTab = "";
            $scope.recursoTab = "";
            $scope.incidenciaTab = "active";
            $scope.tipoGestion = "INCIDENCIAS";
        }
    }

    $scope.expandirUbicacion = function() {
        $scope.data.ubicacion.show = !$scope.data.ubicacion.show;
    };
    $scope.isUbicacionShown = function() {
        return $scope.data.ubicacion.show;
    };
    $scope.isLimpiezaVertical = function() {
        return $scope.limpiezaVertical;
    };
    $scope.elegirTipoElemento = function() {
        if ($scope.data.tipoElemento == 1) {
            $scope.limpiezaVertical = true;
        } else {
            $scope.limpiezaVertical = false;
        }

    };
});