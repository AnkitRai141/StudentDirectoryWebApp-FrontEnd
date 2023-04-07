import React from 'react'

// Mui Components Imported 
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow, TableHead, Typography, TextField, MenuItem, FormControl, InputLabel, Select, FormLabel } from '@mui/material'
import Button from '@mui/material/Button';
import { Pagination } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material'
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel'

import Swal from 'sweetalert2';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL

const StudentsTable = () => {

    // const { studentId } = useParams()

    // ***  useState 
    const navigate = useNavigate()
    const [students, setStudents] = useState()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(5)
    const [sortBy, setSortBy] = useState('name')
    const [sortType, setSortType] = useState("ASC")
    const [count, setCount] = useState(0)
    // ****


    // Course State 
    const [courses, setCourses] = useState([])


    // ## getStudentdata api  ##
    const getStudentsData = () => {
        const reqBody = {
            "query": search,
            "page": page,
            "limit": pageLimit,
            "sortBy": sortBy,
            "sortType": sortType
        }
        axios.post(`${BASE_URL}/students`, reqBody).then((res) => {
            // console.log(res.data)
            setStudents(res.data.data.students)
            // console.log(res.data.data.students)
            setCount(res.data.data.count[0].totalRecords)
        }).catch((err) => {
            console.log("error", err)
        })
    }
    //getStudentdata end ###

    // ### getCourse api
    const getCourse = () => {
        axios.get(`${BASE_URL}/course`)
            .then((res) => {
                setCourses(res.data.data)
                // console.log(res.data.data)
            })
    }
    // getCourse method end ###


    // ###  deletestudent api  
    const deleteStudent = (studentId) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: 'really want to delete ?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Yes, Delete.',
            cancelButtonText: 'Cancel'
        }).then(action => {
            if (action.isConfirmed) {
                axios.delete(`${BASE_URL}/student/${studentId}`).then((res) => {
                    console.log(res.data)
                    getStudentsData()
                })

                Swal.fire({
                    title: "Deleted",
                    text: "Data deleted succesfully.",
                    icon: 'info'
                })
            }
        })
    }
    // deletestudent method end ###


    useEffect(() => {
        getStudentsData()
        getCourse()
    }, [page, pageLimit, sortBy, sortType, search])

    return (
        <Grid container spacing={0}>
            {/* <div style={{ margin: "20px", width: "100%" }}> */}
            <Grid item xs={9} >
                <div >
                    <Typography variant="h4" align="center">
                        Students Table
                    </Typography>
                </div>
                <div
                    style={{
                        justifyContent: "space-around",
                        display: "flex",
                        margin: "10px"
                    }}
                >
                    <TextField
                        placeholder='Search Student...'
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            marginBottom: "3px",
                            width: "30%"
                        }}
                    />

                    {/* sortBy dropdown */}
                    <FormControl
                        fullWidth
                        style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            width: "30%"
                        }}>
                        <InputLabel >sortBy</InputLabel>
                        <Select
                            label="SortBy"
                            onChange={(e) => {
                                setSortBy(e.target.value)
                            }}>{console.log(sortBy)}
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'email'}>Email</MenuItem>
                            <MenuItem value={'_id'}>ID</MenuItem>
                        </Select>
                    </FormControl>

                    {/* sort type dropdown */}
                    <FormControl fullWidth
                        style={{ marginLeft: "10px", width: "30%" }}
                    >
                        <InputLabel>sortType</InputLabel>
                        <Select
                            label="sortType"
                            onChange={(e) => {
                                setSortType(e.target.value)
                                console.log(sortType)
                            }}>
                            <MenuItem value={"ASC"}>ASC..</MenuItem>
                            <MenuItem value={"DSC"}>DSC..</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        style={{ marginLeft: "10px", width: "30%" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            navigate('/')
                        }}
                    > <AddIcon />Add-Student</Button>

                </div>
                {/*  Table of all data */}
                <Table>
                    <colgroup>
                        <col style={{ margin: "50px", marginLeft: "15%", border: "2px solid gray", width: "8%", }} />
                        <col style={{ margin: "20px", marginLeft: "10%", border: "2px solid gray", width: "5%" }} />
                        <col style={{ margin: "50px", marginLeft: "15%", border: "2px solid gray", width: "8%" }} />
                        <col style={{ margin: "50px", marginLeft: "30%", border: "2px solid gray", width: "15%" }} />
                        <col style={{ margin: "30px", marginLeft: "30%", border: "2px solid gray", width: "20%" }} />
                    </colgroup>
                    <TableHead>
                        <TableRow style={{
                            margin: "50px",
                            marginLeft: "10%",
                            border: "3px solid black",
                            width: "100%"
                        }}>
                            {/* <TableCell>S No</TableCell> */}
                            <TableCell><Typography variant="h6">ID</Typography></TableCell>
                            <TableCell><Typography variant="h6">Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Email</Typography></TableCell>
                            <TableCell><Typography variant="h6">Number</Typography></TableCell>
                            <TableCell><Typography variant="h6">Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        students && students
                            .map((student) => (
                                (
                                    <TableBody key={student._id}>
                                        <TableRow>
                                            <TableCell>{student._id}{console.log(students)}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.mobnumber}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    style={{ margin: "12px" }}
                                                    onClick={() => {
                                                        navigate(`/student/${student._id}`)
                                                    }}
                                                ><InfoIcon /></Button>
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    style={{ margin: "12px" }}
                                                    onClick={() => {
                                                        navigate(`/editStudent/${student._id}`)
                                                    }}
                                                > <EditIcon />Edit</Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    style={{ margin: "12px" }}
                                                    onClick={() =>
                                                        // ## deleteStudent method called ## 
                                                        deleteStudent(student._id)}
                                                ><DeleteIcon /></Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            ))}
                </Table>
                {/* Table End  */}

                <Pagination
                    style={{ marginTop: "10px", marginLeft: "30%", marginRight: "10px", width: "70%" }}
                    count={Math.ceil(count / pageLimit)}
                    onChange={(e, page) => {
                        setPage(page)
                    }}
                    variant="outlined"
                    color='info'
                />
            </Grid>

            <Grid item xs={2.5}>
                <div style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    marginTop: "100px",
                    border: "2px solid gray",
                    width: "100%"
                }}>
                    {/* Filter for course  & fees */}
                    <Typography variant="h6" color='error' align="center">Filter </Typography>
                    <FormControl fullWidth>
                        <FormLabel >Course :</FormLabel>
                        {courses && courses.map((course) => {
                            return <FormControlLabel
                                sx={{ marginLeft: "10px" }}
                                value={course.courseName}
                                control={<Checkbox />}
                                label={course.courseName} />
                        })}
                    </FormControl>
                    <hr />
                    <FormControl  >
                        <FormLabel align="">Fees :-</FormLabel>
                        <TextField
                            sx={{ margin: "10px", marginLeft: "10px" }}
                            fullWidth
                            variant="outlined"
                            id="fees"
                            type="number"
                            label="Min"
                            name="fees"
                        />
                        <FormLabel align='center'>To</FormLabel>
                        <TextField
                            sx={{ margin: "10px", marginLeft: "10px" }}
                            fullWidth
                            variant="outlined"
                            id="fees"
                            type="number"
                            label="Max"
                            name="fees"
                        />
                    </FormControl>
                    <FormControl align='center' >
                        <Button align='center' variant='contained' >Apply</Button>
                    </FormControl>
                </div>
            </Grid>
            {/* </div> */}
        </Grid>
    )
}

export default StudentsTable