import * as MockData from './MockData';

export class MockDataService {
    /**
     * return TanantUrl: https://contoso.sharepoint.com
     */
    public static getTenantUrl(): string {
        return 'https://contoso.sharepoint.com';
    } 

    /**
     * return 3 sites: Contoso, Test Site, Sales
     * [
     *    {"url":"https://contoso.sharepoint.com","title":"contoso"},
     *    {"url":"https://contoso.sharepoint.com/sites/test","title":"test site"},
     *    {"url":"https://contoso.sharepoint.com/sites/sales","title":"sales"}
     * ]
     */
    public static getSites(): any[] {
        return MockData.sites;
    }

    /**
     * 
     * @param url site's url
     * return webs under site
     */
    public static getWebsBySiteUrl(url:string): any[] {
        if(url === 'https://contoso.sharepoint.com')
        {
            return MockData.contosoWebs;
        }
        else if(url === 'https://contoso.sharepoint.com/sites/test')
        {
            return MockData.testWebs;
        }
        else if(url ==='https://contoso.sharepoint.com/sites/sales')
        {
            return MockData.saleWebs;
        }
        else
        {
            return [];
        }
    }

    /**
     * 
     * @param url web's url
     */
    public static getListsByWebUrl(url:string): any[] {
        if(url === 'https://contoso.sharepoint.com/sites/contoso')
        {
            return [];
        }
        else if(url === 'https://contoso.sharepoint.com/sites/test/blog')
        {
            return MockData.blogWebLists;
        }
        else if(url ==='https://contoso.sharepoint.com/sites/test/meeting')
        {
            return MockData.meetWebLists;
        }
        else if(url === 'https://contoso.sharepoint.com/sites/test')
        {
            return MockData.testWebLists;
        }
        else
        {
            return [];
        }
    }

    public static getLibraryProperties(id: string): any {
        return MockData.listProperties;
    }
}