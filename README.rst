########################################
catalogo_web
########################################

.. class:: no-web

    catalogo_web es un **Client application** construido en Angular para consumir los servicios de `Catalogo resource server`_ autorizado por el `Authorization server`_ cumpliendo así con una aplicación SSO.



    .. image:: https://github.com/practian-ioteca-project/catalogo_web/blob/master/media/doc/e3-client_app_catalogo_web.png
        :alt: HTTPie compared to cURL
        :width: 100%
        :align: center





.. contents::

.. section-numbering::

.. raw:: pdf

   PageBreak oneColumn


============
Installation
============

--------------
Requirements
--------------

* Angular 
* Angular Material 



-------------------
Development version
-------------------

Clone **latest development version** directly from github_:

.. code-block:: bash
    
    # Universal
    
    E:\dev>git clone https://github.com/practian-ioteca-project/catalogo_web.git

Instale las dependencias::

    E:\dev>cd catalogo_web
    E:\dev\catalogo_web>bower install

De ser necesario actualice su clientId::

    oauth2Service.clientId = "tu nuevo client_id";


Run the app in 9003 port::

	E:\dev\catalogo_web>npm install
	E:\dev\catalogo_web>gulp serve

	[09:22:36] Using gulpfile E:\dev\catalogo_web\gulpfile.js
	[09:22:36] Starting 'serve'...
	[09:22:36] Finished 'serve' after 93 ms
	[09:22:36] Server started http://localhost:9003

(Recomendado)Run the app in 9003 port with serve-browser-sync::

	E:\practian-ioteca-project\catalogo_web>gulp

	(node:1712) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
	[05:10:24] Using gulpfile E:\practian-ioteca-project\catalogo_web\gulpfile.js
	[05:10:24] Starting 'serve-browser-sync'...
	[05:10:26] Finished 'serve-browser-sync' after 2.61 s
	[05:10:26] Starting 'watch'...
	[05:10:26] Finished 'watch' after 28 ms
	[05:10:26] Starting 'default'...
	[05:10:26] Finished 'default' after 26 μs
	[BS] Access URLs:
	 -------------------------------
	    Local: http://localhost:9003
	 External: http://127.0.0.1:9003
	 -------------------------------
	[BS] Serving files from: ./


===========
Revise las configuraciones
===========

1. angular module app setting like this:

.. code-block:: bash


	var app = angular.module("catalogo", [
	    "pi.dynamicMenu",
	    "pi.oauth2",
	    "pi.appPagination",
	    "pi.tableResponsive",

	    'ui.router',
	    'ngResource',
	    'ngAnimate',
	    'ngAria',
	    'ngSanitize',
	    'ngMaterial',
	    'ngMdIcons',
	    'toastr',

	    'ngMessages',


	    'pascalprecht.translate',
	    'tmh.dynamicLocale',
	]);

2. Constantes de la app::

	// Authorization Server -> oauth2_backend_service
	app.constant("authUrl", "http://localhost:7001"); 

	// Resource Server -> catalogo
	app.constant("apiUrl", "http://localhost:8003"); 

3. Constantes opcionales de la app::

	// Página de inicio o de convergencia
	app.constant("homeUrl", "http://localhost:9001"); 




4. config.js file setting like this::

	app
		//====================================================
		// oauth2Service and menuService runing
		//====================================================
	.run(function(oauth2Service, menuService, $state, $rootScope, $location, authUrl, $window, userService) {

	    menuService.menuUrl = "menu.json";
	    //menuService.apiMenuUrl = "http://localhost:7001/api/oauth2_backend/usermenu/";
	    $rootScope.menu = menuService.getMenu();

	    oauth2Service.loginUrl = authUrl + "/o/authorize/";
	    oauth2Service.oidcUrl = authUrl + "/api/oauth2_backend/localuserinfo/";
	    oauth2Service.clientId = "RBzvAoW3dtySxnPob5TuQgINV3yITSVE5bevdosI"; //MYSQL
	    oauth2Service.scope = "catalogo"; //comentar si no está configurado
	    ...


====
Meta
====


-------
Licence
-------

BSD-3-Clause: `LICENSE <https://github.com/practian-ioteca-project/catalogo_web/blob/master/LICENSE>`_.



-------
Authors
-------

- Angel Sullon Macalupu (asullom@gmail.com)



-------
Contributors
-------

See https://github.com/practian-ioteca-project/catalogo_web/graphs/contributors

.. _github: https://github.com/practian-ioteca-project/catalogo_service
.. _Django: https://www.djangoproject.com
.. _Django REST Framework: http://www.django-rest-framework.org
.. _Django OAuth Toolkit: https://django-oauth-toolkit.readthedocs.io
.. _oauth2_backend: https://github.com/practian-reapps/django-oauth2-backend
.. _Authorization server: https://github.com/practian-ioteca-project/oauth2_backend_service
.. _Catalogo resource server: https://github.com/practian-ioteca-project/catalogo_service

