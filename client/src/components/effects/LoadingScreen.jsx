import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const phaseTimer = setInterval(() => {
      setPhase(prev => (prev + 1) % 3);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(phaseTimer);
    };
  }, [onComplete]);

  const phases = ['Initializing', 'Loading Assets', 'Almost Ready'];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0A0A0F 0%, #111127 50%, #0A0A0F 100%)' }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="relative mb-12"
        >
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
            <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>D</span>
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-3 h-3 rounded-full"
              style={{ background: '#00D4FF', boxShadow: '0 0 20px #00D4FF' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              initial={{ x: 44 }}
            />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden mb-4"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(108,99,255,0.5)'
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Status Text */}
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-wider"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono' }}
        >
          {phases[phase]}... {progress}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
