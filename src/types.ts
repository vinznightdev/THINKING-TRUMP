export interface TrumpThoughtResponse {
  thought: string;
  source: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface FloatingMeme {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
}
