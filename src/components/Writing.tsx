import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
}

export default function Writing() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const sampleArticles: Article[] = [
      { id: '1', title: 'Understanding AI', description: 'A deep dive into modern AI systems.', url: '#' },
      { id: '2', title: 'Productivity Tips', description: 'How to optimize your workflow.', url: '#' },
      { id: '3', title: 'Web Development Trends', description: 'Latest trends in frontend development.', url: '#' },
    ];
    setArticles(sampleArticles);
  }, []);

  return (
    <section className="w-full mt-16 flex flex-col items-center">
      <div className="max-w-[660px] w-full">
        {/* Nagłówek sekcji */}
        <h2 className="text-xl font-satoshi font-semibold mb-4 text-left text-tm-gray dark:text-white px-4">
          Writing
        </h2>

        {/* Lista artykułów */}
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              className="block p-4 rounded-lg transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <h3 className="font-satoshi font-semibold mb-1 dark:text-white">{article.title}</h3>
              <p className="font-satoshi text-sm dark:text-gray-200">{article.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}