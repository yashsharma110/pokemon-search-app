import { useState, useEffect } from "react";
import searchIcon from "../../../assests/images/search_icon.svg";

function Search({ setPokemons }) {
  const [searchText, setSearctText] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadAllPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1200"
      );
      const { results } = await response.json();
      results.map((data) => {
        const res = data.url.split("/");
        data.id = res[res.length - 2];
      });
      setAllPokemons(results);
    };

    loadAllPokemons();
  }, []);

  const searchChangeHandler = (e) => {
    const text = e.target.value.toLowerCase();
    let matches = [];

    if (text.length > 0) {
      allPokemons.map(({ name }) => {
        const regex = new RegExp(`${text}`, "i");
        const idx = name.search(regex);
        if (idx === 0) {
          const suggestion = {
            start: name.substring(0, idx),
            mid: name.substring(idx, idx + text.length),
            end: name.substring(idx + text.length, name.length),
            name: name,
          };
          matches.push(suggestion);
        }
      });
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
    setSearctText(text);
  };

  const initializePokemons = () => {
    let pokemon = [];
    for (let i = 0; i < 25; i++) {
      pokemon.push(allPokemons[i]);
    }
    setPokemons(pokemon);
  };

  const inputBlurHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
    if (!searchText) initializePokemons();
  };

  const searchHandler = (text) => {
    let pokemon, name;
    name = text ? text : searchText;

    if (!name) {
      initializePokemons();
      return;
    }

    for (let i = 0; i < allPokemons.length; i++) {
      if (allPokemons[i].name === name) {
        pokemon = allPokemons[i];
        break;
      }
    }
    if (!pokemon) {
      alert("invalid pokemon name");
      return;
    }
    setSearctText(name);
    setPokemons([pokemon]);
  };

  return (
    <div className="w-[40%] h-[2.2rem] flex flex-wrap items-center">
      <input
        type="text"
        placeholder="Search Pokemons"
        onChange={searchChangeHandler}
        onBlur={inputBlurHandler}
        value={searchText}
        className="w-[90%] h-full py-[0.3rem] px-[1rem] bg-none border-[2px] border-solid border-brownRed outline-none text-inherit bg-lightRed placeholder:text-slate-500 capitalize"
      />

      <button
        className="h-full w-[10%] border-[2px] border-solid border-brownRed border-l-0 cursor-pointer bg-none hover:bg-lightRedHover"
        onClick={() => {
          searchHandler(null);
        }}
      >
        <img
          src={searchIcon}
          alt="search icon"
          className="min-h-[15px] min-w-[15px] w-full h-full"
        />
      </button>

      {suggestions && (
        <div className="max-h-[338px] w-full overflow-y-auto relative z-100 cursor-pointer flex flex-col bg-lightRed">
          {suggestions.map((suggestion, index) => (
            <div
              className="py-[2px] px-[1rem] border-[1px] border-solid border-brownRed border-t-0 hover:bg-lightRedHover capitalize"
              key={index}
              onClick={() => {
                searchHandler(suggestion.name);
              }}
            >
              {suggestion.start}
              <strong>{suggestion.mid}</strong>
              {suggestion.end}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
