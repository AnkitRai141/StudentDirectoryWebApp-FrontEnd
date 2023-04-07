import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Mui Components Imported 
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button } from "@mui/material";
import { Container } from '@mui/system'

// yup package import
import { Formik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL



// Schema for validation
const formSchema = Yup.object({
    name: Yup.string().required("Name  Required !"),
    email: Yup.string().email('Invalid email address').required("Email  Required !"),
    mobnumber: Yup.number().required("Mobile number  Required !"),
    whatsappNo: Yup.number().required("Whatsapp number  Required !"),
    dob: Yup.number().required("Date of birth Required"),
    // gender :Yup.string().required("Gender  Required !"),
    address: Yup.string().required("Addres  Required !"),
    workExprience: Yup.string().required("Work experience  Required !"),
    company: Yup.string().required(" Company name Required !"),
});

const EditStudent = () => {

    // useState 
    const [cancelEdit, setCanelEdit] = useState(null)
    const { studentId } = useParams()
    const navigate = useNavigate()
    const [editData, setEditData] = useState()
    const [update, setUpdate] = useState({
        name: '',
        email: '',
        mobnumber: '',
        whatsappno: '',
        gender: '',
        dob: '',
        address: '',
        workexprience: '',
        company: ''
    })
    // console.log(update)

    // getUpdatestudent update api 
    const getUpdatestudent = async () => {
        const resData = axios.get(`${BASE_URL}/student/${studentId}`)
        console.log(resData.data)
        setUpdate(resData.data)
    }


    // editStudent api 
    const editStudent = () => {
        axios.put(`${BASE_URL}/students/${studentId}`, update).then((res) => {
            console.log(res.data)
            setUpdate(res.data)
        }).catch((err) => {
            console.log("error")
        })
    }

    const handleInput = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value })
    }

    const handleCancelEdit = () => {
        setCanelEdit(!cancelEdit);
        setUpdate(!update)
        navigate("/studentsTable")
    }

    return (
        <div>
            <Formik
                // intialvalues for validation
                initialValues={{
                    name: '',
                    email: '',
                    mobNumber: '',
                    whatsappNo: '',
                    gender: '',
                    dob: '',
                    address: '',
                    workExprience: '',
                    company: ''
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {

                    console.log("Form Values", values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleInput,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (

                    <Container
                        sx={{
                            margin: "50px",
                            marginLeft: "25%",
                            border: "2px solid gray",
                            width: "50%"
                        }} >
                        <Typography
                            variant='h6'
                            align='center'
                            color="success"
                        >
                            Edit Student Form
                        </Typography>
                        <form
                            sx={{
                                margin: "50px",
                                marginLeft: "25%"
                            }}>

                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="name"
                                label="Name"
                                name="name"
                                onChange={handleChange}
                                value={update.name}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />{console.log(update.name)}
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                type="email"
                                id="email"
                                label="Email"
                                name="email"
                                value={update.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            >
                            </TextField>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="mobnum"
                                type="number"
                                label="Mobile Number"
                                name="mobnum"
                                value={update.mobnum}
                                onChange={handleChange}
                                error={touched.mobNumber && Boolean(errors.mobNumber)}
                                helperText={touched.mobNumber && errors.mobNumber}
                            >
                            </TextField>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="whatsappnum"
                                type="number"
                                label="Whatsapp Number"
                                name="whatsappnnum"
                                onChange={handleChange}
                                value={update.whatsappnnum}
                                error={touched.whatsappNo && Boolean(errors.whatsappNo)}
                                helperText={touched.whatsappNo && errors.whatsappNo}
                            >
                            </TextField>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="dob"
                                type="text"
                                label="Date Of Birth"
                                name="dob"
                                value={update.dob}
                                onChange={handleChange}
                            // error={touched.whatsappNo && Boolean(errors.whatsappNo)}
                            // helperText={touched.whatsappNo && errors.whatsappNo}
                            >
                            </TextField>
                            <br />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    sx={{ margin: "10px", }}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={update.gender}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="address"
                                type="text"
                                label="Address"
                                name="address"
                                value={update.address}
                                onChange={handleChange}
                                error={touched.address && Boolean(errors.address)}
                                helperText={touched.address && errors.address}
                            >
                            </TextField>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="workExperience"
                                type="text"
                                label="Working Experience"
                                name="workexperience"
                                value={update.workexprience}
                                onChange={handleChange}
                                error={touched.workExprience && Boolean(errors.workExprience)}
                                helperText={touched.workExprience && errors.workExprience}
                            >
                            </TextField>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="company"
                                type="text"
                                label="Company"
                                name="company"
                                value={update.company}
                                onChange={handleChange}
                                error={touched.company && Boolean(errors.company)}
                                helperText={touched.company && errors.company}
                            ></TextField>
                            <br />
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <Button
                                        sx={{ marginLeft: "50px", width: "50%" }}
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        color="info"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            getUpdatestudent();
                                            navigate('/studentsTable')
                                            // editstudentData()
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sx={{ justifyContent: "space-between" }}
                                >
                                    <Button
                                        sx={{ marginLeft: "60px", width: "50%" }}
                                        color="error"
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        onClick={() => {
                                            handleCancelEdit()
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <br />
                    </Container>
                )}
            </Formik>
        </div>
    )
}

export default EditStudent