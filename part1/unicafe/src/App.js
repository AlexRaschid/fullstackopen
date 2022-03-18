import { useState } from 'react'
import Button from './Button'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
    console.log(props.good)
    
    const sum = () => {
        return (props.good+props.neutral+props.bad)
    }

    const average = () => {
        return (props.good-props.bad)/(props.good+props.neutral+props.bad)
    }

    const positive = () => {
        return props.good/(props.good+props.neutral+props.bad)
    }

    return (
        <table>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>

            <StatisticLine text="all" value={sum()}/>
            <StatisticLine text="average" value={average()}/>
            <StatisticLine text="positive" value={positive()}/>

        </table>
      )
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const showStats = () => {
        if(good == 0 && neutral == 0 && bad == 0){
            return (<p>no feed back given</p>)
        } else {
            return (
                <Statistics good={good}
                    neutral={neutral}
                    bad={bad}/>
            )
        }
    }


  console.log(good)

  return (
    <div>
      <h3>Give Feedback</h3>
      <Button text="Good" onClick={() => {setGood(good + 1)}} />
      <Button text="Neutral" onClick={() => {setNeutral(neutral + 1)}} />
      <Button text="Bad" onClick={() => {setBad(bad + 1)}} />
      

      <h3>Statistics</h3>
        {showStats()}
      
    
    </div>
  )
}

export default App