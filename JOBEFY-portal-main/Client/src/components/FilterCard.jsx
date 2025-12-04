import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from "framer-motion"

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bengluru", "Mumbai", "Hyderabad", "Ranchi", "Patna"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning"]
    },
    {
        filterType: "Salary",
        array: ["6-10 LPA", "10-40 LPA", "40-100 LPA", "100+"]
    }
]

const FilterCard = () => {
    useGetAllJobs()

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10'
        >
            <h1 className='font-bold text-xl text-foreground mb-4'>Filter Jobs</h1>
            <hr className='mb-6 border-gray-200 dark:border-white/10' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-6 last:mb-0'>
                            <h1 className='font-bold text-lg mb-3 text-foreground'>{data.filterType}</h1>
                            <div className='space-y-2'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `r${index}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-3' key={idx}>
                                                <RadioGroupItem value={item} id={itemId} className="text-primary border-primary" />
                                                <Label className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-primary transition-colors" htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </motion.div>
    )
}

export default FilterCard
