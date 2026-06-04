// /* eslint-disable no-unused-vars */
// const aiForAnalysesCV = async ({ cv_text, jobDescription }) => {
//   // sementara mock dulu
//   // console.log(cv_text);
//   // console.log(jobDescription);

//   return {
//     score: 78,
//     summary: 'CV cukup sesuai untuk posisi Backend Developer namun masih kurang pada deployment dan testing.',
    
//     matchedSkills: [
//       'Node.js',
//       'Express.js',
//       'MongoDB',
//     ],

//     missingSkills: [
//       'Docker',
//       'CI/CD',
//       'Unit Testing',
//     ],

//     improvements: [
//       'Tambahkan project deployment',
//       'Tambahkan testing pada project',
//       'Perjelas deskripsi pengalaman',
//     ],

//     recommendedSkills: [
//       'Docker',
//       'GitHub Actions',
//       'Jest',
//     ],
//   };
// };

// export default aiForAnalysesCV;

const aiForAnalysesCV = async ({ cv_text, jobDescription }) => {
  const response = await fetch(
    process.env.FASTAPI_AI_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cv_text: cv_text,
        job_description: jobDescription,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `AI Service Error (${response.status}): ${errorBody}`
    );
  }

  const result = await response.json();

  return result.data;
};

export default aiForAnalysesCV;