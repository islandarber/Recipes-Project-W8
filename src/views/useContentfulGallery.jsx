import { createClient } from "contentful";

const useContentfulGallery = () => {
 const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: "dhnt7i1w9s9b",
  accessToken: accessToken,
  host: "preview.contentful.com"
})

const getPhotos = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "gallery",
      select: "fields"
    });

    return entries;

  } catch (error) {
    console.log(`Error fetching recipes ${error}`);
  }
} 
return { getPhotos };
}

export default useContentfulGallery;