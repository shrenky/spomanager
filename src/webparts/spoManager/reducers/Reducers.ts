import * as ACTIONTYPES from '../actions/ActionTypes';
import { NODE_TYPE } from '../interfaces/NodeType';
import { TreeUtils } from '../utility/TreeUtils';
import { INodeAction } from '../actions/Actions';

export default (state = {}, action) => {
    console.log('state: ' + state);
    console.log('action: ' + action);

    const { nodeId, meta } = action;
    let currentNodeId = nodeId;
    if(meta) {
        currentNodeId = meta.nodeId;
    }

    if(action.type == ACTIONTYPES.FETCH_SITE_FULFILLED) {
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
        [currentNodeId]: node(state[currentNodeId], action)
    }
}

export function node(state, action: INodeAction) {
    console.log('in node');
    switch (action.type){
        /*
        case CREATE_NODE:
            return {
                id: action.nodeId,
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                url: action.payload.url,
                childIds: []
            };*/
        case ACTIONTYPES.EXPAND_COLLAPSE_NODE:
            return {
                ...state,
                expanded: !state.expanded
            };
        case ACTIONTYPES.FETCH_SITE_PENDING:
            return{
                ...state,
                isPending:true,
                isFulfilled: false,
                isRejected: false,
                childIds: []
            };
        case ACTIONTYPES.FETCH_SITE_FULFILLED:
            return{
                ...state,
                isPending:false,
                isFulfilled: true,
                isRejected: false,
                childIds: []
            };
        case ACTIONTYPES.FETCH_SITE_REJECTED:
            return {
                ...state,
                isPending:false,
                isFulfilled: false,
                isRejected: true,
                error: action.payload
            };

        default:
            return state;
    }
}

export function createSiteNodes(nodeState, children) {
    let nodes = {};
    let idArr = [];
    const nodeType = NODE_TYPE.SITE;
    children.forEach(child => {
        const id = TreeUtils.getNextNodeId();
        idArr.push(id);
        nodes[id] = {
            id: id,
            type: nodeType,
            isFulfilled: false,
            isRejected: false,
            url: child.url,
            title: child.title,
            childIds: []
        };
    });

    return {nodes: nodes, ids: idArr};
}