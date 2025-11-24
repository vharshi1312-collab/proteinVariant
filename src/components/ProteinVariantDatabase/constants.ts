import { ExternalTool } from './types';

// Real cancer-related protein variants data
export const CANCER_GENES = [
  'TP53', 'BRCA1', 'BRCA2', 'EGFR', 'KRAS', 'PTEN', 'PIK3CA', 
  'ALK', 'BRAF', 'HER2', 'MET', 'NRAS', 'RET', 'ROS1'
];

// External tool links
export const EXTERNAL_TOOLS: Record<string, ExternalTool> = {
  BLAST: {
    name: 'BLAST',
    description: 'Compare protein sequences against databases',
    url: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi',
    color: 'bg-blue-100'
  },
  ClinVar: {
    name: 'ClinVar',
    description: 'Clinical significance of variants',
    url: 'https://www.ncbi.nlm.nih.gov/clinvar/',
    color: 'bg-green-100'
  },
  UniProt: {
    name: 'UniProt',
    description: 'Protein sequence and annotation data',
    url: 'https://www.uniprot.org/',
    color: 'bg-yellow-100'
  },
  COSMIC: {
    name: 'COSMIC',
    description: 'Catalogue of somatic mutations in cancer',
    url: 'https://cancer.sanger.ac.uk/cosmic',
    color: 'bg-purple-100'
  },
  ClustalW: {
    name: 'ClustalW',
    description: 'Multiple sequence alignment tool',
    url: 'https://www.genome.jp/tools-bin/clustalw',
    color: 'bg-red-100'
  }
};

export const COMMON_MUTATIONS: Record<string, string[]> = {
  'TP53': ['R175H', 'R248W', 'R273H', 'Y220C', 'G245S'],
  'BRCA1': ['C61G', 'M1775R', 'S1715R', 'A1708E'],
  'BRCA2': ['N372H', 'D2723H', 'K3326X'],
  'EGFR': ['L858R', 'T790M', 'ex19del', 'G719S'],
  'KRAS': ['G12D', 'G12V', 'G13D', 'Q61H'],
  'PTEN': ['R130Q', 'R173H', 'Y68H'],
  'PIK3CA': ['E545K', 'H1047R', 'E542K']
};

export const CANCER_TYPES = [
  'Breast', 'Lung', 'Colorectal', 'Prostate', 'Ovarian', 
  'Pancreatic', 'Melanoma', 'Leukemia', 'Lymphoma'
];

export const FUNCTIONAL_EFFECTS = [
  'Loss-of-function', 'Gain-of-function', 'Dominant-negative',
  'Altered binding', 'Conformational change', 'Mislocalization'
];

export const DRUG_RESPONSES = [
  'Sensitive', 'Resistant', 'No effect', 'Increased sensitivity',
  'Acquired resistance', 'Context-dependent'
];