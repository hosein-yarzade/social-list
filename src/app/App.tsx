import {useEffect, useRef, useState} from 'react'
import {Box, Button, Collapse, CssBaseline, TextField, ThemeProvider} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import ButtonToggleThem from "../components/ButtonToggleThem";
import {useThemeContext} from "../theme/ThemeContextProviderApp";
import {listSocial} from '../helper/constans'
import './App.css'
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import SocialItemView from "../components/socialItemsView/socialItemView";
import useFetchSocial from "../hooks/UseFetchSocial";

import {labelText} from "../helper/fuctionHelper";
import DialogModal from "../components/dialogModal/dialogModal";

interface IFormInput {
    id: string
    social_id: string
    social_link: string

}
function App() {
    const {theme} = useThemeContext();
    const {data, loading, getAPIData} = useFetchSocial()
    const [collapseState, setCollapseState] = useState<boolean>(true);
    const [updateState, setUpdateState] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const itemSelect = useRef({});
    const itemEdit = useRef<string>("");
    const [enterInputValue, setEnterInputValue] = useState<string>("");
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        itemSelect.current = {}
    };
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            id: "",
            social_id: "",
            social_link: "",
        },
    })
    useEffect(() => {
        getAPIData("get")
    }, [])
    useEffect(() => {
        setEnterInputValue("")
    }, [openDialog])
    // submit and update
    const onSubmit: SubmitHandler<IFormInput> = (dataForm) => {
        console.log(">>>", dataForm)
        const result = data.filter((word) => word.id === dataForm.id);

        if (!updateState) {
            if (result.length == 0) {
                getAPIData("post", dataForm)
                toggleCollapse()
                reset({
                    id: "",
                    social_id: "",
                    social_link: "",
                })
                itemEdit.current = "";
            } else return
        } else {
            getAPIData("put", dataForm)
            toggleCollapse()
            setUpdateState(false)
            reset({
                id: "",
                social_id: "",
                social_link: "",
            })
        }

    }
    const deleteSocialItem = (data:string) => {
        itemSelect.current = data
        handleClickOpenDialog()
        // getAPIData("delete", data.id)
    }
    const deleteSocialApi = () => {
        console.log(itemSelect.current);
        if (enterInputValue === "تایید") {
            getAPIData("delete", itemSelect.current.id)
            handleCloseDialog()
            itemSelect.current = {}
        } else {
            return
        }
    }
    const cancelAction = () => {
        reset({
            id: "",
            social_id: "",
            social_link: "",
        })
        itemEdit.current = "";
        setCollapseState(!collapseState)
        if (updateState) {
            setUpdateState(false)
        } else {
            return
        }
    }
    const toggleCollapse = () => {
        setCollapseState(!collapseState)

    }
    // when click edit item
    const toggleUpdateState = (data:object) => {
        reset({
            id: data.id,
            social_id: data.social_id,
            social_link: data.social_link,
        },);
        itemEdit.current = data.id
        setUpdateState(true)
        if (collapseState) {
            return
        } else {
            setCollapseState(true)
        }

    }
    const handleChangeEnterInput = (e:any) => {
        setEnterInputValue(e.target.value)

    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="wrapper-app" dir="rtl">
                <div className="HeadPage">
                    <h2>حساب کاربری</h2>
                    <ButtonToggleThem/>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'right',
                        bgcolor: 'view',
                        color: 'text.secondary',
                        boxShadow: 10
                    }}
                    className="form-Wrapper">
                    <p style={{color: 'text.secondary'}}>مسیر ارتباطی</p>
                    <Button
                        style={{marginBottom: "20px", width: 180,fontFamily:'Noto Sans Arabic'}}
                        color="warning"
                        startIcon={<AddIcon/>}
                        onClick={() => toggleCollapse()}
                    >
                        {updateState ? "ویرایش مسیر ارتباطی" : "افزودن مسیر ارتباطی"}
                    </Button>
                    <Collapse in={collapseState} sx={{
                        bgcolor: 'innerView',
                        color: 'text.primary',
                    }} className="form-InnerWrapper"
                    >
                        {updateState ? " ویرایش مسیر ارتباطی " + labelText(itemEdit.current) : "افزودن مسیر ارتباطی"}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-view">
                                <FormControl>
                                    <InputLabel id="idLabel">نوع *</InputLabel>
                                    <Controller
                                        name="id"
                                        variant="outlined"
                                        control={control}
                                        rules={{required: "req"}}
                                        render={({field}) => (
                                            <>
                                                <Select

                                                    sx={{
                                                        width: 350,
                                                        border: 'text.secondary',
                                                        fontFamily:'Noto Sans Arabic'
                                                    }}
                                                    labelId="idLabel"
                                                    label="نوع *"
                                                    {...field} >
                                                    {listSocial.map((person) => (
                                                        <MenuItem sx={{
                                                            fontFamily:'Noto Sans Arabic'
                                                        }} key={person.id} value={person.id}>
                                                            {person.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <Controller

                                    name="social_link"
                                    control={control}
                                    render={({field}) => <TextField
                                        sx={{
                                            width: 350,
                                            border: 'text.secondary',

                                        }}
                                        inputProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                                        InputLabelProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                                        id="social_link" label="لینک"
                                        variant="outlined"
                                        {...field}/>}
                                />
                                <Controller
                                    name="social_id"
                                    control={control}
                                    render={({field}) => <TextField
                                        sx={{
                                            width: 300,
                                            border: 'text.secondary',
                                        }}
                                        inputProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                                        InputLabelProps={{style: {fontFamily:'Noto Sans Arabic'}}}
                                        id="social_id" label="آی دی (ID)"
                                        variant="outlined" {...field}/>}
                                />
                            </div>
                            <div className="button-view">
                                <Button sx={{
                                    borderRadius: 2,
                                    marginRight: 2
                                }} variant="outlined" color="secondary"
                                        onClick={cancelAction}>
                                    <span style={{color: 'text.primary' ,fontFamily:'Noto Sans Arabic'}}>انصراف </span>
                                </Button>
                                <Button sx={{
                                    borderRadius: 2,
                                    fontFamily:'Noto Sans Arabic'
                                }} variant="contained" color="warning" type="submit">
                                    {updateState ? "ویرایش مسیر ارتباطی" : "ثبت مسیر ارتباطی"}
                                </Button>
                            </div>
                        </form>
                    </Collapse>
                    <div className="socialItemView">
                        {loading ? <div>در حال بازیابی...</div>
                            :
                            data.map((data) => (
                                // console.log(data)
                                <SocialItemView
                                    deleteSocialItem={(data:any) => deleteSocialItem(data)}
                                    toggleUpdateState={(data:any) => toggleUpdateState(data)}
                                    dataList={data}/>
                            ))
                        }
                    </div>
                </Box>
                <DialogModal
                    openDialog={openDialog}
                    handleCloseDialog={handleCloseDialog}
                    enterInputValue={enterInputValue}
                    handleChangeEnterInput={handleChangeEnterInput}
                    deleteSocialApi={deleteSocialApi}
                    itemSelect={itemSelect}

                />

            </div>
        </ThemeProvider>
    )
}

export default App
