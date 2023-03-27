import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios';

import"./Chat.css";

function Chat({ messages }) {

  const [input, setInput] = useState("");

  const sendMessage = async (e) => { 
    e.preventDefault();

    axios.post('/messages/new',{
      message: input,
      name: "DEMO APP",
      timestamp: "just now!",
      received: false,
    });

    setInput("");
   };
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />

        <div className='chat_headerInfo' >
          <h3>Room name</h3>
          <p>Last sceen at...</p>
        </div>

        <div className='chat_headerRight'>
        <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
        </div>
        </div>

        <div className='chat_body'>
          {messages.map((message) => (
            <p className={`chat_message ${message.received && 'chat_reciever' }`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>
              {message.timestamp}</span>
          </p>
          ))}

        </div>
        <div className='chat_footer'>
          <InsertEmoticonIcon />
          <form>
            <input value={input} onChange={e => setInput(e.target.value) } type='text' placeholder='Type a message' />
            <button onClick={sendMessage} type='submit' className=''>Send a message</button>
          </form>
           <MicIcon />
        </div>
      </div>
  )
}

export default Chat