import dotenv from "dotenv";
import { createServer } from "./config/server.config";

const app = createServer();

dotenv.config();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
