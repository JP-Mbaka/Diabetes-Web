import { AuthFormSchema } from "@/type";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormSchema = AuthFormSchema();

interface CustomInputTypes {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  placeholder: string;
}

function AuthCustomInput({ control, name, placeholder }: CustomInputTypes) {
  // console.log(FormSchema);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              type={
                name.match("password")
                  ? "password"
                  : name.match("confirmPassword")
                  ? "password"
                  : "text"
              }
              placeholder={placeholder}
              className="p-3"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AuthCustomInput;
