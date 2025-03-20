// esta funcion ayuda a que nadie pueda acceder a un html sin estar autorizado
function verificarAcceso() {
    const token = localStorage.getItem("token");//del localStorage se obtiene el token
    const userRole = localStorage.getItem("userRole");

    //verifica si hay un token, y si no lo hay redigige al login
    if (!token && userRole !== 3) {// se verifica si ese userRole del local es un admin
     //si token es diferente y userRole es diferente de 3
         alert("Acceso no autorizado");
         window.location.href = 'http://localhost:3000/loginAdmin/'; // Redirigir al login
    }
 }
window.onload = verificarAcceso;
// window.onload sirve para establecer una función que se ejecutará automáticamente cuando la página web termine de cargarse por completo

