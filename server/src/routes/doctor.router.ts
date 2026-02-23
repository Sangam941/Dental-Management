import express from 'express';
import {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorAvailability,
} from '../controllers/doctor.controller.js';
import {
    createSchedule,
    getSchedulesByDoctor,
} from '../controllers/doctorSchedule.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    createDoctorSchema,
    updateDoctorSchema,
    doctorIdParamSchema,
} from '../validators/doctor.validator.js';
import { createScheduleSchema } from '../validators/doctorSchedule.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All doctor routes are protected
router.use(protect);

// GET /doctors/availability?day=MON — must be before /:id to avoid conflict
router.get('/availability', getDoctorAvailability);

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

// POST /doctors/:id/schedules
router.post('/:id/schedules', validate(createScheduleSchema), createSchedule);

// GET /doctors/:id/schedules
router.get('/:id/schedules', validate(doctorIdParamSchema), getSchedulesByDoctor);

export default router;
