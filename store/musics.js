import create from "zustand";

export const useMusicStore = create((set) => ({
  musics: [],
  filter: "",
  setFilter: (filter) => set({ filter }),
  filteredMusics: [],
  setFilteredMusics: (filteredMusics) => set({ filteredMusics }),
  setMusics: (musics) => {
    console.log("musics asdasdsa: ", musics);
    return set({ musics });
  },
  addMusic: (newMusic) =>
    set(({ musics }) => ({ musics: [...musics, newMusic] })),
  removeMusic: (id) =>
    set(({ musics }) => ({ musics: musics.filter((i) => i.id !== id) })),
  updateMusic: (newMusic) =>
    set(({ musics }) => ({
      musics: musics.map((i) => {
        if (newMusic.id === i.id) return newMusic;
        return i;
      }),
    })),
}));
