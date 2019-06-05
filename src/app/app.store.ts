import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import appEpics from './app.epics'
import appReducer from './app.reducer'
import loggerMiddleware from './middlewares/logger.middleware'

const epicMiddleware = createEpicMiddleware()

declare global {
  interface Window {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;}
}

const composeEnhancers = (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {

  const store = createStore(appReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      applyMiddleware(loggerMiddleware)
    )
  )

  epicMiddleware.run(appEpics)

  return store
}

export default configureStore()
