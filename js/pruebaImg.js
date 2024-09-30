document.getElementById('fileInput').addEventListener('change', function(event) {
    const services = event.target.files; // es la lista llamada (se llamaba file)
    const imageList = document.getElementById('imageList');
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = function(e) { // onload controla que cuando se ejecuta un evento FileReader ha terminado de leer un archivo
        const li = document.createElement('li'); // el evento se disparacuando el archivo se ha leido con exito.
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        img.style.width = '600px'; // Ajusta el tamaño según tus necesidades
        li.appendChild(img);
        imageList.appendChild(li);

        //almacena en localStorage
        const llaveUnica = `image-${localStorage.length}`;
        localStorage.setItem(llaveUnica, e.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  });
  

  // Cargar imágenes desde localStorage al cargar la página
window.addEventListener('load', () => {
    const imageList = document.getElementById('imageList');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);// obtener el nombre de la clave almacenada en localStorage en una posición específica
      if (key.startsWith('image-')) { // const.startsWith(cadenaBuscada[, posicion=opcional]) este metodo es booleano
        const li = document.createElement('li'); //si el if pasa a truecrea los elementos en DOM y etc...
        const img = document.createElement('img');
        img.src = localStorage.getItem(key); //Define la URL de la imagen que se va a mostrar
        img.alt = `Imagen ${i}`;
        img.style.width = '100px'; // ajusta el tamaño según tus necesidades
        li.appendChild(img);
        imageList.appendChild(li);
      }
    }
  });