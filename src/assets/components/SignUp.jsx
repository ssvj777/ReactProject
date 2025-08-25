import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";


let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter Your FullName"),
  email: Yup.string()
    .required("Email is Required")
    .matches(/^[a-z0-9]+@[a-z]{3,5}.[a-z]{2,3}$/, "Enter Your Valid Email"),
  age: Yup.number()
    .required("Age is Required")
    .min(18, "Enter Age btn 18 to 30")
    .max(30, "Enter Age btn 18 to 30"),
  password: Yup.string()
    .required("Password is Required")
    .min(4, "Password Length must be 4 to 7")
    .max(8, "Password Length must be 4 to 7"),
  cPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Password Must Match"),
});
const SignUp = () => {
  let paperStyle = {
    width: 400,
    margin: "77px auto",
    padding: "20px",
    display: "grid",
    gap: "17px",
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleData = (data) => {
    Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Account Sign-Up Successfully...",
          });
    console.log(data);
  };

  return (
    <div>
      <Paper
        elevation={20}
        style={paperStyle}
        component="form"
        onSubmit={handleSubmit(handleData)}
      >
        <Typography variant="h5" textAlign={"center"}>
          SignUp Page
        </Typography>
        <TextField
          label="Name"
          error={!!errors.name}
          {...register("name")}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          error={!!errors.email}
          {...register("email")}
          helperText={errors.email?.message}
        />
        <TextField
          label="Age"
          {...register("age")}
          error={!!errors.age}
          helperText={errors.age?.message}
        />
        <TextField
          label="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          {...register("cPassword")}
          error={!!errors.cPassword}
          helperText={errors.cPassword?.message}
        />
        <Button variant="contained" type="submit">
          SignUp
        </Button>
      </Paper>
    </div>
  );
};

export default SignUp;
