import { Router } from 'express';
import mongoose from 'mongoose';
import Wish from '../models/wish';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wishes
 *   description: API for managing wishes
 */

/**
 * @swagger
 * /v1/wishes:
 *   get:
 *     summary: Get all wishes
 *     tags: [Wishes]
 *     responses:
 *       200:
 *         description: List of wishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wish'
 */
router.get('/', async (req, res) => {
  try {
    const wishes = await Wish.find();
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * @swagger
 * /v1/wishes:
 *   post:
 *     summary: Create a new wish
 *     tags: [Wishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishInput'
 *     responses:
 *       201:
 *         description: Wish created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wish'
 */
router.post('/', async (req, res) => {
  try {
    const { name, wishmess } = req.body;
    const newWish = new Wish({ name, wishmess });
    await newWish.save();
    res.status(201).json(newWish);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * @swagger
 * /v1/wishes/{id}:
 *   put:
 *     summary: Update an existing wish
 *     tags: [Wishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Wish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishInput'
 *     responses:
 *       200:
 *         description: Wish updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wish'
 *       404: 
 *         description: Wish not found
 */
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid wish ID format' });
//   }

//   try {
//     const updatedWish = await Wish.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedWish) {
//       return res.status(404).json({ error: 'Wish not found' });
//     }
//     res.json(updatedWish);
//   } catch (err) {
//     res.status(500).json({ error: (err as Error).message });
//   }
// });

/**
 * @swagger
 * /v1/wishes/{id}:
 *   delete:
 *     summary: Delete a wish
 *     tags: [Wishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Wish ID
 *     responses:
 *       200:
 *         description: Wish deleted successfully
 *       404:
 *         description: Wish not found
 */
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid wish ID format' });
//   }

//   try {
//     const deletedWish = await Wish.findByIdAndDelete(id);
//     if (!deletedWish) {
//       return res.status(404).json({ error: 'Wish not found' });
//     }
//     res.json({ message: 'Wish deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: (err as Error).message });
//   }
// });

export default router;
