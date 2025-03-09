import { create } from "zustand";
import moment from "moment";
import { fakedata } from "./dummy/data";

// Define the structure for a Todo item
export interface Todo {
    id: number;
    title: string;
    isFinished: boolean;
    createdAt: string;
    dueDate: string;
    completedDate?: string; // Optional, set when marked complete
}

export interface FilterType {
    type: "calender" | "search";
}

// Define the store state and actions
interface TodoStore {
    todos: Todo[];
    filterType: FilterType;
    getAllTodos: () => Todo[];
    getFilterType: () => FilterType;
    setFilterType: (type: FilterType) => void;
    addTodo: (title: string, dueDate: string) => void;
    editOneTodo: (id: number, updatedFields: Partial<Todo>) => void;
    deleteOneTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
}

// Create the Zustand store
export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: fakedata,
    filterType: { type: "calender" },

    // Get all todos
    getAllTodos: () => get().todos,

    // Get the current filter type
    getFilterType: () => get().filterType,

    // Set the filter type
    setFilterType: (type) => {
        set(() => ({
            filterType: type,
        }));
    },

    // Add a new todo
    addTodo: (title, dueDate) => {
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: state.todos.length + 1,
                    title,
                    isFinished: false,
                    createdAt: moment().format("YYYY-MM-DD"),
                    dueDate,
                },
            ],
        }));
    },

    // Edit an existing todo
    editOneTodo: (id, updatedFields) => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedFields } : todo
            ),
        }));
    },

    // Delete a todo
    deleteOneTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },

    // Toggle completion status
    toggleComplete: (id) => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        isFinished: !todo.isFinished,
                        completedDate: !todo.isFinished
                            ? moment().format("YYYY-MM-DD")
                            : undefined,
                    }
                    : todo
            ),
        }));
    },
}));
