import React from 'react';
import { Gun } from '../types';
// FIX: Removed unused and non-existent CalendarIcon import.
import { UserIcon, DocumentTextIcon } from './icons';

interface GunDetailsCardProps {
  gun: Gun;
}

const DetailItem: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
  <div className={className}>
    <p className="text-sm font-medium text-gray-400">{label}</p>
    <p className="text-lg text-white">{value}</p>
  </div>
);

export const GunDetailsCard: React.FC<GunDetailsCardProps> = ({ gun }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-500/20">
      <div className="p-6 bg-gray-800 border-b-2 border-blue-500">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <DocumentTextIcon className="h-10 w-10 text-blue-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <h2 className="text-2xl font-bold text-white truncate">{gun.manufacturer} {gun.model}</h2>
            <p className="mt-1 text-sm text-gray-400">S/N: {gun.serialNumber}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div>
            <h3 className="text-lg font-medium text-blue-300 mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{gun.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-700">
            <DetailItem label="Manufacturer" value={gun.manufacturer} />
            <DetailItem label="Model" value={gun.model} />
            <DetailItem label="Serial Number" value={gun.serialNumber} />
            <DetailItem label="Registration Date" value={new Date(gun.registrationDate).toLocaleDateString()} />
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-800/50 p-6">
        <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
                <UserIcon className="h-8 w-8 text-blue-400" />
            </div>
            <div className="ml-4 w-0 flex-1">
                <h3 className="text-xl font-bold text-white">Registered Owner</h3>
                <div className="mt-3 space-y-3">
                    <DetailItem label="Full Name" value={gun.owner.fullName} />
                    <DetailItem label="ID Number" value={gun.owner.idNumber} />
                    <DetailItem label="Address" value={gun.owner.address} className="col-span-2"/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};