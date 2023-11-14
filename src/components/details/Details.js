import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BarChart from "./BarChart";
import Info from "./Info";

function Details() {
  const { id } = useParams(); //  pokemon id from url
  const [data, setData] = useState(null); // data of selected pokemon

  useEffect(() => {
    let cache = JSON.parse(sessionStorage.getItem("cache"));
    if (cache) {
      let found = false;
      cache.map((pokemon, index) => {
        if (pokemon.id == Number(id)) {
          found = true;
          cache.unshift(cache.splice(index, 1)[0]);
          sessionStorage.setItem("cache", JSON.stringify(cache));
          setData(pokemon);
        }
      });
      if (found) return;
    }

    const loadPokemonData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const result = await response.json();

      if (cache) {
        cache.unshift(result);
        if (cache.length > 5) cache.pop();
      } else {
        cache = [result];
      }
      sessionStorage.setItem("cache", JSON.stringify(cache));
      setData(result);
    };

    loadPokemonData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {data && (
        <div className="w-[90%] h-[85%] p-[1rem] m-[1rem] bg-lightRed rounded-[15px] flex flex-col justify-between items-center">
          <div className="w-full h-[60%] flex justify-around items-center">
            <div className="w-[30%] h-full text-center bg-lightRedHover rounded-[50%]">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={`${data.name}`}
                className="w-full h-full "
              />
            </div>

            <Info data={data} />
          </div>

          <div className="w-[90%]">
            <BarChart data={data} />
          </div>
        </div>
      )}

      <Link to="/pokemon-search-app/">
        <button className="py-[0.2rem] px-[0.5rem] text-[1.2rem] bg-lightRed border-[2px] border-solid border-brownRed transition-all ease-in-out duration-[0.2s] hover:bg-lightRedHover hover:tracking-[1px]">
          Back
        </button>
      </Link>
    </div>
  );
}

export default Details;
