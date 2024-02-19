import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Typewriter from 'typewriter-effect';
import { Box, Image } from '@chakra-ui/react';
import { Carousel } from 'react-bootstrap';
import bg_pic1 from "./images/bg_pic1.jpg";
import bg_pic2 from "./images/bg_pic2.jpg";
import bg_pic3 from "./images/bg_pic3.jpg";


const HomePageComp = () => {
    return (
        <div>
            <div className='homepagetext text-center p-5 '>

                <h1 className='paragra text-light' style={{ "fontFamily": "serif" }}>
                    FOOD TOKEN-GENERATOR APP </h1>
                {/* <div className=' moving-text text-warning'>
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 40,
                            strings: [
                                "Order Your Food and Get a Token  "
                            ],
                        }} />
                </div> */}
                <Box bg={"black"}>
                    <Carousel interval={2000}>
                        <Carousel.Item>
                            <Image w={"100%"} h={"70vh"} src={bg_pic2} alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image w={"100%"} h={"70vh"} src={bg_pic1} alt="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image w={"100%"} h={"70vh"} src={bg_pic3} alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                </Box>
            </div>
        </div>
    )

}

export default HomePageComp;