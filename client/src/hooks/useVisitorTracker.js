import { useEffect, useRef } from 'react';
import { trackVisit, updateSessionDuration } from '../services/api';

/**
 * Hook that automatically tracks when a visitor lands on the portfolio.
 * Sends page, referrer, screen resolution, and language to the backend.
 * Also tracks session duration when the user leaves.
 */
const useVisitorTracker = () => {
  const visitIdRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const track = async () => {
      try {
        const data = {
          page: window.location.pathname,
          referrer: document.referrer || 'Direct',
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language || navigator.userLanguage || '',
        };

        const response = await trackVisit(data);
        if (response.data?.id) {
          visitIdRef.current = response.data.id;
        }
      } catch (err) {
        // Silently fail - tracking shouldn't break the portfolio
        console.debug('Visit tracking skipped:', err.message);
      }
    };

    track();

    // Track session duration when user leaves
    const handleUnload = () => {
      if (visitIdRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        // Use sendBeacon for reliable delivery on page unload
        const blob = new Blob(
          [JSON.stringify({ sessionDuration: duration })],
          { type: 'application/json' }
        );
        navigator.sendBeacon(`/api/visitors/track/${visitIdRef.current}`, blob);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, []);
};

export default useVisitorTracker;
