import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/UseHttp";

const NewTask = (props) => {
  const { isLoading, error, tasksReaquest: sendTasks } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const sendTaskHandler = (taskObj) => {
      const generatedId = taskObj.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    sendTasks(
      {
        url: "https://react-http-db49d-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      sendTaskHandler
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
