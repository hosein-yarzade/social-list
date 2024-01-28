import {Button, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {labelText} from "../../helper/fuctionHelper";

const DialogModal = (props:any) => {
    const {openDialog, handleCloseDialog, enterInputValue,handleChangeEnterInput,deleteSocialApi,itemSelect} = props
    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle  sx={{bgcolor: 'view',width:500,}}>آیا از تصمیم خود مطمئن هستید؟</DialogTitle>
            <DialogContent sx={{bgcolor: 'view'}}>
                <DialogContentText>
                    <span>{"برای حذف مسیر ارتباطی " + labelText(itemSelect.current.id)  + " لطفا تایید را بنویسید. "}</span>
                </DialogContentText>
                <TextField
                    style={{marginTop:15}}
                    inputProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                    InputLabelProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                    autoFocus
                    required
                    id="name"
                    name="text"
                    placeholder="تایید"
                    type="text"
                    fullWidth
                    value={enterInputValue}
                    onChange={(event) => handleChangeEnterInput(event)}
                    // variant="standard"
                />
            </DialogContent>
            <DialogActions sx={{bgcolor: 'view'}}>
                <Button style={{fontFamily:'Noto Sans Arabic'}} onClick={handleCloseDialog} color="warning">انصراف</Button>
                <Button style={{fontFamily:'Noto Sans Arabic'}} color="error" onClick={deleteSocialApi}>حذف</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogModal;
