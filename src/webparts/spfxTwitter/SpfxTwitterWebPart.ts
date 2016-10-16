import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'spfxTwitterStrings';
import { ISpfxTwitterWebPartProps } from './ISpfxTwitterWebPartProps';
import ModuleLoader from '@microsoft/sp-module-loader';

export default class SpfxTwitterWebPart extends BaseClientSideWebPart<ISpfxTwitterWebPartProps> {
  private twttr: any;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    var html = '<a class="twitter-timeline" href="https://twitter.com/' + this.properties.account + '">Tweets by ' + this.properties.account + '</a>';
    this.domElement.innerHTML = html;

    if (this.twttr == null) {
      ModuleLoader.loadScript('//platform.twitter.com/widgets.js', 'twttr').then((twttr?: any)=> {
        this.twttr = twttr;
      });
    }
    else {
      this.twttr.widgets.load();
    }
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: "Configuration"
          },
          groups: [
            {
              groupName: "Twitter info",
              groupFields: [
                PropertyPaneTextField('account', {
                  label: "Your Twitter acount here"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
