import React from 'react';

function Alink({ href, children }) {
  return (
    <a href={href} className="text-pcLightBlack text-sm underline">
      {children}
    </a>
  );
}

export default Alink;
