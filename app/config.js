app

//==================================
// para activar $resource https://docs.angularjs.org/api/ngResource/service/$resource
//==================================
.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
})





//==================================
// routers de la app
//==================================
.config(function($stateProvider, $urlRouterProvider, $locationProvider, ROUTERS) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    //==================================
    // Página principal
    //==================================
        .state('home', {
        url: '/home',
        templateUrl: '/app/views/layouts/home.html',
        loginRequired: false
    });


    //====================================================
    // Routers dinámicos de la app, ver router.js
    //====================================================
    ROUTERS.forEach(function(collection) {
        for (var routeName in collection) {
            $stateProvider.state(routeName, collection[routeName]);
        }
    });

    //console.log("access_token=" + localStorage.getItem("access_token")); //se llena en la segunda, se tiene que hacer F5
    //var collectionr = localStorage.getItem("collection"); //se llena en la segunda, se tiene que hacer F5

});




app

//====================================================
// Permite acceder a $state and $stateParams desde cualquier parte de la pp
//====================================================
    .run(function($rootScope, $state, $stateParams, $window) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;


})
;
