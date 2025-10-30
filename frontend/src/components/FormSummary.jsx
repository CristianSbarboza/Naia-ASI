import React from "react";
import { ArrowRight, User, Zap, Globe, BookOpen, MessageSquare } from "lucide-react";
import { stepsConfig } from "../constants/storySteps";

const iconMap = { User, Zap, Globe, BookOpen, MessageSquare };

const FormSummary = ({ data, onRestart, onGenerateStory, onBack, isSubmitting }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">🎉 Story Draft Completed!</h2>
      <p className="text-gray-600">Summary of the elements you created.</p>

      {stepsConfig.map((step, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
          <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-2">
            {React.createElement(iconMap[step.iconName], { className: "w-5 h-5 mr-2" })}
            {step.title}
          </h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {step.fields.map((field) => (
              <li key={field.id}>
                <span className="font-medium">{field.label}:</span> {String(data[field.id] || "Not filled")}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={onRestart}
          className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition duration-300 shadow-md"
        >
          Restart
        </button>
        <button
          onClick={onGenerateStory}
          disabled={isSubmitting}
          className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Generating Story..." : "Generate Story"}
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition duration-300 shadow-md"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FormSummary;
