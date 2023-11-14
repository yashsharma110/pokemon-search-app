import { useState } from "react";
import downArrow from "../../../assests/images/down_arrow.png";

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
    <div className="w-[20%] h-[2.2rem] ml-[0.5rem] cursor-pointer">
      <div
        className="h-full w-full py-0 px-[1rem] border-[2px] border-solid border-brownRed flex justify-between items-center"
        onClick={filterClicked}
      >
        <div>{curType}</div>
        <img src={downArrow} alt="drop down arrow" className="h-full" />
      </div>
      {showTypes && (
        <div className="h-[338px] w-full overflow-y-auto relative z-100 cursor-pointer flex flex-col bg-lightRed ">
          {types.map((type, index) => (
            <div
              key={index}
              onClick={(e) => {
                setCurType(type);
                loadPokemons(type);
              }}
              className="py-[2px] px-[1rem] border-[1px] border-solid border-brownRed border-t-0 hover:bg-lightRedHover"
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
