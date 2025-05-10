import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FaqSection: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 px-6 sm:px-12 lg:px-20">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border-l-4 rounded-lg shadow-md transition-all duration-300 ${
            openIndex === index ? "border-blue-500 bg-gray-100" : "border-gray-300 bg-white"
          }`}
        >
          <button
            className="flex w-full items-center justify-between p-5 text-left text-lg font-medium text-gray-900 focus:outline-none"
            onClick={() => toggleAccordion(index)}
            role="button"
            aria-expanded={openIndex === index}
          >
            {item.question}
            <span
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-45" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-5 text-gray-700">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
