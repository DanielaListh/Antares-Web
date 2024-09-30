// Crear la lista de servicios

let services = []; // crear un lista o array vacio

const ServicesForm = document.getElementById('ServicesForm'); // Formulario
const serviceNameInput = document.getElementById('serviceNameInput');
const serviceDescriptionInput = document.getElementById('serviceDescriptionInput');
const servicesList = document.getElementById('servicesList'); // Lista li

// RENDERIZADO,cuando el metodo sea llamado, se mostrara en el HTML ese nuevo objeto servicio 
const renderServices = () => { // creacion de metodo o funcion, proceso de renderizado 
   servicesList.innerHTML = ""; // Borrar o limpiar toda la infor del ul
   services.forEach((service) => { // que la lista recorra con foreach los objetos servicio 
       const html = ` 
           <li data-id="${service.id}" class="services__item">
                <h3 class="service_h3 ${service.txt_nombre}">${service.txt_nombre}</h3>
               <p>${service.txt_descripcion}</p>
               <div>
                   <i class="bx bx-trash"></i>
               </div>
           </li>
       `; // constante html, creada para mostrar el servicio que se vaya creando
        // VER MAS ADELante como mostrar la img en el DOM
       servicesList.innerHTML += html; // hace el "dibujo" de la const html en el html(DOM)
   })
}// argumentos          //contantes privadas #+nombreDeLaConstante


// parte de VALIDACION al hacer clic en el evento enviar
ServicesForm.addEventListener("submit", async (event) => { //ADDEVENTLISTENER permite que un elemento escuche un evento especifico y ejecute una funcion cuando ese 
   event.preventDefault(); //previene que cualquier otra cosa no se ejecute
   const txt_descripcion = (serviceDescriptionInput.value.trim()); // evita que haya muchos espacios en blanco
   const txt_nombre = (serviceNameInput.value.trim());

   let erroresValidacion = false;// variable error de validacion que esta por defautl en falsa, significa que no hay errores

   if(txt_nombre.length > 40){ // si el contenido que hay en txt descripcion es mayor que 100, entonces sale un error
    erroresValidacion = true;
    const error = document.querySelector(".error");
    error.textContent = "El texto del nombre no debe superar los 40 caracteres";

    setTimeout(() => {
        error.textContent = "";// se quita el error lugo de 5 seg
    }, 5000); // 5.000 milisengundos = 5 segundos
}

   if(txt_descripcion.length > 100){ // si el contenido que hay en txt descripcion es mayor que 100, entonces sale un error
       erroresValidacion = true;
       const error = document.querySelector(".error");
       error.textContent = "El texto de la descripcion no debe superar los 100 caracteres";

       setTimeout(() => {
           error.textContent = "";// se quita el error lugo de 5 seg
       }, 5000); // 5.000 milisengundos = 5 segundos
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
    error.textContent = "la descripción no deben estar vacía.";
    setTimeout(() => {
        error.textContent = "";
    }, 5000);
    return;
}

const regex = /^[a-zA-Z\s]*$/; /// 

if (!regex.test(txt_nombre)){ // validacion para no aceptar valores numericos 
    erroresValidacion=true;
    const error = document.querySelector(".error");
    error.textContent="La descripción del servicio no debe contener números.";
    setTimeout(() => {
        error.textContent = "";
    }, 5000);
    return; 
}

if (!regex.test(txt_descripcion)){
    erroresValidacion=true;
    const error = document.querySelector(".error");
    error.textContent="La descripción del servicio no debe contener números."; 
    setTimeout(() => {
        error.textContent = "";
    }, 5000);
    return;
}

    // Si no hay errores, creamos el objeto service
    //subir los archivos al local storage POST
    if (!erroresValidacion) { // estamos preguntando si no hay errores de validacion entonces sigue con el code
        const service = {
            id: Date.now(), //asignar un id
            txt_nombre: txt_nombre, // Asignar el nombre capturado
            txt_descripcion: txt_descripcion // Asignar la descripción capturada
        };
   
       try {
           const response = await fetch('http://127.0.0.1:5501', {
               method: 'POST', // post para enviar o crear o subir al localstorage
               body: JSON.stringify(service),  // pasamos el obj json a json en string, servicio CREADo EN LA LINEA 42
               headers: {
               'Content-type': 'application/json; charset=UTF-8',
               },
           })
           const json = await response.json(); // ESPERO A QUE ESA RESPUESTA SE TRANSFORME EN UN JSON
           service.id = json.id;                                                                     // ojo al piojo
           services.push(service); // AGREGUE el servicio A LA LISTA DE servicios

       } catch (error) {
           console.log(error);
       }

       serviceNameInput.value = ""; // limpiar el texto en el input de nombre
       serviceDescriptionInput.value = ""; // limpiar el texto en el input de descripcion
       renderServices();
   }
})

// VAMOS A OBTENER li, Borrar por id un servicio
servicesList.addEventListener("click", (event) => {// el evento clic cuando se hacxe clic ya sea en el btn trash o btn checked

   if (event.target.classList.contains("bx-trash")){ // el evento clic de borrar ese objeto
       const id = event.target.closest("li").dataset.id; // dataset proporciona acceso a los atributos data-, en este caso accede al id
       //const serviceIndex = services.find((service) => service.id == id);// undefined, como exepcion significa que el find no encontro un elemento en service que coincida con el id de dataset
       services.splice(services.findIndex((service) => service.id == id), 1); // met splice modif el content de una list, en este caso elimina 
       fetch(`http://127.0.0.1:5501/crud-Services.html?id=${id}`, { // CAMBIO URL Y ID
           method: 'DELETE',// por medio de la url elimina no solo el id sino los atributos a los cuales esta enlazado
       });
       event.target.closest("li").remove(); // el elemento mas cercano de li, se removera en el html 
   }
});


// actualizar la interfaz del usuario
document.addEventListener("DOMContentLoaded", () => { // el evento se dispara al cargar todo el DOM

   // fetch('https://jsonplaceholder.typicode.com/posts')
   //     .then((response) => response.json())
   //     .then((json) => console.log(json));

   fetch("http://127.0.0.1:5501") // NO NECESITO PONER EL METODO GET. porque el fetch incluye ya ese get si no se especifica ningun otro metodo
       .then((response) => response.json()) //resolucion de la promesa, la respuesta del link la convierte en un obj json
       .then((json) => { services = json;
           renderServices();
       })
       .catch((error) => console.error('Error al obtener los servicios:', error));
   
});
