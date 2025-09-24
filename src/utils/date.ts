import { format, parseISO } from 'date-fns';
import { execSync } from 'child_process';

export const formatDate = (date: Date | string | number, formatStr: string): string => {
  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'string') {
    parsedDate = parseISO(date); // Assure que la chaîne est correctement analysée en tant que date
  } else if (typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    throw new Error('Invalid date type');
  }

  return format(parsedDate, formatStr);
};

// Fonction pour récupérer la date du dernier commit Git
const getLastCommitDate = (): Date => {
  try {
    // Récupère la date du dernier commit au format ISO
    const gitCommand = 'git log -1 --format=%cI';
    const lastCommitDateStr = execSync(gitCommand, {
      encoding: 'utf8',
      cwd: process.cwd()
    }).trim();

    return new Date(lastCommitDateStr);
  } catch (error) {
    console.warn('Impossible de récupérer la date du dernier commit Git:', error);
    // Fallback sur la date actuelle si Git n'est pas disponible
    return new Date();
  }
};

// Fonction pour obtenir la date de dernière mise à jour du site
export const getLastUpdateDate = (): string => {
  const lastUpdate = getLastCommitDate();
  return formatDate(lastUpdate, 'dd/MM/yyyy');
};

// Fonction pour obtenir la date de dernière mise à jour avec l'heure
export const getLastUpdateDateTime = (): string => {
  const lastUpdate = getLastCommitDate();
  return formatDate(lastUpdate, 'dd/MM/yyyy à HH:mm');
};

// Fonction pour récupérer le hash court du dernier commit
export const getLastCommitHash = (): string => {
  try {
    const gitCommand = 'git log -1 --format=%h';
    return execSync(gitCommand, {
      encoding: 'utf8',
      cwd: process.cwd()
    }).trim();
  } catch (error) {
    console.warn('Impossible de récupérer le hash du dernier commit:', error);
    return 'unknown';
  }
};

// Fonction pour récupérer des informations complètes sur la dernière mise à jour
export const getLastUpdateInfo = () => {
  const date = getLastCommitDate();
  const hash = getLastCommitHash();

  return {
    date: formatDate(date, 'dd/MM/yyyy'),
    dateTime: formatDate(date, 'dd/MM/yyyy à HH:mm'),
    hash,
    timestamp: date.getTime()
  };
};
