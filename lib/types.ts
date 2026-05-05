export type SourceType = "X" | "Reddit" | "Quora" | "Forums" | "RSS";

export type FlagType = "Adverse Event" | "PII Detected" | "PHI Detected" | "Safety Signal" | "Medical Advice";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Paused" | "Draft";
  keywords: string[];
  sources: SourceType[];
  stats: {
    signals7d: number;
    alerts: number;
    avgSentiment: number;
    trend: number[];
  };
  lastCrawl: string;
}

export interface Signal {
  id: string;
  projectId: string;
  source: SourceType;
  author: string;
  content: string;
  timestamp: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  sentimentScore: number;
  confidence: number;
  entities: { text: string; type: string }[];
  flags: FlagType[];
  matchedKeywords: string[];
}

export interface Alert {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: SourceType;
  keyword: string;
  contentExcerpt: string;
  signalType: string;
  confidence: number;
  projectName: string;
  timestamp: string;
  status: "Reviewing" | "Resolved";
}
