const URL = new URLSearchParams(window.location.search)

const SPINNER = document.querySelector(".spinner")

setInterval(function () {
    SPINNER.style.display = "block"
}, 2000);


// console.log(URL.get("name"))

fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            const errorMessage = "Ups, noget gik galt. Prøv igen senere."
            document.querySelector(".poke_info").innerHTML +=
                `
        <p class="errorMessage">${errorMessage}</p>
        `
        }
    }) //then tager imod en callback function og får et promise tilbage om at vi nok skal få et response
    .then(function (data) {
        console.log(data)

                SPINNER.style.display = "none"


        const POKE_IMAGE = document.querySelector(".poke_image")
        // console.log(data.sprites.other["dream_world"].front_default)

        POKE_IMAGE.innerHTML =
            `
            <section class ="pokeName_pokeId">
            <h1 class="pokeName">${data.name.toUpperCase()}</h1>
            <p>Nr/${data.id}</p>
            </section>
            <span class="imagePlaceholder">
            <img src="img/1574006.png" class="placeholderImg">
            </span>
            `
        const IMG = new Image()
        IMG.src = data.sprites.other["dream_world"].front_default
        IMG.className = "pokeImg"

        const BACK_IMG = new Image();
        BACK_IMG.src = data.sprites.back_default;
        BACK_IMG.className = "pokeImg pokeImg--hidden";

        IMG.onload = function () {
            setInterval(function () {
                POKE_IMAGE.querySelector(".imagePlaceholder img").style.display = "none"
            }, 2000);
            setTimeout(function () {
                POKE_IMAGE.querySelector(".imagePlaceholder").append(IMG)
                POKE_IMAGE.querySelector(".imagePlaceholder").append(BACK_IMG)
            }, 2000)


        }





        // setTimeout(function () {
        //     POKE_IMAGE.querySelector(".imagePlaceholder img").style.display = "none";
        // }, 9000);


        const switchButton = document.createElement("button")
        switchButton.innerText = "Back view"
        POKE_IMAGE.append(switchButton)
        switchButton.addEventListener("click", myfun)

        function myfun() {
            if (switchButton.innerText === "Back view") {
                switchButton.innerText = "Front view"
            } else {
                switchButton.innerText = "Back view"
            }

            const pokeImg = document.querySelectorAll(".pokeImg")
            pokeImg.forEach(function (element) {
                element.classList.toggle("pokeImg--hidden");
            })
        }



        // <img src="${data.sprites.other["dream_world"].front_default}" class="pokeImg">
        //     <img src="${data.sprites.back_default}" class="pokeImg pokeImg--hidden">



        // ----------------poke søge parametre--------------------

        const DIV = document.querySelector(".pokemon")

        DIV.innerHTML =
            `
            <section class="dataInfo">
            <p class="p1">Height: ${data.height}</p>
            <p class="p2">Weight: ${data.weight}</p>
            
            <p>Abilities:</p>
            <ul>${data.abilities.map(element => `<li>${element.ability.name}</li>`).join("")}
            
            </section>
            `
    })

// ----------------searcform---------------------

const DATALIST = document.querySelector("#pokemons")

const SEARCH_FIELD = document.querySelector(".pokemon_search")

SEARCH_FIELD.addEventListener("focus", getDataList)
SEARCH_FIELD.addEventListener("focusout", function (event) {
    SEARCH_FIELD.removeEventListener("focus", getDataList)
})//?


function getDataList(event) {

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1350`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            data.results.forEach(function (pokemon) {
                DATALIST.innerHTML +=
                    `<option>${pokemon.name}</option>`
            })
        })
}


















// img med link fra developer tool / button

// const button = document.querySelector(".switchbutton")

// addEventListener(click (button))
// if (front_default === front){
//     return
// }else {

// } FOR PÅ 1 KANP ELSE PÅ EN ANDEN KNAP