*Postgres*

Este proyecto utiliza Java para conectarse a una base de datos PostgreSQL mediante JDBC.

## <ins>Requisitos</ins>
PostgreSQL
JDBC Driver para PostgreSQL
IDE: IntelliJ
bun
npm 

## <ins>AJUSTES</ins>
1. Para poder correr el servidor, es necesario instalar bun desde la terminal
`bun install`
2. También es necesario instalar node
`npm install`
3. Crea un archivo `.env` en la raíz del proyecto
`env:
DATABASE_URL=postgres://postgres:1234@localhost:5432/dvdrental
`
## <ins>PROCEDIMIENTO</ins>
1. Ejecutar el proyecto con Bun
   "Para ejecutar el proyecto usar desde la terminal:
   `bun run server.ts`
   Esto significa que tu proyecto está desarrollado en JavaScript o TypeScript y utiliza el runtime llamado “Bun” (una alternativa a Node.js).
   El comando bun run server.ts inicia el servidor definido en el archivo server.ts.
   Debes abrir una terminal, situarte en la carpeta del proyecto y ejecutar ese comando para que tu aplicación empiece a funcionar.
2. Base de datos necesaria
   es necesario tener la base de datos de dvdrental

(https://neon.tech/postgresqltutorial/dvdrental.zip) contiene un archivo comprimido con los datos y la estructura de esa base de datos.
Debes descargar el archivo, descomprimirlo y restaurarlo en tu servidor de base de datos PostgreSQL antes de iniciar el proyecto.
Esto asegura que la aplicación tenga los datos necesarios para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).


3. Probar el CRUD con Insomnia o Postman
   "Para probar el CRUD se puede usar Insomnia o Postman"

CRUD se refiere a las operaciones principales que puedes hacer con los datos: Crear (Create), Leer (Read), Actualizar (Update) y Eliminar (Delete).
Insomnia y Postman son herramientas para enviar peticiones HTTP (como GET, POST, PUT, DELETE) a tu servidor y comprobar que el API funciona correctamente.
Puedes usarlas para interactuar con tu servidor y verificar que las operaciones de tu aplicación funcionan bien (por ejemplo, agregar un nuevo registro, obtener información, modificarla o eliminarla).

No se puede hacer directamente desde el navegador.
Puedes usar herramientas como Postman, Insomnia, o curl desde la terminal.
En Postman/Insomnia, selecciona el método GET, POST, PUT, DELETE y pon la URL http://localhost:3000/films/5 y haz la petición.

### Actores (/actors)
1. GET /actors
Obtiene la lista de todos los actores.
Ejemplo: solo visitas /actors.

2. GET /actors/{id}
Obtiene un actor específico por su ID.
Ejemplo: /actors/3 devuelve el actor con ID 3.
![img.png](img.png)
3. POST /actors
Crea un nuevo actor.
Ejemplo: al enviar un cuerpo con nombre y apellido ({"first_name": "Jane", "last_name": "Doe"}) se agrega un nuevo actor.

Pasos en Postman:
Abre Postman y crea una nueva petición.
Selecciona el método POST.
Escribe la URL: http://localhost:3000/actors
Ve a la pestaña Body, marca raw y selecciona JSON.
Pega el JSON.
Haz clic en Send.
![img_1.png](img_1.png)
verificacion
![img_2.png](img_2.png)
4. PUT /actors/{id}
Actualiza un actor existente por su ID.
Ejemplo: /actors/3 con un cuerpo de datos actualizados.
   Actualizar un Actor con PUT en Postman
   Supongamos que quieres actualizar el actor con ID 3 y cambiar su nombre.

1. Método
   Selecciona PUT como método.

2. URL
   Pon la URL con el ID del recurso que vas a actualizar. Por ejemplo:

Code
http://localhost:3000/actors/3
3. Headers
   Agrega el encabezado:

Key: Content-Type
Value: application/json
4. Body
   Selecciona raw y luego JSON.
   Escribe los datos que deseas actualizar (ejemplo):

JSON
`{
"first_name": "Alejandro",
"last_name": "Martinez"
}`
5. Envía la petición
   Haz clic en Send.
![img_3.png](img_3.png)
verificacion
![img_4.png](img_4.png)
---------------------------------------------
5. DELETE /actors/{id}
Elimina un actor por su ID.
Ejemplo: /actors/201 elimina el actor con ID 201.
![img_5.png](img_5.png)
verificacion
![img_6.png](img_6.png)


### Películas (`/films`)

1. GET /films

Descripción: Obtener todas las películas.
Ejemplo de uso: Solo necesitas llamar a /films para listar todas las películas almacenadas.
2. GET /films/{id}

Descripción: Obtener los datos de una película específica por su ID.
Ejemplo de uso: /films/1 te da la información de la película con ID 1.
3. POST /films

Descripción: Crear una nueva película.
Ejemplo de uso: Envías una petición con los datos de la nueva película (por ejemplo, título, descripción, año de estreno) en el cuerpo (body) de la petición.
4. PUT /films/{id}

Descripción: Actualizar la información de una película existente.
Ejemplo de uso: /films/1 junto con el nuevo body (por ejemplo, un nuevo título) actualiza la película con ID 1.
5. DELETE /films/{id}

Descripción: Eliminar una película por su ID.
Ejemplo de uso: /films/9 eliminará la película con ID 9.










