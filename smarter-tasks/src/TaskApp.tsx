import React, { useEffect } from "react";
import { TaskItem } from "./types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface TaskAppProp {}
interface TaskAppState {
  tasks: TaskItem[];
}
React.useState<TaskAppState>;

const TaskApp = (props: TaskAppProp) => {
  const [taskAppState, setTaskAppState] = useLocalStorage<TaskAppState>(
    "tasks",
    {
      tasks: [],
    }
  );

  React.useEffect(() => {
    const id = setTimeout(() => {
      console.log(`Saved ${taskAppState.tasks.length} items to backend...`);
    }, 5000);
    return () => {
      console.log("clear or cancel any existing network call");
      clearTimeout(id);
    };
  }, [taskAppState.tasks]);

  // ...
  const addTask = (task: TaskItem) => {
    setTaskAppState({ tasks: [...taskAppState.tasks, task] });
  };
  const remove = (titleid: number) => {
    setTaskAppState({
      tasks: taskAppState.tasks.filter((task) => task.id !== titleid),
    });
  };
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-2 font-bold text-slate-700">Smarter Tasks</h1>
      <h1 className="text-lg mb-6 text-slate-600">
        <span className="font-bold">Project: </span>
        Graduation Final Year Project (Revamp college website)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded-xl p-4">
          <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
            Pending
          </h1>
          <TaskForm addTask={addTask} />
          <TaskList tasks={taskAppState.tasks} remove={remove} />
        </div>
      </div>
    </div>
  );
};

// interface TaskAppProp {}
// interface TaskAppState {
//   tasks: TaskItem[];
// }
// class TaskApp extends React.Component<TaskAppProp, TaskAppState> {
//   addTask = (task: TaskItem) => {
//     this.setState((state) => {
//       return {
//         tasks: [...state.tasks, task],
//       };
//     });
//   };
//   constructor(props: TaskAppProp) {
//     super(props);
//     this.state = {
//       tasks: [],
//     };
//   }

//   render() {
//     return (
//       <div className="container py-10 max-w-4xl mx-auto">
//         <h1 className="text-3xl mb-2 font-bold text-slate-700">
//           Smarter Tasks
//         </h1>
//         <h1 className="text-lg mb-6 text-slate-600">
//           <span className="font-bold">Project: </span>
//           Graduation Final Year Project (Revamp college website)
//         </h1>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="border border-slate-200 rounded-xl p-4">
//             <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
//               Pending
//             </h1>
//             <TaskForm addTask={this.addTask} />
//             <TaskList tasks={this.state.tasks} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const TaskApp = () => {
//   const [taskAppState, setTaskAppState] = React.useState<TaskAppState>({
//     tasks: [],
//   });
//   const addTask = (task: TaskItem) => {
//     setTaskAppState({ tasks: [...taskAppState.tasks, task] });
//   };
//   return (
//     <div className="container py-10 max-w-4xl mx-auto">
//       <h1 className="text-3xl mb-2 font-bold text-slate-700">
//         Smarter Tasks
//       </h1>
//       <h1 className="text-lg mb-6 text-slate-600">
//         <span className="font-bold">Project: </span>
//         Graduation Final Year Project (Revamp college website)
//       </h1>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="border border-slate-200 rounded-xl p-4">
//           <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
//             Pending
//           </h1>
//           <TaskForm addTask={addTask} />
//           <TaskList tasks={taskAppState.tasks} />
//         </div>
//       </div>
//     </div>
//   );
// };

export default TaskApp;
