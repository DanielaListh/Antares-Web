// Crear una lista de servicios o cargarla desde el localStorage
let services = JSON.parse(localStorage.getItem('services')) || [];

// Elementos del DOM
const ServicesForm = document.getElementById('ServicesForm'); // Formulario
const serviceNameInput = document.getElementById('serviceNameInput');
const serviceDescriptionInput = document.getElementById('serviceDescriptionInput');
const servicesList = document.getElementById('servicesList'); // Lista ul

// RENDERIZADO: cuando el método sea llamado, se mostrará en el HTML el objeto servicio
const renderServices = () => {
   servicesList.innerHTML = ""; // Limpiar el contenido de la lista

   services.forEach((service) => { // Recorrer y renderizar cada servicio
       const html = `
           <li data-id="${service.id}" class="services_item">
               <p class="${service.completa ? 'done' : ''}" >${service.id} </p>
               <p class="${service.completa ? 'done' : ''}" id="nameServices"> ${service.txt_nombre}</p>
               <p class="${service.completa ? 'done' : ''}">${service.txt_descripcion}</p>
               <div class="container-bx">
                   <i class="bx bx-check" style="cursor:pointer;"></i>
                   <i class="bx bx-trash" style="cursor:pointer;"></i>
               </div>
               <div class=linea-intermedia></div>
           </li>
       `;

       servicesList.innerHTML += html; // Insertar el servicio en el DOM
   });
}

// Guardar en localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('services', JSON.stringify(services));
}

let contadorId= 0;
// Parte de VALIDACIÓN al hacer clic en el evento enviar
ServicesForm.addEventListener("submit", (event) => {
   event.preventDefault(); // Prevenir comportamiento por defecto del for
   const txt_nombre = serviceNameInput.value.trim();
   const txt_descripcion = serviceDescriptionInput.value.trim();

   let erroresValidacion = false; // si esta en false sign que no hay error

   // Validaciones
   if (txt_nombre.length > 40) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "El nombre no debe superar los 40 caracteres";
       setTimeout(() => error.textContent = "", 5000);
   }

   if (txt_descripcion.length > 100) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "La descripción no debe superar los 100 caracteres";
       setTimeout(() => error.textContent = "", 5000);
   }

   if (!txt_nombre) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "El nombre no debe estar vacío.";
       setTimeout(() => {
           error.textContent = "";
       }, 5000);
       return;
   }

   if (!txt_descripcion) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "La descripción no debe estar vacía.";
       setTimeout(() => {
           error.textContent = "";
       }, 5000);
       return;
   }

   const regex = /^[a-zA-Z\s]*$/; // Validación para no aceptar valores numéricos

   if (!regex.test(txt_nombre)) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "El nombre del servicio no debe contener números.";
       setTimeout(() => {
           error.textContent = "";
       }, 5000);
       return;
   }

   if (!regex.test(txt_descripcion)) {
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "La descripción del servicio no debe contener números.";
       setTimeout(() => {
           error.textContent = "";
       }, 5000);
       return;
   }

   
   // Si no hay errores, crear el objeto service
   if (!erroresValidacion) {
       const service = {
           id: ++contadorId, // Crear un ID único basado en el timestamp actual
           txt_nombre: txt_nombre,
           txt_descripcion: txt_descripcion,
           completa: false
       };

       services.push(service); // Añadir el nuevo servicio a la lista
       saveToLocalStorage(); // Guardar la lista actualizada en el localStorage
       renderServices(); // Renderizar la lista actualizada

       // Limpiar los campos del formulario
       serviceNameInput.value = "";
       serviceDescriptionInput.value = "";
   }
});

// Evento para marcar un servicio como completo o eliminarlo
servicesList.addEventListener("click", (event) => {
   const id = event.target.closest("li").dataset.id;
   if (event.target.classList.contains("bx-check")) {
       const id = event.target.closest("li").dataset.id;
       const service = services.find((service) => service.id == id);
       service.completa = !service.completa;
       console.log(service);

       renderServices();
       saveToLocalStorage();

       event.target.closest("li").querySelector("p").classList.toggle("done"); // done es una class
   }

   if (event.target.classList.contains("bx-trash")) {
       services = services.filter((service) => service.id != id);
       saveToLocalStorage();
       renderServices();

   }
});

// Recuperar lo almacenado en localStorage
document.addEventListener("DOMContentLoaded", () => {
   renderServices();
});