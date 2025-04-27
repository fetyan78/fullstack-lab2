import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Ansluten till MongoDB');

    const projektData = [
      {
        project_code: 'P101',
        project_name: 'AI-plattform',
        project_description: 'Bygger ett system för AI-modeller'
      },
      {
        project_code: 'P102',
        project_name: 'E-handel 2.0',
        project_description: 'Moderniserar kundupplevelsen'
      },
      {
        project_code: 'P103',
        project_name: 'Säkerhetsuppgradering',
        project_description: 'Förbättrar systemets säkerhet'
      }
    ];

    await Project.deleteMany(); // Rensa gamla
    await Project.insertMany(projektData);

    console.log('Projekt tillagda!');
    process.exit();
  })
  .catch(err => {
    console.error('Fel vid anslutning:', err);
    process.exit(1);
  });
