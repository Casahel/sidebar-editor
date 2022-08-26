import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TreeItem from '@material-ui/lab/TreeItem';

const ItemTreeNode = ( item ) => {
    const dispatch = useDispatch();

    //Item tree node:
    return (
        <div>
            <TreeItem nodeId={item.id ? item.id : 'default ID'} label={item.name} onLabelClick={() => dispatch( { type: 'LOAD_NODE_TO_EDITOR', payload: item } )}>
                {
                    item.children ? item.children.map( subItem => {
                        return <ItemTreeNode {...subItem} />
                    } ) : null}
            </TreeItem>
        </div>
    );
}

export default ItemTreeNode;
