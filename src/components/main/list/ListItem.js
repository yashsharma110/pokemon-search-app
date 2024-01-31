import classes from "./ListItem.module.css";
import { Link } from "react-router-dom";

function ListItem({ pokemon }) {
  return (
    <Link
      to={`/pokemon-search-app/details/${pokemon.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className={classes.listItem}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={`${pokemon.name}`}
        />
        <div>{pokemon.name}</div>
      </div>
    </Link>
  );
}

export default ListItem;
