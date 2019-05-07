import React from 'react'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      startTimer:"05",
      seconds: "00",
      minutes: "05",  // initial 5 minutes
      isResend: false // is otp resend button clicked
    }
    this.secondsLeft = ""; 
    this.counterInterval = "";

    this.countdown = this.countdownFn.bind(this);
    this.counter = this.counter.bind(this);

    this.countdown();   // called 5 minutes countdown
  }

  /**
   * Counter
   */
  counter(){
    
    this.setState({
      ...this.state,isResend:false
    })

    var min = Math.floor(this.secondsLeft / 60);
    var sec = this.secondsLeft - (min * 60);

    this.setState({
      ...this.state,minutes:min,seconds: sec
    })

    if (sec < 10) {
      this.setState({
        ...this.state, seconds: "0" + this.state.seconds
      })
    }
    if (min < 10) {
      this.setState({
        ...this.state, minutes: "0" + min
      })
    }

    if (min === 0 & sec === 0) {
      this.setState({
        ...this.state,isResend:true
      })

      clearInterval(this.counterInterval);  // clear timer when the timer is up.
      
    }

    this.secondsLeft--
  }

  /**
   * Reset timer.
   */
  countdownFn() {
    
    if(this.counterInterval){
      clearInterval(this.counterInterval)   // clear timer if it already in progress.
    }

    let time = this.state.startTimer;
    this.secondsLeft = time * 60;
    
    this.counterInterval = setInterval(this.counter, 1000);
  }

  render(){
    return (
      <div style={{textAlign: 'center'}}>

        {this.state.isResend ? <label>Your OTP is expired.</label>:<label>Your OTP is expiring in <span style={{fontWeight: 'bold'}}>{this.state.minutes}:{this.state.seconds}</span></label>}
        
        <br />
        <button disabled={this.state.minutes>=3} onClick={this.countdown}>Resend OTP</button>
      </div>
    )
  }
}
