
import React, { useState, useCallback } from 'react';
import { Gun, Owner } from '../types';
import { geminiService } from '../services/geminiService';
import { gunApiService } from '../services/gunApiService';

interface FormState {
  gun: Omit<Gun, 'registrationDate' | 'owner'>;
  owner: Owner;
}

const initialFormState: FormState = {
  gun: {
    serialNumber: '',
    manufacturer: '',
    model: '',
    description: '',
  },
  owner: {
    fullName: '',
    idNumber: '',
    address: '',
  },
};

export const RegisterGun: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ai-loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleGunChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, gun: { ...prev.gun, [name]: value } }));
  };
  
  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, owner: { ...prev.owner, [name]: value } }));
  };

  const handleGenerateDescription = useCallback(async () => {
    const { manufacturer, model } = formData.gun;
    if (!manufacturer || !model) {
      setStatus('error');
      setMessage('Please enter Manufacturer and Model first.');
      return;
    }

    setStatus('ai-loading');
    setMessage('');
    try {
      const description = await geminiService.generateGunDescription(manufacturer, model);
      setFormData(prev => ({ ...prev, gun: { ...prev.gun, description } }));
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  }, [formData.gun]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    
    const registrationData = { ...formData.gun, owner: formData.owner };

    try {
      await gunApiService.registerGun(registrationData);
      setStatus('success');
      setMessage('Firearm registered successfully!');
      setFormData(initialFormState);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to register firearm.');
    }
  };

  const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-3 text-blue-300">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
    </div>
  );
  
  const InputField: React.FC<{ name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; fullWidth?: boolean, required?: boolean }> = 
    ({ name, label, value, onChange, fullWidth = false, required = true }) => (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Firearm Details">
        <InputField name="serialNumber" label="Serial Number" value={formData.gun.serialNumber} onChange={handleGunChange} />
        <InputField name="manufacturer" label="Manufacturer" value={formData.gun.manufacturer} onChange={handleGunChange} />
        <InputField name="model" label="Model" value={formData.gun.model} onChange={handleGunChange} />
        <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.gun.description}
                onChange={handleGunChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter description or generate with AI"
            />
            <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={status === 'ai-loading'}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                {status === 'ai-loading' ? 'Generating...' : 'Generate with AI'}
            </button>
        </div>
      </FormSection>

      <FormSection title="Owner Details">
        <InputField name="fullName" label="Full Name" value={formData.owner.fullName} onChange={handleOwnerChange} />
        <InputField name="idNumber" label="ID Number" value={formData.owner.idNumber} onChange={handleOwnerChange} />
        <InputField name="address" label="Address" value={formData.owner.address} onChange={handleOwnerChange} fullWidth />
      </FormSection>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-900 disabled:bg-green-800 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Registering...' : 'Register Firearm'}
        </button>
      </div>

       {message && (
        <div className={`mt-4 p-4 rounded-md text-sm ${
          status === 'success' ? 'bg-green-900/50 text-green-300' : 
          status === 'error' ? 'bg-red-900/50 text-red-300' : ''
        }`}>
          {message}
        </div>
      )}
    </form>
  );
};
