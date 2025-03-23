"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, QuestionItem } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const questions: QuestionItem[] = [
  {
    id: "q1",
    text: "How was the visual content created?",
    options: [
      {
        id: "a",
        text: "Entirely generated by AI without modification",
        points: 4,
      },
      {
        id: "b",
        text: "Generated by AI, then selected and edited",
        points: 3,
      },
      {
        id: "c",
        text: "Co-created with significant AI assistance",
        points: 2,
      },
      {
        id: "d",
        text: "Created by human with minor AI enhancements",
        points: 1,
      },
      {
        id: "e",
        text: "Created entirely by human",
        points: 0,
      },
    ],
  },
  // Add more questions here
];

const VisualQuestionnaire: React.FC<StepProps> = ({ onNext, onBack }) => {
  const t = useTranslations();
  const {
    setVisualCategory,
    visualQuestionnaireAnswers,
    setVisualQuestionnaireAnswers,
  } = useWizard();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId: string, points: number) => {
    setVisualQuestionnaireAnswers({
      ...visualQuestionnaireAnswers,
      [questionId]: points,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final category based on answers
      const totalPoints = Object.values(visualQuestionnaireAnswers).reduce(
        (sum, points) => sum + points,
        0
      );
      const averagePoints = totalPoints / questions.length;
      const category = Math.round(averagePoints) as 0 | 1 | 2 | 3 | 4;

      setVisualCategory(category);
      if (onNext) onNext();
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("visualQuestionnaireTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("visualQuestionnaireDescription")}
        </p>
      </div>

      <div className="space-y-6" data-current-question={currentQuestion + 1}>
        <p className="text-lg font-medium">{currentQuestionData.text}</p>
        <div className="space-y-4">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.id}
              onClick={() =>
                handleAnswer(currentQuestionData.id, option.points)
              }
              className="w-full p-4 text-left rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <div className="text-sm text-text-secondary">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default VisualQuestionnaire;
