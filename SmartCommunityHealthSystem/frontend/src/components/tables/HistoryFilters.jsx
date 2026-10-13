function HistoryFilters({
  filters,
  onChange,
  onReset,
}) {
  return (
    <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {/* Weather */}
        <select
          name="weather"
          value={filters.weather}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-2"
        >
          <option value="">All Weather</option>
          <option value="Sunny">Sunny</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Rainy">Rainy</option>
          <option value="Storm">Storm</option>
          <option value="Fog">Fog</option>
          <option value="Windy">Windy</option>
        </select>

        {/* Water Quality */}
        <select
          name="waterQuality"
          value={filters.waterQuality}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-2"
        >
          <option value="">All Quality</option>
          <option value="Safe">Safe</option>
          <option value="Moderate">Moderate</option>
          <option value="Unsafe">Unsafe</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-2"
        />

        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-2"
        />

        {/* Sort */}
        <select
          name="sort"
          value={filters.sort}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-2"
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
        </select>

        {/* Reset */}
        <button
          onClick={onReset}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default HistoryFilters;