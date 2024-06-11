import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type} font-medium fixed top-2 z-50 mx-auto`}>
      {message}
    </div>
  );
};

export default Toast;
