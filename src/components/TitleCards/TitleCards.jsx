import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const Titlecards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmNiNDE3NTI1MTVhYjMxY2ZkZjM2NjM2MmY3OTg4YiIsIm5iZiI6MTczMDM5MzQ5OS42MjM3NTE0LCJzdWIiOiI2NzIzYWI2NjgyNjU4YWVlYWM5MjZiYmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VRRC602nxbbnCj9jWbbV1iZtxN8CiROB2ZrrtLlCk_w",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          console.log(card.id,"cardid" )
          return (
            <Link to={`/player/${card?.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Titlecards;
