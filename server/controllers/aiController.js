const axios = require("axios");

const getRecommendation = async (req, res) => {
  try {
    const employee = req.body;

    const prompt = `
    Analyze the following employee data and provide:

    1. Promotion recommendation
    2. Training suggestions
    3. Performance feedback
    4. Skill improvement recommendations
    5. Employee ranking insight

    Employee Data:
    Name: ${employee.name}
    Department: ${employee.department}
    Skills: ${employee.skills}
    Performance Score: ${employee.performanceScore}
    Experience: ${employee.experience} years
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse =
      response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      recommendation: aiResponse,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI recommendation failed",
    });
  }
};

module.exports = {
  getRecommendation,
};