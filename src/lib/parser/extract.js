/**
 * @update 05-11-2026 1:04 PM Mon.
 * @author jimboyz-js
 * @param { content } HTML content
 * @returns image source
 */

import * as cheerio from "cheerio";

// This function takes the HTML content of a blog post, parses it to find the first <img> tag, and returns the value of its src attribute. If no image is found, it returns null. This can be useful for displaying a thumbnail or featured image for a post when only the content is available.
export function extractFirstImageWithDomParser(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
}

export const extractFirstImage = (html) => {
  if (typeof html !== "string") return null;
  const match = html.match(/<img[^>]+src=(?:"|')([^"']+)(?:"|')/i);
  return match ? match[1] : null;
};

export function extractAllImagesWithCheerio(content) {
  const $ = cheerio.load(content);
  const images = [];

  $("img").each((_, el) => {
    const img = $(el);

    images.push({
      src:
        img.attr("src") ||
        img.attr("data-src") ||
        img.attr("data-original") ||
        null,
      alt: img.attr("alt") || null,
      title: img.attr("title") || null,
    });
  });

  return images;
}

// export function extractContentWithCheerio(content) {
//   const $ = cheerio.load(content);

//   const images = [];
//   let metaDescription = null;

//   $("img").each((_, el) => {
//     const img = $(el);

//     images.push({
//       src:
//         img.attr("src") ||
//         img.attr("data-src") ||
//         img.attr("data-original") ||
//         null,
//       alt: img.attr("alt") || null,
//       title: img.attr("title") || null,
//     });
//   });

//   $.root()
//     .contents()
//     .each((_, node) => {
//       if (node.type === "comment") {
//         const comment = node.data.trim();

//         const match = comment.match(/^META:\s*(.*)$/);

//         if (match) {
//           metaDescription = match[1];
//         }
//       }
//     });

//   return {
//     images,
//     metaDescription,
//   };
// }

// Features: META, KEYWORDS, ROBOTS, and GOOGLEBOT
export function extractContentWithCheerio(content) {
  const $ = cheerio.load(content);

  const images = [];
  let metaDescription = null;
  let keywords = [];

  let robots = {
    index: true,
    follow: true,
    nocache: false,
  };

  let googleBot = {
    index: true,
    follow: true,
  };

  // Extract images
  $("img").each((_, el) => {
    const img = $(el);

    images.push({
      src:
        img.attr("src") ||
        img.attr("data-src") ||
        img.attr("data-original") ||
        null,
      alt: img.attr("alt") || null,
      title: img.attr("title") || null,
    });
  });

  // Extract META, KEYWORDS, ROBOTS and GOOGLEBOT
  $.root()
    .contents()
    .each((_, node) => {
      if (node.type === "comment") {
        const comment = node.data.trim();

        // META
        const metaMatch = comment.match(/^META:\s*(.*)$/i);

        if (metaMatch) {
          metaDescription = metaMatch[1].trim();
        }

        // KEYWORDS
        const keywordsMatch = comment.match(/^KEYWORDS:\s*(.*)$/i);

        if (keywordsMatch) {
          keywords = keywordsMatch[1]
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean);
        }

        // ROBOTS
        const robotsMatch = comment.match(/^ROBOTS:\s*(.*)$/i);

        if (robotsMatch) {
          const directives = robotsMatch[1]
            .split(",")
            .map((directive) => directive.trim().toLowerCase())
            .filter(Boolean);

          robots = {
            index: directives.includes("index"),
            follow: directives.includes("follow"),
            nocache: directives.includes("nocache"),
          };
        }

        // GOOGLEBOT
        const googleBotMatch = comment.match(/^GOOGLEBOT:\s*(.*)$/i);

        if (googleBotMatch) {
          const directives = googleBotMatch[1]
            .split(",")
            .map((directive) => directive.trim().toLowerCase())
            .filter(Boolean);

          googleBot = {
            index: directives.includes("index"),
            follow: directives.includes("follow"),
          };
        }
      }
    });

  return {
    images,
    metaDescription,
    keywords,
    robots,
    googleBot,
  };
}

// export function getExtractedContent(content) {
//   const $ = cheerio.load(content);

//   // Get first image
//   const firstImg = $("img").first();

