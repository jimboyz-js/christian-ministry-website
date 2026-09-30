import { getUnsentPosts } from "./getUnsentPosts";
import { createCampaign, scheduleCampaign, updateCampaign } from "./mailerlite";
import { saveNewsletter } from "./storage";
import { generateNewsletterHTML } from "./template";

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function runNewsletter() {
  const posts = await getUnsentPosts();

  if (!posts.length) {
    console.log("[newsletter] No new posts found.");
    return [];
  }

  const results = [];

  for (const post of posts) {
    try {
      const html = generateNewsletterHTML(post);
      const title = cleanText(post.title || "New article");
      const subject = `New article: ${title}`;
      const name = `Christian Ministry Website - ${title}`;

      const campaign = await createCampaign({
        name,
        subject,
        fromName:
          process.env.MAILERLITE_FROM_NAME || "Christian Ministry Website",
        fromEmail:
          process.env.MAILERLITE_FROM_EMAIL || "hello@ministry-website.org",
        groupId: process.env.MAILERLITE_GROUP_ID,
        html,
      });

      await updateCampaign({
        campaignId: campaign.id,
        name,
        subject,
        fromName:
          process.env.MAILERLITE_FROM_NAME || "Christian Ministry Website",
        fromEmail:
          process.env.MAILERLITE_FROM_EMAIL || "hello@ministry-website.org",
        html,
      });

      await scheduleCampaign({ campaignId: campaign.id });

      saveNewsletter({
        postId: post.id,
        title,
        publishedAt: post.published,
        campaignId: campaign.id,
      });

      results.push({ postId: post.id, campaignId: campaign.id });
      console.log(`[newsletter] Sent ${post.id}`);
    } catch (error) {
      console.error(
        `[newsletter] Failed for post ${post.id}:`,
        error.message || error,
      );
    }
  }

  return results;
}

export default runNewsletter;
