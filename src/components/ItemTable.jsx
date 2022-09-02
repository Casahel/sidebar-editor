import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';


const columns = [
    { name: "Name", options: { filterOptions: { fullWidth: true } } },
];

const options = {
    responsive: "standard",
};
  
const data = [];

const ItemTable = () => {
    const dispatch = useDispatch();
    const configData = useSelector(state => state.treeData);

    configData.map((entry => {
        data.push([entry.name]);
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
