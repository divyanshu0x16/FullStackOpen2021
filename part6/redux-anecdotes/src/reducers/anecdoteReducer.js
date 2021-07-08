const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

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

const reducer = (state = initialState, action) => {
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
      })
    }
    default:
      return state;
  }
};

export default reducer;
