const notficationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFCATION': {
      return action.data.notification;
    }
    case 'DISMISS': {
      return '';
    }
    default:
      return state;
  }
};

const notificationDismiss = (message) => ({
  type: 'DISMISS',
});

const notificationCreator = (notification) => {
  return {
    type: 'SET_NOTIFCATION',
    data: { notification },
  };
};

export const notification = (message, time) => {
  return async (dispatch) => {
    await dispatch(notificationCreator(message));
    setTimeout(async () => await dispatch(notificationDismiss()), time * 1000);
  };
};

export default notficationReducer;
