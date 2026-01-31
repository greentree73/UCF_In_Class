import { Router, Request, Response } from 'express';
import { Guild, Character } from '../models';

const router = Router();

// ============================================
// GET ALL GUILDS WITH MEMBERS
// ============================================
router.get('/', async (req: Request, res: Response) => {
  try {
    const guilds = await Guild.findAll({
      include: [
        {
          model: Character,
          as: 'members',
          through: { attributes: [] } // Don't include junction table data
        }
      ]
    });

    res.json(guilds);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching guilds', error: error.message });
  }
});

// ============================================
// GET SINGLE GUILD WITH MEMBERS
// ============================================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const guild = await Guild.findByPk(req.params.id, {
      include: [
        {
          model: Character,
          as: 'members',
          through: { attributes: [] }
        }
      ]
    });

    if (!guild) {
      return res.status(404).json({ message: 'Guild not found' });
    }

    res.json(guild);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching guild', error: error.message });
  }
});

// ============================================
// CREATE GUILD
// ============================================
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const guild = await Guild.create({
      name,
      description
    });

    res.status(201).json(guild);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating guild', error: error.message });
  }
});

export default router;
