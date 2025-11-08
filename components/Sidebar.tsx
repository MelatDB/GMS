
import React from 'react';
import { ShieldCheckIcon, QrCodeIcon, CogIcon } from './icons';

type View = 'register' | 'scan';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600/20 text-blue-300'
          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};


export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-full md:w-64 bg-gray-800/50 backdrop-blur-sm p-4 md:border-r border-gray-700">
      <div className="flex items-center space-x-3 mb-8 px-2">
        <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Gun Registry</h2>
      </div>
      <nav className="space-y-2">
        <NavItem
          icon={<ShieldCheckIcon className="h-6 w-6" />}
          label="Register Gun"
          isActive={currentView === 'register'}
          onClick={() => setCurrentView('register')}
        />
        <NavItem
          icon={<QrCodeIcon className="h-6 w-6" />}
          label="Scan & Verify"
          isActive={currentView === 'scan'}
          onClick={() => setCurrentView('scan')}
        />
      </nav>
      <div className="mt-auto absolute bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto md:mt-10">
         <NavItem
          icon={<CogIcon className="h-6 w-6" />}
          label="Settings"
          isActive={false}
          onClick={() => {}}
        />
      </div>
    </aside>
  );
};
