import React from 'react';
import { usePrefs } from '../lib/prefs-context';

/* Turns off the 3D travel, reveals and marquee. The operating system's reduce-motion setting always wins. */
const MotionToggle = () => {
  const { motionOff, setMotionOff, osReduce } = usePrefs();
  const off = motionOff || osReduce;
  return (
    <button
      type="button"
      className="nav-toggle"
      aria-pressed={off}
      disabled={osReduce}
      title={osReduce ? 'Your device asks for reduced motion' : undefined}
      onClick={() => setMotionOff(!motionOff)}
    >
      {off ? 'Motion off' : 'Motion on'}
    </button>
  );
};

export default MotionToggle;
