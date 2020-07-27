import React, { useState } from 'react';
import store from './store';
import Inbox from './Inbox';
import Sent from './Sent';
import Trash from './Trash';
import Compose from './Compose';
import './App.css';
import Login from './Login';
import { Provider, connect, useSelector } from 'react-redux';


const App = (props) => {
  const [tab, setTab] = useState('inbox');
  const handleLogout = () => {
    store.dispatch({ type: 'LOGOUT_COMPLETED' });
  }
  const app = useSelector(state => state.app)
  return app.loggedIn ?
    <div >
      <a href="#" className={tab === 'compose' ? 'active' : ''} onClick={() => setTab('compose')}>Compose</a>
      <a href="#" className={tab === 'inbox' ? 'active' : ''} onClick={() => setTab('inbox')}>Inbox </a>
      <a href="#" className={tab === 'sent' ? 'active' : ''} onClick={() => setTab('sent')}>Sent </a>
      <a href="#" className={tab === 'trash' ? 'active' : ''} onClick={() => setTab('trash')}>Trash </a>
      <a href="#" onClick={handleLogout} className="logout">Logout</a>
      {tab === 'compose' && <Compose />}
      {tab === 'inbox' && <Inbox />}
      {tab === 'sent' && <Sent />}
      {tab === 'trash' && <Trash />}
    </div> :
    <Login />
}

const root = () => <Provider store={store}><App /></Provider>
export default root;