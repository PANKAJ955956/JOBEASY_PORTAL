import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security",
]

function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
        >
            <Carousel className="w-full max-w-xl mx-auto my-12 px-4">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="w-full rounded-full border-primary/20 bg-background/50 hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 border-primary/20 hover:bg-primary hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 border-primary/20 hover:bg-primary hover:text-white" />
            </Carousel>
        </motion.div>
    )
}

export default CategoryCarousel