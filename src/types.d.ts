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
  queryString: string;
  queryMetrics: QueryMetrics[];
  queryName: string;
  queryCount: number;
  queryDelay: number;
  averageTime: number;
  createdAt: string;
}

export interface GraphData {
  x: number;
  y: number;
  type: string;
  name: string;
  date?: string;
}

export interface RedisData{
  totalTime: number;
  totalTimeQuery:number;
}

export type UserType = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  organization: string,
  database: string,
}

export interface WorkingArr {
  topValue?: number,
  bottomValue?: number,
  numberOfQueries?: number
}

export interface Directions {
  top: number,
  right: number,
  left: number,
  bottom: number
}