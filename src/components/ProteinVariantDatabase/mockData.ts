import { ProteinVariant } from './types';
import { CANCER_GENES, COMMON_MUTATIONS, CANCER_TYPES, FUNCTIONAL_EFFECTS, DRUG_RESPONSES } from './constants';

export const generateMockData = (): ProteinVariant[] => {
  const sources: ('COSMIC' | 'ClinVar' | 'Uniprot')[] = ['COSMIC', 'ClinVar', 'Uniprot'];
  const impacts: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
  
  const mockVariants: ProteinVariant[] = CANCER_GENES.flatMap(gene => {
    const mutations = COMMON_MUTATIONS[gene] || 
      [1, 2, 3, 4, 5].map(i => `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 300)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`)
    
    return mutations.map((mut, i) => ({
      id: `${gene}-${mut}`,
      gene,
      proteinChange: `p.${mut}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      impact: impacts[Math.floor(Math.random() * impacts.length)],
      frequency: Math.random() * 10 + (gene === 'TP53' ? 20 : 0),
      clinicalSignificance: Math.random() > 0.3 ? ['Pathogenic', 'Likely pathogenic', 'Uncertain significance', 'Likely benign', 'Benign'][Math.floor(Math.random() * 5)] : undefined,
      cancerType: CANCER_TYPES[Math.floor(Math.random() * CANCER_TYPES.length)],
      functionalEffect: FUNCTIONAL_EFFECTS[Math.floor(Math.random() * FUNCTIONAL_EFFECTS.length)],
      drugResponse: DRUG_RESPONSES[Math.floor(Math.random() * DRUG_RESPONSES.length)]
    }))
  });

  // Add some additional variants to reach ~2300
  const additionalVariants = Array.from({ length: 1500 }, (_, i) => {
    const gene = CANCER_GENES[Math.floor(Math.random() * CANCER_GENES.length)];
    const mut = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 300)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
    return {
      id: `VAR${i.toString().padStart(5, '0')}`,
      gene,
      proteinChange: `p.${mut}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      impact: impacts[Math.floor(Math.random() * impacts.length)],
      frequency: Math.random() * 5,
      clinicalSignificance: Math.random() > 0.3 ? ['Pathogenic', 'Likely pathogenic', 'Uncertain significance', 'Likely benign', 'Benign'][Math.floor(Math.random() * 5)] : undefined,
      cancerType: CANCER_TYPES[Math.floor(Math.random() * CANCER_TYPES.length)],
      functionalEffect: FUNCTIONAL_EFFECTS[Math.floor(Math.random() * FUNCTIONAL_EFFECTS.length)],
      drugResponse: DRUG_RESPONSES[Math.floor(Math.random() * DRUG_RESPONSES.length)]
    }
  });

  return [...mockVariants, ...additionalVariants];
};