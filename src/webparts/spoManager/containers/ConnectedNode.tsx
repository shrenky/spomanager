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
    type: NODE_TYPE;
    id: number;
    child
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
        return (
            <div>Render in Connected Node!</div>
        );
    }
}

function mapStateToProps(state, ownProps): INodeStateProps {
    return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;