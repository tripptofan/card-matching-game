import React, { useState, useEffect } from 'react'
import './App.css';
import Fade from 'react-reveal/Fade';


function App() {


const [score, setScore] = useState(0);
const [cards, setCards] = useState();
const [flipped, setFlipped] = useState([])


const context = require.context("./Images", true, /\.(jpg)$/);
const images = context.keys().map(img => context(img)).reduce((res, current) => {
  return res.concat([current, current]);
}, []);


function shuffle(array) {
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

const initialize = () => {
  if(!cards){
    document.getElementById('score').classList.toggle('active');
  }
  let arr = shuffle(images);
  setCards(arr.map((i,index) => ({card: i, id: index})));
  setScore(0);
}

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
  if(!cards){
    initialize();
  }
  if(flipped.length === 2){
    setTimeout(() => {
      checkCards()
    }, 1500)
  }
  
},[flipped])

  return (

    <div className="App">
 {console.log(images)}

{cards ? <ul className='cards'>

{cards.map(c => 
  <Fade bottom >
<li className='cardContainer' >
  <div className='cardInner' id={c.id}>
    <div className='front'>
    <img src={c.card.default}/>
    </div>
    <div className='back' onClick={() => flip(c)}>
    </div>
  </div>
</li>
</Fade>

  
  )}




</ul> : null}




<div id='score'>{score}</div>
<button className='startBtn' onClick={() => window.location.reload()}>New Game</button>
  </div>
  )
}

export default App;
