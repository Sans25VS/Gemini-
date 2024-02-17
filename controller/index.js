const{ GoogleGenerativeAI} = require("@google/generative-ai");
const dotenv = require("dotenv");
export const history = [];

dotenv.config();
// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

//Model initialization
const modelId = "gemini-pro";
//const model = configuration.getGenerativeModel({ model : modelId});

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
  
  const model = configuration.getGenerativeModel({ model: modelId, generationConfig });
  
  export const generateResponses = async (req,res) => {
    try{
        const {prompt} = req.body;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        history.push(text);
        console.log(history);
        res.send({response:text});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"INTERNAL SERVER ERROR"});
    }
};

app.get("/generate", (req, res) => {
    res.send(history);
  });





