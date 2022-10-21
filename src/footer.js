import { LitElement, html, css } from "lit-element/lit-element.js";

export class Footer extends LitElement {
  static properties = {
    name: { type: String },
  };
  static styles = css`
    section {
      margin-top: 20px;
      height: 20px;
      background-color: black;
    }
  `;
  constructor() {
    super();
    // Declare reactive properties
    this.name = "Footer";
  }

  // Render the UI as a function of component state
  render() {
    return html`<section></section>`;
  }
}
customElements.define("app-footer", Footer);
