
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { RegisterGun } from './components/RegisterGun';
import { ScanView } from './components/ScanView';
import { ShieldCheckIcon, QrCodeIcon } from './components/icons';

type View = 'register' | 'scan';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('register');

  const renderView = () => {
    switch (currentView) {
      case 'register':
        return <RegisterGun />;
      case 'scan':
        return <ScanView />;
      default:
        return <RegisterGun />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col md:flex-row">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                {currentView === 'register' ? 
                  <ShieldCheckIcon className="h-8 w-8 text-blue-400" /> : 
                  <QrCodeIcon className="h-8 w-8 text-blue-400" />
                }
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {currentView === 'register' ? 'Gun Registration' : 'Scan & Verify'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {currentView === 'register' ? 'Securely register a new firearm and its owner.' : 'Look up firearm details using its serial number.'}
                </p>
              </div>
            </div>
          </header>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
