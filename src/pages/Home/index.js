import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";

import { Link } from "react-router-dom";

import "./styles.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

import Masonry from "react-masonry-css";

function Home() {
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.nextPage);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return <Error message={error} />;
  }
  return (
    <div>
      <h1 className="text-center mt-3 mb-3 text-2xl bg-gray-200 rounded-full py-2 px-4 font-bold">
        Breaking Bad Character List
      </h1>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character, index) => (
          <div className="rounded" key={index}>
            <Link to={`char/${character.char_id}`}>
              <img
                alt={character.name}
                src={character.img}
                className="w-full rounded"
              />
              <div className="text-center mb-2 mt-2">
                <div>{character.name}</div>
                <div>{character.nickname}</div>
              </div>
            </Link>
          </div>
        ))}
      </Masonry>

      <div className=" text-center">
        {status === "loading" && <Loading />}
        {hasNextPage && status !== "loading" && (
          <button
            onClick={() => dispatch(fetchCharacters(nextPage))}
            className="bg-gray-200 hover:bg-white text-black font-bold py-2 px-4 rounded-full "
          >
            View More {nextPage}
          </button>
        )}
        {!hasNextPage && <div>There is nothing to be show.</div>}
      </div>
    </div>
  );
}

export default Home;
