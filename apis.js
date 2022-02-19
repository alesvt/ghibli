const url = "https://ghibliapi.herokuapp.com/films";
let container = document.getElementById("container");
let tooltip = document.createElement("i");

function filmList(title, description, director, image, originalTitle, id) {

    // container.innerHTML = "";
    let film = document.createElement("div");


    /**
     * CAJA PELI:
     *  - NOMBRE
     *  - DIRECTOR
     *  - DESCRIPCION
     *  - TITULO ORIGINAL
     *  - IMAGEN
     * 
     * 
     */
    film.id =
        film.classList.add("peli");


    let img = document.createElement("img");
    img.src = image;
    img.height = 550;
    film.appendChild(img);
    container.appendChild(film);


    film.addEventListener("click", function() {
        peli(id);
    });


}

function peli(id) {
    fetch(url + "/" + id)
        .then((r) => {
            return r.json()
        })
        .then((peli) => {
            container.innerHTML = "";

            createFilm(peli);
        });
}
let boton = document.getElementById("load_btn");

boton.addEventListener("click", function() {
    container.innerHTML = "";
    fetch(url)
        .then((response) => {
            return response.json();
        }).then((pelis) => {
            console.log(pelis);
            for (let i = 0; i < pelis.length; i++) {

                filmList(pelis[i].title, pelis[i].description, pelis[i].director, pelis[i].image, pelis[i].original_title, pelis[i].id);

            }

        });
    boton.innerText = "Volver al inicio";
});

function createFilm(peli) {
    console.log(peli);
    let cont_peli = document.createElement("div");
    cont_peli.classList.add("contenedor_peli");

    let peli_img = document.createElement("img");
    peli_img.src = peli.movie_banner;
    peli_img.width = 600;

    let peli_desc = document.createElement("p");
    peli_desc.innerText = peli.description;

    let peli_autor = document.createElement("p");
    peli_autor.innerText = peli.director;

    let peli_titulo = document.createElement("p");
    peli_titulo.innerText = peli.title + " (" + peli.original_title + ")";

    cont_peli.appendChild(peli_img);
    cont_peli.appendChild(peli_autor);
    cont_peli.appendChild(peli_titulo);
    cont_peli.appendChild(peli_desc);

    container.appendChild(cont_peli);
}


// pa borrarlo to
// document.body.addEventListener("dblclick", () => {
//     container.innerHTML = ""; 
// })