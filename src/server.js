import express from "express";
import connectDB from "./database/index.js";
import userRoutes from "./routes/user/userRoutes.js";
import shayriRoutes from "./routes/shayri/shayriRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


//  CORS
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

const startServer = async () => {
  await connectDB();

  //  Swagger
  //  Swagger UI with custom theme
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCss: `
      .swagger-ui .topbar { background-color: #6b21a8; }   /* Purple topbar */
      .swagger-ui .topbar .download-url-wrapper { display: none; } 
      .swagger-ui .info { margin: 20px; }
      .swagger-ui .scheme-container { background: #f3f4f6; border-radius: 10px; }
      .swagger-ui .opblock-summary { border-radius: 10px; margin: 5px 0; }
      .swagger-ui .btn.execute { background: #6b21a8 !important; border-radius: 8px; }
      .swagger-ui .response-col_description { font-size: 14px; }
      body { font-family: 'Inter', sans-serif; }
    `,
    customSiteTitle: "Shayri API Docs",
    customfavIcon: "https://cdn-icons-png.flaticon.com/512/545/545682.png", //  Fav Icon
    swaggerOptions: {
          // collapse by default
      defaultModelsExpandDepth: -1,   // hide schemas
      filter: false,                   // search bar enable
      displayRequestDuration: true,   // show API response time
    },
  })
);


  // Routes
  app.use(`/api/v2/users`, userRoutes);
  app.use(`/api/v2/shayri`, shayriRoutes);

  app.listen(PORT, () => {
    console.log(` Server running on http://127.0.0.1:${PORT}`);
    console.log(` Swagger Docs: http://127.0.0.1:${PORT}/docs`);
  });
};

startServer();
