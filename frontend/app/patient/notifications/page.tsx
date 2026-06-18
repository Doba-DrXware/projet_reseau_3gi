const notifications = [
  {
    id: "1",
    type: "success",
    title: "Réservation prête",
    message: "Votre commande à la Pharmacie du Centre est prête. Récupérez-la dans les 24h.",
    time: "Il y a 5 min",
    icon: "✅",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
  },
  {
    id: "2",
    type: "info",
    title: "Médicament disponible",
    message: "Paracétamol 500mg est de nouveau en stock à la Pharmacie de la Poste.",
    time: "Il y a 1h",
    icon: "💊",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
  },
  {
    id: "3",
    type: "warning",
    title: "Commande expire bientôt",
    message: "Votre réservation expire dans 4 heures. Rendez-vous à la pharmacie.",
    time: "Il y a 2h",
    icon: "⏰",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
  },
  {
    id: "4",
    type: "info",
    title: "Nouvelle pharmacie",
    message: "Pharmacie Centrale vient de rejoindre le réseau PROXYMÉDOC à Yaoundé.",
    time: "Hier",
    icon: "🏥",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
  },
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-600 px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full bg-white/10" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-2xl font-black">Notifications</h1>
            <p className="text-blue-100 text-sm">{notifications.length} nouvelles alertes</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-24 flex flex-col gap-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`${notif.bg} border ${notif.border} rounded-3xl p-4 shadow-sm`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-xl">
                {notif.icon}
              </div>
              <div className="flex-1">
                <p className={`font-black text-sm ${notif.text}`}>{notif.title}</p>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{notif.message}</p>
                <p className="text-gray-400 text-[10px] mt-2 font-medium">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
