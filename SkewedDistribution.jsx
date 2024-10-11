import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';

const SkewedDistribution = () => {
  const [mean, setMean] = useState(0);
  const [standardDeviation, setStandardDeviation] = useState(1);
  const [skewness, setSkewness] = useState(0);

  const generateData = useCallback(() => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const z = (x - mean) / standardDeviation;
      const y = Math.exp(-Math.pow(z, 2) / 2) / (standardDeviation * Math.sqrt(2 * Math.PI));
      const skewedY = y * (1 + skewness * z);
      data.push({ x, y: skewedY });
    }
    return data;
  }, [mean, standardDeviation, skewness]);

  const data = generateData();

  const mode = mean - skewness * standardDeviation;
  const median = mean - 0.5 * skewness * standardDeviation;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Interactive Skewed Distribution</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Mean: {mean.toFixed(2)}
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="block mb-2">
          Standard Deviation: {standardDeviation.toFixed(2)}
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={standardDeviation}
            onChange={(e) => setStandardDeviation(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="block mb-2">
          Skewness: {skewness.toFixed(2)}
          <input
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={skewness}
            onChange={(e) => setSkewness(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="x" />
          <YAxis />
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
          <ReferenceLine x={mode} stroke="red" label={{ value: 'Moda', position: 'top' }} />
          <ReferenceLine x={median} stroke="green" label={{ value: 'Mediana', position: 'top' }} />
          <ReferenceLine x={mean} stroke="blue" label={{ value: 'Media', position: 'top' }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <p><strong>Moda:</strong> {mode.toFixed(2)}</p>
        <p><strong>Mediana:</strong> {median.toFixed(2)}</p>
        <p><strong>Media:</strong> {mean.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <p><strong>Tipo de asimetría:</strong> {skewness < 0 ? "Negativa" : skewness > 0 ? "Positiva" : "Normal (sin asimetría)"}</p>
        <p><strong>Explicación:</strong> {
          skewness < 0 ? 
          "La cola izquierda es más larga. La moda está a la derecha, seguida por la mediana y luego la media." :
          skewness > 0 ?
          "La cola derecha es más larga. La moda está a la izquierda, seguida por la mediana y luego la media." :
          "La distribución es simétrica. La moda, mediana y media coinciden."
        }</p>
      </div>
    </div>
  );
};

export default SkewedDistribution;