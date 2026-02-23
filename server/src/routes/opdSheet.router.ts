import express from 'express';
import {
    createOpdSheet,
    getOpdSheets,
    getOpdSheetById,
    updateOpdSheet,
    deleteOpdSheet,
} from '../controllers/opdSheet.controller.js';
import {
    createOpdEntry,
    getOpdEntries,
} from '../controllers/opdEntry.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    createOpdSheetSchema,
    updateOpdSheetSchema,
    queryOpdSheetSchema,
    opdSheetIdParamSchema,
} from '../validators/opdSheet.validator.js';
import {
    createOpdEntrySchema,
} from '../validators/opdEntry.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All OPD sheet routes are protected
router.use(protect);

// POST /opd-sheets
router.post('/', validate(createOpdSheetSchema), createOpdSheet);

// GET /opd-sheets?startDate=2082-10-01&endDate=2082-11-30&month=FALGUN
router.get('/', validate(queryOpdSheetSchema), getOpdSheets);

// GET /opd-sheets/:id — includes entries
router.get('/:id', validate(opdSheetIdParamSchema), getOpdSheetById);

// PATCH /opd-sheets/:id
router.patch('/:id', validate(updateOpdSheetSchema), updateOpdSheet);

// DELETE /opd-sheets/:id
router.delete('/:id', validate(opdSheetIdParamSchema), deleteOpdSheet);

// POST /opd-sheets/:sheetId/entries
router.post('/:sheetId/entries', validate(createOpdEntrySchema), createOpdEntry);

// GET /opd-sheets/:sheetId/entries?search=...
router.get('/:sheetId/entries', getOpdEntries);

export default router;
