<<<<<<< HEAD
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
=======
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
>>>>>>> 1c21d59f5f559c2f9ea945f64e14d47222ca3dae

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
<<<<<<< HEAD
    return (
        <div className='border-b border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className="flex items-center gap-2">
                    <span className="inline-block size-6 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,0.6)]" />
                    <h1 className='text-lg sm:text-xl font-semibold tracking-wide bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent'>JOBVERSE</h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="backdrop-blur bg-background/30">Login</Button></Link>
                                <Link to="/signup"><Button className="shadow-[0_0_20px_rgba(139,92,246,0.35)]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>    
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2 border-indigo-400 bg-indigo-100">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback className="bg-indigo-500 text-white">
                                            <User2 className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 backdrop-blur bg-background/70 border-border/50">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer border-2 border-indigo-400 bg-indigo-100">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                <AvatarFallback className="bg-indigo-500 text-white">
                                                    <User2 className="h-5 w-5" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center gap-2'>
                    {!user && (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline" size="sm" className="backdrop-blur bg-background/30 text-xs">Login</Button></Link>
                            <Link to="/signup"><Button size="sm" className="shadow-[0_0_20px_rgba(139,92,246,0.35)] text-xs">Signup</Button></Link>
                        </div>
                    )}
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-8 w-8 border-2 border-indigo-400 bg-indigo-100">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    <AvatarFallback className="bg-indigo-500 text-white">
                                        <User2 className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 backdrop-blur bg-background/70 border-border/50">
                                <div className=''>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer border-2 border-indigo-400 bg-indigo-100">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            <AvatarFallback className="bg-indigo-500 text-white">
                                                <User2 className="h-5 w-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="ml-2"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden border-t border-border/40 bg-background/80 backdrop-blur'>
                    <div className='px-4 py-3 space-y-3'>
                        <ul className='flex flex-col font-medium space-y-3'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies" onClick={() => setIsMobileMenuOpen(false)}>Companies</Link></li>
                                        <li><Link to="/admin/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                                        <li><Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link></li>
                                        <li><Link to="/browse" onClick={() => setIsMobileMenuOpen(false)}>Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            )}
=======
  };
  return (
    <div className="border-b border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-6 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,0.6)]" />
          <h1 className="text-lg sm:text-xl font-semibold tracking-wide bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            JOBVERSE
          </h1>
>>>>>>> 1c21d59f5f559c2f9ea945f64e14d47222ca3dae
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="backdrop-blur bg-background/30"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer bg-yellow-600">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 backdrop-blur bg-background/70 border-border/50">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            // <Button
            //   variant="outline"
            //   className="backdrop-blur bg-background/30"
            // >
            //   Logout
            // </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {!user && (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="backdrop-blur bg-background/30 text-xs"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="shadow-[0_0_20px_rgba(139,92,246,0.35)] text-xs"
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 backdrop-blur bg-background/70 border-border/50">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/80 backdrop-blur">
          <div className="px-4 py-3 space-y-3">
            <ul className="flex flex-col font-medium space-y-3">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
