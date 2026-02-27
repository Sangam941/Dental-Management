import { Router } from 'express';
import * as billingController from '../controllers/billing.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBillingSchema, updateBillingSchema, billingIdParamSchema } from '../validators/billing.validator.js';

const router = Router();

router
    .route('/')
    .post(validate(createBillingSchema), billingController.createBilling)
    .get(billingController.getBillings);

router
    .route('/:billingId')
    .get(validate(billingIdParamSchema), billingController.getBillingById)
    .patch(validate(updateBillingSchema), billingController.updateBilling)
    .delete(validate(billingIdParamSchema), billingController.deleteBilling);

export default router;
