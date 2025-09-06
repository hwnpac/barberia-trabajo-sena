document.addEventListener('DOMContentLoaded', () => {
    // === Manejar clics en botones con data-target ===
    const buttons = document.querySelectorAll('button[data-target]');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetPage = event.currentTarget.dataset.target;
            if (targetPage) {
                window.location.href = targetPage; // Redirige a la página
            }
        });
    });

    // === Manejar clics en los feature-item (tarjetas de servicios) ===
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Evitar doble redirección si hay un botón dentro
            if (!event.target.closest('button')) {
                const targetPage = event.currentTarget.dataset.target;
                if (targetPage) {
                    window.location.href = targetPage; // Redirige a la página
                }
            }
        });
    });

    // === Desplazamiento suave para el enlace de contacto en el header ===
    const contactLink = document.querySelector('a[href="#contacto"]');
    if (contactLink) {
        contactLink.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // === Manejar formulario de reserva ===
    const formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita recargar la página

            // Obtener valores del formulario
            const servicio = document.getElementById('servicio').value;
            const barbero = document.getElementById('barbero').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;

            // Crear objeto reserva
            const reserva = { servicio, barbero, fecha, hora };

            // Guardar en LocalStorage
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push(reserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));

            // Mostrar confirmación
            alert(`✅ Reserva confirmada:\n\nServicio: ${servicio}\nBarbero: ${barbero}\nFecha: ${fecha}\nHora: ${hora}`);

            // Resetear formulario
            formReserva.reset();
        });
    }
});
