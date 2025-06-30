import { redirect } from "next/navigation";
import { EducationEntry, NewsEntry } from "../../types/index"; // <--- Import from types/index

// Function to get base URL for internal API calls
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  // For local development, use localhost with port, defaulting to 3000
  return `http://localhost:${process.env.PORT || 3000}`;
}

async function getEducationData(): Promise<EducationEntry[]> {
  const EDUCATION_URL = `${getBaseUrl()}/api/education`; // Construct URL for internal API

  try {
    const res = await fetch(`${EDUCATION_URL}`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch education data: ${res.statusText} (Status: ${res.status})`
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching education data:", error);
    return [];
  }
}

async function getNewsData(): Promise<NewsEntry[]> {
  const NEWS_URL = `${getBaseUrl()}/api/news`;

  if (!NEWS_URL) {
    console.error("NEWS_URI is not defined in .env.local");
    return [];
  }

  try {
    const res = await fetch(`${NEWS_URL}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch news data: ${res.statusText} (Status: ${res.status}) `
      );
    }
    const data: NewsEntry[] = await res.json();

    const processedData = data.map((item) => ({
      ...item,
      // Issue 2: Type mismatch here if NewsEntry in types/index.ts is still 'string' for dates
      eventDate: item.eventDate ? new Date(item.eventDate) : undefined,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return processedData;
  } catch (error) {
    console.error("Error fetching news data: ", error);
    return [];
  }
}

export default async function Page({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const newsData = await getNewsData();
  const educationData = await getEducationData(); // Moved inside the component

  const showAll = searchParams.show === "all";

  let newsToDisplay: NewsEntry[] = [];
  let showMoreButton = false;
  let currentRemainingCount = 0;
  const initialDisplayLimit = 3;

  if (showAll) {
    newsToDisplay = newsData;
  } else {
    newsToDisplay = newsData.slice(0, initialDisplayLimit);
    if (newsData.length > initialDisplayLimit) {
      showMoreButton = true;
      currentRemainingCount = newsData.length - initialDisplayLimit;
    }
  }

  async function showAllNewsAction() {
    "use server";
    redirect("/news?show=all");
  }

  return (
    // Wrap all content in a single root element
    <div
      id="education"
      className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10 ">
      {/* Education Section */}
      <section className="bg-gray-800/25 rounded-lg w-full p-4 max-w-6xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left">
          Education
        </h1>
        {educationData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {educationData.map((entry) => (
              <div
                key={entry._id}
                className="
                bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-900
                transform transition-all duration-300 ease-in-out
                hover:shadow-2xl hover:bg-gray-900 hover:scale-[1.02] hover:border-blue-900
              ">
                <h2 className="text-md font-bold text-blue-300 mb-1">
                  {entry.degree}
                </h2>
                <p className="text-sm text-gray-300 ">
                  {entry.university} - {entry.location}
                </p>
                <p className="text-xs text-gray-500">
                  {entry.startDate} - {entry.endDate}
                </p>
                {entry.gpa && (
                  <p className="text-xs text-gray-500">GPA: {entry.gpa}</p>
                )}
                {entry.thesis && (
                  <p className="text-xs text-gray-500">
                    Dissertation: {entry.thesis}
                  </p>
                )}
                {entry.advisors && entry.advisors.length > 0 && (
                  <p className="text-xs text-gray-500">
                    Advisors: {entry.advisors.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading education data or no data available. Please ensure your
            backend API is running and accessible.
          </p>
        )}
      </section>

      {/* News & Updates Section */}
      <section className="bg-gray-800/25 rounded-lg w-full p-4 max-w-6xl shadow-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left">
          News & Updates
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />

        {newsData.length > 0 ? (
          <div className="space-y-4 px-2">
            {newsToDisplay.map((entry) => (
              <div key={entry._id} className="flex items-start">
                <span className="text-blue-400 text-xl leading-none mr-2 mt-0.5">
                  •
                </span>
                <p className="text-base text-gray-300 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading news data or no data available. Please ensure your backend
            API is running and accessible.
          </p>
        )}

        {showMoreButton && (
          <div className="text-center mt-4">
            <form action={showAllNewsAction}>
              <button
                type="submit"
                className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg
                           hover:bg-blue-500 hover:text-white transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Show More ({currentRemainingCount})
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
