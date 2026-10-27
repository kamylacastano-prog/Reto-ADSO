import { useState } from "react";
import type { FormEvent } from "react";
import type { Producto, Pedido } from "./types";

const productosIniciales: Producto[] = [
  { id: 1, nombre: "Audífonos Bluetooth", categoria: "Audio", precio: 65000, stock: 12 },
  { id: 2, nombre: "Mouse inalámbrico", categoria: "Accesorios", precio: 42000, stock: 8 },
  { id: 3, nombre: "Cargador USB-C", categoria: "Accesorios", precio: 35000, stock: 20 }
];

const pedidosIniciales: Pedido[] = [
  { id: 1, cliente: "María López", productoId: 1, cantidad: 1, fecha: "2026-10-27", estado: "Pendiente" },
  { id: 2, cliente: "Carlos Ruiz", productoId: 2, cantidad: 2, fecha: "2026-10-27", estado: "En proceso" }
];

function dinero(valor: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(valor);
}

function App() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Accesorios");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [cliente, setCliente] = useState("");
  const [productoId, setProductoId] = useState("1");
  const [cantidad, setCantidad] = useState("1");
  const [mensaje, setMensaje] = useState("");

  const unidades = productos.reduce((total, producto) => total + producto.stock, 0);
  const pendientes = pedidos.filter((pedido) => pedido.estado !== "Entregado").length;

  function registrarProducto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nombre.trim() || !precio || stock === "") {
      setMensaje("Completa todos los campos del producto.");
      return;
    }

    if (Number(precio) <= 0 || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      setMensaje("El precio debe ser mayor que cero y el stock debe ser un entero igual o mayor que cero.");
      return;
    }

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: nombre.trim(),
      categoria,
      precio: Number(precio),
      stock: Number(stock)
    };

    setProductos([...productos, nuevoProducto]);
    setNombre("");
    setPrecio("");
    setStock("");
    setMensaje("Producto registrado correctamente.");
  }

  function registrarPedido(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const producto = productos.find((item) => item.id === Number(productoId));
    const unidadesPedido = Number(cantidad);

    if (!cliente.trim() || !producto || cantidad === "" ||
        !Number.isInteger(unidadesPedido) || unidadesPedido < 1) {
      setMensaje("Completa los datos del pedido con valores válidos.");
      return;
    }

    if (producto.stock < unidadesPedido) {
      setMensaje("No hay suficiente stock para registrar ese pedido.");
      return;
    }

    const nuevoPedido: Pedido = {
      id: Date.now(),
      cliente: cliente.trim(),
      productoId: producto.id,
      cantidad: unidadesPedido,
      fecha: new Date().toLocaleDateString("en-CA"),
      estado: "Pendiente"
    };

    setPedidos([...pedidos, nuevoPedido]);
    setProductos(productos.map((item) =>
      item.id === producto.id
        ? { ...item, stock: item.stock - unidadesPedido }
        : item
    ));

    setCliente("");
    setCantidad("1");
    setMensaje("Pedido registrado y stock actualizado.");
  }

  function cambiarEstado(id: number, estado: Pedido["estado"]) {
    setPedidos(pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado } : pedido
    ));
    setMensaje("Estado del pedido actualizado.");
  }

  function buscarProducto(id: number) {
    return productos.find((producto) => producto.id === id)?.nombre ?? "Producto no encontrado";
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="logo">TE</div>
        <div>
          <h1>Tienda <span>Express</span></h1>
          <p>Gestión de productos, inventario y pedidos</p>
        </div>
        <div className="estado-sistema"><i /> Sistema activo</div>
      </header>

      <section className="bienvenida">
        <div>
          <p className="etiqueta">PANEL DE CONTROL</p>
          <h2>Todo tu negocio, en un solo lugar.</h2>
          <p>Registra productos, controla el inventario y consulta los pedidos.</p>
        </div>
        <div className="icono-grande">▦</div>
      </section>

      <section className="resumen">
        <article className="tarjeta-resumen">
          <span className="icono azul">▣</span>
          <div><p>Productos registrados</p><strong>{productos.length}</strong></div>
        </article>
        <article className="tarjeta-resumen">
          <span className="icono verde">▤</span>
          <div><p>Unidades en inventario</p><strong>{unidades}</strong></div>
        </article>
        <article className="tarjeta-resumen">
          <span className="icono naranja">🛒</span>
          <div><p>Pedidos por entregar</p><strong>{pendientes}</strong></div>
        </article>
      </section>

      {mensaje && (
        <div className="mensaje" role="status">
          {mensaje}
          <button onClick={() => setMensaje("")}>×</button>
        </div>
      )}

      <section className="formularios">
        <article className="panel">
          <div className="titulo-panel">
            <div><small>INVENTARIO</small><h3>Registrar producto</h3></div>
            <span>＋</span>
          </div>

          <form onSubmit={registrarProducto}>
            <label>Nombre del producto
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Teclado mecánico" />
            </label>

            <label>Categoría
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option>Accesorios</option>
                <option>Audio</option>
                <option>Computación</option>
                <option>Celulares</option>
                <option>Otros</option>
              </select>
            </label>

            <div className="dos-campos">
              <label>Precio (COP)
                <input type="number" min="1" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="50000" />
              </label>
              <label>Stock inicial
                <input type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="10" />
              </label>
            </div>

            <button className="boton" type="submit">＋ Guardar producto</button>
          </form>
        </article>

        <article className="panel">
          <div className="titulo-panel">
            <div><small>VENTAS</small><h3>Registrar pedido</h3></div>
            <span>↗</span>
          </div>

          <form onSubmit={registrarPedido}>
            <label>Nombre del cliente
              <input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Ej. Laura Gómez" />
            </label>

            <label>Producto
              <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} — {producto.stock} disponibles
                  </option>
                ))}
              </select>
            </label>

            <label>Cantidad
              <input type="number" min="1" step="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </label>

            <button className="boton boton-verde" type="submit">＋ Crear pedido</button>
          </form>

          <p className="ayuda">El sistema validará el stock y descontará las unidades al crear el pedido.</p>
        </article>
      </section>

      <section className="panel tabla-panel">
        <div className="titulo-tabla">
          <div><small>CATÁLOGO</small><h3>Productos registrados</h3></div>
          <span>{productos.length} productos</span>
        </div>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Disponibilidad</th></tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td><b>{producto.nombre}</b></td>
                  <td>{producto.categoria}</td>
                  <td>{dinero(producto.precio)}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <span className={`insignia ${producto.stock === 0 ? "agotado" : producto.stock < 5 ? "bajo" : "disponible"}`}>
                      {producto.stock === 0 ? "Agotado" : producto.stock < 5 ? "Stock bajo" : "Disponible"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel tabla-panel">
        <div className="titulo-tabla">
          <div><small>SEGUIMIENTO</small><h3>Pedidos registrados</h3></div>
          <span>{pedidos.length} pedidos</span>
        </div>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Fecha</th><th>Estado</th><th>Actualizar estado</th></tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td><b>{pedido.cliente}</b></td>
                  <td>{buscarProducto(pedido.productoId)}</td>
                  <td>{pedido.cantidad}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <span className={`insignia estado-${pedido.estado.toLowerCase().replace(" ", "-")}`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td>
                    <select
                      className="selector-estado"
                      aria-label={`Estado del pedido de ${pedido.cliente}`}
                      value={pedido.estado}
                      onChange={(e) => cambiarEstado(pedido.id, e.target.value as Pedido["estado"])}
                    >
                      <option>Pendiente</option>
                      <option>En proceso</option>
                      <option>Entregado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <div className="logo logo-pie">TE</div>
        <span>Tienda Express · Prototipo ADSO</span>
        <span>React · TypeScript · Vite</span>
      </footer>
    </main>
  );
}

export default App;