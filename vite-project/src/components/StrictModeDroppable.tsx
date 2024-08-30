import React, { useEffect, useState, ReactNode } from 'react';
import { Droppable, DroppableProps, DroppableProvided } from 'react-beautiful-dnd';

interface StrictModeDroppableProps extends DroppableProps {
  children: (provided: DroppableProvided) => ReactNode;
}

const StrictModeDroppable: React.FC<StrictModeDroppableProps> = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
