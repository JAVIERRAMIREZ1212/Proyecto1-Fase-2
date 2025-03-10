//Codigo ventanas emergentes===============================================================================================================================
const modal_container = document.getElementById('container');
const close = document.getElementById('close');

function cerrar(){
    modal_container.classList.add('show');
}

//para publicado de productos=================================================================================================================================

let comprobadorFotos = null;

//subido de foto
document.getElementById('foto').addEventListener('change',(e) => {
    const preview = document.getElementById('preview-foto');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Previsualización de la foto" class="imagen-P">`;
        };

        reader.readAsDataURL(file);
        comprobadorFotos = "true";
        
    } else {
        preview.innerHTML = '<p>Previsualización de la foto</p>';
    }
});

//abrir la ventana de publicado
const btn_C = document.getElementById('Cambiarse_vendedor')
const C_container = document.getElementById('P_contenido')
const btn_Ccerrar = document.getElementById('Ccerrar')

btn_Ccerrar.addEventListener('click', (e) => {
    C_container.classList.remove('mostrarDB')
})

function openCV(){
    C_container.classList.add('mostrarDB')
}

//comprobar el llenado de los datos 

function comprobarDatos(){ //es un reciclado de comprobador Datos Bancarios
    const Nombre_producto = document.getElementById("direccion1");
    const Descripcion_producto = document.getElementById("numerodetelefono");
    const Cantidad_producto = document.getElementById("gmail");
    const Precio_producto = document.getElementById("ceduladeidentidad1");
    const select = document.getElementById("tipo-pago"); //se abren los valores de las selleciones
    const Opcion_ingresada = select.value

    /*para obtener la imagen del producto a publicar*/
    const Imagen = document.querySelector('.imagen-P');
    const Imagen_producto = Imagen ? Imagen.src : "https://via.placeholder.com/150"; // Imagen por defecto
    
    if(Nombre_producto.value.trim() === "" || Descripcion_producto.value.trim() === "" || Cantidad_producto.value.trim() === "" || Precio_producto.value.trim() === "" || Opcion_ingresada === " " || comprobadorFotos !=="true"){
        alert('faltan elementos')
    }
    else{
        alert('se ha publicado su producto');
        C_container.classList.remove('mostrarDB');
        Publicar(Nombre_producto.value.trim(),Descripcion_producto.value.trim(),Cantidad_producto.value.trim(),Precio_producto.value.trim(),Imagen_producto)
        limpiarcasillas();
    }
}

const todoProductoV = document.getElementById('_imagenes2')

function Publicar(nombre, descripcion, cantidad, precio, imagen){
    const productoPublicado = Publicar1(nombre, descripcion, cantidad, precio, imagen)
    todoProductoV.innerHTML += productoPublicado;
}

function Publicar1(nombre,descripcion,cantidad,precio,imagen){
    return`
    <div class="general-txt">
            <img src=${imagen} alt="">
            <h3>${nombre}
                <div>
                    catidad ToTal = 
                    <span class="Cantidad_producto">${cantidad}</span>
                </div>
                
            </h3>
            <p>
                ${descripcion}
            </p>
            <div class="prices">
                <span class="precio">$${precio}</span>
                <span class="invisible">${nombre}</span>
                <span class="invisible3">${cantidad}</span>
                <a class="btn-2">Eliminar Publicacion</a>
            </div>
    </div>
    `
}

//para limpiar los datos llenados
function limpiarcasillas() {
    
    document.getElementById("direccion1").value = "";
    document.getElementById("numerodetelefono").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("ceduladeidentidad1").value = "";

    document.getElementById("tipo-pago").selectedIndex = 0;

    const preview = document.getElementById('preview-foto');
    preview.innerHTML = '<p>Previsualización de la foto</p>'; // Restablecer el contenido
}

//eliminar los productos publicados "reciclado"=======================================================================================================================================

const productlist = document.querySelector('.filas_productos1');

productlist.addEventListener('click', (e) =>{
    if(e.target.classList.contains('btn-2')){
        alert('El producto ha sido eliminado');
        const product = e.target.closest('.general-txt');
        product.classList.add('invisible3')
    }
})

//for de productos en administrador ======================================================================================================================

const todoProductoADM = document.getElementById('_imagenes1')

function AgregarproductoADM(producto){
    return `
        <div class="general-txt">
            <img src=${producto.imagen} alt="">
            <h3>${producto.nombre}
                <div>
                    catidad ToTal = 
                    <span class="Cantidad_producto">${producto.cantidad}</span>
                </div>
                
            </h3>
            <p>
                ${producto.descripcion}
            </p>
            <div class="prices">
                <span class="precio">$${producto.precio}</span>
            </div>
        </div>
    `;
}

window.onload = function agregar1(){
    productos.forEach(producto => {
    const productoHTML = AgregarproductoADM(producto);
    todoProductoADM.innerHTML += productoHTML;
});
}

