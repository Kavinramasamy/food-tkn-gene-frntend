import { useFormik } from "formik";
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import * as yup from 'yup';


const LoginPage = () => {
    const navTo = useNavigate();
    const [logininfo, setLoginInfo] = useState("")
    const fieldValidationSchema = yup.object({
        email: yup.string().required("please enter a valid mail"),
        password: yup.string().required("please enter a valid password")
    });
    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        ValidationSchema: fieldValidationSchema,
        onSubmit: async (logininfo) => {
            try {
                setLoginInfo("please wait")
                const response = await fetch(" ", {
                    method: "POST",
                    body: JSON.stringify(logininfo),
                    headers: {
                        "content-type": "application/json"
                    },
                }
                );
                const data = await response.json();
                if (data.message == "login success") {
                    localStorage.setItem("food-token-gene-token", data.token);
                    localStorage.setItem("food-token-gene-email", data.email);
                    navTo('/foodmenu')
                }
                else {
                    setLoginInfo(data.message);
                }
            } catch (errors) {
                console.log("Errors....", errors);
            }
        },
    });
    const demo = () => {
        values.email = "demo@demo.in";
        values.password = "Password@123";
    };

    return (
        <div className="entry bg-dark " style={{ height: "100vh" }}>
            <h1 className="text-warning text-center">LogIn Page</h1>
            <form className="text-start p-5" onSubmit={handleSubmit}>
                <div className="form-group text-light">
                    <label for="exampleInputEmail1 ">Email address</label>
                    <input
                        type="email"
                        className={`form-control my-2 ${touched.email && errors.email ? "border-danger border-2" : ""
                            }`}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder={`${touched.email && errors.email ? errors.email : "Enter email"
                            }`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <div className="form-group text-light">
                    <label for="exampleInputPassword1 ">Password</label>
                    <input
                        type="password"
                        className={`form-control my-2 ${touched.password && errors.password
                            ? "border-danger border-2"
                            : ""
                            }`}
                        id="password"
                        placeholder={` ${touched.password && errors.password
                            ? errors.password
                            : "Enter password"
                            }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <div className="text-center m-3">
                    <p className="text-danger">{logininfo}</p>
                    <br />

                    <button type="submit" className="btn btn-success px-5">
                        LogIn
                    </button>
                    <br />
                    <br />
                    <button type="submit" className="btn btn-warning px-5" onClick={demo}>
                        Demo LogIn
                    </button>
                </div>
            </form>
            <div className=" text-center">
                <NavLink className="mb-3" to="/forgetpassword">
                    Forget Password
                </NavLink>
                <br />
                <NavLink className="mb-3" to="/signup">
                    SignUp
                </NavLink>
            </div>
        </div>
    );
};

export default LoginPage;






