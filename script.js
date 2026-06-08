document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DEL CARRUSEL DE IMÁGENES ---
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    }

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, slideInterval);


    // --- LÓGICA DEL MODAL ACCESO CLIENTES ---
    const modal = document.getElementById("modal-login");
    const btnAcceso = document.getElementById("btn-acceso");
    const closeBtn = document.querySelector(".close-modal");
    const linkContacto = document.getElementById("link-contacto-desde-modal");

    if(btnAcceso) {
        btnAcceso.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    if(linkContacto) {
        linkContacto.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    const loginForm = document.getElementById("login-form");
    if(loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Usuario no registrado. Valida tus credenciales o solicita acceso en la sección de contacto.");
        });
    }
});
