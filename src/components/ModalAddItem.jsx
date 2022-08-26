import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import EditorItem from "./EditorItem";

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing( 2, 4, 3 ),
    },
} ) )

const EditorModalAddItem = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState( getModalStyle );
    const [modalOpen, setModalOpen] = React.useState( false );
    
    const handleClose = () => {
        setModalOpen( false );
    }

    //do EditorItem dodać prop, który sprawi, że komponent będzie wiedział, że
    //jest otwarty jako modal (czyli ma za zadanie dodać kategorię do menu) -
    //czy też jako zwykły item wyświetlający zawartość menu?
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2>Add menu item:</h2>
            <EditorItem role={'add menu item'} />
        </div>
    )

    return (
        <div>
            <Modal open={modalOpen} onClose={handleClose}
                aria-labelledby="Add-menu-element"
                aria-describedby="Add-a-new-item-to-sidebar-menu">
                {body}
            </Modal>
        </div>
    )
};

export default EditorModalAddItem;
