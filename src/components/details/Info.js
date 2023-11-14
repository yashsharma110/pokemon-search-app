function Info({ data }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h1 className="w-full text-[1.5rem] font-medium py-[0.5rem] px-0 mb-[1rem] text-center border-b-[2px] border-solid border-brownRed capitalize">
        {data.name}
      </h1>
      <div className="text-[1.2rem]">
        <div className="mb-[0.29rem]">
          <span>Height: </span>
          <span>{data.height * 10} cm</span>
        </div>

        <div className="mb-[0.29rem]">
          <span>Weight: </span>
          <span>{data.weight / 10} kg</span>
        </div>

        <div className="mb-[0.29rem]">
          <span>Abilities: </span>
          <span className="flex flex-wrap justify-center">
            {data.abilities.map(({ ability }) => (
              <span
                key={ability.name}
                className="my-[0.2rem] mx-[0.4rem] py-[0.05rem] px-[0.38rem] border-[1px] border-solid border-brownRed rounded-[10px] capitalize cursor-default hover:bg-lightRedHover"
              >
                {ability.name}{" "}
              </span>
            ))}
          </span>
        </div>

        <div className="mb-[0.7rem]">
          <span>Type: </span>
          <span className="flex flex-wrap justify-center">
            {data.types.map(({ type }) => (
              <span
                key={type.name}
                className="my-[0.2rem] mx-[0.4rem] py-[0.05rem] px-[0.38rem] border-[1px] border-solid border-brownRed rounded-[10px] capitalize cursor-default hover:bg-lightRedHover"
              >
                {type.name}{" "}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info;
