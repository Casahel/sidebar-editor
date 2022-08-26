const initialState = {
    treeData: [
    ]
}

export default function treeReducer ( state = initialState, action ) {
    switch ( action.type )
    {
        case 'TREE_LOAD':
            return {
                ...state
            }

        case 'TREE_UPDATE_NODE':
            let entryUpdate = {};
            entryUpdate = action.payload;

            console.log( 'Current state: ', JSON.stringify( ...state ) )
            console.log( 'New item: ', JSON.stringify( entryUpdate ) );

            const i = state.findIndex( entry => entry.id === action.payload.id );

            console.log( 'Index to update: ', i );

            let newState = [];

            //make a deep copy of state
            newState = state.slice();

            console.log( 'New state (before update): ', JSON.stringify( newState ) );

            //and then overwrite item at appropriate index
            newState[i] = entryUpdate;
            console.log( 'State after update: ', newState );

            return {
                ...state,
                treeData: newState
            }

        default:
            return state;
    }
}
