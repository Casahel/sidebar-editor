import React from 'react';
import { useSelector } from 'react-redux';
import ItemTable from './components/ItemTable'
import EditorModal from './components/EditorModal';

const App = () => {
    return (
        <>
            <EditorModal />
                <ItemTable />
        </>
    )
};

export default App;
