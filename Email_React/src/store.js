import { createStore, compose } from 'redux';
import rootReducer from './reducer.js';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = finalCreateStore(rootReducer);
window.store = store;
export default store;