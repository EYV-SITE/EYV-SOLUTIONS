document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // LÓGICA DEL HERO CAROUSEL (Mantenida intacta desde Hito de Control 3)
    // ==========================================================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlideFunc() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlideFunc() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlideFunc();
            resetInterval();
        });
        prevBtn.addEventListener('click', () => {
            prevSlideFunc();
            resetInterval();
        });
    }

    function startInterval() {
        carouselInterval = setInterval(nextSlideFunc, 5000);
    }

    function resetInterval() {
        clearInterval(carouselInterval);
        startInterval();
    }

    if (slides.length > 0) {
        startInterval();
    }

    // ==========================================================================
    // LÓGICA DEL MODAL ACCESO CLIENTES (Mantenida intacta desde Hito de Control 3)
    // ==========================================================================
    const modal = document.getElementById('modal-login');
    const btnAcceso = document.getElementById('btn-acceso');
    const closeX = document.querySelector('.close-modal');
    const linkContacto = document.getElementById('link-contacto-desde-modal');

    if (btnAcceso && modal) {
        btnAcceso.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeX && modal) {
        closeX.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (linkContacto && modal) {
        linkContacto.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }


    // ==========================================================================
    // NUEVA FUNCIONALIDAD INTELIGENTE Y ESTÉTICA DE CONTACTO
    // ==========================================================================
    const formContacto = document.getElementById('form-contacto');
    const contactoWrapper = document.getElementById('contacto-wrapper');
    const btnSubmit = document.getElementById('btn-contacto-submit');

    if (formContacto && contactoWrapper) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página parpadee o se recargue

            // Captura de campos
            const nombre = document.getElementById('contacto-nombre');
            const email = document.getElementById('contacto-email');
            const mensaje = document.getElementById('contacto-mensaje');
            
            let formValido = true;

            // Limpiar estados de error previos
            [nombre, email, mensaje].forEach(campo => campo.classList.remove('error-field'));

            // Validación estética de campos vacíos
            if (!nombre.value.trim()) {
                nombre.classList.add('error-field');
                formValido = false;
            }
            if (!email.value.trim() || !email.value.includes('@')) {
                email.classList.add('error-field');
                formValido = false;
            }
            if (!mensaje.value.trim()) {
                mensaje.classList.add('error-field');
                formValido = false;
            }

            // Si pasa la validación, procedemos con el efecto de envío
            if (formValido) {
                // Estado visual de carga en el botón
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                // Simulación de procesamiento de datos por el puente seguro (2 segundos de espera para realismo)
                setTimeout(() => {
                    // Reemplazo dinámico del formulario por la tarjeta de éxito corporativa
                    contactoWrapper.innerHTML = `
                        <div class="success-message-box">
                            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                            <h3>¡Mensaje recibido con éxito!</h3>
                            <p>Nos pondremos en contacto contigo a la brevedad para abordar tus requerimientos con total profesionalismo.</p>
                            <p style="margin-top: 10px; font-weight: 600; color: #3384b3;">Muchas gracias por escribir a EyV Solutions.</p>
                        </div>
                    `;
                }, 2000);
            }
        });

        // Quitar el color rojo de error de inmediato cuando el usuario empiece a corregir el texto
        const inputs = formContacto.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('error-field');
                }
            });
        });
    }
});
