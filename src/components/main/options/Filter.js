import { useState } from "react";
import classes from "./Filter.module.css";
import downArrow from "../../../public/images/down_arrow.png";

function Filter({ setPokemons }) {
  const [showTypes, setShowTypes] = useState(false);
  const [curType, setCurType] = useState("Filter");
  const types = [
    "No filter",
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Flying",
    "Fighting",
    "Poison",
    "Electric",
    "Ground",
    "Rock",
    "Psychic",
    "Ice",
    "Bug",
    "Ghost",
    "Steel",
    "Dragon",
    "Dark",
    "Fairy",
  ];

  const loadPokemons = async (type) => {
    filterClicked();
    const typeName = type.toLowerCase();
    let url = `https://pokeapi.co/api/v2/type/${typeName}/`;
    let list;
    if (type === "No filter") {
      url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25";
      const response = await fetch(url);
      const { results } = await response.json();
      list = results.map((data) => {
        const res = data.url.split("/");
        data.id = res[res.length - 2];
        return data;
      });
      setCurType("Filter");
    } else {
      const response = await fetch(url);
      const { pokemon } = await response.json();
      list = pokemon.map((data) => {
        const res = data.pokemon.url.split("/");
        data.pokemon.id = res[res.length - 2];
        return data.pokemon;
      });
    }
    setPokemons(list);
  };

  const filterClicked = () => {
    setShowTypes((prevState) => !prevState);
  };

  return (
    <div className={classes.filterBox}>
      <div className={classes.filter} onClick={filterClicked}>
        <div>{curType}</div>
        <img src={downArrow} alt="drop down arrow" />
      </div>
      {showTypes && (
        <div className={classes.filterTypes}>
          {types.map((type, index) => (
            <div
              key={index}
              onClick={(e) => {
                setCurType(type);
                loadPokemons(type);
              }}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
