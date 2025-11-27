export interface UserData {
  name: string;
  age: string;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  CELEBRATION = 'CELEBRATION',
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export interface Firework {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  exploded: boolean;
  particles: Particle[];
  vx: number;
  vy: number;
}