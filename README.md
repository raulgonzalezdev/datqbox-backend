# Catálogo de productos

Este proyecto es un ejemplo de cómo crear un catálogo de productos en React utilizando GraphQL y Apollo Client. En este proyecto, los usuarios pueden ver una lista de productos y seleccionar un producto para ver sus detalles.

El servidor GraphQL proporciona datos de productos que se muestran en la aplicación cliente de React. Los datos del producto se organizan en tres tipos: simple, rentable y espacio. Cada tipo de producto tiene diferentes campos de datos que se muestran en la página de detalles del producto.

La aplicación de React utiliza Apollo Client para conectarse al servidor GraphQL y recuperar los datos de los productos. Se utiliza Google Maps para mostrar la ubicación del producto en el caso de los productos de espacio.

## Requerimientos

- Node.js instalado en el sistema.
- Conexión a Internet.

## Instalación

1. Clonar el repositorio: `git clone https://github.com/raulgonzalezdev/reto-uey.git`.
2. Navegar a la carpeta del proyecto: `cd reto-uey`.
3. Instalar las dependencias: `npm install`.
4. Iniciar el servidor GraphQL: `npm run start:server`. El servidor estará disponible en `http://localhost:4000/graphql`.
5. Iniciar la aplicación de React: `npm start`. La aplicación estará disponible en `http://localhost:3000`.

## Uso

La aplicación consta de dos componentes principales:

- `ProductList`: muestra una lista de productos. Los usuarios pueden hacer clic en un producto para ver sus detalles.
- `ProductDetails`: muestra los detalles de un producto seleccionado.

Cuando la aplicación se inicia, se muestra la lista de productos. Los usuarios pueden hacer clic en un producto para ver sus detalles en la página `ProductDetails`. Los detalles del producto se organizan en diferentes secciones dependiendo del tipo de producto. Si el producto es un espacio, se muestra un mapa de Google Maps con la ubicación del espacio.

## Tecnologías utilizadas

- React: biblioteca de JavaScript para construir interfaces de usuario.
- GraphQL: lenguaje de consulta y manipulación de datos para APIs.
- Apollo Client: biblioteca de gestión de estado y conexión a servidores GraphQL.
- Google Maps: plataforma de mapas y geolocalización.
- Node.js: entorno de JavaScript para el servidor.
- Express: framework de Node.js para crear aplicaciones web y APIs.

## Autor

- Nombre: RAUL GONZALEZ
- Email: GQ.RAUL@GMAIL.COM

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
