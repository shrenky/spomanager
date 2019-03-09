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

export interface INodeStateProps {
    id: number;
    type: NODE_TYPE;
    url: string;
    title: string;
    childIds: number[];
    expanded: boolean;
    isSelected: boolean;

    isLoading: boolean;
}

export interface INodeDispatchProps {

}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props) {
        super(props);
    }

    public renderChild = childId => {
        const { id } = this.props;
        return (
            <ConnectedNode id={childId} parentId={id} />
        );
    }

    public render() {
        const {id, childIds, url, title, expanded, isSelected } = this.props;
        const nodeText = this.getNodeText();
        return (
            <div>
                <Icon style={{cursor:'pointer'}} iconName={ expanded ? 'CollapseContentSingle' : 'ExploreContentSingle' }/>
                {' '}
                {nodeText}
                {
                    this.props.isLoading ? 
                        <Spinner type={SpinnerType.normal} size={SpinnerSize.small} /> :
                        childIds.map(this.renderChild)
                }
            </div>
        );
    }

    private getNodeText() {
        const { id, type, url } = this.props;
        if( id === 1 && type === NODE_TYPE.TENANT){ //root node, return text if tenant scope
            return 'Tenant';
        }
        else
        {
            return url;
        }
    }
}

function mapStateToProps(state, ownProps): INodeStateProps {
    return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;