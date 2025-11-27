import React from 'react';
import { UserData } from '../types';
import { RefreshCw, Star } from 'lucide-react';

interface CelebrationScreenProps {
  userData: UserData;
  wish: string;
  onReset: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ userData, wish, onReset }) => {
  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
      
      {/* Main Content Container */}
      <div className="max-w-4xl w-full animate-float">
        
        {/* Dynamic Age Badge */}
        <div className="fade-in mb-6 inline-block">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-50 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 w-32 h-32 rounded-full flex items-center justify-center border-4 border-yellow-200 shadow-2xl mx-auto transform hover:scale-110 transition-transform duration-500">
                    <span className="text-6xl font-black text-white drop-shadow-md">
                        {userData.age}
                    </span>
                </div>
            </div>
        </div>

        {/* Happy Birthday Text */}
        <h1 className="fade-in text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-cursive mb-8 leading-tight">
          Happy Birthday <br />
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {userData.name}!
          </span>
        </h1>

        {/* AI Wish Card */}
        <div className="fade-in mx-auto max-w-2xl bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
            
            <Star className="text-yellow-400 w-8 h-8 mx-auto mb-4 animate-spin-slow" />
            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed italic">
            "{wish}"
            </p>
        </div>

        {/* Action Button */}
        <div className="fade-in mt-12">
          <button
            onClick={onReset}
            className="group px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold backdrop-blur-md transition-all flex items-center gap-2 mx-auto hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            Celebrate Someone Else
          </button>
        </div>

      </div>
    </div>
  );
};