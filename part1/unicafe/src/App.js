import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticRow = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral

  if (all == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }

  const [ goodScore, neutralScore, badScore ] = [1, 0, -1]

  const calculateAverage = () => ((goodScore*good + neutralScore*neutral + badScore*bad)/all).toFixed(1)

  const calculatePositive = () => ((good * 100)/all).toFixed(1)

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticRow text="good" value={good}/>
          <StatisticRow text="neutral" value={neutral}/>
          <StatisticRow text="bad" value={bad}/>
          <StatisticRow text="all" value={all}/>
          <StatisticRow text="average" value={calculateAverage()}/>
          <StatisticRow text="positive" value={calculatePositive().toString().concat(" %")}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </div>
  )
}

export default App