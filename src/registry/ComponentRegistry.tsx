import React from 'react';
import BannerHero from '../components/BannerHero';
import DynamicCollection from '../components/DynamicCollection';
import ProductGrid2x2 from '../components/ProductGrid2x2';

// using the hash-map instead of switch-case 
const REGISTRY: Record<string, React.ComponentType<any>> = {
  BANNER_HERO: BannerHero,
  DYNAMIC_COLLECTION: DynamicCollection,
  PRODUCT_GRID_2X2: ProductGrid2x2,
};

export const getComponent = (type: string): React.ComponentType<any> | null => {
  return REGISTRY[type] ?? null;
};