//   const thumbnail = {
//     src:
//       firstImg.attr("src") ||
//       firstImg.attr("data-src") ||
//       firstImg.attr("data-original") ||
//       null,
//     alt: firstImg.attr("alt") || null,
//     title: firstImg.attr("title") || null,
//   };

//   // REMOVE first image from content
//   firstImg.remove();

//   // Updated HTML without thumbnail image
//   // const cleanedContent = $.html();
//   const cleanedContent = $("body").html();

//   return {
//     thumbnail,
//     content: cleanedContent,
//   };
// }

// export function getExtractedContent(content) {
//   const $ = cheerio.load(content);

//   // Get the first image
//   const firstImg = $("img").first();

//   const thumbnail = {
//     src:
//       firstImg.attr("src") ||
//       firstImg.attr("data-src") ||
//       firstImg.attr("data-original") ||
//       null,
//     alt: firstImg.attr("alt") || null,
//     title: firstImg.attr("title") || null,
//   };

//   Remove the first image
//   if (firstImg.length) {
//     // Blogger commonly wraps images like:
//     //
//     // <div class="separator" style="...">
//     //   <a href="..." style="margin-left: 1em; margin-right: 1em;">
//     //     <img ...>
//     //   </a>
//     // </div>
//     //
//     // Remove the image first.
//     firstImg.remove();

//     // If the image was inside an <a>, remove the empty <a>.
//     const parentAnchor = firstImg.parent("a");

//     if (parentAnchor.length && parentAnchor.children().length === 0) {
//       parentAnchor.remove();
//     }

//     // If the anchor was inside a Blogger separator and the separator
//     // is now empty, remove the separator as well.
//     const separator = parentAnchor.parent(".separator");

//     if (
//       separator.length &&
//       separator.find("img").length === 0 &&
//       separator.text().trim() === ""
//     ) {
//       separator.remove();
//     }
//   }

//   // Get the cleaned HTML from <body>
//   const cleanedContent = $("body").html();

//   return {
//     thumbnail,
//     content: cleanedContent,
//   };
// }

// remove the .separator wrapper if it exists, otherwise just remove the first image//////

// remove the 'a' wrapper
// export function getExtractedContent(content) {
//   const $ = cheerio.load(content);

//   // Get the first image
//   const firstImg = $("img").first();

//   const thumbnail = {
//     src:
//       firstImg.attr("src") ||
//       firstImg.attr("data-src") ||
//       firstImg.attr("data-original") ||
//       null,
//     alt: firstImg.attr("alt") || null,
//     title: firstImg.attr("title") || null,
//   };

//   if (firstImg.length) {
//     // Find Blogger's typical image wrapper BEFORE removing the image.
//     const anchor = firstImg.parent("a");
//     const separator = anchor.parent(".separator");

//     // Remove the first image.
//     firstImg.remove();

//     // Remove empty anchor.
//     if (anchor.length && anchor.children().length === 0) {
//       anchor.remove();
//     }

//     // Remove the separator if it no longer contains anything useful.
//     if (
//       separator.length &&
//       separator.find("img, a").length === 0 &&
//       separator.text().trim() === ""
//     ) {
//       separator.remove();
//     }
//   }

//   const cleanedContent = $("body").html();

//   return {
//     thumbnail,
//     content: cleanedContent,
//   };
// }

// remove the .separator wrapper
export function getExtractedContent(content) {
  const $ = cheerio.load(content);

  const firstImg = $("img").first();

  const thumbnail = {
    src:
      firstImg.attr("src") ||
      firstImg.attr("data-src") ||
      firstImg.attr("data-original") ||
      null,
    alt: firstImg.attr("alt") || null,
    title: firstImg.attr("title") || null,
  };

  if (firstImg.length) {
    // Find the closest Blogger image wrapper.
    const separator = firstImg.closest(".separator");

    if (separator.length) {
      // The entire wrapper belongs to the thumbnail,
      // so remove it instead of removing only the image.
      separator.remove();
    } else {
      // If there is no Blogger separator wrapper,
      // just remove the first image.
      firstImg.remove();
    }
  }

  const cleanedContent = $("body").html();

  return {
    thumbnail,
    content: cleanedContent,
  };
}
