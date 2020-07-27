import React from 'react';

const EmailComponent = ({ message, subject, from, to, important, status, onDelete, changeArray }) => {
    const styleClass = important ? 'important' : '';

    return <div className={`email ${styleClass}`} >
        <button className="delete" onClick={onDelete} >Delete</button>
        <input type="checkbox" className="delete" onChange={changeArray} checked={status}></input>
        From: {from} <br />
        To: {to} <br />
        Subject: {subject}<br />
        Message: {message}
    </div>
}

export default EmailComponent;