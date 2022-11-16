import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//---General MUI Configuration---
const useStyles = makeStyles((theme) => ({
    root: {
        width: '50vw',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        position: 'fixed',
        width: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const getModalStyle = () => {
    const top = 10;
    const left = 10;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `{translate(-${top}%, -${left}%})`,
    };
}

const Editor = ({editorData, handleDataUpdate, clearRowData, ...props }) => {

    //---Component-specific MUI Configuration---
    const classes = useStyles();

    //Below for Modal. Modal visibility depends on the editorData prop. If any data is
    //received via editorData -> modal shows up. That's why the editorData must
    //be cleared on modal's closure (and that's why there's no need for a
    //separate "handleOpen" method) 
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        clearRowData();
        setOpen(false)
    };

    //for Dropdown:
    const options = [
        '(none)',
        'isOrganizationManager',
        'hasOrganization',
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const handleClickTextField = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuItemClick = (event, id) => {
        setSelectedId(id);
        setAnchorEl(null);
    }
    //---MUI configuration ends here---

    return (
        <>
            <Modal
                open={editorData ? true : false}
                onClose={handleClose}
                aria-labelledby="Add-menu-element"
                aria-describedby="Add-a-new-item-to-sidebar-menu">
                <div style={modalStyle} className={classes.paper}>
                    <h1>Edit menu item</h1>
                    <div className={classes.root}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={editorData}
                            onSubmit={values => {
                                handleDataUpdate(values);
                                handleClose()
                            }}
                        >
                            {props => (
                                <Form className={classes.root}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={props.handleSubmit}
                                    onChange={props.handleChange}
                                >
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        label="Name (EN):"
                                        value={props.values.name || ''}
                                        onChange={(e) => {props.setFieldValue('name', e.target.value)}}
                                        helperText="Enter category name in English"
                                    />
                                    <TextField
                                        name="nameFr"
                                        variant="outlined"
                                        label="Name (FR):"
                                        value=""
                                        onChange={(e) => {props.setFieldValue('nameFr', e.target.value)}}
                                        helperText="Enter category name in French"
                                    />
                                    <TextField
                                        name="datatut"
                                        variant="outlined"
                                        label="Datatut:"
                                        value={props.values.datatut || ''}
                                        onChange={(e) => {props.setFieldValue('datatut', e.target.value)}}
                                        helperText=""
                                    />
                                    <TextField
                                        name="icon"
                                        variant="outlined"
                                        label="Icon:"
                                        value={props.values.icon || ''}
                                        onChange={(e) => {props.setFieldValue('icon', e.target.value)}}
                                        helperText="Click to search for icons..."
                                    />
                                    <TextField
                                        name="path"
                                        variant="outlined"
                                        label="Path:"
                                        value={props.values.path || ''}
                                        onChange={(e) => {props.setFieldValue('path', e.target.value)}}
                                        helperText=""
                                    />
                                    <TextField
                                        name="auth"
                                        variant="outlined"
                                        label="Auth:"
                                        value={props.values.auth || ''}
                                        onChange={(e) => {props.setFieldValue('auth', e.target.value)}}
                                        helperText=""
                                    />
                                    <TextField
                                        name="functionPermissions"
                                        variant="outlined"
                                        label="Custom Permission Functions:"
                                        helperText="Click to select custom Permission Functions..."
                                        value={options[selectedId]}
                                        onChange={(e) => {props.setFieldValue('functionPermissions', e.target.value)}}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        onClick={handleClickTextField}
                                    />
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, id) => (
                                            <MenuItem
                                                key={option}
                                                selected={id === selectedId}
                                                onClick={(event) => handleMenuItemClick(event, id)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <TextField
                                        name="env"
                                        variant="outlined"
                                        label="Env:"
                                        value={props.values.env || ''}
                                        onChange={(e) => {props.setValue('env', e.target.value)}}
                                        helperText=""
                                    />
                                    <TextField
                                        name="noauth"
                                        variant="outlined"
                                        label="NoAuth"
                                        value={props.values.noAuth || ''}
                                        onChange={(e) => {props.setValue('noauth', e.target.value)}}
                                        helperText=""
                                    />
                                    <button type="submit">Save item</button>
                                    <button name="remove" type="button" onClick={handleClose}>Discard changes</button>
                                </Form>
                            )}
                        </Formik>
                    </div >
                </div>
            </Modal>
        </>
    )
};

export default Editor;
