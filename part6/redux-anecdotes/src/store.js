import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notficationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  notification: notficationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
