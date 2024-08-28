async function cargarData() {
    let data = await fetch("https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data")
    let infoData = await data.json()
    console.log(infoData)
    return infoData
}
cargarData()

let btnAddForm = document.getElementById("buttonAddForm")
let listaGeneros = []
btnAddForm.addEventListener("click", () => {
    let generosDisponibles = document.querySelectorAll(".form-check-input")
    for (const genero of generosDisponibles) {
        genero.addEventListener("click", () => {
            let nombreGenero = genero.getAttribute("value")

            if (!listaGeneros.includes(nombreGenero)) {
                listaGeneros.push(nombreGenero)
            } else {
                let posicion = listaGeneros.indexOf(nombreGenero)
                listaGeneros.splice(posicion, 1)
            }
            let texto = listaGeneros.join(", ")
            console.log(listaGeneros);
            document.getElementById("formGeneros").setAttribute("listgen", texto)

        })
    }
    document.getElementById("fondoOscuro").style.display = "flex"
})

let btnSubirForm = document.getElementById("subirDatos").addEventListener("click", async () => {

    let name = document.getElementById("form-name").value
    let listGeneros = document.getElementById("formGeneros").getAttribute("listgen")
    let formato = document.getElementById("estado").innerText
    let plataforma = document.getElementById("platform").innerText
    let estado = document.getElementById("status").innerText
    let rating = document.getElementById("rating").innerText
    let date = document.getElementById("new_date").value
    let review = document.getElementById("new_review").value
    let img = document.getElementById("new_img").value

    let SubirObjeto = {
        "name": name,
        "genres": listGeneros,
        "platform": plataforma,
        "date": date,
        "status": estado,
        "review": review,
        "type": formato,
        "rating": rating,
        "img": img
    }
    console.log(SubirObjeto);

    await fetch("https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(SubirObjeto)
    })

    document.getElementById("fondoOscuro").style.display = "none"

})


let itemsCajas = document.querySelectorAll(".dropdown-item")
for (const elemento of itemsCajas) {
    elemento.addEventListener("click", () => {
        let objetivo = elemento.getAttribute("cont")
        console.log(objetivo);

        let valor = elemento.textContent
        document.getElementById(objetivo).innerHTML = valor
    })
}



const fulImgBox = document.getElementById("fulImgBox"),
    fulImg = document.getElementById("fulImg");

