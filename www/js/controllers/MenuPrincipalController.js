angular.module('starter.MenuPrincipalController', ['ionic'])

.controller('MenuPrincipalCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicHistory) {

    $scope.tipoGestion = "INCIDENCIAS";
    // $scope.templateIncidencias = "../../templates/Incidencias.html";
    $scope.arrayIncidencias = [];
    $scope.incidencia = {
        id: 0,
        origen: "Tasubinsa",
        tipoIncidencia: "",
        tipoServicio: "",
        fechaRegistro: "",
        descripcion: "",
        programacion: false,
        estado: "",
        foto: [],
        ubicacion: {
            barrio: "",
            calle: "",
            direccionTexto: "",
            numero: "",
            show: false
        }
    }
    $scope.tiposDeIncidencias = [{
            id: 1,
            nombre: "Incidencia tipo 1"
        },
        {
            id: 2,
            nombre: "Incidencia tipo 2"
        }

    ];
    $scope.tiposDeServicios = [{
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
    $scope.barrios = ["San Juan", "Mendillorri", "Casco Viejo"];
    $scope.calles = ["Av. de la Baja Navarra", "Calle Taconera", "Calle de Azoz"];
    $scope.numeros = ["3", "16", "34"];


    // *-------------------*
    // *- Eventos Botones -*
    // *-------------------*
    $scope.volverAtras = function(incidencia) {
        $ionicHistory.goBack();
    }


    // *-----------------------------------------------------*
    // *- Control de pestañas y mostrar contenido de estas. -*
    // *-----------------------------------------------------*
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

    // *--------------------------------------------------------------*
    // *- Mostrar/Esconder información de la ubicación de incidencia -*
    // *--------------------------------------------------------------*
    $scope.expandirUbicacion = function() {
        $scope.incidencia.ubicacion.show = !$scope.incidencia.ubicacion.show;
    };
    $scope.isUbicacionShown = function() {
        return $scope.incidencia.ubicacion.show;
    };
    $scope.resetearValoresIncidencia = function() {
        var incidenciaVacia = {
            id: 0,
            origen: "Tasubinsa",
            tipoIncidencia: "",
            tipoServicio: "",
            fechaRegistro: "",
            descripcion: "",
            programacion: false,
            estado: "",
            foto: [],
            ubicacion: {
                barrio: "",
                calle: "",
                direccionTexto: "",
                numero: "",
                show: false
            }
        };
        return incidenciaVacia;
    }
    $scope.noCumpleRequisitosMinimos = function() {
        var i = $scope.incidencia;
        return !i.descripcion || !i.tipoIncidencia || !i.tipoServicio ||
            !i.ubicacion.barrio || !i.ubicacion.calle || (i.ubicacion.numero < 0);
    };
    // $scope.cambiarEstadoProgramacion = function() {
    //     var elemento = document.getElementById("programacion");
    //     if (elemento.)
    // };

    // *-------------------------------------------------------*
    // *- Elección de Limpieza Vertical como tipo de limpieza -*
    // *-------------------------------------------------------*
    $scope.limpiezaVertical = false;

    $scope.isLimpiezaVertical = function() {
        return $scope.limpiezaVertical;
    };
    $scope.elegirTipoServicio = function() {
        if ($scope.incidencia.tipoServicio == 1) {
            $scope.limpiezaVertical = true;
        } else {
            $scope.limpiezaVertical = false;
        }

    };

    // *---------------------------*
    // *- Agregar una incidencia  -*
    // *---------------------------*
    $scope.agregarIncidencia = function() {
        var indice = $scope.arrayIncidencias.length;
        console.log($scope.incidencia);
        $scope.incidencia.id = indice;
        $scope.incidencia.fechaRegistro = new Date();
        $scope.incidencia.estado = "Enviado";
        var incidenciaNueva = $scope.incidencia;
        $scope.arrayIncidencias.push(incidenciaNueva);
        $scope.incidencia = $scope.resetearValoresIncidencia();
    }

    // *----------------------------------------------*
    // *- Control de la camara - hacer o elegir foto -*
    // *----------------------------------------------*
    $scope.tomarFoto = function(idIncidencia, descripcion) {
        if (window.cordova) {
            // *- Solo Movil -*
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                var cadenaImagen = "data:image/jpeg;base64," + imageData;
                var contador = $scope.arrayIncidencias[idIncidencia].Fotos.length + 1;
                var objetoImagen = {
                        "indice": contador,
                        "imagen": cadenaImagen
                    }
                    //arrayFotos.push(objetoImagen);
                    //$scope.Fotos.push(objetoImagen);
                $scope.arrayIncidencias[idIncidencia].descripcion = descripcion;
                $scope.arrayIncidencias[idIncidencia].Fotos.push(objetoImagen);
            }, function(err) {
                // error
            });
        } else {
            // *- Solo Navegador -*
            var cadenaImagen = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAiCAYAAABfqvm9AAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAyMCBKdWwgMjAwNSAxNDozMjo0MSAtMDYwMEVQaK0AAAAHdElNRQfVBxQTJgA+wqXpAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAA99JREFUeNqtVllMU1EQnfv6KgqlVSsfBIiioOASxSVqYqKJBJcYMYr7hx8aEz+MiSbqh35qYuKPGo3RDzUaAwE3FEJUgrgQFVyQKlVKQZBipQttX7G0tNeZFgi1K+gk5+XeeTPnzZ25c+9jEFmmIvIR8xHKQZ2E+ISoRrSGc2JhdImIY4gDSXJ5ypwpkyFDqfAb/nA4QWMyg+T2WHB6BXEa4YhGmIkoS1UkLTy8ZD7szM3maSoMTpQF7Aa8vNvugFJtKzv79gN0OqTPqC1CaMMRZiFqCqZlpN8uLODqiSoGngEArzf4kzIBQC4Hm12CPQ+fwANd2y/UrkZoRhJOQLxak5mRV76tEMaJAkUDUUWUgZdz2FpaAfda9BThUoRdGHx9NE2RlHezcC2PiyywfJBhPNc2FvDpE5U5qDlJaiJMRew9siwPUlTJbIiMvr6u9CGwMxeDeIL0mA6VIpEdX76YXu2hGhDhqkS5mLEtJxvA7fE7Nf4yQX7xA6jSdwSRhdWjz+ZZM/ik8QkplEsRH4ty1ZMhTZk8XIAF10rCrjKs3ucDNUY5L0UNzzsNcylCdVpyElZPNmyTo54ExRsLQnwj6UEQID1ZQSOVECg1C9pAzft2wfbc7BC/SHo/BwsQEKG1S5Liq2wk8XHsIurKwLZpaDZZwUAKQRg9mcDA4nTyT1gwFA0x1Do9HsPdr9jr4+SjJ8SuKf/WxqyufjPOaoiwC3H1TF0DmO0SH1mcmIJt6Ohz8VOv6ml2HaEbKgWV6M2m7MzZZUUbuIxKhNsh1lKBCXz3/Sp2+8s3PWqWICxD4bgR1VpL7+YWs1W5ZfZMAOyIqCLKYf+jJ+yGRkvJW49o9wc9woRy8ExjsuwUOCSszMoMPWmGZHwCXHj9Dk7VNbhwtgFRP5yFv0y7EW21HV1FK9NTYRoeruD9a+miCJqfPXzHvSrm8fkOoeZOUCbCfL8EF3vr4ONacPW7ObDQQ/1Y9UvWNzBQg8NLIamNkKGTmh6z7fL7Jha0lXCLVLbooVL/nWYnwtYqAiEl+Mr5hkb4/ds1IkoO5+obafAIUTcaQpILbb12qULXzkAu+g+PL0YTPG3v9L+L5BSNkDzLb2m+DhZDBmVaHbYtp2v08VgIScpedBrAitcnbfSKVsoElEdziEX4wuJy2T4ae8CEpI1G/wFQGc1BjEFIDE0fjKYV1I39Xu9PCPw5jJmQ5B1uoRVun79rmhDOfyX8rOu1gd1N7R49ungJv3fg74fR2Ufj5v9BaOqWnIF7B6AjlnE8hA6310dnGTHaYxnHc4nYEH2DY/P/iJAIDRD4oeqJZfwH8bOBJSkB+/gAAAAASUVORK5CYII=";
            var contador = $scope.arrayIncidencias[idIncidencia].Fotos.length + 1;
            var objetoImagen = {
                    "indice": contador,
                    "imagen": cadenaImagen
                }
                //arrayFotos.push(objetoImagen);
                //$scope.Fotos.push(objetoImagen);
            $scope.arrayIncidencias[idIncidencia].descripcion = descripcion;
            $scope.arrayIncidencias[idIncidencia].fotos.push(objetoImagen);
        }
    }
    $scope.elegirFoto = function(idIncidencia, descripcion) {
            if (window.cordova) {
                // *- Solo Movil -*
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    var cadenaImagen = "data:image/jpeg;base64," + imageData;
                    var contador = $scope.arrayIncidencias[idIncidencia].Fotos.length + 1;
                    var objetoImagen = {
                            "indice": contador,
                            "imagen": cadenaImagen
                        }
                        // Agregamos al array que corresponda
                        //arrayFotos.push(objetoImagen);
                    $scope.arrayIncidencias[idIncidencia].descripcion = descripcion;
                    $scope.arrayIncidencias[idIncidencia].Fotos.push(objetoImagen);
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            } else {
                // *- Solo navegador-*
                var cadenaImagen = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAiCAYAAABfqvm9AAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAyMCBKdWwgMjAwNSAxNDozOToyMyAtMDYwMOxAi/QAAAAHdElNRQfVBxQTLQGqMUy0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAA91JREFUeNqtVl9MW1UY/87t7UAoLazyQIAIOhRQg6iLmpBg4sLUkGEmoujDHjQmPhgTTcQH9zgTEl90cTH4MI3LwgLK+BsCEsQ5ogIi0I0ySmEghUL/0PYWSsvt8ftaWPhze1twX/K7Oee73/nd73x/zrkMYstDiFOIEoR+WychxhF9iBmlRUxBl4KoQ3yQqtVmPv7gccjV6yKG//r8YHI4QQqGXDhtQHyB8KkR5iOas3SpT398sgRqiwp4tgGdEzVRuy2ZL3l90GSeYV/+NQoLPukWaqsRZiXCE4j+irzcnKtVFdyYbmAQ2gKQ5b2f1AgAWi14vBKca++FVsvsCmpfQph2Ez6AuHk6P7e0raYKjokCeQOqImpA5hzeaOqElmkrefgcwitsv/40W5da+mPVyzwhsuj2QYP+XD5TwR9O1xei5jypiTAL8e4nz5dCpiGNKZGRJ680tQOr/2bfCxkMuhT22QvP0uwc5YAIX0zRirk1hQUAwdABsrEVB5xqbIVu67yyp7jm7GOP8IzkpEyKpYiPZ4qMxyFbn3YwAShPXb6mvvVwGIzo5ZOZRvhtwfYEeWjMTkvF7GkU7QuNGdB4pkKdVBAgJ01HI4MQTTVTLnGUyffehjeLCuLmiLEoARG6FyUpsczG3DbHLqKujJbN8KTDDTZSCMLhyQQGLr+fj2PyUEzEMOAPhWw/T2GvH9MenhC7pu3OLHMHNp046yfCRcR39YPD4PRKPFZyFAXb0Lce4BduDtHse4RlJxWUoj9fK8gvbq6u5BpKEZZDvK0CE/g717vZ1dt3rKg5iXDtuBNE9Jlda2ennW7968WPAmB3qIqohfc7etkPJjMF71XEXMTpXSYUg19NDletwCGp/ES+YqFHJDkJLv4xAhcGhwM4q0QM3YvCPtMlxOzA/GJ1eU4W5OHhCvK+rYsimJZX+Vst3SwUDn+Emp/2RELh+9dws1c+7BmAwGaQAztY8XV9v7P1ra1+HF46ENoYETpvWnV6vv17gu0pJSyRrmkrdFnv0uxzxVzFIKQAN3w9PAYbG4FdXnL4amiMBh2IwcMQklycXfNKnZY5Bloxcnjctjvgl7mFyLtYi9QIaWXbFdPUdjI00Gy2YNtyukZ7jkJI0nxjwQZuvD6p0DtnKBLQprYgHuENVyDg+ce+Cg4kHbNHDoAutQViHEJimBi1O8qoGzdleRmifw5HJiQZwRIqC4YjXTOB8P9fwluWNQ94g9Tu6t4lSnh3Hn8/7P51Gk/eD0LHkuSP3jsA8/GMEyH0BeUwnWXE6I1nnMgl4kGsb4+d98NDIrRB9IdqNZ7xf/Bfb26DeGc4AAAAAElFTkSuQmCC";
                var contador = $scope.arrayIncidencias[idIncidencia].Fotos.length + 1;
                var objetoImagen = {
                        "indice": contador,
                        "imagen": cadenaImagen
                    }
                    //arrayFotos.push(objetoImagen);
                    //$scope.Fotos.push(objetoImagen);
                $scope.arrayIncidencias[idIncidencia].descripcion = descripcion;
                $scope.arrayIncidencias[idIncidencia].Fotos.push(objetoImagen);
            }
        }
        // ***
});