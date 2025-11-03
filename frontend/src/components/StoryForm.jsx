import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, User, Zap, Globe, MessageSquare } from 'lucide-react';
import IdeaLamp from "./IdeaLamp";
import TopWizardProgress from "./TopWizardProgress";
import { useStory } from "../context/StoryContext";
import { INITIAL_FORM_DATA, stepsConfig } from "../constants/storySteps";

const iconMap = { User, Zap, Globe, BookOpen, MessageSquare };

const FormSummary = ({ data, onRestart, onGenerateStory, onBack, isSubmitting }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-extrabold text-gray-900">🎉 Story Draft Completed!</h2>
    <p className="text-gray-600">Summary of your story elements:</p>

    {stepsConfig.map((step, index) => (
      <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
        <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-2">
          {React.createElement(iconMap[step.iconName], { className: 'w-5 h-5 mr-2' })}
          {step.title}
        </h3>
        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          {step.fields.map(field => (
            <li key={field.id}>
              <span className="font-medium">{field.label}:</span>{" "}
              {String(data[field.id] || "Not filled")}
            </li>
          ))}
        </ul>
      </div>
    ))}

    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button onClick={onRestart} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition duration-300 shadow-md">
        Restart
      </button>
      <button onClick={() => onGenerateStory(data)} disabled={isSubmitting}
        className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
        {isSubmitting ? 'Generating Story...' : 'Generate Story'}
      </button>
      <button onClick={onBack} className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition duration-300 shadow-md">
        Back
      </button>
    </div>
  </div>
);

const StoryForm = ({ onSubmit }) => {
  const { formData: ctxFormData, updateFormData } = useStory();
  const [currentStep, setCurrentStep] = useState(1);
  const [localForm, setLocalForm] = useState({ ...INITIAL_FORM_DATA, ...ctxFormData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = stepsConfig.length;

  useEffect(() => {
    updateFormData(localForm);
  }, [localForm]);

  const handleFieldChange = (id, value) => {
    const sanitized = id === 'settingTime' ? value.replace(/[^\d]/g, '') : value;
    setLocalForm(prev => ({ ...prev, [id]: sanitized }));
  };

  const isStepValid = (stepIndex) => {
    const step = stepsConfig[stepIndex - 1];
    if (!step) return false;
    return step.fields.every(f => {
      const val = localForm[f.id];
      return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
    });
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleGenerateStory = async () => {
    if (!onSubmit) return;
    setIsSubmitting(true);
    try {
      await onSubmit(localForm); // Passa localForm diretamente
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setLocalForm(INITIAL_FORM_DATA);
    updateFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Inter']">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
            Create Your Story in 5 Steps
          </h1>
          <p className="text-md text-gray-500 mt-2">
            Develop the pillars of your narrative, step by step.
          </p>
        </header>

        <TopWizardProgress steps={stepsConfig} current={currentStep} />

        {currentStep > totalSteps ? (
          <FormSummary
            data={localForm}
            onRestart={handleRestart}
            onGenerateStory={handleGenerateStory}
            onBack={() => setCurrentStep(totalSteps)}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              {React.createElement(iconMap[stepsConfig[currentStep - 1].iconName], { className: 'w-7 h-7 mr-3 text-blue-500' })}
              {stepsConfig[currentStep - 1].title}
            </h2>

            <p className="text-gray-500 mb-6 border-b pb-3">
              {stepsConfig[currentStep - 1].description}
            </p>

            {stepsConfig[currentStep - 1].fields.map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    rows="3"
                    value={localForm[field.id]}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm resize-none"
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={localForm[field.id]}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between pt-6">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className={`flex items-center px-6 py-2 rounded-lg font-bold transition duration-200 ${isStepValid(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                {currentStep < totalSteps ? 'Next Step' : 'Finish Draft'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        <IdeaLamp currentStepData={stepsConfig[currentStep - 1]} />
      </div>
    </div>
  );
};

export default StoryForm;
