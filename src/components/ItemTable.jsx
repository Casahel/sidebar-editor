import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';

const ItemTable = () => {
    const configData = useSelector(state => state.treeData);

    const dispatch = useDispatch();
    
    const columns = [
        {
            name: "ID",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "Name",
            options: { filterOptions: { fullWidth: true } }
        },
    ];
    
    const options = {
        responsive: "standard",
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
    
    const data = [];

    configData.map((entry => {
        data.push([entry.id, entry.name]);
        if (entry.children) {
            entry.children.map(subentry => {
                data.push([subentry.id, subentry.name])
            })
        }
    }))

    //Item data table:
    return (
        <>
            <MUIDataTable
                title={"Sidebar categories"} data={data}
                columns={columns}
                options={options}
            />
        </>
    );
}

export default ItemTable;
