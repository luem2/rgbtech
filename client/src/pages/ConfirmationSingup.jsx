import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ConfirmationSingup () {
  let {token} = useParams()
  useEffect(()=>{
    token = token.replaceAll("'", ".")
    console.log(token)
  },[])
  return (
    <div>ConfirmationSingup</div>
  )
}
export default ConfirmationSingup
