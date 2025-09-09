import { Router } from "express";
import {
  getBenchmarksHistoryInRange,
  getBenchmarksStateAtTime,
  getBenchmarksWithCurrentState,
} from "../controllers/benchmarkController";

const router = Router();

router.get("/benchmarks/current", getBenchmarksWithCurrentState);

router.get("/benchmarks/history", getBenchmarksHistoryInRange);

router.get("/benchmarks/state-at", getBenchmarksStateAtTime);

export default router;
