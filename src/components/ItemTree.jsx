import React from 'react';
import { useSelector } from 'react-redux';
import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core/styles';
import ItemTreeNode from './ItemTreeNode'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const ItemTree = () => {
    const classes = useStyles();

    const treeData = useSelector(state => state.treeData);

    const configItems = treeData.map((entry => {
        return <ItemTreeNode {...entry} />
    }))

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {configItems}
            </TreeView>
        </>
    )
}

export default ItemTree;
