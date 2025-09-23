import React from 'react'
import { useParams } from 'react-router-dom'
import App from "../Assistant/assistant"


const AI:React.FC = () => {
    const {id}=useParams<{ id: string }>();
  return (
    <div>
       

    <App style={{color:'white'}} readid={id} />
      
    </div>
  )
}

export default AI
