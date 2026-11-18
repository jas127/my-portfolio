import type { Expression } from '@/pixel/spriteManifest';

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
  github: string;
  color: string;
  marker: string;
};

/** One tool/skill. `story` is only set where a real project or role backs it up. */
export type Skill = { name: string; story?: { where: string; note: string } };

export type SkillCategory = {
  id: string;
  name: string;
  color: string;
  /** file name (no extension) in /assets/sprites/props */
  prop: string;
  /** face shown beside the character's quip */
  expression: Expression;
  quip: string;
  blurb: string;
  skills: Skill[];
};

export const siteContent = {
  owner: {
    firstName: 'Jasmitha',
    fullName: 'Jasmitha Kancharlapalli',
    role: 'Aspiring analyst, researcher, builder and lifelong learner.',
    status: 'OPEN TO OPPORTUNITIES',
    opportunityLine:
      "I'm open to opportunities where I can learn, contribute and work on meaningful problems.",
    email: 'jasmithakancharlapalli@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jasmitha-kanc/',
    github: 'https://github.com/jas127',
    resume: 'https://drive.google.com/file/d/1XTkQE9eYWIBzOdggPV8FL5u2Yzr79B-F/view?usp=sharing',
  },
  hero: {
    support:
      "I'm a Computer Science student pursuing a second degree in Data Science. I've never been one to stick to just one area of interest. I enjoy exploring unfamiliar ideas, picking up new skills and finding my way through challenges. Whether it's research, a case competition or a hands-on project, I'm usually up for figuring something new out.",
    messages: [
      "Hi, welcome! ✨",
      "Looking for opportunities 💌",
      "Let's explore!",
      "Curious about something new?",
      "Glad you're here! 👋",
    ],
  },
  projects: [
    {
      id: 'movie-intelligence',
      number: '01',
      title: 'Movie Intelligence',
      category: 'Data Analytics / Predictive Modelling',
      short: 'Movie performance analysis, VADER sentiment exploration and audited pre-release predictive modelling.',
      description:
        'An enterprise business analytics and predictive auditing platform exploring the relationship between movie metadata, audience sentiment and theatrical box office performance.',
      objective:
        'Determine whether information available prior to release (such as genre, budget, runtime, and audience sentiment signals) can reliably forecast commercial box office gross.',
      whyItMatters:
        'The film industry is a hit-driven, capital-intensive market with extreme financial variance. Evaluating data quality and auditing ML pipelines for post-release information leakage is critical to avoid overconfident predictions.',
      contribution: [
        'Curated, cleaned and preprocessed an analytical dataset of ~5,000 movie titles spanning 2000–2024.',
        'Engineered audience sentiment signals using VADER natural language processing on review corpora.',
        'Constructed pre-release predictive pipelines and tested algorithms for commercial gross forecasting.',
        'Designed an empirical validation audit with 17 rules and 11 unit tests to prevent post-release target leakage.',
      ],
      data: 'Approximately 5,000 movie titles (2000–2024) enriched with financial metadata, runtime, genres and audience sentiment scores.',
      tools: ['Python', 'Pandas', 'scikit-learn', 'VADER NLP', 'Streamlit', 'Plotly', 'Pytest'],
      approach: [
        'Exploratory data analysis across 24 years of worldwide and domestic theatrical box office data.',
        'Sentiment extraction and scoring with VADER on textual audience reviews.',
        'Strict feature isolation to ensure zero post-release telemetry leaks into the predictive pipeline.',
        'Systematic hypothesis testing and rigorous validation auditing using Pytest.',
      ],
      implementation:
        'Developed an end-to-end Python platform with modular data pipelines, Streamlit executive dashboard, Plotly analytical visualisations, and a structured auditing suite.',
      results: [
        'Approximately 5,000 movie titles analyzed (2000–2024).',
        'VADER sentiment evaluation accuracy: 63.57%.',
        'Pre-release model R²: 0.2274.',
        '17 validation rules and 11 unit tests implemented.',
      ],
      limitations:
        'The pre-release model R² of 0.2274 indicates modest explanatory power. The majority of box office outcome variance is driven by unobservable factors (cultural momentum, marketing execution, word of mouth), proving pre-release metadata alone cannot reliably guarantee commercial forecasts.',
      learned:
        'Rigor in data science often means proving what a model cannot do. Auditing for leakage and transparently communicating statistical limitations is far more valuable to decision-makers than presenting inflated metrics.',
      github: 'https://github.com/jas127/Movie-Predection-Sentiment-Analysis',
      color: '#FF4C35',
      marker: 'film',
    },
    {
      id: 'ceo-in-a-box',
      number: '02',
      title: 'CEO in a Box',
      category: 'AI / Business Strategy / Decision Support',
      short: 'An AI-powered executive decision simulator exploring business dilemmas through diverse C-suite lenses.',
      description:
        'A strategic intelligence workspace designed to convene virtual boardrooms, stress-testing high-stakes decisions through 140 company-persona cognitive combinations.',
      objective:
        'Move beyond generic, one-size-fits-all AI advice by anchoring strategic inquiries along two cognitive axes: deep corporate posture and specialized leadership roles.',
      whyItMatters:
        'Strategic decisions involve conflicting trade-offs between capital efficiency, brand equity, speed, and risk. Examining a dilemma through multiple specialized perspectives surfaces blind spots before commitment.',
      contribution: [
        'Framed the dual-axis reasoning architecture: 14 iconic global enterprises × 10 leadership personas.',
        'Formulated company identity profiles capturing distinct risk appetites, capital structures and strategic moats.',
        'Constructed 10 specialized C-suite reasoning prompts (CFO unit economics, CMO brand equity, VC growth, McKinsey issue trees).',
        'Built an interactive boardroom memorandum generator to synthesize executive consensus.',
      ],
      data: '14 enterprise profiles (Apple, Tesla, Netflix, Swiggy, etc.) mapped to 10 executive roles, totaling 140 cognitive configurations.',
      tools: ['Python', 'Google Gemini API', 'Streamlit', 'Prompt Engineering', 'Business Strategy'],
      approach: [
        'Structure user business dilemma and contextualize within selected enterprise operating realities.',
        'Generate multi-agent virtual boardroom debates across specialized leadership lenses.',
        'Surface trade-offs, conflicting incentives, unit economic constraints and strategic risks.',
        'Synthesize findings into an actionable executive briefing memorandum.',
      ],
      implementation:
        'Organized with decoupled LLM abstraction layers in Python, customizable corporate parameters, and a Streamlit executive interface.',
      results: [
        '14 companies represented in the concept scope.',
        '10 executive personas per enterprise.',
        '140 company-persona configurations evaluated.',
        'Interactive boardroom debate and memo generation workflow.',
      ],
      limitations:
        'CEO in a Box is an exploratory decision-support simulation. It produces structured qualitative reasoning and strategic questions; no claims of measured commercial outcome or financial guarantees are made.',
      learned:
        'AI serves strategic leaders best when it expands perspective and challenges baseline assumptions, rather than generating simplistic prescriptive answers.',
      github: 'https://github.com/jas127/CEO-in-a-box',
      color: '#7049C6',
      marker: 'briefcase',
    },
    {
      id: 'revive-ai',
      number: '03',
      title: 'Revive AI',
      category: 'AI / Revenue Intelligence / Decision Support',
      short: 'Policy-governed payment and revenue recovery intelligence developed for a Razorpay hackathon.',
      description:
        'An autonomous, policy-bounded revenue recovery intelligence platform designed to identify at-risk digital transactions and execute bounded recovery actions.',
      objective:
        'Recover failed transactions and abandoned payments without risking financial hallucinations, margin degradation or compliance infractions.',
      whyItMatters:
        'Digital merchants silently bleed 10-20% of GMV to gateway degradation, mandate failures and abandonment. Unconstrained AI bots risk offering uncontrolled discounts or spamming customers, necessitating deterministic policy guardrails.',
      contribution: [
        'Engineered the dual-layer architecture: advisory generative LLM paired with deterministic policy execution.',
        'Built deterministic policy rules enforcing frequency caps, opt-outs, and discount ceilings.',
        'Developed simulated recovery scenarios based on 300+ failed payment transactions.',
        'Crafted contextual Hinglish communication templates for multi-channel recovery escalation.',
      ],
      data: 'Simulated benchmark dataset of 300+ transactions representing ₹32.8 lakh in at-risk payment volume.',
      tools: ['Python', 'Razorpay API concepts', 'Streamlit', 'SQLite', 'Groq LLaMA 3.3', 'Gemini Flash'],
      approach: [
        'Ingest transaction-level payment telemetry and diagnose root failure causes (gateway, mandate, friction).',
        'Advisory LLM synthesizes natural recovery copy with margin-aware suggestions.',
        'Deterministic Python Policy Engine evaluates actions against hard margin and compliance boundaries.',
        'Simulate bounded recovery execution and calculate recovery performance.',
      ],
      implementation:
        'Built full Python prototype integrating Streamlit UI, SQLite audit trail, Groq/Gemini inference, and test suites verifying 100% policy enforcement.',
      results: [
        '300+ simulated transactions processed in benchmark.',
        '₹32.8 lakh simulated at-risk revenue evaluated.',
        '53.85% simulated recovery rate achieved under policy bounds.',
        'Zero financial hallucination or unapproved discount execution in automated tests.',
      ],
      limitations:
        'All figures and recovery rates are strictly SIMULATED on synthetic benchmark datasets. No real-world revenue was recovered, and performance in live production payment environments would depend on customer response rates.',
      learned:
        'In financial engineering and revenue systems, deterministic boundaries are non-negotiable. An AI system must never hold unmonitored decision authority over financial disbursements or customer discounts.',
      github: 'https://github.com/jas127/razorpay-reviveAI',
      color: '#D8EF40',
      marker: 'signal',
    },
    {
      id: 'deepfake-detection',
      number: '04',
      title: 'Deepfake Image Detection',
      category: 'Machine Learning / Computer Vision',
      short: 'Explainable deepfake detection using frame sampling, EfficientNet-B0 and dynamic Grad-CAM heatmaps.',
      description:
        'An experimental computer vision system and web application for detecting manipulated facial media, combining deep learning classification with Explainable AI (XAI).',
      objective:
        'Develop an interpretable detection pipeline that not only classifies media as authentic or manipulated, but visually explains which facial regions triggered model suspicion.',
      whyItMatters:
        'Deepfake technology threatens information trust and identity integrity. In high-stakes forensic contexts, black-box predictions are insufficient; human reviewers need interpretable visual evidence.',
      contribution: [
        'Implemented video preprocessing pipeline converting video inputs into sampled facial frames.',
        'Fine-tuned EfficientNet-B0 deep convolutional neural network using PyTorch for binary manipulation classification.',
        'Integrated dynamic Grad-CAM (Gradient-weighted Class Activation Mapping) to generate visual attention heatmaps.',
        'Developed a Flask web dashboard featuring single/batch inspection, side-by-side heatmaps, and evaluation tools.',
      ],
      data: 'Video inputs sampled into individual image frames, normalized and augmented for convolutional inference.',
      tools: ['PyTorch', 'TorchVision', 'EfficientNet-B0', 'Grad-CAM', 'OpenCV', 'Flask', 'NumPy'],
      approach: [
        'Extract and crop face regions from video frames using OpenCV.',
        'Execute deep feature extraction and classification using fine-tuned EfficientNet-B0.',
        'Compute backward gradients to layer activations to generate dynamic Grad-CAM heatmaps.',
        'Expose predictions alongside explainability visualizations through a local Flask web application.',
      ],
      implementation:
        'PyTorch model inference backend with custom Grad-CAM implementation, connected to a responsive Flask SPA for real-time video/image uploads and visual diagnostics.',
      results: [
        'Functioning end-to-end detection pipeline from video upload to frame-level Grad-CAM display.',
        'Dynamic heatmaps successfully highlighting facial boundary and artifact regions.',
        'Interactive evaluation hub built into Flask with confusion matrix and ROC curve visualizations.',
        'No external production accuracy metrics are claimed without formal benchmark dataset validation.',
      ],
      limitations:
        'This is an experimental proof-of-concept. Model generalizability across diverse compression artifacts, lighting conditions, and modern generative adversarial architectures requires broader validation datasets.',
      learned:
        'Explainability is vital in AI detection tools. Grad-CAM heatmaps transformed the model from a mysterious score generator into a tool human evaluators could inspect and critique.',
      github: 'https://github.com/jas127/Deepfake-Image-Detection',
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
        'Leading communications, outreach and inter-team operational coordination for a premier student research community.',
      details: [
        'Coordinate the PR & Outreach department within the Ramanujan Society of Research (RaSoR).',
        'Oversee three specialized functional teams: PR & Outreach, Design & UI/UX, and Event Management.',
        'Manage recruitment and onboarding pipelines for new society members.',
        'Allocate tasks, align cross-functional workflows, and enforce delivery timelines.',
        'Review external communications, publicity campaigns, and social media releases.',
        'Support large-scale research talks, workshops, and community academic initiatives.',
      ],
      lesson: 'Effective leadership is fundamentally about designing systems and communication loops that enable diverse teams to execute with clarity.',
    },
    {
      title: 'Paradox 2026',
      role: 'Deputy Event Head',
      color: '#FF4C35',
      summary:
        'Event leadership, operational planning and execution for IIT Madras’s flagship student festival.',
      details: [
        'Support event architecture, planning timelines, and execution strategy as Deputy Event Head.',
        'Coordinate between student organizers, logistics leads, and participating cohorts.',
        'Streamline event schedules, venue handoffs, and on-ground contingency plans.',
        'Bridge communication between faculty advisory boards and student leadership teams.',
      ],
      lesson: 'Complex event execution depends on calm follow-through, preemptive risk anticipation, and clear handoff protocols.',
    },
    {
      title: 'Curry in a Hurry',
      role: 'International Business Case Competition',
      color: '#D8EF40',
      summary:
        'Collaborative business case strategy developed with German teammates, analyzing cross-border market entry and customer dynamics.',
      details: [
        'Conducted thorough market research and competitive landscape assessment.',
        'Developed data-backed customer segmentation models for targeted demographic penetration.',
        'Structured strategic SWOT analysis to identify market differentiation and operational risks.',
        'Synthesized research findings into a cohesive presentation narrative using PowerPoint and Canva.',
        'Collaborated closely across time zones and cultural contexts with German team members.',
        'Personally pitched and defended the final strategic recommendation before the evaluation jury.',
      ],
      lesson: 'International collaboration succeeds when analytical depth is paired with clear narrative storytelling and cross-cultural empathy.',
    },
    {
      title: 'Hack4Nature',
      role: 'Smart Bio-Filter Tuning with Bayesian Optimisation',
      color: '#F4A8D0',
      summary:
        'An environmental hackathon exploration applying probabilistic Bayesian optimisation to ecological filtration systems.',
      details: [
        'Explored computational tuning methods for smart bio-filtration efficiency.',
        'Applied Bayesian optimisation framing to navigate high-dimensional parameter spaces with minimal evaluations.',
        'Connected mathematical optimisation principles to tangible environmental filtration constraints.',
        'Collaborated in a fast-paced hackathon setting to prototype the algorithmic workflow.',
      ],
      lesson: 'Some of the most compelling insights happen when you carry mathematical methodologies from one discipline into an unfamiliar domain.',
    },
  ],
  skills: [
    {
      id: 'data-analytics',
      name: 'Data Analytics',
      color: '#FF4C35',
      prop: 'laptop',
      expression: 'focused',
      quip: 'Clean data first. Opinions second.',
      blurb:
        'Turning raw tables into questions worth asking: cleaning data, exploring it and checking what the numbers can actually support.',
      skills: [
        { name: 'SQL' },
        { name: 'Python' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'Exploratory Data Analysis', story: { where: 'Movie Intelligence', note: 'Explored a dataset of roughly 5,000 movie titles before building anything on top of it.' } },
        { name: 'Data Cleaning', story: { where: 'Movie Intelligence', note: 'Preprocessing and cleaning the movie data was the first step of that project.' } },
        { name: 'Statistical Analysis' },
      ],
    },
    {
      id: 'business-strategy',
      name: 'Business & Strategy',
      color: '#7049C6',
      prop: 'coffee-books',
      expression: 'thinking',
      quip: 'Every number has a customer behind it.',
      blurb:
        'The business side of the data: understanding markets, customers and trade-offs so an analysis points towards a decision.',
      skills: [
        { name: 'Market Research', story: { where: 'Curry in a Hurry', note: 'My part of the international business case competition included the market research.' } },
        { name: 'Customer Segmentation', story: { where: 'Curry in a Hurry', note: 'Segmenting customers was one of my personal contributions to the case.' } },
        { name: 'SWOT Analysis', story: { where: 'Curry in a Hurry', note: 'I worked on the SWOT analysis for the competition case.' } },
        { name: 'Business Analysis' },
        { name: 'Product Thinking' },
        { name: 'Strategic Research' },
        { name: 'KPI Analysis' },
        { name: 'Decision Support', story: { where: 'CEO in a Box · Revive AI', note: 'Both projects explore how analysis can support a decision rather than replace the person making it.' } },
      ],
    },
    {
      id: 'visualisation',
      name: 'Data Visualisation',
      color: '#D8EF40',
      prop: 'sparkle',
      expression: 'starstruck',
      quip: 'A chart is a sentence with colours.',
      blurb: 'Making findings easy to read: charts, dashboards and the story that connects them.',
      skills: [
        { name: 'Tableau' },
        { name: 'Microsoft Excel' },
        { name: 'Dashboard Design' },
        { name: 'Data Storytelling' },
        { name: 'Data Visualisation' },
      ],
    },
    {
      id: 'databases-tools',
      name: 'Databases & Tools',
      color: '#F4A8D0',
      prop: 'backpack',
      expression: 'neutral',
      quip: 'Everything I need fits in the backpack.',
      blurb: 'The everyday kit for storing data, running experiments and keeping work versioned.',
      skills: [
        { name: 'SQLite' },
        { name: 'MySQL' },
        { name: 'Jupyter Notebook' },
        { name: 'Git' },
        { name: 'GitHub', story: { where: 'github.com/jas127', note: 'My project work lives in public repositories you can browse.' } },
      ],
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      color: '#7049C6',
      prop: 'headphones',
      expression: 'surprised',
      quip: 'Curious why a model decides, not just what it predicts.',
      blurb:
        'Machine learning and AI work from my projects, with a habit of asking how a model reached its answer.',
      skills: [
        { name: 'Scikit-learn' },
        { name: 'Deep Learning' },
        { name: 'Computer Vision', story: { where: 'Deepfake Detection', note: 'An experimental project on video frame sampling and image classification.' } },
        { name: 'EfficientNet', story: { where: 'Deepfake Detection', note: 'The project uses EfficientNet-B0 for image classification.' } },
        { name: 'Grad-CAM', story: { where: 'Deepfake Detection', note: 'Used to look at which parts of a frame influenced the model.' } },
        { name: 'LLM Applications' },
        { name: 'AI Workflow Prototyping' },
      ],
    },
    {
      id: 'communication',
      name: 'Communication & Collaboration',
      color: '#FF4C35',
      prop: 'exclamation',
      expression: 'joy',
      quip: "An idea isn't finished until someone gets it.",
      blurb:
        'Synthesising research, presenting it and coordinating people: the part that gets ideas out of the notebook.',
      skills: [
        { name: 'Research and Information Synthesis', story: { where: 'Curry in a Hurry', note: 'Research and information gathering was a core part of my contribution.' } },
        { name: 'Presentation Development', story: { where: 'Curry in a Hurry', note: 'I helped prepare the presentation (PowerPoint and Canva) and presented the final work myself.' } },
        { name: 'Team Coordination', story: { where: 'RaSoR, IIT Madras', note: 'As Coordinator I oversee three teams: PR & Outreach, Design & UI/UX, and Event Management.' } },
        { name: 'Cross-functional Collaboration', story: { where: 'Curry in a Hurry', note: 'Worked with German teammates on an international case competition.' } },
        { name: 'Event Coordination', story: { where: 'Paradox 2026', note: 'Deputy Event Head, helping turn event plans into execution.' } },
        { name: 'Written Communication', story: { where: 'RaSoR, IIT Madras', note: 'I review outreach and social media content for the department.' } },
      ],
    },
  ] as SkillCategory[],
  notes: [

    {
      tag: 'ANALYTICS',
      title: 'Learning to understand data beyond dashboards',
      excerpt: 'A reflection on what happens behind polished BI charts—the data collection trade-offs, messy edge cases, and human assumptions hiding in rows.',
      status: 'Draft in progress',
      color: '#7049C6',
    },
    {
      tag: 'STRATEGY',
      title: 'What an international business case competition taught me',
      excerpt: 'Observations from Curry in a Hurry: collaborating across cultures with German teammates, structuring ambiguous problems, and defending ideas live.',
      status: 'Draft in progress',
      color: '#D8EF40',
    },
    {
      tag: 'DECISION SYSTEMS',
      title: 'Where technology, business and human decisions meet',
      excerpt: 'An inquiry into how analytical models interact with executive judgment, and why decision support is fundamentally different from automated decision making.',
      status: 'Draft in progress',
      color: '#F4A8D0',
    },
    {
      tag: 'EXPERIMENTATION',
      title: 'Learning by building unfamiliar things',
      excerpt: 'A defense of rapid prototyping and curiosity-led builds: why stepping into unfamiliar tools teaches you faster than passive reading.',
      status: 'Draft in progress',
      color: '#FF4C35',
    },
  ],
  curiosities: [
    {
      title: 'AI & Data-Driven Decisions',
      detail:
        'How machine learning models and data pipelines can be designed to empower human decision-makers rather than replace contextual judgment.',
      color: '#7049C6',
    },
    {
      title: 'Product Strategy',
      detail:
        'Analyzing user frictions, feedback loops, unit economics, and feature trade-offs to build technology products that solve real friction points.',
      color: '#FF4C35',
    },
    {
      title: 'Business Models & Incentives',
      detail:
        'Understanding how capital structures, monetization mechanics, and market moats shape long-term organizational behavior.',
      color: '#D8EF40',
    },
    {
      title: 'Consumer Psychology',
      detail:
        'Examining the cognitive biases, emotional triggers, and behavioural patterns that explain why people make choices that defy pure numerical logic.',
      color: '#F4A8D0',
    },
    {
      title: 'Research & Experimentation',
      detail:
        'Designing rigorous empirical tests, isolating variables, and discovering what the data genuinely supports versus what we wish it showed.',
      color: '#7049C6',
    },
    {
      title: 'Writing & Communication',
      detail:
        'Translating complex statistical models and strategic analyses into crisp, executive-ready narratives that drive action.',
      color: '#FF4C35',
    },
    {
      title: 'Creative Problem-Solving',
      detail:
        'Cross-pollinating analytical tools across disciplines—like bringing Bayesian optimisation to bio-filters or behavioral psychology to revenue recovery.',
      color: '#D8EF40',
    },

  ],
  education: {
    storyHeading: "Two degrees. One thing I've figured out about myself.",
    storyParagraphs: [
      "I've never quite figured out what I want to be, or found one particular thing that defines me. But I think I've figured out one thing about how I want to live: I want to keep learning, and I don't want to put limits on how far I'm willing to go to understand something.",
      "For me, education has always felt like more than earning a degree. There's something deeply personal about making the most of the opportunity to learn. I think of it as my dharma: to stay curious, to learn wholeheartedly and to do justice to the opportunities I've been given.",
      "That's what led me to pursue two degrees at the same time: a B.Tech in Computer Science and Engineering (AI & ML) at NGIT and a BS in Data Science at IIT Madras. Two different academic journeys, both driven by the same desire to learn as much as I can.",
    ],
    degrees: [
      {
        school: 'Neil Gogte Institute of Technology',
        qualification: 'B.Tech — Computer Science and Engineering (AI & ML)',
        focus: 'Specialisation: Artificial Intelligence & Machine Learning',
        timeline: 'Expected graduation: May 2027',
        note: 'Foundations in algorithms, machine learning architectures, and computational systems.',
        color: '#FF4C35',
      },
      {
        school: 'Indian Institute of Technology Madras',
        qualification: 'BS — Data Science and Applications',
        focus: 'Dual degree pursued concurrently alongside B.Tech',
        timeline: 'Expected graduation: May 2027',
        note: 'Rigorous mathematical foundations, statistical inference, data structures, and enterprise data engineering.',
        color: '#7049C6',
      },
    ],
  },
  about: [
    "Hi, I'm Jasmitha.",
    "I'm a Computer Science student pursuing a second degree in Data Science. I'm someone who enjoys figuring things out, learning unfamiliar things and finding my way around new challenges.",
    "I've never been particularly attached to staying within one subject or one way of thinking. My interests move between technology, data, analytics, AI, product thinking and business strategy. What draws me in is the opportunity to understand something new, connect ideas and turn what I've learned into something useful.",
    "I tend to learn by getting involved. Give me something unfamiliar, a problem to work through or a responsibility to take on, and I'll find my way around it. I enjoy asking questions, exploring different approaches, learning from people around me and taking ownership of the work I'm doing.",
    "Outside academics, I've explored research communities, leadership, international case competitions and hackathons. Each has introduced me to different people, ways of working and problems to figure out.",
    "I haven't decided on one narrow path yet, and I see that as room to grow. I'm looking for opportunities that challenge me, expose me to new things and let me contribute while learning along the way.",
  ],
  opportunityTypes: [
    'Data Analyst Internships',
    'Business Analyst Internships',
    'Product Analyst Internships',
    'Strategy Analyst Internships',
    'Data Science Internships',
    'AI/ML Research Opportunities',
    'Research Collaborations',
    'Hackathons and Interesting Projects',
  ],
};

export type SiteContent = typeof siteContent;
