"use client"; // Mark this file as a client component
import { useImperativeHandle, useRef, forwardRef } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
});

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
