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
export default ChildComponent;
