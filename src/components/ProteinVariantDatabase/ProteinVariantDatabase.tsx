import { useState, useEffect } from 'react';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterSidebar } from './FilterSidebar';
import { VariantCard } from './VariantCard';
import { VariantDetail } from './VariantDetail';
import { ProteinVariant, FilterState } from './types';
import { generateMockData } from './mockData';

export function ProteinVariantDatabase() {
  const [variants, setVariants] = useState<ProteinVariant[]>([]);
  const [filteredVariants, setFilteredVariants] = useState<ProteinVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProteinVariant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'gene' | 'impact' | 'frequency'>('gene');
  const [filters, setFilters] = useState<FilterState>({
    source: [],
    impact: [],
    cancerType: []
  });

  // Generate realistic cancer mutation data
  useEffect(() => {
    const mockData = generateMockData();
    setVariants(mockData);
    setFilteredVariants(mockData);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...variants];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.gene.toLowerCase().includes(term) || 
        v.proteinChange.toLowerCase().includes(term) ||
        v.id.toLowerCase().includes(term) ||
        (v.cancerType && v.cancerType.toLowerCase().includes(term))
      );
    }
    
    // Apply source filter
    if (filters.source.length > 0) {
      result = result.filter(v => filters.source.includes(v.source));
    }
    
    // Apply impact filter
    if (filters.impact.length > 0) {
      result = result.filter(v => filters.impact.includes(v.impact));
    }
    
    // Apply cancer type filter
    if (filters.cancerType.length > 0) {
      result = result.filter(v => v.cancerType && filters.cancerType.includes(v.cancerType));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'gene') return a.gene.localeCompare(b.gene);
      if (sortBy === 'impact') {
        const impactOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return impactOrder[a.impact] - impactOrder[b.impact];
      }
      return b.frequency - a.frequency;
    });
    
    setFilteredVariants(result);
  }, [variants, searchTerm, filters, sortBy]);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const index = newFilters[type].indexOf(value);
      if (index === -1) {
        newFilters[type] = [...newFilters[type], value];
      } else {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      }
      return newFilters;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Protein Variant Database</h1>
            <p className="text-gray-600">Comprehensive database of cancer-related protein variants</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
            <Info className="h-5 w-5" />
            <span className="text-sm">2,347 variants from 14 cancer genes</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
          
          {/* Main content */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by gene, variant, cancer type, or ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gene">Gene</SelectItem>
                    <SelectItem value="impact">Impact</SelectItem>
                    <SelectItem value="frequency">Frequency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {filteredVariants.length} {filteredVariants.length === 1 ? 'variant' : 'variants'} found
                </CardTitle>
                <CardDescription>
                  Showing {Math.min(filteredVariants.length, 50)} of {filteredVariants.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVariants.slice(0, 50).map(variant => (
                    <VariantCard 
                      key={variant.id}
                      variant={variant}
                      isSelected={selectedVariant?.id === variant.id}
                      onClick={() => setSelectedVariant(variant)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Variant detail panel */}
        {selectedVariant && (
          <VariantDetail 
            variant={selectedVariant}
            onClose={() => setSelectedVariant(null)}
          />
        )}
      </div>
    </div>
  );
}