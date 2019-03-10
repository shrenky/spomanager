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
    private readonly COLLAPSEICONNAME: string = 'CollapseContentSingle';
    private readonly ExploreICONNAME: string = 'ExploreContentSingle';
    private readonly SITEICONURL: string = "/_layouts/15/images/SharePointFoundation16.png";

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
        return (
            <div>
                <Icon className={Styles.FileTypeIcon} iconName={ expanded ?  this.COLLAPSEICONNAME: this.ExploreICONNAME }/>
                {'-'}
                <img className={Styles.FileTypeIconIcon} alt="" src={this.SITEICONURL}></img>
                <span className={Styles.NodeTitle}>{title}</span>
                {
                    this.props.isLoading ? 
                        <Spinner type={SpinnerType.normal} size={SpinnerSize.small} /> :
                        childIds.map(this.renderChild)
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps): INodeStateProps {
    return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;