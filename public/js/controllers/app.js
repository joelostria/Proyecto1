var app = angular.module('myApp', ['ngRoute','angular-loading-bar']);

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    }]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'inicio',
  })
  .when('/users', {
    templateUrl : 'users',
    controller  : 'UsersController'
  })
  .when('/areas', {
    templateUrl : 'areas',
    controller  : 'AreasController'
  })
  .when('/preguntas', {
    templateUrl : 'preguntas',
    controller  : 'SimuladorController'
  })
  .when('/preguntas/create', {
    templateUrl : 'preguntas/create',
    controller  : 'SimuladorController'
  })
   .when('/preguntas/:preguntaId/edit', {
    templateUrl : 'preguntas/preguntaId/edit',
    controller  : 'SimuladorController',
    id:'preguntaId'
  })
  .when('/contenido', {
    templateUrl : 'contenido',
    controller  : 'ContenidoCursoController'
  })
  .when('/contenido/create', {
    templateUrl : 'contenido/create',
    controller  : 'ContenidoCursoController'
  })
  .when('/pagos', {
    templateUrl : 'pagos',
    controller  : ''
  })
  .otherwise({redirectTo: '/'});

});

app.controller("UsersController",function($scope, $http){
  //$scope.mostrarCargando = true;

  /* filtro x primera letra */
  $scope.startsWith =function(actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };

  console.log("UsersController");
  $scope.users = [];
  $scope.newUser = [];
  $scope.editUser = [];
  $scope.message = "";
  $scope.message_error = "";

  $http.get("http://localhost:8000/getUsers")
    .then(function(data){
      console.log(data);
      $scope.users = data.data;
      //$scope.mostrarCargando = false;
    },
    function(err){
      console.log(err);
      //alert("error");
    });

    $scope.setUser = function(){
    $http.post("http://localhost:8000/setUsers",{
      name: $scope.newUser.name,
      email: $scope.newUser.email,
      password: $scope.newUser.password
    })
    .then(function(data,status,headers,config){
      //console.log($scope.newUser);
      console.log(data);
      $scope.message = "¡Usuario "+$scope.newUser.name+" agregado satisfactoriamente!";
      //$scope.message = "Usuario agregado satisfactoriamente."
      $scope.users = data.data;
      /*$scope.users.push($scope.newUser);*/
      $scope.newUser = {};
    },
    function(err){
      console.log(err);
      $scope.message_error = err.data.errors;
      $scope.message = "";
      //alert("error");
    });
    }

    $scope.selectUser = function(user){
    console.log(user);
    //alert(user);
    $scope.editUser = user;
    //$scope.users.push($scope.newUser);
    //$scope.users.splice($scope.user);
    //$scope.users.splice($user, 1);
  }

  $scope.updateUser = function(dato){
    //$scope.editUser = user;
    $http.put("http://localhost:8000/updateUsers/"+dato,{
      name: $scope.editUser.name,
      email: $scope.editUser.email,
    })
    .then(function(data,status,headers,config){
             // success callback
             // alert('llego aqui');
             console.log(data);
             $scope.message = "¡Usuario "+$scope.editUser.name+" editado satisfactoriamente!";
             //$scope.message = "Usuario editado satisfactoriamente."
             $scope.message_error = "";
    },
    function(err){
      alert("error");
      $scope.message = err.data;
    });
    }

  $scope.deleteUser = function(dato){
    $http.delete("http://localhost:8000/deleteUsers/"+dato)
    .then(function(data,status,headers,config){
             // success callback
             //alert('llego aqui');
             //elimina en tiempo real
             $scope.users.splice($scope.users.indexOf($scope.editUser), 1);
             console.log(data);
             $scope.message = "¡Usuario "+$scope.editUser.name+" eliminado satisfactoriamente!";
             //$scope.message = "Usuario eliminado satisfactoriamente."
    },
    function(err){
      alert("error");
    });
  };

  $scope.clearMessage = function(){
    $scope.message = "";
    $scope.message_error = "";
  };
  });


/********************ContenidoCursoController********************/

