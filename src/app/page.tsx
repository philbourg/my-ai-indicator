"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import ProgressBar from "../components/ProgressBar";
import Introduction from "../steps/Introduction";
import SoundsStep from "../steps/SoundsStep";
import TextStep from "../steps/TextStep";
import VisualStep from "../steps/VisualStep";
import SoundsQuestionnaire from "../steps/SoundsQuestionnaire";
import TextQuestionnaire from "../steps/TextQuestionnaire";
import VisualQuestionnaire from "../steps/VisualQuestionnaire";
import Result from "../steps/Result";
import ManualSelectionStep from "../steps/ManualSelectionStep";
import GuidedSelectionStep from "../steps/GuidedSelectionStep";
import {
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const { t } = useTranslation();
  const {
    step,
    setStep,
    soundsCategory,
    visualCategory,
    textCategory,
    isQuestionnaireMode,
    selectedCategories,
  } = useWizard();

  // Debug current step
  console.log("Current step:", step);
  console.log("Selected categories:", selectedCategories);
  console.log("Sound category:", soundsCategory);
  console.log("Visual category:", visualCategory);
  console.log("Text category:", textCategory);

  // Adjusted step calculation to not count Introduction
  const totalSteps =
    1 + Object.values(selectedCategories).filter(Boolean).length + 1; // Category Selection + Selected Categories + Result
  const totalQuestionsPerStep = 10;

  // Get current question number from the active questionnaire component
  const getCurrentQuestionNumber = () => {
    if (!isQuestionnaireMode || step === totalSteps) return 0;
    const component = document.querySelector("[data-current-question]");
    return component
      ? parseInt(component.getAttribute("data-current-question") || "0")
      : 0;
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const startWizard = () => {
    setStep(2);
    setShowWizard(true);
  };

  // Improved canContinue function to better handle step logic
  const canContinue = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return Object.values(selectedCategories).some(Boolean); // At least one category selected
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return soundsCategory !== null;
            case "visual":
              return visualCategory !== null;
            case "text":
              return textCategory !== null;
            default:
              return false;
          }
        }

        // If we've gone through all the selected categories, we can continue to the result
        if (currentStepIndex >= categories.length) {
          return true;
        }

        return false;
    }
  };

  const renderStep = () => {
    // Debug step rendering
    console.log("Rendering step:", step);
    console.log("Total steps:", totalSteps);

    switch (step) {
      case 1:
        return <Introduction onNext={handleNext} />;
      case 2:
        return <ManualSelectionStep onNext={handleNext} onBack={handleBack} />;
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        // If we've gone through all categories steps
        if (currentStepIndex >= categories.length) {
          return <Result onBack={handleBack} />;
        }

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return isQuestionnaireMode ? (
                <SoundsQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <SoundsStep onNext={handleNext} onBack={handleBack} />
              );
            case "visual":
              return isQuestionnaireMode ? (
                <VisualQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <VisualStep onNext={handleNext} onBack={handleBack} />
              );
            case "text":
              return isQuestionnaireMode ? (
                <TextQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <TextStep onNext={handleNext} onBack={handleBack} />
              );
          }
        }

        // Default fallback
        return <Introduction onNext={handleNext} />;
    }
  };

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const floatingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  };

  const arrowVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, 5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.7, scale: 1 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  };

  const backgroundGradientVariants = {
    initial: {
      background:
        "linear-gradient(90deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
      scale: 1,
    },
    animate: {
      background: [
        "linear-gradient(90deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
        "linear-gradient(180deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
        "linear-gradient(270deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
        "linear-gradient(360deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
        "linear-gradient(90deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
      },
    },
  };

  // If wizard is active, show the wizard interface
  if (showWizard) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Header showWizard={showWizard} setShowWizard={setShowWizard} />
        <div className="glass-panel overflow-hidden relative">
          <div className="absolute inset-0 -z-10 opacity-5 bg-gradient-to-tr from-primary-600/20 to-accent-indigo/20"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>

          <div className="p-6 md:p-8 relative z-10">
            {step > 1 && (
              <div className="mb-8">
                <ProgressBar
                  currentStep={step - 1} // Subtract 1 to not count Introduction
                  totalSteps={totalSteps}
                  onBack={handleBack}
                  onNext={handleNext}
                  canContinue={canContinue()}
                  isQuestionnaireMode={isQuestionnaireMode}
                  currentQuestion={getCurrentQuestionNumber()}
                  totalQuestions={totalQuestionsPerStep}
                />
              </div>
            )}
            <div className="transition-opacity duration-300">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show the landing page

  // Particle animation component
  const FloatingParticles = () => {
    const particleCount = 50;

    // Custom particle arrays with different properties for variety
    const largeParticles = Array.from({ length: 15 });
    const mediumParticles = Array.from({ length: 20 });
    const smallParticles = Array.from({ length: 20 });
    const microParticles = Array.from({ length: 30 });

    // Generate a random color from the theme
    const getRandomColor = () => {
      const colors = [
        "rgba(107, 70, 193, 0.2)", // primary-500
        "rgba(79, 70, 229, 0.2)", // accent-indigo
        "rgba(59, 130, 246, 0.2)", // blue
        "rgba(139, 92, 246, 0.2)", // purple
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Animation variants to ensure proper function initialization
    const particleVariants = {
      initial: (i: number) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.15 + 0.05,
      }),
      animate: (i: number) => ({
        x: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        y: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        scale: [1, 1.1, 0.9, 1],
        opacity: [
          Math.random() * 0.15 + 0.05,
          Math.random() * 0.15 + 0.1,
          Math.random() * 0.15 + 0.05,
        ],
        transition: {
          duration: 20 + Math.random() * 40,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
        },
      }),
    };

    const mediumParticleVariants = {
      initial: (i: number) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.2 + 0.1,
      }),
      animate: (i: number) => ({
        x: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        y: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        opacity: [
          Math.random() * 0.2 + 0.1,
          Math.random() * 0.2 + 0.15,
          Math.random() * 0.2 + 0.1,
        ],
        transition: {
          duration: 15 + Math.random() * 25,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
        },
      }),
    };

    const smallParticleVariants = {
      initial: (i: number) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.2,
      }),
      animate: (i: number) => ({
        x: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        y: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        opacity: [
          Math.random() * 0.4 + 0.2,
          Math.random() * 0.4 + 0.3,
          Math.random() * 0.4 + 0.2,
        ],
        transition: {
          duration: 10 + Math.random() * 15,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "linear",
        },
      }),
    };

    const microParticleVariants = {
      initial: (i: number) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.3,
      }),
      animate: (i: number) => ({
        x: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        y: [
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
          `${Math.random() * 100}%`,
        ],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        transition: {
          duration: 5 + Math.random() * 10,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
        },
      }),
    };

    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {largeParticles.map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 150 + "px",
              height: Math.random() * 100 + 150 + "px",
              background: getRandomColor(),
              filter: "blur(60px)",
            }}
            custom={i}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {mediumParticles.map((_, i) => (
          <motion.div
            key={`medium-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 40 + 30 + "px",
              height: Math.random() * 40 + 30 + "px",
              background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
              filter: "blur(15px)",
            }}
            custom={i}
            variants={mediumParticleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {smallParticles.map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              background: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
            custom={i}
            variants={smallParticleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {microParticles.map((_, i) => (
          <motion.div
            key={`micro-${i}`}
            className="absolute rounded-full"
            style={{
              width: "2px",
              height: "2px",
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
            }}
            custom={i}
            variants={microParticleVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Header showWizard={showWizard} setShowWizard={setShowWizard} />
      <FloatingParticles />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 md:pt-10 md:pb-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="w-full md:w-1/2 space-y-4"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <motion.div
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-indigo rounded-md blur opacity-30"
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.span
                  className="relative bg-surface-dark px-4 py-1 text-sm font-medium rounded-md border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {t("appName")} — {t("welcomeTitle")}
                </motion.span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
                }}
              >
                <motion.span
                  className="animated-gradient-text block"
                  initial={{ y: 30, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
                  }}
                  style={{
                    display: "inline-block",
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {t("metaTitle")}
                </motion.span>
                <motion.span
                  className="text-text-primary mt-2 block"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
                  }}
                >
                  {t("metaDescription")}
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg text-text-secondary max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
                }}
              >
                {t("welcomeDescription")}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  <span className="font-mono mr-1">S.AI.0-4</span> Sounds
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30">
                  <span className="font-mono mr-1">V.AI.0-4</span> Visual
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600/20 text-primary-200 border border-primary-600/30">
                  <span className="font-mono mr-1">T.AI.0-4</span> Text
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-3 md:pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-1000"
                    animate={{
                      background: [
                        "linear-gradient(90deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                        "linear-gradient(180deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                        "linear-gradient(270deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                        "linear-gradient(360deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                        "linear-gradient(90deg, rgba(107, 70, 193, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)",
                      ],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.button
                    onClick={startWizard}
                    className="group relative inline-flex items-center px-8 py-3 text-base font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-400 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-1000"
                      variants={backgroundGradientVariants}
                      initial="initial"
                      animate="animate"
                    />
                    <motion.span
                      className="relative flex items-center"
                      variants={arrowVariants}
                      initial="initial"
                      animate="animate"
                    >
                      {t("start")}
                      <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.span>
                  </motion.button>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl border border-white/10 text-text-primary hover:bg-surface-card/50 transition-colors"
                  >
                    {t("about")}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-indigo/20 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                    filter: ["blur(30px)", "blur(40px)", "blur(30px)"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating 3D orbs in the background for depth */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full bg-primary-400/10"
                  style={{ top: "10%", right: "15%", filter: "blur(10px)" }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-accent-indigo/10"
                  style={{ bottom: "15%", left: "10%", filter: "blur(8px)" }}
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="relative bg-surface-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-4 md:p-6 shadow-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateX: 2,
                    rotateY: -2,
                    transition: { duration: 0.5 },
                  }}
                >
                  <motion.div
                    className="flex items-center justify-center mb-3 md:mb-4"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h3 className="text-lg font-medium text-text-primary">
                      <span className="animated-gradient-text">
                        {t("categorySelectionTitle")}
                      </span>
                    </h3>
                  </motion.div>
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                    {[
                      {
                        color: "primary-500",
                        label: "Sounds",
                        icon: "/icons/sounds-icon.svg",
                      },
                      {
                        color: "accent-indigo",
                        label: "Visual",
                        icon: "/icons/visual-icon.svg",
                      },
                      {
                        color: "primary-600",
                        label: "Text",
                        icon: "/icons/text-icon.svg",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className={`flex flex-col items-center p-2 rounded-xl bg-${item.color}/20 border border-${item.color}/30 transition-transform`}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          duration: 0.5,
                          whileHover: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }}
                      >
                        <span
                          className={`text-xs uppercase font-medium text-${item.color} mb-1`}
                        >
                          {item.label}
                        </span>
                        <div className="w-8 h-8 md:w-12 md:h-12 relative">
                          <Image
                            src={item.icon}
                            alt={`${item.label} category`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-1 md:gap-2">
                    {[0, 1, 2, 3, 4].map((category, index) => (
                      <motion.div
                        key={category}
                        className="flex flex-col items-center p-1 md:p-2 rounded-xl bg-surface-dark/60 border border-white/5 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          duration: 0.5,
                          whileHover: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }}
                      >
                        <div className="w-8 h-8 md:w-12 md:h-12 relative mb-1">
                          <Image
                            src={`/badges/category-${category}.svg`}
                            alt={`Category ${category} badge`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs text-center text-text-secondary">
                          {t(`category${category}Title`)}
                        </span>
                      </motion.div>
                    ))}
                    <motion.div
                      className="col-span-5 flex flex-col items-center p-2 md:p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-indigo/20 border border-white/10 mt-2 md:mt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      <p className="text-xs md:text-sm text-center text-text-primary">
                        {t("howItWorksContent")}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">{t("whyIndicate")}</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              {t("whyIndicateContent")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheckIcon className="w-6 h-6 text-primary-400" />,
                title: t("howItWorks"),
                content: t("howItWorksContent"),
              },
              {
                icon: <SparklesIcon className="w-6 h-6 text-primary-400" />,
                title: t("ccInspiration"),
                content: t("ccInspirationIntro"),
              },
              {
                icon: <DocumentTextIcon className="w-6 h-6 text-primary-400" />,
                title: t("metaTitle"),
                content: t("footerDescription"),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 hover:border-primary-500/30 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                  borderColor: "rgba(107, 70, 193, 0.4)",
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <motion.div
                  className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{
                    rotate: [0, 5, -5, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                  style={{
                    transform: "translateZ(20px)", // 3D effect
                  }}
                >
                  {/* Separate pulsing shadow animation */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(107, 70, 193, 0.1)",
                        "0 0 20px rgba(107, 70, 193, 0.3)",
                      ],
                      opacity: [0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                  {feature.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-3 text-text-primary"
                  style={{
                    transform: "translateZ(15px)", // 3D effect
                  }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-text-secondary"
                  style={{
                    transform: "translateZ(10px)", // 3D effect
                  }}
                >
                  {feature.content}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">
                {t("aboutCategoriesTitle")}
              </span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              {t("aboutCategoriesText")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                bg: "primary-500",
                title: t("soundsCategoryTitle"),
                description: t("soundsCategoryDescription"),
                icon: "/icons/sounds-icon.svg",
                prefix: "S.AI.",
              },
              {
                bg: "accent-indigo",
                title: t("visualCategoryTitle"),
                description: t("visualCategoryDescription"),
                icon: "/icons/visual-icon.svg",
                prefix: "V.AI.",
              },
              {
                bg: "primary-600",
                title: t("textCategoryTitle"),
                description: t("textCategoryDescription"),
                icon: "/icons/text-icon.svg",
                prefix: "T.AI.",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                className={`p-6 rounded-2xl bg-${category.bg}/10 backdrop-blur-sm border border-${category.bg}/20 flex flex-col items-center text-center group transition-all`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)",
                  border: `1px solid var(--${category.bg}/50)`,
                }}
              >
                <motion.div
                  className="w-16 h-16 relative mb-4"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={category.icon}
                    alt={`${category.title} category`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <h3
                  className={`text-xl font-semibold mb-2 text-${category.bg}`}
                >
                  {category.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <motion.span
                      key={level}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-${category.bg}/20 text-${category.bg} border border-${category.bg}/30`}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + level * 0.1 }}
                    >
                      {category.prefix}
                      {level}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((category, index) => (
              <motion.div
                key={category}
                className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center group hover:border-primary-500/30 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <motion.div
                  className="w-20 h-20 relative mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Image
                    src={`/badges/category-${category}.svg`}
                    alt={`Category ${category}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">
                  {t(`category${category}Title`)}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t(`category${category}Description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Badge System Section */}
      <section className="py-16 relative z-10 bg-surface-card/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">
                Badge Notation System
              </span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              A standardized system for indicating AI involvement across
              different creative mediums
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-surface-dark/80 backdrop-blur-md rounded-3xl border border-white/10 p-8"
              whileHover={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    letter: "S",
                    title: "Sounds",
                    description:
                      "Music, podcasts, sound effects, and other audio content",
                    color: "primary-400",
                    bg: "primary-500",
                  },
                  {
                    letter: "V",
                    title: "Visual",
                    description:
                      "Images, videos, animations, and other visual content",
                    color: "accent-indigo",
                    bg: "accent-indigo",
                  },
                  {
                    letter: "T",
                    title: "Text",
                    description:
                      "Written content like books, social media posts, emails, and code",
                    color: "primary-200",
                    bg: "primary-600",
                  },
                ].map((item, index) => (
                  <motion.div
                    className="text-center"
                    key={item.letter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.bg}/20 border border-${item.bg}/30 mb-4`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      {/* Separate pulsing glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 0 rgba(var(--${item.bg}-rgb), 0.2)`,
                            `0 0 15px rgba(var(--${item.bg}-rgb), 0.5)`,
                          ],
                          scale: [0.95, 1.05],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                      <span
                        className={`text-2xl font-mono font-bold text-${item.color}`}
                      >
                        {item.letter}
                      </span>
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {item.description}
                    </p>
                    <motion.code
                      className={`px-3 py-1 rounded-lg bg-${item.bg}/10 text-${item.color} font-mono`}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {item.letter}.AI.0-4
                    </motion.code>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    { level: "0", description: "Human Only" },
                    { level: "1", description: "Human with AI Assistance" },
                    { level: "2", description: "AI Collaboration" },
                    { level: "3", description: "Directed AI" },
                    { level: "4", description: "AI Only" },
                  ].map((item, index) => (
                    <motion.div
                      className="text-center"
                      key={item.level}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="inline-flex items-center justify-center mb-2">
                        <span className="text-lg font-mono font-bold text-text-primary">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto rounded-3xl p-8 lg:p-12 bg-gradient-to-r from-primary-600/20 to-accent-indigo/20 border border-white/10 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                  {t("welcomeTitle")}
                </h2>
                <p className="text-text-secondary max-w-2xl">
                  {t("howItWorksContent")}
                </p>
              </motion.div>

              <motion.button
                onClick={startWizard}
                className="group relative inline-flex items-center px-8 py-3 text-base font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-400 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-1000"
                  variants={backgroundGradientVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.span
                  className="relative flex items-center"
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                >
                  {t("start")}
                  <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
