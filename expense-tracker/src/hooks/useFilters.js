import { useMemo, useState } from "react"

const useFilters = (data) => {
    const [filters, setFilters] = useState({ category: 'all', dateFrom: '', dtateTo: '', minAmount: '', maxAmount: '', searchText: '' });

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const clearFilters = () => {
        setFilters({ category: 'all', dateFrom: '', dtateTo: '', minAmount: '', maxAmount: '', searchText: '' });
    }

    const filteredData = useMemo(() => {
        return data.filter(item => {
            if (filters.category !== 'all' && item.category !== filters.category) return false;

            if (filters.dateFrom && item.date < filters.dateFrom) return false;

            if (filters.dateTo && filters.dateTo < item.date) return false;

            if (filters.minAmount && item.amount < parseFloat(filters.minAmount)) return false;

            if (filters.maxAmount && item.amount > parseFloat(filters.maxAmount)) return false;

            if (filters.searchText && !item.description.toLowerCase().includes(filters.searchText.toLowerCase())) return false;

            return true;
        })
    }, [data, filters])

    const filterSummary = useMemo(() => {
        const activeFilters = Object.entries(filters).filter(([key, value]) => {
            if (key === 'category') return value !== 'all';
            return value !== '';
        });

        return {
            activeCount: activeFilters.length,
            totalResult: filteredData.length,
            hasActiveFilters: activeFilters.length > 0
        }
    }, [filteredData, filters])

    // const filterSummary = () => {
    //     const activeFilters = Object.entries(filters).filter(([key, value]) => {
    //         if (key === 'category') return value !== 'all';
    //         return value !== '';
    //     });

    //     return {
    //         activeCount: activeFilters.length,
    //         totalResult: filteredData.length,
    //         hasActiveFilters: activeFilters.length > 0
    //     }
    // }

    return {
        filters,
        updateFilter,
        clearFilters,
        filteredData,
        filterSummary
    }
}

export default useFilters