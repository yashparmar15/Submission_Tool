const express = require('express');
const { createPost, fetchPost, fetchPosts, isInstructor, addComment, checkEnrolled, uploadAssignment, getAssignments, saveMarks, getSubmittedDetails } = require('../controllers/postControllers');

const router = express.Router()

router.route('/').post(createPost);
router.route('/fetchposts').post(fetchPosts);
router.route('/fetchpost').post(fetchPost);
router.route('/is_instructor').post(isInstructor);
router.route('/add_comment').post(addComment);
router.route('/check_enrolled').post(checkEnrolled);
router.route('/upload_assignment').post(uploadAssignment);
router.route('/assignments').post(getAssignments);
router.route('/save_marks').post(saveMarks);
router.route('/get_submitted_details').post(getSubmittedDetails);
module.exports = router;