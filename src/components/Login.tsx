import React, { useEffect, useState } from "react";
import { Alert, Avatar, Button, Grid, Paper } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
const PaperStyle = {
  width: "30%",
  margin: "3% auto",
};

const avatarStyle = {
  backGroundColor: "red",
  color: "blue",
  marginTop: "3%",
};

interface loginDetails {
  email: string;
  password: string;
}

const keys = ["email", "password"];

const Login = () => {
  const [loginCred, setLoginCred] = useState<loginDetails>({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const [error, setError] = useState<loginDetails>({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const checkDisable =
      keys.some((key) => loginCred[key as keyof loginDetails] === "") ||
      keys.some((key) => error[key as keyof loginDetails] !== undefined);

    setIsDisabled(checkDisable);
  }, [error, loginCred]);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "email":
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          return "Please enter valid email";
        }
        break;

      case "password":
        if (value.length < 8) {
          return "password should be greater than 8 chars";
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

    setLoginCred({ ...loginCred, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsDisabled(true);
      const response = await fetch(
        `https://sample-register.herokuapp.com/login`,
        {
          body: JSON.stringify(loginCred),
          method: "post",
          headers: { "Content-Type": "application/json" }, // header is optional
        }
      );
      const data = await response.json();
      if (data && data.status === "success") {
        history("/welcome");
        setLoginCred({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={PaperStyle}>
        <Grid
          display="flex"
          justifyContent={"space-around"}
          alignContent={"center"}
        >
          <h2 style={{ marginTop: "0.7em" }}>Login</h2>
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
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            style={{ margin: "2% 0" }}
            value={loginCred.email}
          />
          <div style={{ width: "100%" }}>
            {error.email && <Alert severity="error">{error.email}</Alert>}
          </div>
          <TextField
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={loginCred.password}
          />
          <div style={{ width: "100%" }}>
            {error.password && <Alert severity="error">{error.password}</Alert>}
          </div>
          <Button
            type="submit"
            variant="contained"
            style={{ margin: "1% 0" }}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
