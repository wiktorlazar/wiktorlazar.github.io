import { useEffect, useState } from 'react';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/wiktorlazar/repos')
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="w-full mt-16 flex flex-col items-center">
      <div className="max-w-[660px] w-full">
        {/* Nagłówek sekcji z paddingiem tylko dla niego */}
        <h2 className="text-xl font-satoshi font-semibold mb-4 text-left text-tm-gray px-4">
          Projects
        </h2>

        {/* Lista projektów w jednej kolumnie, wyrównane do lewej */}
        <div className="flex flex-col gap-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              className="block p-4 rounded-[1rem] transition-colors duration-300 hover:bg-black/10"
            >
              <h3 className="font-satoshi font-semibold mb-1">{repo.name}</h3>
              <p className="font-satoshi text-sm">{repo.description || 'No description'}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}