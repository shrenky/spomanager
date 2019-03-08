import { NODE_TYPE } from "../interfaces/NodeType";

export class TreeUtils {
    public static nextNodeId = 1;
    public static getNextNodeId() {
        return ++ TreeUtils.nextNodeId;
    }

    public static initRoot(scope: string) {
        let url = `${window.location.protocol}//${window.location.hostname}`;
        let rootNode = {
            1: {
                id: 1,
                type: scope == 'Tenant' ? NODE_TYPE.TENANT : scope == 'Site' ? NODE_TYPE.SITE : 'Web',
                url: url,
                title: '',
                childIds: [],
                expanded: false,
                isSelected: false,

                properties: {}
            }
        };
        return rootNode;
    }
}
