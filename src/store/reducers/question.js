import C from '../../constants';

const initialState = {
  status: false,
  hasReceiveData: false,
  isSubmitting: false,
  isError: false,
  data: {}
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.QUESTION_DETAIL_GET:
      console.log('stateactionnnnnnnnnnnnnnnnnnnnnnnnnnn1', state, action, Object);
      newState = Object.assign({}, state, {
        status: true,
        data: action.data,
      });
      console.log('newStateeeeeeeeeeee', newState);
      return newState;
    case C.QUESTION_DATA_SUBMITTING:
      console.log('submittingggggggggggggg', C);
      return Object.assign({}, state, {
        hasReceiveData: false,
        isSubmitting: true
      });
    case C.QUESTION_DATA_UPDATED:
      return Object.assign({}, state, {
        hasReceiveData: true,
        isSubmitting: false
      });
    default:
      console.log('returnnnnnnnnnnnnnnnn', state);
      return state || initialState;
  }
};
