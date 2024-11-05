// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';


const App = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if ('Accelerometer' in window) {
      try {
        const accelerometer = new Accelerometer({ frequency: 60 });
        accelerometer.addEventListener('reading', () => {
          const acceleration = Math.sqrt(
            accelerometer.x ** 2 + accelerometer.y ** 2 + accelerometer.z ** 2
          );
          
          if (acceleration > 15) { // Условие для встряхивания
            setShakeCount((prevCount) => prevCount + 1);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300); // Остановка анимации после встряхивания
          }
        });
        accelerometer.start();
      } catch (err) {
        setError('Ошибка доступа к датчикам движения.');
      }
    } else {
      setError('Датчики движения не поддерживаются на этом устройстве.');
    }
  }, []);

  const resetCounter = () => setShakeCount(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Shake Counter</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div
            className={`w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl ${
              isShaking ? 'animate-pulse' : ''
            }`}
          >
            {shakeCount}
          </div>
          <button
            onClick={resetCounter}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Сбросить счетчик
          </button>
        </>
      )}
    </div>
  );
}
export default App;
