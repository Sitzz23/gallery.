import { db } from "~/server/db";

/* eslint-disable @next/next/no-img-element */
const mockUrls = [
  "https://utfs.io/f/51a45516-6b08-448f-9a63-f9d3f727b42e-3ojlsf.png",
  "https://utfs.io/f/bcedae4f-9cc8-4e95-9c96-0646eb8d0511-28b9.png",
  "https://utfs.io/f/83df4954-339c-467f-9d6e-f3e765d25df6-xc7v5o.png",
  "https://utfs.io/f/bc02d017-ff58-4549-a854-3d2fc4f8e43e-23ti.jpeg",
  "https://utfs.io/f/13394dc7-0892-4fbd-b8a7-51e88263f559-3dy5q0.jpg",
  "https://utfs.io/f/ea8b611f-ecb4-40dc-a863-911eb671b7fc-1zz7h.jpeg",
];

export const dynamic = "force-dynamic";

const mockImages = mockUrls.map((url, index) => ({ id: index + 1, url: url }));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  return (
    <main>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            <p>{post.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
