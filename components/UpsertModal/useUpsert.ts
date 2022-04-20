import React, { useState } from "react";
import uuid from "react-uuid";
import { db } from "services/firebase";
import { musicType } from "typings/music";
import { useMusicStore } from "store/useMusicStore";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const mValueProp = { title: "", link: "", tone: "" };

type useUpsertProps = {
  initialId?: string;
  initialMusicValue?: musicType;
};

export const useUpsert = ({
  initialId,
  initialMusicValue = mValueProp,
}: useUpsertProps = {}) => {
  const { addMusic, updateMusic, removeMusic } = useMusicStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [musicFormValues, setMusicFormValues] =
    useState<musicType>(initialMusicValue);

  const onChangeValue = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setMusicFormValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value,
    }));

  const onSubmit = async (e: React.SyntheticEvent) => {
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

  const onDelete = async (id: string) => {
    removeMusic(id);
    deleteDoc(doc(db, "musics", id));
  };

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
