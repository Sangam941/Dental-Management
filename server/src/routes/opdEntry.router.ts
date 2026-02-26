import express from 'express';
import {
    createOpdEntry,
    getOpdEntries,
    getOpdEntryById,
    updateOpdEntry,
    deleteOpdEntry,
} from '../controllers/opdEntry.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    createOpdEntrySchema,
    updateOpdEntrySchema,
    opdEntryIdParamSchema,
    getOpdEntriesSchema,
} from '../validators/opdEntry.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All OPD entry routes are protected
router.use(protect);

// POST /opd-entries
router.post('/', validate(createOpdEntrySchema), createOpdEntry);

// GET /opd-entries
router.get('/', validate(getOpdEntriesSchema), getOpdEntries);

// GET /opd-entries/:entryId
router.get('/:entryId', validate(opdEntryIdParamSchema), getOpdEntryById);

// PATCH /opd-entries/:entryId
router.patch('/:entryId', validate(updateOpdEntrySchema), updateOpdEntry);

// DELETE /opd-entries/:entryId
router.delete('/:entryId', validate(opdEntryIdParamSchema), deleteOpdEntry);

export default router;
