"use client"; // Mark this file as a client component
import { useRef } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const childRef = useRef<{ focusInput: () => void }>(null);

  const handleFocus = () => {
    if (childRef.current) {
      childRef.current.focusInput();
    }
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
};

export default ParentComponent;
