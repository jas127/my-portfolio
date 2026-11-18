// Every sprite is an original pixel grid. Each character maps to a palette color.
export type Palette = Record<string, string>;
export type SpriteData = { rows: string[]; palette: Palette };

const COMMON = {
  ink: '#26221C',
  cream: '#FAF3E3',
};

export const CHAR_MAIN: SpriteData = {
  rows: [
    '................',
    '.....HHHHHH.....',
    '....HHHHHHHH....',
    '....HFFFFFFH....',
    '....HFFFFFFH....',
    '....HFEFFEFH....',
    '....HFFFFFFH....',
    '.....FFFFFF.....',
    '.....FFMMFF.....',
    '......FFFF......',
    '....JJJJJJJJ....',
    '...JJFFFFFFJJ...',
    '...JJFFFFFFJJ...',
    '....JJJJJJJJ....',
    '.....PP..PP.....',
    '....PPP..PPP....',
  ],
  palette: {
    H: '#4A3421', // hair, walnut brown
    F: '#F7D8B0', // skin
    E: '#26221C', // eyes
    M: '#D93A26', // smile
    J: '#1F5FBF', // cobalt jacket
    P: '#332E27', // trousers
  },
};

export const CHAR_BLINK: SpriteData = {
  ...CHAR_MAIN,
  rows: CHAR_MAIN.rows.map((r, i) =>
    i === 5 ? '....HFFFFFH....'.slice(0, 12).padEnd(16, '.') : r,
  ).map((r, i) =>
    i === 5 ? '....HFFFFFH.....'.slice(0, 16) : r,
  ),
};

export const CHAR_WALK: SpriteData = {
  ...CHAR_MAIN,
  rows: CHAR_MAIN.rows.map((r, i) =>
    i === 14 ? '....PP...PP.....' : i === 15 ? '...PPP...PPP....' : r,
  ),
};

export const TREE: SpriteData = {
  rows: [
    '....GGGG....',
    '..GGGGGGGG..',
    '.GGLGGGGLGG.',
    '.GGGGGGGGGG.',
    'GGLGGGGGGLGG',
    '.GGGGGGGGGG.',
    '..GGGGGGGG..',
    '....GGGG....',
    '.....KK.....',
    '.....KK.....',
    '.....KK.....',
    '.....KK.....',
    '...KKKKKK...',
  ],
  palette: {
    G: '#3A7A1F',
    L: '#7FB35C',
    K: '#6B4A2E',
  },
};

export const BUSH: SpriteData = {
  rows: ['..GGGG..', '.GGGGGG.', 'GGLGGGGG', 'GGGGGGGG'],
  palette: { G: '#4C9A2A', L: '#A8C98A' },
};

export const CLOUD: SpriteData = {
  rows: [
    '.....WWWWW....',
    '...WWWWWWWWW..',
    '.WWWWWWWWWWWW.',
    'WWWWWWWWWWWWWW',
    '..DDDDDDDDDD..',
  ],
  palette: { W: '#FFFFFF', D: '#E8D9B5' },
};

export const FLAG: SpriteData = {
  rows: [
    '...P............',
    '...PRRRRRRRR....',
    '...PRRRYYRRR....',
    '...PRRRYYRRR....',
    '...PRRRRRRRR....',
    '...P............',
    '...P............',
    '...P............',
    '...P............',
    '...P............',
    '...P............',
    '..PPP...........',
  ],
  palette: { P: '#26221C', R: '#D93A26', Y: '#FFD23F' },
};

export const SIGN: SpriteData = {
  rows: [
    'IIIIIIIIIIIIII',
    'ICCCICCCICCCCI',
    'ICCCICCCICCCCI',
    'ICCCCCCCCCCCCI',
    'IIIIIIIIIIIIII',
    '......PP......',
    '......PP......',
    '......PP......',
    '......PP......',
    '....PPPPPP....',
  ],
  palette: { I: '#26221C', C: '#FAF3E3', P: '#6B6255' },
};

export const CAT: SpriteData = {
  rows: [
    '.E......E.',
    '.EE....EE.',
    '.EEEEEEEE.',
    '.EYEEEEYE.',
    '.EEEEEEEE.',
    '.EEEEEEEE.',
    'GEEEEEEEE.',
    'GEEEEEEEE.',
  ],
  palette: { E: '#26221C', Y: '#FFD23F', G: '#26221C' },
};

export const STAR: SpriteData = {
  rows: ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'],
  palette: { Y: '#FFD23F' },
};

export const HEART: SpriteData = {
  rows: ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'],
  palette: { R: '#D93A26' },
};

export const BULB: SpriteData = {
  rows: ['...Y...', '.YYYYY.', '.YLYYY.', '.YYYYY.', '..YYY..', '..III..', '.IIIII.'],
  palette: { Y: '#FFD23F', L: '#FFE58A', I: '#4A4238' },
};

export const DIAMOND: SpriteData = {
  rows: ['..C..', '.CCC.', 'CLCLC', '.CCC.', '..C..'],
  palette: { C: '#1F5FBF', L: '#8FB8E8' },
};

export const COIN_A: SpriteData = {
  rows: ['.YYYY.', 'YYYYYY', 'YYDYYY', 'YYDYYY', 'YYYYYY', '.YYYY.'],
  palette: { Y: '#FFD23F', D: '#D99A0B' },
};

export const COIN_B: SpriteData = {
  rows: ['..YY..', '..YY..', '..DY..', '..DY..', '..YY..', '..YY..'],
  palette: { Y: '#FFD23F', D: '#D99A0B' },
};

export const SPLAT: SpriteData = {
  rows: [
    '..R...R..',
    '...R.R...',
    '.RRRRRRR.',
    'RRRRRRRRR',
    'RRRRRRRRR',
    '.RRRRRRR.',
    '...R.R...',
    '..R...R..',
  ],
  palette: { R: '#D93A26' },
};

export const TICKET: SpriteData = {
  rows: [
    'IIIIIIIIIIII',
    'IBBBBBBBBBBI',
    'IBYYIBBBBBBI',
    'IBYYIBBBYIBI',
    'IBBBBBBBBIBI',
    'IIIIIIIIIIII',
  ],
  palette: { I: '#26221C', B: '#B0A4E0', Y: '#FFD23F' },
};
