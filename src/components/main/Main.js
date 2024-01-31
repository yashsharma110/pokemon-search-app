import { useState } from "react";
import classes from "./Main.module.css";
import Search from "./options/Search";
import Filter from "./options/Filter";
import List from "./list/List";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);

  const listChangeHandler = (list) => {
    setPokemonList(list);
  };

  return (
    <div className={classes.mainBody}>
      <div className={classes.options}>
        <Search setPokemons={listChangeHandler} />
        <Filter setPokemons={listChangeHandler} />
      </div>
      <div className={classes.list}>
        <List usePokemons={[pokemonList, listChangeHandler]} />
      </div>
    </div>
  );
}

export default Main;
