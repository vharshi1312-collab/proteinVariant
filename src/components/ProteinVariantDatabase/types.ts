export type ProteinVariant = {
  id: string;
  gene: string;
  proteinChange: string;
  source: 'COSMIC' | 'ClinVar' | 'Uniprot';
  impact: 'High' | 'Medium' | 'Low';
  frequency: number;
  clinicalSignificance?: string;
  cancerType?: string;
  functionalEffect?: string;
  drugResponse?: string;
};

export type ExternalTool = {
  name: string;
  description: string;
  url: string;
  color: string;
};

export type FilterState = {
  source: string[];
  impact: string[];
  cancerType: string[];
};