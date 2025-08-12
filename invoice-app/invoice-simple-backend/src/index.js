// includes
const express = require("express");
const app = express();
let path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const chatRoutes = require("./routes/chat");


app.use(express.static("public"));
// Serve uploads to access chat attachments
// Serve uploads from project root regardless of cwd
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

app.use(helmet());

// Data Sanitization against NOSql query injection
app.use(mongoSanitize());

// Data Sanitization against site script XSS
app.use(xss());

// routes
let authRoutes = require("./routes/auth/index");
let optRoutes = require("./routes/otp/index");
let productRoutes = require("./routes/product/index");
let fmrRoutes = require("./routes/fundManagerReport/index");
let fundPricesRoutes = require("./routes/funds/index");
let mabrurProductRoutes = require("./routes/mabrurProducts/index");
let formRoutes = require("./routes/forms/index");
let customerRoutes = require("./routes/customer/index");
let subscriptionRoutes = require("./routes/subscriptions/index");
let notificationRoutes = require("./routes/notifications/index");
let teamMemberRoutes = require("./routes/teamMembers/index");
let bookCallRoutes = require("./routes/bookCall/index");
let configurationsRoutes = require("./routes/configurations/index");
let serviceRequestRoutes = require("./routes/serviceRequest/index");
let faqsRoutes = require("./routes/faqs/index");
let feedbacksRoutes = require("./routes/feedbacks/index");
let complaintRoutes = require("./routes/complaints/index");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "channel",
    ],
  })
);

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // if you're mixing JSON and form-data

// load env file
require("dotenv").config({ path: path.resolve(__dirname, "./../.env") });

async function bootstrap() {
  // MongoDB Connection Using Mongoose & Models
  await require("./config/database")();

  /** --- API ROUTES --- **/
  app.use("/auth/", authRoutes);
  app.use("/otp/", optRoutes);
  app.use("/subscriptions/", subscriptionRoutes);
  app.use("/products/", productRoutes);
  app.use("/mabrurProducts/", mabrurProductRoutes);
  app.use("/fundManagerReport/", fmrRoutes);
  app.use("/fundPrices/", fundPricesRoutes);
  app.use("/forms/", formRoutes);
  app.use("/notifications/", notificationRoutes);
  app.use("/customers/", customerRoutes);
  app.use("/teamMembers/", teamMemberRoutes);
  app.use("/bookcalls/", bookCallRoutes);
  app.use("/configurations/", configurationsRoutes);
  app.use("/serviceRequests/", serviceRequestRoutes);
  app.use("/faqs/", faqsRoutes);
  app.use("/feedbacks/", feedbacksRoutes);
  app.use("/complaints/", complaintRoutes);
  // Chat routes (ensure body parsers and cors already applied)
  app.use("/chat", chatRoutes);

  // Socket & Server
  const http = require("http");
  const { Server } = require("socket.io");
  const initSocket = require("./socket");
  const { ensureBuilderAndTradieRoles } = require("./bootstrap/ensure-roles");

  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });
  app.set("io", io);
  initSocket(io);

  // Ensure required roles exist at startup (now that DB is connected)
  await ensureBuilderAndTradieRoles();

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}

bootstrap();

module.exports = app;
