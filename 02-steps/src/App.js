// IMPORTING STATE
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  // CREATE STATES VARIABLES AND UPDATE_FUNCTIONS

  // [VARIABLE(DEFAULT 1), UPDATE_FUNCTION]
  const [step, setStep] = useState(1);

  // [VARIABLE(DEFAULT true), UPDATE_FUNCTION]
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  return (
    <div>
      {/* USING EVENT TO CHANGE STATE ONCLICK */}
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              {/* PASSING ALERT USER FUNCTION TO CHILD COMPONENT*/}
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            {/* PASSING CHANGE STATE FUNCTION TO CHILD COMPONENT */}
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              {/* PASSING CHILDREN TO CHILD COMPONENT */}
              <span>👈</span> Previous
            </Button>

            {/* PASSING CHANGE STATE FUNCTION TO CHILD COMPONENT PROPS */}
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              {/* PASSING CHILDREN TO CHILD COMPONENT */}
              Next <span>👉</span>
              <span>🤓</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {/* COMPONENT CHILDREN */}
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={/* COMPONENT EVENT */ onClick}
    >
      {/* COMPONENT CHILDREN */}
      {children}
    </button>
  );
}
