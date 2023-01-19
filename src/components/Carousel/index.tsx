import { RefObject, useEffect, useRef, useState } from "react";

import { Container } from "./styles";

interface ApiProps {
  Players: string[];
  Origens: string[];
  Classes: string[];
}

interface Data {
  who?: string;
}

export function Carousel({ who }: Data) {
  const api = "https://sorteio-minecraft-production.up.railway.app";
  const [data, setData] = useState<ApiProps>();
  const [imageIndex, setImageIndex] = useState(0);
  const carousel: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${api}/${who}`);
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);

  const handleCarouselNext = () => {
    let newCurrentImage = imageIndex + 1;
    if (data?.Players && newCurrentImage >= data.Players.length) {
      newCurrentImage = 0;
    }
    if (data?.Origens && newCurrentImage >= data.Origens.length) {
      newCurrentImage = 0;
    }
    if (data?.Classes && newCurrentImage >= data.Classes.length) {
      newCurrentImage = 0;
    }
    setImageIndex(newCurrentImage);
    carousel.current?.scrollBy({
      top: carousel.current?.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleCarouselNext();
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);

  useEffect(() => {
    carousel.current?.scrollTo({
      top: imageIndex * (carousel.current?.offsetHeight || 0),
      behavior: "smooth",
    });
  }, [imageIndex]);

  return (
    <Container ref={carousel}>
      <div>
        {data &&
          data?.Players?.map((item, index) => (
            <div key={index}>
              {item}
              <span key={index}>
                <img
                  key={index}
                  src={`./assets/${who}/${item}.png`}
                  alt={item}
                />
              </span>
            </div>
          ))}
        {data &&
          data?.Origens?.map((item, index) => (
            <div key={index}>
              {item}
              <span key={index}>
                <img
                  key={index}
                  src={`./assets/${who}/${item}.png`}
                  alt={item}
                />
              </span>
            </div>
          ))}
        {data &&
          data?.Classes?.map((item, index) => (
            <div key={index}>
              {item}
              <span key={index}>
                <img
                  key={index}
                  src={`./assets/${who}/${item}.png`}
                  alt={item}
                />
              </span>
            </div>
          ))}
      </div>
    </Container>
  );
}
