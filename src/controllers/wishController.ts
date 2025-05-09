import type { Request, Response } from 'express';
import Wish from '../models/wish';

// GET all wishes
export const getWishes = async (req: Request, res: Response) => {
    try {
        const wishes = await Wish.find();
        res.json(wishes);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// POST new wish
export const createWish = async (req: Request, res: Response) => {
    try {
        const { name, wishmess } = req.body;
        const newWish = new Wish({ name, wishmess });
        const savedWish = await newWish.save();
        res.status(201).json(savedWish);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// PUT update wish
export const updateWish = async (req: Request, res: Response) => {
    try {
        const updatedWish = await Wish.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedWish) return res.status(404).json({ message: 'Wish not found' });
        res.json(updatedWish);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// DELETE wish
export const deleteWish = async (req: Request, res: Response) => {
    try {
        const deletedWish = await Wish.findByIdAndDelete(req.params.id);
        if (!deletedWish) return res.status(404).json({ message: 'Wish not found' });
        res.json({ message: 'Wish deleted' });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};
