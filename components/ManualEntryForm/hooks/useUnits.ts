import { useEffect, useState } from 'react';

import { getUnitsService } from '@/services';

const DEFAULT_UNITS = [
  'each',
  'can',
  'cup',
  'tablespoon',
  'teaspoon',
  'ounce',
  'pound',
  'gram',
  'kilogram',
  'milliliter',
  'liter',
  'piece',
  'bunch',
  'clove',
  'pint',
  'quart',
  'stick',
  'slice',
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
