import PageHeader from "@/components/page-header";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FAQForm } from "@/lib/types";
import { FAQ_FORM_DATA } from "@/lib/constants";

export default function FaqForm({ goForward }: { goForward: () => void }) {
  const faqSchema = z.object({
    question: z.string().trim().nonempty({ error: "Please enter a question" }),
    answer: z.string().trim().nonempty({ error: "Please enter an answer" }),
  });

  const faqsSchema = z.object({
    faqs: z.array(faqSchema),
  });

  type FaqFormValues = z.infer<typeof faqsSchema>;

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqsSchema),
    defaultValues: {
      faqs: [
        {
          question: "",
          answer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  React.useEffect(() => {
    const savedFormData = localStorage.getItem(FAQ_FORM_DATA);
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      Object.entries(parsedData).forEach(([key, value]) => {
        form.setValue(key as keyof FAQForm, value as FAQForm[keyof FAQForm]);
      });
    }

    const subscription = form.watch((value) => {
      localStorage.setItem(FAQ_FORM_DATA, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <PageHeader
        title="Manually Add Your FAQs"
        description="Add your questions and answers below. You can edit, or remove them before generating your PDF."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(goForward)}
          className="mt-8 space-y-6"
        >
          {fields.map((faqItem, index) => (
            <div key={faqItem.id} className="space-y-6 flex-1">
              <FormField<FaqFormValues, `faqs.${number}.question`>
                control={form.control}
                name={`faqs.${index}.question` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField<FaqFormValues, `faqs.${number}.answer`>
                control={form.control}
                name={`faqs.${index}.answer` as const}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant={"secondary"}
            className="w-full"
            size={"lg"}
            onClick={() => append({ question: "", answer: "" })}
          >
            Add FAQ
          </Button>

          <Button className="w-full" size={"lg"}>
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
