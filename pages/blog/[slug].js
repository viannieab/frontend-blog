import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import ReactMarkdown from "react-markdown"
import SyntaxHighlighter, { Prism as syntaxHighlighter } from "react-syntax-highlighter"
import {allyDark} from "react-syntax-highlighter/dist/cjs/styles/prism"
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark"
import remarkGfm from "remark-gfm"

export default function blogPage(){
    const router = useRouter()
    const {slug} = router.query

    const [blog, setBlog] = useState([''])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(slug) {
            axios.get(`/api/getblog?slug=${slug}`).then(res => {
                const alldata = res.data
                setBlog(alldata)
                setLoading(false)
            }).catch(error => {
                console.error("error fetching blog", error)
            })
        }
    }, [slug])
    const Code = ({node, inline, className, chilren, ...props}) => {
        const match =/language-(\w+)/.exec(className || '')

        const [copied, setCopied] = useState()
        const handleCopy = () => {
            navigator.clipboard.writeText(chilren)
            setCopied(true)
            setTimeout(() =>{
            setCopied(false)
            }, 3000)

            if(inline) {
                return <div>{chilren}</div>
            } else if(match){
                return(
                  <div style={{position: 'relative'}}>
                    <SyntaxHighlighter style={allyDark}
                        language={match[1]}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{style: {padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap'}}}
                    >
                        {style(chilren).replace(/\m$/, '')}
                    </SyntaxHighlighter>
                    <button style={{position: 'absolute', top: '0', right: '0', zIndex: '1',
                        background: '#3d3d3d', color: '#fff', padding: '10px'
                    }} onClick={handleCopy}>
                        {copied ? 'Copied' : 'Copy code'}
                    </button>
                  </div>  
                )
            }else{
                return(
                    <code className="md-post-code" {...props}>
                        {chilren}
                    </code>
                )
            }
        }
    }
    return(
        <>
            <div className="slugpage">
                <div className="container">
                    <div className="topslug_title">
                        <h1 className="slugtitle">
                            {loading ? <div>loading...</div> : blog && blog[0]?.title}
                        </h1>
                        <h5>By <span>Abaine Dev</span>. published in <span>{
                                loading ? <div>loading...</div> : blog && blog[0]?.blogCategory
                            }</span> . {blog && new Date([0].createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                            <span>. 1 min read</span>
                            </h5>
                    </div>
                    <div className="flex flex-sb flex-left pb-5 flex-wrap">
                        <div className="leftblog_data_markdown">
                            { loading ? <div className="wh-100 flex flex-center mt-3">
                                <div className="loader"></div>
                            </div> : <>
                                <div className="w-100 blogcontainer">
                                    <ReactMarkdown remarkPlugins={remarkGfm}
                                        components={{
                                            code: Code,
                                        }}
                                    >
                                        {blog[0].description}
                                    </ReactMarkdown>
                                </div>
                            </>}
                        </div>
                        <div className="rightslug_data">
                            <div className="slug_profile_info">
                                <div className="slugprofile_sec">
                                    <div className="profile_imgbg"></div>
                                    <div className="slug_profile_img">
                                        <div className="image_bg_top0"></div>
                                        <div className="image_bg_top1"></div>
                                        <img src="/images/data-engineer.png" alt="coder"/>
                                    </div>
                                </div>
                                <h3>Abaine Dev</h3>
                                <h4>Data Engineer</h4>
                                <div className="social_talks flex flex-center gap-1 mt-2">
                                    <div className="st_icon">
                                        <FaGithub/>
                                    </div>
                                    <div className="st_icon">
                                        <FaLinkedin/>
                                    </div>
                                    <div className="st_icon">
                                        <FaInstagram/>
                                    </div>
                                    <div className="st_icon">
                                        <FaThreads/>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}