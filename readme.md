# PreEntrega 1 - Juan Ignacio Armas

## Programación Backend II: Diseño y Arquitectura Backend - Comisión 70370

## Descripción del Proyecto

Se implementará en el proyecto ecommerce facilitado al inicio del curso un CRUD de usuarios, junto con un sistema de Autorización y Autenticación


## Se debe entregar

- Crear un modelo User el cual contará con los campos:
    - first_name:String,
    - last_name:String,
    - email:String (único)
    - age:Number,
    - password:String(Hash)
    - cart:Id con referencia a Carts
    - role:String(default:’user’)

- Encriptar la contraseña del usuario mediante el paquete bcrypt (Utilizar el método “hashSync”).
- Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios
- Implementar un sistema de login del usuario que trabaje con jwt.
- Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho token obtener el usuario asociado.  En caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.
- Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá en una respuesta sus datos (Asociados al JWT).

##  Formato
 - Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.

