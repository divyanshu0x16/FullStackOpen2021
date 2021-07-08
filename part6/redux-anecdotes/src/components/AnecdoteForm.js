import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer';
import { notificationCreator } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(notificationCreator(`you created '${content}'`));
    setTimeout(() => {
      dispatch(notificationCreator(''));
    }, 5000);
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(sortAnecdotes());
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
