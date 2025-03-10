//login================================================================================================================================
function comprobarCredenciales() { 
    //de aqui se obtienen el nombre y la contraseña del usuario
    const usuarioIngresado = document.getElementById("usuario").value;
    const contrasenaIngresada = document.getElementById("contrasena").value;

    //seleccion de comprador, vendedor, administrador
    const select = document.getElementById("tipodecuenta"); //se abren los valores de las selleciones
    const valorSeleccionado = select.value;// el vcalor seleccionado

    // Aquí estan las cuentas validas 
    const usuarioValido = "seller456";
    const contrasenaValida = "Intro123";

    const usuarioValido2 = "dancabello";
    const contrasenaValida2 = "J5*asdRD.s";

    const usuarioValido3 = "root";
    const contrasenaValida3 = "dochouse";

    //condicicones de los usuarios validos
    if (usuarioIngresado === usuarioValido && contrasenaIngresada === contrasenaValida && valorSeleccionado === "comprador"){
        alert('inicio de sesion exitoso')
        window.location.replace ("usuario_comprador.html");
    }

    else if (usuarioIngresado === usuarioValido2 && contrasenaIngresada === contrasenaValida2 && valorSeleccionado === "vendedor"){
        alert('inicio de sesion exitoso')
        window.location.replace ("usuario_vendedor.html");
    }

    else if (usuarioIngresado === usuarioValido3 && contrasenaIngresada === contrasenaValida3 && valorSeleccionado === "administrador"){
        alert('inicio de sesion exitoso')
        window.location.replace ("usuario_administrador.html");
    }

    else {
        alert("Usuario o contraseña incorrectos");
    }

    
}

//Codigo ventanas emergentes===============================================================================================================================
const modal_container = document.getElementById('container');
const close = document.getElementById('close');

function cerrar(){
    modal_container.classList.add('show');
}

//para el carrito de compras===============================================================================================================================
const btn_carrito = document.querySelector('.container-icon'); //otra forma de obtener el contenido
const contenido_carrito = document.querySelector('.container-cart-product')

btn_carrito.addEventListener('click', () => {
    contenido_carrito.classList.toggle('hidden-cart') //funciona como un cambio que juega con dos clases
})

const cartinfo = document.querySelector('.cart-product');
const rowproduct = document.querySelector('.row-product'); 

//lista de los productos en carrito
const productlist = document.querySelector('.filas_productos1');

//variable de arreglo de productos en el carrito
let allProducts = [];

//variable para el total a pagar en carrito
const valorTotal = document.querySelector('.total-pagar')

//variable para los objetos en carrito
const contTotal = document.querySelector('#contador-productos')



productlist.addEventListener('click', e => { //fincion para guardar las variables de los productos
    
    if(e.target.classList.contains('btn-add-cart')){ //cada que presione el boton de agregar al carrito me dara un true

    const product = e.target.closest('.general-txt'); //esto para dirigirnos al div inicial de nuestro producto
    const cantidadElement = product.querySelector('.Cantidad_producto');
    let cantidad_product = parseInt(cantidadElement.innerHTML);

    if (cantidad_product === 0) { //comprobar si hay productos disponibles
        alert('Se ha agotado el producto');
    } else {
        alert("Su producto se ha agregado al carrito");

        const infoProduct = { //objeto literal de nuestros productos
            quantity: 1,
            title1: product.querySelector('.invisible').innerHTML, //esto obtiene el nombre del producto y precio
            price: product.querySelector('.precio').innerHTML,
        };
            
        //esto es basicamente para saber si un producto ya esta en el carrito, devuelve un true y valida la condicion para sumarle a cantidad"quantity"
        const en_carrito = allProducts.some(product => product.title1 === infoProduct.title1) 
        if(en_carrito){
            const products = allProducts.map(product => {
                if(product.title1 === infoProduct.title1){
                    product.quantity++;
                    return product;
                } else{
                    return product;
                }
            })
            allProducts = [...products]; //se devuelve un arreglo y lo esparsimos
        } else{
            //recorrido de la matriz que guarda cada producto
            allProducts =[...allProducts, infoProduct]
        }

        cantidad_product--;
        cantidadElement.textContent = cantidad_product;
        product.querySelector('.Cantidad_producto').textContent = cantidad_product;
        showHTML();

    }
    }

});

