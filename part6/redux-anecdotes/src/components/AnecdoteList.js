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

  const vote = (id, content) => {
    dispatch(notificationCreator(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(notificationCreator(''));
    }, 5000);
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
