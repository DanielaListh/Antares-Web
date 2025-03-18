function cerrarSession(){
    localStorage.removeItem("Token");//removemos el token del local storage
    localStorage.removeItem("userRole");// tambien removemos el rol que se habia iniciado
    //window.location.href='http://localhost:3000/loginAdmin'; //provemos
    window.location.href = 'http://localhost:3000/loginAdmin'; // no esta funcionando la redireccion de la pagina al login

    
}