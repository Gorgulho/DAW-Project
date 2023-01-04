import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {DialogContentText, Slide} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props}  />;
});

export default function DeleteDialogMenu(props) {

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            {props.menu.map(me =>

            <DialogContent key={me._id}>
                <DialogTitle>{"Do you really want to delete this recipe?"}</DialogTitle>
                <DialogContentText id="alert-dialog-slide-description">
                    The menu at {me.date} will be marked has done and removed from the data base.
                    Do you want to continue?
                </DialogContentText>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleDelete}>Delete</Button>
                </DialogActions>
            </DialogContent>

                )}
        </Dialog>
    )
}