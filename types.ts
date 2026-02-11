
export enum Emotion {
  CALM = 'CALM',
  MOTIVATED = 'MOTIVATED',
  SAD = 'SAD',
  FOCUS = 'FOCUS',
}

export type ContentType = 'NOTE' | 'IMAGE' | 'LINK';

export interface BoardItem {
  id: string;
  type: ContentType;
  title: string;
  content: string; // Text content or URL
  emotion: Emotion;
  timestamp: number;
}

export interface ThemeConfig {
  bg: string;
  accent: string;
  text: string;
  card: string;
  button: string;
  icon: string;
  spacing: string;
  label: string;
}

export interface SmartInsight {
  title: string;
  description: string;
  suggestedAction: string;
}
