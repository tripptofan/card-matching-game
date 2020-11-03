import React, { useState, useEffect } from 'react'
import './App.css';
import Fade from 'react-reveal/Fade';


/*Images*/
// import pic0 from './Images/0.jpg' 
// import pic1 from './Images/1.jpg' 
// import pic2 from './Images/2.jpg' 
// import pic3 from './Images/3.jpg' 
// import pic4 from './Images/4.jpg' 
// import pic5 from './Images/5.jpg' 
// import pic6 from './Images/6.jpg' 
// import pic7 from './Images/7.jpg' 
// import pic8 from './Images/8.jpg' 
// import pic9 from './Images/9.jpg' 
// import pic10 from './Images/10.jpg' 
// import pic11 from './Images/11.jpg' 
// import pic12 from './Images/12.jpg' 
// import pic13 from './Images/13.jpg' 
// import pic14 from './Images/14.jpg' 
// import pic15 from './Images/15.jpg' 
// import pic16 from './Images/16.jpg' 
// import pic17 from './Images/17.jpg' 



function App() {

const [timer, setTimer] = useState();
const [score, setScore] = useState(0);
const [cards, setCards] = useState();
const [flipped, setFlipped] = useState([])

// const images = [pic0,pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14,pic15,pic16,pic17,pic0,pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14,pic15,pic16,pic17];

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
