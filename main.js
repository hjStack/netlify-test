// 유저가 값을 입력

// + 버튼을 누르면 할일이 추가
// - 버튼을 누르면 할일이 삭제

// check 버튼을 누르면 할일이 끝나면서 밑줄이 감

// 1. check 버튼을 클릭한 순간 true false
// 2. true이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면 언더바가 이동
// 끝남탭은 끝난 아이템만
// 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let mode = "all";

let taskList = [];
let filterList = [];

let tabs = document.querySelectorAll(".task-tabs div");
console.log(tabs);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  // 내가 선택한 탭에 따라 리스트를 달리 보여줌

  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  } else if (mode === "done") {
    list = filterList;
  }

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div class="button-area">
            <button onclick="toggleComplete('${list[i].id}')">check</button>
            <button onclick="toggleDelete('${list[i].id}')">delete</button>
          </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
          <div>${list[i].taskContent}</div>
          <div class="button-area">
            <button onclick="toggleComplete('${list[i].id}')">check</button>
            <button onclick="toggleDelete('${list[i].id}')">delete</button>
          </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function toggleDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }

  filter();
}

function filter(event) {
  // 누구를 클릭했는지에 대한 정보를 가져옴
  // 모두, 진행중, 끝남 중에

  filterList = [];

  if (event) {
    mode = event.target.id;

    // ⭐ 언더라인 이동 로직 시작 ⭐
    let underLine = document.getElementById("under-line");
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    // ⭐ 언더라인 이동 로직 끝 ⭐
  }

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }

    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }

    render();
  }

  render();
  console.log("진행중 : " + filterList);
}

// 날짜를 화면에 표시하는 함수
function showTodayDate() {
  let dateElement = document.getElementById("today-date");
  let today = new Date();

  // 한국어 날짜 형식 옵션 설정
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  // 예: "2026년 8월 3일 월요일" 형태로 변환하여 화면에 삽입
  dateElement.textContent = today.toLocaleDateString("ko-KR", options);
}

// 스크립트가 로드될 때 바로 날짜 함수 실행
showTodayDate();
