import { LitElement, html, css } from "lit-element/lit-element.js";

export class Header extends LitElement {
  static properties = {
    name: { type: String },
  };
  static styles = css`
  section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      padding: 5px;
      background-color: rgb(93, 166, 230);
    }
    section > h1 {
      font-size : 3rem;
      margin: 0px;
    }
  `;
  constructor() {
    super();
    // Declare reactive properties
    this.name = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    this.name = "Quizzy";
  }

  // Render the UI as a function of component state
  render() {
    return html`<section><h1>${this.name}</h1></section>`;
  }
}
customElements.define("app-header", Header);
