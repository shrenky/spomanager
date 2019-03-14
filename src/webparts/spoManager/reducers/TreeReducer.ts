import * as ACTIONTYPES from '../actions/ActionTypes';
import { NODE_TYPE } from '../interfaces/NodeType';
import { TreeUtils } from '../utility/TreeUtils';

import { NodeReducer } from './NodeReducer';

export default (state = {}, action) => {
    console.log('state: ' + state);
    console.log('action: ' + action);

    const { nodeId, meta } = action;
    let currentNodeId = nodeId;
    if(meta) {
        currentNodeId = meta.nodeId;
    }

    if(currentNodeId === undefined) {
        return state;
    }

    if(action.type == ACTIONTYPES.FETCH_SITE_FULFILLED || action.type == ACTIONTYPES.FETCH_WEB_FULFILLED) {
        const children = action.payload;
        if(children.length > 0) {
            const nodeState = state[currentNodeId];
            const childIdsArray = nodeState.childIds;
            const data = createSiteNodes(nodeState, children);
            const newNodes = data.nodes;
            const ids = data.ids;
            const newNodeState = {
                ...nodeState,
                isPending: false,
                isFullfilled: true,
                isRejected: false,
                childIds: [...childIdsArray, ...ids]
            };
            return {
                ...state,
                [currentNodeId]: newNodeState,
                ...newNodes
            }
        }
        else
        {
            return state;
        }
    }

    return {
        ...state,
        [currentNodeId]: NodeReducer(state[currentNodeId], action)
    }
}

export function createSiteNodes(nodeState, children) {
    let nodes = {};
    let idArr = [];
    const nodeType = nodeState.type == NODE_TYPE.TENANT ? NODE_TYPE.SITE : NODE_TYPE.WEB;
    children.forEach(child => {
        const id = TreeUtils.getNextNodeId();
        idArr.push(id);
        nodes[id] = {
            id: id,
            type: nodeType,
            url: child.url,
            title: child.title,
            childIds: [],
            expended: false,
            isSelected: false,
            isPending: false,
            isFulfilled: false,
            isRejected: false,
            
            properties: {}
        };
    });

    return {nodes: nodes, ids: idArr};
}