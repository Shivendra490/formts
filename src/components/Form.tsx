import React, { useEffect, useState } from "react";
import { Alert, Avatar, Grid, Paper } from "@mui/material";
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
  gender?: string;
  password: string;
}[];

// type inputProps={
//   handleChange:(e:React.MouseEvent<HTMLButtonElement>)=>void
// }

// type btnClickProps={
//   handleClick:(e:React.ChangeEvent<HTMLInputElement>)=>void
// }

interface inputUser {
  name: string;
  email: string;
  phone: string;
  gender?: string;
  password: string;
  cpassword?: string;
}

const keys = ["name", "email", "phone", "gender", "password", "cpassword"];

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
  const [allUsersList, setAllUsersList] = useState<userList>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<string|null|React.ReactNode>()

  const [input, setInput] = useState<inputUser>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState<inputUser>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const checkDisable =
      keys.some((key) => input[key as keyof inputUser] === "") ||
      keys.some((key) => error[key as keyof inputUser] !== undefined);
    setTimeout(()=>setIsSignedUp(""),2000)
    setIsSignedUp("")
    setIsDisabled(checkDisable);
  }, [error, input]);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (value.trim().length < 5) return "name less than 5 chars";
        break;
      case "email":
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          return "Please enter valid email";
        }
        break;
      case "phone":
        {
          const re = /^[7-9][0-9]{9}$/;

          if (!re.test(value)) {
            return "please enter phone number";
          }
        }
        break;
      case "password":
        if (value.length < 8) {
          return "password should be greater than 8 chars";
        }
        break;
      case "cpassword":
        if (value !== input.password) {
          return "password and confirm password not matches";
        }
        break;
      case "gender":
        if (value === "") {
          return "required";
        }
        break;
    }
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // call validation function
    // send name of the field
    // if false return error else nothing
    const result = validate(name, value);

    setError({ ...error, [name]: result });

    setInput({ ...input, [name]: value });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    const newUser = { ...input };

    console.log("new user before ", input);

    delete newUser.cpassword;
    // delete newUser.gender
    console.log("new user after ", newUser);

    // fetch(`https://sample-register.herokuapp.com/register`, {
    //   body: JSON.stringify(newUser),
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },// header is optional
    // })
    // .then((response) => console.log(response,typeof response))//response.data
    // .catch((error) => console.log(error));

    try {
      const response = await fetch(
        `https://sample-register.herokuapp.com/register`,
        {
          body: JSON.stringify(newUser),
          method: "post",
          headers: { "Content-Type": "application/json" }, // header is optional
        }
      );

      const data = await response.json();

      if (data) {
        console.log(data.status, "inside form ts");
        let res=""
        if(Object.keys(data).length>1)
        {
          res="user already exist."
          
        }
        else{
          res="Account created."
        }
        setIsSignedUp(res)
        // const res=data.data.msg || data.status
        console.log(res,"this is res")
        setIsDisabled(false);
      }
      if (response) {
        console.log("hello");
      }
    } catch (error) {
      console.log(error);
    }

    // fetch(`https://sample-register.herokuapp.com/users`).then(response=>console.log(response,'hello')).then(abc=>console.log(abc,"abc"))

    // setAllUsersList([...allUsersList, newUser]); for frontend console.

    setInput({
      name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid
          display="flex"
          flexDirection={"column"}
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
          <div style={{ width: "100%" }}>
            {isSignedUp && <Alert severity="success">{isSignedUp}</Alert>}
          </div>
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
          <div style={{ width: "100%" }}>
            {error.name && <Alert severity="error">{error.name}</Alert>}
          </div>
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
          <div style={{ width: "100%" }}>
            {error.email && <Alert severity="error">{error.email}</Alert>}
          </div>
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
          <div style={{ width: "100%" }}>
            {error.phone && <Alert severity="error">{error.phone}</Alert>}
          </div>

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
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            value={input.password}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
          />
          <div style={{ width: "100%" }}>
            {error.password && <Alert severity="error">{error.password}</Alert>}
          </div>
          <TextField
            id="cpassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            name="cpassword"
            fullWidth
            value={input.cpassword}
            style={{ margin: "1% 0" }}
            onChange={handleChange}
            required
          />
          <div style={{ width: "100%" }}>
            {error.cpassword && (
              <Alert severity="error">{error.cpassword}</Alert>
            )}
          </div>
          <Button
            type="submit"
            value={input.cpassword}
            onClick={handleClick}
            variant="contained"
            style={{ margin: "1% 0" }}
            disabled={isDisabled}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Form;
