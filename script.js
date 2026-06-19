document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 🎠 LÓGICA DEL HERO CAROUSEL
    // ==========================================================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if(slides[index]) slides[index].classList.add('active');
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
        nextBtn.addEventListener('click', () => { nextSlideFunc(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlideFunc(); resetInterval(); });
    }

    function startInterval() { carouselInterval = setInterval(nextSlideFunc, 5000); }
    function resetInterval() { clearInterval(carouselInterval); startInterval(); }
    if (slides.length > 0) { startInterval(); }


    // ==========================================================================
    // 🔐 LÓGICA DEL MODAL ACCESO CLIENTES (Optimizado para Google Sheets)
    // ==========================================================================
    const modal = document.getElementById('modal-login');
    const btnAcceso = document.getElementById('btn-acceso');
    const closeX = document.querySelector('.close-modal');
    const linkContacto = document.getElementById('link-contacto-desde-modal');

    // Cambiado a 'block' para evitar conflictos de renderizado con el backend inyectado
    if (btnAcceso && modal) { btnAcceso.addEventListener('click', () => { modal.style.display = 'block'; }); }
    if (closeX && modal) { closeX.addEventListener('click', () => { modal.style.display = 'none'; }); }
    
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) { modal.style.display = 'none'; }
    });

    if (linkContacto && modal) {
        linkContacto.addEventListener('click', () => { modal.style.display = 'none'; });
    }


    // ==========================================================================
    // 📩 FUNCIONALIDAD DE CONTACTO REAL CON ENLACE FORMSPREE
    // ==========================================================================
    const formContacto = document.getElementById('form-contacto');
    const contactoWrapper = document.getElementById('contacto-wrapper');
    const urlFormspree = "https://formspree.io/f/mjgddzrn"; 

    const estructuraOriginalFormulario = `
        <form class="contacto-form" id="form-contacto">
            <input type="text" id="contacto-nombre" name="nombre" placeholder="Nombre completo" required>
            <input type="email" id="contacto-email" name="email" placeholder="Correo electrónico" required>
            <textarea id="contacto-mensaje" name="mensaje" placeholder="Déjanos tu mensaje o requerimiento" rows="5" required></textarea>
            <button type="submit" class="btn-submit" id="btn-contacto-submit">Enviar Mensaje</button>
        </form>
    `;

    function activarLogicaFormulario() {
        const formularioActual = document.getElementById('form-contacto');
        const botonActual = document.getElementById('btn-contacto-submit');

        if (formularioActual && contactoWrapper) {
            formularioActual.addEventListener('submit', function(e) {
                e.preventDefault();

                const nombre = document.getElementById('contacto-nombre');
                const email = document.getElementById('contacto-email');
                const mensaje = document.getElementById('contacto-mensaje');
                let formValido = true;

                [nombre, email, mensaje].forEach(campo => campo.classList.remove('error-field'));

                if (!nombre.value.trim()) { nombre.classList.add('error-field'); formValido = false; }
                if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error-field'); formValido = false; }
                if (!mensaje.value.trim()) { mensaje.classList.add('error-field'); formValido = false; }

                if (formValido) {
                    botonActual.disabled = true;
                    botonActual.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                    const datosFormulario = new FormData();
                    datosFormulario.append('Nombre', nombre.value);
                    datosFormulario.append('Correo', email.value);
                    datosFormulario.append('Mensaje', mensaje.value);

                    fetch(urlFormspree, {
                        method: 'POST',
                        body: datosFormulario,
                        headers: { 'Accept': 'application/json' }
                    })
                    .then(response => {
                        if (response.ok) {
                            contactoWrapper.innerHTML = `
                                <div class="success-message-box">
                                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                                    <h3>¡Mensaje recibido con éxito!</h3>
                                    <p>Nos pondremos en contacto contigo a la brevedad para abordar tus requerimientos con total profesionalismo.</p>
                                    <p style="margin-top: 10px; font-weight: 600; color: #3384b3;">Muchas gracias por escribir a EyV Solutions.</p>
                                </div>
                            `;
                        } else {
                            throw new Error('Error en el servidor');
                        }
                    })
                    .catch(error => {
                        botonActual.disabled = false;
                        botonActual.innerHTML = 'Enviar Mensaje';
                        alert('Hubo un inconveniente de conexión. Por favor, inténtalo nuevamente.');
                    });
                }
            });

            const inputs = formularioActual.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.trim()) input.classList.remove('error-field');
                });
            });
        }
    }

    if (formContacto) { activarLogicaFormulario(); }

    const enlacesContactoMenu = document.querySelectorAll('a[href="#contacto"]');
    enlacesContactoMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            const formularioExiste = document.getElementById('form-contacto');
            if (!formularioExiste && contactoWrapper) {
                contactoWrapper.innerHTML = estructuraOriginalFormulario;
                activarLogicaFormulario();
            }
        });
    });
});
