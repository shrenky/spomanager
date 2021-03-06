import * as React from 'react';
import { connect } from 'react-redux';

import {
    Icon,
    Spinner,
    SpinnerType,
    SpinnerSize
} from 'office-ui-fabric-react';

import Styles from './TreeNode.module.scss';
import { NODE_TYPE } from '../interfaces/NodeType';
import * as actions from '../actions/Actions';
import * as constants from '../utility/Constants';

export interface INodeStateProps {
    id: number;
    type: NODE_TYPE;
    url: string;
    imageUrl: string;
    title: string;
    childIds: number[];
    expanded: boolean;
    isSelected: boolean;
    client: any;

    isPending: boolean;
    isFulfilled: boolean;
    isRejected: boolean;
}

export interface INodeDispatchProps {
    expand_collapse_node(id);
    fetch_site(id, client, url);
    fetch_web(id, client, url);
    expand_web(id, client, url);
    fetch_sub_webs(id, client, url);
    fetch_web_lists(id, client, url);
}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {

    constructor(props) {
        super(props);
        this.onExpandNode = this.onExpandNode.bind(this);
    }

    public renderChild = childId => {
        const { id } = this.props;
        return (
            <ConnectedNode id={childId} parentId={id} client={this.props.client}/>
        );
    }

    public render() {
        const {id, childIds, url, imageUrl, title, expanded, isSelected } = this.props;
        return (
            <div>
                <Icon className={Styles.FileTypeIcon} iconName={ expanded ?  constants.COLLAPSEICONNAME: constants.ExploreICONNAME } onClick={this.onExpandNode}/>
                {'-'}
                <img className={Styles.FileTypeIconIcon} alt="" src={imageUrl}></img>
                <span className={Styles.NodeTitle}>{title}</span>
                <div className={expanded ? Styles.NodeExpanded : Styles.NodeCollapsed}>
                    {
                        this.props.isPending ? 
                            <Spinner type={SpinnerType.normal} size={SpinnerSize.small} /> :
                            childIds.map(this.renderChild)
                    }
                </div>
                
            </div>
        );
    }

    private onExpandNode() {
        const { client, fetch_site, fetch_web, expand_web, fetch_sub_webs, fetch_web_lists, id, url, title, isPending, isFulfilled, isRejected, expand_collapse_node } = this.props;
        if(this.props.type === NODE_TYPE.TENANT) {
            if(!(isPending || isFulfilled || isRejected)) {
                fetch_site(id, client, url);
            }
        }

        if(this.props.type === NODE_TYPE.SITE) {
            if(!(isPending || isFulfilled || isRejected)) {
                fetch_web(id, client, url);
            }
        }

        if(this.props.type === NODE_TYPE.WEB) {
            if(!(isPending || isFulfilled || isRejected)) {
                expand_web(id, client, url);
            }
        }

        if(this.props.type === NODE_TYPE.WEBS) {
            if(!(isPending || isFulfilled || isRejected)) {
                fetch_sub_webs(id, client, url);
            }
        }

        if(this.props.type === NODE_TYPE.LISTS) {
            if(!(isPending || isFulfilled || isRejected)) {
                fetch_web_lists(id, client, url);
            }
        }

        expand_collapse_node(id);
    }
}

function mapStateToProps(state, ownProps): INodeStateProps {
    return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;