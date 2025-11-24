import { ProteinVariant } from './types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VariantDetailProps {
  variant: ProteinVariant;
  onClose: () => void;
}

export function VariantDetail({ variant, onClose }: VariantDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto animate-in fade-in-50 zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {variant.gene} <span className="text-indigo-600">{variant.proteinChange}</span>
              </h2>
              <p className="text-gray-600">{variant.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Variant Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Source</span>
                  <span className="font-medium">{variant.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Predicted Impact</span>
                  <span className="font-medium">{variant.impact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frequency</span>
                  <span className="font-medium">{variant.frequency.toFixed(2)}%</span>
                </div>
                {variant.clinicalSignificance && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Clinical Significance</span>
                    <span className="font-medium">{variant.clinicalSignificance}</span>
                  </div>
                )}
                {variant.cancerType && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Associated Cancer</span>
                    <span className="font-medium">{variant.cancerType}</span>
                  </div>
                )}
                {variant.functionalEffect && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Functional Effect</span>
                    <span className="font-medium">{variant.functionalEffect}</span>
                  </div>
                )}
                {variant.drugResponse && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Drug Response</span>
                    <span className="font-medium">{variant.drugResponse}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Analysis Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.ncbi.nlm.nih.gov/clinvar/?term=${variant.gene}+${variant.proteinChange}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search in ClinVar
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://cancer.sanger.ac.uk/cosmic/search?q=${variant.gene}+${variant.proteinChange}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search in COSMIC
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.uniprot.org/uniprotkb?query=${variant.gene}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search in UniProt
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://blast.ncbi.nlm.nih.gov/Blast.cgi?PROGRAM=blastp&PAGE_TYPE=BlastSearch&LINK_LOC=blasthome&QUERY=${variant.gene}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BLAST Analysis
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.genome.jp/tools-bin/clustalw`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ClustalW Alignment
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}