import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
//import iconEdit from "material-ui/icons/Edit";
//import iconRemove from "material-ui/icons/Remove";

const ItemTable = () => {
    const configData = useSelector(state => state.treeData);
    
    const data = [];
    configData.map((entry) => {
        data.push([entry.id, entry.name]);
            if (entry.children)
            {
                entry.children.map(subentry => {
                    data.push([subentry.id, `⤷ ${subentry.name}`])
                })
            }
        }
    )

    const dispatch = useDispatch();
    
    const columns = [
        {
            name: "ID",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "Category name:",
            options: { filterOptions: { fullWidth: true } }
        },
        {
            name: "Last modified date:"
        },
        {
            name: "Last modified by:"
        },
        {
            name: "Comments:"
        },
        {
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <button>
                            Edit
                        </button>
                    )
                }
            }
        },
        {
            options: {
                customBodyRender: () => {
                    return (
                        <button
                        onClick={() => {dispatch("TREE/REMOVE_NODE")}}>
                            Delete
                        </button>
                    )
                }
            }
        },
    ];
    
    const options = {
        responsive: "standard",
        //textLabels: muiTextLabels(i18n),
        filter: false,
        selectableRows: 'none',
        print: false,
        download: false,
        viewColumns: false,
        customFooter: (() => {}),
        onRowClick: (rowData) => {
            configData.map(entry => {
                const rowID = rowData[0];
                if (entry.id === rowID) {
                    dispatch({ type: 'NODE/LOAD_TO_EDITOR', payload: entry })
                }
                if (entry.children)
                {
                    entry.children.map(subentry => {
                        if (subentry.id === rowID)
                        {
                            dispatch({ type: 'NODE/LOAD_TO_EDITOR', payload: subentry})
                        }
                    })
                }
            })
        }
    };

    //Item data table:
    return (
        <>
            <MUIDataTable
                title={"Administration"}
                data={data}
                columns={columns}
                options={options}
            />
        </>
    );
}

export default ItemTable;
