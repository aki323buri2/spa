import 'babel-polyfill';
import 'whatwg-fetch';
import './dom-polyfill';
import './main.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createProvider } from './saga';
Promise.resolve().then(e =>
{
	const provider = createProvider(App);
	render(provider, document.body.appendChild(document.createElement('div')));
	provider.runSaga();
});