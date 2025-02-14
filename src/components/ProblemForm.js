// import React from "react";

// export default function DetailedQuestionnaire() {
//   const questions = [
//     {
//       id: 1,
//       category: "Wie",
//       questions: [
//         "Wie is betrokken bij het probleem?",
//         "Wie ondervindt last van dit probleem?",
//         "Wie zijn de belanghebbenden?",
//       ],
//     },
//     {
//       id: 2,
//       category: "Wat",
//       questions: [
//         "Wat is het probleem precies?",
//         "Wat zijn de gevolgen van dit probleem?",
//         "Wat zijn de symptomen die het probleem veroorzaken?",
//       ],
//     },
//     {
//       id: 3,
//       category: "Waar",
//       questions: [
//         "Waar doet het probleem zich voor?",
//         "In welke afdeling, locatie of proces is het probleem zichtbaar?",
//       ],
//     },
//     {
//       id: 4,
//       category: "Wanneer",
//       questions: [
//         "Wanneer doet het probleem zich voor?",
//         "Sinds wanneer bestaat het probleem?",
//         "Zijn er specifieke momenten waarop het probleem zich vaker voordoet?",
//       ],
//     },
//     {
//       id: 5,
//       category: "Waarom",
//       questions: [
//         "Waarom is dit een probleem?",
//         "Waarom is het belangrijk om dit probleem op te lossen?",
//         "Wat zijn de onderliggende oorzaken van het probleem?",
//       ],
//     },
//     {
//       id: 6,
//       category: "Hoe",
//       questions: [
//         "Hoe manifesteert het probleem zich?",
//         "Hoe ernstig is het probleem?",
//         "Hoe beïnvloedt het probleem de huidige processen of resultaten?",
//       ],
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
//       <h1 className="text-3xl font-bold mb-8 text-center text-customblue">
//         Gedetailleerde Vragenlijst
//       </h1>
//       <form className="space-y-8 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
//         {questions.map((section) => (
//           <div key={section.id} className="space-y-4">
//             <h2 className="text-2xl font-bold text-customblue">
//               {section.category}
//             </h2>
//             {section.questions.map((question, index) => (
//               <div key={index} className="flex flex-col">
//                 <label
//                   htmlFor={`question-${section.id}-${index}`}
//                   className="text-lg font-semibold mb-2"
//                 >
//                   {question}
//                 </label>
//                 <textarea
//                   id={`question-${section.id}-${index}`}
//                   placeholder="Geef hier uw antwoord"
//                   rows="3"
//                   className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-customblue"
//                 ></textarea>
//               </div>
//             ))}
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="w-full bg-customblue text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all"
//         >
//           Versturen
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function DetailedQuestionnaire() {
  const [formData, setFormData] = useState({});

  const questions = [
    {
      id: 1,
      category: "Wie",
      questions: [
        "Wie is betrokken bij het probleem?",
        "Wie ondervindt last van dit probleem?",
        "Wie zijn de belanghebbenden?",
      ],
    },
    {
      id: 2,
      category: "Wat",
      questions: [
        "Wat is het probleem precies?",
        "Wat zijn de gevolgen van dit probleem?",
        "Wat zijn de symptomen die het probleem veroorzaken?",
      ],
    },
    {
      id: 3,
      category: "Waar",
      questions: [
        "Waar doet het probleem zich voor?",
        "In welke afdeling, locatie of proces is het probleem zichtbaar?",
      ],
    },
    {
      id: 4,
      category: "Wanneer",
      questions: [
        "Wanneer doet het probleem zich voor?",
        "Sinds wanneer bestaat het probleem?",
        "Zijn er specifieke momenten waarop het probleem zich vaker voordoet?",
      ],
    },
    {
      id: 5,
      category: "Waarom",
      questions: [
        "Waarom is dit een probleem?",
        "Waarom is het belangrijk om dit probleem op te lossen?",
        "Wat zijn de onderliggende oorzaken van het probleem?",
      ],
    },
    {
      id: 6,
      category: "Hoe",
      questions: [
        "Hoe manifesteert het probleem zich?",
        "Hoe ernstig is het probleem?",
        "Hoe beïnvloedt het probleem de huidige processen of resultaten?",
      ],
    },
  ];

  // Handle input changes
  const handleInputChange = (category, question, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...(prevData[category] || {}),
        [question]: value,
      },
    }));
  };

  // Download Excel file
  const handleDownload = () => {
    // Convert form data to table format
    const tableData = [];
    for (const category in formData) {
      for (const question in formData[category]) {
        tableData.push({
          Category: category,
          Question: question,
          Answer: formData[category][question],
        });
      }
    }

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");

    // Download the file
    XLSX.writeFile(workbook, "questionnaire.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-customblue">
        Gedetailleerde Vragenlijst
      </h1>
      <form
        className="space-y-8 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        {questions.map((section) => (
          <div key={section.id} className="space-y-4">
            <h2 className="text-2xl font-bold text-customblue">
              {section.category}
            </h2>
            {section.questions.map((question, index) => (
              <div key={index} className="flex flex-col">
                <label
                  htmlFor={`question-${section.id}-${index}`}
                  className="text-lg font-semibold mb-2"
                >
                  {question}
                </label>
                <textarea
                  id={`question-${section.id}-${index}`}
                  placeholder="Geef hier uw antwoord"
                  rows="3"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-customblue"
                  onChange={(e) =>
                    handleInputChange(section.category, question, e.target.value)
                  }
                ></textarea>
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full bg-customblue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Download Excel
        </button>
      </form>
    </div>
  );
}
