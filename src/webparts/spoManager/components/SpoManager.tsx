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
import { TreeUtils } from '../utility/TreeUtils';
import reducer from '../reducers/Reducers';
import ConnectedNode from '../containers/ConnectedNode';

import {
  Spinner
} from 'office-ui-fabric-react';

export default class SpoManager extends React.Component<ISpoManagerProps, {}> {
  private root: any;
  private store: any;

  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    this.root = TreeUtils.initRoot(this.props.scope);
    this.store = createStore(reducer, this.root as any, applyMiddleware(thunk, promiseMiddleware, logger));
    console.log(this.root);
    console.log(this.props.context);
  }

  public render(): React.ReactElement<ISpoManagerProps> {
    return (
      <Provider store={this.store}>
        <SpoContainer>
          <ConnectedNode id={1} />
        </SpoContainer>
      </Provider>
    );
  }
}
