import React from 'react';
import { useSelector } from 'react-redux';
import ItemTree from './components/ItemTree';
import ItemEditor from './components/ItemEditor';

const App = () => {
    return (
        <>
            <ItemTree/>
            <ItemEditor />
        </>
    )
};

export default App;
