"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PendingCreator {
  name: string;
  email: string;
  about: string;
  token: string;
  images: string[];
  approved?: boolean;
}

interface AcceptedInfo {
  email: string;
  signupLink: string;
  emailBody: string;
}

export default function Admin() {
  const router = useRouter();
  const [applications, setApplications] = useState<PendingCreator[]>([]);
  const [accepted, setAccepted] = useState<AcceptedInfo[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/SignIn");
      return;
    }

    const stored = localStorage.getItem("pendingCreators");
    if (stored) {
      setApplications(JSON.parse(stored));
    }

    setHasMounted(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/SignIn");
  };

  const handleAccept = (app: PendingCreator, index: number) => {
    const token = Math.random().toString(36).substring(2, 10);
    const updatedApp: PendingCreator = { ...app, token, approved: true };

    let pendingCreators: PendingCreator[] = JSON.parse(
      localStorage.getItem("pendingCreators") || "[]"
    );

    // Remove existing application by email
    pendingCreators = pendingCreators.filter((c) => c.email !== app.email);

    // Add new approved application with token
    pendingCreators.push(updatedApp);

    // Update state
    const updatedApps = [...applications];
    updatedApps.splice(index, 1);
    setApplications(updatedApps);

    // Save back to localStorage
    localStorage.setItem("pendingCreators", JSON.stringify(pendingCreators));

    const signupLink = `${window.location.origin}/create-account?token=${token}`;
    const emailBody = `Hi ${app.name},

Great news — your application to become a seller on TrueCraft has been approved!

To create your account, click the link below:

${signupLink}

After creating your password, you'll be able to sign in and start uploading your handmade items.

Welcome aboard!
– TrueCraft Team`;

    setAccepted((prev) => [
      ...prev,
      {
        email: app.email,
        signupLink,
        emailBody,
      },
    ]);
  };

  const handleReject = (index: number) => {
    const updated = [...applications];
    updated.splice(index, 1);
    setApplications(updated);
    localStorage.setItem("pendingCreators", JSON.stringify(updated));
  };

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-[#fefcf9] text-[#2e2e2e] font-sans">
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 shadow-md z-50">
        <h1 className="text-xl font-bold">TrueCraft Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </nav>

      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📩 Seller Applications</h2>

        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="grid gap-4">
            {applications.map((app, i) => (
              <div key={i} className="bg-white border rounded shadow p-4 space-y-2">
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>About:</strong> {app.about}</p>

                {app.images && app.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {app.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Creation ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => handleAccept(app, i)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(i)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {accepted.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">✅ Accepted Creators</h2>
            <div className="grid gap-6">
              {accepted.map((info, i) => (
                <div key={i} className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <p className="text-green-900 font-semibold">Signup link for {info.email}:</p>
                  <p className="text-sm break-all bg-white p-2 rounded border my-2">{info.signupLink}</p>
                  <p className="text-green-900 font-semibold">Email body:</p>
                  <textarea
                    readOnly
                    className="w-full text-sm border rounded p-2 bg-white"
                    rows={7}
                    value={info.emailBody}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}