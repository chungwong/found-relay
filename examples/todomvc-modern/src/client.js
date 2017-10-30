import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import { Environment, Network, RecordSource, Store, } from 'relay-runtime';
import { ScrollManager } from 'found-scroll';

import routes from './routes';

import 'todomvc-common/base';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import './assets/learn.json';

function fetchQuery(
  operation,
  variables,
) {
  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}


const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const render = createRender({});

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: renderArgs => (
    <ScrollManager renderArgs={renderArgs}>
    {render(renderArgs)}
    </ScrollManager>
  ),
});

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

ReactDOM.render(
  <Router resolver={new Resolver(environment)} />,
  mountNode,
);
