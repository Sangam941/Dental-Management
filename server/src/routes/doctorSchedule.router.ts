import express from 'express';
import {
    updateSchedule,
    deleteSchedule,
} from '../controllers/doctorSchedule.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    updateScheduleSchema,
    scheduleIdParamSchema,
} from '../validators/doctorSchedule.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All schedule routes are protected
router.use(protect);

// PATCH /doctor-schedules/:scheduleId
router.patch('/:scheduleId', validate(updateScheduleSchema), updateSchedule);

// DELETE /doctor-schedules/:scheduleId
router.delete('/:scheduleId', validate(scheduleIdParamSchema), deleteSchedule);

export default router;
