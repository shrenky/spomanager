import { SPHttpClient } from "@microsoft/sp-http";

export interface ISpoManagerProps {
  scope: string;
  spHttpClient: SPHttpClient;
}
