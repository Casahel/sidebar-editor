import { combineReducers } from 'redux';

import treeReducer from '../src/features/tree/treeSlice';
import nodeReducer from '../src/features/node/nodeSlice';

const rootReducer = combineReducers( {
    treeData: treeReducer,
    selectedNode: nodeReducer,
})

export default rootReducer;
