import { TOKEN as jto } from './configs/jto.config';
import { TOKEN as jup } from './configs/jup.config';
import { TOKEN as met } from './configs/met.config';
import { TOKEN as pump } from './configs/pump.config';
import { TOKEN as z2 } from './configs/2z.config';
export const HUBS = { jto, jup, met, pump, '2z': z2 };
export const getHub = (slug) => HUBS[slug] || null;
