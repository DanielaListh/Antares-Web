document.addEventListener("DOMContentLoaded", function(){
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = 0;

    function showNextImage(){
        images[currentIndex].classList.remove('active'); //eliminamos la clase active, dejando de ser visible esa img
        currentIndex = (currentIndex + 1) % images.length; // se crea un buble infinito al alcanzar el numero total de img, mediante el operador modulo
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 8000);
});