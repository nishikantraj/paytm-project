"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function createOnRampTransaction({
  amount,
  provider,
}: {
  amount: number;
  provider: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  if (!userId) {
    throw new Error("You must be logged in to add money.");
  }

  if (!Number.isFinite(amount) || amount < 100) {
    throw new Error("Enter an amount of at least INR 1.");
  }

  await prisma.balances.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      amount: 0,
      locked: 0,
    },
  });

  const transaction = await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      startTime: new Date(),
      status: "Processing",
      token: `onramp_${userId}_${Date.now()}`,
      userId,
    },
  });

  return {
    token: transaction.token,
  };
}
