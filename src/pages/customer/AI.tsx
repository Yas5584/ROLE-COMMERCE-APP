import React from 'react'
import { useParams } from 'react-router-dom'
import App from "../Assistant/assistant"
const AI = () => {
    const {id}=useParams();
  return (
    <div>
        <h1>hello from Pages {id}</h1>

    <App />
      
    </div>
  )
}

export default AI
