
import create from 'zustand';

type MyState = {
  idProfil: string;
  setIdProfil: (value: string) => void;
};

export const LocalStore = create<MyState>((set) => ({
  idProfil: '',
  setIdProfil: (value) => set(() => ({ idProfil: value })),
}));