//para eliminar los articulos que hay e el carrito

rowproduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.closest('.cart-product'); // Selecciona el producto en el carrito
        const title = product.querySelector('p').innerHTML; // Obtiene el título del producto
        const quantity = product.querySelector('.cantidad-producto-carrito').innerHTML;
        console.log(quantity)
        

        // Elimina el producto del carrito
        allProducts = allProducts.filter(product => product.title1 !== title);

        // Busca el producto en la lista de productos y aumenta su cantidad disponible
        const productInList = document.querySelectorAll('.general-txt').forEach(item => {
            const productTitle = item.querySelector('.invisible').innerHTML;
            
            for(let i=0 ; i<quantity ; i++)//el for es por si tenemos mas del mismo producto
            if (productTitle === title) {
                const cantidadElement = item.querySelector('.Cantidad_producto');
                let cantidad_product = parseInt(cantidadElement.innerHTML);
                cantidad_product++; 
                cantidadElement.textContent = cantidad_product; 
            }
        });

        showHTML(); // Actualiza la vista del carrito
    }
});

//para crear el html en el carrito y llenarlo
const showHTML = () => {

    //limpiar el carrito "rowproduct"
    rowproduct.innerHTML = '';

    let total =0; //a pagar
    let totalofproductos=0; //de productos



    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')


        //para pegar la forma de nuestro nuevo div
        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title1}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
                                
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        `

        rowproduct.append(containerProduct);

        //operacion para sumar el precio de los productos
        total = total + parseInt(product.quantity*product.price.slice(1))

        //operacion para sumar los productos en el carrito
        totalofproductos= totalofproductos+ product.quantity;

    })

    //para darles a los valores el resultado de las operaciones anteriores
    valorTotal.innerText = `$${total}`
    contTotal.innerText = totalofproductos;
}

//abrir Datos Bancarios====================================================================================================================

let comprobador = null;

const btn_DB = document.getElementById('DB')
const DB_container = document.getElementById('DB_contenido')
const btn_DBcerrar = document.getElementById('DBcerrar')

btn_DBcerrar.addEventListener('click', (e) => {
    DB_container.classList.remove('mostrarDB')
})

function openDB(){
    DB_container.classList.add('mostrarDB')
}

//comprobar el llenado de los datos bancarios
function comprobarDatosBancarios(){
    const direccion_ingresada = document.getElementById("direccion");
    const tarjeta_ingresada = document.getElementById("numerodetarjeta");
    const CodigoV_ingresada = document.getElementById("codigodeverificacion");
    const Cedula_ingresada = document.getElementById("ceduladeidentidad");
    const tipoC_ingresada = document.getElementById("tipodecuenta");
    
    if(direccion_ingresada.value.trim() === "" || tarjeta_ingresada.value.trim() === "" || CodigoV_ingresada.value.trim() === "" || Cedula_ingresada.value.trim() === "" || tipoC_ingresada.value.trim() === ""){
        alert('faltan elementos')
    }
    else{
        alert('se han guardado sus datos');
        DB_container.classList.remove('mostrarDB')
        comprobador = "true";
    }
}

//funcion para compra en carrito=============================================================================================================================

const btn_2 = document.querySelector('.cart-total')

btn_2.addEventListener('click', (e)=> {
    if(e.target.classList.contains('btn-2')){
        
        
        const boton_compra = e.target.parentElement
        //console.log(boton_compra_carrito)

        const total_pagar = {
            precio_total: boton_compra.querySelector('.total-pagar').innerHTML
        }

        //console.log(elementos_compra_carrito)

        //condicional para probar que hallan cosas en el carrito y validar la compra
        
        if(total_pagar.precio_total === "$0" || total_pagar.precio_total === "0$"){alert('no hay productos que pagar')}
        else if(comprobador !== "true")
            {alert('Recuerda llenar los datos bancarios antes de pagar')}
        else{showHTML_comfirmacion(total_pagar);}
    
    }
})

//mostrar ventana con total a pagar

function showHTML_comfirmacion (total){
    // Crear el div contenedor
    const contenedorDatos = document.createElement('div');
    contenedorDatos.classList.add('modal-container2'); // Agregar una clase para estilos

    const preciototal = document.createElement('h2');
    preciototal.textContent = 'Precio total: ' + total.precio_total;

    const descripcion = document.createElement('p');
    descripcion.textContent = '¿Estas Seguro de que deseas pagar todos los productos del carrito?';

    
    // Agregar los elementos al div contenedor
    
    contenedorDatos.appendChild(descripcion);
    contenedorDatos.appendChild(preciototal);

    // Agregar el div al body (o a otro elemento donde quieras mostrarlo)
    document.body.appendChild(contenedorDatos);

    //Agregar un botón para comprar y cerrar el div
    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Pagar-total';
    botonCerrar.addEventListener('click', () => {
        alert('Muchas Gracias Por su compra')
        eliminarTodosLosProductos();
        contenedorDatos.remove(); // Eliminar el div al hacer clic en cerrar


    });
    botonCerrar.classList.add('btn_cerrar_ventana_compra')
    

    contenedorDatos.appendChild(botonCerrar);

    //Agregar un botón para cerrar el div
    const botonCerrar2 = document.createElement('button');
    botonCerrar2.textContent = 'Cancelar';
    botonCerrar2.addEventListener('click', () => {
        contenedorDatos.remove(); // Eliminar el div al hacer clic en cerrar
    });
    botonCerrar2.classList.add('btn_cerrar_ventana_compra')
    

    contenedorDatos.appendChild(botonCerrar2);
}

//funciones para cambiarse a vendedor===========================================================================================================================

//abrir Cambiarse a vendedor
const btn_C = document.getElementById('Cambiarse_vendedor')
const C_container = document.getElementById('CV_contenido')
const btn_Ccerrar = document.getElementById('Ccerrar')

btn_Ccerrar.addEventListener('click', (e) => {
    C_container.classList.remove('mostrarDB')
})

function openCV(){
    C_container.classList.add('mostrarDB')
}

//comprobar el llenado de los datos 

function comprobarDatos(){
    const direccion_ingresada = document.getElementById("direccion1");
    const tarjeta_ingresada = document.getElementById("numerodetelefono");
    const CodigoV_ingresada = document.getElementById("gmail");
    const Cedula_ingresada = document.getElementById("ceduladeidentidad1");
    
    if(direccion_ingresada.value.trim() === "" || tarjeta_ingresada.value.trim() === "" || CodigoV_ingresada.value.trim() === "" || Cedula_ingresada.value.trim() === ""){
        alert('faltan elementos')
    }
    else{
        alert('se han hecho el cambio exitosamente');
        DB_container.classList.remove('mostrarDB')
        window.location.href = "usuario_vendedor.html";
    }
}

//funcion para eliminar cantidad de productos==================================================================================================================

productlist.addEventListener('click',(e)=> {
    if(e.target.classList.contains('btn-2')){

        if(comprobador !== "true")
            {alert('Recuerda llenar los datos bancarios antes de comprar')}
        else{
            const product = e.target.closest('.general-txt')
            console.log(product)
            const cantidadElement = product.querySelector('.invisible3');
            let cantidad_product = parseInt(cantidadElement.innerHTML);

            if(cantidad_product === 0){
                alert('se ha agotado el producto')
            }
            else{
                alert("Muchas gracias por su compra")
                cantidad_product--;
                cantidadElement.textContent = cantidad_product;
                product.querySelector('.Cantidad_producto').textContent = cantidad_product;
            }
        }
        
    }
})

// el for para los productos en comprador ================================================================================================================================

const todoProducto = document.getElementById('_imagenes')

function AgregarproductoCompra(producto){
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
                <span class="invisible">${producto.nombre}</span>
                <span class="invisible3">${producto.cantidad}</span>
                <a class="btn-2">Comprar</a>
                <a class="btn-add-cart">Agregar al carrito</a>
            </div>
        </div>
    `;
}

window.onload = function agregar(){
    productos.forEach(producto => {
    const productoHTML = AgregarproductoCompra(producto);
    todoProducto.innerHTML += productoHTML;
});
}

// NOTA: Ustedes deben agregarle una imagen a cada producto
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

  function eliminarTodosLosProductos() {
    // Vaciar el arreglo allProducts
    allProducts = [];

    // Actualizar la vista del carrito
    showHTML();
}