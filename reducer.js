import storage from "./util/kho.js";

const init = {
  todos: storage.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.complete,
    complete: (todo) => todo.complete,
  },
  editIndex: null,
};

const actions = {
  add({ todos }, title) {
    if (title) {
      todos.push({ title: title, complete: false });
      storage.set(todos);
    }
  },
  toggle({ todos }, index) {
    const todo = todos[index];
    todo.complete = !todo.complete;
    storage.set(todos);
  },
  toggleAll({ todos }, complete) {
    todos.forEach((todo) => (todo.complete = complete));
    storage.set(todos);
  },
  destroy({ todos }, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },
  swFilter(state, filter) {
    state.filter = filter;
  },
  clearComplete(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
  Edit(state, index) {
    state.editIndex = index;
  },
  reTitle(state, newTitle) {
    let editIndex = state.editIndex;
    if (editIndex !== null) {
      if (newTitle !== null) {
        state.todos[editIndex].title = newTitle;
        storage.set(state.todos);
      } else {
        this.destroy(state, editIndex);
      }
      state.editIndex = null;
    }
  },
  cancelEdit(state) {
    state.editIndex = null;
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
