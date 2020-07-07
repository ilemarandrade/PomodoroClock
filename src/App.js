import React from "react";
import "./styles.css";
//import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: this.props.cronometro.break,
      session: this.props.cronometro.session,
      seconds: 0
    };
    this.breakHandler = this.breakHandler.bind(this);
    this.sessionHandler = this.sessionHandler.bind(this);
    this.start_stopHandler = this.start_stopHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    //
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  breakHandler(e) {
    //Cambia el break
    if (
      (this.props.cronometro.break === 1 &&
        e.target.id !== "break-increment") ||
      (this.props.cronometro.break === 60 &&
        e.target.id === "break-increment") ||
      this.props.cronometro.start === "stop"
    ) {
      return;
    }
    if (e.target.id === "break-increment") {
      this.props.BreakIncrement();
      this.setState({
        break: this.state.break + 1
      });
      return;
    }

    this.props.BreakDecrement();
    this.setState({
      break: this.state.break - 1
    });
  }
  sessionHandler(e) {
    //Cambia el Session

    if (
      (this.props.cronometro.session === 1 &&
        e.target.id !== "session-increment") ||
      (this.props.cronometro.session === 60 &&
        e.target.id === "session-increment") ||
      this.props.cronometro.start === "stop"
    ) {
      return;
    }
    if (e.target.id === "session-increment") {
      this.props.SessionIncrement();
      this.setState({
        session: this.state.session + 1
      });
      return;
    }

    this.props.SessionDecrement();
    this.setState({
      session: this.state.session - 1
    });
  }

  start() {
    const _this = this;
    this.time === 0 && (this.display.style.color = "red");
    this.time >= 1 && (this.display.style.color = "white");
    function timeActual() {
      _this.time <= 1 && (_this.display.style.color = "red");
      _this.time > 1 && (_this.display.style.color = "white");
      if (_this.state.seconds === 0 && _this.time === 0) {
        _this.props.cronometro.typeTime === "session"
          ? _this.props.TypeTimeSession()
          : _this.props.TypeTimeBreak();
        _this.props.cronometro.typeTime === "session"
          ? _this.setState({
              session: _this.props.cronometro.session
            })
          : _this.setState({
              break: _this.props.cronometro.break
            });
        _this.playAlarm();
        _this.display.style.color = "white";
      }

      if (
        _this.state.seconds === 0 &&
        (_this.state.session > 0 || _this.state.break > 0)
      ) {
        _this.props.cronometro.typeTime === "session"
          ? _this.setState({
              seconds: 60,
              session: _this.state.session - 1
            })
          : _this.setState({
              seconds: 60,
              break: _this.state.break - 1
            });
      }
      _this.setState({
        seconds: _this.state.seconds - 1
      });
    }
    const myInterval = setInterval(timeActual, 1000);
    this.setState({
      myInterval: myInterval
    });
  }

  start_stopHandler(e) {
    if (this.props.cronometro.start === "start") {
      this.props.stopStart();
      this.start();
    } else {
      this.props.startStop();
      this.resetInterval();
    }
  }
  resetInterval(e) {
    clearInterval(this.state.myInterval);
    this.setState({
      myInterval: null
    });
  }
  resetHandler() {
    this.setState((state, props) => {
      return { session: props.cronometro.session, seconds: 0 };
    });
    this.resetInterval();
    this.props.Reset();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.display.style.color = "white";
  }
  playAlarm() {
    // console.log(this.audioBeep);
    this.audioBeep.play();
  }

  render() {
    this.time =
      this.props.cronometro.typeTime === "session"
        ? this.state.session
        : this.state.break;
    const titleCronometro =
      this.props.cronometro.typeTime === "session" ? "Session" : "Break";
    const zeroS = this.state.seconds < 10 ? "0" : "";
    const zeroM = this.time < 10 ? "0" : "";

    return (
      <div>
        {/* <Helmet>
          <script
            async
            src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
          />
        </Helmet>
       */}
        <h1>Reloj Pomodoro</h1>
        <div id="breakSession" className="flex-row">
          <div id="break" className="flex-column">
            <p id="break-label">Break Lenght</p>
            <div className="flex-row handler">
              <div onClick={this.breakHandler}>
                <i id="break-decrement" className="fa fa-arrow-down" />
              </div>
              <p id="break-length">{this.props.cronometro.break}</p>
              <div onClick={this.breakHandler}>
                <i id="break-increment" className="fa fa-arrow-up" />
              </div>
            </div>
          </div>
          <div id="session">
            <p id="session-label">Session Lenght</p>
            <div className="flex-row handler">
              <div onClick={this.sessionHandler}>
                <i id="session-decrement" className="fa fa-arrow-down" />
              </div>
              <p id="session-length">{this.props.cronometro.session}</p>
              <div onClick={this.sessionHandler}>
                <i id="session-increment" className="fa fa-arrow-up" />
              </div>
            </div>
          </div>
        </div>
        <div className="centradoPerfecto">
          <div
            id="display"
            className="centradoPerfecto flex-column"
            ref={div => {
              this.display = div;
            }}
            style={{ color: "" }}
          >
            <h2 id="timer-label">{titleCronometro}</h2>
            <div>
              <audio
                id="beep"
                src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
                preload="auto"
                ref={audio => {
                  this.audioBeep = audio;
                }}
              />
              <p id="time-left">
                {zeroM}
                {this.time}:{zeroS}
                {this.state.seconds}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div id="botones" className="flex-row">
            <div id="start_stop" onClick={this.start_stopHandler}>
              <i className="fa fa-play" />
              <i className="fa fa-pause" />
            </div>
            <div id="reset" onClick={this.resetHandler}>
              <i className="fa fa-undo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    cronometro: store
  };
};
const mapDispatchToProps = dispatch => {
  return {
    TypeTimeSession: () => dispatch({ type: "SESSION" }),
    TypeTimeBreak: () => dispatch({ type: "BREAK" }),
    SessionIncrement: () => dispatch({ type: "INCREMENT+S" }),
    SessionDecrement: () => dispatch({ type: "DECREMENT+S" }),
    BreakIncrement: () => dispatch({ type: "INCREMENT+B" }),
    BreakDecrement: () => dispatch({ type: "DECREMENT+B" }),
    startStop: () => dispatch({ type: "START" }),
    stopStart: () => dispatch({ type: "STOP" }),
    Reset: () => dispatch({ type: "RESET" })
  };
};
//const mapDispatchToProps = dispatch => {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
