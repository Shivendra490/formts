
import React from 'react'
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

const Login = () => {
  return (
   <Grid>
       <Paper elevation={10} style={PaperStyle}>
       <Grid
          display="flex"
          justifyContent={"space-around"}
          alignContent={"center"}
        >
          <h2>Login</h2>
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
      <TextField id="outlined-basic" label="Email" variant="outlined" style={{margin:'2% 0'}}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <Button
            type="submit"
            // onClick={handleClick}
            variant="contained"
            style={{ margin: "1% 0" }}
          >
            Login
          </Button>

    </Box>

       </Paper>
   </Grid>
  )
}

export default Login
