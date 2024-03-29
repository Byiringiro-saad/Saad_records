import { useState } from "react";
import { useQuery } from "react-query";
import { collection, getDocs, query } from "firebase/firestore";

// Components
import Audio from "../../components/audio";

// Icons
import { MdVerified } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";

// Firebase
import { db } from "../../firebase";

const Audios = () => {
  const [audios, setAudios] = useState([]);

  useQuery("audios-validator", () => {
    const q = query(collection(db, "Audios"));
    getDocs(q).then((querySnapshot) => {
      let audios = [];
      querySnapshot.forEach((doc) => {
        audios.push(doc.data());
      });
      setAudios(audios);
    });
  });

  return (
    <div className="w-full h-auto grid grid-cols-2 gap-6 items-cente pt-4">
      {audios.map((audio, index) => {
        return (
          <div className="flex h-14 w-auto items-center justify-between bg-gray rounded">
            <Audio key={index} audio={audio} />
            {audio?.validated === true && (
              <div className="flex w-[15%] h-[70%] items-center justify-center">
                <MdVerified className="text-pink text-xl cursor-pointer" />
              </div>
            )}
            {audio?.validated === false && (
              <div className="flex w-[15%] h-[70%] items-center justify-center border-l border-l-grayish">
                <AiOutlineStop className="text-black text-xl cursor-pointer" />
              </div>
            )}
            {audio?.validated === null && (
              <div className="flex w-[15%] h-[70%] items-center justify-center border-l border-l-grayish">
                <p>...</p>
              </div>
            )}
          </div>
        );
      })}
      {audios?.length === 0 && (
        <p className="text-base text-grayish col-span-2 text-center mt-10">
          No audios audios
        </p>
      )}
    </div>
  );
};

export default Audios;
