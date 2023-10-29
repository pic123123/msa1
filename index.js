import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
const app = express();
const port = 7001;
const allowlist = [
  `http://localhost:3000`,
  `http://localhost:3001`,
  `http://test-wakeup.plto.com`,
  `https://test-wakeup.plto.com`,
  `http://stag-wakeup.plto.com`,
  `http://stag-wakeup.plto.com`,
  `http://wakeup.plto.com`,
  `http://wakeup.plto.com`,
]; //프론트 주소
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // 접근 권한을 부여하는 도메인

    origin: allowlist,
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

// AWS Health-Check
app.get("/health-check", (req, res) => {
  res.send("Hello World! nodejs health-check");
});

app.get("/get-polular-movies", async (req, res) => {
  const { data: popularResult } = await axios.get(
    "https://movies-api.nomadcoders.workers.dev/popular"
  );
  console.log(popularResult);
  res.status(200).send({ success: true, result: popularResult });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
