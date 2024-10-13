import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TagPage(){
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(5) //five blog per page
    const [blog, setBlog] = useState([])
    const router = useRouter()
    const {tags} = router.query

    useEffect(() => {
        const fetchBlogdata = async () => {
            try {
                const res = await axios.get(`/api/getblog?tags=${tags}`)
                const alldata = res.data
                setBlog(alldata)
                setLoading(false)
            } catch(error){
                console.error('Error fetching blog data', error)
                setLoading(false)
            }
        }
        if(tags){
            fetchBlogdata()
        } else{
            router.push('/404')
        }
    }, [tags])
    //handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastBlog = currentPage * perPage
    const indexOfFirstBlog = indexOfLastBlog - perPage
    const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog)

    const allblog = blog.length

    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(allblog / perPage); i++){
        pageNumbers.push(i)
    }
    //filter published blogs
    const publishedBlogs = currentBlogs.filter(ab => ab.status === 'publish')

    function extractFirstImageUrl(markdownContent){
        if(!markdownContent || typeof markdownContent !== 'string') {
          return null
        }
        const regex = /!\[.*?\]\((.*?)\)/
        const match = markdownContent.match(regex)
        return match ? match[1] : null
    }

    return(
        <>
            <div className="blogging">
                <div className="category_slug">
                    <div className="container">
                        <div className="category_title">
                            <div className="flex gap-1">
                                <h1>{loading ? <div>Loading...</div> : publishedBlogs ?
                                publishedBlogs && publishedBlogs[0]?.tags : publishedBlogs &&
                                publishedBlogs.tags}</h1>
                                <span>{loading ? <div>0</div> : publishedBlogs.filter(blog => blog.tags).length}</span>
                            </div>
                            <p>This site cannot be reached!!
                            The webpage might be temporarily down or it may have moved permanently to a new web address.</p>
                        </div>
                        <div className="category_blogs mt-3">
                            {loading ? <>
                                <div className="wh_100 flex flex-center mt-2 pb-5">
                                    <div className="loader"></div>
                                </div>
                            </> : <>
                                {publishedBlogs.map((item) => {
                                    const firstImageUrl = extractFirstImageUrl(item.description)
                                    return <div className="cate_blog" key={item._id}>
                                      <Link href={`/blog/${item.slug}`}>
                                        <img src={firstImageUrl || "no-image-available.jpg"} alt={item.title}/>
                                      </Link>
                                    <div className="bloginfo mt-2">
                                      <Link href={`/tags/${item.tags[0]}`}>
                                        <div className="blogtag">
                                          {item.tags[0]}
                                        </div>
                                      </Link>
                                      <Link href={`/blog/${item.slug}`}>
                                        <h3>{item.title}</h3>
                                      </Link>
                                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                      <div className="blogauthor flex gap-1">
                                        <div className="blogimg">
                                          <img src="/images/data-engineer.png" alt="coder"/>
                                        </div>
                                        <div className="flex flex-col flex-left gap-5">
                                          <h4>Abaine Dev.</h4>
                                          <span>{new Date(item.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
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
                            </>}
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
        </>
    )
}