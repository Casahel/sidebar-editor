import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { v4 as uuidv4 } from 'uuid';

import configFile from '../public/test-data.json'

let preloadedState;

const preloadedConfig = JSON.parse( JSON.stringify( configFile ) );

for ( const element of preloadedConfig )
{
    if ( element.children )
    {
        for ( const child of element.children )
        {
            child.id = uuidv4();
        }
    }
    element.id = uuidv4();
}

if ( preloadedConfig )
{
    preloadedState = {
        treeData: preloadedConfig
    }

}

export default configureStore( {
    reducer: rootReducer,
    preloadedState,
} )
