import React, { useEffect } from 'react';

const useScript = (resourceUrl) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    script.addEventListener('load', resolve, {
      once: true,
    });
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};
export default useScript;
