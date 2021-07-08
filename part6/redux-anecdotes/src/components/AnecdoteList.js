import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortAnecdotes, increaseVotes } from '../reducers/anecdoteReducer';
import { notificationCreator } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(notificationCreator(`you voted '${content}'`))
    dispatch(increaseVotes(id));
    dispatch(sortAnecdotes());
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
