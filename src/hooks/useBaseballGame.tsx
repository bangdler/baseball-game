import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";

// export const useBaseballGame = () => {
//   const [baseballState, setBaseballState] = useRecoilState(BaseBallGameStore);
//   console.log(...baseballState.game.answer.numbers);

//   const checkAndAddHistory = (input: string) => {
//     setBaseballState({
//       game: baseballState.game.run(input),
//     });
//   };

//   const resetGame = () => {
//     setBaseballState({
//       game: baseballState.game.reset(),
//     });
//   };

//   return {
//     checkAndAddHistory,
//     resetGame,
//     history: baseballState.game.history,
//     isEnd: baseballState.game.isEnd(),
//   };
// };
