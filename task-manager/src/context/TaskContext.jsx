import { createContext, useContext, useReducer } from "react";

const initialState = {
  tasks: [],
  filter: "all",
  searchText: "",
  isLoading: false,
  history: [],
};

const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  EDIT_TASK: "EDIT_TASK",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH: "SET_SEARCH",
  UNDO_ACTION: "UNDO_ACTION",
  SET_LOADING: "SET_LOADING",
};

const taskReducer = (state, action) => {
  //   const saveToHistory = (currentState) => {
  //     return {
  //       ...currentState,
  //       history: [currentState, ...currentState.history.slice(0, 9)],
  //     };
  //   };

  const saveToHistory = (previousState, currentState) => {
    // console.log({ previousState, currentState });
    // console.log({
    //   updated: {
    //     ...currentState,
    //     history: [previousState, ...previousState.history.slice(0, 9)],
    //   },
    // });
    return {
      ...currentState,
      //   history: [previousState, ...previousState.history.slice(0, 9)],
      history: [previousState, ...previousState.history],
    };
  };

  const {
    task = {},
    filter = "all",
    search = "",
    isLoading = false,
  } = action.payload;
  const {
    id = "",
    title = "",
    description = "",
    completed = false,
    priority = "medium",
  } = task;

  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
        priority: priority || "medium",
        createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      };

      //   return saveToHistory({
      //     ...state,
      //     tasks: [newTask, ...state.tasks],
      //   });
      return saveToHistory(
        { ...state },
        { ...state, tasks: [newTask, ...state.tasks] },
      );
    }

    case ACTIONS.DELETE_TASK: {
      const remainingTasks = state.tasks.filter((task) => task.id !== id);

      //   return saveToHistory({ ...state, tasks: remainingTasks });
      return saveToHistory({ ...state }, { ...state, tasks: remainingTasks });
    }

    case ACTIONS.TOGGLE_TASK: {
      const updatedTask = state.tasks.map((task) => {
        if (task.id === id) {
          // return { ...task, completed, updatedAt: new Date().toISOString() };
          return { ...task, completed };
        }

        return task;
      });

      return saveToHistory({ ...state }, { ...state, tasks: updatedTask });
      //   return saveToHistory({ ...state, tasks: updatedTask });
    }

    case ACTIONS.EDIT_TASK: {
      const updatedTask = state.tasks.map((currTask) => {
        if (currTask.id === id) {
          // return { ...currTask, ...task, updatedAt: new Date().toISOString() };
          return { ...currTask, ...task };
        }

        return currTask;
      });

      return saveToHistory({ ...state }, { ...state, tasks: updatedTask });
      //   return saveToHistory({ ...state, tasks: updatedTask });
    }

    case ACTIONS.SET_FILTER:
      return { ...state, filter };

    case ACTIONS.SET_SEARCH:
      return { ...state, searchText: search };

    case ACTIONS.UNDO_ACTION: {
      if (state.history.length > 0) {
        const [prevState, ...restHistory] = state.history;
        return {
          ...prevState,
          history: restHistory,
        };
      }

      return state;
    }

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TaskContext = createContext();

export const useTaskConext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskConext must be used within TaskProvider");
  }

  return context;
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (taskData) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: { task: taskData } });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: { task: { id: taskId } } });
  };

  const toggleTask = (taskId, completed) => {
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      payload: { task: { id: taskId, completed } },
    });
  };

  const editTask = (updatedTaskData) => {
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { task: updatedTaskData } });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { filter } });
  };

  const setSearch = (search) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: { search } });
  };

  const undoAction = () => {
    dispatch({ type: ACTIONS.UNDO_ACTION, payload: {} });
  };

  const setLoading = () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: {} });
  };

  const filteredTasks = state.tasks.filter((task) => {
    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "completed" && state.completed) ||
      (state.filter === "pending" && !state.completed);

    const trimedSearchText = state.searchText.trim();
    const matchesQuery =
      trimedSearchText === "" ||
      task.title.toLowerCase().includes(trimedSearchText.toLowerCase()) ||
      task.description.toLowerCase().includes(trimedSearchText.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  const taskStats = {
    total: state.tasks.length,
    completed: state.tasks.filter((task) => task.completed).length,
    pending: state.tasks.filter((task) => !task.completed).length,
  };

  const value = {
    tasks: filteredTasks,
    filter: state.filter,
    searchText: state.searchText,
    isLoading: state.isLoading,
    taskStats,
    canUndo: state.history.length > 0,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    setFilter,
    setSearch,
    undoAction,
    setLoading,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
