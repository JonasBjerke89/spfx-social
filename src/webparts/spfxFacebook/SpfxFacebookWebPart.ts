import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-client-preview';

import { ISpfxFacebookWebPartProps } from './ISpfxFacebookWebPartProps';
import ModuleLoader from '@microsoft/sp-module-loader';
import * as $ from 'jquery';

export default class SpfxFacebookWebPart extends BaseClientSideWebPart<ISpfxFacebookWebPartProps> {
  private FB: any;
  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    var html ='<div class="fb-page" data-href="https://www.facebook.com/' + this.properties.account + '" data-tabs="timeline" data-width="' + this.properties.width + '" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/itrelation" class="fb-xfbml-parse-ignore"></blockquote></div><div id="fb-root"></div>';

    this.domElement.innerHTML = html;

    $('#fb-root').remove();

        ModuleLoader.loadScript('//connect.facebook.net/da_DK/all.js', 'FB').then((FB?: any)=> {
          this.FB = FB;

            this.FB.init({
                xfbml: true,
                version: 2.8
            });
        });
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
              groupName: "Facebook settings",
              groupFields: [
                PropertyPaneTextField('account', {
                  label: "Account"
                }),
                PropertyPaneSlider('width',  {
                  min:180,
                  max:500,
                  label: "Width"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
