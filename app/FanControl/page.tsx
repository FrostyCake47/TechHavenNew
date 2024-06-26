'use client';
import axios from 'axios';
import { Socket } from 'dgram';
import { connect } from 'http2'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';


const FanControl = () => {
  const [connection, setConnection] = useState(false);
  const [variable, setVariable] = useState(0);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('variable_update', (data) => {
      console.log("on variable_update data: " + data);
      setVariable(data);
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      
  });
  }, []);

  const connect = async () => {
    try {
        const response = await axios.post('http://localhost:5002/connect', {
          comport : "COM3"

        });
        console.log('Connected:', response.data);
        setConnection(!connection);
      } catch (error) {
        console.error('Error connecting:', error);
    }
}

const updateVariable = async () => {
  try {
    console.log("updating var");
    const response = await axios.post('http://localhost:5000/update_variable', {
      comport : "COM3"

    });
    console.log('variable changed:', response.data);
  } catch (error) {
    console.error('Error connecting:', error);
}
}

return (
    <div className='flex flex-col justify-center items-center'>
        <p className=' text-[60px] my-4'>Fan Control</p>
        <button onClick={() => connect()} className={`transition-all duration-300 ease-in-out ${connection ? 'bg-red-400' : 'bg-green-400'} px-7 py-3 hover:px-8 my-2 rounded-lg text-[20px]`}>{connection ? "Connect" : "Connected"}</button>
        {variable}
        <button onClick={() => {updateVariable()}}>update vairable</button>
    </div>
  )
}

export default FanControl