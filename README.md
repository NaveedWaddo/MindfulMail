# MindfulMail 📬

![MindfulMail Home Screen](https://github.com/user-attachments/assets/6bb099df-fb04-475f-a87b-e4b9ae402f8c)

MindfulMail is a minimalistic, AI-powered email client that helps users organize and manage their inbox efficiently. Equipped with advanced AI prioritization, full-text search, and a streamlined keyboard shortcut interface, MindfulMail aims to provide a seamless email experience.

---

## 🚀 Features

- **AI Email Prioritization**: Automatically organizes your inbox using AI-driven insights.
- **Subscription Feature**: Users can subscribe for premium features, with payments managed by Stripe.
- **Effortless Deployment**: Optimized for deployment on Vercel, allowing for rapid scaling.
- **Responsive Design**: Fully responsive, works across all devices.

---

## 🛠️ Technologies and Frameworks

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Auth**: Clerk
- **Database**: PostgreSQL (Neon Database, Serverless)
- **Backend**: Prisma ORM, AWS SDK, OpenAI API, Stripe, Pinecone, Axios
- **Libraries**: `@tanstack/react-query`, `@clerk/nextjs`, `clsx`, `tailwind-merge`

---

## 🚀 Getting Started

Follow the steps below to install and set up the project:

### 1. Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/NaveedWaddo/MindfulMail
```

2. **Navigate to the project directory**

   ```bash
   cd MindfulMail
   ```

3. **Install Node.js**

   The project requires Node.js version 13.4.19 or later. You can download it from [here](https://nodejs.org/en/download/).

4. **Install the required dependencies**

   Run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

   This will install all the dependencies listed in the `package.json` file, including Next.js, React, React DOM, Axios, Stripe, Tailwind CSS, and other specific dependencies such as "@aws-sdk/client-s3" and "@clerk/nextjs".

5. **Setup environment variables**

   Create a `.env` file in the root directory of your project and add the required environment variables.

6. **Run the project**

   Now, you can run the project using the following command:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
