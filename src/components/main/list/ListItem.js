import { Link } from "react-router-dom";

function ListItem({ pokemon }) {
  return (
    <Link
      to={`/pokemon-search-app/details/${pokemon.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="h-full w-full p-[0.5rem] bg-brownRed text-center transition-all ease-in-out hover:bg-brownRedHover hover:p-0">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={`${pokemon.name}`}
          className="h-[80%] w-[95%]"
        />
        <div className="mt-[0.5rem] text-white text-[1.2rem] capitalize">
          {pokemon.name}
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
