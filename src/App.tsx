import { RefObject, useEffect, useRef, useState } from "react";
// import { ReactComponent as Logo } from "./assets/logo/minecraft.svg";
import "./App.css";
import "./utils/misc";
import { classes, origens } from "./utils/misc";

interface DataProps {
  Adauto: {
    origem: string;
    classe: string;
  };
  Alves: {
    origem: string;
    classe: string;
  };
  Dot: {
    origem: string;
    classe: string;
  };
  Tobias: {
    origem: string;
    classe: string;
  };
}

function App() {
  const [spin, setSpin] = useState(false);
  const [data, setData] = useState<DataProps>();

  const sort = () => {
    setSpin(!spin);
    if (spin) {
      fetch("https://sorteio-minecraft-production.up.railway.app/sorteio")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    }
  };

  const [imageIndexLeft, setImageIndexLeft] = useState(0);
  const [imageIndexMiddle, setImageIndexMiddle] = useState(0);
  const [imageIndexRight, setImageIndexRight] = useState(0);

  const carouselLeft: RefObject<HTMLDivElement> = useRef(null);
  const carouselMiddle: RefObject<HTMLDivElement> = useRef(null);
  const carouselRight: RefObject<HTMLDivElement> = useRef(null);

  const handleCarouselNext = () => {
    let newCurrentImage = imageIndexMiddle + 1;
    if (newCurrentImage >= origens.length) {
      newCurrentImage = 0;
    }
    setImageIndexLeft(newCurrentImage);
    carouselLeft.current?.scrollBy({
      top: carouselLeft.current?.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
    setImageIndexMiddle(newCurrentImage);
    carouselMiddle.current?.scrollBy({
      top: carouselMiddle.current?.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
    setImageIndexRight(newCurrentImage);
    carouselRight.current?.scrollBy({
      top: carouselRight.current?.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  // const handleCarouselLast = () => {
  //   let newCurrentImage = imageIndexMiddle - 1;
  //   if (newCurrentImage < 0) {
  //     newCurrentImage = origins.length - 1;
  //   }
  //   setImageIndexMiddle(newCurrentImage);
  //   carouselMiddle.current?.scrollBy({
  //     top: -carouselMiddle.current?.offsetHeight,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCarouselNext();
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [imageIndexLeft, imageIndexMiddle, imageIndexRight]);

  useEffect(() => {
    carouselLeft.current?.scrollTo({
      top: imageIndexLeft * (carouselLeft.current?.offsetHeight || 0),
      behavior: "smooth",
    });
    carouselMiddle.current?.scrollTo({
      top: imageIndexMiddle * (carouselMiddle.current?.offsetHeight || 0),
      behavior: "smooth",
    });
    carouselRight.current?.scrollTo({
      top: imageIndexRight * (carouselRight.current?.offsetHeight || 0),
      behavior: "smooth",
    });
  }, [imageIndexLeft, imageIndexMiddle, imageIndexRight]);

  return (
    <div className="App">
      <div className="machine">
        <div className="logo">
          {/* <Logo style={{ width: "25%", height: "3rem", marginRight: "1rem" }} /> */}
        </div>
        {spin === true ? (
          <div className="jackpot">
            <div className="leftMachine carousel">
              {data &&
                Object.keys(data).map((key) => <div key={key}>{key}</div>)}
            </div>
            <div className="middleMachine carousel">
              <span>{data && data.Adauto.origem}</span>
              <span>{data && data.Alves.origem}</span>
              <span>{data && data.Dot.origem}</span>
              <span>{data && data.Tobias.origem}</span>
            </div>
            <div className="rightMachine carousel">
              <span>{data && data.Adauto.classe}</span>
              <span>{data && data.Alves.classe}</span>
              <span>{data && data.Dot.classe}</span>
              <span>{data && data.Tobias.classe}</span>
            </div>
          </div>
        ) : (
          <div className="jackpot">
            <div className="leftMachine carousel" ref={carouselLeft}>
              {data &&
                Object.keys(data).map((key) => <div key={key}>{key}</div>)}
            </div>
            <div className="middleMachine carousel" ref={carouselMiddle}>
              {origens.map((item, index) => (
                <span key={index}>
                  <img
                    key={index}
                    src={`./assets/origins/${item}.png`}
                    alt={item}
                  />
                </span>
              ))}
            </div>
            <div className="rightMachine carousel" ref={carouselRight}>
              {classes.map((item, index) => (
                <span key={index}>
                  <img
                    key={index}
                    src={`./assets/classes/${item}.png`}
                    alt={item}
                  />
                </span>
              ))}
            </div>
          </div>
        )}
        <button onClick={sort}>Sortear</button>
      </div>
    </div>
  );
}

export default App;
