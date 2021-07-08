import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notficationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  notification: notficationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
