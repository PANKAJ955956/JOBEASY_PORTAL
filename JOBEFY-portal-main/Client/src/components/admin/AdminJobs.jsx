import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { motion } from "framer-motion"
import { Plus } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("")

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'
                >
                    <Input
                        className="w-full sm:w-72 bg-white dark:bg-card border-gray-200 dark:border-white/10 focus:ring-primary"
                        placeholder="Filter by name, role..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                        onClick={() => navigate("/admin/jobs/create")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Job
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden"
                >
                    <AdminJobsTable />
                </motion.div>
            </div>
        </div>
    )
}

export default AdminJobs
