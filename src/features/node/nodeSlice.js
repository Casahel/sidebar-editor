const initialState = {
    "name": null
}

export default function nodeReducer ( state = initialState, action ) {
    switch ( action.type )
    {
        case 'NODE/LOAD_TO_EDITOR':
            return action.payload;

        default:
            return state;
    }
}
