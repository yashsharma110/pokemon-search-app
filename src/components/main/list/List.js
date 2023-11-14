import { useState, useEffect } from "react";
import ListItem from "./ListItem";

function List({ usePokemons }) {
  const [pokemonList, setPokemonList] = usePokemons;
  const [curURL, setCurURL] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25"
  );
  const [nextURL, setNextURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await fetch(curURL);
      const { results, next } = await response.json();
      results.map((data) => {
        const res = data.url.split("/");
        return (data.id = res[res.length - 2]);
      });

      setNextURL(next);
      setPokemonList((prevState) => {
        return [...prevState, ...results];
      });
      setLoading(false);
    };

    loadPokemons();
  }, [curURL]);

  const scrollEndHandler = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setLoading(true);
      setCurURL(nextURL);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center overflow-x-hidden">
      <div
        className="w-[80%] mt-[1rem] overfloy-y-auto grid grid-cols-4 auto-rows-[250px] gap-[0.8rem] overflow-scroll xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        onScroll={scrollEndHandler}
      >
        {pokemonList.map((pokemon) => (
          <ListItem pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default List;
