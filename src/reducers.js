import { combineReducers } from "redux";

const estadoInicial = {
  break: 5,
  session: 25,
  typeTime: "session",
  start: "start",
  reset: false
};
function changeBreak(state = estadoInicial.break, action) {
  let newState = state;
  switch (action.type) {
    case "INCREMENT+B": {
      newState = state + 1;
      break;
    }
    case "DECREMENT+B": {
      newState = state - 1;
      break;
    }
    case "RESET": {
      newState = estadoInicial.break;
      break;
    }
    default:
  }
  return newState;
}
function changeSession(state = estadoInicial.session, action) {
  let newState = state;
  switch (action.type) {
    case "INCREMENT+S": {
      newState = state + 1;
      break;
    }
    case "DECREMENT+S": {
      newState = state - 1;
      break;
    }
    case "RESET": {
      newState = estadoInicial.session;
      break;
    }
    default:
  }
  return newState;
}
function changeTypeTime(state = estadoInicial.typeTime, action) {
  //console.log(action.type);
  let newState = state;
  switch (action.type) {
    case "SESSION": {
      newState = "break";
      break;
    }
    case "BREAK": {
      newState = "session";
      break;
    }
    case "RESET": {
      newState = estadoInicial.typeTime;
      break;
    }
    default:
  }
  return newState;
}
function changeStart(state = estadoInicial.start, action) {
  let newState = state;
  switch (action.type) {
    case "START": {
      newState = "start";
      break;
    }
    case "STOP": {
      newState = "stop";
      break;
    }
    case "RESET": {
      newState = estadoInicial.start;
      break;
    }
    default:
  }
  return newState;
}
/*function reset(state = estadoInicial, action) {
  
  return { ...state };
}*/

const contenedorDeReducers = combineReducers({
  break: changeBreak,
  session: changeSession,
  typeTime: changeTypeTime,
  start: changeStart
});
export default contenedorDeReducers;
