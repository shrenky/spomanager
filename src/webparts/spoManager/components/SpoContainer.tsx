import * as React from 'react';
import styles from './SpoManager.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ISpoContainerProps {

}

export default class SpoContainer extends React.Component<ISpoContainerProps, {}> {
  public render(): React.ReactElement<ISpoContainerProps> {
    return (
      <div className={ styles.spoContainer }>
        <div className={styles.spoNavbar}>
            Nav Bar 
        </div>
        <div className={styles.spoPropsPanel}>
            Properties
        </div>
      </div>
    );
  }
}
