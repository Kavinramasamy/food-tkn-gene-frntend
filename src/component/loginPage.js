import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navTo = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);

  const fieldValidationSchema = yup.object({
    email: yup.string().required("please enter a valid mail"),
    password: yup.string().required("please enter a valid password"),
  });
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    ValidationSchema: fieldValidationSchema,
    onSubmit: async (logininfo) => {
      try {
        setLoad(true);
        await axios
          .post("https://new-project-0xul.onrender.com/login", logininfo)
          .then((res) => {
            localStorage.setItem("food-gen-admin-token", res.data.token);
            localStorage.setItem("login", true);
            toast.success("Login Success");
            navTo("/manage");
            setLoad(false);
          })
          .catch((error) => {
            console.log("hello", error);
            toast.warning("Invalid Credential");
            setLoad(false);
          });
      } catch (errors) {
        toast.warning("Try Again");
        console.log("Error", errors);
      }
    },
  });
  const demoLoad = () => {
    values.email = "admin@admin.in";
    values.password = "@123admin";
    handleSubmit();
  };
  return (
    <Flex
      minH={"90vh"}
      bg={"gray.100"}
      justifyContent={"center"}
      alignItems={"center"}
      boxShadow={" 0 5px 8px 0 black"}
    >
      <Flex justifyContent={"center"} h={"500px"} w={"1000px"} borderRadius={5}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Foods_-_Idil_Keysan_-_Wikimedia_Giphy_stickers_2019.gif"
          h={"100%"}
          w={"60%"}
          bg={"green.100"}
          display={{ base: "none", lg: "block" }}
          borderLeftRadius={5}
          //   filter={"hue-rotate(4.5rad)"}
        />
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={5}
          textAlign={"center"}
          borderRightRadius={5}
          h={"100%"}
          w={{ base: "80%", md: "50%", lg: "40%" }}
          bg={"white"}
        >
          <Heading color={{ base: "green.400" }} fontWeight={{ base: "700" }}>
            ADMIN LOGIN
          </Heading>
          <Stack p={4} />
          <form className="w-100" onSubmit={handleSubmit}>
            <Input
              color={"green.400"}
              fontWeight={{ base: "500" }}
              required={true}
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              borderColor={"green.300"}
              borderWidth={2}
              placeholder="E-mail"
              _placeholder={{ color: "green.300", fontWeight: "500" }}
            />
            <Stack p={2} />
            <InputGroup size="md">
              <Input
                color={"green.400"}
                fontWeight={{ base: "500" }}
                required={true}
                id="password"
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                borderColor={"green.300"}
                borderWidth={2}
                _placeholder={{ color: "green.300", fontWeight: "500" }}
              />
              <InputRightElement width="4rem" color={"green.500"}>
                {show ? (
                  <ViewIcon
                    _hover={{ cursor: "pointer" }}
                    size="sm"
                    onClick={handleShow}
                  />
                ) : (
                  <ViewOffIcon
                    _hover={{ cursor: "pointer" }}
                    size="sm"
                    onClick={handleShow}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <Stack p={2} />

            {!load && (
              <Button
                _hover={{ bg: "green.600" }}
                color={"white"}
                bg={"green.500"}
                w={"100%"}
                type="submit"
              >
                LogIn
              </Button>
            )}
            {load && (
              <Button
                isLoading={true}
                _hover={{ bg: "green.600" }}
                color={"white"}
                bg={"green.500"}
                w={"100%"}
                type="submit"
              >
                LogIn
              </Button>
            )}
            <Stack p={2} />
            {!load && (
              <Button
                _hover={{ bg: "green.600" }}
                color={"white"}
                bg={"green.500"}
                w={"100%"}
                onClick={demoLoad}
              >
                Demo Credential
              </Button>
            )}
            {load && (
              <Button
                isLoading={true}
                _hover={{ bg: "green.600" }}
                color={"white"}
                bg={"green.500"}
                w={"100%"}
                onClick={demoLoad}
              >
                Demo Credential
              </Button>
            )}
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
