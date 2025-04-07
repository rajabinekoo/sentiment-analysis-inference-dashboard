# Yelp Reviews Sentiment Analysis - Dashboard

This project is a Next.js dashboard designed to provide a user interface for monitoring and interacting with the following sentiment analysis applications:

- [Sentiment Analysis Inference Server](https://github.com/rajabinekoo/sentiment-analysis-inference-server): A Python Flask server for performing sentiment analysis.
- [Sentiment Analysis ML Spark Scala](https://github.com/rajabinekoo/sentiment-analysis-ml-spark-scala): A Spark and Scala application for sentiment analysis machine learning tasks.

This dashboard aims to offer a centralized view of the status and results from these backend services.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Copy the .local.env file to .env:

```bash
cp .local.env .env
```

Open the .env file and carefully configure the necessary environment variables. This is crucial for the dashboard to connect to the backend sentiment analysis services. Ensure that all placeholders or default values are replaced with your actual configuration.

Open [http://localhost:3000](http://localhost:3000) with your value to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
