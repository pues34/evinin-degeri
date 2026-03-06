import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, feedback } = body;

        if (!id || !feedback) {
            return NextResponse.json({ success: false, error: "ID and feedback are required" }, { status: 400 });
        }

        if (!["YUKSEK", "NORMAL", "DUSUK"].includes(feedback)) {
            return NextResponse.json({ success: false, error: "Invalid feedback value" }, { status: 400 });
        }

        const updated = await prisma.valuationRequest.update({
            where: { id },
            data: { priceFeedback: feedback }
        });

        // ==========================================
        // V23 ML RLHF Feedback Loop Implementation
        // ==========================================
        // If the user says the price is "YUKSEK", we slightly decrease the neighborhood multiplier.
        // If the user says it's "DUSUK", we slightly increase the neighborhood multiplier.
        // This makes the algorithm self-correct over time based on local agent/user consensus.

        if (updated && updated.neighborhood && updated.district) {
            const shiftRate = 0.005; // 0.5% adjustment per feedback (slow learning rate to avoid spikes)

            try {
                // Find the neighborhood record
                const neighborhoodRec = await prisma.neighborhood.findFirst({
                    where: {
                        name: updated.neighborhood,
                        district: { name: updated.district }
                    }
                });

                if (neighborhoodRec) {
                    let newMultiplier = neighborhoodRec.multiplier;
                    if (feedback === "YUKSEK") {
                        // People think our price is too high -> lower the multiplier
                        newMultiplier -= shiftRate;
                    } else if (feedback === "DUSUK") {
                        // People think our price is too low -> raise the multiplier
                        newMultiplier += shiftRate;
                    }

                    // Constrain the multiplier so it doesn't run away (e.g. 0.5 to 3.0)
                    newMultiplier = Math.max(0.5, Math.min(newMultiplier, 3.0));

                    // Update the neighborhood with the new learned multiplier
                    if (newMultiplier !== neighborhoodRec.multiplier) {
                        await prisma.neighborhood.update({
                            where: { id: neighborhoodRec.id },
                            data: { multiplier: newMultiplier }
                        });
                        console.log(`ML RLHF: Shifted ${updated.neighborhood} multiplier to ${newMultiplier}`);
                    }
                }
            } catch (mlErr) {
                console.warn("Failed to apply ML feedback loop adjustment:", mlErr);
            }
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Feedback error:", error);
        return NextResponse.json({ success: false, error: "Could not save feedback" }, { status: 500 });
    }
}
