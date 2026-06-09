document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todas las tarjetas y los elementos del visor flotante
    const tarjetas = Array.from(document.querySelectorAll('.tarjeta'));
    const overlay = document.getElementById('galeria-overlay');
    const imgMaximizada = document.getElementById('imagen-maximizada');
    const tituloMaximizado = document.getElementById('titulo-maximizado');
    const textoMaximizado = document.getElementById('texto-maximizado');
    
    const btnCerrar = document.getElementById('boton-cerrar');
    const btnIzq = document.getElementById('flecha-izq');
    const btnDer = document.getElementById('flecha-der');
    
    let indiceActual = 0; // Guarda la foto en la que estamos parados

    // Función para cargar los datos de una tarjeta específica en el visor
    function actualizarVisor(indice) {
        const tarjeta = tarjetas[indice];
        const img = tarjeta.querySelector('.imagen-tarjeta');
        const titulo = tarjeta.querySelector('.contenido-tarjeta h3');
        const descripcion = tarjeta.querySelector('.contenido-tarjeta p');

        // Pasamos la información al visor flotante
        imgMaximizada.src = img.src;
        tituloMaximizado.textContent = titulo.textContent;
        textoMaximizado.textContent = descripcion.textContent;
        
        indiceActual = indice; // Actualizamos la posición global
    }

    // 1. Detectar clic en cualquiera de las tarjetas para abrir la galería
    tarjetas.forEach((tarjeta, indice) => {
        tarjeta.addEventListener('click', () => {
            actualizarVisor(indice);
            overlay.classList.remove('galeria-oculta'); // Muestra la galería
        });
    });

    // 2. Avanzar a la siguiente foto (Derecha)
    function siguienteFoto() {
        let nuevoIndice = indiceActual + 1;
        if (nuevoIndice >= tarjetas.length) nuevoIndice = 0; // Si llega al final (24), vuelve a la 1
        actualizarVisor(nuevoIndice);
    }

    // 3. Retroceder a la foto anterior (Izquierda)
    function fotoAnterior() {
        let nuevoIndice = indiceActual - 1;
        if (nuevoIndice < 0) nuevoIndice = tarjetas.length - 1; // Si retrocede de la 1, va a la 24
        actualizarVisor(nuevoIndice);
    }

    // Asignar eventos a los botones de navegación
    btnDer.addEventListener('click', (e) => { e.stopPropagation(); siguienteFoto(); });
    btnIzq.addEventListener('click', (e) => { e.stopPropagation(); fotoAnterior(); });
    
    // 4. Cerrar la galería
    btnCerrar.addEventListener('click', () => {
        overlay.classList.add('galeria-oculta');
    });

    // Cerrar también si hacen clic en el fondo negro de la pantalla
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('galeria-oculta');
        }
    });

    // EXTRA: Permitir controlar la galería con las flechas del teclado físico
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('galeria-oculta')) {
            if (e.key === 'ArrowRight') siguienteFoto();
            if (e.key === 'ArrowLeft') fotoAnterior();
            if (e.key === 'Escape') overlay.classList.add('galeria-oculta');
        }
    });
});
