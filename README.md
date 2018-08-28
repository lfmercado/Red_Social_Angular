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