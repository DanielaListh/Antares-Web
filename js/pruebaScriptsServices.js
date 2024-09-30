document.getElementById('ServicesForm').addEventListener('submit', async function (event) {

    event.preventDefault(); // evitar que se ejecute algo que no se desee

    const serviceNameInput = document.getElementById('serviceNameInput').value;
    const serviceDescriptionInput = document.getElementById('serviceDescriptionInput').value;
    const serviceImageInput = document.getElementById('serviceImageInput').files[0];

    if (!serviceImageInput){ // si la imagen es diferente
        alert('por favor, seleciona una imagen.');
        return; //que se vea el mensaje en el dom
    }

    const imageData= await readFileAsDataURL(imageFile);

    const services= JSON.parse(localStorage.getItem('servicios')) || []; // es la lista que contiene los servicios
    const newService = { // vendria siendo supuestamente la creacion de el servicio
        idService: services.length + 1, // va a sumar el id de ese servicio para hacerlo no null incremental
        nameService: serviceNameInput,
        descriptionService: serviceDescriptionInput,
        imageService:imageData,
    };

    services.push(newService); // lo que esta en newservice se envia a el local storage
    localStorage.setItem('servicios', JSON.stringify(services)); // 

    displayServices();
    document.getElementById('ServicesForm').reset(); 
});

function displayServices(){ // mostrar en front
    const serviceList = document.getElementById('servicesList');
    serviceList.innerHTML=''; // limpia la lita

    const services= JSON.parse(localStorage.getItem('servicios')) || [];

    services.forEach(service => {
        const li =  document.createElement('li');
        li.innerHTML= `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <img src="${service.image} alt="${service.name}" style="width: 100px;">
        `;
        serviceList.appendChild(li);   
    });

}

window.addEventListener('load', displayServices);