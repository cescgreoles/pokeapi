const typeColors = {
    fire: "#ff7402",
    grass: "#33a165",
    steel: "#00858a",
    water: "#0050ac",
    psychic: "#c90086",
    ground: "#c90086",
    ice: "#70deff",
    flying: "#5d4e75",
    ghost: "#4d5b64",
    normal: "#753845",
    poison: "#7e0058",
    rock: "#6e1a00",
    fighting: "#634136",
    dark: "#272625",
    bug: "#6e1a00",
    dragon: "#00c431",
    electric: "#bba909",
    fairy: "#d31c81",
    unknow: "#757575",
    shadow: "#29292c",
};

const divHeader = document.createElement("div");
const divBienvenido = document.createElement("div");
const divSearch = document.createElement("div");
const divPokemons = document.createElement("div");

const imgHeader = document.createElement("img");
const h1Bienvenido = document.createElement("h1");
const h3Search = document.createElement("h3");

h1Bienvenido.textContent = "¡HOLA, BIENVENIDOS A NUESTRA POKEDEX!";
h3Search.textContent = "BUSCA AQUÍ TUS POKEMONS FAVORITOS";

divHeader.className = "title-container";
divBienvenido.className = "bienvenido-menu-container";
divSearch.className = "search-container";
divPokemons.className = "pokemons-container";
imgHeader.className = "title-image";

imgHeader.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png";

document.body.appendChild(divHeader);
divHeader.appendChild(imgHeader);
document.body.appendChild(divBienvenido);
divBienvenido.appendChild(h1Bienvenido);
document.body.appendChild(divSearch);
divSearch.appendChild(h3Search);
document.body.appendChild(divPokemons);

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=80")
    .then((poke) => poke.json())
    .then((poke) => {
        paint(poke);
    });

function paint(poke) {
    divPokemons.innerHTML = "";

    const input$$ = document.createElement("input");
    document.body.appendChild(input$$);
    divSearch.appendChild(input$$);

    const form$$ = document.createElement("form");
    const button$$ = document.createElement("button");
    const imgButton = document.createElement("img");

    input$$.id = "searchTerm";
    form$$.onsubmit = (event) => onSearch(event);

    imgButton.src =
        "https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png";
    imgButton.className = "button-icon";

    document.body.appendChild(form$$);
    document.body.appendChild(button$$);
    document.body.appendChild(imgButton);

    divSearch.appendChild(button$$);
    button$$.appendChild(imgButton);
    divSearch.appendChild(form$$);
    form$$.appendChild(input$$);
    form$$.appendChild(button$$);

    for (const pokemon of poke.results) {
        fetch(pokemon.url)
            .then((respons) => respons.json())
            .then((respons) => {
                pokemonInfo(respons);
            });
    }
}

const allPokemonsInfo = [];
console.log(allPokemonsInfo);

function pokemonInfo(infoPokemon) {
    allPokemonsInfo.push(infoPokemon);

    const divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = infoPokemon.id;
    divPokemons.appendChild(divCard);

    const divTitleId = document.createElement("div");
    divTitleId.className = "title-id";
    divCard.appendChild(divTitleId);

    const idNumber = document.createElement("id");
    idNumber.className = "id";
    idNumber.textContent = infoPokemon.id;
    divTitleId.appendChild(idNumber);

    const h1Poke = document.createElement("h1");
    h1Poke.className = "card-title";
    h1Poke.textContent = infoPokemon.name;
    divTitleId.appendChild(h1Poke);

    const divImageSpan = document.createElement("div");
    divImageSpan.className = "div-image-span";
    divCard.appendChild(divImageSpan);

    const imgPoke = document.createElement("img");
    imgPoke.className = "card-image";
    imgPoke.src = infoPokemon.sprites.front_shiny;
    divImageSpan.appendChild(imgPoke);

    const divSpans$$ = document.createElement("div");
    divSpans$$.className = "div-spans";
    divImageSpan.appendChild(divSpans$$);

    const spanAbilities = document.createElement("span");
    spanAbilities.textContent = "ABILITIES";
    spanAbilities.className = "span-abilities";
    divSpans$$.appendChild(spanAbilities);

    for (const ability of infoPokemon.abilities) {
        const span2$$ = document.createElement("span");
        span2$$.textContent += ability.ability.name;
        divSpans$$.appendChild(span2$$);
    }

    const spanTypes = document.createElement("span");
    spanTypes.textContent = "TYPES";
    spanTypes.className = "span-types";
    divSpans$$.appendChild(spanTypes);

    for (const type of infoPokemon.types) {
        const span$$ = document.createElement("span");
        span$$.textContent += type.type.name;
        span$$.style.color = typeColors[type.type.name];
        divSpans$$.appendChild(span$$);
    }
}

function onSearch(event) {
    event.preventDefault();
    const value = document.getElementById("searchTerm").value;

    for (const pokemon of allPokemonsInfo) {
        let showPokemon = false;
        if (pokemon.name.toLowerCase().includes(value.toLowerCase()))
            showPokemon = true;

        if (pokemon.id == value) showPokemon = true;
        console.log(pokemon);

        for (const type of pokemon.types) {
            if (type.type.name.toLowerCase().includes(value.toLowerCase()))
                showPokemon = true;
        }

        for (const ability of pokemon.abilities) {
            if (
                ability.ability.name.toLowerCase().includes(value.toLowerCase())
            )
                showPokemon = true;
        }

        if (showPokemon) {
            document.getElementById(pokemon.id).classList.remove("hidden");
            console.log(pokemon.name, pokemon.id);
        } else {
            document.getElementById(pokemon.id).classList.add("hidden");
        }
    }
}
