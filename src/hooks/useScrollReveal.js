import { useEffect, useRef } from 'react';

/**
 * useScrollReveal Hook
 * 
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it adds the 'is-revealed' class.
 * 
 * @param {Object} options IntersectionObserver options (root, rootMargin, threshold)
 * @returns {Object} React ref to attach to the target DOM element
 */
export function useScrollReveal(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const currentLocalRef = element;

    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting the viewport, add the reveal class
      if (entry.isIntersecting) {
        currentLocalRef.classList.add('is-revealed');
        // Stop observing once revealed so it doesn't animate out and back in
        observer.unobserve(currentLocalRef);
      }
    }, options);

    observer.observe(currentLocalRef);

    // Cleanup function
    return () => {
      if (currentLocalRef) {
        observer.unobserve(currentLocalRef);
      }
    };
  }, [options.rootMargin, options.threshold]); // Depend on destructured options to avoid unnecessary re-runs

  return ref;
}
