Breve explicacion de las dependecias

    "bcrypt-nodejs":        Utilizado para poder encriptar las contraseñas
    "body-parser":          Utilizado para poder capturar desde el back lo que envia el fron y de manera contraria
    "connect-multiparty":   Poder implementar Middlewere, Uploads de ficheros
    "express":              Framework HTTP para poder generar las rutas
    "jwt-simple":           Para poder generar Tokken para la seguridad y autenticacion
    "moment":               Poder generar o capturar fechas
    "mongoose":             El ORM que es el encargado de la comunicacion entre NodeJS y MongoDB

    "nodemon":              Esta depedencia es la encargada de cada vez que se haga un cambio en el front recargar                                                   nuevamente la vista, para asi poder tener todo actualizado sin tener que estar cortando                                                  la compilacion!! 


    Que es un middlewere
    Un middlewere es un metodo que se ejecuta antes de que la peticion llegue al controlador, desde vista se envian peticiones al controlador
    lo que hace un middlwere es hacer de intermediario con metodos que se definan, como por ejemplo modificar registros, crear o eliminar,
    por medio del middlewere verifico que la persona que este realizando cualquier peticion al controlador este correctamente autentificado 
    y tenga los permisos necesarios.


    //****************************///////************************////////****************************///////*****************//

                                                ¡¡¡¡¡¡COMO HACER FUNCIONAR EL PROYECTO!!!!!!
        ***** REQUERIMIENTOS

        ** Tener instaldo NodeJs
        <--Se descarga acá--> https://nodejs.org/es/ --> Por recomendacion descargar la version LTS

        ** Tener instalado la consola de comando git-bash o cualquier otra consola de comando
        Para descargar git-bash
        <--Se descarga acá--> https://git-scm.com/downloads

        ** Tener instalado un editor de codigo, personalmente se recomienda visual studio code
        <--Se descarga acá--> https://visualstudio.microsoft.com/downloads/?rr=https%3A%2F%2Fwww.google.com%2F
                                     descargar la version free "Visual Studio Code"

        ** Instalar el MongoDB
        <--Se descarga acá--> https://www.mongodb.com/download-center#community
        ** Luego de instalar el mongodb tenemos que ir a disco local C y creamos 2 carpetas una llamada "data" y dentro de esa creamos otra que se llame "db" **

        ** instalar el robot 3T 
        <--Se descarga acá--> https://robomongo.org/ ****** ¡¡¡OJO!!! Descargar la opcion "Robo 3T" NO "Studio 3T"
         
        ** instalar el postman
        <--Se descarga acá-->  https://app.getpostman.com/app/download/win64?_ga=2.200281774.1060200135.1535829236-1128931911.1535829236


        ***** COMPLEMENTOS RECOMENDADOS (Para visual studio)
        Si se instalo el editor de texto visual estudio es recomendable instalar estas extensiones que facilitan la escritura del codigo
         ** npm Intellisense
         ** TypeScript Import
         ** vscode-faker
         ** Angular 6 Snippets - TypeScript, Html, Angular Material, ngRx, RxJS & Flex Layout
         ** Beatify
         *** Integrar la consola de comando en el editor de texto ***
                ** file->preferences->settings
                saldra una barra negra en la cual escribiremos "shell"
                bajamos la barra de navegacion hasta encontrar -->> "terminal.integrated.shell.windows"
                buscamos el icono del lapiz (lado izquierdo) para poder editar y se abrira en el lado derecho un documento
                en ese documento buscaremos esta linea -->   "terminal.integrated.shell.windows"
                en frente de esa linea copiaremos la ruta donde se encuentra el .exe de la aplicacion de consola que acabamos de instalar, si la consola que instalo fue git-bash esta normalmente se encuentra en esta ruta:
                "C:\\Users\\USUARIO\\AppData\\Local\\Programs\\Git\\bin\\bash.exe"
                        El usuario es el nombre del administrador del sistema
                ****** Tener en cuenta que la carpeta "AppData" normalmente se encuetra como oculta *****




        ****EL BACKEND ----
                El backend se encuentra dentro de la carpeta "API" 
                para hacer funcionar realizar los siguientes pasos:
                ** Pararse en el directorio raiz de la carpeta --->>> Red_Social_Angular/api
                ** introducir el comando ---->>> npm update 
                ** Luego introducir el comando ---->>>  npm install
                *** ¡¡Esperar a que termine de instalar los paquetes/librerias/dependencias!! ***
                ** luego se introduce el comando --->>> npm start
                ** al introducir este comando nos debe mostrar unas lineas en las cuales se pueden ver estas
                ***
                Conexion a la base de datos se ha realiazado con exito!!
                Conexion al servidor establecida con exito!!
                ***
                si nos muestra esto significa que todo anda bien

    
        ****EL FRONTEND
                El frontend se encuentra dentro de la carpeta "CLIENT"
                para hacer funcionar realizar los siguientes pasos:
                ** Pararse en el directorio raiz de la carpeta --->>> Red_Social_Angular/client
                ** instalar el angular cli
                    para hacer esto en la consola, parados en la raiz del directorio escribimos
                   ******     npm install -g @angular/cli@latest    ******
                ** Luego introducir el comando ---->>>  npm update
                ** Luego introducir el comando ---->>>  npm install
                ** luego se introduce el comando --->>> npm start
                ** Si todo ha salido bien,nos mostrara un mensaje "Compied successfully" y podriamos dirigirnos a la siguiente direccion
                http://localhost:4200/
                