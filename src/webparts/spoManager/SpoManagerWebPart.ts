import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpoManagerWebPartStrings';
import SpoManager from './components/SpoManager';
import { ISpoManagerProps } from './components/ISpoManagerProps';

export interface ISpoManagerWebPartProps {
  scope: string;
}

export default class SpoManagerWebPart extends BaseClientSideWebPart<ISpoManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpoManagerProps > = React.createElement(
      SpoManager,
      {
        scope: this.properties.scope,
        spHttpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
