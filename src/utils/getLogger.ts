import Logger from './logger';

export default function getLogger() {
  let level = process.env.NEXT_PUBLIC_LOGGER_LEVEL;
  if (!level) level = 'ALL';
  return new Logger(level);
}
