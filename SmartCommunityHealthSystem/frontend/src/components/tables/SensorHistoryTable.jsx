function SensorHistoryTable({ data = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">pH</th>
            <th className="px-4 py-3 text-left">Temperature</th>
            <th className="px-4 py-3 text-left">Humidity</th>
            <th className="px-4 py-3 text-left">Turbidity</th>
            <th className="px-4 py-3 text-left">Weather</th>
            <th className="px-4 py-3 text-left">Quality</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="py-6 text-center text-slate-500"
              >
                No sensor records found.
              </td>
            </tr>
          ) : (
            data.map((reading) => (
              <tr
                key={reading._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {new Date(reading.createdAt).toLocaleString()}
                </td>

                <td className="px-4 py-3">{reading.ph}</td>

                <td className="px-4 py-3">
                  {reading.temperature} °C
                </td>

                <td className="px-4 py-3">
                  {reading.humidity} %
                </td>

                <td className="px-4 py-3">
                  {reading.turbidity}
                </td>

                <td className="px-4 py-3">
                  {reading.weather}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      reading.waterQuality === "Safe"
                        ? "bg-green-100 text-green-700"
                        : reading.waterQuality === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reading.waterQuality}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SensorHistoryTable;