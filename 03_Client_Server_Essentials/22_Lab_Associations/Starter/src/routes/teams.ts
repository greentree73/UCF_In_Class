import { Router, Request, Response } from 'express';
import { Team, Superhero } from '../models';

const router = Router();

// ============================================
// GET ALL TEAMS WITH MEMBERS
// ============================================
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Superhero,
          as: 'members',
          through: { attributes: [] }
        }
      ]
    });

    res.json(teams);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching teams', error: error.message });
  }
});

// ============================================
// GET SINGLE TEAM WITH MEMBERS
// ============================================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        {
          model: Superhero,
          as: 'members',
          through: { attributes: [] }
        }
      ]
    });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching team', error: error.message });
  }
});

// ============================================
// CREATE TEAM
// ============================================
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const team = await Team.create({
      name,
      description
    });

    res.status(201).json(team);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating team', error: error.message });
  }
});

export default router;
