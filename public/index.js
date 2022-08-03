const form = document.querySelector("form");
const stateSelect = document.querySelector("#select-state");
const parkInput = document.querySelector("#input-park");
const parkList = document.querySelector("#park-list");
const addBtn = document.querySelector("#add-button");
// const tag = document.querySelector("#tag");

function getStates() {
  axios.get("http://localhost:3000/states").then((res) => {
    res.data.forEach((state) => {
      let option = document.createElement("option");
      option.setAttribute("value", state["state_id"]);
      option.textContent = state.name;
      stateSelect.appendChild(option);
    });
  });
}
getStates();
function alreadyVisited(id) {
  let card = document.getElementById(id);
  card.style = "filter: grayscale(100%)";
}

function getParks() {
  parkList.innerHTML = "";

  axios.get("http://localhost:3000/parks").then((res) => {
    res.data.forEach((park) => {
      let a = document.createElement("div");
      a.setAttribute("id", park.park_id);
      let parkCard = `<div class="park-card">
      <img src='./pics/${park.state_id}.jpg'>
      <button id="info" onclick="window.open('https://www.google.com/search?q=${park.name}')">click for park info</button>
      <h2>State: ${park.state_name}</h2>
      <h2>Park: ${park.name}</h2>
      <h2>Priority: ${park.priority}</h2>
      
      <button class="belowBtn" onclick="alreadyVisited(${park.park_id})">visited</button>
      <button class="belowBtn" onclick="deleteCard(${park.park_id})">delete</button>
    </div>
    `;

      a.innerHTML += parkCard;
      parkList.appendChild(a);
    });
  });
}

function handleSubmit(e) {
  e.preventDefault();
  if (parkInput.value === "") {
    alert("Please input a park name here.");
    return;
  }
  let priorityValue = document.querySelector(
    'input[name = "rating"]:checked'
  ).value;

  let body = {
    name: parkInput.value,
    priority: priorityValue,
    stateId: +stateSelect.value,
  };
  axios.post("http://localhost:3000/parks", body).then(() => {
    parkInput.value = "";
    getParks();
  });
}

function deleteCard(id) {
  if (confirm("Do you want to delete this park card?")) {
    axios
      .delete(`http://localhost:3000/parks/${id}`)
      .then(() => {
        getParks();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// form.addEventListener("submit", handleSubmit);
addBtn.addEventListener("click", handleSubmit);
getParks();
