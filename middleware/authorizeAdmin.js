const prisma = require("../config/prismaConfig"); 

async function authorizePostEdit(req, res, next) {
  const user = req.user; 
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (user.role === "ADMIN" || user.id === post.authorId) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = authorizePostEdit;
