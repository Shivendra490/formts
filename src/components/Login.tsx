
import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper } from '@mui/material'
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const PaperStyle={
    width:'30%',
    margin:'3% auto'
}

const avatarStyle = {
    backGroundColor: "red",
    color: "blue",
    marginTop: "3%",
  };

  interface loginDetails{
    email:string
    password:string
  }

const Login = () => {
  const [loginCred, setLoginCred] = useState<loginDetails>({email:"",password:""})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // call validation function
    // send name of the field
    // if false return error else nothing

    // const result = validate(name, value);
    
      // setError({ ...error, [name]: result });
    

    setLoginCred({ ...loginCred, [name]: value });
  };

  const handleSubmit=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const currCred={...loginCred}

    fetch(`https://sample-register.herokuapp.com/login`, {
      body: JSON.stringify(currCred),
      method: "post",
      headers: { "Content-Type": "application/json" },// header is optional
    })
    .then((response) => response.json())
    .then(data=>console.log(data))//response.data
    .catch(error => console.log(error));


  }

  

 

  return (
   <Grid>
       <Paper elevation={10} style={PaperStyle}>
       <Grid
          display="flex"
          justifyContent={"space-around"}
          alignContent={"center"}
        >
          <h2 style={{marginTop:'0.7em'}}>Login</h2>
          <Avatar style={avatarStyle}>
            <AddOutlinedIcon />
          </Avatar>
        </Grid>
        <Box
      component="form"
      sx={{
        '& > :not(style)': {width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField name="email" id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} style={{margin:'2% 0'}}/>
      <TextField name="password" id="outlined-basic" label="Password" variant="outlined" onChange={handleChange}/>
      <Button
            type="submit"
            
            variant="contained"
            style={{ margin: "1% 0" }}
            onClick={handleSubmit}
            
          >
            Login
          </Button>

    </Box>

       </Paper>
   </Grid>
  )
}

export default Login
