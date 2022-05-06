import { objects } from "./assets/data.json";
import { objects as projects } from "./assets/projects.json";
import moment from "moment";


const veryBigObjects = [
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
  ...objects,
]

const sizes = [100, 1000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const columns = ["size", "page", "chuck", "salary", "map", "sort", "count"];
const sizedObjects = sizes.reduce(
  (acc, size) => ({ ...acc, [size]: veryBigObjects.slice(0, size) }),
  {}
);
const projectsMap = projects.reduce((acc, project) => ({...acc, [project.ID]: project.Project}), {});

window.onload = () => {
  sizes.forEach((size) => {
    const row = document.createElement("tr");

    columns.forEach((column) => {
      const el = document.createElement("td");
      el.setAttribute("id", `${column}${size}`);
      if (column === "size") {
        el.appendChild(document.createTextNode(size));
      }
      row.appendChild(el);
    });
    document.getElementById("results").appendChild(row);
  });
};

const getPage = (objects) =>
  objects.filter((object, index) => index >= 0 && index < 100);
const getChuck = (objects) =>
  objects.filter((object) => object.FirstName.includes("Chuck"));
const getSalary = (objects) =>
  objects.filter((object) => object.Salary >= 4100 && object.Salary <= 4200);
const getSortByFirstName = (objects) => {
  const newObjects = [...objects];
  newObjects.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
  return newObjects;
};
const mapProject = (objects) => objects.map(object => ({...object, ProjectName: projectsMap[object.Project]}));
const getSalaryOfAllObjects = (objects) => objects.reduce((acc, object) => acc + parseInt(object.Salary, 10), 0);

const time = (fn, data) => {
  const start = moment();
  const result = fn(data);
  const end = moment();
  console.log(result);
  return end.diff(start);
};

const writeToCell = (size, type, value) => {
  document.getElementById(`${type}${size}`).innerHTML = value;
};

const runBenchmarkForSize = (size) => {
  writeToCell(size, "page", time(getPage, sizedObjects[size]));
  writeToCell(size, "chuck", time(getChuck, sizedObjects[size]));
  writeToCell(size, "salary", time(getSalary, sizedObjects[size]));
  writeToCell(size, "map", time(mapProject, sizedObjects[size]));
  writeToCell(size, "sort", size < 50000 ? time(getSortByFirstName, sizedObjects[size]): "-");
  writeToCell(size, "count", time(getSalaryOfAllObjects, sizedObjects[size]));
};

const benchmark = async () => {
  return sizes.reduce(async (acc, size) => {
    await acc;
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => runBenchmarkForSize(size))
  }, Promise.resolve());
};

document.getElementById("startBenchmark").onclick = async () => {
  document.getElementById("startBenchmark").style.display = "none";
  document.getElementById("loader").style.display = "block";
  await benchmark();
  console.log("finished");
  document.getElementById("startBenchmark").style.display = "block";
  document.getElementById("loader").style.display = "none";
};
