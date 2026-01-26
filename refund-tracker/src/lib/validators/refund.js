import { z } from 'zod'

export const createRefundSchema = z.object({
    ticketId: z.string().min(3),
    operator: z.string().min(2),
    platform: z.string().min(2),
    amount: z.number().int().positive(),
})

export const updateRefundStatusSchema = z.object({
    status: z.enum(['INITIATED', 'APPROVED', 'PROCESSED', 'COMPLETED']),
})
