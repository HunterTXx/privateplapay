import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

const ProjectNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await (supabase as any)
        .from('news')
        .select('*')
        .order('date', { ascending: false });
      if (error) setError(error.message);
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="news">📰</span> Project News & Updates
      </h2>
      {loading ? (
        <div>Loading news...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : news.length === 0 ? (
        <div className="text-slate-500">No news or updates yet.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {news.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-slate-800">{item.title}</span>
                <span className="text-xs text-slate-400 ml-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-600 text-sm mt-1">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectNews; 