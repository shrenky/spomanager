import { NODE_TYPE } from "./NodeType";

export interface INodeInfo {
    url: string;
    title: string;
    imageUrl?: string;
    type?: NODE_TYPE;
}

export interface IListNodeInfo extends INodeInfo {
    parentWebUrl: string;
    itemCount: number;
    isHidden: boolean;
}