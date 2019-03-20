import * as ACTIONTYPES from './ActionTypes';
import { SiteService } from '../data/SiteService';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockDataService } from '../data/MockDataService';

export interface INodeAction {
    type: string;
    nodeId?: number;
    childId?: number[];
    payload?: any;
    meta?: any;
}

export function init(root): INodeAction {
    return {
        type: ACTIONTYPES.INIT,
        payload: root
    };
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
        payload:  Environment.type === EnvironmentType.Local ? MockDataService.getSites() : service.getSites(url).then((sites) => {
            return sites;
        }),
        meta: {
            nodeId: nodeId
        }
    };
}

export function fetch_web(nodeId: number, spHttpClient: any, url: string) : INodeAction {
    const service = new SiteService(spHttpClient);
    return {
        type: ACTIONTYPES.FETCH_WEB,
        payload: Environment.type === EnvironmentType.Local ? MockDataService.getWebsBySiteUrl(url) : service.getWebsBySiteUrl(url).then((webs) => {
            return webs;
        }),
        meta: {
            nodeId: nodeId
        }
    };
}

export function expand_web(nodeId: number, spHttpClient: any, url: string) : INodeAction {
    const service = new SiteService(spHttpClient);
    return {
        type: ACTIONTYPES.EXPAND_WEB,
        payload: service.expandWeb(url),
        meta: {
            nodeId: nodeId
        }
    };
}