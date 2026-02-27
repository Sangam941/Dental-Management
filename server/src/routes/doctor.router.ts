import express from 'express';
import {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} from '../controllers/doctor.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    createDoctorSchema,
    updateDoctorSchema,
    doctorIdParamSchema,
} from '../validators/doctor.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All doctor routes are protected
router.use(protect);

// POST /doctors
router.post('/', validate(createDoctorSchema), createDoctor);

// GET /doctors
router.get('/', getDoctors);

// GET /doctors/:id
router.get('/:id', validate(doctorIdParamSchema), getDoctorById);

// PATCH /doctors/:id
router.patch('/:id', validate(updateDoctorSchema), updateDoctor);

// DELETE /doctors/:id
router.delete('/:id', validate(doctorIdParamSchema), deleteDoctor);

export default router;
