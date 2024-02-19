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


const EditFoods = () => {
    const { food_name, price, image_url, veg, cooking_time, cuisine } = JSON.parse(localStorage["food-values"])
    const navTo = useNavigate();
    const [loading, setLoading] = useState(false);
    const [credential, setCredential] = useState("");

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

            food_name: food_name,
            veg: veg,
            price: price,
            cooking_time: cooking_time,
            cuisine: cuisine,
            image_url: image_url,
        },
        validationSchema: fieldValidationSchema,
        onSubmit: async (foodInfo) => {
            try {
                console.log(foodInfo)
                setLoading(true)
                foodInfo.veg = foodInfo.veg === "true" ? true : false;
                await axios
                    .put(
                        "https://new-project-0xul.onrender.com/food",
                        foodInfo
                    )
                    .then((res) => {
                        setLoading(false)
                        navTo("/foodmenu")
                        console.log(res)
                    })

                    .catch((err) => {
                        setLoading(false);
                        console.log(err)
                    });
            } catch (error) {
                setLoading(false)
                console.log("Error", error);
            }
        },
    });
    return (
        <Flex
            className="text-dark"
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"darkgray"}
        >
            <Stack
                textAlign={"center"}
                spacing={50}
                mx={"auto"}
                maxW={"lg"}
                py={20}
                px={20}
                rounded={"lg"}
            >
                <Box rounded={"lg"} border={"1px solid gray"} borderRadius={"15px"} boxShadow={"lg"} p={40}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Edit Food
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
                                icon={false}
                            >
                                <option className="bg-white" value={true}>
                                    Veg
                                </option>
                                <option className="bg-white" value={false}>
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
                                p={2}
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
                                p={2}
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
                                p={2}
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
                                p={2}
                                onChange={handleChange}
                                borderColor={errors.image_url ? "red.500" : "gray"}
                                placeholder={errors.image_url ? "required" : "Enter image url"}
                                value={values.image_url}
                            />
                        </FormControl>

                        <Box color={"red.300"}>{credential}</Box>
                        <Stack pt={2}>
                            {!loading && <Button
                                onClick={handleSubmit}
                                size="lg"
                                bg={"yellow"}
                                color={"dark"}
                            >
                                Update
                            </Button>}

                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
export default EditFoods;
