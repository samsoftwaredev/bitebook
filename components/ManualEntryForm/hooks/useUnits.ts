import { useEffect, useState } from 'react';

import { getUnitsService } from '@/services';

const DEFAULT_UNITS = [
  'cup',
  'tbsp',
  'tsp',
  'lbs',
  'oz',
  'g',
  'kg',
  'ml',
  'l',
  'piece',
];

export const useUnits = () => {
  const [units, setUnits] = useState<string[]>(DEFAULT_UNITS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data, error } = await getUnitsService();
        if (!error && data?.unit) {
          setUnits(data.unit);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
        // Keep default units on error
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return { units, loading };
};
