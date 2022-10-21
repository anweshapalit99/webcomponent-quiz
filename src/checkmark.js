import { LitElement, html, css } from "lit-element/lit-element.js";

export class Checkmark extends LitElement {
  static styles = css`
    .checkmark {
      display: inline-block;
      width: 20px;
      height: 20px;
      -ms-transform: rotate(45deg); /* IE 9 */
      -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
      transform: rotate(45deg);
    }

    .checkmark_circle {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: green;
      border-radius: 11px;
      left: 0;
      top: 0;
    }

    .checkmark_stem {
      position: absolute;
      width: 3px;
      height: 9px;
      background-color: #fff;
      left: 10px;
      top: 5px;
    }

    .checkmark_kick {
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: #fff;
      left: 7px;
      top: 11px;
    }
  `;
  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html` <span class="checkmark">
      <div class="checkmark_circle"></div>
      <div class="checkmark_stem"></div>
      <div class="checkmark_kick"></div>
    </span>`;
  }
}
customElements.define("check-mark", Checkmark);
