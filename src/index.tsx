import 'normalize.css/normalize.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import * as serviceWorker from './serviceWorker';

console.log(`Added this to just trigger the hook`);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
