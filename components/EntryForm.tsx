import React, { useState } from 'react';
import { UserData } from '../types';
import { Cake, Sparkles, Wand2 } from 'lucide-react';

interface EntryFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

export const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age.trim()) {
      onSubmit({ name: name.trim(), age: age.trim() });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-400 opacity-20 animate-bounce">
          <Cake size={64} />
        </div>
        <div className="absolute bottom-20 right-20 text-pink-400 opacity-20 animate-pulse">
          <Sparkles size={80} />
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-lg shadow-indigo-500/30">
            <Cake className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-cursive">
            Let's Celebrate!
          </h1>
          <p className="text-slate-400 mt-2">
            Tell us who the birthday star is today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-white placeholder-slate-600"
              placeholder="e.g. Alice"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-slate-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              required
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-white placeholder-slate-600"
              placeholder="e.g. 25"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name || !age}
            className="w-full group relative flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Preparing Magic...</span>
              </>
            ) : (
              <>
                <span>Start the Party</span>
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};