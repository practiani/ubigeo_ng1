/**
 * catalogo_web - Un cliente OAuth2
 * @author practian
 * @version v1.0.0
 * @link 
 * @license ISC
 */
var app = angular.module("catalogo", [ "ui.router", "ngResource" ]);

app.constant("authUrl", "http://localhost:7001");

app.constant("apiUrl", "http://localhost:8004");

app.constant("homeUrl", "http://localhost:9001");

app.config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}).config(function($stateProvider, $urlRouterProvider, $locationProvider, ROUTERS) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "/app/views/layouts/home.html",
        loginRequired: false
    });
    ROUTERS.forEach(function(collection) {
        for (var routeName in collection) {
            $stateProvider.state(routeName, collection[routeName]);
        }
    });
});

app.run(function($rootScope, $state, $stateParams, $window) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.constant("ROUTERS", [ {
    ubigeox: {
        url: "/ubigeox",
        views: {
            "": {
                templateUrl: "dist/views/layouts/uno/layout.html"
            }
        },
        loginRequired: false
    },
    "ubigeox.401_unauthorized": {
        url: "/401_unauthorized",
        data: {
            page: "Error 401: unauthorized"
        },
        views: {
            "": {
                templateUrl: "dist/views/layouts/401_unauthorized.html"
            }
        }
    },
    "ubigeox.dashboard": {
        url: "/dashboard",
        data: {
            page: "Dashboard"
        },
        views: {
            "": {
                templateUrl: "dist/views/layouts/dashboard.wall.html"
            }
        }
    },
    "ubigeox.ubigeo": {
        url: "/ubigeo",
        template: "<div ui-view ></div>"
    }
}, {
    ubigeos: {
        url: "/ubigeos",
        data: {
            section: "Ubigeo",
            page: "ubigeos"
        },
        templateUrl: "dist/views/ubigeos/index.html",
        loginRequired: false
    },
    "ubigeo.ubigeo.ubigeosNew": {
        url: "/cubigeos/new",
        data: {
            section: "Catálogo",
            page: "Categorías"
        },
        templateUrl: "dist/views/ubigeos/form.html"
    },
    "ubigeo.ubigeo.ubigeosEdit": {
        url: "/ubigeos/:id/edit",
        data: {
            section: "Catálogo",
            page: "Categorías"
        },
        templateUrl: "dist/views/ubigeos/form.html"
    }
}, {
    "ubigeo.ubigeo.paises": {
        url: "/autores",
        data: {
            section: "Catálogo",
            page: "Autores"
        },
        templateUrl: "dist/views/autores/index.html"
    },
    "ubigeo.ubigeo.autoresNew": {
        url: "/autores/new",
        data: {
            section: "Catálogo",
            page: "Autores"
        },
        templateUrl: "dist/views/autores/form.html"
    },
    "ubigeo.ubigeo.autoresEdit": {
        url: "/autores/:id/edit",
        data: {
            section: "Catálogo",
            page: "Autores"
        },
        templateUrl: "dist/views/autores/form.html"
    }
} ]);

app.controller("CategoriaCtrl", function($scope, $state, $stateParams, catalogoService, $window, $mdDialog, $log, toastr) {
    $scope.fields = "name,codename";
    var params = {};
    $scope.lista = [];
    $scope.categoria = {};
    $scope.list = function(params) {
        $scope.isLoading = true;
        catalogoService.Categoria.query(params, function(r) {
            $scope.lista = r;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + " " + err.statusText);
        });
    };
    $scope.list(params);
    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };
    $scope.onReorder = function(order) {
        $log.log("Order: " + order);
    };
    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            catalogoService.Categoria.delete({
                id: d.id
            }, function(r) {
                $log.log("Se eliminó la categoría:" + JSON.stringify(d));
                toastr.success("Se eliminó la categoría " + d.nombre, "Categoría");
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + " " + err.statusText);
            });
        }
    };
}).controller("CategoriaSaveCtrl", function($scope, $state, $stateParams, catalogoService, $window, $mdDialog, $log, toastr) {
    $scope.categoria = {};
    $scope.sel = function() {
        catalogoService.Categoria.get({
            id: $stateParams.id
        }, function(r) {
            $scope.categoria = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + " " + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }
    $scope.save = function() {
        if ($scope.categoria.id) {
            catalogoService.Categoria.update({
                id: $scope.categoria.id
            }, $scope.categoria, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success("Se editó la categoría " + r.nombre, "Categoría");
                $state.go("catalogo.catalogo.categorias");
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + " " + err.statusText);
            });
        } else {
            catalogoService.Categoria.save($scope.categoria, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success("Se insertó la categoría " + r.nombre, "Categoría");
                $state.go("catalogo.catalogo.categorias");
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + " " + err.statusText);
            });
        }
    };
    $scope.cancel = function() {
        $state.go("catalogo.catalogo.categorias");
    };
});

