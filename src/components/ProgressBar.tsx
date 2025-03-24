"use client";

import React, { useEffect } from "react";
import { useWizard } from "../contexts/WizardContext";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
  isQuestionnaireMode: boolean;
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canContinue,
  isQuestionnaireMode,
  currentQuestion,
  totalQuestions,
}) => {
  const {
    setStep,
    setSoundsCategory,
    setVisualCategory,
    setTextCategory,
    setSelectedCategories,
    setQuestionnaireMode,
  } = useWizard();

  const handleReset = () => {
    setStep(1);
    setSoundsCategory(null);
    setVisualCategory(null);
    setTextCategory(null);
    setSelectedCategories({
      sounds: false,
      visual: false,
      text: false,
    });
    setQuestionnaireMode(false);
  };

  // Simple percentage calculation
  let progressPercent = (currentStep / totalSteps) * 100;

  // Make sure progress is between 0-100
  progressPercent = Math.max(0, Math.min(100, progressPercent));

  // Debug logging
  useEffect(() => {
    console.log("Progress Bar Debug:");
    console.log("Current Step:", currentStep);
    console.log("Total Steps:", totalSteps);
    console.log("Progress Percent:", progressPercent);
  }, [currentStep, totalSteps, progressPercent]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {isQuestionnaireMode
              ? `Question ${currentQuestion}/${totalQuestions}`
              : `Step ${currentStep}/${totalSteps}`}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleReset}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Reset
          </button>
          {canContinue && (
            <button
              onClick={onNext}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="h-2.5 bg-black/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
