import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Header(){
    //searchbar open and close function
    const [searchopen, setSearchopen] = useState(false)
    //for open searchbar
    const openSearch = () => {
        setSearchopen(!searchopen)
    }
    //for close searchbar
    const closeSearch = () => {
        setSearchopen(false)
    }
    //asidebar for mobile devices
    const [aside,setAside] = useState(false)
    const asideOpen = () => {
        setAside(true)
    }
    const asideClose = () => {
        setAside(false)
    }
    //closes aside menu upon clicking on the link
    const handleLinkClick = () => {
        setAside(false)
    }
    //darkmode on and off
    const [darkMode, setDarkMode] = useState(true)
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(isDarkMode)
    }, [])
    useEffect(() => {
        if(darkMode) {
            document.body.classList.add('dark')
            localStorage.setItem('darkMode', true)
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('darkMode', false)
        }
    }, [darkMode])
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    //fetch search data
    const {alldata, loading} = useFetchData('/api/getblog')
    //filtering publish blogs
    const publishedBlogs = alldata.filter(ab => ab.status === "publish")
    const [searchQuery, setSearchQuery] = useState('')
    //filtering based on search query
    const filteredBlogs = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return<>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>Abaine</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp/>
                    <input onClick={openSearch}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        type="search" placeholder="Discover news, articles, and more"/>
                </div>
                <div className="nav_list_dark">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">About Me</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><AiOutlineInfoCircle /></li>
                    </ul>
                    {/* for mobile devices */}
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun/>}</button>
                        <button onClick={openSearch}> <IoSearch /> </button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearchSharp/>
                    <input type="search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles, and more"/>
                </div>
                <div className="search_data text-center">
                    {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div> :<>
                        {searchQuery ? <>
                            {filteredBlogs.slice(3, 0).map((blog) => {
                                return <Link onClick={closeSearch} href={`/blog/${blog.slug}`} className="blog" key={blog._id}>
                                    <div className="bloginfo">
                                        <div><h3>{blog.slug}</h3></div>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </Link>
                            })}
                        </> : <div>No Search Result</div>}
                    </>}
                </div>
                <div className="exit_search" onClick={closeSearch}>
                    <div><FaXmark/></div>
                    <h4>ESC</h4>
                </div>
            </div>
            {/* mobile navlist */}
            <div className={aside ? `navlist_mobile open` : 'navlist_mobile'}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>Abaine Blogs</h1>
                    <button onClick={asideClose}><FaXmark/></button>
                </div>
                <hr/>
                <h3 className="mt-3">Main Menu</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/">About Us</Link></li>
                    <li><Link href="/">Contact</Link></li>
                </ul>
                <hr/>
                <h3 className="mt-3">Topics</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/topics/htmlcssjs">Html CSS Js</Link></li>
                    <li><Link href="/topics/nextjs">Next Js React Js Node Js</Link></li>
                    <li><Link href="/topics/database">Databases</Link></li>
                    <li><Link href="/topics/deploymet">Deployments</Link></li>
                </ul>
            </div>
        </div>
    </>
}