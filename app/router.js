app.constant('ROUTERS', [

    {
        "ubigeox": {
            "url": "/ubigeox",
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/uno/layout.html"
                }
            },
            "loginRequired": false
        },
        "ubigeox.401_unauthorized": {
            "url": "/401_unauthorized",
            "data": {
                "page": "Error 401: unauthorized"
            },
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/401_unauthorized.html"
                }
            }
        },
        "ubigeox.dashboard": {
            "url": "/dashboard",
            "data": {
                "page": "Dashboard"
            },
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/dashboard.wall.html"
                }
            }
        },
        "ubigeox.ubigeo": {
            "url": "/ubigeo",
            "template": "<div ui-view ></div>"
        }
    },


    {
        "ubigeos": {
            "url": "/ubigeos",
            "data": {
                "section": "Ubigeo",
                "page": "ubigeos"
            },
            "templateUrl": "dist/views/ubigeos/index.html",
            "loginRequired": false
        },
        "ubigeo.ubigeo.ubigeosNew": {
            "url": "/cubigeos/new",
            "data": {
                "section": "Catálogo",
                "page": "Categorías"
            },
            "templateUrl": "dist/views/ubigeos/form.html"
        },
        "ubigeo.ubigeo.ubigeosEdit": {
            "url": "/ubigeos/:id/edit",
            "data": {
                "section": "Catálogo",
                "page": "Categorías"
            },
            "templateUrl": "dist/views/ubigeos/form.html"
        }
    },

    {
        "ubigeo.ubigeo.paises": {
            "url": "/autores",
            "data": {
                "section": "Catálogo",
                "page": "Autores"
            },
            "templateUrl": "dist/views/autores/index.html"
        },
        "ubigeo.ubigeo.autoresNew": {
            "url": "/autores/new",
            "data": {
                "section": "Catálogo",
                "page": "Autores"
            },
            "templateUrl": "dist/views/autores/form.html"
        },
        "ubigeo.ubigeo.autoresEdit": {
            "url": "/autores/:id/edit",
            "data": {
                "section": "Catálogo",
                "page": "Autores"
            },
            "templateUrl": "dist/views/autores/form.html"
        }

    }


]);
