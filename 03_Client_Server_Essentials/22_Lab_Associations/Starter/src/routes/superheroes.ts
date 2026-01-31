import { Router, Request, Response } from 'express';
import { Superhero, Power, Team } from '../models';

const router = Router();

// ============================================
// GET ALL SUPERHEROES WITH POWERS AND TEAMS
// ============================================
router.get('/', async (req: Request, res: Response) => {
  try {
    const superheroes = await Superhero.findAll({
      include: [
        {
          model: Power,
          as: 'powers'
        },
        {
          model: Team,
          as: 'teams'
        }
      ]
    });

    res.json(superheroes);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching superheroes', error: error.message });
  }
});

// ============================================
// GET SINGLE SUPERHERO WITH ALL RELATIONS
// ============================================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id, {
      include: [
        {
          model: Power,
          as: 'powers'
        },
        {
          model: Team,
          as: 'teams'
        }
      ]
    });

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    res.json(superhero);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching superhero', error: error.message });
  }
});

// ============================================
// CREATE SUPERHERO
// ============================================
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, alias, powerLevel } = req.body;

    const superhero = await Superhero.create({
      name,
      alias,
      powerLevel: powerLevel || 50
    });

    res.status(201).json(superhero);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating superhero', error: error.message });
  }
});

// ============================================
// ADD POWER TO SUPERHERO
// ============================================
router.post('/:id/powers', async (req: Request, res: Response) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    const { name, description, damage } = req.body;

    const power = await Power.create({
      name,
      description,
      damage: damage || 10,
      superheroId: superhero.id
    });

    res.status(201).json(power);
  } catch (error: any) {
    res.status(500).json({ message: 'Error adding power', error: error.message });
  }
});

// ============================================
// JOIN SUPERHERO TO TEAM
// ============================================
router.post('/:superheroId/teams/:teamId', async (req: Request, res: Response) => {
  try {
    const superhero = await Superhero.findByPk(req.params.superheroId);
    const team = await Team.findByPk(req.params.teamId);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    await (superhero as any).addTeam(team);

    const updatedSuperhero = await Superhero.findByPk(superhero.id, {
      include: [{ model: Team, as: 'teams' }]
    });

    res.json(updatedSuperhero);
  } catch (error: any) {
    res.status(500).json({ message: 'Error joining team', error: error.message });
  }
});

// ============================================
// GET SUPERHERO'S POWERS ONLY
// ============================================
router.get('/:id/powers', async (req: Request, res: Response) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    const powers = await (superhero as any).getPowers();

    res.json(powers);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching powers', error: error.message });
  }
});

// ============================================
// DELETE SUPERHERO (CASCADE DELETE POWERS)
// ============================================
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    await superhero.destroy();

    res.json({ message: 'Superhero and all powers deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting superhero', error: error.message });
  }
});

export default router;
