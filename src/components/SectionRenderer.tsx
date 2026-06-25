import React from 'react';
import { Section } from '../types';
import { getComponent } from '../registry/ComponentRegistry';

interface Props {
  section: Section;
}

const SectionRenderer: React.FC<Props> = ({ section }) => {
  const Component = getComponent(section.type);

  // Graceful failure — unknown type renders nothing
  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return null;
  }

  return <Component data={section.data} />;
};

// React.memo — prevents re-render if section prop unchanged
export default React.memo(SectionRenderer);