import React, { useEffect } from 'react';

const ScrollWrapper = ({ children }) => {
  useEffect(() => {
    // Força o scroll para o topo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Adiciona um handler para impedir o scroll por um breve momento
    const preventDefault = (e) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', preventDefault, { passive: false });

    // Após 100ms, remove o bloqueio de scroll
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventDefault);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventDefault);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollWrapper;
