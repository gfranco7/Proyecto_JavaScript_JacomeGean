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

    let objetoAgregar = {
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
    console.log(objetoAgregar);

    await fetch("https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(objetoAgregar)
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
    fulImgBox.style.display = "flex";
    fulImg.style.backgroundImage = `url(${reference})`
    fulImg.innerHTML = `
        <div id="sombraImg">
            <h2>${infoData.name}</h2>
            <p><strong>Genrer: </strong>${infoData.genres}</p>
            <p><strong>Format: </strong>${infoData.type}</p>
            <p><strong>Platform: </strong>${infoData.platform}</p>
            <p><strong>Status: </strong>${infoData.status}</p>
            <p><strong>Rating: </strong>${infoData.rating} Stars</p>
            <p><strong>Review: </strong>${infoData.review}</p>
        </div>`
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
            <Button class="delete-btn">Remove</Button>
        </div>
        `

        containerSources.innerHTML += contenedorImg
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function (id) {

            const imageContainer = this.parentElement;
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            })
        });
        
    });
}

createImages()

const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function (id) {

            const imageContainer = this.parentElement;
            imageContainer.remove();
            await fetch(`https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data/${id}/`, {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            })
        });
        
    });

    // const PorFormato = btn-formato.addEventListener('click', async function () {
        
    //     let datosAPI = await cargarData()
    
    //     for (const element of datosAPI) {
    //         let contenedorImg = `
    //         <div class="img-container">
    //             <img id="${element.id}" src="${element.img}" onclick="openFulImg(this.src, ${element.id})" alt="">   
    //             <Button class="delete-btn">Remove</Button>
    //         </div>
    //         `
    
    //         containerSources.innerHTML += contenedorImg
    //     }
    //     PorFormato()
    // })

