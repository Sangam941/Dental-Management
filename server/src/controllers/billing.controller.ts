import type { Request, Response, NextFunction } from 'express';
import * as billingService from '../service/billing.service.js';

export const createBilling = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billing = await billingService.createBillingService(req.body);
        res.status(201).json({ status: 'success', data: billing });
    } catch (error) {
        next(error);
    }
};

export const getBillings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const billings = await billingService.getBillingsService();
        res.status(200).json({ status: 'success', results: billings.length, data: billings });
    } catch (error) {
        next(error);
    }
};

export const getBillingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billing = await billingService.getBillingByIdService(req.params.billingId as string);
        res.status(200).json({ status: 'success', data: billing });
    } catch (error) {
        next(error);
    }
};

export const updateBilling = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billing = await billingService.updateBillingService(req.params.billingId as string, req.body);
        res.status(200).json({ status: 'success', data: billing });
    } catch (error) {
        next(error);
    }
};

export const deleteBilling = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await billingService.deleteBillingService(req.params.billingId as string);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};
