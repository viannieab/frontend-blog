import useFetchData from "@/hooks/useFetchData"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaHtml5 } from "react-icons/fa6"
import { TbBrandNextjs } from "react-icons/tb"
import { FaDatabase,  FaThreads } from "react-icons/fa6"
import { AiOutlineDeploymentUnit } from "react-icons/ai"
import { FaGithub, FaLinkedinIn, FaInstagram, FaTiktok  } from "react-icons/fa"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5) //five blog per page

  const {alldata, loading} = useFetchData('/api/getblog')
  
  //handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastBlog = currentPage * perPage
  const indexOfFirstBlog = indexOfLastBlog - perPage
  const currentBlogs = alldata.slice(indexOfFirstBlog, indexOfLastBlog)

  const allblog = alldata.length

  //filter published blogs
  const publishedBlogs = currentBlogs.filter(ab => ab.status === 'publish')

  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(allblog / perPage); i++){
    pageNumbers.push(i)
  }
  
  function extractFirstImageUrl(markdownContent){
    if(!markdownContent || typeof markdownContent !== 'string') {
      return null
    }
    const regex = /!\[.*?\]\((.*?)\)/
    const match = markdownContent.match(regex)
    return match ? match[1] : null
  }
  return (
    <>
      <Head>
        <title>Frontend</title>
        <meta name="description" content="abaine blogging site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>Hi, I'm <span>Abaine Dev</span>. <br/>
              Data Engineer
            </h1>
            <h3>Specialized in Big Data Analytics</h3>
            <div className="flex gap-2">
              <Link href="/contact">
                <button>Contact Me</button>
              </Link>
              <Link href="/about">
                <button>About Me</button>
              </Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <Image width={350} height={350} src="/images/data-engineer.png" alt="coder"/>
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recent Publibations</h2>
            <div className="blogs_sec">
            {loading ? <div className="wh-100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div> : <>
                      {publishedBlogs.map((blog) => {
                        const firstImageUrl = extractFirstImageUrl(blog.description)
                        return <div className="blog" key={blog._id}>
                          <div className="blogging">
                            <Link href={`/blog/${blog.slug}`}>
                              <img src={firstImageUrl || "no-image-available.jpg"} alt={blog.title}/>
                            </Link>
                          </div>
                          <div className="bloginfo">
                            <Link href={`/tags/${blog.tags[0]}`}>
                              <div className="blogtag">
                                {blog.tags[0]}
                              </div>
                            </Link>
                            <Link href={`/blog/${blog.slug}`}>
                              <h3>{blog.title}</h3>
                            </Link>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <div className="blogauthor flex gap-1">
                              <div className="blogimg">
                                <img src="/images/data-engineer.png" alt="coder"/>
                              </div>
                              <div className="flex flex-col flex-left gap-5">
                                <h4>Abaine Dev.</h4>
                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                              </div>
                              <div className="blogpagination">         
                                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                                  {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage +2, pageNumbers.length)).map(number => (
                                    <button key={number} onClick={() =>paginate(number)}
                                      className={currentPage === number ? 'active' : ''}
                                    >
                                      {number}
                                    </button>
                                  ))}
                                  <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      })}
                    </> }
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5/>
                    </div>
                    <h3>Html, CSS, & JavaScript</h3>
                  </div>
                </Link>
                <Link href="/topics/nextjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs/>
                    </div>
                    <h3>Next Js, Node Js, & React Js</h3>
                  </div>
                </Link>
                <Link href="/topics/database">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaDatabase/>
                    </div>
                    <h3>MongoDB, SQL, & Access</h3>
                  </div>
                </Link>
                <Link href="/topics/deployment">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Github, Vercel, Google App, Dev Community, & Netlify</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href='/tags/html'>#html</Link>
                <Link href='/tags/css'>#css</Link>
                <Link href='/tags/javascript'>#javascript</Link>
                <Link href='/tags/nextjs'>#nextjs</Link>
                <Link href='/tags/react'>#react</Link>
                <Link href='/tags/database'>#database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>Want to find out how i can solve problems specific to your business? Let's Talk</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <Link href="https://github.com/viannieab"><FaGithub /></Link>
                  </div>
                  <div className="st_icon">
                    <Link href="https://linkedin.com/in/vianny-abaine"><FaLinkedinIn /></Link>
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                  <div className="st_icon">
                    <FaTiktok />
                  </div>
                  <div className="st_icon">
                    <FaThreads />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}