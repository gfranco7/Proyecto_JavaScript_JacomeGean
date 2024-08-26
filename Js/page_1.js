async function cargarData(){
    let data = await fetch("https://66c8fd778a477f50dc2fc022.mockapi.io/bookzemov_data")
    let infoData = await data.json()
    console.log(infoData)    
}
cargarData()





const fulImgBox = document.getElementById("fulImgBox"),
fulImg = document.getElementById("fulImg");

function openFulImg(reference){
    fulImgBox.style.display = "flex";
    fulImg.style.backgroundImage = `url(${reference})`
}
function closeImg(){
    fulImgBox.style.display = "none";
}

// Selecciona todos los botones con la clase 'delete-btn'
const deleteButtons = document.querySelectorAll('.delete-btn');

// Añade un event listener a cada botón
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Encuentra el contenedor padre del botón (que es 'image-container')
        const imageContainer = this.parentElement;

        // Elimina el contenedor de la imagen del DOM
        imageContainer.remove();
    });
});