import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/UseHttp";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasksHandling = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  const { isLoading, error, tasksReaquest: getTasks } = useHttp();

  useEffect(() => {
    getTasks(
      {
        url: "https://react-http-db49d-default-rtdb.firebaseio.com/tasks.json",
      },
      getTasksHandling
    );
  }, [getTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={getTasks}
      />
    </React.Fragment>
  );
}

export default App;
