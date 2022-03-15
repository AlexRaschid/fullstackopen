import { useState } from 'react'

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
        <div>
            
            <p>good {props.good}</p>
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {sum()}</p>
            <p>average {average()}</p>
            <p>positive {positive()}</p>
        </div>
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
      <button onClick={() => {setGood(good + 1)}}>Good</button>
      <button onClick={() => {setNeutral(neutral + 1)}}>Neutral</button>
      <button onClick={() => {setBad(bad + 1)}}>Bad</button>

      <h3>Statistics</h3>
        {showStats()}
      
    
    </div>
  )
}

export default App