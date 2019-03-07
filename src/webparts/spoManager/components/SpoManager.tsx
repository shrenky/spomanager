import * as React from 'react';
import styles from './SpoManager.module.scss';
import { ISpoManagerProps } from './ISpoManagerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SpoContainer from './SpoContainer';

export default class SpoManager extends React.Component<ISpoManagerProps, {}> {
  public render(): React.ReactElement<ISpoManagerProps> {
    return (
      <div>
        <SpoContainer />
        <span>{this.props.scope}</span>
      </div>
    );
  }
}
