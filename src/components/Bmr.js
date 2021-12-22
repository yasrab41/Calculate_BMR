import React, { Component } from "react";
import "./bmr.css";

class Bmr extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      weight: "",
      age: "",
      heightFeet: "",
      heightInches: "",
      activity: "",
      bmr: "",
      calories: "",
      error: ""
    };
  }
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };
  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };
  handleHeightFeetChange = (event) => {
    this.setState({ heightFeet: event.target.value });
  };
  handleHeightInchesChange = (event) => {
    this.setState({ heightInches: event.target.value });
  };
  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };
  handleActivityChange = (event) => {
    this.setState({ activity: event.target.value });
  };

  calculateBMR() {
    let age = this.state.age;
    let gender = this.state.gender;
    let weight = this.state.weight;
    let heightFeet = this.state.heightFeet;
    let heightInches = this.state.heightInches;

    if (
      age == "" ||
      gender == "" ||
      heightInches == "" ||
      weight == "" ||
      heightFeet == ""
    ) {
      this.setState({ error: "All fields are Required!" });
      return;
    }

    // BMR calculation (Metric):
    // Man BMR = 66.5 + ( 13.75 × weight in kg ) + ( 5.003 × height in cm ) – ( 6.755 × age in years )
    // Woman BMR = BMR = 655 + ( 9.563 × weight in kg ) + ( 1.850 × height in cm ) – ( 4.676 × age in years )

    let bmrCalc = "";
    if (gender == 1) {
      bmrCalc = 655 + 9.563 * weight + 1.85 * heightFeet - 4.676 * age;
    } //Female
    else if (gender == 2) {
      bmrCalc = 66.5 + 13.75 * weight + 5.003 * heightFeet - 6.755 * age;
    } //Male

    this.setState({ bmr: bmrCalc });

    this.setState({ error: "" });

    //console.log(this.state.weight);
  }

  calculateActivity() {
    let actCalc;

    let age = this.state.age;
    let gender = this.state.gender;
    let weight = this.state.weight;
    let heightFeet = this.state.heightFeet;
    //let heightInches = this.state.heightInches;

    let bmrCalc = "";
    if (gender == 1) {
      bmrCalc = 655 + 9.563 * weight + 1.85 * heightFeet - 4.676 * age;
    } //Female
    else if (gender == 2) {
      bmrCalc = 66.5 + 13.75 * weight + 5.003 * heightFeet - 6.755 * age;
    } //Male

    if (this.state.activity == "1.2") {
      actCalc = bmrCalc * 1.2;
    } else if (this.state.activity == "1.375") {
      actCalc = bmrCalc * 1.375;
    } else if (this.state.activity == "1.55") {
      actCalc = bmrCalc * 1.55;
    } else if (this.state.activity == "1.725") {
      actCalc = bmrCalc * 1.725;
    } else if (this.state.activity == "1.9") {
      actCalc = bmrCalc * 1.9;
    }
    this.setState({ activity: actCalc });
  }

  render() {
    let error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }

    let resultBMR;
    if (this.state.bmr) {
      resultBMR = <div className="result">{this.state.bmr}</div>;
    }

    let resultAct;
    if (this.state.bmr) {
      resultAct = <div className="result2">{this.state.activity}</div>;
    }

    return (
      <div id="bmrcalc">
        <div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          {error}
          <div className="inputwrap">
            <label className="label">Gender</label>
            <label>
              <input
                type="radio"
                onChange={this.handleGenderChange}
                className="genderF"
                name="gender"
                value="1"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                onChange={this.handleGenderChange}
                className="genderM"
                name="gender"
                value="2"
              />
              Male
            </label>
          </div>
          <div className="inputwrap">
            <label className="label">Weight in Pounds</label>
            <input
              type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              name="weight"
              className="weight"
              min="0"
              max="999"
            />
          </div>
          <div className="inputwrap">
            <label className="label">Height in feet</label>
            <input
              type="number"
              value={this.state.heightFeet}
              checked={this.state.gender === "1"}
              onChange={this.handleHeightFeetChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="8"
            />
            {/* <input type="number" value={this.state.heightInches} checked={this.state.gender === "2"} onChange={this.handleHeightInchesChange} name="heightInches" className="heightInches" min="0" max="11" /> */}
          </div>
          <div className="inputwrap">
            <label className="label">Age in years</label>
            <input
              type="number"
              value={this.state.age}
              onChange={this.handleAgeChange}
              className="age"
              name="age"
              min="0"
              max="120"
            />
          </div>
          <button type="button" onClick={() => this.calculateBMR()}>
            Calculate BMR in Metric
          </button>
          {resultBMR}
          <div className="workout">
            <div className="inputwrap">
              <label className="label">Workout in a Week</label>
              <select
                className="activity"
                value={this.state.activity}
                onChange={this.handleActivityChange}
                name="activity"
              >
                <option value="">Select your Activity</option>
                <option value="1.2">
                  Sedentary (Very little or no exercise, and desk job)
                </option>
                <option value="1.375">
                  Lightly Active (Light exercise 1 to 3 days per week)
                </option>
                <option value="1.55">
                  Moderately Active (Moderate exercise 3 to 5 days per week)
                </option>
                <option value="1.725">
                  Very Active (Heavy exercise 6 to 7 days per week)
                </option>
                <option value="1.9">
                  Extremely Active (Very intense exercise, and physical job,
                  exercise multiple times per day)
                </option>
              </select>
            </div>
            <button type="button" onClick={() => this.calculateActivity()}>
              Calculate Calories
            </button>
            {resultAct}
          </div>
        </div>
      </div>
    );
  }
}

export default Bmr;
