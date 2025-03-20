document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".submenu > a, .submenu > .arrow").forEach(element => {
        element.addEventListener("click", function (e) {
            e.preventDefault(); // Evita la navegación si es un <a>

            let parent = this.closest(".submenu"); // Encuentra el submenú más cercano
            let link = parent.querySelector("a"); // Encuentra el enlace dentro del submenú
            let arrow = parent.querySelector(".arrow"); // Encuentra la flecha dentro del submenú
            
            // Alternar la clase 'open' en el submenú y 'rotate' en el arrow
            let isOpen = parent.classList.toggle("open");
            if (arrow) arrow.classList.toggle("rotate", isOpen);

            // Cerrar otros submenús en el mismo nivel
            parent.parentElement.querySelectorAll(".submenu").forEach(sibling => {
                if (sibling !== parent) {
                    sibling.classList.remove("open");
                    let siblingArrow = sibling.querySelector(".arrow");
                    if (siblingArrow) siblingArrow.classList.remove("rotate");
                }
            });
        });
    });
});


// esta funcion es para los submenus de la barra horizontal superior
// optiene btn de perfil, notificaciones y mensajes

const menuBtn = document.getElementById('icon-user-perfil');
const submenu = document.getElementById('sub-menu');

menuBtn.addEventListener('click', () => {
    submenu.classList.toggle('hidden'); // cambia de oculto a no oculto
});

document.addEventListener('click', (event) => {
    if(!menuBtn.contains(event.target) && !submenu.contains(event.target)){ //si el btn menu no tiene el objetovo evento
        // y el submenu no tiene el objetivo del evento
        submenu.classList.add('hidden'); //entonces añade el submenu, osea lo hace que se oculte
    } // hace que el cuadrado del submenu se cierre si no pulsamos uno de esos dos btn

});