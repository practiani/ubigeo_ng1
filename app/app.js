var app = angular.module("catalogo", [
    

    'ui.router',
    'ngResource',
    
]);

//====================================================
// Constantes de la app
//====================================================
app.constant("authUrl", "http://localhost:7001"); // Authorization Server -> oauth2_backend_service
app.constant("apiUrl", "http://localhost:8004"); // Resource Server -> ubigeo

app.constant("homeUrl", "http://localhost:9001"); // Página de inicio o de convergencia



