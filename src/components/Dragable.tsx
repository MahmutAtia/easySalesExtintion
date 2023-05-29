import React, { useState } from 'react';
import Container from './Container';

const DraggableElement = ({result, setResult}) => {
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setInitialPosition({
      x: event.clientX - event.currentTarget.offsetLeft,
      y: event.clientY - event.currentTarget.offsetTop
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const element = event.currentTarget;
    const dx = event.clientX - initialPosition.x;
    const dy = event.clientY - initialPosition.y;

    element.style.left = `${dx}px`;
    element.style.top = `${dy}px`;
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="draggable-element fixed z-[999] w-96 h-96 top-20 right-6 cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
        <Container result={result} setResult={setResult} />
    </div>
  );
};

export default DraggableElement;