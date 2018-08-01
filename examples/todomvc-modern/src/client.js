import HashProtocol from 'farce/lib/HashProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { ScrollManager } from 'found-scroll';
import { Resolver } from 'found-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import { Network } from 'relay-local-schema';
import { Environment, RecordSource, Store } from 'relay-runtime';

import routes from './routes';
import schema from './data/schema';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const environment = new Environment({
  network: Network.create({ schema }),
  store: new Store(new RecordSource()),
});

const render = createRender({
  renderError: ({ error }) => (
    <div>
      {error.status === 404 ? 'Not found' : 'Error'}
    </div>
  ),
});

const Router = createFarceRouter({
  historyProtocol: new HashProtocol(),
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

ReactDOM.render(<Router resolver={new Resolver(environment)} />, mountNode);
