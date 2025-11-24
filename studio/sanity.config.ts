import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'virelia-cms',
  title: 'Virelia CMS',
  projectId,
  dataset,
  basePath: '/',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
