const express = require('express');
const { addClass, joinClass, enrolledClasses, teachingClasses, getClassDetails,
         unenrollClass, removeClass, getEnrolledStudents, getInstructor } = 
         require('../controllers/classControllers');

const router = express.Router()

router.route('/').post(addClass);
router.route('/join').post(joinClass);
router.route('/enrolled').post(enrolledClasses);
router.route('/teaching').post(teachingClasses);
router.route('/get_details').post(getClassDetails);
router.route('/unenroll').post(unenrollClass);
router.route('/remove').post(removeClass);
router.route('/get_enrolled_students').post(getEnrolledStudents);
router.route('/get_instructor').post(getInstructor);

module.exports = router;