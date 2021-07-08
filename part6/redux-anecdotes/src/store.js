import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notficationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  notification: notficationReducer,
  anecdotes: anecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
