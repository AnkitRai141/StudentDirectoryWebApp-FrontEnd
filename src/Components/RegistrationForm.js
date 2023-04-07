import React, { useState } from 'react'

// mui component import
import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const RegistrationForm = () => {


    const [register, setRegister] = useState()
    return (
        <>
            <Container
                sx={{
                    margin: "10px",
                    marginLeft: "35%",
                    border: "2px solid gray",
                    width: "30%"
                }}>
                <Typography
                    variant='h4'
                    align='center'
                    color="primary">
                    Registration Form
                </Typography>
                <form
                >
                    <TextField
                        sx={{ margin: "10px" }}
                        fullWidth
                        variant="outlined"
                        id="name"
                        label="U_Name"
                        name="name"
                    // value="u_name"
                    />
                    <TextField
                        sx={{ margin: "10px" }}
                        fullWidth
                        variant="outlined"
                        id="name"
                        label="U_Email"
                        name="name"
                    // value="u_email"
                    />
                    <TextField
                        sx={{ margin: "10px" }}
                        fullWidth
                        variant="outlined"
                        id="name"
                        label="U_Password"
                        name="name"
                        type="password"
                    // value="u_password"
                    />
                    <TextField
                        sx={{ margin: "10px" }}
                        fullWidth
                        variant="outlined"
                        id="name"
                        label="Confirm Password"
                        name="name"
                        type="password"

                    />
                    <TextField
                        sx={{ margin: "10px" }}
                        fullWidth
                        variant="outlined"
                        type="number"
                        id="name"
                        label="Mob Number"
                        name="name"
                    // value="u_mobNumber"
                    />
                    <Button
                        sx={{ margin: "10px", }}
                        variant="contained"
                        fullWidth
                        type="submit"
                        onClick={(e) => {
                            setRegister(e.target.value)
                        }}
                    >
                        Register
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default RegistrationForm