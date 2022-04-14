import uuid from "react-uuid";
import shallow from "zustand/shallow";
import { db } from "services/firebase";
import { useState } from "react";
import { useMusicStore } from "../../store/musics";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const mValueProp = { title: "", link: "", tone: "" };

export const useUpsert = ({ initialId, initialMusicValue = mValueProp }) => {
  const [addMusic, updateMusic, removeMusic] = useMusicStore(
    (s) => [s.addMusic, s.updateMusic, s.removeMusic],
    shallow
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [musicFormValues, setMusicFormValues] = useState(initialMusicValue);

  const onChangeValue = ({ target }) =>
  setMusicFormValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const id = initialId || uuid();
      await setDoc(doc(db, "musics", id), musicFormValues);

      if (initialId) {
        updateMusic({ id, ...musicFormValues });
      } else {
        addMusic({ id, ...musicFormValues });
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    removeMusic(id)
    deleteDoc(doc(db, "musics", id));

  }

  return {
    open,
    loading,
    setOpen,
    onSubmit,
    onDelete,
    onChangeValue,
    musicFormValues,
  };
};
