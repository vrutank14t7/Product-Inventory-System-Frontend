import React, { useEffect, useState } from 'react';

const snakeToTitleCase = (snakeCaseStr) => {
  const words = snakeCaseStr.split('_');
  const titleCaseStr = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return titleCaseStr;
};

const InputError = ({ message }) => {
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (message) {
      setShouldShake(true);
      const timer = setTimeout(() => {
        setShouldShake(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const shakeAnimation = {
    animation: shouldShake ? 'shake 0.5s ease-in-out' : '',
  };

  const shakeKeyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;

  const errorContainerStyle = {
    color: 'red',
    fontSize: '14px',
    padding: '0.5rem',
    textAlign: 'left',
    ...shakeAnimation,
  };

  return (
    <div style={errorContainerStyle}>
      {snakeToTitleCase(message)}
      <style>{shakeKeyframes}</style>
    </div>
  );
};

export default InputError;
