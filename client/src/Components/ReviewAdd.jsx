import axios from 'axios';
import { 
    Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    Rating, Snackbar, TextField, Alert 
} from '@mui/material';
import { useState, useRef } from 'react'

export default function ReviewAdd({ _id, open, setOpen }){

    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "warning" });
    const [rating, setRating] = useState(0);
    const comment = useRef(null);

    const handleReview = () => {
        if(rating === null || rating === 0)
            return setSnackCont({ open: true, msg: "Please Rate the book before posting review", severity: "error" });
        

        axios.post('/review/addItem', { id: _id , rating, comment: comment.current.value })
            .then(data => {
                setSnackCont({ open: true, msg: "Review Posted", severity: "success" });
                setOpen(false);
            })
            .catch(err => {
                setSnackCont({ open: true, msg: "Error Happended While trying to post review please try again later", severity: "error" });
                setOpen(false);
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }

    return (
        <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogContent>
                <Rating
                    sx={{ p: "2% 0 5%" }}
                    size="large" 
                    value={rating} 
                    onChange={(event, newVal) => setRating(newVal)}
                    precision={0.5}
                />
                <TextField 
                    autoFocus
                    multiline
                    rows={5}
                    inputRef={comment}
                    placeholder="Type Your Review Here (Atmost 250 Characters Long)."
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleReview}>Post</Button>
            </DialogActions>
        </Dialog>

            <Snackbar
                open={snackCont.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackCont.msg}
                sx={{ width: { sm: "45vw" } }}
            >
                <Alert onClose={handleClose} severity={snackCont.severity} sx={{ width: '100%' }}>
                    {snackCont.msg}
                </Alert>
            </Snackbar>
        </>
    )
}