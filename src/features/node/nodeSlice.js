const initialState = {
    "name": null
}

export default function nodeReducer ( state = initialState, action ) {
    switch ( action.type )
    {
        case 'LOAD_NODE_TO_EDITOR':
            return action.payload;

        /* case 'NODE/UPDATE_NODE':
             return (
                 state, action.payload
             )*/

        default:
            return state;
    }
}