async function openFulImg(reference, id) {
    let data = await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`)
    let infoData = await data.json()
    fulImg.innerHTML = ""
    fulImgBox.style.display = "flex";
    fulImg.style.backgroundImage = `url(${reference})`

    let sombraImg = document.createElement('div')
    sombraImg.id='sombraImg'

    fulImg.appendChild(sombraImg)
    sombraImg.innerHTML = `
            <h2>${infoData.name}</h2>
            <p><strong>Genrer: </strong>${infoData.genres}</p>
            <p><strong>Format: </strong>${infoData.type}</p>
            <p><strong>Platform: </strong>${infoData.platform}</p>
            <p><strong>Status: </strong>${infoData.status}</p>
            <p><strong>Rating: </strong>${infoData.rating} Stars</p>
            <p><strong>Review: </strong>${infoData.review}</p>
        `

    let botonEditar = document.createElement("button")
    botonEditar.innerHTML = "Editar"
    botonEditar.id = `btn-edit${id}`
    fulImg.appendChild(botonEditar)
    
    botonEditar.addEventListener('click', async ()=>{   
        if (botonEditar.innerHTML=="Guardar") {
            let elementosInput = document.querySelectorAll(".inputEdit")
            sombraImg.innerHTML = `
                <h2>${elementosInput[0].value}</h2>
                <p><strong>Genrer: </strong>${elementosInput[1].value}</p>
                <p><strong>Format: </strong>${elementosInput[2].value}</p>
                <p><strong>Platform: </strong>${elementosInput[3].value}</p>
                <p><strong>Status: </strong>${elementosInput[4].value}</p>
                <p><strong>Rating: </strong>${elementosInput[5].value} Stars</p>
                <p><strong>Review: </strong>${elementosInput[6].value}</p>
            `
            let objetoAgregar = {
                "name": elementosInput[0].value,
                "genres": elementosInput[1].value,
                "platform": elementosInput[3].value,
                "date": "date",
                "status": elementosInput[4].value,
                "review": elementosInput[6].value,
                "type": elementosInput[2].value,
                "rating": elementosInput[5].value,
                "img": reference
            }
            botonEditar.innerHTML="Editar"
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(objetoAgregar)
            })
        }else{
            sombraImg.innerHTML = `
                <input class="inputEdit" value="${infoData.name}"></input>
                <p><strong>Genrer: </strong><input class="inputEdit" value="${infoData.genres}"></input></p>
                <p><strong>Format: </strong><input class="inputEdit" value="${infoData.type}"></input></p>
                <p><strong>Platform: </strong><input class="inputEdit" value="${infoData.platform}"></input></p>
                <p><strong>Status: </strong><input class="inputEdit" value="${infoData.status}"></input></p>
                <p><strong>Rating: </strong><input class="inputEdit" value="${infoData.rating}"></input></p>
                <p><strong>Review: </strong><input class="inputEdit" value="${infoData.review}"></input></p>
            `
            botonEditar.innerHTML="Guardar"
        }
    })


}
function closeImg() {
    fulImgBox.style.display = "none";
}


const createImages = async function () {
    let containerSources = document.querySelector(".img-gallery")
    let datosAPI = await cargarData()

    for (const element of datosAPI) {
        let contenedorImg = `
        <div class="img-container">
            <img id="${element.id}" src="${element.img}" onclick="openFulImg(this.src, ${element.id})" alt="">   
            <Button value="${element.id}" class="delete-btn">Remove</Button>
        </div>
        `

        containerSources.innerHTML += contenedorImg
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            let id = button.getAttribute('value');
            const imageContainer = this.parentElement;
            console.log(id);
            
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE"
            })
        });
        
    });
}

createImages()


const btnFortmato = document.getElementById("btn_formato")

btnFortmato.addEventListener("click", async () =>{
    let containerImagenes = document.querySelector(".img-gallery")
    containerImagenes.innerHTML = ""

    let containerLibros = document.createElement("div")
    containerLibros.classList.add("libro-container")
    
    containerLibros.style.color = "#350349"
    containerLibros.innerHTML = "<h2><center>Books</center></h2>"

    let containerPeliculas = document.createElement("div")
    containerPeliculas.classList.add("peliculas-container")
    
    containerPeliculas.style.color = "#350349"
    containerPeliculas.innerHTML = "<h2><center>Movies</center></h2>"

    let containerSeries = document.createElement("div")
    containerSeries.classList.add("series-container")
   
    containerSeries.style.color = "#350349"
    containerSeries.innerHTML = "<h2><center>Series</center></h2>"
    
    
    let datosMockapi = await cargarData()
    for (const recurso of datosMockapi) {
        let contenedorImg = `
        <div class="img-container">
            <img id="${recurso.id}" src="${recurso.img}" onclick="openFulImg(this.src, ${recurso.id})" alt="">   
            <Button value="${recurso.id}" class="delete-btn">Remove</Button>
        </div>
        `

        if (recurso.type === "Movie") {
            containerPeliculas.innerHTML += contenedorImg
        } else if (recurso.type === "Books") {
            containerLibros.innerHTML += contenedorImg
        } else{
            containerSeries.innerHTML += contenedorImg
        }

        console.log(containerPeliculas);
        
    }

    containerImagenes.appendChild(containerPeliculas)    
    containerImagenes.appendChild(containerLibros)    
    containerImagenes.appendChild(containerSeries)    

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            let id = button.getAttribute('value');
            const imageContainer = this.parentElement;
            console.log(id);
            
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE"
            })
        });
        
    });
})

const btnPlatform = document.getElementById("btn_platform")

btnPlatform.addEventListener("click", async () =>{
    let containerImagenes = document.querySelector(".img-gallery")
    containerImagenes.innerHTML = ""

    let containerNetflix = document.createElement("div")
    containerNetflix.classList.add("netflix-container")
    containerNetflix.style.color = "#350349"
    containerNetflix.innerHTML = "<h2><center>Netflix</center></h2>"

    let containerPrime = document.createElement("div")
    containerPrime.classList.add("prime-container")
    containerPrime.style.color = "#350349"
    containerPrime.innerHTML = "<h2><center>Prime Video</center></h2>"

    let containerHBO = document.createElement("div")
    containerHBO.classList.add("hbo-container")
    containerHBO.style.color = "#350349"
    containerHBO.innerHTML = "<h2><center>HBO</center></h2>"

    let containerApple = document.createElement("div")
    containerApple.classList.add("apple-container")
    containerApple.style.color = "#350349"
    containerApple.innerHTML = "<h2><center>Apple Books</center></h2>"

    let containerWattpad = document.createElement("div")
    containerWattpad.classList.add("wattpad-container")
    containerWattpad.style.color = "#350349"
    containerWattpad.innerHTML = "<h2><center>Wattpad</center></h2>"
    
    
    let datosMockapi = await cargarData()
    for (const recurso of datosMockapi) {
        let contenedorImg = `
        <div class="img-container">
            <img id="${recurso.id}" src="${recurso.img}" onclick="openFulImg(this.src, ${recurso.id})" alt="">   
            <Button value="${recurso.id}" class="delete-btn">Remove</Button>
        </div>
        `

        if (recurso.platform === "Netflix") {
            containerNetflix.innerHTML += contenedorImg
        } else if (recurso.platform === "Prime Video") {
            containerPrime.innerHTML += contenedorImg
        } else if(recurso.platform === "HBO"){
            containerHBO.innerHTML += contenedorImg
        } else if (recurso.platform === "Apple Books"){
            containerApple.innerHTML += contenedorImg
        } else{
            containerWattpad.innerHTML += contenedorImg
        }
        
    }

    containerImagenes.appendChild(containerNetflix)    
    containerImagenes.appendChild(containerPrime)    
    containerImagenes.appendChild(containerHBO)  
    containerImagenes.appendChild(containerApple)
    containerImagenes.appendChild(containerWattpad)  

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            let id = button.getAttribute('value');
            const imageContainer = this.parentElement;
            console.log(id);
            
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE"
            })
        });
        
    });
})


const btnStatus = document.getElementById("btn_status")

btnStatus .addEventListener("click", async () =>{
    let containerImagenes = document.querySelector(".img-gallery")
    containerImagenes.innerHTML = ""

    let containerPaused = document.createElement("div")
    containerPaused.classList.add("paused-container")
    containerPaused.style.color = "#350349"
    containerPaused.innerHTML = "<h2><center>Paused</center></h2>"

    let containerFinished = document.createElement("div")
    containerFinished.classList.add("finished-container")
    containerFinished.style.color = "#350349"
    containerFinished.innerHTML = "<h2><center>Finished</center></h2>"

    let containerProducing = document.createElement("div")
    containerProducing.classList.add("producing-container") 
    containerProducing.style.color = "#350349"
    containerProducing.innerHTML = "<h2><center>Still Producing</center></h2>"
    
    
    let datosMockapi = await cargarData()
    for (const recurso of datosMockapi) {
        let contenedorImg = `
        <div class="img-container">
            <img id="${recurso.id}" src="${recurso.img}" onclick="openFulImg(this.src, ${recurso.id})" alt="">   
            <Button value="${recurso.id}" class="delete-btn">Remove</Button>
        </div>
        `

        if (recurso.status === "Paused") {
            containerPaused.innerHTML += contenedorImg
        } else if (recurso.status === "Finished") {
            containerFinished.innerHTML += contenedorImg
        } else{
            containerProducing.innerHTML += contenedorImg
        }
        
    }

    containerImagenes.appendChild(containerPaused)    
    containerImagenes.appendChild(containerFinished)    
    containerImagenes.appendChild(containerProducing)    

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            let id = button.getAttribute('value');
            const imageContainer = this.parentElement;
            console.log(id);
            
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE"
            })
        });
        
    });
})



const btnRating = document.getElementById("btn_rating")

btnRating .addEventListener("click", async () =>{
    let containerImagenes = document.querySelector(".img-gallery")
    containerImagenes.innerHTML = ""

    let container4stars = document.createElement("div")
    container4stars.classList.add("4stars-container")
    container4stars.style.color = "#350349"
    container4stars.innerHTML = "<h2><center>4 Stars (+) </center></h2>"

    let container3stars = document.createElement("div")
    container3stars.classList.add("3stars-container")
    container3stars.style.color = "#350349"
    container3stars.innerHTML = "<h2><center>Less than 4 Stars</center></h2>"

    
    
    let datosMockapi = await cargarData()
    for (const recurso of datosMockapi) {
        let contenedorImg = `
        <div class="img-container">
            <img id="${recurso.id}" src="${recurso.img}" onclick="openFulImg(this.src, ${recurso.id})" alt="">   
            <Button value="${recurso.id}" class="delete-btn">Remove</Button>
        </div>
        `

        if (recurso.rating >= "4") {
            container4stars.innerHTML += contenedorImg
        } else{
            container3stars.innerHTML += contenedorImg
        }
        
    }

    containerImagenes.appendChild(container4stars)    
    containerImagenes.appendChild(container3stars)    
       

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            let id = button.getAttribute('value');
            const imageContainer = this.parentElement;
            console.log(id);
            
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE"
            })
        });
        
    });
})