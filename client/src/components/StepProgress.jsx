import { Check } from "lucide-react";

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Cart" },
    { id: 2, label: "Order Summary" }, // changed from "Address"
    { id: 3, label: "Payment" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2
                  ${
                    isCompleted
                      ? "bg-green-600 border-green-600"
                      : isActive
                      ? "border-green-600 text-green-600"
                      : "border-gray-300 text-gray-400"
                  }
                  `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium
                  ${
                    isCompleted || isActive
                      ? "text-green-700"
                      : "text-gray-400"
                  }
                `}
              >
                {step.label}
              </span>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`absolute top-3.5 left-full w-full h-0.5 -translate-x-1/2
                    ${
                      currentStep > step.id
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }
                  `}
                  style={{ width: "calc(100% - 2rem)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
