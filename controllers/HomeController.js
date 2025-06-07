const prisma = require("../config/prismaConfig");

async function getAllBlog(req, res) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                orderBy: { updatedAt: "desc" },
                take: limit
            }),
            prisma.post.count()
        ]);

        res.json({ posts, total });

    } catch (err) {
        console.error("There was a error retriving blog posts: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getBlogById(req, res) {
    try {
        const id = req.params.id
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });

        res.json({ post });
    } catch (err) {
        console.error("Could not find blog post: ", err);
        res.status(500).json({ error: "Error fetching post." });
    }
}

async function getBlogComments(req, res) {
    const postId = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { comments: true }
        });

        if (!post) {
            return res.status(400).json({ error: "Post not found" });
        }

        res.json({ comments: post.comments });
    } catch (err) {
        console.error("Error fetching comments: ", err);
        res.status(500).json({ error: "Failed to fetch comments " });
    }
}

async function createBlogComment(req, res) {
    const postId = req.params.id;
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "Name or message is missing." });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post) {
            return res.status(400).json({ error: "Post not found." });
        }

        const newComment = await prisma.comment.create({
            data: {
                name,
                message,
                postId
            }
        })

        res.status(201).json({ comment: newComment });
    } catch (err) {
        console.error("Error posting comment: ", err);
        res.status(500).json({ error: "Failed to post comment" });
    }
}



module.exports = {
    getAllBlog,
    getBlogById,
    getBlogComments,
    createBlogComment
}