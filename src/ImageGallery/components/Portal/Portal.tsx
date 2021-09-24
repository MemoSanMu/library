import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalsProps {
  id?: string;
  className?: string;
  zIndex?: string;
  target?: HTMLElement;
  elementType?: string;
}

const Portals: FC<PortalsProps> = ({
  children,
  target,
  id,
  className,
  zIndex,
  elementType = 'figure',
}) => {
  const context = target || document.body;
  const container = document.createElement(elementType);
  id && (container.id = id);
  className && (container.className = className);
  zIndex && (container.style.zIndex = zIndex);
  context.appendChild(container);

  useEffect(() => {
    return () => {
      context.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

export default Portals;
