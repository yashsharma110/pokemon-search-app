import { useState } from "react";
import Search from "./options/Search";
import Filter from "./options/Filter";
import List from "./list/List";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);

  const listChangeHandler = (list) => {
    setPokemonList(list);
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="h-[10%] w-full bg-lightRed flex justify-center items-center sm:h-[15%] sm:flex-col sm:gap-[5px]">
        <Search setPokemons={listChangeHandler} />
        <Filter setPokemons={listChangeHandler} />
      </div>
      <div className="h-[90%] w-full bg-lightRed flex justify-center">
        <List usePokemons={[pokemonList, listChangeHandler]} />
      </div>
    </div>
  );
}

export default Main;
