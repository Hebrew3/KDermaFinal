import React from 'react';
import { cn } from './utils';
import { Button } from './button';
import { Input } from './input';
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, FileText, Download } from 'lucide-react';

interface Column {
  header: string;
  accessorKey: string;
  cell?: (value: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  title?: string;
  filterPlaceholder?: string;
  actions?: React.ReactNode;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  filterPlaceholder = "Search...",
  actions,
  pagination,
}) => {
  const [filterValue, setFilterValue] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!filterValue) return data;
    
    return data.filter(row => {
      return Object.keys(row).some(key => {
        const value = row[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [data, filterValue]);

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="mb-4 flex items-center justify-between">
        {title && <h3 className="font-medium">{title}</h3>}
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={filterPlaceholder}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="pl-9 h-9 w-[200px] md:w-[250px]"
            />
            {filterValue && (
              <button
                type="button"
                onClick={() => setFilterValue('')}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Export
            </Button>
            {actions}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium text-foreground",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-muted/30">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={cn(
                          "px-4 py-3 text-sm",
                          column.className
                        )}
                      >
                        {column.cell
                          ? column.cell(row[column.accessorKey])
                          : row[column.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-3 text-center text-sm text-muted-foreground"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}{' '}
              of {filteredData.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
                disabled={pagination.pageIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              
              <div className="text-sm">
                Page {pagination.pageIndex + 1} of {pagination.pageCount}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
                disabled={pagination.pageIndex >= pagination.pageCount - 1}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};