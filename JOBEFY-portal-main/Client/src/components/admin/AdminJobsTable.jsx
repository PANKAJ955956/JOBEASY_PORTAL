import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const navigate = useNavigate();
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="w-full">
            <Table>
                <TableCaption className="mb-4">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-white/10">
                        <TableHead className="w-[200px]">Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs && filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                                <TableCell className="font-medium">{job?.company?.companyName}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-full transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 flex flex-col gap-1.5 p-2 shadow-lg border border-gray-100 dark:border-white/10">
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-full cursor-pointer gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm'>
                                                <Eye className='w-4 h-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;
