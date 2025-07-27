import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FAQ_FORM_DATA } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ScrapeForm({ goForward }: { goForward: () => void }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const urlSchema = z.object({
    url: z.url({ error: "Please enter a valid URL" }).trim(),
  });

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "https://",
    },
  });

  async function scrapeUrl(url: string) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      }

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem(
          FAQ_FORM_DATA,
          JSON.stringify({ faqs: JSON.parse(data) })
        );
        goForward();
      } else throw new Error(data.message);
    } catch (err: any) {
      console.error(err);
      toast(err.message, {
        id: "scrape-error-toast",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(values: { url: string }) {
    scrapeUrl(values.url);
  }

  return (
    <>
      <PageHeader
        title="Auto-Extract FAQs from a Web Page"
        description="Paste the URL of your FAQ page and we’ll automatically extract the questions and answers for you."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FAQ URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={"lg"}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Scraping...
              </>
            ) : (
              "Scrape"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
