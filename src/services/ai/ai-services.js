const aiForAnalysesCV = async ({ extractedFile, jobDescription }) => {
  // sementara mock dulu
  console.log(extractedFile);
  console.log(jobDescription);

  return {
    score: 78,
    summary: 'CV cukup sesuai untuk posisi Backend Developer namun masih kurang pada deployment dan testing.',
    
    matchedSkills: [
      'Node.js',
      'Express.js',
      'MongoDB',
    ],

    missingSkills: [
      'Docker',
      'CI/CD',
      'Unit Testing',
    ],

    improvements: [
      'Tambahkan project deployment',
      'Tambahkan testing pada project',
      'Perjelas deskripsi pengalaman',
    ],

    recommendedSkills: [
      'Docker',
      'GitHub Actions',
      'Jest',
    ],
  };
};

export default aiForAnalysesCV;