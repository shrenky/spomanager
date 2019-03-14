import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpoManagerWebPartStrings';
import SpoManager from './components/SpoManager';
import { ISpoManagerProps } from './components/ISpoManagerProps';
import { TreeUtils } from './utility/TreeUtils';
import reducer from './reducers/index';
import * as ACTIONS from './actions/Actions';

export interface ISpoManagerWebPartProps {
  scope: string;
}

export default class SpoManagerWebPart extends BaseClientSideWebPart<ISpoManagerWebPartProps> {
  private needRefresh: boolean = false;

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any){
    if(propertyPath === 'scope' && oldValue != newValue) {
      this.needRefresh = true;
    }
    else{
      this.needRefresh = false;
    }
  }

  protected renderCompleted() {

  }

  public render(): void {
    const root = TreeUtils.initRoot(this.properties.scope, this.context);
    const store = createStore(reducer, root as any, applyMiddleware(thunk, promiseMiddleware, logger));
    //store.dispatch(ACTIONS.init(root));
    const element: React.ReactElement<ISpoManagerProps > = React.createElement(
      SpoManager,
      {
        scope: this.properties.scope,
        context: this.context,
        store: store
      }
    );

    ReactDom.render(element, this.domElement);
    
    if(this.needRefresh) {
      window.location.reload();
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges() {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('scope', {
                  label: strings.DescriptionFieldLabel,
                  options: [
                    {text: strings.ScopeTenant, key: 'Tenant'},
                    {text: strings.ScopeSite, key: 'Site'},
                    {text: strings.ScopeWeb, key: 'Web'},
                  ],
                  selectedKey: 'Tenant'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
