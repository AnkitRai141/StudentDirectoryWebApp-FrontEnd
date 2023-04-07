import React, { useEffect, useState } from 'react'
// import { useState } from 'react'



// Mui Components Imported 
import { MenuItem, InputLabel, Select, FormGroup } from '@mui/material'

import { TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button } from "@mui/material";
import { Container } from '@mui/system'

//  import  formik 
import { Formik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'


const BASE_URL = process.env.REACT_APP_BASE_URL

// console.log(BASE_URL) 
// ##Initial Values For Formik Validation ##
const formInitialValues = {
    name: '',
    email: '',
    mobnumber: '',
    whatsappno: '',
    gender: '',
    dob: '',
    address: '',
    workexprience: '',
    company: '',
    courseName:''
}


// ## Fromik Validation Schema as fromSchema  ##
const formSchema = Yup.object({
    name: Yup.string()
        .required("Name  Required !"),

    email: Yup.string()
        .email('Invalid email address')
        .required("Email  Required !"),

    mobnumber: Yup.number()
        .required("Mobile number  Required !"),

    whatsappno: Yup.number()
        .required("Whatsapp number  Required !"),

    dob: Yup.number()
        .required("Date of birth Required"),

    // gender :Yup.string().required("Gender  Required !"),
    address: Yup.string()
        .required("Addres  Required !"),

    workexprience: Yup.string()
        .required("Work experience  Required !"),

    company: Yup.string()
        .required(" Company name Required !"),
});

const StudentForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [ courses , setCourses ] = useState()
    const navigate = useNavigate()



// ## getCourse method to get course data from api 
const  getCourse = () =>{
    axios.get(`${BASE_URL}/course`)
    .then((res)=>{
        setCourses(res.data.data)
        // console.log(res.data.data)
    })
}


useEffect(()=>{
    getCourse()
},[])


    //  ##  getPost Method Created for submit student data ##
    const getPost = (data) => {
        axios.post(`${BASE_URL}/student`, data)
            .then((res) => {
                const { status, msg } = res.data
                console.log(res.data)
                console.log(status)
                console.log(data)
                if (status === "OK") {
                    console.log("data submited")
                    toast.success(msg)
                    navigate('/studentsTable')
                } else {

                    toast.error(msg)

                }

            }).catch((err) => {
                console.log("error is in ", err)
                toast.error("Please Check network")
            })
    }

    return (

        <div>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />

            <Formik
                initialValues={formInitialValues}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    getPost(values)
                    // console.log("Form Values", values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (

                    <Container
                        sx={{
                            margin: "10px",
                            marginLeft: "25%",
                            border: "2px solid gray",
                            width: "50%"
                        }} >
                        <Typography
                            variant='h6'
                            align='center'
                            color="primary"
                        >Add Student Form</Typography>
                        <form
                            sx={{
                                margin: "50px",
                                marginLeft: "25%"
                            }}>

                            <TextField
                                sx={{ margin: "10px" }}
                                fullWidth
                                variant="outlined"
                                id="name"
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                type="email"
                                id="email"
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="mobnumber"
                                type="string"
                                label="Mobile Number"
                                name="mobnumber"
                                value={values.mobnumber}
                                onChange={handleChange}
                            // error={touched.mobnumber && Boolean(errors.mobnumber)}
                            // helperText={touched.mobnumber && errors.mobnumber}
                            />

                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="whatsappno"
                                type="string"
                                label="Whatsapp Number"
                                name="whatsappno"
                                onChange={handleChange}
                                value={values.whatsappno}
                                error={touched.whatsappNo && Boolean(errors.whatsappNo)}
                                helperText={touched.whatsappNo && errors.whatsappNo}
                            />

                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="dob"
                                type="text"
                                label="Date Of Birth"
                                name="dob"
                                value={values.dob}
                                onChange={handleChange}
                            // error={touched.whatsappNo && Boolean(errors.whatsappNo)}
                            // helperText={touched.whatsappNo && errors.whatsappNo}
                            />

                            <br />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    sx={{ margin: "10px", }}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange} >

                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <br />
                            <FormControl fullWidth sx={{ margin: "10px" }} >
                                <InputLabel >Course :</InputLabel>
                                <Select 
                                id='courseName'
                                name="courseName"
                                value={values.courseName}
                                onChange={handleChange}
                                >
                                    { courses && courses.map((course)=>{
                                        return <MenuItem  value={course.courseName} key={course._id}>{course.courseName} </MenuItem>
                                    })}
                                    
                                </Select>
                            </FormControl>
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="fees"
                                type="number"
                                label="Fees"
                                name="fees"
                                value={values.fees}
                                onChange={handleChange}
                            />
                            <br/>
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="address"
                                type="text"
                                label="Address"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                error={touched.address && Boolean(errors.address)}
                                helperText={touched.address && errors.address}
                            />
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="workexprience"
                                type="text"
                                label="Working Experience"
                                name="workexprience"
                                value={values.workexprience}
                                onChange={handleChange}
                                error={touched.workexprience && Boolean(errors.workexprience)}
                                helperText={touched.workexprience && errors.workexprience}
                            />
                            <br />
                            <TextField
                                sx={{ margin: "10px", }}
                                fullWidth
                                variant="outlined"
                                id="company"
                                type="text"
                                label="Company"
                                name="company"
                                value={values.company}
                                onChange={handleChange}
                                error={touched.company && Boolean(errors.company)}
                                helperText={touched.company && errors.company}
                            />
                            <br />
                            <Button
                                sx={{ margin: "10px", }}
                                variant="contained"
                                fullWidth
                                type="submit"
                                // ## getPost Method Call ##
                                onClick={() => getPost(values)}
                            >
                                Submit
                            </Button>
                        </form>
                        <br />
                    </Container>
                )}
            </Formik>
        </div>
    )
}

export default StudentForm