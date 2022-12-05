import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function CharacterDetails() {
  const { char_id } = useParams();
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/characters/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data[0]))
      .finally(() => setLoading(false));
  }, [char_id]);

  return (
    <div>
      {loading && <Loading />}
      {char && (
        <div className="flex flex-col items-center  ">
          <img className="mt-4" src={char.img} width={400} />
          <div className=" text-3xl font-bold mb-4 mt-4  ">{char.name} </div>
          <div>Nickname: {char.nickname}</div>
          <div>Birthday: {char.birthday}</div>
          <div>Occupation: {char.occupation[0]}</div>
          <div>Status: {char.status}</div>
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
