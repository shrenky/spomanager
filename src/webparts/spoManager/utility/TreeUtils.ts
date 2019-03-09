import { NODE_TYPE } from "../interfaces/NodeType";

export class TreeUtils {
    public static nextNodeId = 1;
    public static getNextNodeId() {
        return ++ TreeUtils.nextNodeId;
    }

    public static initRoot(scope: string, context: any) {
        const title = TreeUtils.getTitle(scope, context);
        const url = TreeUtils.getUrl(scope, context);
        let rootNode = {
            1: {
                id: 1,
                type: scope == 'Tenant' ? NODE_TYPE.TENANT : scope == 'Site' ? NODE_TYPE.SITE : 'Web',
                url: url,
                title: title,
                childIds: [],
                expanded: false,
                isSelected: false,

                properties: {}
            }
        };
        return rootNode;
    }

    private static getTitle(scope: string, context: any) {
        if(scope == 'Tenant') {
            const url = `${window.location.protocol}//${window.location.hostname}`;
            return `Tenant (${url})`;
        }
        else if (scope == 'Site') {
            return context.pageContext.site.absoluteUrl; //`~ ${context.pageContext.site.serverRelativeUrl}`;
        }
        else {
            return context.pageContext.web.title;
        }
    }

    private static getUrl(scope: string, context: any) {
        if(scope == 'Tenant') {
            return`${window.location.protocol}//${window.location.hostname}`;
        }
        else {
            return context.pageContext.site.absoluteUrl;
        }
    }
}
