import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import './App.css';
import { useGameStore } from './store';
import useTimer from './useTimer';

import CountdownTimer from './countdownTimer';
import StartPopup from './startPopup';
import GameOverPopup from './gameOverPopup'

const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;
const NewGameButton = styled.button`
  font-size: max(1vw, 12px);
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: darkturquoise;
  color: white;
  outline: none;
  cursor: pointer;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const Score = styled.div``;
// const CardsContainer = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   margin: 10px 0;
//   max-width: 2000px;
// `;
const CardsContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  gap: .5rem;
`;
// const Card = styled.div`
//   background-color: transparent;
//   width: 14.5vw;
//   height: 14.5vw;
//   max-width: 125px;
//   max-height: 125px;
//   perspective: 1000px;
//   list-style: none;
//   margin: 3px;
// `;
const Card = styled.div`
  background-color: transparent;
  width: 14.5vw;
  height: 14.5vw;
  max-width: 125px;
  max-height: 125px;
  perspective: 1000px;
  list-style: none;
`;
const App = () => {
  const { score, setScore, gameInitialized, cards, gameOver } = useGameStore();
  const [flipped, setFlipped] = useState([])

  const flip = card => {
    if(flipped.length === 2){
      return null
    }
    else{
      document.getElementById(card.id).classList.toggle('flip')
      setFlipped(oldState => [...oldState, card]);
    }
  }

  const checkCards = () => {
    if(flipped[0].card === flipped[1].card){
      setScore(score + 1);
      remove(flipped[0].id, flipped[1].id)
    }
    else{
      turnOver()
    }
  }

  const turnOver = () => {
    flipped.forEach(c => document.getElementById(c.id).classList.toggle('flip'))
    setFlipped([]);
  }

  const remove = () => {
    flipped.forEach(c =>   document.getElementById(c.id).classList.toggle('remove'))
    setFlipped([]);
  } 

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => {
        checkCards()
      }, 1000)
    }
  },[flipped])



  return (
    <div className="App">

        { 
          gameInitialized ?  (
              <GameWrapper>
                {
                  cards?.length > 0 ? 
                    <CardsContainer>
                      {
                        cards.map(c => 
                          <Card>
                            <div className='cardInner' id={c.id}>
                              <div className='front'>
                              <img src={c.card}/>
                              </div>
                              <div className='back' onClick={() => flip(c)}>
                              </div>
                            </div>
                          </Card>
                      )}
                    </CardsContainer> : null
                }

                <Controls>
                  <Score>Score: {score}</Score>
                  <CountdownTimer/>
                  <NewGameButton onClick={() => window.location.reload()}>New Game</NewGameButton>
                </Controls>
                {gameOver ? <GameOverPopup /> : null}
              </GameWrapper>
          ) : (
            <StartPopup />
          )
        }
    </div>
  )
}

export default App;
