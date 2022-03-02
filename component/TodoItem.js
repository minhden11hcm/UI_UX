import html from "../core.js";
import { connect } from "../store.js";

const connector = connect();

function TodoItem({ todo, index, editIndex }) {
  return html`
    <li
      class="${todo.complete && "completed"} 
      ${editIndex === index && "editing"}"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${todo.complete && "checked"}
          onchange="dispatch('toggle',${index})"
        />
        <label ondblclick="dispatch('Edit',${index})">${todo.title}</label>
        <button class="destroy" onclick="dispatch('destroy',${index})"></button>
      </div>
      <input
        class="edit"
        value="${todo.title}"
        onkeyup="event.keyCode === 13 && dispatch('reTitle',this.value.trim()) || 
        event.keyCode === 27 && dispatch('cancelEdit')"
        onblur="dispatch('reTitle',this.value.trim())"
      />
    </li>
  `;
}
//onchange="dispatch('toggle',${index})"
export default connector(TodoItem);
