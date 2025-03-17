import { TaskCheckView } from "../../Components/TaskCheckbox/type"


export type MyTaskListProps = {
  view: TaskCheckView, 
  setView: (view: TaskCheckView) => void
}