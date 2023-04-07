import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


// Mui Components Imported 
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const BASE_URL = process.env.REACT_APP_BASE_URL

const SingleStudent = () => {


    const navigate = useNavigate()
    const { studentId } = useParams()
    const [student, setStudent] = useState([])

    // getSingleStudentData api ##
    const getSingleStudentData = () => {
        axios.get(`${BASE_URL}/student/${studentId}`).then((res) => {
            // console.log(res.data)
            setStudent(res.data.data)
        }).catch((err) => {
            console.log("Error")
        })
    }
    // getSingleStudentData end ##

    useEffect(() => {
        getSingleStudentData();
    }, [])

    return (
        <div style={{ background: "#1E90FF" }}>
            <Card sx={{ maxWidth: 500 }}
                style={{
                    margin: "20px",
                    marginLeft: "30%",
                    marginTop: "10%"
                }}>
                <CardContent
                    align='center'>
                    <Typography
                        color="primary"
                        variant="h6"
                        align='center'
                        sx={{ fontWeight: 'bold' }}>
                        Student Details
                    </Typography>
                    <Typography
                        variant="h6"
                        color="info"
                        sx={{ fontWeight: 'bold' }}>
                        Name :- {student.name}
                    </Typography>
                    <Typography variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Email :- {student.email}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Mobile-No :- {student.mobnumber}
                    </Typography>
                    <Typography
                        variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Whatsapp-No :- {student.whatsappno}</Typography>
                    <Typography variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Gender :- {student.gender}</Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Date Of Birth :- {student.dob}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Course Name  :- {student.courseName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Fees :- {student.fees}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Work-Experience :-  {student.workexprience}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'bold' }}>
                        Company :- {student.company}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth

                        variant='contained'
                        color='primary'
                        onClick={() => {
                            navigate('/studentsTable')
                        }}
                    >Back</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default SingleStudent