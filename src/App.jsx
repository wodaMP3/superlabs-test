// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';


const App = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      // разрешение на доступ к данным датчиков
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          } else {
            setError('Доступ к датчикам движения отклонен.');
          }
        })
        .catch(() => {
          setError('Ошибка доступа к датчикам движения.');
        });
    } else if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleMotion);
    } else {
      setError('Датчики движения не поддерживаются на этом устройстве.');
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  const handleMotion = (event) => {
    const acceleration = Math.sqrt(
      event.acceleration.x ** 2 + event.acceleration.y ** 2 + event.acceleration.z ** 2
    );

    if (acceleration > 15) { // Порог встряхивания
      setShakeCount((prevCount) => prevCount + 1);
      setIsShaking(true);

      // Остановка анимации через 500 мс
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const resetCounter = () => setShakeCount(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Shake Counter</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div
            className={`w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl transition-transform ${
              isShaking ? 'animate-bounce' : ''
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
