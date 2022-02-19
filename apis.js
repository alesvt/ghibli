const url = "https://ghibliapi.herokuapp.com/films";
let container = document.getElementById("container");


function filmList(image, id) {

    let film = document.createElement("div");


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

                filmList(pelis[i].image, pelis[i].id);

            }

        });
    boton.innerText = "Volver al inicio";
});

function createFilm(peli) {
    console.log(peli);
    let cont_peli = document.createElement("div");
    let cont_info = document.createElement("div");
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
    cont_info.appendChild(peli_autor);
    cont_info.appendChild(peli_titulo);
    cont_info.appendChild(peli_desc);

    let lista_lugares_btn = document.createElement("button");
    lista_lugares_btn.innerText = "Listar lugares";
    lista_lugares_btn.classList.add("btn");

    lista_lugares_btn.addEventListener("click", function() {
        container.innerHTML = "";
        fetch(peli.locations)
            .then((r) => {
                return r.json();
            })
            .then((datos) => {
                console.log(datos);
                let lista = document.createElement("div");
                lista.classList.add("lugares_container");
                let c = 0;
                for (let a of datos) { // sacamos los datos del array
                    console.log(a);

                    if (a.films[0] === peli.url) {
                        let elemento = document.createElement("button");
                        elemento.classList.add("lugares_item");
                        elemento.classList.add("btn");
                        elemento.innerText = a.name;
                        let collapsible = document.createElement("div");
                        collapsible.innerHTML = "";
                        let coll_text1 = document.createElement("p");

                        coll_text1.innerText = "Clima: " + a.climate;
                        let coll_text2 = document.createElement("p");
                        coll_text2.innerText = "Tipo de terreno: " + a.terrain;


                        lista.appendChild(elemento);

                        c++;
                    } else {
                        console.log("no va");
                    }
                }
                if (!c) {
                    let info = document.createElement("p");
                    info.classList.add("info");
                    info.innerText = "No hay registros";
                    lista.appendChild(info);
                }
                container.appendChild(lista);
            })

    });
    cont_peli.appendChild(cont_info);
    cont_peli.appendChild(lista_lugares_btn);
    container.appendChild(cont_peli);



}