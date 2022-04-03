import uuid from "react-uuid";
import { db } from "services/firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";

const mValueProp = { title: "", link: "", tone: "" };

export const useUpsert = ({ initialId, initialMusicValue = mValueProp }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState(initialMusicValue);

  const onChangeValue = ({ target }) =>
    setMusic((currentValues) => ({
      ...currentValues,
      [target.name]: target.value,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/revalidate`;

      await setDoc(doc(db, "musics", initialId || uuid()), music);
      await fetch(url);

      router.push("/");
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    music,
    loading,
    setOpen,
    onSubmit,
    onChangeValue,
  };
};
