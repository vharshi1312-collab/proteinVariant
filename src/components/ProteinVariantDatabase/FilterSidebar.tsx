import { FilterState } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Filter, ExternalLink } from 'lucide-react';
import { EXTERNAL_TOOLS } from './constants';

interface FilterSidebarProps {
  filters: FilterState;
  toggleFilter: (type: keyof FilterState, value: string) => void;
}

export function FilterSidebar({ filters, toggleFilter }: FilterSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Source</h3>
            <div className="space-y-2">
              {['COSMIC', 'ClinVar', 'Uniprot'].map(source => (
                <div key={source} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`source-${source}`}
                    checked={filters.source.includes(source)}
                    onChange={() => toggleFilter('source', source)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`source-${source}`} className="ml-2 text-sm text-gray-700">
                    {source}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Impact</h3>
            <div className="space-y-2">
              {['High', 'Medium', 'Low'].map(impact => (
                <div key={impact} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`impact-${impact}`}
                    checked={filters.impact.includes(impact)}
                    onChange={() => toggleFilter('impact', impact)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`impact-${impact}`} className="ml-2 text-sm text-gray-700">
                    {impact}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Cancer Type</h3>
            <div className="space-y-2">
              {['Breast', 'Lung', 'Colorectal', 'Prostate', 'Ovarian', 'Pancreatic'].map(type => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={filters.cancerType.includes(type)}
                    onChange={() => toggleFilter('cancerType', type)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(EXTERNAL_TOOLS).map(([key, tool]) => (
            <a 
              key={key}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-3 rounded-lg ${tool.color} hover:opacity-90 transition-opacity`}
            >
              <div className="font-medium">{tool.name}</div>
              <div className="text-sm text-gray-700 mt-1">{tool.description}</div>
              <div className="flex items-center mt-2 text-xs text-blue-600">
                <span>Open Tool</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}