app.controller("ContenidoCursoController",function($scope, $http, $location){

  /* filtro x primera letra */
  $scope.startsWith =function(actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };

  //$scope.mostrarCargando = true;
  console.log("ContenidoCursoController");
  $scope.contenidos = [];
  $scope.newContenido = [];
  $scope.editContenido = [];
  $scope.message = "";
  $scope.message_error = "";

  $http.get("http://localhost:8000/getContenidos")
    .then(function(data){
      console.log(data);
      $scope.contenidos = data.data;
      //$scope.mostrarCargando = false;
    },
    function(err){
      console.log(err);
      //alert("error");
    });


    $http.get("http://localhost:8000/getAreas")
    .then(function(data){
      console.log(data);
      $scope.areas = data.data;
      //$scope.mostrarCargando = false;
    },
    function(err){
      console.log(err);
      //alert("error");
    });

    $scope.setContenido = function(){
      var fd = new FormData();
      //var areaCon = $scope.newArea.area_conocimiento;
      var titulo = $scope.newContenido.titulo;
      fd.append('titulo', titulo);
      var area_id = $scope.newContenido.id;
      fd.append('area_id', area_id);
      var descripcion = $scope.newContenido.descripcion;
      fd.append('descripcion', descripcion);

      var informacion = $scope.newContenido.informacion;
      fd.append('informacion', informacion);

      var video = $scope.newContenido.video;
      fd.append('video', video);


      var actividad = $scope.newContenido.actividad;
      fd.append('actividad', actividad);

      console.log(actividad);

      var formato = $scope.newContenido.formato;
      fd.append('formato', formato);


      var mochila = $scope.newContenido.mochila;
      fd.append('mochila', mochila);



      //var infoGen = $scope.newArea.informacion_general;
      //var areaCon = $scope.newArea.area_conocimiento;
      //var areaImg = $scope.newArea.imagen_general;

      //alert(infoGen);
      //var vidGen = $scope.newArea.video_general;
      //var imgGen = $scope.newArea.imagen_general;
      //fd.append('area_conocimiento', areaCon);
      ///fd.append('informacion_general',infoGen);
      //fd.append('area_conocimiento', areaCon);
      //fd.append('video_general',vidGen);
      //fd.append('imagen_general',imgGen);

      $http.post("http://localhost:8000/setContenidos", fd,{
      /*area_conocimiento: $scope.newArea.area_conocimiento,
      informacion_general: $scope.newArea.informacion_general,
      video_general: $scope.newArea.video_general*/
      file: angular.identity,
      headers: {'Content-Type': undefined},
      //area_conocimiento: $scope.newArea.area_conocimiento,
    })
    .then(function(data,status,headers,config){
      //console.log($scope.newUser);
      console.log(data);
      $scope.message = "Contenido de curso "+$scope.newContenido.titulo+" agregado satisfactoriamente!";
      //$scope.message = "Usuario agregado satisfactoriamente."
      $scope.contenidos = data.data;
      /*$scope.users.push($scope.newUser);*/
      /*$scope.newArea.area_conocimiento = null;*/
      $scope.newContenido = {};

      $location.path("/contenido");
    },
    function(err){
      console.log(err);
      $scope.message_error = err.data.errors;
      $scope.message = "";
      //alert("error");
    });
    }

    $scope.selectContenido = function(contenido){
    console.log(contenido);
    //alert(user);
    $scope.editContenido = contenido;
    //$scope.users.push($scope.newUser);
    //$scope.users.splice($scope.user);
    //$scope.users.splice($user, 1);
  }

  $scope.updateArea = function(dato){
    //$scope.editUser = user;
    $http.put("http://localhost:8000/updateAreas/"+dato,{
      area_conocimiento: $scope.editArea.area_conocimiento,
    })
    .then(function(data,status,headers,config){
             // success callback
             //alert('llego aqui');
             console.log(data);
             $scope.message = "¡Area "+$scope.editArea.area_conocimiento+" editada satisfactoriamente!";
             //$scope.message = "Usuario editado satisfactoriamente."
             $scope.message_error = "";
    },
    function(err){
      alert("error");
      $scope.message = err.data;
    });
    }

    $scope.deleteContenido = function(dato){
    $http.delete("http://localhost:8000/deleteContenidos/"+dato)
    .then(function(data,status,headers,config){
             // success callback
             //alert('llego aqui');
             //elimina en tiempo real
             $scope.contenidos.splice($scope.contenidos.indexOf($scope.editContenido), 1);
             console.log(data);
             $scope.message = "¡Contenido de curso "+$scope.editContenido.titulo+" eliminado satisfactoriamente!";
             //$scope.message = "Usuario eliminado satisfactoriamente."
    },
    function(err){
      alert("error");
    });
    };

    $scope.clearMessage = function(){
      $scope.message = "";
      $scope.message_error = "";
    };
    })


