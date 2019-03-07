declare interface ISpoManagerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ScopeTenant: string;
  ScopeSiteCollection: string;
  ScopeSite: string;
}

declare module 'SpoManagerWebPartStrings' {
  const strings: ISpoManagerWebPartStrings;
  export = strings;
}
