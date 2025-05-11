"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Form } from "./ui/form";
import AuthCustomInput from "./customInput";
import { AuthFormSchema } from "@/type";

const formSchema = AuthFormSchema(); // moved outside component

function PredictForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);
  const [result, setResult] = useState<string>("");

  const formBuild = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preg: 0,
      plas: 0,
      pres: 0,
      skin: 0,
      insu: 0,
      mass: 0,
      pedi: 0,
      age: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Request Data:", JSON.stringify(data));

    try {
      const res = await fetch("https://dioabetesv2.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", res.status);

      const text = await res.text(); // Get raw response
      console.log("Raw response:", text);

      const json = JSON.parse(text); // Manually parse to catch malformed JSON
      console.log("Parsed JSON:", json);

      if (json?.prediction === "tested_negative") {
        json.prediction = "Tested Negative";
      } else if (json?.prediction === "tested_positive") {
        json.prediction = "Tested Positive";
      }
      setResult(json?.prediction ?? "No result");
      setResponseReceived(true);
    } catch (error) {
      console.error("Error occurred:", error);
      setResult("Error fetching prediction");
      setResponseReceived(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (responseReceived) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>
        <div
          className={`py-4 px-2 ${
            result === "Tested Negative"
              ? `bg-red-300 text-red-950 `
              : `bg-green-300 text-green-950`
          } text-center rounded-sm`}
        >
          <p className="font-extrabold opacity-100">{result}</p>
        </div>
        <button
          onClick={() => {
            setResponseReceived(false);
            formBuild.reset();
          }}
          className="absolute z-10 bottom-28 right-36 px-12 py-2 rounded-md font-bold border text-blue-400 hover:text-white border-blue-400 hover:bg-blue-400"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <Form {...formBuild}>
      <form
        onSubmit={formBuild.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-start w-[60%]"
      >
        <AuthCustomInput
          name="age"
          control={formBuild.control}
          placeholder="Age"
        />
        <AuthCustomInput
          name="insu"
          control={formBuild.control}
          placeholder="Insulin"
        />
        <AuthCustomInput
          name="mass"
          control={formBuild.control}
          placeholder="Mass"
        />
        <AuthCustomInput
          name="pedi"
          control={formBuild.control}
          placeholder="Pedigree"
        />
        <AuthCustomInput
          name="plas"
          control={formBuild.control}
          placeholder="Glucose Level"
        />
        <AuthCustomInput
          name="preg"
          control={formBuild.control}
          placeholder="No. Of Pregnancy"
        />
        <AuthCustomInput
          name="pres"
          control={formBuild.control}
          placeholder="Blood Pressure"
        />
        <AuthCustomInput
          name="skin"
          control={formBuild.control}
          placeholder="Skin Thickness"
        />

        {!isLoading ? (
          <button
            type="submit"
            className="absolute z-10 bottom-28 right-36 px-12 py-2 rounded-md font-bold border text-blue-400 hover:text-white border-blue-400 hover:bg-blue-400"
          >
            Predict
          </button>
        ) : (
          <div className="flex justify-center items-center">
            <Loader2 size={20} className="animate-spin" />
            &nbsp;Loading
          </div>
        )}
      </form>
    </Form>
  );
}

export default PredictForm;
