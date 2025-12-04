import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-background pt-16 pb-32'>
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-center relative z-10 max-w-4xl mx-auto px-4'
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className='inline-block mx-auto px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20'
                >
                    No. 1 Job Hunt Website
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className='text-5xl md:text-7xl font-bold tracking-tight mb-6'
                >
                    Search, Apply & <br />
                    Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>Dream Job</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='text-lg text-muted-foreground mb-10 max-w-2xl mx-auto'
                >
                    Discover thousands of job opportunities with all the information you need. Its your future. Come find it. Manage all your job application from start to finish.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='flex w-full max-w-2xl shadow-2xl shadow-primary/20 border border-white/20 pl-6 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-white/80 dark:bg-black/40 backdrop-blur-lg'
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full bg-transparent text-lg'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                    />
                    <Button onClick={searchJobHandler} className='rounded-full h-12 w-12 p-0 bg-primary hover:bg-primary/90 shrink-0'>
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection