import { LitElement, html, css } from "lit-element/lit-element.js";

export class Radio extends LitElement {
  static styles = css`
  `;
  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html`<label for=${item.id}>
    <input
      type="radio"
      id=${item.id}
      name=${item.answers.answer_a}
      value=${item.answers.answer_a}
      @click="${(e)=> this.handleChange(e)}"
    />
    ${item.answers.answer_a}
    ${item.correct_answers.answer_a_correct === "true"
      ? html` <check-mark></check-mark> `
      : ``}
  </label>`;
  }
}
customElements.define("smart-radio", Radio);
