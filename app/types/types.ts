export interface TodoType {
  id: number;
  content: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'incompleted';
