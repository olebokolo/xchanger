import { AnyAction, Dispatch, Store } from 'redux';

const loggerMiddleware = (store: Store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default loggerMiddleware;
