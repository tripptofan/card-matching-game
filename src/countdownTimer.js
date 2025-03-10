import { useEffect } from 'react';
import useTimer from './useTimer';
import { useGameStore } from './store';
import styled from 'styled-components';

const CountdownTimerWrapper = styled.div`

`;

const CountdownTimer = () => {
  const { timer, setGameOver } = useGameStore();
  const { time } = useTimer({ initialSeconds: timer });

  useEffect(() => {
    if (!time) {
      setGameOver(true);
    }
  }, [time])

    return (
        <CountdownTimerWrapper>
            <p>Time: {time}</p>
        </CountdownTimerWrapper>
    )
}
export default CountdownTimer;