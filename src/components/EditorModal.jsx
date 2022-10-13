import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import ItemEditor from "./ItemEditor";

const getModalStyle = () => {
    const top = 10;
    const left = 10;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `{translate(-${top}%, -${left}%})`,
    };
}

const useStyles = makeStyles( ( theme ) => ( {
    paper: {
        position: 'fixed',
        width: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing( 2, 4, 3 ),
    },
} ) )

export default function EditorModal () {
    
    const classes = useStyles();
    const [modalStyle] = React.useState( getModalStyle );
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit menu item</h2>
            <p id="simple-modal-description">
                [placeholder for a description should we need some]
          </p>
            <ItemEditor />
        </div>
    );
    
    return (
        <div>
            <Button onClick={handleOpen}>Add item</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Add-menu-element"
                aria-describedby="Add-a-new-item-to-sidebar-menu">
                {body}
            </Modal>
        </div>
    )
};
