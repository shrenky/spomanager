import { NODE_TYPE } from "./NodeType";

export interface INodeInfo {
    url: string;
    title: string;
    type?: NODE_TYPE;
}

export interface IListNodeInfo extends INodeInfo {
    parentWebUrl: string;
    imageUrl: string;
    itemCount: number;
    isHidden: boolean;
}