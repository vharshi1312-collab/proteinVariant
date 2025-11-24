import { ProteinVariant } from './types';

interface VariantCardProps {
  variant: ProteinVariant;
  isSelected: boolean;
  onClick: () => void;
}

export function VariantCard({ variant, isSelected, onClick }: VariantCardProps) {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">
            {variant.gene} <span className="text-indigo-600">{variant.proteinChange}</span>
            {variant.cancerType && (
              <span className="ml-2 text-sm font-normal bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                {variant.cancerType}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-1 text-xs rounded-full ${
              variant.source === 'COSMIC' ? 'bg-purple-100 text-purple-800' :
              variant.source === 'ClinVar' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {variant.source}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              variant.impact === 'High' ? 'bg-red-100 text-red-800' :
              variant.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {variant.impact} impact
            </span>
            {variant.drugResponse && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                variant.drugResponse.includes('Resistant') ? 'bg-red-100 text-red-800' :
                variant.drugResponse.includes('Sensitive') ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {variant.drugResponse}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Frequency</div>
          <div className="font-medium">{variant.frequency.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}