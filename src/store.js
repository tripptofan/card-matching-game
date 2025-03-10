import { create } from 'zustand';

const context = require.context("./Images", true, /\.(jpg)$/);
const images = context.keys().map(img => context(img)).reduce((res, current) => {
return res.concat([current, current]);
}, []);

export const useGameStore = create((set) => ({
    gameInitialized: false,
    // setGameInitialized: (change) => set({ gameInitialized: change }),
    setGameInitialized: (change) => set({ gameInitialized: change }),
    timer: 120,
    setTimer: (time) => set({ timer: time }),
    score: 0,
    setScore: (score) => set({ score }),
    cards: false,
    setCards: (cards) => set({ cards}),
    cardImages: images,
    gameOver: false,
    setGameOver: (gameOver) => set({ gameOver }),
}));