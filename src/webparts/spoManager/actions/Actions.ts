import * as ACTIONTYPES from './ActionTypes';
import { SiteService } from '../data/SiteService';

export interface INodeAction {
    type: string;
    nodeId?: number;
    childId?: number[];
    payload?: any;
    meta?: any;
}

export function expand_collapse_node(nodeId): INodeAction {
    return {
        type: ACTIONTYPES.EXPAND_COLLAPSE_NODE,
        nodeId: nodeId
    };
}

export function fetch_site(nodeId: number, spHttpClient: any, url: string) : INodeAction {
    const service = new SiteService(spHttpClient);
    return {
        type: ACTIONTYPES.FETCH_SITE,
        payload: service.getSitesStartingWith(url).then((sites) => {
            return sites;
        }),
        meta: {
            nodeId: nodeId
        }
        
    };
}