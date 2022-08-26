import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';

// MaterialUI config
const useStyles = makeStyles( ( theme ) => ( {
    root: {
        width: '50vw',
        '& > *': {
            margin: theme.spacing( 1 ),
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem( 15 ),
        fontWeight: theme.typography.fontWeightRegular,
    },
} ) );

export default function ItemEditor () {

    // MUI config continues - base styling:
    const classes = useStyles();

    //Dropdown:
    const options = [
        '(none)',
        'isOrganizationManager',
        'hasOrganization',
    ];

    const [anchorEl, setAnchorEl] = React.useState( null );
    const [selectedId, setSelectedId] = React.useState( 0 );

    const handleClickTextField = ( event ) => {
        setAnchorEl( event.currentTarget );
    }

    const handleMenuItemClick = ( event, id ) => {
        setSelectedId( id );
        setAnchorEl( null );
    }

    const handleClose = () => {
        setAnchorEl( null );
    }
    // MUI handling ends here

    const item = useSelector( state => state.selectedNode )
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: item.id,
                    name: item.name,
                    nameFr: '',
                    datatut: item.datatut,
                    icons: item.icon,
                    path: item.path,
                    permissions: item.functionPermissions,
                    env: item.env,
                    auth: item.auth,
                    noAuth: item.noauth,
                }}
                onSubmit={async ( values ) => {
                    dispatch( { type: 'TREE_UPDATE_NODE', payload: values } );
                }
                }
            >
                {props => (
                    <form className={classes.root}
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
                            helperText="Enter category name in English"
                        />
                        <TextField
                            name="nameFr"
                            variant="outlined"
                            label="Name (FR):"
                            value=""
                            helperText="Enter category name in French"
                        />
                        <TextField
                            name="datatut"
                            variant="outlined"
                            label="Datatut:"
                            value={props.values.datatut || ''}
                            helperText=""
                        />
                        <TextField
                            name="icons"
                            variant="outlined"
                            label="Icon:"
                            value={props.values.icon || ''}
                            helperText="Click to search for icons..."
                        />
                        <TextField
                            name="path"
                            variant="outlined"
                            label="Path:"
                            value={props.values.path || ''}
                            helperText=""
                        />
                        <TextField
                            name="auth"
                            variant="outlined"
                            label="Auth:"
                            value={props.values.auth || ''}
                            helperText=""
                        />
                        <TextField
                            name="permissions"
                            variant="outlined"
                            label="Custom Permission Functions:"
                            helperText="Click to select custom Permission Functions..."
                            value={options[selectedId]}
                            InputProps={{
                                readOnly: true,
                            }}
                            onClick={handleClickTextField}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean( anchorEl )}
                            onClose={handleClose}
                        >
                            {options.map( ( option, id ) => (
                                <MenuItem
                                    key={option}
                                    selected={id === selectedId}
                                    onClick={( event ) => handleMenuItemClick( event, id )}
                                >
                                    {option}
                                </MenuItem>
                            ) )}
                        </Menu>
                        <TextField
                            name="env"
                            variant="outlined"
                            label="Env:"
                            value={props.values.env || ''}
                            helperText=""
                        />
                        <TextField
                            name="noauth"
                            variant="outlined"
                            label="NoAuth"
                            value={props.values.noAuth || ''}
                            helperText=""
                        />
                        <button name="change" type="submit">Update item</button>
                        <button name="add" type="submit">Confirm changes</button>

                    </form>
                )}
            </Formik>

        </div >
    );
}

// JSON data structure:
// id: item.id,
// name: item.name,
// nameFr: '',
// datatut: item.datatut,
// icons: item.icon,
// path: item.path,
// permissions: item.functionPermissions,
// env: item.env,
// auth: item.auth,
// noAuth: item.noauth,
