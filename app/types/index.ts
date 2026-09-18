// Type Definitions
export interface Service {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface Guarantee {
  icon: string;
  title: string;
  desc: string;
}

export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  toggleActions?: string;
}

export interface ParticleSystemOptions {
  count: number;
  radius?: number;
  sizeRange?: [number, number];
  alphaRange?: [number, number];
  color?: string;
  blending?: number;
}

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memory?: number;
  quality: 'high' | 'medium' | 'low';
}

export interface QualitySettings {
  particleCount: {
    hero: number;
    background: number;
    contact: number;
  };
  dpr: [number, number];
  shadows: boolean;
  postProcessing: boolean;
  shaderComplexity: 'full' | 'reduced' | 'minimal';
}

export interface DeviceTier {
  tier: 'high' | 'medium' | 'low';
  cores: number;
  memory: number;
  isMobile: boolean;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  twitterCard?: string;
}

export interface EnvConfig {
  NEXT_PUBLIC_WHATSAPP_NUMBER: string;
  NEXT_PUBLIC_INSTAGRAM_HANDLE: string;
  NEXT_PUBLIC_GA_ID?: string;
}