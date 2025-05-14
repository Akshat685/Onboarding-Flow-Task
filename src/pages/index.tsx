import { useState } from "react";
import { useRouter } from "next/router";
import PersonalInfoForm from "../components/forms/PersonalInformation";
import ContactDetailsForm from "../components/forms/ContactDetailsForm";
import EducationForm from "../components/forms/EducationForm";
import WorkExperienceForm from "../components/forms/WorkExperienceForm";
import PreferencesForm from "../components/forms/PreferencesForm";

const steps = [
  "Personal Information",
  "Contact Details",
  "Education",
  "Work Experience",
  "Preferences",
];

const Home = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  const next = () => {
    setCompleted((prev) => ({ ...prev, [step]: true }));
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.push("/summary");
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };
  const goToStep = (index: number) => {
    setStep(index);
  };

  const getStepColor = (index: number) => {
    if (index === step) return "bg-success"; // current step
    if (completed[index]) return "bg-primary"; // completed step
    return "bg-secondary"; // upcoming step
  };


  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(90deg,#07a3b2,#aebaf8)",
        padding: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "850px",

        }}
      >
        <div className="shadow-lg rounded-4  p-5 "
          style={{
            maxWidth: "850px",
            background: "rgba(255, 255, 255, 0.3)", // semi-transparent white
            backdropFilter: "blur(12px)",           // adds blur
            WebkitBackdropFilter: "blur(12px)",     // Safari support
            borderRadius: "1.5rem",                 // same as rounded-4
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }} >
          <h1 className="text-center mb-5  fw-bold">
            Onboarding Flow
          </h1>

          {/* Stepper */}
          <div className="mb-5 position-relative" style={{ height: 60 }}>
            {/* Line background */}
            <div
              className="position-absolute top-50 start-0 w-100 border-bottom"
              style={{ borderColor: "#dee2e6", height: 2, zIndex: 0 }}
            />
            {/* Progress Line Fill */}
            <div
              className="position-absolute top-50 start-0 bg-primary"
              style={{
                height: 2,
                zIndex: 1,
                width: `${(Object.keys(completed).length / (steps.length - 1)) * 100
                  }%`,
                transition: "width 0.4s ease-in-out",
              }}
            />
            {/* Step Circles */}
            <div
              className="d-flex justify-content-between align-items-center position-relative"
              style={{ zIndex: 2 }}
            >
              {steps.map((label, index) => (
                <div key={index} className="text-center flex-fill">
                  <div
                    className={`rounded-circle mx-auto mb-2 ${getStepColor(
                      index
                    )} text-white d-flex align-items-center justify-content-center`}
                    style={{
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onClick={() => goToStep(index)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {completed[index] ? "✓" : index + 1}
                  </div>
                  <small className="text-nowrap">{label}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Step Form */}
          <div>
            {step === 0 && <PersonalInfoForm next={next} />}
            {step === 1 && <ContactDetailsForm next={next} prev={prev} />}
            {step === 2 && <EducationForm next={next} prev={prev} />}
            {step === 3 && <WorkExperienceForm next={next} prev={prev} />}
            {step === 4 && <PreferencesForm next={next} prev={prev} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
