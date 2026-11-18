export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  short: string;
  description: string;
  objective: string;
  whyItMatters: string;
  contribution: string[];
  data: string;
  tools: string[];
  approach: string[];
  implementation: string;
  results: string[];
  limitations: string;
  learned: string;
  github?: string;
  color: string;
  marker: string;
};

export const siteContent = {
  owner: {
    firstName: 'Jasmitha',
    fullName: 'Jasmitha Kancharlapalli',
    role: 'Aspiring analyst, researcher, builder and lifelong learner.',
    status: 'OPEN TO OPPORTUNITIES',
    opportunityLine:
      'Currently looking for internships, research collaborations, interesting projects and opportunities to learn, contribute and build.',
    email: '',
    linkedin: '',
    resume: '',
  },
  hero: {
    support:
      "I'm interested in how things work, why people make decisions, how data reveals patterns and how ideas turn into real things. I enjoy exploring different fields, experimenting with technology and learning something new along the way.",
    messages: [
      "Oh, what's this?",
      'Currently figuring this out.',
      'New side quest unlocked!',
      "Let's explore.",
      'Open to interesting opportunities.',
    ],
  },
  projects: [
    {
      id: 'movie-intelligence',
      number: '01',
      title: 'Movie Intelligence',
      category: 'Data Analytics / Predictive Modelling',
      short: 'Exploring how movie characteristics and audience sentiment relate to performance.',
      description:
        'An analytical study of movie performance and sentiment, exploring how movie characteristics and audience sentiment relate to movie success.',
      objective:
        'Understand whether information available before release can explain or help estimate movie performance.',
      whyItMatters:
        'Entertainment decisions are made with incomplete information. Studying the signals behind performance is a useful exercise in separating patterns from overconfident prediction.',
      contribution: [
        'Cleaned and prepared a dataset of approximately 5,000 movie titles spanning 2000–2024.',
        'Applied VADER sentiment analysis to audience text.',
        'Built and evaluated a pre-release movie success prediction workflow.',
        'Added validation rules and tests to make assumptions visible.',
      ],
      data: 'Approximately 5,000 movie titles spanning 2000–2024, with movie characteristics and audience sentiment inputs.',
      tools: ['Python', 'Pandas', 'VADER', 'Predictive modelling', 'Validation testing'],
      approach: [
        'Preprocess and clean the available movie data.',
        'Score text sentiment with VADER.',
        'Create pre-release features and train a predictive model.',
        'Evaluate performance, validate assumptions and test the workflow.',
      ],
      implementation:
        'The project combines a data preparation layer, sentiment scoring, pre-release feature construction, model evaluation and a validation suite.',
      results: [
        'VADER evaluation accuracy: 63.57%.',
        'Pre-release model R²: 0.2274.',
        '17 validation rules.',
        '11 tests.',
      ],
      limitations:
        'The predictive model has limited explanatory power and should not be treated as a reliable commercial success predictor. A low R² means the available pre-release variables explain only part of the variation in outcomes.',
      learned:
        'A model can be technically complete and still have modest predictive value. Evaluation, validation and communicating limits are part of the analytical work.',
      github: 'https://github.com/jas127/Movie-Predection-Sentiment-Analysis',
      color: '#FF4C35',
      marker: 'film',
    },
    {
      id: 'ceo-in-a-box',
      number: '02',
      title: 'CEO in a Box',
      category: 'AI / Business Strategy / Decision Support',
      short: 'A concept for examining company decisions through different executive perspectives.',
      description:
        'An AI-powered business decision-support concept that explores company decisions through different executive perspectives.',
      objective:
        'Structure a business question by looking at it through multiple role-based perspectives instead of relying on one undifferentiated answer.',
      whyItMatters:
        'Business decisions often carry competing priorities. A finance, product, marketing or operations lens can surface different questions before a team commits to a direction.',
      contribution: [
        'Framed the decision-support concept around company and executive-persona combinations.',
        'Designed a scope of 14 companies, 10 personas per company and 140 configurations.',
        'Explored how AI could organise perspectives without presenting them as unquestionable advice.',
      ],
      data: 'The reported scope is 14 companies, 10 personas per company and 140 company-persona configurations.',
      tools: ['AI workflow design', 'Business strategy', 'Persona framing', 'Decision support'],
      approach: [
        'Define a company context and the decision being considered.',
        'Generate role-specific perspectives and questions.',
        'Compare the perspectives to identify tensions, assumptions and follow-up work.',
      ],
      implementation:
        'The concept is organised around a company context, a selected executive perspective and a structured response that supports human discussion.',
      results: [
        '14 companies represented in the concept scope.',
        '10 personas per company.',
        '140 company-persona configurations.',
      ],
      limitations:
        'This is a decision-support concept. No financial results, business adoption or proven improvement in decision quality are being claimed.',
      learned:
        'AI is more useful in strategy when it expands the questions a team asks, rather than pretending to replace judgement.',
      color: '#7049C6',
      marker: 'briefcase',
    },
    {
      id: 'revive-ai',
      number: '03',
      title: 'Revive AI',
      category: 'AI / Revenue Intelligence / Decision Support',
      short: 'Exploring how at-risk payments can be identified and recovery actions considered.',
      description:
        'A payment and revenue recovery intelligence project exploring how at-risk transactions can be identified and how policy-governed recovery actions can be considered.',
      objective:
        'Turn transaction signals into a prioritised recovery conversation while keeping actions governed by explicit policy.',
      whyItMatters:
        'Revenue recovery sits at the intersection of analytics, customer experience and operational judgement. The useful question is not only what is at risk, but what action is appropriate.',
      contribution: [
        'Explored an analytical logic for identifying at-risk transactions.',
        'Connected risk signals to policy-governed recovery options.',
        'Framed the output as decision support rather than automatic intervention.',
      ],
      data: 'A simulated dataset containing 300+ transactions and ₹32.8 lakh in simulated at-risk revenue.',
      tools: ['Python', 'Revenue intelligence', 'Decision rules', 'AI workflow prototyping'],
      approach: [
        'Represent transaction-level risk and recovery context.',
        'Identify transactions that deserve attention.',
        'Evaluate possible recovery paths against policy constraints.',
        'Summarise expected recovery as a simulated scenario.',
      ],
      implementation:
        'The workflow links transaction signals, risk prioritisation and policy-aware recommendations so a person can review the reasoning before acting.',
      results: [
        '300+ simulated transactions.',
        '₹32.8 lakh simulated at-risk revenue.',
        '53.85% simulated recovery.',
      ],
      limitations:
        'All figures are simulated. They are not real business transactions and no actual revenue was recovered. The simulated recovery rate must not be read as a production result.',
      learned:
        'Decision-support systems need boundaries. Making the policy visible is as important as making the prediction interesting.',
      color: '#D8EF40',
      marker: 'signal',
    },
    {
      id: 'deepfake-detection',
      number: '04',
      title: 'Deepfake Detection',
      category: 'Machine Learning / Computer Vision',
      short: 'An experiment in frame sampling, image classification and explainable detection.',
      description:
        'An experimental deepfake detection system exploring video frame sampling and image classification.',
      objective:
        'Study how a video can be converted into analysable frames and how an image classifier can support a detection workflow.',
      whyItMatters:
        'Detection systems are used in a context where people need to understand why a model is suspicious. Explainability matters when a prediction can affect trust.',
      contribution: [
        'Worked with a frame-sampling pipeline for video inputs.',
        'Explored EfficientNet-B0 for image classification.',
        'Used Grad-CAM to inspect which regions influenced a prediction.',
        'Connected the model to a Flask interface for experimentation.',
      ],
      data: 'Video inputs converted into sampled frames for image-level classification.',
      tools: ['EfficientNet-B0', 'Grad-CAM', 'Frame sampling', 'Flask'],
      approach: [
        'Sample frames from a video.',
        'Run frames through an image classification model.',
        'Aggregate the evidence as part of a detection workflow.',
        'Use Grad-CAM to inspect model attention.',
      ],
      implementation:
        'The pipeline connects video preprocessing, frame-level inference, explainability and a lightweight Flask interface.',
      results: ['An experimental detection workflow was explored.', 'Accuracy metrics are not reported here.'],
      limitations:
        'No accuracy metric is being claimed. Robust evaluation would require a clearly defined dataset, split, baseline and error analysis.',
      learned:
        'A prediction is more useful when the person reviewing it can inspect the evidence behind it.',
      color: '#F4A8D0',
      marker: 'lens',
    },
  ] as Project[],
  sideQuests: [
    {
      title: 'RaSoR, IIT Madras',
      role: 'Coordinator, PR & Outreach Department',
      color: '#7049C6',
      summary:
        'Coordinating the people and communication behind a research community is a different kind of systems problem.',
      details: [
        'Coordinate the PR & Outreach department.',
        'Oversee PR & Outreach, Design & UI/UX and Event Management teams.',
        'Assign responsibilities and coordinate execution.',
        'Support recruitment and onboarding.',
        'Manage communication, timelines and content review.',
        'Support research events and community initiatives.',
      ],
      lesson: 'Ownership is often about making it easier for other people to do their best work.',
    },
    {
      title: 'Paradox 2026',
      role: 'Deputy Event Head',
      color: '#FF4C35',
      summary: 'Event coordination, communication and leadership as part of an extracurricular team.',
      details: ['Support event coordination.', 'Work with the organising team.', 'Help move plans from conversation to execution.'],
      lesson: 'Good events depend on clear handoffs, calm follow-through and people who notice what is missing.',
    },
    {
      title: 'Curry in a Hurry',
      role: 'International Business Case Competition',
      color: '#D8EF40',
      summary:
        'A cross-cultural case competition where research, synthesis and presentation had to work together.',
      details: [
        'Contributed to market research and customer segmentation.',
        'Worked on SWOT analysis and research gathering.',
        'Helped prepare the presentation.',
        'Coordinated with German teammates across the work.',
        'Personally presented the final work.',
      ],
      lesson: 'The team collaborated across most activities; my contribution was especially focused on research, synthesis and presenting the final story.',
    },
    {
      title: 'Hack4Nature',
      role: 'Smart Bio-Filter Tuning with Bayesian Optimisation',
      color: '#F4A8D0',
      summary:
        'A hackathon exploration combining environmental problem-solving with an optimisation approach.',
      details: ['Explored smart bio-filter tuning.', 'Applied Bayesian optimisation as the framing for searching better settings.', 'Connected a technical method to an environmental problem.'],
      lesson: 'Interesting solutions often appear when a familiar method is carried into an unfamiliar problem.',
    },
  ],
  skills: [
    {
      id: 'data-analytics',
      name: 'Data Analytics',
      color: '#FF4C35',
      icon: 'chart',
      groups: {
        comfortable: ['SQL', 'Python', 'Pandas', 'NumPy', 'Exploratory Data Analysis', 'Data Cleaning'],
        developing: ['Statistical Analysis'],
        exploring: [],
      },
    },
    {
      id: 'business-product',
      name: 'Business & Product Thinking',
      color: '#7049C6',
      icon: 'compass',
      groups: {
        comfortable: ['Market Research', 'Customer Segmentation', 'SWOT Analysis', 'Business Analysis'],
        developing: ['Product Thinking', 'KPI Analysis', 'Decision Support'],
        exploring: ['Strategic Research'],
      },
    },
    {
      id: 'visualisation',
      name: 'Data Visualisation',
      color: '#D8EF40',
      icon: 'eye',
      groups: {
        comfortable: ['Tableau', 'Microsoft Excel', 'Dashboard Design'],
        developing: ['Data Storytelling', 'Data Visualisation'],
        exploring: [],
      },
    },
    {
      id: 'databases-tools',
      name: 'Databases & Tools',
      color: '#F4A8D0',
      icon: 'toolbox',
      groups: {
        comfortable: ['SQLite', 'MySQL', 'Jupyter Notebook', 'Git', 'GitHub'],
        developing: [],
        exploring: [],
      },
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      color: '#7049C6',
      icon: 'spark',
      groups: {
        comfortable: ['Scikit-learn', 'Computer Vision', 'LLM Applications'],
        developing: ['Deep Learning', 'EfficientNet', 'Grad-CAM'],
        exploring: ['AI Workflow Prototyping'],
      },
    },
    {
      id: 'collaboration',
      name: 'Collaboration & Communication',
      color: '#FF4C35',
      icon: 'people',
      groups: {
        comfortable: ['Research and Information Synthesis', 'Presentation Development', 'Written Communication'],
        developing: ['Team Coordination', 'Cross-functional Collaboration', 'Event Coordination'],
        exploring: [],
      },
    },
  ],
  notes: [
    {
      tag: 'IDEA',
      title: 'Music, memory and the ordinary day',
      excerpt: 'An idea about the way music quietly changes the texture of everyday life.',
      status: 'Draft idea',
      color: '#FF4C35',
    },
    {
      tag: 'LEARNING',
      title: 'Understanding data beyond dashboards',
      excerpt: 'A note on the questions, assumptions and decisions hiding behind a polished chart.',
      status: 'Draft idea',
      color: '#7049C6',
    },
    {
      tag: 'REFLECTION',
      title: 'An international case competition, in notes',
      excerpt: 'What collaboration, research and presenting with German teammates made visible.',
      status: 'Draft idea',
      color: '#D8EF40',
    },
    {
      tag: 'QUESTION',
      title: 'Where technology meets human decisions',
      excerpt: 'An exploration of the space between an intelligent system and the person using it.',
      status: 'Draft idea',
      color: '#F4A8D0',
    },
    {
      tag: 'BUILDING',
      title: 'Learning by building before I understand everything',
      excerpt: 'A personal argument for making small experiments while the map is still incomplete.',
      status: 'Draft idea',
      color: '#FF4C35',
    },
  ],
  curiosities: [
    { title: 'AI & emerging technology', detail: 'I am curious about where new tools create leverage, where they create noise and how people learn to use them well.', color: '#7049C6' },
    { title: 'Data-driven decisions', detail: 'I like the move from raw information to a decision that is explainable, useful and honest about uncertainty.', color: '#FF4C35' },
    { title: 'Product strategy', detail: 'The questions behind a product — who it serves, what it changes and what not to build — keep pulling me in.', color: '#D8EF40' },
    { title: 'Business models', detail: 'I find it interesting how value, incentives and constraints shape what organisations choose to do.', color: '#F4A8D0' },
    { title: 'Research & experimentation', detail: 'A good experiment makes a question sharper, even when the answer is not what you expected.', color: '#7049C6' },
    { title: 'Human behaviour', detail: 'Consumer psychology adds the human layer to patterns that might otherwise look purely numerical.', color: '#FF4C35' },
    { title: 'Writing & communication', detail: 'Clear writing is a way of thinking in public and helping a useful idea travel further.', color: '#D8EF40' },
    { title: 'Creative problem-solving', detail: 'I enjoy carrying methods across fields and seeing what happens when the context changes.', color: '#F4A8D0' },
  ],
  education: [
    {
      school: 'Neil Gogte Institute of Technology',
      qualification: 'B.Tech — Computer Science and Engineering, AI & ML',
      detail: 'CGPA: 8.76/10 · Expected graduation: 2027',
      color: '#FF4C35',
    },
    {
      school: 'IIT Madras',
      qualification: 'BS — Data Science and Applications',
      detail: 'GPA: 6.5/10 · Expected graduation: 2027',
      color: '#7049C6',
    },
  ],
  about: [
    "I'm Jasmitha, a computer science student with an interest in the space where technology, data and business meet.",
    "I'm drawn to questions that don't have an obvious answer. I like understanding why something happens, exploring different perspectives and finding ways to turn information into something useful.",
    "My interests move between analytics, AI, product thinking, research and strategy. I don't want to limit myself to one narrow area before I've had the chance to explore what I can contribute to.",
    'I enjoy collaborating with people, taking ownership of work and learning through building things.',
    "I'm still figuring out where I want to specialise, and I think that's an exciting place to be.",
  ],
  opportunityTypes: [
    'Data Analyst Internships',
    'Product Analyst Internships',
    'Business Analyst Internships',
    'Strategy and Research Internships',
    'Data Science and AI Internships',
    'Research Collaborations',
    'Hackathons and Interesting Projects',
  ],
};

export type SiteContent = typeof siteContent;
