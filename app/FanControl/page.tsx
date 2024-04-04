'use client';
import axios from 'axios';
import { connect } from 'http2'
import React, { useState } from 'react'

const FanControl = () => {
  const [connection, setConnection] = useState(false);

  const connect = async () => {
    try {
        const response = await axios.post('http://localhost:5000/connect', {
          comport : "COM3"

        });
        console.log('Connected:', response.data);
        setConnection(!connection);
      } catch (error) {
        console.error('Error connecting:', error);
    }
}

  return (
    <div className='flex flex-col justify-center items-center'>
        <p className=' text-[60px] my-4'>Fan Control</p>
        <button onClick={() => /*connect()*/console.log('mwa')} className={`transition-all duration-300 ease-in-out ${connection ? 'bg-red-400' : 'bg-green-400'} px-7 py-3 hover:px-8 my-2 rounded-lg text-[20px]`}>{connection ? "Connect" : "Connected"}</button>

    </div>
  )
}

export default FanControl