const productos = [
    {
        nombre: "Nissan Skyline R32",
        descripcion: "Carro japones en bunas condiciones, motor 2jz, año 1998, 600hp, precio negociable",
        precio: 5000,
        cantidad: 1,
        imagen: "imagenes/pl1.jpg",
    },
    {
        nombre: "Patineta Usada",
        descripcion: "Vendo mi patineta usada, ignoren al gato",
        precio: 50,
        cantidad: 1,
        imagen: "imagenes/pl2.jpg",
    },
    {
        nombre: "Pasteles Personalizados",
        descripcion: "Vendemos pasteles personalizados, podemos hacer pasteles con sus personajes favoritos",
        precio: 25,
        cantidad: 1,
        imagen: "imagenes/pl3.jpg",
    },
    {
        nombre: "Zapatos Travis Scott",
        descripcion: "Las air force one travis scott olive ya estan disponibles!!!!",
        precio: 719,
        cantidad: 50,
        imagen: "imagenes/pl4.png",
    },
    {
        nombre: "Control de XBOX",
        descripcion: "Control dex xbox en muy buenas condiciones",
        precio: 70,
        cantidad: 1,
        imagen: "imagenes/pl5.jpg",
    },
    {
        nombre: "Peluches de conejo",
        descripcion: "Vendo varios peluches de conejitos para tu darle un detallito a tu amada",
        precio: 15,
        cantidad: 5,
        imagen: "imagenes/pl6.jpg",
    },
    {
      nombre: "Eco-Cepillo Dental",
      descripcion: "Cepillo de bambú biodegradable con cerdas de carbón activado.",
      precio: 5.99,
      cantidad: 100,
      imagen: "imagenes/Cepillos.jpg",
    },
    {
      nombre: "Botella de Agua Auto-Limpiable",
      descripcion: "Botella con luz UV integrada para purificar el agua.",
      precio: 29.99,
      cantidad: 50,
      imagen: "imagenes/botella.jpg",
    },
    {
      nombre: "Pluma de Borrado Instantáneo",
      descripcion: "Pluma que borra tinta con un solo clic, sin dejar rastro.",
      precio: 9.99,
      cantidad: 200,
      imagen: "imagenes/boligrafo.jpg",
    },
    {
      nombre: "Mochila Solar Cargadora",
      descripcion: "Mochila con panel solar integrado para cargar dispositivos móviles.",
      precio: 79.99,
      cantidad: 25,
      imagen: "imagenes/mochila.jpg",
    },
    {
      nombre: "Audífonos de Traducción Simultánea",
      descripcion: "Audífonos que traducen idiomas en tiempo real.",
      precio: 149.99,
      cantidad: 10,
      imagen: "imagenes/audifonos.jpg",
    },
    {
      nombre: "Almohada de Masaje Inteligente",
      descripcion: "Almohada que se adapta a tu cuerpo y proporciona masajes personalizados.",
      precio: 69.99,
      cantidad: 30,
      imagen: "imagenes/almohada.jpg",
    },
    {
      nombre: "Lámpara de Escritorio con Carga Inalámbrica",
      descripcion: "Lámpara que carga tu teléfono mientras ilumina tu espacio.",
      precio: 49.99,
      cantidad: 40,
      imagen: "imagenes/lampara.jpg",
    },
    {
      nombre: "Guantes de Realidad Virtual Táctiles",
      descripcion: "Guantes que te permiten sentir objetos en la realidad virtual.",
      precio: 199.99,
      cantidad: 5,
      imagen: "imagenes/guantes.jpg",
    },
    {
      nombre: "Cámara de Seguridad con Reconocimiento Facial",
      descripcion: "Cámara que identifica a las personas y envía alertas.",
      precio: 89.99,
      cantidad: 15,
      imagen: "imagenes/camara.jpg",
    },
    {
      nombre: "Robot Aspirador con Mapeo Inteligente",
      descripcion: "Aspirador que limpia tu casa de forma autónoma, creando mapas.",
      precio: 249.99,
      cantidad: 8,
      imagen: "imagenes/robot.jpg",
    },
    {
      nombre: "Bicicleta Eléctrica Plegable",
      descripcion: "Bicicleta que se pliega para facilitar su transporte.",
      precio: 599.99,
      cantidad: 3,
      imagen: "imagenes/bicicleta.jpg",
    },
    {
      nombre: "Reloj Inteligente con Monitor de Sueño",
      descripcion: "Reloj que analiza tu sueño y te ayuda a mejorarlo.",
      precio: 129.99,
      cantidad: 20,
      imagen: "imagenes/reloj.jpg",
    },
    {
      nombre: "Impresora 3D de Bolsillo",
      descripcion: "Impresora que cabe en tu bolsillo y te permite imprimir objetos pequeños.",
      precio: 349.99,
      cantidad: 2,
      imagen: "imagenes/impresora.jpg",
    },
    {
      nombre: "Kit de Cultivo Hidropónico Casero",
      descripcion: "Kit para cultivar tus propias hierbas y verduras en casa.",
      precio: 59.99,
      cantidad: 25,
      imagen: "imagenes/kit.jpg",
    },
    {
      nombre: "Drone con Cámara 4K y Estabilización",
      descripcion: "Drone que graba videos y toma fotos de alta calidad.",
      precio: 499.99,
      cantidad: 6,
      imagen: "imagenes/dron.jpg",
    },
    {
      nombre: "Proyector Holográfico Portátil",
      descripcion: "Proyector que crea hologramas en cualquier superficie.",
      precio: 299.99,
      cantidad: 12,
      imagen: "imagenes/proyector.jpg",
    },
    {
      nombre: "Mesa de Escritorio Ajustable con Memoria",
      descripcion: "Mesa que se ajusta a tu altura y guarda tus posiciones favoritas.",
      precio: 399.99,
      cantidad: 4,
      imagen: "imagenes/mesa.jpg",
    },
    {
      nombre: "Silla Ergonómica con Calefacción",
      descripcion: "Silla que se adapta a tu cuerpo y te mantiene caliente.",
      precio: 279.99,
      cantidad: 9,
      imagen: "imagenes/silla.jpg",
    },
    {
      nombre: "Purificador de Aire con Aromaterapia",
      descripcion: "Purificador que elimina las impurezas del aire y libera aromas.",
      precio: 119.99,
      cantidad: 18,
      imagen: "imagenes/purificador.jpg",
    },
    {
      nombre: "Altavoz Inteligente con Pantalla Táctil",
      descripcion: "Altavoz que te permite controlar tu hogar y ver videos.",
      precio: 169.99,
      cantidad: 11,
      imagen: "imagenes/altavoz.jpg",
    },
    {
      nombre: "Gafas de Realidad Aumentada con GPS",
      descripcion: "Gafas que te muestran información sobre el mundo real.",
      precio: 229.99,
      cantidad: 7,
      imagen: "imagenes/gafas.jpg",
    },
    {
      nombre: "Maleta Inteligente con Seguimiento GPS",
      descripcion: "Maleta que te permite saber dónde está en todo momento.",
      precio: 189.99,
      cantidad: 13,
      imagen: "imagenes/maleta.jpg",
    },
    {
      nombre: "Cargador Solar Portátil para Laptop",
      descripcion: "Cargador que te permite cargar tu laptop en cualquier lugar.",
      precio: 139.99,
      cantidad: 17,
      imagen: "imagenes/cargador.jpg",
    },
    {
      nombre: "Teclado Virtual Proyectado",
      descripcion: "Teclado que se proyecta en cualquier superficie.",
      precio: 99.99,
      cantidad: 22,
      imagen: "imagenes/teclado.jpg",
    },
    {
      nombre: "Ratón Ergonómico con Escáner",
      descripcion: "Ratón que escanea documentos y los convierte en texto.",
      precio: 79.99,
      cantidad: 28,
      imagen: "imagenes/raton.jpg",
    },
    {
      nombre: "Libreta Inteligente con Digitalización",
      descripcion: "Libreta que digitaliza tus notas y dibujos.",
      precio: 69.99,
      cantidad: 32,
      imagen: "imagenes/libreta.jpg",
    },
    {
      nombre: "Traductor de Idiomas de Bolsillo",
      descripcion: "Dispositivo que traduce idiomas en tiempo real.",
      precio: 149.99,
      cantidad: 10,
      imagen: "imagenes/traductor.jpg",
    },
    {
      nombre: "Medidor de Calidad del Aire Portátil",
      descripcion: "Dispositivo que mide la calidad del aire y te alerta.",
      precio: 89.99,
      cantidad: 15,
      imagen: "imagenes/medidor.jpg",
    },
    {
      nombre: "Báscula Inteligente con Análisis Corporal",
      descripcion: "Báscula que analiza tu composición corporal y te da consejos.",
      precio: 129.99,
      cantidad: 20,
      imagen: "imagenes/bascula.jpg",
    },
    {
      nombre: "Dispensador de Comida Inteligente para Mascotas",
      descripcion: "Dispositivo que alimenta a tu mascota automáticamente.",
      precio: 169.99,
      cantidad: 11,
      imagen: "imagenes/dispensador.jpg",
    },
    {
      nombre: "Termómetro Inteligente sin Contacto",
      descripcion: "Termómetro que mide la temperatura sin tocar la piel.",
      precio: 59.99,
      cantidad: 25,
      imagen: "imagenes/termometro.jpg",
    },
    {
      nombre: "Kit de Primeros Auxilios Inteligente",
      descripcion: "Kit que te guía en caso de emergencia.",
      precio: 79.99,
      cantidad: 28,
      imagen: "imagenes/primeros_auxilios.jpg",
    },
    {
      nombre: "Candado Inteligente con Huella Dactilar",
      descripcion: "Candado que se abre con tu huella dactilar.",
      precio: 49.99,
      cantidad: 30,
      imagen: "imagenes/candado.jpg",
    },
  ];