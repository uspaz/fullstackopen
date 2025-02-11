import { Buttons } from "./Buttons"
import { StadisticLine } from "./StadisticLine"


// eslint-disable-next-line react/prop-types
export const Feedback = ({props}) => {

    
 // eslint-disable-next-line react/prop-types
 const {good, SetGood, bad, SetBad, neutral, SetNeutral} = props

  return (
    <>
        <h3>Give me feedback</h3>

        <Buttons type={good} func={SetGood} name={"good"}/>
        <Buttons type={neutral} func={SetNeutral} name={"neutral"}/>
        <Buttons type={bad} func={SetBad} name={"bad"}/>
        
        {good > 0 || bad > 0 || neutral > 0 ? 
        <table style={{width: "25%"}}>
            <tr>
                <th >
                    <StadisticLine text={"Good"} value={good} />
                </th> 
                <th>
                    <StadisticLine text={"Neutral"} value={neutral} />
                </th>
                
                <th >
                    <StadisticLine text={"Bad"} value={bad} />
                </th>
            </tr>
            <tr>
                <td>
                    <StadisticLine text={"Total comments"} value={good + neutral + bad} />
                </td>
            </tr>
            <tr>
                <td>
                    <StadisticLine text={"Average"} value={ (good - bad) / (good + neutral + bad)} />
                </td>
            </tr>
            <tr>
                <td>
                    <StadisticLine text={"Posive"} value={good / (good + neutral + bad) * 100 + "%"} />
                </td>
            </tr>    
        </table>
        : <p>No feedback given</p>
        }
    </>
  )
}
