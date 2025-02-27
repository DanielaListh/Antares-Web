document.addEventListener("DOMContentLoaded", function () {
    let submenuLinks = document.querySelectorAll(".submenu > a");

    submenuLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let parent = this.parentElement;

            // Alternar el submenú clickeado
            parent.classList.toggle("open");

            // Cerrar otros submenús en el mismo nivel
            let siblings = parent.parentElement.querySelectorAll(".submenu");
            siblings.forEach((sibling) => {
                if (sibling !== parent) {
                    sibling.classList.remove("open");
                }
            });
        });
    });
});
