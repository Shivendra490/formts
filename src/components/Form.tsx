import React, { useState } from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Button from "@mui/material/Button";

type userList = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  
}[];

// type inputProps={
//   handleChange:(e:React.MouseEvent<HTMLButtonElement>)=>void
// }

// type btnClickProps={
//   handleClick:(e:React.ChangeEvent<HTMLInputElement>)=>void
// }

interface inputUser  {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  cpassword:string
};

const paperStyle = {
  width: "30%",
  margin: "3% auto",
};

const avatarStyle = {
  backGroundColor: "red",
  color: "blue",
  marginTop: "3%",
};

const Form = () => {
  const [allUsersList, setAllUsersList] = useState<userList>([])
 

  const [input, setInput] = useState<inputUser>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    cpassword:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setInput({ ...input, [name]: value });
    
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newUser = { ...input };

    // fetch(`http://localhost:8080/reg`, {
    //   body: JSON.stringify(newUser),
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },// header is optional
    // })
    // .then((response) => response)//response.data
    // .catch((error) => console.log(error));

    setAllUsersList([...allUsersList, newUser]);
    
    setInput({ name: "", email: "", phone: "", gender: "", password: "" ,cpassword:""});
  };
  // localStorage.setItem('userListssssNew',JSON.stringify(allUsersList))
  console.log(allUsersList, "eeeee");

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid
          display="flex"
          flexDirection={'column'}
          // justifyContent={"space-around"}
          alignItems={"center"}
        >
          <h2>Sign up</h2>
          <Avatar style={avatarStyle}>
            <AddOutlinedIcon />
          </Avatar>
        </Grid>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={input.name}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={input.email}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />
          <TextField
            id="phone"
            name="phone"
            label="Phone No"
            variant="outlined"
            fullWidth
            value={input.phone}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />

          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ marginLeft: "3%" }}
            >
              Gender
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={input.gender}
              name="gender"
              id="gender"
              row
              style={{ marginLeft: "3%" }}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            value={input.password}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />
          <TextField
            id="cpassword"
            label="Confirm Password"
            variant="outlined"
            name='cpassword'
            fullWidth
            value={input.cpassword}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />
          <Button
            type="submit"
            value={input.cpassword}
            onClick={handleClick}
            variant="contained"
            style={{ margin: "1% 0" }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Form;
