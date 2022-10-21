import { LitElement, html, css } from "lit-element/lit-element.js";
import {classMap} from 'lit/directives/class-map.js';
import "./checkmark";

export class Quiz extends LitElement {
  static properties = {
    list: { type: Array },
    shouldDisplay: { type: Boolean },
    score : { type: Number},
    errorStatus: { type: String },
    loadingStatus: { type: String },
  };
  static styles = css`
    label {
      display: block;
      padding: 5px 0px 5px 0px;
    }
    form > fieldset > ul {
      list-style: none;
      padding: 0px;
    }
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0px 10px;
    }
    fieldset {
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-block-start: 0;
      padding-block-end: 0;
      padding-inline-start: 0;
      padding-inline-end: 0;
      border: none;
      min-inline-size: min-content;
    }
    form,
    form > button {
      flex: 1;
      max-width: 700px;
    }
    form > fieldset > ul > li {
      background-color: aliceblue;
      border-radius: 10px;
      border: 1px solid #999;
      padding: 10px;
      margin: 15px 0px;
    }
    check-mark {
      position: absolute;
      padding-left: 5px;
    }
    .scoreCard{
      background-color: rgb(173, 217, 178);
      border-radius: 10px;
      border: 1px solid #999;
      display: flex;
      flex-wrap: wrap;
      margin: 15px 0px;
      padding: 10px;
    }
    .scoreCard >*{
      flex: 50%;
    }
    .form-footer {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15px;
    }
    .btn {
      padding: 10px 20px;
      background-color: #1bba93;
      font-size: 17px;
      border: none;
      border-radius: 5px;
      color: #bcf5e7;
      cursor: pointer;
    }
    .btn:hover {
      background-color: rgb(161 56 209);
    }
    .error {
      background-color: rgb(232, 172, 172);
      border-radius: 10px;
      border: 2px solid rgb(208, 48, 48);
      padding: 10px;
      margin: 15px 0px;
      max-width: 700px;
      width:100%;
    }
    .displayNone{
      display: none;
    }
    /* MOBILE VIEW */
    @media only screen and (max-width: 500px) {
      .btn {
        flex: 1;
      }
      .scoreCard >*{
        flex: 100%;
      }
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.list = [];
    this.shouldDisplay = false;
    this.score = 0;
    this.loadingStatus = "";
    this.errorStatus = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loadingStatus = "Loading...";
    await this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

  }

  async load() {
    try{
      const response = await fetch(
        "https://quizapi.io/api/v1/questions?apiKey=Vmfq8kfLHvop8aUed6mqDFd8eNAvJy7k1qXy66p2&category=Code&limit=10&tags=HTML"
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      this.list = data;
    }
    catch(error){
      this.errorStatus = error.message;
    }
    this.loadingStatus=""
  }

  handleChange = (e,isCorrect) => {
    if(isCorrect === "true"){
      return this.score +=1;
    }
    console.log(e.target)
  }

  pageReload = (e) => {
    e.preventDefault();
    window.location.reload()
  };

  submit = e => {
    e.preventDefault();
    this.shouldDisplay = true;
  }

  // Render the UI as a function of component state
  render() {
    const scoreBoardClass = {
      scoreCard: this.shouldDisplay,
      displayNone : !this.shouldDisplay
    };
    const checkmarkClass = {
      displayNone : !this.shouldDisplay
    }
    return html`
      ${this.loadingStatus || this.errorStatus ? html`
      <section>
        <p>${this.loadingStatus}</p>
        <p>${this.errorStatus}</p>
      </section>`: ''}
      <section>
          <form action="#">
          <div class=${classMap(scoreBoardClass)}>
            <p>Your score is ${this.score} out of 10 !</p>
            <button class="btn" @click=${(e)=>this.pageReload(e)}>Click here to try again!</button>
          </div>
          <fieldset ?disabled=${this.shouldDisplay}>
          <ul>
            ${this.list &&
            this.list.map((item, index) => {
              return html`
                <li id=li${index}_1>
                  <p>${index + 1}. ${item.question}</p>
                  ${item.answers.answer_a ? (html`
                  <label for=${index}_1>
                    <input
                      type="radio"
                      id=${index}_1
                      name=${item.question}
                      value=${item.answers.answer_a}
                      @click="${(e)=> this.handleChange(e,item.correct_answers.answer_a_correct)}"
                    />
                    ${item.answers.answer_a}
                    ${item.correct_answers.answer_a_correct === "true"
                      ? html` <check-mark class=${classMap(checkmarkClass)}></check-mark> `
                      : ``}
                  </label>`): ``}
                  ${item.answers.answer_b ? (html`
                  <label for=${index}_2>
                    <input
                      type="radio"
                      id=${index}_2
                      name=${item.question}
                      value=${item.answers.answer_b}
                      @click="${(e)=> this.handleChange(e,item.correct_answers.answer_b_correct)}"
                    />
                    ${item.answers.answer_b}
                    ${item.correct_answers.answer_b_correct === "true"
                      ? html` <check-mark class=${classMap(checkmarkClass)}></check-mark> `
                      : ``}
                  </label>`): ``}
                  ${item.answers.answer_c ? (html`
                  <label for=${index}_3>
                    <input
                      type="radio"
                      id=${index}_3
                      name=${item.question}
                      value=${item.answers.answer_c}
                      @click="${(e)=> this.handleChange(e,item.correct_answers.answer_c_correct)}"
                    />
                    ${item.answers.answer_c}
                    ${item.correct_answers.answer_c_correct === "true"
                      ? html` <check-mark class=${classMap(checkmarkClass)}></check-mark> `
                      : ``}
                  </label>`): ``}
                  ${item.answers.answer_d ? (html`
                  <label for=${index}_4>
                    <input
                      type="radio"
                      id=${index}_4
                      name=${item.question}
                      value=${item.answers.answer_d}
                      @click="${(e)=> this.handleChange(e,item.correct_answers.answer_d_correct)}"
                    />
                    ${item.answers.answer_d}
                    ${item.correct_answers.answer_d_correct === "true"
                      ? html` <check-mark class=${classMap(checkmarkClass)}></check-mark> `
                      : ``}
                  </label>`): ``}
                </li>
              `;
            })}
          </ul>
          </fieldset>
          <div class="form-footer">
            <button class="btn" type="submit" value="Submit" @click="${(e) => this.submit(e)}">Submit</button>
          </div>
        </form>
      </section>`;
  }
}
customElements.define("quiz-display", Quiz);
