export interface QueryMetrics {
  planningTime: number;
  executionTime: number;
  totalTime: number;
  cacheSize: string;
  workingMem: string;
  sharedHitBlocks: number;
  sharedReadBlocks: number;
}

export interface QueryData {
  _id: number;
  querystring: string;
  querymetrics: QueryMetrics[];
  queryname: string;
  querycount: number;
  querydelay: number;
  averagetime: number;
  created_at: string;
}

export type UserType = {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  organization: string,
  database: string,
}