import { db } from "../services/firebase";
import { debounce } from "lodash";
import { collection } from "firebase/firestore";
import { useMusicStore } from "store/useMusicStore";
import { getFilteredMusics } from "../utils/musics";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useCallback, useEffect } from "react";
import shallow from "zustand/shallow";

export const useMusicsState = () => {
  const [values, loading, error, snapshot] = useCollectionDataOnce(
    collection(db, "musics")
  );

  const {
    musics,
    filter,
    filteredMusics,
    setMusics,
    setFilter,
    setFilteredMusics,
  } = useMusicStore();

  const updateFilteredMusics = debounce((m, v) => {
    setFilteredMusics(getFilteredMusics(m, v));
  }, 1000);

  const deboucedUpdateFilteredMusics = useCallback(
    (m, v) => updateFilteredMusics(m, v),
    []
  );

  const onSetFilter = (value) => {
    setFilter(value);
    deboucedUpdateFilteredMusics(musics, value);
  };

  useEffect(() => {
    if (!musics.length && !loading && values) {
      const nValues = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMusics(nValues);
      setFilteredMusics(getFilteredMusics(nValues, ""));
    }
  }, [loading, values]);

  useEffect(() => {
    if (musics.length) {
      setFilteredMusics(getFilteredMusics(musics, filter));
    }
  }, [musics]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, error);

  return {
    filter,
    onSetFilter,
    filteredMusics,
  };
};
