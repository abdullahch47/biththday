import React, { useState } from 'react';
import { AppState, UserData } from './types';
import { EntryForm } from './components/EntryForm';
import { CelebrationScreen } from './components/CelebrationScreen';
import { FireworksCanvas } from './components/FireworksCanvas';
import { generateBirthdayWish } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [wish, setWish] = useState<string>('');

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    setAppState(AppState.LOADING);
    
    // Fetch personalized wish from Gemini
    const generatedWish = await generateBirthdayWish(data.name, data.age);
    setWish(generatedWish);
    
    setAppState(AppState.CELEBRATION);
  };

  const handleReset = () => {
    setAppState(AppState.INPUT);
    setUserData(null);
    setWish('');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 text-white selection:bg-pink-500 selection:text-white">
      
      {/* Background Layer - Always present but hidden behind content in INPUT mode, crucial for CELEBRATION */}
      {appState === AppState.CELEBRATION && (
        <FireworksCanvas />
      )}

      {/* Main Content Router */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {appState === AppState.INPUT && (
          <EntryForm 
            onSubmit={handleFormSubmit} 
            isLoading={false} 
          />
        )}
        
        {appState === AppState.LOADING && (
          <EntryForm 
            onSubmit={() => {}} 
            isLoading={true} 
          />
        )}

        {appState === AppState.CELEBRATION && userData && (
          <CelebrationScreen 
            userData={userData} 
            wish={wish} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
};

export default App;