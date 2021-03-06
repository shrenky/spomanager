import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

import styles from './SpoManager.module.scss';
import { ISpoManagerProps } from './ISpoManagerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SpoContainer from './SpoContainer';
import ConnectedNode from '../containers/ConnectedNode';

import {
  Spinner
} from 'office-ui-fabric-react';

export default class SpoManager extends React.Component<ISpoManagerProps, {}> {

  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISpoManagerProps> {
    return (
      <Provider store={this.props.store}>
        <SpoContainer>
          <ConnectedNode id={1} client={this.props.context.spHttpClient}/>
        </SpoContainer>
      </Provider>
    );
  }
}
