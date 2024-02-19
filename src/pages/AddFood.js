import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");
  let [actors_name_List, setActorsList] = useState([]);

  const fieldValidationSchema = yup.object({
    food_name: yup.string().required(),
    veg: yup.boolean().required(),
    price: yup.number().required(),
    cooking_time: yup.string().required(),
    cuisine: yup.string().required(),
    image_url: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      food_name: "",
      veg: true,
      price: "",
      cooking_time: "",
      cuisine: "",
      image_url: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (foodInfo) => {
      try {
        await axios
          .post(
            "https://food-token-generator-backend-delta.vercel.app/food",
            foodInfo
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error", error);
      }
    },
  });
  return (
    <Flex
      className="text-white"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"black"}
    >
      <Stack
        textAlign={"center"}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={6}
        px={6}
        rounded={"lg"}
      >
        <Box rounded={"lg"} border={"2px solid gray"} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add Food
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="veg" isRequired>
              <FormLabel>Veg/Non-Veg</FormLabel>
              <Select
                id="veg"
                placeholder="Select option"
                borderColor={errors.veg ? "red.500" : "gray"}
                onChange={handleChange}
              >
                <option className="bg-dark" value={true}>
                  Veg
                </option>
                <option className="bg-dark" value={false}>
                  Non-Veg
                </option>
              </Select>
            </FormControl>

            <FormControl id="food_name" isRequired>
              <FormLabel>Food Name</FormLabel>
              <Input
                type="text"
                id="food_name"
                onChange={handleChange}
                borderColor={errors.food_name ? "red.500" : "gray"}
                placeholder={errors.food_name ? "required" : "Enter food name"}
                value={values.food_name}
              />
            </FormControl>

            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                id="price"
                p={1}
                onChange={handleChange}
                borderColor={errors.price ? "red.500" : "gray"}
                placeholder={errors.price ? "required" : "Enter price"}
                value={values.price}
              />
            </FormControl>
            <FormControl id="cuisine" isRequired>
              <FormLabel>Cuisine</FormLabel>
              <Input
                type="text"
                id="cuisine"
                multiple
                p={1}
                onChange={handleChange}
                borderColor={errors.cuisine ? "red.500" : "gray"}
                placeholder={errors.cuisine ? "required" : "Enter cuisine"}
                value={values.cuisine}
              />
            </FormControl>
            <FormControl id="cooking_time" isRequired>
              <FormLabel>Cooking Time</FormLabel>
              <Input
                type="text"
                id="cooking_time"
                multiple
                p={1}
                onChange={handleChange}
                borderColor={errors.cooking_time ? "red.500" : "gray"}
                placeholder={
                  errors.cooking_time ? "required" : "Enter Cooking time"
                }
                value={values.cooking_time}
              />
            </FormControl>
            <FormControl id="image_url" isRequired>
              <FormLabel>Image url</FormLabel>
              <Input
                type="text"
                id="image_url"
                multiple
                p={1}
                onChange={handleChange}
                borderColor={errors.image_url ? "red.500" : "gray"}
                placeholder={errors.image_url ? "required" : "Enter image url"}
                value={values.image_url}
              />
            </FormControl>

            <Box color={"red.300"}>{credential}</Box>
            <Stack pt={2}>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                size="lg"
                bg={"yellow.500"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default AddFood;
