"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";

import Meal from "./_components/Meal";

export default function Home() {
  return (
    <>
      <Authenticated>
        <PageContent />
      </Authenticated>
      <Unauthenticated>
        <div className="container mx-auto">
          <h2 className="text-4xl">Sign in to get started</h2>
        </div>
      </Unauthenticated>
    </>
  );
}

function PageContent() {
  const [mealInput, setMealInput] = useState<string | undefined>(undefined);

  const meals = useQuery(api.meals.list, {
    search: mealInput,
  });
  const submitMeal = useMutation(api.meals.submit);

  const submitNewMeal = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();

      if (!mealInput || mealInput.trim().length === 0) {
        alert("You must enter a meal before submitting");
        return;
      }

      await submitMeal({ title: mealInput.trim() });
      setMealInput(undefined);
    },
    [mealInput],
  );

  return (
    <main className="min-h-full h-full container mx-auto mt-5">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-5xl">My Meals</h1>
        <div className="flex flex-col gap-1 mt-5">
          <form onSubmit={submitNewMeal}>
            <Input
              type="text"
              className="w-full text-xl px-3"
              placeholder="Submit or search..."
              value={mealInput ?? ""}
              onChange={(e) => setMealInput(e.target.value || undefined)}
            />
          </form>

          <div className="py-2" />

          {(meals ?? []).map((meal) => (
            <Meal key={meal._id} meal={meal} />
          ))}
        </div>
      </div>
    </main>
  );
}
