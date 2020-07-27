import React, { useEffect,useState } from 'react';
import { connect, useSelector,useDispatch } from 'react-redux';
import Inbox from './Inbox';

const handleSend = (To,Subject,Message) => fetch('http://localhost:3005/api/send',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            To,
            Subject,
            Message
        })
    }).then(res => res.json())


const Compose = (props) => {
    const [To, setTo] = useState('');
    const [Subject, setSubject] = useState('');
    const [Message, setMessage] = useState('');
    const [IsSet, setIsSet] = useState(0);

    const handleToChange = (e) => setTo(e.target.value)
    const handleSubjectChange = (e) => setSubject(e.target.value)
    const handleMessageChange = (e) => setMessage(e.target.value)

    return IsSet === 0 ? 
    <div>
        < h2 > Compose </h2 > <br />
            To: <input type="text" onChange={handleToChange} /> <br />
            Subject: <input type="text" onChange={handleSubjectChange} /> <br />
            Message: <input type="text" onChange={handleMessageChange} /> <br />
            <button onClick={() => {handleSend(To,Subject,Message);setIsSet(1);alert("Message Sent")}}>Send</button>
    </div > :
    <Inbox />
}

export default Compose;