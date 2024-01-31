import { useState, useEffect } from "react";
import classes from "./Search.module.css";
import searchIcon from "../../../public/images/search_icon.svg";

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
      if (allPokemons[i].name == name) {
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
    <div className={classes.searchBox}>
      <input
        type="text"
        placeholder="Search Pokemons"
        onChange={searchChangeHandler}
        onBlur={inputBlurHandler}
        value={searchText}
        className={classes.searchInput}
      />

      <button
        className={classes.searchButton}
        onClick={() => {
          searchHandler(null);
        }}
      >
        <img src={searchIcon} alt="search icon" />
      </button>

      {suggestions && (
        <div className={classes.suggestionBox}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={classes.suggestion}
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
