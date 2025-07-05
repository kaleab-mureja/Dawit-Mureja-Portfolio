// app/services/page.tsx
"use client";
import { useState, useEffect } from "react";
import { IService } from "../../types/index";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

const getServiceData = async (): Promise<IService[]> => {
  const SERVICE_URL = `${getBaseUrl()}/api/services`;

  try {
    const res = await fetch(`${SERVICE_URL}`, { cache: "no-store" });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Failed to fetch service data: ${res.statusText} (Status: ${res.status})`,
        errorBody
      );
      throw new Error(
        `Failed to fetch service data: ${res.statusText} (Status: ${res.status})`
      );
    }
    const data: IService[] = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching service data:", error);
    let errorMessage = "Unknown error occurred while fetching service data.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    throw new Error(errorMessage);
  }
};

export default function ServicesPage() {
  const [serviceData, setServiceData] = useState<IService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingServices(true);
        const data = await getServiceData();
        setServiceData(data);
      } catch (err: unknown) {
        let errorMessage = "Failed to load service data.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setErrorServices(errorMessage);
        console.error(err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section
      className="pb-20 flex flex-col justify-center items-center gap-5 md:gap-10"
      id="service">
      {" "}
      {/* Adjusted padding to match other sections */}
      <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
          Services
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />
        {loadingServices ? (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading service data...
          </p>
        ) : errorServices ? (
          <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
            Error: {errorServices}
          </p>
        ) : serviceData.length > 0 ? (
          <div className="px-2 space-y-6">
            {" "}
            {/* Re-added vertical spacing between categories */}
            {serviceData.map((serviceEntry) => (
              <div key={serviceEntry._id}>
                {" "}
                {/* Removed mb-2 here, space-y on parent handles it */}
                <h2 className="text-lg md:text-xl font-bold text-blue-300 mb-2">
                  {" "}
                  {/* Added mb-2 for spacing below title */}
                  {serviceEntry.category}
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {" "}
                  {/* Controlled indentation with pl-5 on UL, space-y-1 for tighter list items */}
                  {serviceEntry.details.map((detail, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {" "}
                      {/* Removed ml-6 from li */}
                      {detail.item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            No service data available.
          </p>
        )}
      </div>
    </section>
  );
}
