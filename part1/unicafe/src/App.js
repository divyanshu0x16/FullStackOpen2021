import React, { useState } from 'react'

const Title = ({title}) => (
  <h1>{title}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick} > {text} </button>
)

const Statistic = ( {text, value}) => {
  return(
    <div>{text} {value}</div>
  )
}

const Statistics = ({all, average, positive}) => {
  if( all === 0 ){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positive}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = ()=> {
    setGood(good+1)
    setAll(all+1)

    const newAverage = ((good+1) - bad )/(all+1)
    setAverage(newAverage)

    const newPositive = ((good+1)/(all+1))*100 + " %"
    setPositive(newPositive)
  }

  const increaseNeutral = () => {
    setNeutral( neutral+1)
    setAll(all+1)

    const newAverage = (good - bad )/(all+1)
    setAverage(newAverage)

    const newPositive = ((good)/(all+1))*100 + " %"
    setPositive(newPositive)
  }

  const increaseBad = ()=> {
    setBad( bad+1)
    setAll(all+1)

    const newAverage = (good - (bad+1) )/(all+1)
    setAverage(newAverage)

    const newPositive = ((good)/(all+1))*100 + " %"
    setPositive(newPositive)
  }

  return (
    <div>
      <Title title = "give feeback"/>
      <Button handleClick = { increaseGood } text="good"/>
      <Button handleClick = { increaseNeutral } text="neutral"/>
      <Button handleClick = { increaseBad } text="bad"/>

      <Title title = "statistics"/>

      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>

      <Statistics all={all} average={average} positive={positive} />
    </div>
  )
}

export default App