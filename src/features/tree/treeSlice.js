import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

const initialState = []

export default function treeReducer (state = initialState, action) {

    const findNode = (id, tree) => {
        for (const node of tree)
        {
            if (node.id === action.payload.id) return node;
            if (node.children)
            {
                const child = findNode(id, node.children);
                if (child) return child;
            };
        }
    }

    // let i = null;
    // const findCurrentIndex = () => {
    //     if (state) {
    //         i = state.findIndex(entry => entry.id === action.payload.id); 
    //     } else
    //     {
    //         console.log('Could not find an index to update');
    //     }
    // }

    // let entryUpdate = {};
    // const prepareUpdate = () => {
    //     if (action.payload) {
    //         entryUpdate = action.payload;
    //     }
    // }

    // let newState = [];
    // const prepareNewState = () => {
    //     if (state) {
    //         newState = state.slice();
    //     }
    // }

    switch ( action.type )
    {
        case 'TREE/UPDATE_NODE':
            let target = findNode(action.payload.id, state);
            console.log("Before update: ", target)
            target = action.payload;
            console.log("After update: ", target);
            return [...state, ...target]

        // case 'TREE/ADD_NODE':
        //     prepareUpdate();
        //     entryUpdate.id = uuidv4();
        //     prepareNewState();
        //     newState.push(entryUpdate);
        //     return newState;

        // case 'TREE/REMOVE_NODE':
        //     const target = findNode(action.payload, state);
        //     let newState = state.splice(target, 1);
        //     return { ...newState };
        //     //     findCurrentIndex();
        //     prepareNewState();
        //     newState.splice(i, 1);
        //     return newState;

        default:
            return state;
    }
}
