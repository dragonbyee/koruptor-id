import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { INITIAL_CORRUPTORS, INITIAL_COMMUNITY_UPDATES } from './src/data/corruptorsData';
import { CommunityUpdate, KoruptorProfile } from './src/types/corruption';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory backend database for persistent session updates
let corruptorsDb: KoruptorProfile[] = [...INITIAL_CORRUPTORS];
let communityUpdatesDb: CommunityUpdate[] = [...INITIAL_COMMUNITY_UPDATES];

// API: Get all corruptors
app.get('/api/corruptors', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: corruptorsDb,
  });
});

// API: Get single corruptor by id
app.get('/api/corruptors/:id', (req: Request, res: Response) => {
  const corruptor = corruptorsDb.find((c) => c.id === req.params.id);
  if (!corruptor) {
    return res.status(404).json({ status: 'error', message: 'Koruptor tidak ditemukan' });
  }
  res.json({ status: 'success', data: corruptor });
});

// API: Add new corruptor profile
app.post('/api/corruptors', (req: Request, res: Response) => {
  const newProfile: KoruptorProfile = req.body;
  if (!newProfile || !newProfile.name || !newProfile.pastPosition) {
    return res.status(400).json({ status: 'error', message: 'Data koruptor tidak lengkap' });
  }

  // Ensure unique id
  const profileWithId: KoruptorProfile = {
    ...newProfile,
    id: newProfile.id || `koruptor-${Date.now()}`,
  };

  corruptorsDb = [profileWithId, ...corruptorsDb];

  res.status(201).json({
    status: 'success',
    message: 'Profil koruptor berhasil ditambahkan',
    data: profileWithId,
  });
});

// API: Get all community updates
app.get('/api/community-updates', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: communityUpdatesDb,
  });
});

// API: Submit a new community update request
app.post('/api/community-updates', (req: Request, res: Response) => {
  const { corruptorId, corruptorName, newPosition, companyOrOrg, location, evidenceUrl, evidenceSource, notes, reportedBy } = req.body;

  if (!corruptorId || !newPosition || !evidenceUrl) {
    return res.status(400).json({ status: 'error', message: 'Data laporan tidak lengkap' });
  }

  const newReport: CommunityUpdate = {
    id: `report-${Date.now()}`,
    corruptorId,
    corruptorName: corruptorName || 'Figur Terkait',
    newPosition,
    companyOrOrg: companyOrOrg || '-',
    location: location || '-',
    evidenceUrl,
    evidenceSource: evidenceSource || 'Media Publik',
    notes: notes || '',
    reportedBy: reportedBy || 'WargaPeduliIntegritas',
    reportedAt: 'Hari ini',
    upvotes: 1,
    flags: 0,
    status: 'review',
    userVoted: 'up',
  };

  communityUpdatesDb = [newReport, ...communityUpdatesDb];

  // Update target corruptor count
  corruptorsDb = corruptorsDb.map((c) => {
    if (c.id === corruptorId) {
      return {
        ...c,
        communityUpdatesCount: c.communityUpdatesCount + 1,
        lastUpdatedDate: 'Hari ini',
      };
    }
    return c;
  });

  res.status(201).json({
    status: 'success',
    message: 'Laporan berhasil disimpan di server Express.js',
    data: newReport,
  });
});

// API: Vote on community update (upvote / flag)
app.post('/api/community-updates/:id/vote', (req: Request, res: Response) => {
  const { id } = req.params;
  const { type } = req.body; // 'up' | 'flag'

  let updatedReport: CommunityUpdate | null = null;

  communityUpdatesDb = communityUpdatesDb.map((item) => {
    if (item.id === id) {
      if (type === 'up') {
        item.upvotes += 1;
      } else if (type === 'flag') {
        item.flags += 1;
      }
      updatedReport = item;
    }
    return item;
  });

  if (!updatedReport) {
    return res.status(404).json({ status: 'error', message: 'Laporan tidak ditemukan' });
  }

  res.json({
    status: 'success',
    data: updatedReport,
  });
});

// Start Server with Vite Middleware Mode
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Express.js server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
