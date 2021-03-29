const router = require('express').Router();
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost } = require('../../controller/posts.controller');


router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


module.exports = router;