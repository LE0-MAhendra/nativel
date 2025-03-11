import { create } from "zustand";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    loadTodos: () => Promise<void>;
}

// Helper functions to handle async storage
const TODO_STORAGE_KEY = "todos";

// Save todos to AsyncStorage
const saveTodos = async (todos: Todo[]) => {
    try {
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error("Failed to save todos:", error);
    }
};

// Load todos from AsyncStorage
const loadTodos = async () => {
    try {
        const storedTodos = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
        console.error("Failed to load todos:", error);
        return [];
    }
};

// Create the Zustand store
export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    filterType: { type: "calender" },

    // Load todos from storage on app start
    loadTodos: async () => {
        const todos = await loadTodos();
        set({ todos });
    },

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
    addTodo: async (title, dueDate) => {
        set((state) => {
            const newTodo: Todo = {
                id: state.todos.length + 1,
                title,
                isFinished: false,
                createdAt: moment().format("YYYY-MM-DD"),
                dueDate,
            };
            const updatedTodos = [...state.todos, newTodo];
            saveTodos(updatedTodos); // Persist to storage
            return { todos: updatedTodos };
        });
    },

    // Edit an existing todo
    editOneTodo: async (id, updatedFields) => {
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedFields } : todo
            );
            saveTodos(updatedTodos); // Persist to storage
            return { todos: updatedTodos };
        });
    },

    // Delete a todo
    deleteOneTodo: async (id) => {
        set((state) => {
            const updatedTodos = state.todos.filter((todo) => todo.id !== id);
            saveTodos(updatedTodos); // Persist to storage
            return { todos: updatedTodos };
        });
    },

    // Toggle completion status
    toggleComplete: async (id) => {
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        isFinished: !todo.isFinished,
                        completedDate: !todo.isFinished
                            ? moment().format("YYYY-MM-DD")
                            : undefined,
                    }
                    : todo
            );
            saveTodos(updatedTodos); // Persist to storage
            return { todos: updatedTodos };
        });
    },
}));
