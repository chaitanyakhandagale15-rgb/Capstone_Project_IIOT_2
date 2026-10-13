function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default InfoCard;