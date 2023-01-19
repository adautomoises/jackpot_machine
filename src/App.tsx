import { useState } from "react";
import "./App.css";
import { Carousel } from "./components/Carousel";

interface DataProps {
  Adauto: PlayerProps;
  Alves: PlayerProps;
  Dot: PlayerProps;
  Tobias: PlayerProps;
}
interface PlayerProps {
  origem: string;
  classe: string;
}

function App() {
  const api = "https://sorteio-minecraft-production.up.railway.app";
  const [spin, setSpin] = useState(false);
  const [data, setData] = useState<DataProps>();

  const sort = () => {
    setSpin(!spin);
    fetch(`${api}/sorteio`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="machine">
        <div className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo/minecraft.svg`}
            alt="Logo do Minecraft"
          />
        </div>
        {spin === true ? (
          <div className="jackpot">
            <div className="leftMachine">
              {data &&
                Object.keys(data).map((key) => (
                  <span key={key}>
                    {key}
                    <img src={`./assets/players/${key}.png`} alt={key} />
                  </span>
                ))}
            </div>
            <div className="middleMachine">
              <span>
                {data?.Adauto.origem}
                <img
                  src={`./assets/origens/${data?.Adauto.origem}.png`}
                  alt={data?.Adauto.origem}
                />
              </span>
              <span>
                {data?.Alves.origem}
                <img
                  src={`./assets/origens/${data?.Alves.origem}.png`}
                  alt={data?.Alves.origem}
                />
              </span>
              <span>
                {data?.Dot.origem}
                <img
                  src={`./assets/origens/${data?.Dot.origem}.png`}
                  alt={data?.Dot.origem}
                />
              </span>
              <span>
                {data?.Tobias.origem}
                <img
                  src={`./assets/origens/${data?.Tobias.origem}.png`}
                  alt={data?.Tobias.origem}
                />
              </span>
            </div>
            <div className="rightMachine">
              <span>
                {data?.Adauto.classe}
                <img
                  src={`./assets/classes/${data?.Adauto.classe}.png`}
                  alt={data?.Adauto.classe}
                />
              </span>
              <span>
                {data?.Alves.classe}
                <img
                  src={`./assets/classes/${data?.Alves.classe}.png`}
                  alt={data?.Alves.classe}
                />
              </span>
              <span>
                {data?.Dot.classe}
                <img
                  src={`./assets/classes/${data?.Dot.classe}.png`}
                  alt={data?.Dot.classe}
                />
              </span>
              <span>
                {data?.Tobias.classe}
                <img
                  src={`./assets/classes/${data?.Tobias.classe}.png`}
                  alt={data?.Tobias.classe}
                />
              </span>
            </div>
          </div>
        ) : (
          <div className="jackpot">
            <Carousel who="players" />
            <Carousel who="origens" />
            <Carousel who="classes" />
          </div>
        )}
        <button onClick={sort}>Sortear</button>
      </div>
    </div>
  );
}

export default App;
