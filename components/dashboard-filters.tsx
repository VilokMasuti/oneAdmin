'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type React from 'react';

interface DashboardFiltersProps {
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
  currentStatus: string;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onClearSearch: () => void;
}

export function DashboardFilters({
  onStatusChange,
  onSearchChange,
  currentStatus,
  searchTerm,
  onSearchTermChange,
  onClearSearch,
}: DashboardFiltersProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm);
  };

  const handleClearSearch = () => {
    onClearSearch();
    onSearchChange('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Status Tabs */}
      <Tabs
        value={currentStatus}
        onValueChange={onStatusChange}
        className={`w-full sm:w-auto `}
      >
        <TabsList
          className={`grid w-full grid-cols-4 sm:w-auto  bg-zinc-800    `}
        >
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white cursor-pointer"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white cursor-pointer"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white cursor-pointer"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white cursor-pointer"
          >
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2 w-full sm:w-auto"
      >
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-9 pr-9"
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-sm transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
