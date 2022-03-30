export interface Task {
  id: number;
  name: string;
  projectId: string;
  processorId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}
