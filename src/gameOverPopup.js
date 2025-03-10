import styled from 'styled-components';
import { useGameStore } from './store';

const GameOverPopupWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const GameOverPopup = styled.div`
  margin-top: 5rem;
`;
const GameOverMessage = styled.h1``;
const Frog = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      bottom: -1000px;
    }
    to {
      bottom: 0;
    }
  }
`;
const NewGameButton = styled.button`
  position: absolute;
  scale: 1.5;
  bottom: 5rem;
  font-size: max(1vw, 12px);
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: darkturquoise;
  color: white;
  outline: none;
  cursor: pointer;
  opacity: 0;
  animation: fadeInButton 1s ease-in-out 1s forwards;

  @keyframes fadeInButton {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const GameOverPopupComponent = () => {
  const { score } = useGameStore();

  return (
    <GameOverPopupWrapper>
      <GameOverPopup>
        <GameOverMessage>GAME OVER</GameOverMessage>
        <p>Your score: {score}</p>
      </GameOverPopup>
      <Frog src={'/frog.png'} alt="frog" />
      <NewGameButton onClick={() => window.location.reload()}>New Game</NewGameButton>
    </GameOverPopupWrapper>
  )
}
export default GameOverPopupComponent;