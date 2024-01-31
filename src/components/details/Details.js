import classes from "./Details.module.css";
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
    <div className={classes.detailsPage}>
      {data && (
        <div>
          <div className={classes.profile}>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={`${data.name}`}
              />
            </div>

            <Info data={data} />
          </div>

          <div className={classes.barChart}>
            <BarChart data={data} />
          </div>
        </div>
      )}

      <Link to="/pokemon-search-app/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Details;
