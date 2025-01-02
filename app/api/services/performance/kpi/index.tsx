/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import {
  GoalAchievementRate,
  MonthlyCompletionRate,
  TrainingCompletionRate,
} from "@/types";

export const getGoalsAcheivementRate =
  async (): Promise<GoalAchievementRate> => {
    const session = await getServerSession(authOptions);

    const response = request("GET", `${baseUrl}/v1/goals/achievement-rate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });

    return response as Promise<GoalAchievementRate>;
  };

export const getTrainingCompletionRate =
  async (): Promise<TrainingCompletionRate> => {
    const session = await getServerSession(authOptions);

    const response = await request(
      "GET",
      `${baseUrl}/v1/assessments/completion-rate`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
    );

    return response as TrainingCompletionRate;
  };

export const getTrainingCompletionMonthlyRate = async (): Promise<
  MonthlyCompletionRate[]
> => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/assessments/monthly-completion-rate`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response as MonthlyCompletionRate[];
};
