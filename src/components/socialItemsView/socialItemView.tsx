import {Box, Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './socialItemView.css'
import {listSocial} from "../../helper/constans";
import SocialLabel from "../socialLabel/sicialLebel";

const SocialItemView = (props:any) => {
    const {dataList, toggleUpdateState, deleteSocialItem} = props
    return (
        <Box sx={{bgcolor: 'innerView', color: 'text.primary',}} className="socialItemView-container">
            <div>
                {/*<span className="socialItem-icon">*/}
                    {/*{dataList.id }*/}
                    {listSocial.map((word) => (
                        word.id === dataList.id ? (
                            <>
                                <span>{SocialLabel(dataList.id)} </span>
                                <span> {word.label} </span>
                            </>
                        ) : null
                    ))}
                    {/*<p>sss</p>*/}
                {/*</span>*/}
                <span className="socialItem-title">
                    آی دی(ID):
                </span>
                <span className="socialItem-text">
                  {dataList.social_id}
                </span>
                <span className="socialItem-title">
                    لینک:
                </span>
                <span className="socialItem-textLink">
                  {dataList.social_link}
                </span>

            </div>
            <div>
                <Button style={{fontFamily:'Noto Sans Arabic'}} fontSize="small" color="warning" startIcon={<EditIcon/>} onClick={() => {
                    toggleUpdateState(dataList)
                }}>
                    ویرایش
                </Button>
                <Button style={{fontFamily:'Noto Sans Arabic'}} fontSize="small" color="error" startIcon={<DeleteIcon/>} onClick={() => {
                    deleteSocialItem(dataList)
                }}>
                    حذف
                </Button>
            </div>
        </Box>
    );
};

export default SocialItemView;
