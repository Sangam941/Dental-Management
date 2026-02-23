import express from 'express';
import {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment,
} from '../controllers/department.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    createDepartmentSchema,
    updateDepartmentSchema,
    departmentIdParamSchema,
} from '../validators/department.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All department routes are protected
router.use(protect);

// POST /departments — Create a department
router.post('/', validate(createDepartmentSchema), createDepartment);

// GET /departments — List all departments (?activeOnly=true to filter)
router.get('/', getDepartments);

// PATCH /departments/:id — Update a department
router.patch('/:id', validate(updateDepartmentSchema), updateDepartment);

// DELETE /departments/:id — Soft delete a department
router.delete('/:id', validate(departmentIdParamSchema), deleteDepartment);

export default router;
