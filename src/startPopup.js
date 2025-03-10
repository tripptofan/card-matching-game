import { useState } from 'react';
import { useGameStore } from './store';
import styled from 'styled-components';
import './startPopup.css';

const PopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartPopup = styled.div`
  background: pink;
  height: max-content;
  width: 100%;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  position: absolute;

  h1 {
    color: white;
  }
`;
const GameSettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
`;
const FormLabel = styled.label``;
const FormInput = styled.input`
  width: 100%;
`;
const StartPopupComponent = () => {
    const { setGameInitialized, timer, setTimer, setScore, cards, setCards, cardImages } = useGameStore();

    
    const shuffle = (array) => {
      var currentIndex = array.length, temporaryValue, randomIndex;
  
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    const initialize = (e) => {

        e.preventDefault();
        console.log('images', cardImages)
        let arr = shuffle(cardImages);
        let newCards = arr.map((i,index) => ({card: i, id: index}));
        console.log('newCards', newCards);

        setCards(newCards);
        setScore(0);
        setGameInitialized(true);
    }

    return (
      <PopupWrapper>
        <StartPopup>
          <h1>Game Settings</h1>
          <GameSettingsForm onSubmit={(e) => initialize(e)}>

            <FormLabel>
              <span>Time</span>
              <FormInput type='number' value={timer} onChange={(e) => setTimer(e.target.value)}/>
            </FormLabel>
            {/* <FormLabel>
              <span>Cards</span>
              <FormInput type='number' value={timer} onChange={(e) => setTimer(e.target.value)}/>
            </FormLabel> */}
            <button>Start</button>
          </GameSettingsForm>
        </StartPopup>
      </PopupWrapper>
    )
}
export default StartPopupComponent;