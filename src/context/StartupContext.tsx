"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type StartupStage = "loading" | "viewing_1" | "disclaimer" | "viewing_2" | "form" | "completed";

interface StartupContextType {
  stage: StartupStage;
  finishPreloader: () => void;
  acceptDisclaimer: () => void;
  unlockWebsite: () => void;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const StartupProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState<StartupStage>("loading");

  // 1. Preloader Finish Trigger
  const finishPreloader = () => {
    setStage("viewing_1"); // User sees the site for the first time
  };

  // 2. Timer: 4 Seconds after Preloader -> Show Disclaimer
  useEffect(() => {
    if (stage === "viewing_1") {
      const timer = setTimeout(() => {
        // Check if user already accepted disclaimer previously
        const hasAccepted = localStorage.getItem("disclaimerAccepted");
        if (hasAccepted) {
           setStage("viewing_2"); // Skip to next phase
        } else {
           setStage("disclaimer");
        }
      }, 4000); // 4 Seconds Glimpse
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // 3. User Accepts Disclaimer
  const acceptDisclaimer = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setStage("viewing_2"); // User browses again
  };

  // 4. Timer: 6 Seconds after Disclaimer -> Show Form
  useEffect(() => {
    if (stage === "viewing_2") {
      const hasFilledForm = localStorage.getItem("elitairs_lead_submitted");
      
      if (hasFilledForm) {
        setStage("completed"); // Stop here, user is free
      } else {
        const timer = setTimeout(() => {
          setStage("form");
        }, 6000); // 6 Seconds Glimpse
        return () => clearTimeout(timer);
      }
    }
  }, [stage]);

  // 5. Form Filled -> Unlock Everything
  const unlockWebsite = () => {
    localStorage.setItem("elitairs_lead_submitted", "true");
    setStage("completed");
  };

  return (
    <StartupContext.Provider value={{ stage, finishPreloader, acceptDisclaimer, unlockWebsite }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartup = () => {
  const context = useContext(StartupContext);
  if (!context) throw new Error("useStartup must be used within a StartupProvider");
  return context;
};