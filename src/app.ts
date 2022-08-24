import { singlePageDataType } from "./types";
import getData from "./getData";

let currentPage: number = 1;

let tableData: { [key: number]: singlePageDataType[] } = {};

// getting elements from the dom
const tbody: HTMLTableSectionElement | null = document.querySelector("tbody");
const prevBtn: Element | null = document.querySelector("[data-prevbtn]");
const nextBtn: Element | null = document.querySelector("[data-nextbtn]");
const pageview: Element | null = document.querySelector("[data-pageview]");
const notifier: Element | null = document.querySelector("[data-notifier]");

// click event listener for next btn
nextBtn?.addEventListener("click", () => {
  currentPage = currentPage + 1;
  if (tableData[currentPage]) {
    notifier!.innerHTML = "";
    displayData(tableData[currentPage]);
  } else {
    loadData();
  }
  checkPrevBtnState();
});

// click event listener for previous btn
prevBtn?.addEventListener("click", () => {
  currentPage = currentPage - 1;
  checkPrevBtnState();
  if (tableData[currentPage]) {
    notifier!.innerHTML = "";
    displayData(tableData[currentPage]);
  } else {
    loadData();
  }
  checkPrevBtnState();
});

// disable and enabling fot previous btn
const checkPrevBtnState = () => {
  if (currentPage <= 1) {
    prevBtn?.setAttribute("disabled", "true");
  } else {
    prevBtn?.removeAttribute("disabled");
  }
};

// getting the needed new data from the backend
const loadData = () => {
  notifier!.innerHTML = "<label>Loading...</label>";
  getData(currentPage)
    .then((data) => {
      tableData = { ...tableData, ...data.results[0] };
      displayData(tableData[currentPage]);
      notifier!.innerHTML = "";
    })
    .catch((err) => {
      currentPage = currentPage - 1;
      notifier!.innerHTML = "<label class='error'>Error loading data</label>";
      console.error(err);
    });
};

// updating label showing current page
const previewLabel = () => {
  pageview!.innerHTML = `Showing Page ${currentPage}`;
};

// displaying the needed data for the table
const displayData = (datas: singlePageDataType[]) => {
  tbody!.innerHTML = "";
  datas.forEach((data) => {
    tbody!.innerHTML += `
    <tr  data-entryid=${data.id}>
    <td>${data.row}</td>
    <td>${data.gender}</td>
    <td>${data.age}</td>
  </tr>
  `;
  });
  previewLabel();
};

const startApp = async () => {
  loadData();
};

document.addEventListener("DOMContentLoaded", startApp);
