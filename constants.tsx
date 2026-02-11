
import React from 'react';
import { 
  CloudRain, 
  Zap, 
  Coffee, 
  Headphones, 
  BookOpen, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  StickyNote 
} from 'lucide-react';
import { Emotion, ThemeConfig, ContentType } from './types';

export const THEMES: Record<Emotion, ThemeConfig> = {
  [Emotion.CALM]: {
    bg: 'bg-[#F0F9FF]',
    accent: 'border-sky-200',
    text: 'text-sky-900',
    card: 'bg-white/80 backdrop-blur-sm',
    button: 'bg-sky-500 hover:bg-sky-600',
    icon: 'text-sky-500',
    spacing: 'gap-8',
    label: '🎧 Calm'
  },
  [Emotion.MOTIVATED]: {
    bg: 'bg-[#FFF7ED]',
    accent: 'border-orange-200',
    text: 'text-orange-900',
    card: 'bg-white',
    button: 'bg-orange-500 hover:bg-orange-600',
    icon: 'text-orange-500',
    spacing: 'gap-4',
    label: '🔥 Motivated'
  },
  [Emotion.SAD]: {
    bg: 'bg-[#F8FAFC]',
    accent: 'border-slate-300',
    text: 'text-slate-800',
    card: 'bg-slate-100/50',
    button: 'bg-slate-700 hover:bg-slate-800',
    icon: 'text-slate-500',
    spacing: 'gap-6',
    label: '🌧 Sad'
  },
  [Emotion.FOCUS]: {
    bg: 'bg-[#F0FDF4]',
    accent: 'border-emerald-200',
    text: 'text-emerald-900',
    card: 'bg-white border',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    icon: 'text-emerald-500',
    spacing: 'gap-2',
    label: '⚡ Focus'
  }
};

export const CONTENT_TYPE_ICONS: Record<ContentType, React.ReactNode> = {
  NOTE: <StickyNote size={18} />,
  IMAGE: <ImageIcon size={18} />,
  LINK: <LinkIcon size={18} />
};

export const EMOTION_ICONS: Record<Emotion, React.ReactNode> = {
  [Emotion.CALM]: <Headphones size={20} />,
  [Emotion.MOTIVATED]: <Zap size={20} />,
  [Emotion.SAD]: <CloudRain size={20} />,
  [Emotion.FOCUS]: <Coffee size={20} />
};
