import TreeReducer from './TreeReducer';

export default (state, action) => {
    
    if(action.type == 'INIT')
    {
        state = undefined;
    }

    return TreeReducer(state, action);
}