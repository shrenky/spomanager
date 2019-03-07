declare interface ISpoManagerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ScopeTenant: string;
  ScopeSite: string;
  ScopeWeb: string;
}

declare module 'SpoManagerWebPartStrings' {
  const strings: ISpoManagerWebPartStrings;
  export = strings;
}
