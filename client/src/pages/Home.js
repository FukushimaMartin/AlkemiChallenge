import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Home() {
  const [listOfOperations, setListOfOperations] = useState([])
  const [total, setTotal] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/operations").then((response) => {
      setListOfOperations(response.data)
    })
  }, [])

  

  return (
    <div className="App">
      <div className='total'> Balance Total: {} </div>
      {/*                     index = key    */}
      {listOfOperations.map((value, index) => {
        return (
          <div 
            key={index} 
            className="operation" 
            onClick={ () => {navigate(`/operation/${value.id}`)}}
          >
            <div className="typeOperation"> {value.typeOperation} </div>
            <div className="amount"> {value.amount} </div>
            <div className="concept"> {value.concept} </div>
            <div className="dateOperation"> {value.dateOperation} </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home