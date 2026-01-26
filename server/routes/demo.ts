import { RequestHandler } from "express";
import { DemoResponse } from "@shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "CyberGuard API Demo - Security services ready",
  };
  res.status(200).json(response);
};
