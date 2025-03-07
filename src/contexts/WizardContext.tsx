"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Category, WizardContextType } from "../types";

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [musicCategory, setMusicCategory] = useState<Category>(null);
  const [textCategory, setTextCategory] = useState<Category>(null);
  const [isQuestionnaireMode, setQuestionnaireMode] = useState<boolean>(false);
  const [musicQuestionnaireAnswers, setMusicQuestionnaireAnswers] = useState<
    Record<string, number>
  >({});
  const [textQuestionnaireAnswers, setTextQuestionnaireAnswers] = useState<
    Record<string, number>
  >({});

  const value = {
    step,
    setStep,
    musicCategory,
    setMusicCategory,
    textCategory,
    setTextCategory,
    isQuestionnaireMode,
    setQuestionnaireMode,
    musicQuestionnaireAnswers,
    setMusicQuestionnaireAnswers,
    textQuestionnaireAnswers,
    setTextQuestionnaireAnswers,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextType => {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }

  return context;
};
