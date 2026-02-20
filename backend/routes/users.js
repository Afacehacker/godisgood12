const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../utils/auth');

const prisma = new PrismaClient();

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                avatar: true,
                posts: {
                    include: {
                        author: { select: { id: true, name: true } },
                        likes: true,
                        comments: {
                            include: { user: { select: { id: true, name: true } } },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
    const { name, bio, avatar } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: req.userId },
            data: { name, bio, avatar },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                avatar: true,
            },
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search users
router.get('/search/:query', async (req, res) => {
    const { query } = req.params;

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { email: { contains: query } },
                ],
            },
            select: {
                id: true,
                name: true,
                avatar: true,
            },
            limit: 10,
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
