
import React, { useState } from 'react';
import { Gun } from '../types';
import { gunApiService } from '../services/gunApiService';
import { GunDetailsCard } from './GunDetailsCard';

export const ScanView: React.FC = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [gun, setGun] = useState<Gun | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setStatus('loading');
    setGun(null);
    setMessage('');
    try {
      const result = await gunApiService.findGunBySerial(serialNumber);
      if (result) {
        setGun(result);
        setStatus('found');
      } else {
        setStatus('not-found');
        setMessage(`No firearm found with serial number: ${serialNumber}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while searching.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Search Firearm</h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Enter Serial Number (Barcode Scan)"
            className="flex-grow bg-gray-900 border border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Searching...' : 'Find'}
          </button>
        </form>
      </div>

      {status === 'loading' && (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      )}

      {(status === 'not-found' || status === 'error') && (
        <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
            {message}
        </div>
      )}

      {status === 'found' && gun && <GunDetailsCard gun={gun} />}
    </div>
  );
};
