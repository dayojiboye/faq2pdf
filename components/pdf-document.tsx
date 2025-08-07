import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { FAQ } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 12,
  },
  question: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  answer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

type PdfDocumentProps = {
  faqs: FAQ[];
};

export default function PdfDocument({ faqs }: PdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.question}>Q: {faq.question}</Text>
            <Text style={styles.answer}>A: {faq.answer}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
