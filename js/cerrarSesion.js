function cerrarSession(){
    let confirmar = confirm("¿Desea cerrar la sesion?"); //confirm es un metodo que muestra un cuadro de dialogo con mensaje y botones
    //corespondientes como aceptar o declinar

    if(confirmar){
        localStorage.removeItem("token");//removemos el token del local storage
        localStorage.removeItem("userRole");// tambien removemos el rol que se habia iniciado
        alert("¡Sesión cerrada con éxito!");
        // Redirigir al login
        window.location.href = 'http://localhost:3000/loginAdmin/';  // falla
    } else{
        alert("Usted sige con la session activa")
        //no anda el else
    }

}

//el metodo ya esta siendo llamado desde el scropt del admin
//veremos mas adelante de que manera es mejor colocarlo, si un llamado al boton desde este sript
// o si es mejor desde el html
//document.getElementById("logoutButton").addEventListener("click", cerrarSesion);
