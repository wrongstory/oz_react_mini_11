export default function MovieCompanies({ companies, imageBase }) {
  if (!companies || companies.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-600 pb-2">
        제작사
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col items-center justify-center 
              bg-gray-100 dark:bg-gray-800 
              px-5 py-4 rounded-lg shadow gap-2 h-full"
          >
            {company.logo_path && (
              <img
                src={`${imageBase}${company.logo_path}`}
                alt={company.name}
                className="h-12 object-contain rounded bg-white dark:bg-gray-200 p-1"
              />
            )}
            <span className="text-sm text-black dark:text-white font-medium text-center">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
