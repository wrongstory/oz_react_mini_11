export default function MovieCompanies({ companies, imageBase }) {
  if (!companies || companies.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">제작사</h3>
      <div className="flex gap-4 items-center mt-2">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center gap-2">
            {company.logo_path && (
              <img
                src={`${imageBase}${company.logo_path}`}
                alt={company.name}
                className="h-6"
              />
            )}
            <span>{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
