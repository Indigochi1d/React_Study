import { createStore } from "redux";
//Make DOM reference
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//define Action type and function
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({
  type: TOGGLE_SWITCH,
});
const increase = (diffrence) => ({
  type: INCREASE,
  diffrence,
});
const decrease = () => ({
  type: DECREASE,
});
//Initial value
const initialState = {
  toggle: false,
  counter: 0,
};
//Define Reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.diffrence,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
//Make store
const store = createStore(reducer);
//Make render function
const render = () => {
  const state = store.getState();
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  counter.innerText = state.counter;
};

render();

//Subscribe -> react-redux library에서는 사용 x 왜냐하면 library가 이 작업을 대신함.
store.subscribe(render);

//Dispatch Action
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () =>{
    store.dispatch(decrease());
}
