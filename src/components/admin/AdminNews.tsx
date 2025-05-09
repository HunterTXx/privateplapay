import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

const AdminNews: React.FC = () => {
  const isAdmin = useAdmin();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<NewsItem>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).from('news').select('*').order('date', { ascending: false });
    if (error) setError(error.message);
    setNews(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) return;
    const { error } = await (supabase as any).from('news').insert([{ title: form.title, description: form.description, date: form.date }]);
    if (error) setError(error.message);
    setForm({});
    fetchNews();
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm(item);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !form.title || !form.description || !form.date) return;
    const { error } = await (supabase as any).from('news').update({ title: form.title, description: form.description, date: form.date }).eq('id', editingId);
    if (error) setError(error.message);
    setEditingId(null);
    setForm({});
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this news item?')) return;
    const { error } = await (supabase as any).from('news').delete().eq('id', id);
    if (error) setError(error.message);
    fetchNews();
  };

  if (!isAdmin) return <div className="text-red-500">Admin access only.</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="news">📰</span> Manage News & Updates
      </h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
        <input name="date" type="date" value={form.date || ''} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="border p-2 rounded md:col-span-3" required />
        <button type="submit" className="bg-investment-green text-white rounded px-4 py-2 md:col-span-3">
          {editingId ? 'Update News' : 'Add News'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({}); }} className="text-slate-500 underline md:col-span-3">Cancel Edit</button>
        )}
      </form>
      {loading ? <div>Loading...</div> : (
        <ul className="divide-y divide-slate-100">
          {news.map(item => (
            <li key={item.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-medium text-slate-800">{item.title}</div>
                <div className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</div>
                <div className="text-slate-600 text-sm mt-1">{item.description}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNews; 