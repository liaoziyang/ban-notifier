import React, { useState } from 'react'

export default function Auth(){

  const [request, updateRequest] = useState('login')
  async function handleAuth(username, password, sign){
    console.log('ik fire')
    const loginData = {
      username: 'frank',
      password:  'Plaintext123*'
    }

    const rawResponse = await fetch(`${__API__}/auth/${sign}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    // statuscode --> 201 juist --> NIEUWE FETCH NAAR LOGIN MET ZELFDE GEGEVENS
    // andere 400 codes --> kijk naar message --> als error message weergeven aan user
    // indien sign in --> access token
    const content = await rawResponse.json()
    console.log(content)
  }


  return (
    <div>
      <input type="text"/>
      <input type="password"/>
      <button onClick={() =>handleAuth('test','test','signup')}>signup</button>
      <button onClick={() => handleAuth('test','test','signin')}>signin</button>
    </div>
  )
}









