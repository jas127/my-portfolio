export type ScoringStrategy = {
  id: 'pioneer' | 'balanced' | 'hub';
  name: string;
  tagline: string;
  weights: {
    whitespace: number;
    foodContext: number;
    reliability: number;
  };
  useCase: string;
};

export const intelisContent = {
  name: 'Intelis',
  badge: 'FLAGSHIP PROJECT // FEATURED',
  category: 'Geospatial Market Intelligence · Business Analytics · Location Strategy',
  headline: 'Evidence-first geospatial market intelligence for café location screening in Hyderabad.',
  summary:
    'Intelis investigates the commercial geography of Hyderabad using Overture Maps Places data, H3 spatial indexing, and a deterministic weighted scoring framework. It is built for analytical location screening and due diligence—not consumer restaurant discovery or reviews.',
  disclosure:
    'Developed as an AI-assisted project. Intelis uses a deterministic weighted analytical scoring framework—not a machine-learning model—and does not predict café profitability or guarantee commercial viability.',
  links: {
    liveApp: 'https://intelis-beta.vercel.app',
    github: 'https://github.com/jas127/intelis',
    api: 'https://intelis-api.onrender.com',
  },
  heroStats: [
    { value: '609.48 km²', label: 'Projected GHMC Study Area', sub: 'EPSG:32644 boundary' },
    { value: '159,323', label: 'Raw Overture POIs', sub: '136,649 inside boundary · 1,082 cafés' },
    { value: '975', label: 'H3 Res-8 Grid Cells', sub: '796 score-eligible · 439 zero-café' },
    { value: '18 / 18', label: 'Audited Passing Tests', sub: '14 API · 4 geospatial pipeline' },
  ],
  problem: {
    intro:
      'Choosing a café location involves far more than picking a busy neighbourhood. Before committing capital, an operator or analyst needs structured evidence across six spatial questions:',
    factors: [
      'Existing café competition and saturation levels',
      'Concentration of surrounding food businesses as commercial context',
      'Geographic distribution of competitors across neighbourhoods',
      'Projected distance to the nearest existing café',
      'Potential underserved areas (market whitespace signals)',
      'Reliability, confidence, and completeness of the underlying location data',
    ],
  },
  dataset: {
    source: 'Overture Maps Places',
    release: '2024-11-13.0',
    raw: [
      { label: 'Raw points of interest', value: '159,323' },
      { label: 'Source data volume', value: '~199.2 MB' },
      { label: 'Regional food businesses', value: '12,097' },
      { label: 'Regional cafés & coffee shops', value: '1,237' },
      { label: 'Regional restaurants', value: '6,764' },
    ],
    ghmc: [
      { label: 'Actual projected study area', value: '609.48 km²' },
      { label: 'POIs within study boundary', value: '136,649' },
      { label: 'Cafés within study boundary', value: '1,082' },
      { label: 'Food businesses in boundary', value: '10,567' },
      { label: 'Restaurants in boundary', value: '5,912' },
    ],
  },
  geospatial: {
    methods: [
      'Point-in-polygon filtering using Shapely’s covers operation against the historical GHMC boundary',
      'H3 hexagonal spatial indexing at resolution 8 for uniform neighbourhood-scale aggregation',
      'Spatial aggregation and density calculations across cafés and surrounding food businesses',
      'Projected metric distance calculations using EPSG:32644 (UTM Zone 44N)',
      'Nearest-café competitor distance analysis for every evaluated location',
      'Clipped boundary-cell handling and reliable-area filtering to avoid edge distortion',
      'Cell-level data-quality, confidence, and completeness scoring',
    ],
    gridStats: [
      { label: 'Total H3 grid cells', value: '975' },
      { label: 'Reliable-area cells', value: '878' },
      { label: 'Score-eligible cells', value: '796' },
      { label: 'Eligible cells with 0 recorded cafés', value: '439' },
      { label: 'Eligible cells with ≥1 café', value: '359' },
      { label: 'Eligible cells with ≥1 food business', value: '685' },
      { label: 'Maximum café density', value: '25.23 / km²' },
      { label: 'Maximum food-business density', value: '294.90 / km²' },
      { label: 'Median nearest-café distance', value: '151.4 m' },
      { label: 'Postcodes represented', value: '103' },
    ],
    caveat:
      'Zero recorded cafés does not automatically mean an area is commercially viable. It can reflect low footfall, zoning, residential character, or mapping gaps—making it a screening signal for on-ground due diligence rather than a guarantee.',
  },
  dataQuality: {
    whyItMatters:
      'Location recommendations are only as trustworthy as the map records beneath them. Surfacing missing postcodes, taxonomy disagreements, and suspected duplicates directly inside the platform prevents noisy POI records from masquerading as precision.',
    pipeline: [
      'Chunked GeoJSON ingestion in 25,000-record batches for memory-safe processing',
      'Columnar conversion and analytical storage in Parquet format',
      'Automated category classification and taxonomy cross-validation',
    ],
    metrics: [
      { label: 'Missing / invalid coordinates', value: '0', tone: 'good' as const },
      { label: 'Duplicate Overture IDs', value: '0', tone: 'good' as const },
      { label: 'Taxonomy disagreements tracked', value: '55', tone: 'warn' as const },
      { label: 'Suspected duplicate groups', value: '155', tone: 'warn' as const },
      { label: 'Missing basic / taxonomy info', value: '5,482', tone: 'neutral' as const },
      { label: 'Missing address information', value: '11,071', tone: 'neutral' as const },
      { label: 'Missing postcode information', value: '11,758', tone: 'neutral' as const },
      { label: 'Excess café record preserved & reported', value: '1', tone: 'neutral' as const },
    ],
  },
  scoring: {
    dimensions: [
      {
        key: 'whitespace' as const,
        name: 'Competition Whitespace',
        color: '#FF4C35',
        formula: 'Percentile of inverse café density',
        detail: 'Higher whitespace indicates relatively lower recorded café competition within the cell.',
      },
      {
        key: 'foodContext' as const,
        name: 'Food Business Context',
        color: '#7049C6',
        formula: 'Percentile of surrounding food-business density',
        detail: 'Captures existing commercial food-business clustering and neighbourhood dining activity.',
      },
      {
        key: 'reliability' as const,
        name: 'Data Reliability',
        color: '#D8EF40',
        formula: 'Median confidence + high-confidence % + completeness percentiles',
        detail: 'Rewards cells where underlying Overture Maps records are more complete and higher confidence.',
      },
    ],
    strategies: [
      {
        id: 'pioneer',
        name: 'Pioneer',
        tagline: 'Prioritises lower recorded café saturation',
        weights: { whitespace: 60, foodContext: 25, reliability: 15 },
        useCase: 'Best for screening emerging pockets with fewer recorded cafés while still checking commercial presence.',
      },
      {
        id: 'balanced',
        name: 'Balanced',
        tagline: 'Even trade-off across whitespace, activity & reliability',
        weights: { whitespace: 40, foodContext: 35, reliability: 25 },
        useCase: 'Default analytical profile balancing low café saturation with active food corridors and trustworthy data.',
      },
      {
        id: 'hub',
        name: 'High-Activity Hub',
        tagline: 'Prioritises established food-business density',
        weights: { whitespace: 20, foodContext: 55, reliability: 25 },
        useCase: 'Targets proven high-density food corridors where strong existing dining demand outweighs competition.',
      },
    ] as ScoringStrategy[],
    findings: [
      'Uses tie-aware average-rank percentile calculations so tied cells are ranked fairly.',
      'All 439 zero-café eligible cells receive the exact same 72.45 competition whitespace percentile.',
      '90% of top-10 candidate rankings remained stable between default and equal-weight configurations.',
      'Scores are deterministic screening indices—not machine-learning predictions of revenue or store profitability.',
    ],
  },
  features: [
    'Interactive MapLibre geospatial map with H3 resolution-8 overlays',
    'Top 10 candidate location discovery ranked by active strategy',
    'Configurable scoring weights and side-by-side strategy comparisons',
    'Interactive ECharts visualisations for density & distribution analysis',
    'Café and surrounding food-business density breakdowns per cell',
    'Nearest-café competitor distance calculations (EPSG:32644)',
    'Side-by-side comparison of up to three H3 grid cells',
    'Postcode disambiguation across 103 represented Hyderabad postcodes',
    'Built-in methodology, data quality, and evidence transparency sections',
    'Due-diligence checklist persisted locally via browser localStorage',
  ],
  testing: {
    total: 18,
    apiTests: 14,
    pipelineTests: 4,
    summary:
      '18 total passing tests in the audited version—14 API behaviour tests and 4 geospatial processing pipeline tests verifying spatial aggregation, boundary filtering, and scoring consistency.',
  },
  stack: [
    'Overture Maps',
    'H3 (Res 8)',
    'Shapely',
    'EPSG:32644',
    'Parquet',
    'MapLibre',
    'ECharts',
    'FastAPI / Render',
    'Vercel',
  ],
};
