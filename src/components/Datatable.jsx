import React, {memo, useCallback, useReducer, useState} from 'react';
import MUIDataTable from 'mui-datatables';
import Editor from './Editor';
import tableData from './Adapter';
import { ACTIONS, reducer } from './Actions';
import { v4 as uuidv4 } from 'uuid';
import emptyObject from './emptyObject';

const Datatable = memo(() => {

    //Handles a single sidebar category editing:
    const [rowData, setRowData] = useState('');
    const sendRowToEditor = useCallback(
        (inputData) => {
            if (!inputData.id)
            {
                inputData.id = uuidv4();
            }
            setRowData(inputData);
            console.log(inputData);
        }, [setRowData]
    )

    //The below is to be invoked by the Editor after category edit has been finished
    const clearRowData = () => {
        setRowData(null);
    }

    //Handles the global state editing:
    const [tdata, dispatch] = useReducer(reducer, tableData);

    const handleDataUpdate = (newData) => {
        dispatch({ type: ACTIONS.CATEGORY_MODIFY, payload: newData })
    }

    //MUI Datatable config:
    const options = {
        responsive: "standard",
        //textLabels: muiTextLabels(i18n),
        filter: false,
        selectableRows: 'none',
        print: false,
        download: false,
        viewColumns: false,
        customFooter: (() => { }),
    }

    const columns = [
        {
            name: "id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "name",
            label: "Category name:",
            options: { filterOptions: { fullWidth: true } }
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                sort: false,
                customBodyRender: (value, dataIndex, rowIndex) => {
                    return (
                        <>
                            <button onClick={() => {
                                let selection = tdata.find(element => element.id === dataIndex.rowData[0])
                                sendRowToEditor(selection);
                            }}>Mod</button>

                            <button type="button"
                            onClick={() => {
                                let selection = tdata.find(element => element.id === dataIndex.rowData[0])
                                dispatch({ type: ACTIONS.CATEGORY_DELETE, payload: selection });
                            }}>Del</button>
                        </>)
                }
            }
        },
    ];

    return (
        <>
            <MUIDataTable
                title={''}
                data={tdata}
                columns={columns}
                options={options}
            />
            <Editor editorData={rowData} handleDataUpdate={handleDataUpdate} clearRowData={clearRowData} />
            <button type="button" onClick={() => sendRowToEditor(emptyObject)}>add new category</button>
            <button type="button">save changes</button>
            <button type="button" onClick={() => dispatch({ type: ACTIONS.RESET_ALL })}>reset</button>
        </>
    )
});

export default Datatable;
