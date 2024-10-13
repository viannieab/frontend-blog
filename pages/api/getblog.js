import { mongooseconnent } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {
    const { method } = req
    await mongooseconnent()
    if(method === 'GET') {
        if(req.query?.id) {
            const blog = await Blog.findbyId(req.query.id)
            res.json(blog)
        } else if (req.query?.id.blogCategory) {
            const category = await Blog.find({ blogCategory: req.query.blogCategory })
            res.json(category.reverse())
        } else if (req.query?.id.tags) {
            const tag = await Blog.find({ tags: req.query.tags })
            res.json(tag.reverse())
        } else if (req.query?.id.slug) {
            const url = await Blog.find({ slug: req.query.slug })
            res.json(url.reverse())
        } else {
            //fetch all blogs
            const blogs = await Blog.find()
            res.json(blogs.reverse())
        }
    } else {
        res.status(405).json({
            message: "Method Not Allowed"
        })
    }
}