/********************AreasController********************/

/* falta agregar files js */

app.controller("AreasController",function($scope, $http){
  //$scope.mostrarCargando = true;
  console.log("AreasController");
  $scope.areas = [];
  $scope.newArea = [];
  $scope.editArea = [];
  $scope.message = "";
  $scope.message_error = "";

  $http.get("http://localhost:8000/getAreas")
    .then(function(data){
      console.log(data);
      $scope.areas = data.data;
      //$scope.mostrarCargando = false;
    },
    function(err){
      console.log(err);
      //alert("error");
    });

    $scope.setArea = function(){
      var fd = new FormData();
      //var areaCon = $scope.newArea.area_conocimiento;
      var infoGen = $scope.newArea.informacion_general;
      var areaCon = $scope.newArea.area_conocimiento;
      //var areaImg = $scope.newArea.imagen_general;

      alert(infoGen);
      var vidGen = $scope.newArea.video_general;
      var imgGen = $scope.newArea.imagen_general;
      //fd.append('area_conocimiento', areaCon);
      fd.append('informacion_general',infoGen);
      fd.append('area_conocimiento', areaCon);
      fd.append('video_general',vidGen);
      fd.append('imagen_general',imgGen);

      $http.post("http://localhost:8000/setAreas", fd,{
      /*area_conocimiento: $scope.newArea.area_conocimiento,
      informacion_general: $scope.newArea.informacion_general,
      video_general: $scope.newArea.video_general*/
      file: angular.identity,
      headers: {'Content-Type': undefined},
      //area_conocimiento: $scope.newArea.area_conocimiento,
    })
    .then(function(data,status,headers,config){
      //console.log($scope.newUser);
      console.log(data);
      $scope.message = "¡Area "+$scope.newArea.area_conocimiento+" agregada satisfactoriamente!";
      //$scope.message = "Usuario agregado satisfactoriamente."
      $scope.areas = data.data;
      /*$scope.users.push($scope.newUser);*/
      /*$scope.newArea.area_conocimiento = null;*/
      $scope.newArea = {};
    },
    function(err){
      console.log(err);
      $scope.message_error = err.data.errors;
      $scope.message = "";
      //alert("error");
    });
    }

    $scope.selectArea = function(area){
    console.log(area);
    //alert(user);
    $scope.editArea = area;
    //$scope.users.push($scope.newUser);
    //$scope.users.splice($scope.user);
    //$scope.users.splice($user, 1);
  }

  $scope.updateArea = function(dato){
    //$scope.editUser = user;
    $http.put("http://localhost:8000/updateAreas/"+dato,{
      area_conocimiento: $scope.editArea.area_conocimiento,
    })
    .then(function(data,status,headers,config){
             // success callback
             //alert('llego aqui');
             console.log(data);
             $scope.message = "¡Area "+$scope.editArea.area_conocimiento+" editada satisfactoriamente!";
             //$scope.message = "Usuario editado satisfactoriamente."
             $scope.message_error = "";
    },
    function(err){
      alert("error");
      $scope.message = err.data;
    });
    }

    $scope.deleteArea = function(dato){
    $http.delete("http://localhost:8000/deleteAreas/"+dato)
    .then(function(data,status,headers,config){
             // success callback
             //alert('llego aqui');
             //elimina en tiempo real
             $scope.areas.splice($scope.areas.indexOf($scope.editArea), 1);
             console.log(data);
             $scope.message = "¡Area "+$scope.editArea.area_conocimiento+" eliminada satisfactoriamente!";
             //$scope.message = "Usuario eliminado satisfactoriamente."
    },
    function(err){
      alert("error");
    });
    };

    $scope.clearMessage = function(){
      $scope.message = "";
      $scope.message_error = "";
    };
    })

    /*************************SimuladorController***************************/

    app.controller("SimuladorController",function($scope, $http, $location,$routeParams){
    /*---------------------------Funciones agregadas****************/
    $scope.editVar=$routeParams.preguntaId;//<-Recibe el parametro para editar las preguntas->
    console.log($scope.editVar);
      /* filtro x primera letra */
      $scope.startsWith =function(actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
      };
      console.log("SimuladorController");
      $scope.pregunta=[];
      $scope.preguntas = [];
      $scope.niveles = [];
      $scope.respuesta = [];
      $scope.respuestas = [];
      $scope.newPregunta = [];
      $scope.editPregunta = [];
      $scope.message = "";
      $scope.message_error = "";
      $scope.examenes = [];


      $http.get("http://localhost:8000/getPreguntas")
        .then(function(data){
          console.log(data);
          $scope.preguntas = data.data;
          console.log($scope.preguntas);
          //$scope.mostrarCargando = false;
        },
        function(err){
          console.log(err);
          //alert("error");
        });


        $http.get("http://localhost:8000/getNiveles")
        .then(function(data){
          console.log(data);
          $scope.niveles = data.data;
          //$scope.mostrarCargando = false;
        },
        function(err){
          console.log(err);
          //alert("error");
        });
        /*<-Funcion que recibe las preguntas para editar->*/
        $http.get("http://localhost:8000/getPreguntas2/"+$scope.editVar)
        .then(function(data){
          console.log(data);
          $scope.pregunta=data.data;
          //$scope.mostrarCargando = false;
        },
        function(err){
          console.log(err);
          //alert("error");
        });
        /*<-----------------------Funcion que recibe las respuestas ---------------------->*/
        $http.get("http://localhost:8000/getPreguntas1/"+$scope.editVar)
        .then(function(data){
          console.log(data);
          $scope.respuesta = data.data;
          $scope.respuesta[0].correcta=0;
          $scope.respuesta[1].correcta=0;
          $scope.respuesta[2].correcta=0;
          $scope.respuesta[3].correcta=0;

          //$scope.mostrarCargando = false;
        },
        function(err){
          console.log(err);
          //alert("error");
        });


      $scope.setPregunta = function(){
        $http.post("http://localhost:8000/setPreguntas",{
          pregunta: $scope.newPregunta.pregunta,
          respuesta: $scope.respuestas = [
            $scope.newPregunta.respuesta1,
            $scope.newPregunta.respuesta2,
            $scope.newPregunta.respuesta3,
            $scope.newPregunta.respuesta4,
          ],
          correcta: $scope.correcta = [
            $scope.newPregunta.correcta1,
            $scope.newPregunta.correcta2,
            $scope.newPregunta.correcta3,
            $scope.newPregunta.correcta4,
          ],
          examen_id: $scope.newPregunta.miTipoExamen,

          /*respuesta1: $scope.newPregunta.respuesta1,
          respuesta2: $scope.newPregunta.respuesta2,*/
          //respuesta3: $scope.newPregunta.respuesta3,
          /*email: $scope.newUser.email,
          password: $scope.newUser.password*/
        })
        .then(function(data,status,headers,config){
          //console.log($scope.newUser);
          console.log(data);
          $scope.message = "¡Pregunta agregada satisfactoriamente!";
          //$scope.message = "Usuario agregado satisfactoriamente."
          $scope.newPregunta = data.data;
          /*$scope.users.push($scope.newUser);*/
          $scope.newPregunta = {};

          $location.path("/preguntas");

        },
        function(err){
          console.log(err);
          $scope.message_error = err.data.errors;
          $scope.message = "";
          //alert("error");
        });
      }

      $scope.selectExamen = function(examen){
    alert('hola mundo');
    //alert(user);
    //$scope.editUser = user;
    //$scope.users.push($scope.newUser);
    //$scope.users.splice($scope.user);
    //$scope.users.splice($user, 1);
  }


      $scope.selectPregunta = function(pregunta){
        console.log(pregunta);
        //alert(user);
        $scope.editPregunta = pregunta;
        $location.url('/preguntas/' + $scope.editPregunta.id + '/edit');


        console.log(pregunta);
        console.log($scope.editPregunta.id);
        $scope.editVar=$scope.editPregunta;
        //$scope.users.push($scope.newUser);
        //$scope.users.splice($scope.user);
        //$scope.users.splice($user, 1);
        $http.get("http://localhost:8000/getPreguntas1/"+$scope.editPregunta.id)
        .then(function(data){
          console.log(data);
          $scope.editVar = $scope.editPregunta.id;
          //$scope.mostrarCargando = false;
        },
        function(err){
          console.log(err);
          //alert("error");
        });


      }
/*<-------------------Funcion que manda los datos para actualizar las preguntas--------->*/
      $scope.updatePregunta = function(dato){
        $scope.newPregunta.correcta1=0;
        $scope.newPregunta.correcta2=0;
        $scope.newPregunta.correcta3=0;
        $scope.newPregunta.correcta4=0;
        $scope.newPregunta.respuesta1=$scope.respuesta[0].respuesta;
        $scope.newPregunta.respuesta2=$scope.respuesta[1].respuesta;
        $scope.newPregunta.respuesta3=$scope.respuesta[2].respuesta;
        $scope.newPregunta.respuesta4=$scope.respuesta[3].respuesta;
        $scope.newPregunta.correcta1=$scope.respuesta[0].correcta;
        $scope.newPregunta.correcta2=$scope.respuesta[1].correcta;
        $scope.newPregunta.correcta3=$scope.respuesta[2].correcta;
        $scope.newPregunta.correcta4=$scope.respuesta[3].correcta;
        //$scope.editUser = user;
        $http.put("http://localhost:8000/update/"+dato,{
          pregunta: $scope.pregunta.pregunta,
          respuesta: $scope.respuestas = [
            $scope.newPregunta.respuesta1,
            $scope.newPregunta.respuesta2,
            $scope.newPregunta.respuesta3,
            $scope.newPregunta.respuesta4,
          ],
          correcta: $scope.correcta = [
            $scope.newPregunta.correcta1,
            $scope.newPregunta.correcta2,
            $scope.newPregunta.correcta3,
            $scope.newPregunta.correcta4,
          ],
          examen_id: $scope.newPregunta.miTipoExamen ,
        })
        .then(function(data,status,headers,config){
                 // success callback
                 //alert('llego aqui');
                 console.log($scope.newPregunta);
                 console.log(data);
                 $scope.message = "Pregunta editada satisfactoriamente!";
                 //$scope.message = "Usuario editado satisfactoriamente."
                 $scope.message_error = "";
                 $location.path("/preguntas");
        },
        function(err){
          alert("Llene todos los campos");
          $scope.message = err.data;
        });
        }


      $scope.selectPreguntadelete = function(pregunta){
        console.log(pregunta);
        $scope.editPregunta = pregunta;
      }

      $scope.deletePregunta = function(dato){
        $http.delete("http://localhost:8000/deletePreguntas/"+dato)
        .then(function(data,status,headers,config){
                 // success callback
                 //alert('llego aqui');
                 //elimina en tiempo real
                 $scope.preguntas.splice($scope.preguntas.indexOf($scope.editPregunta), 1);
                 console.log(data);
                 $scope.message = "¡Pregunta eliminada satisfactoriamente!";
                 //$scope.message = "Usuario eliminado satisfactoriamente."
        },
        function(err){
          alert("error");
        });
        };


        $scope.clearMessage = function(){
          $scope.message = "";
          $scope.message_error = "";
        };

        $scope.myFunc = function($dato) {

          $http.get("http://localhost:8000/examenes/"+$dato)

            .then(function(data,response,status){
              console.log(data);
              $scope.examenes = data.data;
              //$scope.mostrarCargando = false;
            },
            function(err){
              console.log(err);
              //alert("error");
            });
        }

    })

    //Directiva file-model
    .directive('fileModel', function($parse){
      return {
        restrict: 'A', //Restricción si coincide con el nombre del atributo
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          element.bind('change', function(){
            scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
            });//apply
          });//bind
        }//link
      }//return
    });//directive


     //directiva ng-file
   app.directive('ngFileMultiple', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileMultiple);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name
                        name: item.name,
                        //File Size
                        size: item.size,
                        //File URL to view
                        url: URL.createObjectURL(item),
                        // File Input Value
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
 }]);//directive
