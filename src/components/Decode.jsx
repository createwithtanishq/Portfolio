import React from 'react';

/* Plain text wrapper. Kept so existing call sites keep working without effects. */
const Decode = ({ text, className = '', as = 'span' }) => {
  const Tag = as;
  return <Tag className={className}>{text}</Tag>;
};

export default Decode;
