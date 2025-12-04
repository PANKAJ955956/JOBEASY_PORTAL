import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-6 rounded-xl shadow-sm bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group dark:bg-card dark:border-white/10'
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h1 className='font-medium text-lg text-primary group-hover:underline decoration-2 underline-offset-4 transition-all'>{job?.company?.companyName}</h1>
          <p className='text-sm text-muted-foreground'>India</p>
        </div>
        {/* Optional: Add company logo here if available */}
      </div>

      <div className='mb-4'>
        <h1 className='font-bold text-xl my-2 text-foreground'>{job?.title}</h1>
        <p className='text-sm text-muted-foreground line-clamp-2'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 border-orange-200 dark:border-orange-800" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  )
}

export default LatestJobCards