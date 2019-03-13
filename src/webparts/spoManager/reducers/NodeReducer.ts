import * as ACTIONTYPES from '../actions/ActionTypes';
import { INodeAction } from "../actions/Actions";

export function NodeReducer (state, action: INodeAction) {
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
        case ACTIONTYPES.FETCH_WEB_PENDING:
            return{
                ...state,
                isPending:true,
                isFulfilled: false,
                isRejected: false,
                childIds: []
            };
        case ACTIONTYPES.FETCH_SITE_FULFILLED:
        case ACTIONTYPES.FETCH_WEB_FULFILLED:
            return{
                ...state,
                isPending:false,
                isFulfilled: true,
                isRejected: false,
                childIds: []
            };
        case ACTIONTYPES.FETCH_SITE_REJECTED:
        case ACTIONTYPES.FETCH_WEB_REJECTED:
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
