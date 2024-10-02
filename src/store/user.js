import { create } from 'zustand';

// Define the store
const userData = create((set) => ({
  // Define your state
  data: {},
  setUserData: (data) => set((state) => ({ data: data })),
}));

export default userData;
