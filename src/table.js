import { objects } from "./assets/data.json";
import moment from "moment";

const generateHeader = () => {
  const row = document.createElement("tr");
  [
    "ID",
    "JobTitle",
    "EmailAddress",
    "FirstName",
    "LastName",
    "Adress",
    "Salary",
  ].map((col) => {
    const el = document.createElement("td");
    el.appendChild(document.createTextNode(col));
    row.appendChild(el);
  });

  document.getElementById("tableHead").appendChild(row);
};

const generateBody = (objects) => {
  objects.forEach((object) => {
    const row = document.createElement("tr");
    [
      "ID",
      "JobTitle",
      "EmailAddress",
      "FirstName",
      "LastName",
      "Adress",
      "Salary",
    ].map((col) => {
      const el = document.createElement("td");
      el.appendChild(document.createTextNode(object[col]));
      row.appendChild(el);
    });
    document.getElementById("tableBody").appendChild(row);
  });
};

generateHeader(objects);
generateBody(objects);

document.getElementById("chuckFilter").onclick = () => {
  const start = moment();
  document.getElementById("tableBody").innerHTML = "";

  const chucks = objects.filter((object) =>
    object.FirstName.includes("Chuck")
  );
  generateBody(chucks);

  const stop = moment();
  const duration = stop.diff(start);
  console.log(duration);
};

document.getElementById("firstFilter").onclick = () => {
  const start = moment();
  document.getElementById("tableBody").innerHTML = "";

  const items = objects.filter((object, index) => index > 0 && index <= 100);
  generateBody(items);

  const stop = moment();
  const duration = stop.diff(start);
  console.log(duration);
};

document.getElementById("secondFilter").onclick = () => {
  const start = moment();
  document.getElementById("tableBody").innerHTML = "";

  const items = objects.filter((object, index) => index > 100 && index <= 200);
  generateBody(items);

  const stop = moment();
  const duration = stop.diff(start);
  console.log(duration);
};

document.getElementById("salaryFilter").onclick = () => {
  const start = moment();
  document.getElementById("tableBody").innerHTML = "";

  const items = objects.filter((object) => object.Salary >= 4100 && object.Salary <= 4200);
  generateBody(items);

  const stop = moment();
  const duration = stop.diff(start);
  console.log(duration);
};

document.getElementById("firstNameSort").onclick = () => {
  const start = moment();
  document.getElementById("tableBody").innerHTML = "";

  const items = [...objects].sort((a,b) => a.FirstName.localeCompare(b.FirstName));
  generateBody(items);

  const stop = moment();
  const duration = stop.diff(start);
  console.log(duration);
};
