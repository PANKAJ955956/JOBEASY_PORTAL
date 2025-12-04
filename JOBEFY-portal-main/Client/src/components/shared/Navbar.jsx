import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, BuildingIcon, HomeIcon, LogOut, MenuIcon, SearchCheck, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const resetQuery = () => {
        dispatch(setSearchedQuery(''))
    }

    return (
        <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className='sticky top-0 z-50 w-full glass border-b border-white/20'
        >
            <div className='flex items-center justify-between mx-auto h-16 max-sm:px-4 sm:px-[5%] lg:px-[10%]'>
                <div onClick={() => navigate("/")} className='cursor-pointer flex items-center gap-2'>
                    <h1 className='text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600'>
                        Job<span className='text-foreground'>efy</span>
                    </h1>
                </div>
                
                <div className='flex items-center gap-12 max-sm:gap-5'>
                    <ul className='flex font-medium items-center gap-8 max-sm:hidden text-muted-foreground'>
                        {
                            user && user.role === "recruiter"
                                ?
                                <>
                                    <li className='hover:text-primary transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-primary transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                                : (
                                    <>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={resetQuery} className='hover:text-primary transition-colors cursor-pointer'><Link to="/">Home</Link></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} className='hover:text-primary transition-colors cursor-pointer'><Link to="/jobs">Jobs</Link></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={resetQuery} className='hover:text-primary transition-colors cursor-pointer'><Link to="/browse">Browse</Link></motion.li>
                                    </>
                                )
                        }
                    </ul>

                    {
                        !user
                            ?
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">Signup</Button>
                                </Link>
                            </div>
                            :
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0 border-none shadow-xl glass">
                                        <div className='p-4'>
                                            <div className='flex gap-4 items-center mb-4'>
                                                <Avatar className="cursor-pointer size-12 ring-2 ring-primary/20">
                                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold text-lg'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground line-clamp-1'>
                                                        {user?.profile?.bio || "No bio available"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col space-y-2'>
                                                {
                                                    user && user?.role === "student" &&
                                                    (
                                                        <Link to="/profile" className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition-colors text-sm font-medium'>
                                                            <User2 className='size-4' />
                                                            View Profile
                                                        </Link>
                                                    )
                                                }
                                                <button onClick={logoutHandler} className='flex w-full items-center gap-3 p-2 rounded-md hover:bg-red-500/10 hover:text-red-500 transition-colors text-sm font-medium text-left'>
                                                    <LogOut className='size-4' />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                    }

                    {/* Mobile Menu */}
                    <div className='sm:hidden'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MenuIcon className='size-6' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 mr-4 glass border-none shadow-xl">
                                <div className='flex flex-col gap-2 p-2'>
                                    {
                                        user && user.role === "recruiter"
                                            ?
                                            <>
                                                <Link to="/admin/companies" className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10'>
                                                    <BuildingIcon className='size-4' />
                                                    Companies
                                                </Link>
                                                <Link to="/admin/jobs" className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10'>
                                                    <BriefcaseBusiness className='size-4' />
                                                    Jobs
                                                </Link>
                                            </>
                                            : (
                                                <>
                                                    <div onClick={() => { navigate("/"); dispatch(setSearchedQuery("")) }} className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer'>
                                                        <HomeIcon className='size-4' />
                                                        Home
                                                    </div>
                                                    <Link to="/jobs" className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10'>
                                                        <BriefcaseBusiness className='size-4' />
                                                        Jobs
                                                    </Link>
                                                    <div onClick={() => { navigate("/browse"); dispatch(setSearchedQuery("")) }} className='flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer'>
                                                        <SearchCheck className='size-4' />
                                                        Browse
                                                    </div>
                                                </>
                                            )
                                    }
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Navbar


