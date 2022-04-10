import { useMemo, useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const getFilteredMusics = (arrayValues, filter) =>
  arrayValues
    .filter((i) => i.title.toLowerCase().includes(filter.toLowerCase()))
    .map((i) => {
      return { ...i, title: capitalizeFirstLetter(i.title) };
    });

export const useMusicsState = (serverMusics = []) => {
  const [musics, setMusics] = useState(serverMusics);
  const [filter, setFilter] = useState("");
  const [filteredMusics, setFilteredMusics] = useState(
    getFilteredMusics(musics, "")
  );

  const updateFilteredMusics = debounce((v) => {
    setFilteredMusics(getFilteredMusics(musics, v));
  }, 1000);

  const deboucedUpdateFilteredMusics = useCallback(
    (v) => updateFilteredMusics(v),
    []
  );

  const onSetFilter = (value) => {
    setFilter(value);
    deboucedUpdateFilteredMusics(value);
  };

  const addMusic = (newMusic) => {
    setMusics((currentMusics) => [...currentMusics, newMusic]);
  };

  const updateMusic = (newMusic) => {
    const newMusicState = musics.map((i) => {
      if (newMusic.id === i.id) return newMusic;
      return i;
    });
    setMusics(newMusicState);
  };

  const removeMusic = (id) => {
    const newMusicState = musics.filter((i) => i.id !== id);
    setMusics(newMusicState);
  };

  return {
    op: {
      addMusic,
      removeMusic,
      updateMusic,
    },
    filter,
    onSetFilter,
    filteredMusics,
  };
};
