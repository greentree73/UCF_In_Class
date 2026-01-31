import { Router, Request, Response } from 'express';
import { Character, Weapon, Guild } from '../models';

const router = Router();

// ============================================
// GET ALL CHARACTERS WITH WEAPONS
// ============================================
// Demonstrates: One-to-Many include
router.get('/', async (req: Request, res: Response) => {
  try {
    const characters = await Character.findAll({
      include: [
        {
          model: Weapon,
          as: 'weapons'
        },
        {
          model: Guild,
          as: 'guilds'
        }
      ]
    });

    res.json(characters);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching characters', error: error.message });
  }
});

// ============================================
// GET SINGLE CHARACTER WITH ALL RELATIONS
// ============================================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByPk(req.params.id, {
      include: [
        {
          model: Weapon,
          as: 'weapons'
        },
        {
          model: Guild,
          as: 'guilds'
        }
      ]
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.json(character);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching character', error: error.message });
  }
});

// ============================================
// CREATE CHARACTER
// ============================================
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, class: characterClass, level, health } = req.body;

    const character = await Character.create({
      name,
      class: characterClass,
      level: level || 1,
      health: health || 100
    });

    res.status(201).json(character);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating character', error: error.message });
  }
});

// ============================================
// ADD WEAPON TO CHARACTER
// ============================================
// Demonstrates: Creating related records
router.post('/:id/weapons', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByPk(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    const { name, type, damage } = req.body;

    const weapon = await Weapon.create({
      name,
      type,
      damage: damage || 10,
      characterId: character.id
    });

    res.status(201).json(weapon);
  } catch (error: any) {
    res.status(500).json({ message: 'Error adding weapon', error: error.message });
  }
});

// ============================================
// JOIN CHARACTER TO GUILD
// ============================================
// Demonstrates: Many-to-Many association
router.post('/:characterId/guilds/:guildId', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByPk(req.params.characterId);
    const guild = await Guild.findByPk(req.params.guildId);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    if (!guild) {
      return res.status(404).json({ message: 'Guild not found' });
    }

    // Use the association method to add the guild
    await (character as any).addGuild(guild);

    // Fetch updated character with guilds
    const updatedCharacter = await Character.findByPk(character.id, {
      include: [{ model: Guild, as: 'guilds' }]
    });

    res.json(updatedCharacter);
  } catch (error: any) {
    res.status(500).json({ message: 'Error joining guild', error: error.message });
  }
});

// ============================================
// GET CHARACTER'S WEAPONS ONLY
// ============================================
// Demonstrates: Using association methods
router.get('/:id/weapons', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByPk(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // Use the association method
    const weapons = await (character as any).getWeapons();

    res.json(weapons);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching weapons', error: error.message });
  }
});

// ============================================
// DELETE CHARACTER (CASCADE DELETE WEAPONS)
// ============================================
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByPk(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // This will also delete all weapons due to CASCADE
    await character.destroy();

    res.json({ message: 'Character and all weapons deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting character', error: error.message });
  }
});

export default router;
