import store from './store';
import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import EmailList from './EmailList';

const loadSent = () => fetch('http://localhost:3005/api/sent',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    }).then(res => res.json())

const dispatchLoadSent = (dispatch) => {
    dispatch({ type: 'SENT_LOAD_STARTED' });
    loadSent().then(data => store.dispatch(
        {
            type: 'SENT_LOAD_COMPLETED', payload: data
        }));
}

const Sent = (props) => {
    const dispatch = useDispatch();
    const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            document.title = (Math.floor((new Date() - lastRefreshedTime) / 1000))
        }, 1000);
        return () => clearInterval(timer);
    }
        , [lastRefreshedTime])
    useEffect(() =>
        dispatchLoadSent(dispatch),
        []
    )

    const sent = useSelector(state => state.sent);
    return <div>
        <button onClick={() => { dispatchLoadSent(dispatch); setLastRefreshedTime(new Date()) }}>Refresh</button>
        {sent.loading && <div>Loading your data ...</div>}
        {sent.emails && <EmailList emails={sent.emails} tab='sent' />}
    </div>

}

export default Sent;