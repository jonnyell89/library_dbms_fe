import "./style.scss";
// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.ts";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

document.querySelector<HTMLDivElement>("#oldContainer__form")!.innerHTML = `
  <form action="/api/members" method="get">
    <p>
      <label for="name">Name</label><br>
      <input type="text" id="name" name="member_name" required />
    </p>
    <p>
      <label for="email">Email</label><br>
      <input type="email" id="email" name="member_email required" />
    </p>
    <p class="button">
      <button type="submit">Submit</button>
    </p>
  </form>
`;

document.querySelector<HTMLDivElement>("#newContainer__form")!.innerHTML = `
  <form action="/api/members" method="post">
    <p>
      <label for="name">Name</label><br>
      <input type="text" id="name" name="member_name" required />
    </p>
    <p>
      <label for="email">Email</label><br>
      <input type="email" id="email" name="member_email" required />
    </p>
    <p>
      <label for="line1">Line 1</label><br>
      <input type="text" id="line1" name="member_line1" required />
    </p>
    <p>
      <label for="line2">Line 2</label><br>
      <input type="text" id="line2" name="member_line2" required />
    </p>
    <p>
      <label for="city">City</label><br>
      <input type="text" id="city" name="member_city" required />
    </p>
    <p>
      <label for="county">County</label><br>
      <input type="text" id="county" name="member_county" required />
    </p>
    <p>
      <label for="postcode">Postcode</label><br>
      <input type="text" id="postcode" name="member_postcode" required />
    </p>
    <p class="button">
      <button type="submit">Submit</button>
    </p>
  </form>
`;
