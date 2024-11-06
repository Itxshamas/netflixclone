import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

const {id}= useParams();
const navigate= useNavigate();
const [apiData, setApiData]= useState({
  name: "",
  key: "",
  published_at: "",
  typeof: ""
})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmNiNDE3NTI1MTVhYjMxY2ZkZjM2NjM2MmY3OTg4YiIsIm5iZiI6MTczMDM5MzQ5OS42MjM3NTE0LCJzdWIiOiI2NzIzYWI2NjgyNjU4YWVlYWM5MjZiYmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VRRC602nxbbnCj9jWbbV1iZtxN8CiROB2ZrrtLlCk_w'
    }
  };
  
  useEffect(()=>{

    
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));


  }, [])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info"></div>
      <p>{apiData.published_at.slice(0, 10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type }</p>
    </div>
  )
}

export default Player
