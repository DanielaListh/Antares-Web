// esta funcion ayuda a que nadie pueda acceder a un html sin estar autorizado
function verificarAcceso() {
    const token = localStorage.getItem("token");//del localStorage se obtiene el token
    const userRole = localStorage.getItem("userRole");//tambien se obtiene el userRole

    //verifica si hay un token, y si no lo hay redigige al login
    if (!token || userRole !== "admin") {// se verifica si ese userRole del local es un admin
         alert("Acceso no autorizado");
         window.location.href = "LoginAdmin.html"; // Redirigir al login
    }
 }
window.onload = verificarAcceso;

