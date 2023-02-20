import { type ChangeEvent, useState } from "react";

export const useSettings = (tempInit: number, numReviewsInit: number) => {
  const [language, setLanguage] = useState("");
  const [temperature, setTemperature] = useState(tempInit);
  const [code, setCode] = useState("");
  const [reviewPrompt, setReviewPrompt] = useState("");
  const [numReviews, setNumReviews] = useState(numReviewsInit);
  const handleTemperatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemperature(e.currentTarget.valueAsNumber);
  };
  const handleNumReviewsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumReviews(e.currentTarget.valueAsNumber);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.currentTarget.value);
  };
  const handleReviewPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewPrompt(e.currentTarget.value);
  };
  const resetValues = () => {
    // setTemperature(tempInit);
    // setNumReviews(numReviewsInit);
    setCode("");
    setReviewPrompt("");
  };
  return {
    resetValues,
    temperature,
    numReviews,
    reviewPrompt,
    code,
    handleTemperatureChange,
    handleNumReviewsChange,
    handleContentChange,
    handleReviewPromptChange,
  };
};
