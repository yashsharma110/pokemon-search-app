import classes from "./Info.module.css";

function Info({ data }) {
  return (
    <div className={classes.info}>
      <h1 className={classes.name}>{data.name}</h1>
      <div className={classes.properties}>
        <div>
          <span>Height: </span>
          <span>{data.height * 10} cm</span>
        </div>

        <div>
          <span>Weight: </span>
          <span>{data.weight / 10} kg</span>
        </div>

        <div>
          <span>Abilities: </span>
          <span className={classes.list}>
            {data.abilities.map(({ ability }) => (
              <span key={ability.name}>{ability.name} </span>
            ))}
          </span>
        </div>

        <div>
          <span>Type: </span>
          <span className={classes.list}>
            {data.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info;
