import { v4 as uuidv4 } from 'uuid';

const initialState = []

export default function treeReducer (state = initialState, action) {

    let i = null;
    const findCurrentIndex = () => {
        if (state) {
            i = state.findIndex(entry => entry.id === action.payload.id); 
        }
    }

    let entryUpdate = {};
    const prepareUpdate = () => {
        if (action.payload) {
            entryUpdate = action.payload;
        }
    }

    let newState = [];
    const prepareNewState = () => {
        if (state) {
            newState = state.slice();
        }
    }

    switch ( action.type )
    {
        case 'TREE/UPDATE_NODE':
            findCurrentIndex();
            prepareUpdate();
            prepareNewState();
            newState[i] = entryUpdate;
            return newState;
        
        case 'TREE/ADD_NODE':
            prepareUpdate();
            entryUpdate.id = uuidv4();
            prepareNewState();
            newState.push(entryUpdate);
            return newState;
        
        case 'TREE/REMOVE_NODE':
            findCurrentIndex();
            prepareNewState();
            newState.splice(i, 1);
            return newState;
        
        default:
            return state;
    }
}
