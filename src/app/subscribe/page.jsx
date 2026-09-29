import { redirect } from "next/navigation";

export const metadata = {
  title: "You're subscribed",
  description: "",
  robots: {
    index: false,
    follow: true,
  },
};

// You can refine this page further by adding a Subscribe form or additional content if needed.
const SubscribePage = () => {
  // Redirect to the homepage's subscribe form
  return redirect("/#subscribe");
};

export default SubscribePage;
