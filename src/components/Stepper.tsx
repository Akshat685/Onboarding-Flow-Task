interface StepperProps {
    steps: string[];
    currentStep: number;
    onStepClick: (index: number ) => void;
}

const Stepper = ({ steps , currentStep , onStepClick } : StepperProps) => {
    return (
        <div className="d-flex justify-contect-between mb-4">
            {steps.map((step, index) => (
                <div key={index}
                onClick={() => onStepClick(index)}
                className={`text-center flex-fill mx-1 p-2 rounded 
                    ${index === currentStep ? 'bg-primary text-white ' :
                    'bg-light'}`} style={{cursor:'pointer'}}>
                        {step}
                    </div>
            ))}
        </div>
    );
};

export default Stepper;