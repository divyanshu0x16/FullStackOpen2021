import anecdoteService from '../services/anecdotes';
//This is  a action creator
export const increaseVotes = (id) => {
  return {
    type: 'INCREASE_VOTES',
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    console.log(newAnecdote);
    dispatch({ type: 'CREATE_ANECDOTE', data: newAnecdote });
  };
};

export const sortAnecdotes = () => {
  return {
    type: 'SORT',
  };
};

export const initialzieAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREASE_VOTES': {
      const id = action.data.id;
      const toChange = state.find((n) => n.id === id);
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changed));
    }
    case 'CREATE_ANECDOTE': {
      return [...state, action.data];
    }
    case 'SORT': {
      return state.slice().sort((a, b) => {
        let keyA = a.votes;
        let keyB = b.votes;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
    }
    case 'INIT_ANECDOTES': {
      return action.data;
    }
    default:
      return state;
  }
};

export default anecdoteReducer;
