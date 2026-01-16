import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setVisible(entry.isIntersecting);
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;