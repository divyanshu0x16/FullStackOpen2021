const getId = () => (100000 * Math.random()).toFixed(0);

//This is  a action creator
export const increaseVotes = (id) => {
  return {
    type: 'INCREASE_VOTES',
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const sortAnecdotes = () => {
  return {
    type: 'SORT',
  };
};

export const initialzieAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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
