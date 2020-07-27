import store from './store';
import React, { Component, useEffect, useState } from 'react';
import EmailList from './EmailList';
import { connect, useSelector, useDispatch } from 'react-redux';

const loadTrash = () => fetch('http://localhost:3005/api/trash',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    }).then(res => res.json())

const dispatchLoadTrash = (dispatch) => {
    dispatch({ type: 'TRASH_LOAD_STARTED' });
    loadTrash().then(data => store.dispatch(
        {
            type: 'TRASH_LOAD_COMPLETED', payload: data
        }));
}

const Trash = (props) => {
    const dispatch = useDispatch();
    useEffect(() =>
        dispatchLoadTrash(dispatch),
        []
    )

    const trash = useSelector(state => state.trash);
    return <div>
        {trash.loading && <div>Loading your data ...</div>}
        {trash.emails &&  <EmailList emails={trash.emails} tab='trash' /> }
    </div>

}

export default Trash;