const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'APPLY_FILTER': {
      console.log(action.filter)
      return action.filter;
    }
    default:
      return state;
  }
};

export const filterCreater = (filter, anecdotes) => {
  return {
    type: 'APPLY_FILTER',
    filter,
  };
};

export default filterReducer;
