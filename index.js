const URL = new URLSearchParams(window.location.search)
const OFFSET = parseInt(URL.get("offset") || "0")

const NEXT_PAGE = document.querySelector(".nextPage")
const PREV_PAGE = document.querySelector(".prevPage")

fetch(`https://pokeapi.co/api/v2/pokemon?limit=14&offset=${OFFSET}`) //unresolved promise
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            const errorMessage = "Ups, noget gik galt. Prøv igen senere."
            document.querySelector(".poke_info").innerHTML +=
                `
        <p class=   "errorMessage">${errorMessage}</p>
        `
        }
    }) //then tager imod en callback function og får et promise tilbage om at vi nok skal få et response
    .then(function (data) {
        console.log(data)



        const LAST_OFFSET = data.count - (data.count % 10)
        NEXT_PAGE.href = `/?offset=${Math.min(LAST_OFFSET, OFFSET + 10)}`
        PREV_PAGE.href = `/?offset=${Math.max(OFFSET - 10, 0)}`
        // PREV_PAGE.href = `/?offset=${OFFSET <= 0 ? 0 : OFFSET - 10}`
        //offset er større< eller lig med= 0 så? 0 ellers: offset-20
        //offset = 0 - 10



        //Hente pokelist ind i poke_info-----------------------
        const UL = document.querySelector(".pokeList")
        data.results.forEach(function (result) {
            const LI = document.createElement("li")
            LI.innerHTML = `<a href="/pokemon.html?name=${result.name}">${result.name}</a>`
            UL.append(LI)
        })

    })





// ----------------searcform autocomplete list---------------------

const DATALIST = document.querySelector("#pokemons");
const SEARCH_FIELD = document.querySelector(".pokemon_search");
const SEARCH_TYPE = document.querySelector("#searchType");



//--------------CODE EXTRA WORK OPTION PARAMETERS BEGINNING----------------//

SEARCH_FIELD.addEventListener("input", selectedOptionChoice)
//tilføj en eventlistener til search field som holder øje med om inputtet ændrer sig.

function selectedOptionChoice() {
    //tjekker om search type er valgt til at være "types" 

if(SEARCH_TYPE.value === "type" || SEARCH_TYPE.value === "ability") {
        //tjekker om search field feltet IKKE er tomt.

        if(SEARCH_FIELD.value != "") {
            getPokemonFromChosenOption()
        }
    }
}

function getPokemonFromChosenOption() {
    url = "https://pokeapi.co/api/v2/type/" + SEARCH_FIELD.value
    //gør en url klar, hvor der er indsat værdien af input(search_field) i slutningen.
    //så fx. https://pokeapi.com/api/v2/type/" + "grass".
    // Hvis altså der står grass i input feltet.

    fetch(url)
    .then(function (response) {
        // hvis hjemmesiden er alt andet end IKKE fundet går vi ind i if.
        // dvs. at f.eks. https://pokeapi.com/api/v2/type/grass giver status code 200 og vi går ind i if.
        // og hjemmesiden vil ikke blive fundet hvis det fx. er https://pokeapi.com/api/v2/type/charizard for så er det en status 404
        if(!response.status == 404) {
            SEARCH_FIELD.value = ""
        }
        return response.json();
    })
    .then(function (data) {
            DATALIST.innerHTML = ""
            data.pokemon.forEach(function (item) {
                const option = document.createElement("option");
                option.value = item.pokemon.name;
                DATALIST.appendChild(option);
            });
            //clear inputtet(search_field) for den valgte type, eftersom vi er klar nu til at vælge en pokemon relateret til typen vi valgte.
            SEARCH_FIELD.value = ""
        });
}

//---------------------CODE EXTRA WORK OPTION PARAMETERS ENDING---------------//

// Define the event listener
SEARCH_TYPE.addEventListener("change", optionChange);

// Function to handle the change event
function optionChange() {
    DATALIST.innerHTML = ""; // Clear existing datalist options
    if (SEARCH_TYPE.value === "pokemon") {
        getDataList("pokemon");
    } else if (SEARCH_TYPE.value === "type") {
        getDataList("type");
    } else if (SEARCH_TYPE.value === "ability") {
        getDataList("ability");
    }
}


// Call the getDataList function with "pokemon" initially
getDataList("pokemon");

function getDataList(option) {
    let url;
    if (option === "pokemon") {
        url = "https://pokeapi.co/api/v2/pokemon?limit=1350";
    } else if (option === "type") {
        url = "https://pokeapi.co/api/v2/type";
    } else if (option === "ability") {
        url = "https://pokeapi.co/api/v2/ability";
    }

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (option === "pokemon") {
                data.results.forEach(function (pokemon) {
                    const option = document.createElement("option");
                    option.value = pokemon.name;
                    DATALIST.appendChild(option);
                });
            } else if (option === "type" || option === "ability") {
                DATALIST.innerHTML = ""
                data.results.forEach(function (item) {
                    const option = document.createElement("option");
                    option.value = item.name;
                    DATALIST.appendChild(option);
                });
            }
        });

}
