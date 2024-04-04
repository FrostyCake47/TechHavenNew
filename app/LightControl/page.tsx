'use client';
import React, { useState } from 'react'
import Text from 'next';
import axios from 'axios';

const LightControl = () => {
    const [command, setCommand] = useState(false);
    const [connection, setConnection] = useState(false);

    const connect = async () => {
        try {
            const response = await axios.post('http://localhost:5000/connect', {
              comport : "COM3"
            });
            console.log('Connected:', response.data);
            setConnection(prevConnection => !prevConnection);
            console.log(connection);
    
          } catch (error) {
            console.error('Error connecting:', error);
        }
      }

    const sendCommand = async () => {
        try {
            const response = await axios.post('http://localhost:5000/sendcommand', {
              command : command ? "ON" : "OFF"
            });
            console.log('Connected:', response.data);
            setCommand(!command);

          } catch (error) {
            console.error('Error connecting:', error);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <p className=' text-[60px] my-4'>Light Control</p>
        <button onClick={() => connect()} className={`transition-all duration-300 ease-in-out ${connection ? 'bg-red-400' : 'bg-green-400'} px-7 py-3 hover:px-8 my-2 rounded-lg text-[20px]`}>{connection ? "Connect" : "Connected"}</button>
        <button onClick={() => sendCommand()} className={`${command ? 'bg-red-400' : 'bg-green-400'} rounded-lg px-5 py-1 hover:px-6 my-2 mx-1 transition-all duration-300 ease-in-out`} >{command ? "OFF" : "ON"}</button>

    </div>
    
  )
}

export default LightControl