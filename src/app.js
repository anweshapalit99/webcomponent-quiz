import { LitElement, html, css } from "lit-element/lit-element.js";
import "./header";
import "./quiz";
import "./footer";

export class QuizApp extends LitElement {
  static styles = css``;

  // Render the UI as a function of component state
  render() {
    return html` <app-header></app-header>
      <quiz-display></quiz-display>
      <app-footer></app-footer>`;
  }
}
customElements.define("quiz-app", QuizApp);
