const notficationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFCATION': {
      return action.data;
    }
    default:
      return state;
  }
};

export const notificationCreator = (notification) => {
  return {
    type: 'SET_NOTIFCATION',
    notification,
  };
};

export default notficationReducer;
