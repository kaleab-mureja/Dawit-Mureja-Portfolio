interface AboutProps {
  id?: string; // Optional ID for anchor linking
}

export default function About({ id }: AboutProps) {
  return (
    <section
      id={id}
      className="min-h-screen py-16 px-4 bg-gray-100 flex items-center justify-center">
      <h2 className="text-4xl font-bold text-gray-800">About Section</h2>
      <p className="mt-4 text-lg text-gray-600">
        This is the content for the About section. It can be a full page or a
        section on the homepage.
      </p>
      {/* Add more About content here */}
    </section>
  );
}
