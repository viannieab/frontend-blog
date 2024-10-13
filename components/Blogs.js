import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import MarkdownEditor from "react-markdown-editor-lite"
import ReactMarkdown from "react-markdown"
import 'react-markdown-editor-lite/lib/index.css'

export default function Blog(
    {
       _id,
       title: existingTitle,
       slug: existingSlug,
       blogCategory: existingBlogCategory,
       description: existingDescription,
       tags: existingTags,
       status: existingStatus,
    }
){
    const [redirect, SetRedirect] = useState(false)
    const router = useRouter()

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [blogCategory, setBlogCategory] = useState(existingBlogCategory || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || '')
    const [status, setStatus] = useState(existingStatus || '')
    
    async function createProduct(ev) {
        ev.preventDefault()
        const data = {title, slug, description, blogCategory, tags, status} 
        if(_id) {
            await axios.put('/api/blogapi', {...data, _id})
        } else {
            await axios.post('/api/blogapi', data)
        }
        SetRedirect(true)
    }
    if(redirect){
        router.push('/')
        return null
    }
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value
        const newSlug = inputValue.replace(/\s+/g, '-')
        setSlug(newSlug)
    }
    return(
        <>
            <form onSubmit={createProduct} className="addWebsiteform">
                {/* blog title */}
                <div className="w-100 flex flex-col flex-left mb-2"  data-aos="fade-up">
                    <label htmlFor="title">Title</label>
                    <input type="text" 
                        placeholder="Enter small title"
                        value={title}
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/* blog slug */}
                <div className="w-100 flex flex-col flex-left mb-2"  data-aos="fade-up">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" 
                        id="slug" 
                        placeholder="Enter slug url" required
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>
                {/* blog category */}
                <div className="w-100 flex flex-col flex-left mb-2"  data-aos="fade-up">
                    <label htmlFor="category">Category</label>
                    <select name="category" 
                        id="category" 
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, option => option.value))}
                        multiple
                    >
                        <option value="htmlcssjs">Html, CSS, & JavaScript</option>
                        <option value="nextjs">Next Js, React Js, & Node Js</option>
                        <option value="databases">Databases</option>
                        <option value="deployment">Deployment</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">
                        selected: {Array.isArray(existingBlogCategory) && existingBlogCategory.map(category => (
                            <span>{category}</span>
                        ))}

                    </p>
                </div>
                {/* markdown description content */}
                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="desciption">Blog Content</label>
                    <MarkdownEditor
                        value={description}
                        onChange={(ev) =>setDescription(ev.text)}
                        style={{width: '100%', height: '400px'}}
                        renderHTML={(text) => (
                            <ReactMarkdown components={{
                                code: ({node, inline, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    if(inline){
                                        return <code>{children}</code>
                                    } else if(match) {
                                        return (
                                            <div style={{position: 'relative'}}>
                                                <pre style={{padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap'}} {...props}>
                                                    <code>{children}</code>
                                                </pre>
                                                <button style={{position: 'absolute', top: '0', right: '0', zIndex: '1'}}
                                                    onClick={() => navigator.clipboard.writeText(children)}
                                                >
                                                    copy code
                                                </button>
                                            </div>
                                        )
                                    } else{
                                        return <code {...props}>
                                            {children}
                                        </code>
                                    }
                                }
                            }}>
                                {text}
                            </ReactMarkdown>
                        )}
                    />
                </div>
                {/* blog tags */}
                <div className="w-100 flex flex-col flex-left mb-2"  data-aos="fade-up">
                    <label htmlFor="tags">Tags</label>
                    <select name="tags" 
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
                        multiple
                    >
                        <option value="html">Html</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="nextjs">Next Js</option>
                        <option value="mongodb">MongoDB</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">
                        selected: {Array.isArray(existingTags) && existingTags.map(tags => (
                            <span>{tags}</span>
                        ))}
                    </p>
                </div>
                {/* status */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select name="status" 
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">No Select</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">
                        selected: <span>{existingStatus}</span>
                    </p>
                </div>
                {/* save button */}
                <div className="w-100 mb-2">
                    <button type="submit" className="w-100 addwebbtn flex-center">
                        SAVE BLOG
                    </button>
                </div>
            </form>
        </>
    )
}