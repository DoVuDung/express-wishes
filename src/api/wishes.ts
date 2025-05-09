import type { NowResponse } from '@vercel/node';
import type { NowRequest } from '@vercel/node';
import mongoose from 'mongoose';
import Wish from '../models/wish';

// MongoDB URI (ensure it's set in your .env)
const mongoUri = process.env.MONGO_URI as string;

// Connect to MongoDB
mongoose.connect(mongoUri);

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const wishes = await Wish.find();
        return res.status(200).json(wishes);
      } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
      }

    case 'POST':
      try {
        const { name, wishmess } = req.body;
        const newWish = new Wish({ name, wishmess });
        await newWish.save();
        return res.status(201).json(newWish);
      } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
      }

    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
