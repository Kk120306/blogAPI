const prisma = require("../config/prismaConfig");

async function getUserPosts(req, res) {
    const id = req.user.id;
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        const [userPost, total] = await Promise.all([
            prisma.post.findMany({
                where: { authorId: id },
                orderBy: { createdAt: "desc" },
                take: limit,
            }),
            prisma.post.count({
                where: { authorId: id }
            })
        ]);

        res.json({ userPost, total });
    } catch (err) {
        console.error("Something failed : ", err);
        res.status(500).json({ error: "Could not get posts " });
    }
}

async function createPost(req, res) {
    const id = req.user.id;
    const { title, content, published } = req.body;

    if (!title || !content) {
        res.status(400).json({ error: "Fields are missing" });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: id,
                published,
            }
        })

        res.status(201).json({ post: newPost })
    } catch (err) {
        console.error("Something went wrong: ", err);
        res.status(500).json({ error: "Could not create post." });
    }
}

async function editPost(req, res) {
    const id = req.params.id;
    const { title, content, published } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(content && { content }),
                ...(published !== undefined && { published }),
            },
        });

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Post update failed:", err);
        return res.status(500).json({ error: "Failed to update post" });
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id;

        await prisma.post.delete({
            where: { id: postId },
        });

        res.json({
            message: "Post deleted",
        });
    } catch (error) {
        res.status(500).json({
            error: "Could not delete post.",
        });
    }
}

module.exports = {
    deletePost,
    editPost,
    createPost,
    getUserPosts
}