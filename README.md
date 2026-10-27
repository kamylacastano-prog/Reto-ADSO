# ANÁLISIS DEL SISTEMA – TIENDA EXPRESS

### 1. Descripción del problema

Tienda Express es una empresa dedicada a la venta de productos tecnológicos y accesorios, tanto de manera presencial como por internet.
Actualmente, la empresa registra sus ventas en una libreta y en hojas de cálculo. Este proceso puede generar errores, pérdida de información y dificultades para controlar el inventario y conocer el estado de los pedidos.
Por esta razón, se propone desarrollar un sistema web que permita administrar los productos, registrar pedidos y consultar su estado de manera organizada.

### 2. Objetivo general
Desarrollar un prototipo web que permita gestionar los productos y pedidos de Tienda Express, facilitando el control del inventario y el seguimiento de las ventas.

### 3. Objetivos específicos

- **Registrar productos con su nombre, categoría, precio y cantidad disponible.**
- **Registrar pedidos con los datos del cliente, producto, cantidad y fecha.**
- **Consultar los productos disponibles en el inventario.**
- **Visualizar los pedidos registrados y su estado.**
- **Actualizar el estado de los pedidos.**
- **Validar los datos ingresados para evitar errores.**

### 4. Usuarios del sistema

- **Administrador o vendedor: registra productos, crea pedidos, consulta el inventario y actualiza el estado de los pedidos.**
- **Cliente: proporciona sus datos para realizar un pedido. En este prototipo no tendrá una cuenta de usuario.**

### 5. Requerimientos funcionales

## Código| Requerimiento
- **RF-01| Registrar productos con nombre, categoría, precio y stock.**
- **RF-02| Validar que los campos obligatorios estén completos.**
- **RF-03| Mostrar un listado de los productos registrados.**
- **RF-04| Registrar pedidos con cliente, producto, cantidad y fecha.**
- **RF-05| Validar que la cantidad solicitada sea válida y exista suficiente stock.**
- **RF-06| Descontar del inventario las unidades correspondientes al registrar un pedido.**
- **RF-07| Mostrar los pedidos registrados y sus estados.**
- **RF-08| Permitir cambiar el estado de un pedido entre Pendiente, En proceso y Entregado.**
- **RF-09| Mostrar un resumen de los productos, las unidades disponibles y los pedidos pendientes de entrega.**

6. Requerimientos no funcionales

- RNF-01. Usabilidad: la interfaz debe ser clara y fácil de utilizar.
- RNF-02. Compatibilidad: el sistema debe funcionar en navegadores web modernos.
- RNF-03. Organización: el código debe estar organizado en archivos y utilizar nombres descriptivos.
- RNF-04. Tecnologías: el proyecto debe utilizar HTML, CSS, JavaScript, TypeScript, React y Vite.
- RNF-05. Validación: el sistema debe mostrar mensajes cuando se ingresen datos incorrectos.
- RNF-06. Adaptabilidad: la interfaz debe ajustarse a pantallas de computadores y celulares.

7. Datos que manejará el sistema

Productos

- ID del producto.
- Nombre.
- Categoría.
- Precio.
- Cantidad disponible en inventario.

Pedidos

- ID del pedido.
- Nombre del cliente.
- Producto solicitado.
- Cantidad.
- Fecha del pedido.
- Estado del pedido.

8. Reglas de negocio

1. Todo producto debe tener nombre, categoría, precio y stock.
2. El precio debe ser mayor que cero.
3. El stock debe ser un número entero igual o mayor que cero.
4. La cantidad solicitada en un pedido debe ser un entero mayor que cero.
5. No se pueden registrar pedidos si no hay suficientes unidades disponibles.
6. Al registrar un pedido, se debe descontar la cantidad solicitada del inventario.
7. Cada pedido debe tener uno de estos estados: Pendiente, En proceso o Entregado.
8. El usuario debe poder consultar los pedidos y modificar su estado.

9. Alcance del proyecto

El prototipo permitirá registrar y visualizar productos, crear pedidos, validar la información, controlar las unidades disponibles y actualizar el estado de los pedidos.

La información se almacenará temporalmente en estructuras de datos en memoria, como arreglos, según las condiciones del reto. Por lo tanto, los datos podrán perderse al recargar la página. No se implementarán base de datos, autenticación de usuarios ni pagos en línea.

10. Propuesta de solución

Se desarrollará una aplicación web con una interfaz sencilla y moderna, utilizando React para construir los componentes, TypeScript para definir los tipos de datos y detectar errores, y Vite como entorno de desarrollo.

El sistema tendrá formularios para registrar productos y pedidos, tablas para mostrar la información y controles para actualizar el estado de cada pedido.

11. Criterios de aceptación

El prototipo se considerará funcional cuando:

- Se pueda registrar un producto y visualizarlo en el listado.
- Se pueda crear un pedido con información válida.
- Se rechacen los datos incompletos o incorrectos.
- Se controle el stock antes de registrar un pedido.
- Se actualice el inventario después de crear un pedido.
- Se puedan consultar los pedidos y cambiar sus estados.
- El proyecto se ejecute correctamente y pueda publicarse en un repositorio público de GitHub.

12. Conclusión

El sistema Tienda Express busca mejorar la organización de los productos y pedidos de la empresa mediante una aplicación web sencilla. La solución permitirá reducir errores de registro, controlar el inventario y consultar fácilmente el estado de cada pedido.
