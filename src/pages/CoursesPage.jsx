import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import { useDebounce } from '../hooks/useDebounce';
import CourseCard from '../components/CourseCard';

const CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'AI & Machine Learning',
  'Mobile Development',
  'DevOps & Cloud',
  'Cybersecurity',
  'UI/UX Design',
  'Business & Finance',
  'Digital Marketing',
  'Database',
];

const LEVELS  = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const SORTS   = [
  { value: 'newest',     label: 'Newest first' },
  { value: 'popular',    label: 'Most popular' },
  { value: 'rated',      label: 'Top rated' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const LIMIT = 9;

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [level,    setLevel]    = useState(searchParams.get('level')     || '');
  const [sort,     setSort]     = useState(searchParams.get('sort')      || 'newest');
  const [page,     setPage]     = useState(Number(searchParams.get('page')) || 1);
  const [free,     setFree]     = useState(searchParams.get('free') === 'true');

  const [courses,    setCourses]    = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: LIMIT,
        sort,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(category && category !== 'All' && { category }),
        ...(level    && level    !== 'All' && { level }),
        ...(free && { free: 'true' }),
      });

      const { data } = await api.get(`/courses?${params}`);
      setCourses(data.data.courses);
      setTotal(data.data.total);
      setTotalPages(data.data.totalPages);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, level, sort, page, free]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  // Sync URL params
  useEffect(() => {
    const p = {};
    if (debouncedSearch) p.search = debouncedSearch;
    if (category && category !== 'All') p.category = category;
    if (level && level !== 'All')       p.level = level;
    if (sort !== 'newest')              p.sort = sort;
    if (page > 1)                       p.page = page;
    if (free)                           p.free = 'true';
    setSearchParams(p, { replace: true });
  }, [debouncedSearch, category, level, sort, page, free]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, category, level, sort, free]);

  const clearAll = () => {
    setSearch('');
    setCategory('');
    setLevel('');
    setSort('newest');
    setFree(false);
    setPage(1);
  };

  const hasFilters = search || (category && category !== 'All') ||
                     (level && level !== 'All') || free;

  return (
    <main className="section py-8 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
          All Courses
        </h1>
        <p className="text-white/50">
          {loading ? 'Loading…' : `${total.toLocaleString()} course${total !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course title…"
            className="input pl-11 pr-10"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg
                         text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input py-2 flex-1 min-w-[160px] max-w-xs"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c === 'All' ? '' : c}>{c}</option>
            ))}
          </select>

          {/* Level */}
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="input py-2 flex-1 min-w-[140px] max-w-[180px]"
          >
            {LEVELS.map(l => (
              <option key={l} value={l === 'All' ? '' : l}>{l}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input py-2 flex-1 min-w-[160px] max-w-[220px]"
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Free toggle */}
          <button
            onClick={() => setFree(f => !f)}
            className={`btn text-sm flex-shrink-0 transition-all ${
              free
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'btn-outline'
            }`}
          >
            Free only
          </button>

          {hasFilters && (
            <button onClick={clearAll} className="btn-ghost text-sm flex-shrink-0">
              <X className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>

        {/* Active filters pills */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {search && (
              <span className="badge-brand gap-1.5">
                Search: "{search}"
                <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {category && category !== 'All' && (
              <span className="badge-brand gap-1.5">
                {category}
                <button onClick={() => setCategory('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {level && level !== 'All' && (
              <span className="badge-brand gap-1.5">
                {level}
                <button onClick={() => setLevel('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {free && (
              <span className="badge-green gap-1.5">
                Free only
                <button onClick={() => setFree(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton aspect-video" />
              <div className="p-4 space-y-2.5">
                <div className="skeleton h-3.5 w-1/4 rounded" />
                <div className="skeleton h-5 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-24 card">
          <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-white mb-2">No courses found</h3>
          <p className="text-white/40 mb-6">Try adjusting your filters or search term.</p>
          <button onClick={clearAll} className="btn-primary mx-auto">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
            className="btn-outline p-2 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('…');
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '…' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-white/30">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`min-w-[36px] h-9 rounded-xl text-sm font-medium transition-all ${
                    p === page
                      ? 'bg-brand-600 text-white'
                      : 'btn-outline px-2.5'
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="btn-outline p-2 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page info */}
      {!loading && courses.length > 0 && (
        <p className="text-center text-xs text-white/30 mt-4">
          Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total} courses
        </p>
      )}
    </main>
  );
}