import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortAnecdotes, increaseVotes } from '../reducers/anecdoteReducer';
import { notificationCreator } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let res = anecdotes;
    if (filter) {
      res = anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    }
    return res;
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(notificationCreator(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(notificationCreator(''));
    }, 5000);
    dispatch(increaseVotes(anecdote));
    dispatch(sortAnecdotes());
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
