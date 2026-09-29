/**
 * @author jimboyz-js
 * @param {data} Post data
 */
//05-24-2026 Sun. 04:02 PM
export function getArchivePosts_(data) {
  const posts = data.items || [];

  const archives = posts.reduce((acc, post) => {
    const date = new Date(post.published);

    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(post);

    return acc;
  }, {});

  return archives;
}

export function getArchivePosts__(data) {
  const posts = data.items || [];

  const archives = posts.reduce((acc, post) => {
    const date = new Date(post.published);

    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(post);

    return acc;
  }, {});

  return archives;
}

export function getArchivePosts(data) {
  const posts = data.items || [];

  const archives = posts.reduce((acc, post) => {
    const date = new Date(post.published);

    const year = date.getFullYear();

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = {
        count: 0,
        posts: [],
      };
    }

    acc[year][month].count++;

    acc[year][month].posts.push(post);

    return acc;
  }, {});

  return archives;
}
