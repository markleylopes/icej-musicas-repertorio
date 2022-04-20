import { useMusicStore as useZustandMusicStore } from "store/musics";
import shallow from "zustand/shallow";

export const useMusicStore = () => {
  const store = useZustandMusicStore((s) => s, shallow);

  return { ...store };
};
