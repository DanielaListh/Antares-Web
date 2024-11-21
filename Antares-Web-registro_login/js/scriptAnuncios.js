addEventListener('DOMContentLoaded', () => { 

    const imagenes = ['ImageAntaresWeb/MoldeAnuncioweb.png', 'ImageAntaresWeb/MoldeAnunciosWEB.png']

    let i = 1
    const img1 = document.querySelector('#img1')
    const img2 = document.querySelector('#img2')
    const barra_progreso = document.querySelector('#barra-progreso')
    const indicadores = document.querySelector('#indicadores') 
    let porcentaje_base = 100/imagenes.length //que tanto buscamos que avance la barra de progreso
    let porcentaje_actual = porcentaje_base // acumula el porcentaje hasta llegar al 100% y luego vuelva a ocmenzar 

    for(let e = 0; e < imagenes.length; e++) {
        const div = document.createElement('div')
        div.classList.add('circulos')
        div.id = e //indicador de donde va la img
        divIndicadores.appendChild(div)
    }

    //agregar a la barra de progreso
    barra_progreso.style.width = `$(porcentaje_base)%`
    img1.src = imagenes[0]
    const circulos=document.querySelector('.circulos')
    circulos[0].classList.add('.resaltado')

    //funcion que se ejecuta cada intervalo definido
    const slideshow= () => {
        img2.src = imagenes[i]
        const circuloActual = Array.from(circulos).find(element => element.id ==i)
        Array.from(circulos).forEach(cir => cir.classList.remove('resaltado')) //resaltado de todos los elementos del circulo
        circuloActual.classList.add('resaltado')

        img2.classList.add('active')
        i++
        porcentaje_actual+=porcentaje_base
        barra_progreso.style.width = `${porcentaje_actual}%`
        if(i==imagenes.length){
            i=0
            porcentaje_actual = porcentaje_base - porcentaje_base
        }

        setTimeout(() => {
            img1.src = img2.src
            img2.classList.remove('active')
        }, 1000)

        setInterval(slideshow, 4000)
    }
    

})