app.controller("MainCtrl", function($scope) {
    $scope.app = {
        name: "Catálogo App",
        version: "1.0.1"
    };
});

app.controller("UbigeoCtrl", function($scope, $state, $stateParams, ubigeoService, $window, $log, $filter) {
    $scope.fields = "nombre";
    var params = {};
    $scope.lista = [];
    $scope.autor = {};
    $scope.list = function(params) {
        $scope.isLoading = true;
        ubigeoService.Ubigeo.query(params, function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
        });
    };
    $scope.list(params);
    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };
    $scope.onReorder = function(order) {
        $log.log("Order: " + order);
    };
    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            catalogoService.Autor.delete({
                id: d.id
            }, function(r) {
                $log.log("Se eliminó autor:" + JSON.stringify(d));
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
            });
        }
    };
}).controller("AutorSaveCtrl", function($scope, $state, $stateParams, catalogoService, $window, $log, $filter) {
    $scope.autor = {};
    $scope.sel = function() {
        catalogoService.Autor.get({
            id: $stateParams.id
        }, function(r) {
            $scope.autor = r;
            console.log("r.fecha_nac=" + r.fecha_nac);
            console.log("new Date(r.fecha_nac +' 00:00:00')=" + new Date(r.fecha_nac + " 00:00:00"));
            if (r.fecha_nac) $scope.autor.fecha_nacT = new Date(r.fecha_nac + " 00:00:00");
            console.log("$scope.autor.fecha_nacT=" + $scope.autor.fecha_nacT);
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }
    $scope.save = function() {
        if ($scope.autor.fecha_nacT) {
            $scope.autor.fecha_nac = $filter("date")(new Date($scope.autor.fecha_nacT), "yyyy-MM-dd");
        }
        if ($scope.autor.id) {
            catalogoService.Autor.update({
                id: $scope.autor.id
            }, $scope.autor, function(r) {
                $log.log("r: " + JSON.stringify(r));
                $state.go("catalogo.catalogo.autores");
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
            });
        } else {
            catalogoService.Autor.save($scope.autor, function(r) {
                $log.log("r: " + JSON.stringify(r));
                $state.go("catalogo.catalogo.autores");
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
            });
        }
    };
    $scope.cancel = function() {
        $state.go("catalogo.catalogo.autores");
    };
});

app.factory("ubigeoService", function($resource, apiUrl) {
    var url = apiUrl + "/api/ubigeo/";
    return {
        Pais: $resource(url + "paises/:id/", {
            id: "@id"
        }, {
            update: {
                method: "PUT"
            }
        }),
        Ubigeo: $resource(url + "ubigeos/:id/", {
            id: "@id"
        }, {
            update: {
                method: "PUT"
            },
            query: {
                method: "GET",
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results : angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options : {
                        count: 1,
                        pages: 1,
                        page: 1,
                        range: "all",
                        previous: null,
                        page_size: 1,
                        next: null
                    };
                    return {
                        results: results,
                        options: options
                    };
                }
            }
        })
    };
});